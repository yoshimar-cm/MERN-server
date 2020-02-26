const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');

//crear un proyecto
router.post('/',
     auth,
     [
         check('name','El nombre es obligatorio').not().isEmpty()
     ],
    projectsController.createProject
);
//listar todos los proyectos
router.get('/',
     auth,
    projectsController.listProjects
);

//Actualizar un proyecto via ID
router.put('/:id',
    auth,
    [
        check('name','El nombre es obligatorio').not().isEmpty()
    ],
    projectsController.updateProject
);

//eliminar un proyecto
router.delete('/:id',
    auth,
    projectsController.deleteProject
);

module.exports = router;