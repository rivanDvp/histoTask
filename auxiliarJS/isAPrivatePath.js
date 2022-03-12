const privatePaths = [
    "/MisTareas",
    "/new_task",
    "/Tags_Edit",
    "/edit/[_id]",
    "/Stats/[_id]",

]
export default (pathName) => {
    let numberOfPrivatePaths= privatePaths.length
    for(let i=0;i<numberOfPrivatePaths;i++){
        if (pathName===privatePaths[i]){
            return true
        }
    }
    return false
}
