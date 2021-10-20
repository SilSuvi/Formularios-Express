const express = require("express");
const servidor = express();

let lista = [
  {
    nombre: "Olivia",
    edad: 2,
    tipo: "perro",
  },
  {
    nombre: "Dune",
    edad: 7,
    tipo: "gato",
  },
  {
    nombre: "Thedas",
    edad: 6,
    tipo: "perro",
  },
  {
    nombre: "Fuji",
    edad: 13,
    tipo: "perro",
  },
  {
    nombre: "Tibet",
    edad: 2,
    tipo: "perro",
  },
];

servidor.get("/", (req, res) => {
  let mostrar = "";
  for (let i = 0; i < lista.length; i++) {
    mostrar += `
            <h3>Nombre: ${lista[i].nombre}</h3>
            <p>Edad: ${lista[i].edad}</p>
            <p>Tipo: ${lista[i].tipo}</p>
            <form action="/adoptar">	
            <input type="hidden" value="${lista[i].nombre}" name="nombre">
            <button type=“submit”>Adoptar</button>
        </form>
        `;
  }
  res.send(mostrar);
});

servidor.get("/sumar-animal", (req, res) => {
  let nombre = req.query.nombre;
  let edad = req.query.edad;
  let tipo = req.query.tipo;

  let animal = {
    nombre: nombre,
    edad: edad,
    tipo: tipo,
  };
  lista.push(animal);
  res.send("El animal ha sido añadido");
});

servidor.get("/dejar-animal", (req, res) => {
  let formulario = `
        <form action="/sumar-animal">	
            <input placeholder="nombre" type="text" name="nombre">
            <input placeholder="edad" type="text" name="edad">
            <input placeholder="tipo" type="text" name="tipo">
            <button type=“submit”>Enviar</button>
        </form>
    `;
  res.send(formulario);
});

servidor.get("/adoptar", (req, res) => {
  console.log(req.query.nombre);
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].nombre === req.query.nombre) {
      lista.splice(i, 1);
      res.send("<h3>Animal adoptado</h3>");
      break;
    }
  }
  res.send("<h3>No se ha encontrado ese animal</h3>");
});

servidor.listen(process.env.PORT || 3000);
