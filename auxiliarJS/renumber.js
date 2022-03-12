export default (arr)=>arr.map((subtask,index)=>{
    return Object.assign({},subtask,{id:index+1})
})