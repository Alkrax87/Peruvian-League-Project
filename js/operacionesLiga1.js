//Bucle de asignación de resultados en la tabla para cada equipo
for (i = 1; i <= 19; i++) {
   FixtureProcessA("Team"+i);
   FixtureProcessC("Team"+i);
   TablaAcumulado("Team"+i);
}
//Asigntacion de resultados en la tabla mediante el Fixture Apertura y Clausura
function FixtureProcessA(team){
   var pg = 0, pe = 0, pp = 0, gf = 0, gc = 0, nteam = 1;

   let lastGames = [
      '<i class="fas fa-circle draw"></i>',
      '<i class="fas fa-circle draw"></i>',
      '<i class="fas fa-circle draw"></i>',
      '<i class="fas fa-circle draw"></i>',
      '<i class="fas fa-circle draw"></i>'];

   while (nteam <= 19) {
      try {
         var club = team+"-AF"+nteam;
         if (document.getElementById(club).parentElement){
            var score = document.getElementById(club).parentElement;
            localid = score.getElementsByTagName('span')[0].id;
            visitanteid = score.getElementsByTagName('span')[1].id;
            localscore = parseInt(score.getElementsByTagName('span')[0].textContent);
            visitantescore = parseInt(score.getElementsByTagName('span')[1].textContent);

            if(localid==club){
               if(isNaN(localscore) || isNaN(visitantescore)){
                  nteam++;
               } else {
                  gf = gf + localscore;
                  gc = gc + visitantescore;
                  if (localscore > visitantescore){
                     pg = pg + 1;
                     lastGames.unshift('<i class="fas fa-check-circle win"></i>');
                     lastGames.pop();
                  } else if (localscore < visitantescore){
                     pp = pp + 1;
                     lastGames.unshift('<i class="fas fa-times-circle lose"></i>');
                     lastGames.pop();
                  } else {
                     pe = pe + 1;
                     lastGames.unshift('<i class="fas fa-minus-circle draw"></i>');
                     lastGames.pop();
                  }
                  nteam++;
               }
            } else if(visitanteid==club){
               if(isNaN(localscore) || isNaN(visitantescore)){
                  nteam++;
               } else {
                  gf = gf + visitantescore;
                  gc = gc + localscore;
                  if (visitantescore > localscore){
                     pg = pg + 1;
                     lastGames.unshift('<i class="fas fa-check-circle win"></i>');
                     lastGames.pop();
                  } else if (visitantescore < localscore){
                     pp = pp + 1;
                     lastGames.unshift('<i class="fas fa-times-circle lose"></i>');
                     lastGames.pop();
                  } else {
                     pe = pe + 1;
                     lastGames.unshift('<i class="fas fa-minus-circle draw"></i>');
                     lastGames.pop();
                  }
                  nteam++;
               }
            }
         }
      } catch (error) {
         nteam++;
      }
   }
   document.getElementById("apuntos".concat(team)).innerHTML = (pg*3)+pe;
   document.getElementById("apj".concat(team)).innerHTML = pg+pe+pp;
   document.getElementById("apg".concat(team)).innerHTML = pg;
   document.getElementById("ape".concat(team)).innerHTML = pe;
   document.getElementById("app".concat(team)).innerHTML = pp;
   document.getElementById("agf".concat(team)).innerHTML = gf;
   document.getElementById("agc".concat(team)).innerHTML = gc;
   document.getElementById("adg".concat(team)).innerHTML = gf-gc;
   document.getElementById("alg".concat(team)).innerHTML = lastGames.join(' ');
}
function FixtureProcessC(team){
   var pg = 0, pe = 0, pp = 0, gf = 0, gc = 0, nteam = 1;

   let lastGames = [
      '<i class="fas fa-circle draw"></i>',
      '<i class="fas fa-circle draw"></i>',
      '<i class="fas fa-circle draw"></i>',
      '<i class="fas fa-circle draw"></i>',
      '<i class="fas fa-circle draw"></i>'];

   while (nteam <= 19) {
      try {
         var club = team+"-CF"+nteam;
         if (document.getElementById(club).parentElement){
            var score = document.getElementById(club).parentElement;
            localid = score.getElementsByTagName('span')[0].id;
            visitanteid = score.getElementsByTagName('span')[1].id;
            localscore = parseInt(score.getElementsByTagName('span')[0].textContent);
            visitantescore = parseInt(score.getElementsByTagName('span')[1].textContent);

            if(localid==club){
               if(isNaN(localscore) || isNaN(visitantescore)){
                  nteam++;
               } else {
                  gf = gf + localscore;
                  gc = gc + visitantescore;
                  if (localscore > visitantescore){
                     pg = pg + 1;
                     lastGames.unshift('<i class="fas fa-check-circle win"></i>');
                     lastGames.pop();
                  } else if (localscore < visitantescore){
                     pp = pp + 1;
                     lastGames.unshift('<i class="fas fa-times-circle lose"></i>');
                     lastGames.pop();
                  } else {
                     pe = pe + 1;
                     lastGames.unshift('<i class="fas fa-minus-circle draw"></i>');
                     lastGames.pop();
                  }
                  nteam++;
               }
            } else if(visitanteid==club){
               if(isNaN(localscore) || isNaN(visitantescore)){
                  nteam++;
               } else {
                  gf = gf + visitantescore;
                  gc = gc + localscore;
                  if (visitantescore > localscore){
                     pg = pg + 1;
                     lastGames.unshift('<i class="fas fa-check-circle win"></i>');
                     lastGames.pop();
                  } else if (visitantescore < localscore){
                     pp = pp + 1;
                     lastGames.unshift('<i class="fas fa-times-circle lose"></i>');
                     lastGames.pop();
                  } else {
                     pe = pe + 1;
                     lastGames.unshift('<i class="fas fa-minus-circle draw"></i>');
                     lastGames.pop();
                  }
                  nteam++;
               }
            }
         }
      } catch (error) {
         nteam++;
      }
   }
   document.getElementById("cpuntos".concat(team)).innerHTML = (pg*3)+pe;
   document.getElementById("cpj".concat(team)).innerHTML = pg+pe+pp;
   document.getElementById("cpg".concat(team)).innerHTML = pg;
   document.getElementById("cpe".concat(team)).innerHTML = pe;
   document.getElementById("cpp".concat(team)).innerHTML = pp;
   document.getElementById("cgf".concat(team)).innerHTML = gf;
   document.getElementById("cgc".concat(team)).innerHTML = gc;
   document.getElementById("cdg".concat(team)).innerHTML = gf-gc;
   document.getElementById("clg".concat(team)).innerHTML = lastGames.join(' ');
}
function TablaAcumulado(team){
   document.getElementById("puntos".concat(team)).innerHTML = parseInt($("#apuntos".concat(team)).text()) + parseInt($("#cpuntos".concat(team)).text());
   document.getElementById("pj".concat(team)).innerHTML = parseInt($("#apj".concat(team)).text()) + parseInt($("#cpj".concat(team)).text());
   document.getElementById("pg".concat(team)).innerHTML = parseInt($("#apg".concat(team)).text()) + parseInt($("#cpg".concat(team)).text());
   document.getElementById("pe".concat(team)).innerHTML = parseInt($("#ape".concat(team)).text()) + parseInt($("#cpe".concat(team)).text());
   document.getElementById("pp".concat(team)).innerHTML = parseInt($("#app".concat(team)).text()) + parseInt($("#cpp".concat(team)).text());
   document.getElementById("gf".concat(team)).innerHTML = parseInt($("#agf".concat(team)).text()) + parseInt($("#cgf".concat(team)).text());
   document.getElementById("gc".concat(team)).innerHTML = parseInt($("#agc".concat(team)).text()) + parseInt($("#cgc".concat(team)).text());
   document.getElementById("dg".concat(team)).innerHTML = parseInt($("#adg".concat(team)).text()) + parseInt($("#cdg".concat(team)).text());

   //APERTURA LAST GAMES
   /*$("#dbacumulado").hide();
      for (var i = 0; i <= 18; i++) {
      var lg1 = $('#table1').find('tr').eq(i).find('td').eq(10).find('i').eq(0).attr("class");
      var lg2 = $('#table1').find('tr').eq(i).find('td').eq(10).find('i').eq(1).attr("class");
      var lg3 = $('#table1').find('tr').eq(i).find('td').eq(10).find('i').eq(2).attr("class");
      var lg4 = $('#table1').find('tr').eq(i).find('td').eq(10).find('i').eq(3).attr("class");
      var lg5 = $('#table1').find('tr').eq(i).find('td').eq(10).find('i').eq(4).attr("class");

      $('#table3').find('tr').eq(i).find('td').eq(10).find('i').eq(0).removeClass().addClass(lg1);
      $('#table3').find('tr').eq(i).find('td').eq(10).find('i').eq(1).removeClass().addClass(lg2);
      $('#table3').find('tr').eq(i).find('td').eq(10).find('i').eq(2).removeClass().addClass(lg3);
      $('#table3').find('tr').eq(i).find('td').eq(10).find('i').eq(3).removeClass().addClass(lg4);
      $('#table3').find('tr').eq(i).find('td').eq(10).find('i').eq(4).removeClass().addClass(lg5);
   }*/
   //CLAUSURA LAST GAMES
   for (var i = 0; i <= 18; i++) {
      var lg1 = $('#table2').find('tr').eq(i).find('td').eq(10).find('i').eq(0).attr("class");
      var lg2 = $('#table2').find('tr').eq(i).find('td').eq(10).find('i').eq(1).attr("class");
      var lg3 = $('#table2').find('tr').eq(i).find('td').eq(10).find('i').eq(2).attr("class");
      var lg4 = $('#table2').find('tr').eq(i).find('td').eq(10).find('i').eq(3).attr("class");
      var lg5 = $('#table2').find('tr').eq(i).find('td').eq(10).find('i').eq(4).attr("class");

      $('#table3').find('tr').eq(i).find('td').eq(10).find('i').eq(0).removeClass().addClass(lg1);
      $('#table3').find('tr').eq(i).find('td').eq(10).find('i').eq(1).removeClass().addClass(lg2);
      $('#table3').find('tr').eq(i).find('td').eq(10).find('i').eq(2).removeClass().addClass(lg3);
      $('#table3').find('tr').eq(i).find('td').eq(10).find('i').eq(3).removeClass().addClass(lg4);
      $('#table3').find('tr').eq(i).find('td').eq(10).find('i').eq(4).removeClass().addClass(lg5);
   }
}
//Reducción de puntos
document.getElementById("puntosTeam15").innerHTML = parseInt($("#puntosTeam15").text()) - 3;
document.getElementById("puntosTeam12").innerHTML = parseInt($("#puntosTeam12").text()) - 1;
document.getElementById("puntosTeam10").innerHTML = parseInt($("#puntosTeam10").text()) - 1;
document.getElementById("puntosTeam9").innerHTML = parseInt($("#puntosTeam9").text()) - 1;
//Proceso de ordenamiento de la tabla
//Apertura
var table = $('#tablaApertura');
var tbody = $('#table1')

tbody.find('tr').sort(function(a, b) {
   if ($("td", b).eq(2).text() != $("td", a).eq(2).text()) {
      return $("td", b).eq(2).text() - $("td", a).eq(2).text();
   } else if ($("td", b).eq(9).text() != $("td", a).eq(9).text()) {
      return $("td", b).eq(9).text() - $("td", a).eq(9).text();
   } else {
      return $("td", b).eq(7).text() - $("td", a).eq(7).text();
   }
}).appendTo(tbody);

var i = 0;
var j = 1;
while (i < 19) {
   if (i == 0) {
      tbody.find("tr").eq(i).find("div").attr("class", "winner");
      tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
      i++;
   } else if (i >= 1 && i < 19) {
      tbody.find("tr").eq(i).find("div").attr("class", "");
      tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
      i++;
   }
}

//Clausura
var table = $('#tablaClausura');
var tbody = $('#table2')

tbody.find('tr').sort(function(a, b) {
   if ($("td", b).eq(2).text() != $("td", a).eq(2).text()) {
      return $("td", b).eq(2).text() - $("td", a).eq(2).text();
   } else if ($("td", b).eq(9).text() != $("td", a).eq(9).text()) {
      return $("td", b).eq(9).text() - $("td", a).eq(9).text();
   } else {
      return $("td", b).eq(7).text() - $("td", a).eq(7).text();
   }
}).appendTo(tbody);

var i = 0;
var j = 1;
while (i < 19) {
   if (i == 0) {
      tbody.find("tr").eq(i).find("div").attr("class", "winner");
      tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
      i++;
   } else if (i >= 1 && i < 19) {
      tbody.find("tr").eq(i).find("div").attr("class", "");
      tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
      i++;
   }
}

//Acumulado
var table = $('#tablaAcumulada');
var tbody = $('#table3')

tbody.find('tr').sort(function(a, b) {
   if ($("td", b).eq(2).text() != $("td", a).eq(2).text()) {
      return $("td", b).eq(2).text() - $("td", a).eq(2).text();
   } else if ($("td", b).eq(9).text() != $("td", a).eq(9).text()) {
      return $("td", b).eq(9).text() - $("td", a).eq(9).text();
   } else {
      return $("td", b).eq(7).text() - $("td", a).eq(7).text();
   }
}).appendTo(tbody);

var i = 0;
var j = 1;
while (i < 19) {
   if (i >= 0 && i <= 3) {
      tbody.find("tr").eq(i).find("div").attr("class", "libertadores");
      tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
      i++;
   } else if (i >= 4 && i <= 7) {
      tbody.find("tr").eq(i).find("div").attr("class", "sudamericana");
      tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
      i++;
   } else if (i >= 8 && i <= 15) {
      tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
      i++;
   } else if (i == 16) {
      tbody.find("tr").eq(i).find("div").attr("class", "revalidacion");
      tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
      i++;
   } else if (i >= 17 && i < 19) {
      tbody.find("tr").eq(i).find("div").attr("class", "descenso");
      tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
      i++;
   }
}
//Otros
$('#tablaApertura').hide();
$('#tablaClausura').hide();
$('#tablaAcumulada').show();