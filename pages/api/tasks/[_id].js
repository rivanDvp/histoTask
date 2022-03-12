import dbConnect from "../../../lib/dbConnect"
import Task from "../../../models/Task"
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session=await getSession({req})
  if(!session){
    res.status(200).json({error:'Access Denied'})
  }else if (req.method === 'GET') {
    const { _id } = req.query
    console.log({ _id, msg: 'en la api' })
    dbConnect()
      .then(() => Task.findById(_id))
      .then(task => res.status(200).json({ task }))
      .catch(error => { res.status(400).json({ error }) })

  } else if(req.method==='DELETE'){
    const {_id}=req.query;
    console.log('_id en la api: ',_id)
    dbConnect()
    .then(()=>Task.deleteOne({_id}))
    .then(tasksDeleted=>{
      let {deletedCount}=tasksDeleted
      if(deletedCount===1){
        return res.status(200).json({message:`Tarea eliminada con Exito!`}) 
      }else{
        return res.status(200).json({message:'La tarea que desea eliminar actualmente no existe!'})
      }
      
    })
    .catch(error=>res.status(400).json({error:`La tarea no ha sido eliminada, ya sea por no existir o por problemas con el servidor. Detalles: ${error}`}))

  } else {
    return res.status(500).json({ success: false, error: 'Falla de servidor' })
  }

}