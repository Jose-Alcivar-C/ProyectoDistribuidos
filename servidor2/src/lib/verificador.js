module.exports = {

    estaLogueado(req, res, next){
        
        if(req.isAuthenticated()){
            return next();
        }

        else{
            req.flash("message", "Más despacio, velocista. Primero inicie sesión.");
            return res.redirect("/login");
        }
    },
    
    noestaLogueado(req, res, next){

        if(!req.isAuthenticated()){
            return next();
        }

        else{
            req.flash("exito", "Relax, usted ya ha iniciado sesión");
            return res.redirect("/usuario");
        }
    }
}