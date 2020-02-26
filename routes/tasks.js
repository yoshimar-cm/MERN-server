const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
        auth,
        [
            check('name','El nombre es obligatorio').not().isEmpty(),
            check('project','El proyecto es obligatorio').not().isEmpty()
        ],
        tasksController.createTask
);
router.get('/',
        auth,
        tasksController.listTasks
);

router.put('/:id',
        auth,
        [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('project','El proyecto es obligatorio').not().isEmpty()
        ],
        tasksController.updateTask
);

router.delete('/:id',
         auth,
         tasksController.deleteTask
);

module.exports = router;