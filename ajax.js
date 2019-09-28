var btn = document.getElementById("btn");
btn.addEventListener("click", function(){
  var request = new XMLHttpRequest();
  request.open('GET', 'https://visningsrom.stacc.com/dd_server_laaneberegning/rest/laaneberegning/v1/nedbetalingsplan');
  request.onload = function(){
    var data = JSON.parse(request.responseText);
    console.log(data[0]);
  };
  request.send();
});
\
