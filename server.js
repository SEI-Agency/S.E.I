const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Mapa de chaves de acesso seguras
const accessKeys = {
  "3xTr#9@pLz!Q": 1,
  "R7g$1*aY8w%Fn": 2,
  "jK4^s2&mD6#vX": 3,
  "P9q!5@hZ3*bUl": 4,
  "yE6$8&cN1#aTw": 5,
};

app.post('/login', (req, res) => {
  const { key } = req.body;

  if (accessKeys[key]) {
    res.json({ accessLevel: accessKeys[key] });
  } else {
    res.status(401).json({ message: "Chave inválida" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});