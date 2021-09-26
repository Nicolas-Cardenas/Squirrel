const url =
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";

function leerDatos(url) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      crearTabla(res);
      crearTablaCorrelacion(res);
    });
}

function crearTabla(datos) {
  let body = document.body;
  titulo = document.createElement("H1");
  titulo.innerText = "Events";
  tabla = document.createElement("table");
  tabla.classList.add("table");

  thead = document.createElement("thead");
  tr = document.createElement("tr");
  th = document.createElement("th");
  tr.appendChild(th).innerText = "#";
  th = document.createElement("th");
  tr.appendChild(th).innerText = "Events";
  th = document.createElement("th");
  tr.appendChild(th).innerText = "Squirrel";

  thead.appendChild(tr);
  tabla.appendChild(thead);

  tbod = document.createElement("tbody");

  tbod = document.createElement("tbody");
  for (var index = 0; index < datos.length; index++) {
    var tr = tbod.insertRow();

    var td = tr.insertCell();
    td.appendChild(document.createTextNode(index + 1));

    var td = tr.insertCell();
    td.appendChild(document.createTextNode(datos[index]["events"]));

    var td = tr.insertCell();
    td.appendChild(document.createTextNode(datos[index]["squirrel"]));

    if (datos[index]["squirrel"]) {
      tr.style.backgroundColor = "pink";
    }
  }
  tabla.appendChild(tbod);
  body.appendChild(titulo);
  body.appendChild(tabla);
}

function crearTablaCorrelacion(datos) {
  var contados = {};
  var valores = [];

  for (var i = 0; i < datos.length; i++) {
    item = datos[i];
    var events = item.events;
    for (var j = 0; j < Object.keys(datos[i]).length; j++) {
      if (!(events[j] in contados)) {
        contados[events[j]] = 1;
        valores.push({ event: events[j], val: correlacion(events[j], datos) });
      }
    }
  }

  valores = valores.sort(function (a, b) {
    return b.val - a.val;
  });

  var body = document.body;
  var titulo = document.createElement("H1");
  titulo.innerText = "Correlation of events";
  tbl = document.createElement("table");
  tbl.classList.add("table");

  thead = document.createElement("thead");
  tr = document.createElement("tr");
  th = document.createElement("th");
  tr.appendChild(th).innerText = "#";
  th = document.createElement("th");
  tr.appendChild(th).innerText = "Event";
  th = document.createElement("th");
  tr.appendChild(th).innerText = "Correlation";

  thead.appendChild(tr);
  tbl.appendChild(thead);

  tbod = document.createElement("tbody");

  for (var i = 0; i < valores.length; i++) {
    var tr = tbod.insertRow();
    var td = tr.insertCell();
    td.appendChild(document.createTextNode(i + 1));
    var td = tr.insertCell();
    td.appendChild(document.createTextNode(valores[i].event));
    var td = tr.insertCell();
    td.appendChild(document.createTextNode(valores[i].val));
  }

  tbl.appendChild(tbod);
  body.appendChild(titulo);
  body.appendChild(tbl);
}

function correlacion(evento, json) {
  var array = [0, 0, 0, 0];
  for (var index = 0; index < json.length; index++) {
    var act = json[index];
    var A = 0;
    if (act.events.indexOf(evento) != -1) {
      A += 1;
    }
    if (act.squirrel) {
      A += 2;
    }
    array[A] += 1;
  }
  TN = array[0];
  FN = array[1];
  FP = array[2];
  TP = array[3];

  MCC =
    (TP * TN - FP * FN) /
    Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN));
  return MCC;
}

leerDatos(url);

/*const titulo = document.getElementById("titulo");
const parrafo = document.getElementById('parrafo');

titulo.textContent='Nuevo valor para el titulo';
parrafo.innerHTML = '<strong>Nuevo valor para el parrafo</strong>';

//Devuelve una coleccion
const titulos = document.getElementsByTagName('h1');

const warningParagraph = document.getElementsByClassName("warning");

for (let index = 0; index < titulos.length; index++) {
    titulos[index].textContent = "Nuevo titulo"
    
}


const parrafo1 = document.querySelector('p');
const parrafos = document.querySelectorAll('p');
const parrafosWarning = document.querySelectorAll("p.warning"); 
//const parrafoPorId = document.querySelectorAll('p#parrafo');
//const parrafosHijos = document.querySelectorAll('nav p');


const forms = document.forms;
//Hipervinculos
document.anchors
.body
.images
.scripts


const titulo = document.getElementById("titulo");

titulo.textContent = "Nuevo titulo";
titulo.style.color = "blue";
titulo.style.backgroundColor = "red";

titulo.onclick = changeText;
function changeText(element) {
  element.target.innerHTML = "Nuevo valor";
}

titulo.onmouseover = changeColor;
function changeColor(element) {
  element.target.style.color = "green";
}

titulo.addEventListener("click", () => {
  console.log("cliked!!");
});

titulo.addEventListener("click", () => {
  console.log("cliked again!!");
});

let paragraph = document.createElement("p");
let node = document.createTextNode("Parrafo con nuevo texto");
paragraph.appendChild(node);

const container = document.getElementById("container");
container.appendChild(paragraph);

let title = document.createElement("h2");
title.innerHTML = "Contenido del title";
container.appendChild(title);
*/
