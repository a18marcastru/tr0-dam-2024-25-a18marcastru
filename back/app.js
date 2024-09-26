const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(express.json())

app.get('/start', (req, res) => {
  fs.readFile('preguntes2.json', 'utf8', (err, data) => {
    if (err) {
      // Si hay un error al leer el archivo, envía una respuesta de error
      return res.status(500).json({ message: 'Error al leer el archivo JSON' });
    }

    // Convierte el contenido del archivo JSON a objeto JavaScript
    res.json(JSON.parse(data));
  });
});

app.post('/over', (req, res) => {
  //const newObj = aleatorio(obj);
  const pathMainDir = __dirname + "\\Jocs";
  
  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1;
  const year = fechaActual.getFullYear(); 
  const pathDirective = path.join(pathMainDir, `${dia}-${mes}-${year}`);

  if(!fs.existsSync(pathDirective)) {
    fs.mkdir(pathDirective, (err) => {
      if(err) return res.send("Error");
      else return res.send("Creada");
    });
  }
  else res.send("Ya existe");

  // fs.writeFile(pathFile, obj, (err) => {
  //   if(err) return res.status(500).json({mesaje: 'Error al crear archivo'})
  //   res.status(200).json({mensaje: 'Archivo creado'})
  // });
})

app.delete('/eliminar', (req, res) => {
  const newQuestions = req.body.preguntes;

  const newJson = {preguntes: newQuestions}

  const jsonString = JSON.stringify(newJson, null, 2);

  fs.writeFile("preguntes2.json", jsonString, (err) => {
    if(err) console.error("Error", err);
    else console.log("Archivo sobrescrito");
  })

  res.send("Eliminado")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// function random(jsonData) {

//   // let numQ = [];
//   questions2 = jsonData.preguntes;

//   const newJson = questions2.map(q => ({
//     pregunta: q.pregunta,
//     respostes: mezclarRespuestas(q.resposta_correcta, q.respostes_incorrectes),
//     imatge: q.imatge
//   }));

//   // for(let i = 0;i < questions2.length;i++) {
//   //     numQ[i] = questions[Math.floor(Math.random() * questions.length)];
//   // }

//   // const newJson = numQ.map(q => ({
//   //     pregunta: q.pregunta,
//   //     respostes: mezclarRespuestas(q.resposta_correcta, q.respostes_incorrectes),
//   //     imatge: q.imatge
//   // }));

//   return newJson;
// }

// function mezclarRespuestas(resposta_correcta, respostes_incorrectes) {
//   const respuestas = [resposta_correcta, ...respostes_incorrectes];
//   return respuestas.sort(() => Math.random() - 0.5); // Mezcla aleatoria de respuestas
// }