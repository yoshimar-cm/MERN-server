const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    //leer el token del header
     const token = req.header('x-auth-token');

    //revisar si no hay token
    if(!token){
        return res.status(401).json({menssage:'no exite un token, permison denegado'});
    }

    //validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRET);
        req.user = cifrado.user;
        next();
    } catch (error) {
        res.status(401).json({menssage:'token no valido'});
    }
}