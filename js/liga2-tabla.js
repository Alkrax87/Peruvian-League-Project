//Llamado al JSON de la Liga 1
function cargarDatos() {
   return fetch('./js/liga2.json')
      .then(response => response.json())
      .then(data => {
         return data;
      })
      .catch(error => {
         console.error('Error al cargar el archivo JSON:', error);
      });
}

//Seteo de la informacion enla pagina web
cargarDatos().then(datos => {

   //Fill de equipos navbar
   let teamsH = document.querySelector('#teams-header');
   teamsH.innerHTML = '';
   for(let item of datos.Teams){
      teamsH.innerHTML += `
         <a class="nav-item" href="${item.url}"><img src="${item.image}" alt="${item.alt}" class="logos-header"></a>
      `
   }

   //Fill de info sobre la temporada
   document.getElementById("temporadaH").innerHTML = "<b>"+datos.Info.temporada+"</b>";
   document.getElementById("temporadaR").innerHTML = "<b>"+datos.Info.temporada+"</b>";
   document.getElementById("equiposH").innerHTML = "<b>"+datos.Info.equipos+"</b>";
   document.getElementById("equiposR").innerHTML = "<b>"+datos.Info.equipos+"</b>";

   //Fill tabla Apertura
   let teamsApertura = document.querySelector('#table1');
   teamsApertura.innerHTML = '';
   var position = 1;
   for(let item of datos.Teams){
      teamsApertura.innerHTML += `
            <th><div></div></th>
            <th>${position}</th>
            <td><img src="${item.image}" alt="${item.alt}" class="logos"></td>
            <td class="text-start nospace"><a href="${item.url}" class="teamstext">${item.name}</a></td>
            <td class="fw-bold" id="apuntos${item.id}">0</td>
            <td id="apj${item.id}">0</td>
            <td id="apg${item.id}">0</td>
            <td id="ape${item.id}">0</td>
            <td id="app${item.id}">0</td>
            <td id="agf${item.id}">0</td>
            <td id="agc${item.id}">0</td>
            <td id="adg${item.id}">0</td>
            <td id="alg${item.id}" class="nospace">d</td>
         </tr>
      `
      position++
   }

   //Fill tabla Clausura
   let teamsClausura = document.querySelector('#table2');
   teamsClausura.innerHTML = '';
   var position = 1;
   for(let item of datos.Teams){
      teamsClausura.innerHTML += `
         <tr class="tableitem">
            <th><div></div></th>
            <th>${position}</th>
            <td><img src="${item.image}" alt="${item.alt}" class="logos"></td>
            <td class="text-start nospace"><a href="${item.url}" class="teamstext">${item.name}</a></td>
            <td class="fw-bold" id="cpuntos${item.id}">0</td>
            <td id="cpj${item.id}">0</td>
            <td id="cpg${item.id}">0</td>
            <td id="cpe${item.id}">0</td>
            <td id="cpp${item.id}">0</td>
            <td id="cgf${item.id}">0</td>
            <td id="cgc${item.id}">0</td>
            <td id="cdg${item.id}">0</td>
            <td id="clg${item.id}" class="nospace"></td>
         </tr>
      `
      position++
   }

   //Fill tabla Acumulada
   let teamsAcumulado = document.querySelector('#table3')
   teamsAcumulado.innerHTML = '';
   var position = 1, identifier = 0;
   for(let item of datos.Teams){
      teamsAcumulado.innerHTML += `
         <tr class="tableitem">
            <th><div data-identifier="${identifier}"></div></th>
            <th>${position}</th>
            <td><img src="${item.image}" alt="${item.alt}" class="logos"></td>
            <td class="text-start nospace"><a href="${item.url}" class="teamstext">${item.name}</a></td>
            <td class="fw-bold" id="puntos${item.id}">0</td>
            <td id="pj${item.id}">0</td>
            <td id="pg${item.id}">0</td>
            <td id="pe${item.id}">0</td>
            <td id="pp${item.id}">0</td>
            <td id="gf${item.id}">0</td>
            <td id="gc${item.id}">0</td>
            <td id="dg${item.id}">0</td>
            <td class="nospace">
               <i class=""></i>
               <i class=""></i>
               <i class=""></i>
               <i class=""></i>
               <i class=""></i>
            </td>
         </tr>
      `
      position++
      identifier++
   }

   //Ocultar tablas
   $('#tablaApertura').hide();
   $('#tablaClausura').hide();
   $('#tablaAcumulada').show();

   //Fill Fixture Apertura
   const fechasApertura = [];
   for (let i = 1; i <= 14; i++) {
      fechasApertura.push(datos.Apertura['F' + i]);
   }
   for (let i = 1; i <= 14; i++) {
      for (let j = 1; j <= 14; j++) {
         try {
            const id = 'Team' + i + '-AF' + j;
            const fecha = fechasApertura[j - 1][i - 1];
            document.getElementById(id).innerHTML = fecha;
         } catch (e) {
            //console.error(`No se pudo encontrar el elemento con ID ${id}: ${e.message}`);
         }
      }
   }

   //Fill Fixture Clausura
   const fechasClausura = [];
   for (let i = 1; i <= 14; i++) {
      fechasClausura.push(datos.Clausura['F' + i]);
   }
   for (let i = 1; i <= 14; i++) {
      for (let j = 1; j <= 14; j++) {
         try {
            const id = 'Team' + i + '-CF' + j;
            const fecha = fechasClausura[j - 1][i - 1];
            document.getElementById(id).innerHTML = fecha;
         } catch (e) {
            //console.error(`No se pudo encontrar el elemento con ID ${id}: ${e.message}`);
         }
      }
   }

   //Bucle de asignación de resultados en la tabla para cada equipo
   for (i = 1; i <= 14; i++) {
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

      while (nteam <= 14) {
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
      var difga = gf-gc;
      if (difga > 0) {
         document.getElementById("adg".concat(team)).innerHTML = "+" + difga
      } else {
         document.getElementById("adg".concat(team)).innerHTML = difga
      }
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

      while (nteam <= 14) {
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
      var difgc = gf-gc;
      if (difgc > 0) {
         document.getElementById("cdg".concat(team)).innerHTML = "+" + difgc
      } else {
         document.getElementById("cdg".concat(team)).innerHTML = difgc
      }
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
      var difg = parseInt($("#adg".concat(team)).text()) + parseInt($("#cdg".concat(team)).text());
      if (difg > 0) {
         document.getElementById("dg".concat(team)).innerHTML = "+" + difg
      } else {
         document.getElementById("dg".concat(team)).innerHTML = difg
      }

      //Asignacion de iconos de ultmos 5 partidos
      var tabla;
      if (datos.Info.apertura) {
         tabla = $('#table1');
      } else if (datos.Info.clausura) {
         tabla = $('#table2');
      }
      for (var i = 0; i <= 13; i++) {
         var row = tabla.find('tr').eq(i);
         var row3 = $('#table3').find('tr').eq(i);
         var icons = row.find('td').eq(10).find('i');
         icons.each(function(j) {
            var iconClass = $(this).attr('class');
            row3.find('td').eq(10).find('i').eq(j).removeClass().addClass(iconClass);
         });
      }
   }

   //Proceso de ordenamiento de la tabla
   function ordenarTabla(tableID){
      var table = $(tableID);
      var tbody = table.find('tbody')
      tbody.find('tr').sort(function(a, b) {
         if ($("td", b).eq(2).text() != $("td", a).eq(2).text()) {
            return $("td", b).eq(2).text() - $("td", a).eq(2).text();
         } else if ($("td", b).eq(9).text() != $("td", a).eq(9).text()) {
            return $("td", b).eq(9).text() - $("td", a).eq(9).text();
         } else {
            return $("td", b).eq(7).text() - $("td", a).eq(7).text();
         }
      }).appendTo(tbody);
      return tbody;
   }
   function winner(tableBody){
      var i = 0;
      var j = 1;
      while (i < 19) {
         if (i == 0) {
            tableBody.find("tr").eq(i).find("div").attr("class", "winner");
            tableBody.find("tr").eq(i).find("th").eq(1).text(j + i);
            i++;
         } else if (i >= 1 && i < 19) {
            tableBody.find("tr").eq(i).find("div").attr("class", "");
            tableBody.find("tr").eq(i).find("th").eq(1).text(j + i);
            i++;
         }
      }
   }
   //Apertura
   var bodyApertura = ordenarTabla('#tablaApertura');
   winner(bodyApertura);
   //Clausura
   var bodyClausura = ordenarTabla('#tablaClausura');
   winner(bodyClausura);
   //Acumulado
   var bodyAcumulado = ordenarTabla('#tablaAcumulada');
   var i = 0;
   var j = 1;
   while (i < 14) {
      if (i == 0) {
         bodyAcumulado.find("tr").eq(i).find("div").attr("class", "ascenso");
         bodyAcumulado.find("tr").eq(i).find("th").eq(1).text(j + i);
         i++;
      } else if (i >= 1 && i < 7) {
         bodyAcumulado.find("tr").eq(i).find("div").attr("class", "playoff");
         bodyAcumulado.find("tr").eq(i).find("th").eq(1).text(j + i);
         i++;
      } else if (i >= 7 && i < 13) {
         bodyAcumulado.find("tr").eq(i).find("th").eq(1).text(j + i);
         i++;
      } else if (i == 13) {
         bodyAcumulado.find("tr").eq(i).find("div").attr("class", "descenso");
         bodyAcumulado.find("tr").eq(i).find("th").eq(1).text(j + i);
         i++;
      }
   }

   //Ocultar Fixtures
   ocultarFixture("A");
	ocultarFixture("C");
   //Activar solo la fecha que se esta jugando
   //Mostrar fixture activo del torneo en curso
   $(`#AFecha-${datos.Info.fechaApertura}`).show();
   $(`#BAFecha-${datos.Info.fechaApertura}`).addClass("btn-Fixture-Active1");
   $(`#CFecha-${datos.Info.fechaClausura}`).show();
   $(`#BCFecha-${datos.Info.fechaClausura}`).addClass("btn-Fixture-Active1");

   if (datos.Info.apertura) {
      $('#FixtureApertura').show();
      FixtureSelector('apertura')
   } else if (datos.Info.clausura) {
      $('#FixtureClausura').show();
      FixtureSelector('clausura')
   }

   //Seteo de Finalistas
   if (datos.Campeon.status) {
      document.getElementById("Ascendido").innerHTML = "<b>"+datos.Campeon.name+"</b>";
      document.querySelector('#Winner').innerHTML = `
         <img src="${datos.Campeon.image}" alt="${datos.Campeon.alt}" class="finalist-team">
         <p class="teamsfinal">${datos.Campeon.name}</p>
      `
   }

   //================================================================================================
   //PLAYOFFF
   //================================================================================================
   //================================================================================================
   //Seteo 4vos de final
   //================================================================================================
   if (datos.Info.t4tos){

       //Seteo de Clasificados
      const clasificadosPlayOff = document.querySelectorAll('.playoff');
      var clasificados = [];
      for (let i = 0; i < 6; i++) {
         clasificados[i] = clasificadosPlayOff[i].getAttribute('data-identifier');
         const equipo = datos.Teams[clasificados[i]];
         const equipoHTML = `<div data-identifier="${clasificados[i]}"><img class="logos-sm" src="${equipo.image}" alt="${equipo.alt}">${equipo.name}</div>`;
         document.getElementById(`Pos${i + 2}`).innerHTML = equipoHTML;
      }

      for (let i = 0; i < 2; i++) {
         document.getElementById("CF"+(i+1)+"TeamA-ida").innerHTML = datos.Cuartos[i].idaA;
         document.getElementById("CF"+(i+1)+"TeamB-ida").innerHTML = datos.Cuartos[i].idaB;
         document.getElementById("CF"+(i+1)+"TeamA-vuelta").innerHTML = datos.Cuartos[i].vueltaA;
         document.getElementById("CF"+(i+1)+"TeamB-vuelta").innerHTML = datos.Cuartos[i].vueltaB;
         document.getElementById("CF"+(i+1)+"TeamA-penal").innerHTML = datos.Cuartos[i].penal.TeamA;
         document.getElementById("CF"+(i+1)+"TeamB-penal").innerHTML = datos.Cuartos[i].penal.TeamB;
      }

      //Calculo Global y seteo de clasificados
      var clasificados4 = [];
      for (let i = 0; i < 2; i++) {
         if ($("#CF"+(i+1)+"TeamA-ida").text() && $("#CF"+(i+1)+"TeamA-vuelta").text() && $("#CF"+(i+1)+"TeamB-ida").text() && $("#CF"+(i+1)+"TeamB-vuelta").text()) {
            const llavesA = ["Pos5","Pos4"]
            const llavesB = ["Pos6","Pos7"]
            document.getElementById("CF"+(i+1)+"TeamA-global").innerHTML = parseInt($("#CF"+(i+1)+"TeamA-ida").text()) + parseInt($("#CF"+(i+1)+"TeamA-vuelta").text())
            document.getElementById("CF"+(i+1)+"TeamB-global").innerHTML = parseInt($("#CF"+(i+1)+"TeamB-ida").text()) + parseInt($("#CF"+(i+1)+"TeamB-vuelta").text())
            var globalA = parseInt($("#CF"+(i+1)+"TeamA-global").text())
            var globalB = parseInt($("#CF"+(i+1)+"TeamB-global").text())
            if (globalA > globalB) {
               var identifier = document.querySelector("#"+llavesA[i]+" div").getAttribute('data-identifier');
               clasificados4.push(identifier)
            } else if (globalB > globalA ) {
               var identifier = document.querySelector("#"+llavesB[i]+" div").getAttribute('data-identifier');
               clasificados4.push(identifier)
            } else if ($("#CF"+(i+1)+"TeamA-penal").text() && $("#CF"+(i+1)+"TeamB-penal").text()){
               var penalA = $("#CF"+(i+1)+"TeamA-penal").text()
               var penalB = $("#CF"+(i+1)+"TeamB-penal").text()
               var penalA = penalA.replace(/[^0-9]+/g,"");
               var penalB = penalB.replace(/[^0-9]+/g,"");
               if (penalA > penalB) {
                  var identifier = document.querySelector("#"+llavesA[i]+" div").getAttribute('data-identifier');
                  clasificados4.push(identifier)
               } else {
                  var identifier = document.querySelector("#"+llavesB[i]+" div").getAttribute('data-identifier');
                  clasificados4.push(identifier)
               }
            }
         }
      }
   }

   //================================================================================================
   //Seteo Semifinal
   //================================================================================================
   if(datos.Info.semifinal){
      document.getElementById("ClasificadoA").innerHTML = `<div data-identifier="${clasificados4[0]}"><img class="logos-sm" src="${datos.Teams[clasificados4[0]].image}" alt="${datos.Teams[clasificados4[0]].alt}">${datos.Teams[clasificados4[0]].name}</div>`;;
      document.getElementById("ClasificadoB").innerHTML = `<div data-identifier="${clasificados4[1]}"><img class="logos-sm" src="${datos.Teams[clasificados4[1]].image}" alt="${datos.Teams[clasificados4[1]].alt}">${datos.Teams[clasificados4[1]].name}</div>`;;

      for (let i = 0; i < 2; i++) {
         document.getElementById("SF"+(i+1)+"TeamA-ida").innerHTML = datos.Semifinal[i].idaA;
         document.getElementById("SF"+(i+1)+"TeamB-ida").innerHTML = datos.Semifinal[i].idaB;
         document.getElementById("SF"+(i+1)+"TeamA-vuelta").innerHTML = datos.Semifinal[i].vueltaA;
         document.getElementById("SF"+(i+1)+"TeamB-vuelta").innerHTML = datos.Semifinal[i].vueltaB;
         document.getElementById("SF"+(i+1)+"TeamA-penal").innerHTML = datos.Semifinal[i].penal.TeamA;
         document.getElementById("SF"+(i+1)+"TeamB-penal").innerHTML = datos.Semifinal[i].penal.TeamB;
      }

      //Calculo Global y seteo de clasificados
      var clasificados2 = [];
      for (let i = 0; i < 2; i++) {
         if ($("#SF"+(i+1)+"TeamA-ida").text() && $("#SF"+(i+1)+"TeamA-vuelta").text() && $("#SF"+(i+1)+"TeamB-ida").text() && $("#SF"+(i+1)+"TeamB-vuelta").text()) {
            const S1 = ["Pos2","Pos3"]
            const S2 = ["ClasificadoA","ClasificadoB"]
            document.getElementById("SF"+(i+1)+"TeamA-global").innerHTML = parseInt($("#SF"+(i+1)+"TeamA-ida").text()) + parseInt($("#SF"+(i+1)+"TeamA-vuelta").text())
            document.getElementById("SF"+(i+1)+"TeamB-global").innerHTML = parseInt($("#SF"+(i+1)+"TeamB-ida").text()) + parseInt($("#SF"+(i+1)+"TeamB-vuelta").text())
            var globalA = parseInt($("#SF"+(i+1)+"TeamA-global").text())
            var globalB = parseInt($("#SF"+(i+1)+"TeamB-global").text())
            if (globalA > globalB) {
               var identifier = document.querySelector("#"+S1[i]+" div").getAttribute('data-identifier');
               clasificados2.push(identifier)
            } else if (globalB > globalA ) {
               var identifier = document.querySelector("#"+S2[i]+" div").getAttribute('data-identifier');
               clasificados2.push(identifier)
            } else if ($("#SF"+(i+1)+"TeamA-penal").text() && $("#SF"+(i+1)+"TeamB-penal").text()){
               var penalA = $("#SF"+(i+1)+"TeamA-penal").text()
               var penalB = $("#SF"+(i+1)+"TeamB-penal").text()
               var penalA = penalA.replace(/[^0-9]+/g,"");
               var penalB = penalB.replace(/[^0-9]+/g,"");
               if (penalA > penalB) {
                  var identifier = document.querySelector("#"+S1[i]+" div").getAttribute('data-identifier');
                  clasificados2.push(identifier)
               } else {
                  var identifier = document.querySelector("#"+S2[i]+" div").getAttribute('data-identifier');
                  clasificados2.push(identifier)
               }
            }
         }
      }
   }

   //================================================================================================
   //Seteo Final
   //================================================================================================
   if (datos.Info.final){
      document.getElementById("Final1").innerHTML = `<div data-identifier="${clasificados2[0]}"><img class="logos-sm" src="${datos.Teams[clasificados2[0]].image}" alt="${datos.Teams[clasificados2[0]].alt}">${datos.Teams[clasificados2[0]].name}</div>`;
      document.getElementById("Final2").innerHTML = `<div data-identifier="${clasificados2[1]}"><img class="logos-sm" src="${datos.Teams[clasificados2[1]].image}" alt="${datos.Teams[clasificados2[1]].alt}">${datos.Teams[clasificados2[1]].name}</div>`;
      document.getElementById("FTeamA-ida").innerHTML = datos.Final.idaA;
      document.getElementById("FTeamB-ida").innerHTML = datos.Final.idaB;
      document.getElementById("FTeamA-vuelta").innerHTML = datos.Final.vueltaA;
      document.getElementById("FTeamB-vuelta").innerHTML = datos.Final.vueltaB;
      document.getElementById("FTeamA-penal").innerHTML = datos.Final.penal.TeamA;
      document.getElementById("FTeamB-penal").innerHTML = datos.Final.penal.TeamB;
      if ($("#FTeamA-ida").text() && $("#FTeamA-vuelta").text() && $("#FTeamB-ida").text() && $("#FTeamB-vuelta").text()) {
         document.getElementById("FTeamA-global").innerHTML = parseInt($("#FTeamA-ida").text()) + parseInt($("#FTeamA-vuelta").text())
         document.getElementById("FTeamB-global").innerHTML = parseInt($("#FTeamB-ida").text()) + parseInt($("#FTeamB-vuelta").text())
         var globalA = parseInt($("#FTeamA-global").text())
         var globalB = parseInt($("#FTeamB-global").text())
         if (globalA > globalB) {
            document.getElementById("Subcampeon").innerHTML =`
               <h3>¡SUBCAMPEÓN!</h3>
               <img class="finalist-team" src="${datos.Teams[clasificados2[0]].image}" alt="${datos.Teams[clasificados2[0]].alt}">
               <p class="teamsfinal">${datos.Teams[clasificados2[0]].name}</p>
            `;
         } else if (globalB > globalA ) {
            document.getElementById("Subcampeon").innerHTML =`
               <h3>¡SUBCAMPEÓN!</h3>
               <img class="finalist-team" src="${datos.Teams[clasificados2[1]].image}" alt="${datos.Teams[clasificados2[1]].alt}">
               <p class="teamsfinal">${datos.Teams[clasificados2[1]].name}</p>
            `;
         } else if ($("#FTeamA-penal").text() && $("#FTeamB-penal").text()){
            var penalA = $("#FTeamA-penal").text()
            var penalB = $("#FTeamB-penal").text()
            var penalA = penalA.replace(/[^0-9]+/g,"");
            var penalB = penalB.replace(/[^0-9]+/g,"");
            if (penalA > penalB) {
               document.getElementById("Subcampeon").innerHTML =`
                  <h3>¡SUBCAMPEÓN!</h3>
                  <img class="finalist-team" src="${datos.Teams[clasificados2[0]].image}" alt="${datos.Teams[clasificados2[0]].alt}">
                  <p class="teamsfinal">${datos.Teams[clasificados2[0]].name}</p>
               `;
            } else {
               document.getElementById("Subcampeon").innerHTML =`
                  <h3>¡SUBCAMPEÓN!</h3>
                  <img class="finalist-team" src="${datos.Teams[clasificados2[1]].image}" alt="${datos.Teams[clasificados2[1]].alt}">
                  <p class="teamsfinal">${datos.Teams[clasificados2[1]].name}</p>
               `;
            }
         }
      }
   }
});