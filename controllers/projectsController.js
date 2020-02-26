const Project = require('../models/Project');
const {validationResult} = require('express-validator');


exports.createProject = async (req,res)=>{
    //revisar errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        //guardar author via jwt
        // const req.body;

        //crear project
        const reg = await Project.create({name:req.body.name,author:req.user.id});

        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({message:'error'});
         next(error);
    }

};

//lista todos los proyectos del usuario actual
exports.listProjects = async (req,res)=>{
    try {
        // console.log(req.user);
        const reg = await Project.find(
            {author: req.user.id})
            .sort({created_at: -1});
            
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({message:'error'});
        next(error);
    }
}

exports.updateProject = async (req,res)=>{
    //revisar errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    //extraer la infromacion del producto
    const {name} = req.body;

    try {
        //revisar el id
        const project = await Project.findOne({_id:req.params.id});

        //si el proyecto existe o no
        if(!project){
            return res.status(404).json({message:'el proyecto no existe'});
        }
        //verificar el creador del proyecto
        if(project.author.toString() !== req.user.id){
            return res.status(401).json({message:'Usuario no autorizado'});
        }

        //actualizar
        const reg = await Project.findByIdAndUpdate(
            {_id:req.params.id},
            {name}
            );
        //mensaje
         res.status(200).json(reg);
        
    } catch (error) {
        res.status(500).send({message:'error'});
        next(error);
    }
}


exports.deleteProject = async (req,res)=>{

    try {
        //revisar el id
        const project = await Project.findOne({_id:req.params.id});

        //si el proyecto existe o no
        if(!project){
            return res.status(404).json({message:'el proyecto no existe'});
        }
        //verificar el creador del proyecto
        if(project.author.toString() !== req.user.id){
            return res.status(401).json({message:'Usuario no autorizado'});
        }

        //actualizar
        const reg = await Project.findByIdAndDelete(
            {_id:req.params.id}
            );
        //mensaje
         res.status(200).json({message:'proyecto eliminado'});
        
    } catch (error) {
        res.status(500).send({message:'error al eliminar el proyecto'});
        next(error);
    }
}