export default function identifyId(text){
    let regex=/\d+/
    let textNumber=text.match(regex)
    if(!textNumber.length){
        console.error('%c Error en identifyIndex','color:red')
        return
    }
    let number=parseInt(textNumber[0])
    if(textNumber[0]==='0'){
        return 0
    }else if(number){
        return number
    }else{
        console.log({textNumber,number})
        return -1
    }
}