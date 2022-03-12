// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../lib/dbConnect"
import Task from '../../models/Task'
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) {
    res.status(200).json({ error: 'Access Denied' })

  } else if (req.method === 'POST') {
    dbConnect()
      .then(() => {
        const { task_name, subtasks, _id, tags, email } = req.body;
        let taskToSave = {
          task_name,
          tags,
          subtasks: subtasks.map(st => JSON.stringify(st)),
          email
        }
        if (_id === undefined) {
          console.log('create new: ', { _id, taskToSave })
          return Task.create(taskToSave)
            .then(dataSaved => {
              res.status(200).json({
                message: 'Información guardada con éxito',
                _id: dataSaved._id.toString()
              })
            })
        } else {
          //console.log('create new: ', { _id, taskToSave })
          return Task.updateOne({ _id }, taskToSave)
            .then(() => {
              res.status(200).json({
                message: 'Información actualizada con éxito',
              })
            })

        }

      })

      .catch(err => { res.status(400).json({ error: err }) })


  } else if (req.method === 'GET') {
    let date = (new Date()).toLocaleString()
    setTimeout(() => res.status(200).json({ date }), 3000)
  }


}
