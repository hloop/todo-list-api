const express = require('express');
const router  = express.Router();
const Task    = require('../models/task');

router.get('/tasks', (req, res, next) => {
    Task.find()
    .then((allTheTasks)=>{
        res.json(allTheTasks);
    })
    .catch((err)=>{
        res.json(err);
    })

});

router.post('/tasks/create', (req, res, next)=>{
    Task.create({
        title: req.body.title,
        description: req.body.description,
        doneyet: req.body.doneyet
    })
    .then((response)=>{
        res.json(response);
    })
    .catch((err)=>{
        res.json(err);
    })
});

router.get('/tasks/:id', (req, res, next) => {
  const id = req.params.id;
  Task.findById(id)
  .then((theTask) => {
    res.json(theTask);
  })
  .catch((err)=>{
    res.json(err);
  })
});

router.get('/tasks/:id/edit', (req, res, next)=>{
  Task.findById(req.params.id)
  .then((theTask)=>{
      res.render('editTask', {task: theTask})
  })
  .catch((err)=>{
      next(err);
  })
})

router.post('/tasks/:id/update', (req, res, next)=>{
   Task.findByIdAndUpdate(req.params.id, {
     title: req.body.title,
     description: req.body.description,
     donyet: req.body.doneyet
   })
   .then((theTask)=>{
       res.redirect('/tasks/'+theTask._id)
   })
   .catch((err)=>{
       next(err);
   })  
});

router.post('/tasks/:id/delete', (req, res, next)=>{
  Task.findByIdAndRemove(req.params.id)
  .then((reponse)=>{
      res.redirect('/tasks');
  })
  .catch((err)=>{
      next(err);
  })
})


module.exports = router;