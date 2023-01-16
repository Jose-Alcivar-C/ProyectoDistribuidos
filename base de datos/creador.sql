CREATE DATABASE if not exists proyectodawn;

USE proyectodawn;

-- -------------------------------------TABLA DE USUARIOS-------------------------------------------------
create table if not exists usuario(
    id_usuario int(10) not null,
    nombre varchar(40) not null,
    apellido varchar(40) not null,
    direccion varchar(60) not null,
    correo varchar(40) not null,
    rol enum("administrador", "usuario") not null,
    nacimiento date not null,
    usuario varchar(25) not null,
    contrasenia text not null,
    fecha_creacion timestamp not null default current_timestamp
);

alter table usuario
    add primary key (id_usuario);

alter table usuario
    modify id_usuario int(10) not null auto_increment, auto_increment = 1;

-- -------------------------------------TABLA DE MENSAJES-------------------------------------------------
create table if not exists mensaje(
    id_mensaje int(10) not null,
    mensaje text not null,
    id_usuario int(10) not null,
    fecha_creacion timestamp not null default current_timestamp,
    constraint fk_mensaje foreign key (id_usuario) references usuario(id_usuario) 
);

alter table mensaje
    add primary key (id_mensaje);

alter table mensaje
    modify id_mensaje int(10) not null auto_increment, auto_increment = 1;

-- -------------------------------------TABLA DE NOTICIA-------------------------------------------------
create table if not exists noticia(
    id_noticia int(10) not null,
    url_foto text not null,
    titulo text not null,
    descripcion text not null,
    enlace text not null,
    id_usuario int(10) not null,
    fecha_creacion timestamp not null default current_timestamp,
    constraint fk_noticia foreign key (id_usuario) references usuario(id_usuario)
);

alter table noticia
    add primary key (id_noticia);

alter table noticia
    modify id_noticia int(10) not null auto_increment, auto_increment = 1;

-- -------------------------------------TABLA DE MASCOTAS-------------------------------------------------
create table if not exists mascota(
    id_mascota int(10) not null,
    nombre varchar(20) not null,
    edad varchar(10) not null,
    sexo varchar(10) not null,
    descripcion text not null,
    url_foto text not null,
    ciudad varchar(50) not null,
    raza varchar(50) not null,
    id_usuario int(10),
    fecha_creacion timestamp not null default current_timestamp,
    constraint fk_mascota foreign key (id_usuario) references usuario(id_usuario)
);

alter table mascota
    add primary key (id_mascota);

alter table mascota
    modify id_mascota int(10) not null auto_increment, auto_increment = 1;