for (var i=1;i<=19;i++){
  operacionesA("Team"+i);
  operacionesC("Team"+i);
  operaciones("Team"+i);
}

function operacionesA(team){
  document.getElementById("apuntos".concat(team)).innerHTML = (parseInt($("#apg".concat(team)).text()) * 3) + parseInt($("#ape".concat(team)).text());
  document.getElementById("apj".concat(team)).innerHTML = parseInt($("#apg".concat(team)).text()) + parseInt($("#ape".concat(team)).text()) + parseInt($("#app".concat(team)).text());
  document.getElementById("adg".concat(team)).innerHTML = parseInt($("#agf".concat(team)).text()) - parseInt($("#agc".concat(team)).text());
}
function operacionesC(team){
  document.getElementById("cpuntos".concat(team)).innerHTML = (parseInt($("#cpg".concat(team)).text()) * 3) + parseInt($("#cpe".concat(team)).text());
  document.getElementById("cpj".concat(team)).innerHTML = parseInt($("#cpg".concat(team)).text()) + parseInt($("#cpe".concat(team)).text()) + parseInt($("#cpp".concat(team)).text());
  document.getElementById("cdg".concat(team)).innerHTML = parseInt($("#cgf".concat(team)).text()) - parseInt($("#cgc".concat(team)).text());
}
function operaciones(team){
  document.getElementById("puntos".concat(team)).innerHTML = parseInt($("#apuntos".concat(team)).text()) + parseInt($("#cpuntos".concat(team)).text());
  document.getElementById("pj".concat(team)).innerHTML = parseInt($("#apj".concat(team)).text()) + parseInt($("#cpj".concat(team)).text());
  document.getElementById("pg".concat(team)).innerHTML = parseInt($("#apg".concat(team)).text()) + parseInt($("#cpg".concat(team)).text());
  document.getElementById("pe".concat(team)).innerHTML = parseInt($("#ape".concat(team)).text()) + parseInt($("#cpe".concat(team)).text());
  document.getElementById("pp".concat(team)).innerHTML = parseInt($("#app".concat(team)).text()) + parseInt($("#cpp".concat(team)).text());
  document.getElementById("gf".concat(team)).innerHTML = parseInt($("#agf".concat(team)).text()) + parseInt($("#cgf".concat(team)).text());
  document.getElementById("gc".concat(team)).innerHTML = parseInt($("#agc".concat(team)).text()) + parseInt($("#cgc".concat(team)).text());
  document.getElementById("dg".concat(team)).innerHTML = parseInt($("#adg".concat(team)).text()) + parseInt($("#cdg".concat(team)).text());
}

// REDUCCION DE PUNTOS
document.getElementById("puntosTeam15").innerHTML = parseInt($("#puntosTeam15").text()) - 1;


$('#tablaApertura').hide();
$('#tablaClausura').hide();
$('#tablaAcumulada').show();
