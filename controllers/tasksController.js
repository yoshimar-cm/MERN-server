const Task = require('../models/Task');
const Project = require('../models/Project');
const {validationResult} = require('express-validator');

//CREAR NUEVA TAREA
exports.createTask = async (req,res)=>{
    //revisar errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {project} = req.body;

    try {
        const projectexist = await Project.findById(project);
        if(!projectexist){
            return res.status(404).json({message:'el proyecto no existe'});
        }
        //crear project
        const reg = await Task.create({name:req.body.name,project:project});
        res.status(200).json(reg);
        
    } catch (error) {
        res.status(500).send({message:'error'});
        next(error);
    }

};

//LISTAR TODAS LAS TAREAS REALACIONADAS A UN PROYECTO
exports.listTasks = async (req,res)=>{

    const {project} = req.query;
    try {
        const projectexist = await Project.findById(project);
        //validar si existe el proyecto
        if(!projectexist){
            return res.status(404).json({message:'el proyecto no existe'});
        }
        //verificar el creador del proyecto
        if(projectexist.author.toString() !== req.user.id){
            return res.status(401).json({message:'Usuario no autorizado'});
        }
        const reg = await Task.find(
            {project})
            .sort({created_at: -1});
            
        res.status(200).json(reg);
        
    } catch (error) {
        res.status(500).send({message:'error'});
        next(error);
    }
}

//ACTUALIZAR TAREA
exports.updateTask = async (req,res)=>{

    //revisar errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {

        const {project,name,status} = req.body;

        const taskExist = await Task.findById(req.params.id);
        //validar si existe la tarea
        if(!taskExist){
            return res.status(404).json({message:'el proyecto no existe'});
        }

        const projectexist = await Project.findById(project);
        //validar si existe el proyecto
        if(!projectexist){
            return res.status(404).json({message:'el proyecto no existe'});
        }
        //verificar el creador del proyecto
        if(projectexist.author.toString() !== req.user.id){
            return res.status(401).json({message:'Usuario no autorizado'});
        }

         //actualizar
         const reg = await Task.findByIdAndUpdate(
            {_id:req.params.id},
            {name,status}
            );
        //mensaje
         res.status(200).json(reg);
        
    } catch (error) {
        res.status(500).send({message:'error'});
        next(error);
    }

}

exports.deleteTask = async (req,res)=>{

    try {
        const {project} = req.query;

        const taskExist = await Task.findById(req.params.id);
        //validar si existe la tarea
        if(!taskExist){
            return res.status(404).json({message:'el proyecto no existe'});
        }

        const projectexist = await Project.findById(project);
        //validar si existe el proyecto
        if(!projectexist){
            return res.status(404).json({message:'el proyecto no existe'});
        }

        //actualizar
        const reg = await Task.findByIdAndDelete(
            {_id:req.params.id}
            );
        //mensaje
         res.status(200).json({message:'proyecto eliminado'});
        
    } catch (error) {
        res.status(500).send({message:'error'});
        next(error);  
    }
}