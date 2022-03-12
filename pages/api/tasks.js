// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../lib/dbConnect"
import Task from '../../models/Task'
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session = await getSession({ req })
 
  if(!session){
    res.status(200).json({error:'Access Denied'})

  }else if (req.method === 'GET') {
    const {email}=session.user
    dbConnect()
      .then(()=>Task.find({email}))
      .then(tasks=>res.status(200).json(tasks))
      .catch(err => { res.status(400).json({ error: err }) })

  }else if(req.method==='POST'){
    const {email,query}=req.body;
     dbConnect()
          .then(()=>Task.find({tags:{$all:query},email}))
          .then(tasks=>res.status(200).json(tasks))
          .catch(err => { res.status(400).json({ error: err }) })
        
    
    
  } else{
    return res.status(500).json({success:false,error:'Falla de servidor'})
  }


}
