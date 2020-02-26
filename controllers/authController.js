const User = require('../models/User');
const bcript = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


exports.authUser = async (req,res)=>{
    //revisar errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    //    extraer email y password
    const {email, password} = req.body;

    try {
        //revisar que sea un usuario registradi
        let user = await User.findOne({email});
         if(!user){
             return res.status(400).json({message: 'este usuario no existe'});
         }

         //revisar el password
         const pssCorrecto = await bcript.compare(password,user.password);
         if(!pssCorrecto){
            return res.status(400).json({message: 'password incorrecto'});
         }

         //crear y formar jwt
          const payload ={
            user: {
                id: user.id
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

    } catch (error) {
        res.status(500).send({message:'error'});
        next(error);
    }

}


exports.usuarioAutenticado = async (req,res) =>{

   try{

      const usuario = await User.findById(req.user.id).select('-password');
      // console.log(usuario);
      // res.json({usuario});
      res.status(200).json(usuario);
   } catch(error){
        res.status(500).send({message:'error'});
        next(error);
   }
}