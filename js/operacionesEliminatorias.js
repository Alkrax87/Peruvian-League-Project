for (var i=1;i<=10;i++){
  operaciones("Team"+i);
}

function operaciones(team){
  var puntos = (parseInt($("#pg".concat(team)).text()) * 3) + parseInt($("#pe".concat(team)).text());
  document.getElementById("puntos".concat(team)).innerHTML = puntos;

  var pj = parseInt($("#pg".concat(team)).text()) + parseInt($("#pe".concat(team)).text()) + parseInt($("#pp".concat(team)).text());
  document.getElementById("pj".concat(team)).innerHTML = pj;

  var dg = parseInt($("#gf".concat(team)).text()) - parseInt($("#gc".concat(team)).text());
  document.getElementById("dg".concat(team)).innerHTML = dg;
}
