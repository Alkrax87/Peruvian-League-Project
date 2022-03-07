for (var i=1;i<=50;i++){
  operaciones("Team"+i);
}

function operaciones(team){
  document.getElementById("puntos".concat(team)).innerHTML = (parseInt($("#pg".concat(team)).text()) * 3) + parseInt($("#pe".concat(team)).text());
  document.getElementById("pj".concat(team)).innerHTML = parseInt($("#pg".concat(team)).text()) + parseInt($("#pe".concat(team)).text()) + parseInt($("#pp".concat(team)).text());
  document.getElementById("dg".concat(team)).innerHTML = parseInt($("#gf".concat(team)).text()) - parseInt($("#gc".concat(team)).text());
}
