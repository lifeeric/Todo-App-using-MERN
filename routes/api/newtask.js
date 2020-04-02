const router = require('express').Router();
const Task = require('../../models/newtask.model');

// Get All
router.get('/', (req, res) => {
   
    Task.find()
        .then( response => res.json(response))
        .catch(err => res.status(400).json({msg: 'Somethin went wrong!', err: true}))
})

// Get Single
router.get('/:id', (req, res) => {
    Task.findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(400).json({msg: 'Somethin went wrong!', err: true}));

});

// Updating the task
router.put('/:id', (req, res) => {
    Task.findById(req.params.id)
        .then(response => {

            // update the old with the new
            response.title = req.body.title

            response.save()
                .then(() => res.json({msg: 'updated successfully!', err: false}))
                .catch(err => res.status(400).json({msg: 'somethin went wrong!', err: true}));

        })
});


// Delte
router.delete('/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then( () => res.json({msg: 'task has been deleted!', err: false}))
        .catch(err => res.status(400).json({msg: 'something went wrong!', err: true}));
});

// Create task
router.post('/', (req, res) => {
    
    // new task has been created by user
    const task = {
        title: req.body.title
    };

    // save it to db
    newTask = new Task({...task});

    // save
    newTask.save()
        .then( () => res.json({msg: 'Task has been created!', err: false,}))
        .catch(err => res.status(400).json({msg: 'SomeThing went wrong', err: true}));
})

module.exports = router;