const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../database");
const helpers = require("../lib/helpers");

//-----------------------------------------PARA REGISTRARSE---------------------------------------------

passport.use("registro.local", new LocalStrategy({
    usernameField: "usuario",
    passwordField: "contrasenia",
    passReqToCallback: true
}, async (req, usuario, contrasenia, done) => {

    const rows = await pool.query("select * from usuario where usuario = ?", [usuario]);

    if(rows.length<1){
        
        const { nombre, apellido, direccion, correo, dia, mes, anio} = req.body;

        const nacimiento = anio + "-" + mes + "-" + dia;
        
        const nuevoUsuario = {
            nombre,
            apellido,
            direccion,
            correo,
            rol: 2,
            nacimiento,
            usuario, 
            contrasenia
        }
        
        nuevoUsuario.contrasenia = await helpers.encriptarContrasenia(contrasenia);

        const result = await pool.query("insert into usuario set ?", [nuevoUsuario]);
        
        nuevoUsuario.id_usuario = result.insertId; 

        return done(null, nuevoUsuario);
    }

    else{
        return done(null, false, req.flash("message" ,"Este nombre de usuario ya existe"));
    }
}));   


passport.serializeUser((user, done) => {
    done(null, user.id_usuario);
});

passport.deserializeUser( async (id_usuario, done) => {
    const rows = await pool.query("select * from usuario where id_usuario = ?", [id_usuario]);
    done(null, rows[0]);
});

//------------------------------------------PARA LOGUEARSE--------------------------------------------------------------

passport.use("ingreso.local", new LocalStrategy({
    usernameField:"usuario",
    passwordField:"contrasenia",
    passReqToCallback: true
}, async (req, usuario, contrasenia, done)=> {
    const rows = await pool.query("select * from usuario where usuario = ?", [usuario]);
    if(rows.length > 0){
        const usu = rows[0];
        const claveValida = await helpers.verificarContrasenia(contrasenia, usu.contrasenia);

        if(claveValida){
            done(null, usu, req.flash("exito", "Inicio de sesión satisfactorio"));
        }

        else{
            done(null, false, req.flash("message", "Usuario o clave incorrectos."));
        }
    }

    else{
        return done(null, false, req.flash("message" ,"Usuario o clave incorrectos."));
    }
}));

