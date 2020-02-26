const User = require('../models/User');
const bcript = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req,res)=>{
    //revisar errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    //    extraer email y password
   const {email, password} = req.body;
     try {
         //validar el email
         let user = await User.findOne({email});
         if(user){
             return res.status(400).json({message: 'este correo ya existe'});
         }
         
         //hashear del password 
         req.body.password= await bcript.hash(password,10);

         const reg = await User.create(req.body);

         //crear y formar jwt
         const payload ={
                  user: {
                      id: reg.id
                  }
         }
         //formar el jwt
         jwt.sign(payload,process.env.SECRET,{
             expiresIn: 3600
         },(error,token)=>{
              if(error) throw error;
              //mensaje de confirmacion
              res.json({token: token});
         });

        //  res.status(200).json(reg);
     } catch (error) {
         res.status(500).send({message:'error'});
         next(error);
     }
   
}