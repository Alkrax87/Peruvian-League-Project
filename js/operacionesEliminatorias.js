//Bucle de asignación de resultados en la tabla para cada equipo
for (i = 1; i <= 10; i++) {
   FixtureProccess("Team"+i);
}
//Asigntacion de resultados en la tabla mediante el Fixture
function FixtureProccess(team){
   var pg = 0, pe = 0, pp = 0, gf = 0, gc = 0, nteam = 1;

   let lastGames = [
      '<i class="fas fa-circle draw"></i>',
      '<i class="fas fa-circle draw"></i>',
      '<i class="fas fa-circle draw"></i>',
      '<i class="fas fa-circle draw"></i>',
      '<i class="fas fa-circle draw"></i>'];

   while (nteam <= 18) {
      try {
         var club = team+"-F"+nteam;
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
   document.getElementById("pj".concat(team)).innerHTML = pg+pe+pp;
   document.getElementById("puntos".concat(team)).innerHTML = (pg*3)+pe;
   document.getElementById("pg".concat(team)).innerHTML = pg;
   document.getElementById("pe".concat(team)).innerHTML = pe;
   document.getElementById("pp".concat(team)).innerHTML = pp;
   document.getElementById("gf".concat(team)).innerHTML = gf;
   document.getElementById("gc".concat(team)).innerHTML = gc;
   document.getElementById("dg".concat(team)).innerHTML = gf-gc;
   document.getElementById("lastGames".concat(team)).innerHTML = lastGames.join(' ');
}
//Proceso de ordenamiento de la tabla
var table = $('#tablaEliminatorias');
var tbody = $('#table1');

tbody.find('tr').sort(function(a,b) {
   if ($("td", b).eq(2).text() != $("td",a).eq(2).text()) {
      return $("td",b).eq(2).text() - $("td",a).eq(2).text();
   } else if ($("td",b).eq(9).text() != $("td",a).eq(9).text()) {
      return $("td",b).eq(9).text() - $("td",a).eq(9).text();
   } else {
      return $("td",b).eq(7).text() - $("td",a).eq(7).text();
   }
}).appendTo(tbody);

var i = 0;
var j = 1;
while (i < 10) {
   if (i >= 0 && i <= 3) {
      tbody.find("tr").eq(i).find("div").attr("class","clasificacion");
      tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
      i++;
   } else if (i == 4) {
      tbody.find("tr").eq(i).find("div").attr("class","repechaje");
      tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
      i++;
   } else if (i >= 5 && i <= 10) {
      tbody.find("tr").eq(i).find("div").text("");
      tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
      i++;
   }
}