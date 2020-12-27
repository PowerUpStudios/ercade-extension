 //% blockId=ercade block="Ercade Extension"
 //% color="#000000" 
 //% groups='["Menu", "Game"]'
 //% weight=100 color=#000000 icon="\uf1ec"
let title: string
let checkpointX: number
let checkpointY: number
let myTitle: Sprite
 namespace Ercade { 

    
    //% blockId=setTitle block="Set Title To $title=screen_image_picker"
    //% weight=400 blockGap=8
    //% group="Menu"
    //% color=#000000
    export function Set_Title_To_(title: string){
    title = title
    }
    //% blockId=menu block="Menu $onoff=toggleOnOff"
    //% weight=400 blockGap=8
    //% group="Menu"
    //% color=#000000
    export function Menu_(onoff: boolean){
    if (onoff = true){
    let myTitle = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `)


    }
    else{
    myTitle.destroy()


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

    


 } 


