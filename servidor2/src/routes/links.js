const express = require("express");

const router = express.Router();

const pool = require("../database");

const { estaLogueado } = require("../lib/verificador");

//-------------------------------------------------------PARA LAS MASCOTAS--------------------------------------------------------------------
//ventana para añadir mascota
router.get("/mascotas/anadir", estaLogueado, (req, res) => {
    res.render("links/anadirmascota");
});

//añadir mascota
router.post("/mascotas/anadir", estaLogueado, async (req, res) => {

    ruta = "http://localhost:3000/galeria/"+req.file.filename;

    const{ nombre, edad, sexo, descripcion, ciudad, raza } = req.body;

    const newLink = {
        nombre, 
        edad, 
        sexo, 
        descripcion, 
        url_foto: ruta, 
        ciudad, 
        raza,
        id_usuario: req.user.id_usuario
    };
    
    await pool.query("insert into mascota set ?", [newLink]);
    req.flash("exito", "Mascota registrada con éxito.");
    res.redirect("/usuario/mascotas");
});

//ventana para mostrar mascotas
router.get("/mascotas", estaLogueado, async (req, res) => {
    
    const mascotas = await pool.query("select * from mascota where id_usuario = ?", [req.user.id_usuario]);
    res.render("links/mascotas", {mascotas: mascotas});
});

//borrar una mascota
router.get("/mascotas/borrar/:id", estaLogueado, async (req, res) =>{
    const { id } = req.params;
    await pool.query("delete from mascota where id_mascota = ?", [id]);
    req.flash("exito", "Mascota borrada con éxito.");
    res.redirect("/usuario/mascotas");
});

//ventana para editar una mascota
router.get("/mascotas/editar/:id", estaLogueado, async (req, res) =>{
    const { id } = req.params;
    const mascota = await pool.query("select * from mascota where id_mascota =?", [id]);
    res.render("links/editarmascota", { mascota:mascota[0] });
});

//editar mascota
router.post("/mascotas/editar/:id", estaLogueado, async (req, res) =>{
    const { id } = req.params;

    ruta = "http://localhost:3000/galeria/"+req.file.filename;

    const { nombre, edad, sexo, descripcion, ciudad, raza } = req.body;

    const nuevosDatos = {
        nombre, 
        edad, 
        sexo, 
        descripcion, 
        url_foto : ruta, 
        ciudad, 
        raza 
    };

    await pool.query("update mascota set ? where id_mascota = ?", [nuevosDatos, id]);
    req.flash("exito", "Datos de mascota actualizados con éxito.");
    res.redirect("/usuario/mascotas");
});

//-------------------------------------------------------PARA LAS NOTICIAS--------------------------------------------------------------------

//ventana para añadir noticia
router.get("/noticias/anadir", estaLogueado, (req, res) => {
    res.render("links/anadirnoticia");
});

//añadir noticia
router.post("/noticias/anadir", estaLogueado, async (req, res) => {

    const{ titulo, descripcion, enlace, url_foto } = req.body;

        const nuevaNoticia = {
            url_foto,
            titulo,
            descripcion,
            enlace,
            id_usuario: req.user.id_usuario
        };
        
        await pool.query("insert into noticia set ?", [nuevaNoticia]);
        req.flash("exito", "Noticia creada con éxito.");
        res.redirect("/usuario/noticias");
});

//ventana para mostrar noticias
router.get("/noticias", estaLogueado, async (req, res) => {
    
    const noticias = await pool.query("select * from noticia where id_usuario = ?", [req.user.id_usuario]);
    var seHace = true;

    if(noticias.length == 0){
        seHace = false;
    }

    console.log(seHace);

    res.render("links/noticias", {noticias: noticias, seHace: seHace} );
});

//borrar una noticia
router.get("/noticias/borrar/:id", estaLogueado, async (req, res) =>{
    const { id } = req.params;
    await pool.query("delete from noticia where id_noticia = ?", [id]);
    req.flash("exito", "Noticia borrada con éxito.");
    res.redirect("/usuario/noticias");
});

//ventana para editar una noticia
router.get("/noticias/editar/:id", estaLogueado, async (req, res) =>{
    const { id } = req.params;
    const noticia = await pool.query("select * from noticia where id_noticia =?", [id]);
    res.render("links/editarnoticia", { noticia: noticia[0] });
});

//editar noticia
router.post("/noticias/editar/:id", estaLogueado, async (req, res) =>{
    const { id } = req.params;
    const { titulo, descripcion, enlace, url_foto } = req.body;
    const nuevosDatos = {
        url_foto,
        titulo,
        descripcion,
        enlace,
    };

    await pool.query("update noticia set ? where id_noticia = ?", [nuevosDatos, id]);
    req.flash("exito", "Datos de noticia actualizados con éxito.");
    res.redirect("/usuario/noticias");
});

//-------------------------------------------------------PARA LOS MENSAJES--------------------------------------------------------------------

module.exports = router;