// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../lib/dbConnect"
import Category from '../../models/Category'
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const session=await getSession({req})
    if(!session){
        res.status(200).json({error:'Access Denied'})
    }else if (req.method === 'POST') {
        dbConnect()
            .then(() => {
                const {_id,email} = req.body;
                const categories={
                    categories:JSON.stringify(req.body.categories),
                    email
                }
                console.log(categories)
                if(_id===undefined){
                   return  Category.create(categories)
                    .then(dataCreated=>{
                      res.status(200).json({
                            message:'La información ha sido guardada con exito',
                            _id:dataCreated._id
                        })
                    })
                    
                }else{
                    return Category.updateOne({_id},categories)
                    .then(()=>{
                        res.status(200).json({
                              message:'La información ha sido actualizada con exito',
                          })
                      })
                }
                

            })
            .catch(err => { res.status(400).json({ error: err }) })


    } else if (req.method === 'GET') {
        //este endpoind habra que cambiarlo una vez este funcionando el tema de la autenticación
       let {email}= session.user;
        dbConnect()
        .then(()=>{
            Category.find({email})
            .then(data=>{
                res.status(200).json(data)
            })
        })
        .catch(err => { res.status(400).json({ error: err }) })
    }


}
