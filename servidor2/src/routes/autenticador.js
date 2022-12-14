const { Router } = require("express");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { estaLogueado, noestaLogueado} = require("../lib/verificador");

//----------------------PARA REGISTRAR UN NUEVO USUARIO---------------
router.get("/registrese", noestaLogueado, (req, res) =>{
    res.render("autenticacion/registro.hbs");
});

router.post("/registrese", noestaLogueado, passport.authenticate("registro.local", {
    successRedirect: "/usuario",
    failureRedirect: "/registrese",
    failureFlash: true
}));

router.get("/usuario", estaLogueado, (req, res) => {
    res.render("principal");
});

//--------------------PARA INCIAR SESION--------------------------------

router.get("/login", noestaLogueado, (req, res) => {
    res.render("autenticacion/ingreso");    
});

router.post("/login", noestaLogueado, (req, res, next) => {
    passport.authenticate("ingreso.local", {
       successRedirect: "/usuario",
       failureRedirect:"/login",
       failureFlash: true
    })(req, res, next);
});

//--------------------PARA CERRAR SESION--------------------

router.get("/salir", estaLogueado, (req, res) => {
    req.logOut();
    req.flash("exito", "Cierre de sesión satisfactorio");
    res.redirect("/login");
});

module.exports = router;