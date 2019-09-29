// Bruker eksempelet som kom med i oppgaven
var payload = {
  "laanebelop": 2000000,
  "nominellRente": 3,
  "terminGebyr":30,
  "utlopsDato":"2045-01-01",
  "saldoDato":"2020-01-01",
  "datoForsteInnbetaling":"2020-02-01",
  "ukjentVerdi":"TERMINBELOP"
};

// Når man trykker på "hent fil"-knappen så blir nedbetalingsplanen vist på siden
var btn = document.getElementById("btn");

btn.addEventListener("click", function(){
  var jsonFile = JSON.stringify(payload);
  var xhr = new XMLHttpRequest();
  var url = "https://visningsrom.stacc.com/dd_server_laaneberegning/rest/laaneberegning/v1/nedbetalingsplan";
  
  xhr.open('POST', url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
      console.log(xhr.responseText);
      var responseData = JSON.parse(xhr.responseText);
      htmlTable(responseData);
    }else{
      console.error(xhr.statusText);
    };
  };
  xhr.send(jsonFile);
});

//Funksjon for å formatere JSON-data til HTML i en tabell
function htmlTable(data){
  let table = document.getElementById("table");
  let row, cell;

  for(i = 0; i < data.nedbetalingsplan.innbetalinger.length; i++){
    row = table.insertRow();
    cell = row.insertCell();
    cell.textContent = data.nedbetalingsplan.innbetalinger[i].restgjeld;
    cell = row.insertCell();
    cell.textContent = data.nedbetalingsplan.innbetalinger[i].dato;
    cell = row.insertCell();
    cell.textContent = data.nedbetalingsplan.innbetalinger[i].innbetaling;
    cell = row.insertCell();
    cell.textContent = data.nedbetalingsplan.innbetalinger[i].gebyr;
    cell = row.insertCell();
    cell.textContent = data.nedbetalingsplan.innbetalinger[i].renter;
    cell = row.insertCell();
    cell.textContent = data.nedbetalingsplan.innbetalinger[i].total;
  };   
};
