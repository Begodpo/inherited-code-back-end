// Importamos los dos módulos de NPM necesarios para trabajar
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

// Creamos el servidor
const server = express();

// Configuramos el servidor
server.use(cors());
server.use(express.json());
server.set("view engine", "ejs");

// Arrancamos el servidor en el puerto 4000
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

const savedCards = [];

// Escribimos los endpoints que queramos
server.post("/card", (req, res) => {
  const responseError = {
    sucess: false,
    error: "Error description",
  };
  if (req.body.name !== "" && req.body.job !== "") {
    const newCardData = {
      ...req.body,
      id: uuidv4(),
    };
    savedCards.push(newCardData);
    //console.log(savedCards);
    const responseSuccess = {
      sucess: true,
      cardURL: `https://localhost:4000/card/${newCardData.id}`,
    };
    res.json(responseSuccess);
  } else {
    res.json(responseError);
  }
});

server.get("/card/:id", (req, res) => {
  console.log(req.params.id);
  const userCard = savedCards.find((card) => card.id === req.params.id);
  res.render("pages/card", userCard);
});

const staticServerPath = "./src/public-react";
server.use(express.static(staticServerPath));
