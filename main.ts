

let checkpointX: number
let checkpointY: number
let myTitle: TitleSprite
let _myTitle: TitleSprite
let pages: string
let pagesManager:  [string];
let titlePage: string 


namespace Types {
    /**
     * Gets the "kind" of type
     */
    //% blockHidden=1
    //% color=#000000
    //% shim=KIND_GET
    //% enumName="Types"
    //% enumMemberName="types"    
    //% blockId=typekind block="$_kind"
    //% kindNamespace=TypesKind kindMemberName=kind kindPromptHint="e.g. Coin, Fireball, Asteroid..."
    export function _Type(_kind: number): number {
        return _kind;
    }

    /**
     * Gets the my type
     */
    //% color=#000000
    //% blockHidden=true shim=ENUM_GET deprecated=true
    //% enumName="Types"
    //% enumMemberName="types"     
    //% blockId=mytype block="$_kind" enumInitialMembers="Type1,Type2,Type3,Type4"
    //% enumName=TypesKindLegacy enumMemberName=kind enumPromptHint="e.g. Coin, Fireball, Asteroid..."
    export function _nType(_kind: number): number {
        return _kind;
    }
}

namespace TypesKind {
    let nextKindType: number;
     //% color=#000000
    export function create() {
        if (nextKindType === undefined) nextKindType = 1000;
        return nextKindType++;
    }

    //% isKind
    export const Menu = create();

    //% isKind
    export const Credits = 1;

    //% isKind
    export const Options = create();

    //% isKind
    export const Game = create();
}



namespace SpriteKind {
    //% isKind
    export const SpriteText = SpriteKind.create();
}


//% blockNamespace="Ercade"
//% blockGap=8
class TitleSprite extends Sprite {
    constructor(
        public text: string,
        public bg: number,
        public fg: number,
        public maxFontHeight: number,
        public borderWidth: number,
        public borderColor: number,
        public padding: number,
        public outlineWidth: number,
        public outlineColor: number,
        public icon: Image = null,
        public positionX: number = 0,
        public positionY: number = 0,
    ) {
        super(image.create(0,0));
        this.setKind(SpriteKind.SpriteText);
        this.setFlag(SpriteFlag.Ghost, true);

        this.update()
    }

    public update() {
        const borderAndPadding = this.borderWidth + this.padding + this.outlineWidth;
        const iconWidth = this.icon ? this.icon.width + this.padding + this.outlineWidth : 0;
        const iconHeight = this.icon ? this.icon.height : 0;
        const font = Ercade.getFontForTextAndHeight(this.text, this.maxFontHeight);        
        const width = iconWidth + font.charWidth * this.text.length + 2 * borderAndPadding;
        const height = Math.max(iconHeight, font.charHeight) + 2 * borderAndPadding;
        const img = image.create(width, height);
        img.fill(this.borderColor);
        img.fillRect(this.borderWidth, this.borderWidth, width - this.borderWidth * 2, height - this.borderWidth * 2, this.bg)
        if (this.icon) {
            const iconHeightOffset = (height - iconHeight) / 2
            Ercade.renderScaledImage(this.icon, img, borderAndPadding, iconHeightOffset)
        }
        const textHeightOffset = (height - font.charHeight) / 2
        img.print(this.text, iconWidth + borderAndPadding, textHeightOffset, this.fg, font);
        if (this.outlineWidth > 0)
            Ercade.outlineOtherColor(img, this.fg, this.outlineWidth, this.outlineColor)
        this.setImage(img) 
               
    }


    public setMaxFontHeight(height: number) {
        this.maxFontHeight = height
        this.update();
    }


    public setIcon(icon: Image) {
        this.icon = icon
        this.update()
    }


    public setText(text: string) {
        this.text = text || ""
        this.update()
    }


    public setBorder(width: number, color: number, padding: number = 0) {
        this.borderWidth = Math.max(width, 0);
        this.borderColor = color;
        this.padding = Math.max(padding, 0);
        this.update()
    }


    public setOutline(width: number, color: number) {
        this.outlineWidth = Math.max(width, 0);
        this.outlineColor = color;
        this.update();
    }

    //% blockId=setdvalue block="setdvalue %z1 Page : %z2"
    //% weight=400 blockGap=8
    //% group="Menu"
    //% color=#000000
    public setdvalue(z1: number, z2: number):boolean {
        return true;
    }



}



 //% blockId=ercade block="Ercade"
 //% color="#000000" 
 //% groups='["Menu", "Game"]'
 //% weight=100 color=#000000 icon="\uf187"
 //% blockGap=8





namespace Ercade {

    //% weight=400 blockGap=8
    //% group="Menu"
    //% color=#000000
    export function renderScaledImage(source: Image, destination: Image, x: number, y: number, downScalePowerOfTwo: number = 0) {
        const scale = downScalePowerOfTwo;
        const tile = source
        for (let i = 0; i < source.width; i += 1 << scale) {
            for (let j = 0; j < source.height; j += 1 << scale) {
                if (source.getPixel(i, j) != 0) {
                    destination.setPixel(x + (i >> scale), y + (j >> scale), source.getPixel(i, j))
                }
            }
        }
    }
    //% weight=400 blockGap=8
    //% group="Menu"
    //% color=#000000
    export function getFontForTextAndHeight(text: string, maxHeight: number): image.Font {
        const baseFont = image.getFontForText(text)
        const hasUnicode = baseFont.charHeight === 12  // this is a hack
        const availableFonts: image.Font[] = hasUnicode 
            ? [baseFont] 
            : [image.font8, image.font5] // 8 and 5 are generally better fonts than 12
        const remainders = availableFonts.map(s => maxHeight % s.charHeight)
        const fontIdx = remainders.reduce((p, n, i) => remainders[p] <= n ? p : i, 99)
        const font = availableFonts[fontIdx]
        return image.scaledFont(font, maxHeight / font.charHeight)
    }


    function create(
        text: string,
        bg: number = 0,
        fg: number = 1,
    ): TitleSprite {

        myTitle = new TitleSprite(text, bg, fg, 8, 0, 0, 0, 0, 0);
        game.currentScene().physicsEngine.addSprite(myTitle);
        myTitle.setPosition(myTitle.positionX, myTitle.positionY)
        return myTitle;
    }

    function restore(titleSprite: TitleSprite

    ): TitleSprite {
        myTitle = new TitleSprite(titleSprite.text, titleSprite.bg, titleSprite.fg, titleSprite.maxFontHeight, titleSprite.borderWidth, titleSprite.borderColor, titleSprite.padding, titleSprite.outlineWidth, titleSprite.outlineColor, titleSprite.icon, titleSprite.positionX, titleSprite.positionY);
        game.currentScene().physicsEngine.addSprite(myTitle);
        myTitle.setPosition(myTitle.positionX, myTitle.positionY)
        return myTitle;
    }


    //% weight=400 blockGap=8
    //% group="Menu"
    //% color=#000000
    export function outlineOtherColor(img: Image, targetColor: number, outlineWidth: number, outlineColor: number) {
        let toOutlineX: number[] = [];
        let toOutlineY: number[] = [];
        for (let x = 0; x < img.width; x++) {
            for (let y = 0; y < img.height; y++) {
                for (let sx = 0; sx <= outlineWidth; sx++) {
                    for (let sy = 0; sy <= outlineWidth; sy++) {
                        if (sx + sy === 0)
                            continue;
                        if (img.getPixel(x, y) === targetColor)
                            continue
                        if (img.getPixel(x + sx, y + sy) === targetColor
                            || img.getPixel(x - sx, y + sy) === targetColor
                            || img.getPixel(x + sx, y - sy) === targetColor
                            || img.getPixel(x - sx, y - sy) === targetColor
                            ) {
                            toOutlineX.push(x)
                            toOutlineY.push(y)
                        }
                    }
                }
            }
        }
        for (let i = 0; i < toOutlineX.length; i++) {
            const x = toOutlineX[i]
            const y = toOutlineY[i]
            img.setPixel(x, y, outlineColor)
        }
    }


    
    //% blockId=setTitleOfType block="Set Title To %title Page : %titlepage"
    //% weight=400 blockGap=8
    //% group="Menu"
    //% color=#000000
    export function Set_Title_To_Title_Page(title: string, titlepage: string){
        if(myTitle != null) {
            myTitle.destroy()
        }
        create(title)
        titlePage = titlepage
    }

    //% blockId=changeFontHeight block="Set Max Font Height $height"
    //% weight=400 blockGap=8
    //% group="Menu"
    //% color=#000000
    export function change_font_size(height: number) {
        myTitle.setMaxFontHeight(height)
    }

    //% blockId=changeIcon block="Set Icon $icon=screen_image_picker"
    //% weight=400 blockGap=8
    //% group="Menu"
    //% color=#000000
    export function set_icon(icon: Image) {
        myTitle.setIcon(icon)
    }


    //% block="Set Title Border $width $color || And Padding $padding"
    //% width.defl=1
    //% color.defl=6
    //% color.shadow="colorindexpicker"
    //% group="Menu"
    //% weight=48
    export function set_border(width: number, color: number, padding: number = 0) {
        myTitle.setBorder(width, color, padding)
    }

    //% block="Set Title Outline $width $color"
    //% width.defl=1
    //% color.defl=6
    //% color.shadow="colorindexpicker"
    //% group="Menu"
    //% weight=49
    export function set_outline(width: number, color: number) {
        myTitle.setOutline(width, color)
    }




    //% blockId=setTitlePos block="Set Title Position To $x $y"
    //% weight=400 blockGap=8
    //% group="Menu"
    //% color=#000000
    export function set_title_position(x: number, y: number) {
        myTitle.positionX = x 
        myTitle.positionY = y
        myTitle.setPosition(myTitle.positionX, myTitle.positionY)
    }


    //% blockId=menu block="Activate Page %pageName $onoff=toggleOnOff"
    //% weight=400 blockGap=8
    //% group="Menu"
    //% color=#000000
    export function Activate_Page(pageName: string ,onoff: boolean){
      if (pages.includes(pageName)) {
  
    if (onoff == false){
    if (pagesManager.indexOf(pageName) > 0) {
        if (titlePage = pageName){
            _myTitle = myTitle
        myTitle.destroy()
        }	
    }
        
    } else {
            if (pagesManager.indexOf(pageName) > 0) {	
                        if(_myTitle != null) {
            restore(_myTitle)
        }
    }

    }
    }
    
} 
    //% blockId=setCheckpoint block="Set Checkpoint At X %x Y %y"
    //% weight=400 blockGap=8
    //% group="Game"
    //% color=#000000 
export function Set_Checkpoint_At_(x: number , y: number){
checkpointX = x
checkpointY = y


}
    //% blockId=tpSpriteCheck block="Teleport Sprite %sprite To Check Point"
    //% weight=400 blockGap=8
    //% group="Game"
    //% color=#000000 
export function Teleport_Sprite(sprite: Sprite){
sprite.setPosition(checkpointX, checkpointY)


}


    
    //% blockId=addPage block="Add Page %pageName Type %pageType=typekind"
    //% weight=400 blockGap=8
    //% group="Menu"
    //% color=#000000
export function Add_Page_(pageName: string, pageType?: number){ 
pagesManager.push(pageName + ' ' + "false") 

}

    


 } 

