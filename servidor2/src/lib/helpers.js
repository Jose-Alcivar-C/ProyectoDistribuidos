const bcrypt = require("bcryptjs");

const helpers ={};

helpers.encriptarContrasenia = async (contrasenia) => {
    
    const salt = await bcrypt.genSalt(10);
    const claveFinal = await bcrypt.hash(contrasenia, salt);
    return claveFinal;

};

helpers.verificarContrasenia = async (contrasenia, claveGuardada) =>{
    try{
        return await bcrypt.compare(contrasenia, claveGuardada);
    }

    catch(e){
        console.log(e);
    }
};

module.exports = helpers;