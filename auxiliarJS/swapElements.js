export default (arr,pos1,pos2)=>{
    const length=arr.length
    if(pos1===pos2){
      return arr
    }else if(pos1<0||pos2<0){
      return arr
    }else if(pos1>=length||pos2>=length){
     return arr
    }
    let element1=Object.assign({},arr[pos1]);
    let element2=Object.assign({},arr[pos2]);
    let newArray=arr.map((elm,index)=>{
      if(index===pos1){
        return element2
      }else if(index===pos2){
        return element1
      }else{
        return elm
      }
    })
    return newArray
  }