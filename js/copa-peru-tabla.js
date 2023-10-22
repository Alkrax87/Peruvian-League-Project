//Llamado al JSON de la Copa Perú
function cargarDatos() {
   return fetch('./js/copa-peru.json')
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

   //Fill de info sobre la temporada
   document.getElementById("temporadaH").innerHTML = "<b>"+datos.Info.temporada+"</b>";
   document.getElementById("temporadaR").innerHTML = "<b>"+datos.Info.temporada+"</b>";
   document.getElementById("equiposH").innerHTML = "<b>"+datos.Info.equipos+"</b>";
   document.getElementById("equiposR").innerHTML = "<b>"+datos.Info.equipos+"</b>";

   //Fill Equipos tabla Etapa Nacional
   let teamsL = document.querySelector('#table')
   teamsL.innerHTML = '';
   var position = 1, identifier = 0;
   if (datos.Info.nacional){
      for(let item of datos.Teams){
         teamsL.innerHTML += `
            <tr>
               <th><div data-identifier="${identifier}"></div></th>
               <th>${position}</th>
               <td class="nospace text-start t-h">${`<img src="${item.image}" alt="${item.alt}" class="logos-sm">` + ' ' + item.name}</td>
               <td class="text-center t-h fw-bold" id="puntos${item.id}">0</td>
               <td class="t-h" id="pj${item.id}">0</td>
               <td class="t-h" id="pg${item.id}">${item.pg}</td>
               <td class="t-h" id="pe${item.id}">${item.pe}</td>
               <td class="t-h" id="pp${item.id}">${item.pp}</td>
               <td class="t-h" id="gf${item.id}">${item.gf}</td>
               <td class="t-h" id="gc${item.id}">${item.gc}</td>
               <td class="t-h" id="dg${item.id}">0</td>
               <td class="t-h" id="pr${item.id}">${item.pr}</td>
            </tr>
         `
         position++
         identifier++
      }
      //Ordenamiento Tabla General
      for (var i=1;i<=50;i++){
         operaciones("Team"+i);
      }
      function operaciones(team){
         document.getElementById("puntos".concat(team)).innerHTML = (parseInt($("#pg".concat(team)).text()) * 3) + parseInt($("#pe".concat(team)).text());
         document.getElementById("pj".concat(team)).innerHTML = parseInt($("#pg".concat(team)).text()) + parseInt($("#pe".concat(team)).text()) + parseInt($("#pp".concat(team)).text());
         var difg = parseInt($("#gf".concat(team)).text()) - parseInt($("#gc".concat(team)).text());
         if (difg > 0) {
            document.getElementById("dg".concat(team)).innerHTML = "+" + difg
         } else {
            document.getElementById("dg".concat(team)).innerHTML = difg
         }
      }
   } else {
      for(var i = 0;i < 50; i++){
         teamsL.innerHTML += `
            <tr>
               <th><div></div></th>
               <th></th>
               <td class="nospace text-start t-h"><i class="fas fa-shield-alt nacional"></i> Por Definir</td>
               <td class="text-center t-h" id="puntos">0</td>
               <td class="t-h" id="pj">0</td>
               <td class="t-h" id="pg">0</td>
               <td class="t-h" id="pe">0</td>
               <td class="t-h" id="pp">0</td>
               <td class="t-h" id="gf">0</td>
               <td class="t-h" id="gc">0</td>
               <td class="t-h" id="dg">0</td>
               <td class="t-h" id="pr">0</td>
            </tr>
         `
         position++
      }
   }

   //ORDENAMIENTO
   //ETAPA NACIONAL
   var table = $('#tablaFaseNacional');
   var tbody = $('#table')

   tbody.find('tr').sort(function(a, b) {
      if ($("td", b).eq(1).text() != $("td", a).eq(1).text()) {
         return $("td", b).eq(1).text() - $("td", a).eq(1).text();
      } else if ($("td", b).eq(9).text() != $("td", a).eq(9).text()) {
         return $("td", b).eq(9).text() - $("td", a).eq(9).text();
      } else if ($("td", b).eq(8).text() != $("td", a).eq(8).text()) {
         return $("td", b).eq(8).text() - $("td", a).eq(8).text();
      } else {
         return $("td", b).eq(6).text() - $("td", a).eq(6).text();
      }
   }).appendTo(tbody);

   var i = 0;
   var j = 1;
   while (i < 50) {
      if (i >=0 && i <=31) {
         tbody.find("tr").eq(i).find("div").attr("class", "final");
         tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
         i++;
      } else {
         tbody.find("tr").eq(i).find("div").text("");
         tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
         i++;
      }
   }

   //================================================================================================
   //Selección de clasificados
   //================================================================================================
   const clasificadosNacional = document.querySelectorAll('.final');
   var clasificados = [];
   for (let i = 0; i < 32; i++) {
      clasificados[i] = clasificadosNacional[i].getAttribute('data-identifier');
   }

   //================================================================================================
   //Seteo 16avos de final
   //================================================================================================
   let teams16 = document.querySelector('#table2')
   teams16.innerHTML = '';
   var position = 1;
   if (datos.Info.t16avos){
      var a16 = 0, b16 = 31;
      for(var i = 0; i < 16; i++){
         teams16.innerHTML += `
            <tr class="left-table-header">
               <th class="text-center">${position}</th>
               <td>
                  <div class="col nospace"><img class="logos-sm" src="${datos.Teams[clasificados[a16]].image}" alt="${datos.Teams[clasificados[a16]].alt}"> ${datos.Teams[clasificados[a16]].name}</div>
                  <div class="col nospace"><img class="logos-sm" src="${datos.Teams[clasificados[b16]].image}" alt="${datos.Teams[clasificados[b16]].alt}"> ${datos.Teams[clasificados[b16]].name}</div>
               </td>
               <td>
                  <div id="ida16A-${i+1}" class="col text-center">${datos.Dieciseisavos[i].idaA}</div>
                  <div id="ida16B-${i+1}" class="col text-center">${datos.Dieciseisavos[i].idaB}</div>
               </td>
               <td>
                  <div id="vuelta16A-${i+1}" class="col text-center">${datos.Dieciseisavos[i].vueltaA}</div>
                  <div id="vuelta16B-${i+1}" class="col text-center">${datos.Dieciseisavos[i].vueltaB}</div>
               </td>
               <td>
                  <div id="global16A-${i+1}" data-identifier="${clasificados[a16]}" class="col text-center fw-bold"></div>
                  <div id="global16B-${i+1}" data-identifier="${clasificados[b16]}" class="col text-center fw-bold"></div>
               </td>
               <td>
                  <div id="penal16A-${i+1}" class="col text-center">${datos.Dieciseisavos[i].penal.TeamA}</div>
                  <div id="penal16B-${i+1}" class="col text-center">${datos.Dieciseisavos[i].penal.TeamB}</div>
               </td>
               <td>
                  <div id="clasified16-${i+1}" class="col cla text-center nospace"></div>
               </td>
            </tr>
         `
         position++
         a16++
         b16--
      }

      //Calculo Global y seteo de clasificados
      var clasificados16 = [];
      try {
         for (var i = 1; i <= 16; i++) {
            if ($("#ida16A-" + i).text() && $("#vuelta16A-" + i).text() && $("#ida16B-" + i).text() && $("#vuelta16B-" + i).text()) {
               document.getElementById("global16A-" + i).innerHTML = parseInt($("#ida16A-" + i).text()) + parseInt($("#vuelta16A-" + i).text());
               document.getElementById("global16B-" + i).innerHTML = parseInt($("#ida16B-" + i).text()) + parseInt($("#vuelta16B-" + i).text());
               var globalA = parseInt($("#global16A-" + i).text())
               var globalB = parseInt($("#global16B-" + i).text())
               if (globalB > globalA) {
                  var identifier = $("#global16B-" + i).attr("data-identifier");
                  clasificados16.push(identifier)
                  document.getElementById("clasified16-" + i).innerHTML = `<img class="logos-sm" src="${datos.Teams[identifier].image}" alt="${datos.Teams[identifier].alt}"> ${datos.Teams[identifier].name} clasificado.`;
               } else if (globalA > globalB){
                  var identifier = $("#global16A-" + i).attr("data-identifier");
                  clasificados16.push(identifier)
                  document.getElementById("clasified16-" + i).innerHTML = `<img class="logos-sm" src="${datos.Teams[identifier].image}" alt="${datos.Teams[identifier].alt}"> ${datos.Teams[identifier].name} clasificado.`;
               } else if ($("#penal16A-" + i).text() && $("#penal16B-" + i).text()){
                  var penalA = $("#penal16A-" + i).text()
                  var penalB = $("#penal16B-" + i).text()
                  var penalA = penalA.replace(/[^0-9]+/g,"");
                  var penalB = penalB.replace(/[^0-9]+/g,"");
                  if (penalA > penalB) {
                     var identifier = $("#global16A-" + i).attr("data-identifier");
                     clasificados16.push(identifier)
                     document.getElementById("clasified16-" + i).innerHTML = `<img class="logos-sm" src="${datos.Teams[identifier].image}" alt="${datos.Teams[identifier].alt}"> ${datos.Teams[identifier].name} clasificado.`;
                  } else {
                     var identifier = $("#global16B-" + i).attr("data-identifier");
                     clasificados16.push(identifier)
                     document.getElementById("clasified16-" + i).innerHTML = `<img class="logos-sm" src="${datos.Teams[identifier].image}" alt="${datos.Teams[identifier].alt}"> ${datos.Teams[identifier].name} clasificado.`;
                  }
               }
            }
         }
      } catch (error) {
         console.log(error);
      }
   } else {
      for(var i = 0; i < 16; i++){
         teams16.innerHTML += `
            <tr class="left-table-header">
               <th class="text-center">${position}</th>
               <td>
                  <div class="col nospace"><i class="fas fa-shield-alt nacional"></i> Por Definir</div>
                  <div class="col nospace"><i class="fas fa-shield-alt nacional"></i> Por Definir</div>
               </td>
               <td>
                  <div class="col text-center"></div>
                  <div class="col text-center"></div>
               </td>
               <td>
                  <div class="col text-center"></div>
                  <div class="col text-center"></div>
               </td>
               <td>
                  <div class="col text-center"></div>
                  <div class="col text-center"></div>
               </td>
               <td>
                  <div class="col text-center"></div>
                  <div class="col text-center"></div>
               </td>
               <td>
                  <div class="col text-center nospace"></div>
               </td>
            </tr>
         `
         position++
      }
   }

   //================================================================================================
   //Seteo 8vos de final
   //================================================================================================
   let teams8 = document.querySelector('#table3')
   teams8.innerHTML = '';
   const letras = ['A','B','C','D','E','F','G','H'];
   if (datos.Info.t8vos){
      var a8 = 0, b8 = 15;
      for(var i = 0; i < 8; i++){
         teams8.innerHTML += `
            <tr class="left-table-header">
               <th class="text-center">${letras[i]}</th>
               <td>
                  <div class="col nospace"><img class="logos-sm" src="${datos.Teams[clasificados16[a8]].image}" alt="${datos.Teams[clasificados16[a8]].alt}"> ${datos.Teams[clasificados16[a8]].name}</div>
                  <div class="col nospace"><img class="logos-sm" src="${datos.Teams[clasificados16[b8]].image}" alt="${datos.Teams[clasificados16[b8]].alt}"> ${datos.Teams[clasificados16[b8]].name}</div>
               </td>
               <td>
                  <div id="ida8A-${i+1}" class="col text-center">${datos.Octavos[i].idaA}</div>
                  <div id="ida8B-${i+1}" class="col text-center">${datos.Octavos[i].idaB}</div>
               </td>
               <td>
                  <div id="vuelta8A-${i+1}" class="col text-center">${datos.Octavos[i].vueltaA}</div>
                  <div id="vuelta8B-${i+1}" class="col text-center">${datos.Octavos[i].vueltaB}</div>
               </td>
               <td>
                  <div id="global8A-${i+1}" data-identifier="${clasificados16[a8]}" class="col text-center fw-bold"></div>
                  <div id="global8B-${i+1}" data-identifier="${clasificados16[b8]}" class="col text-center fw-bold"></div>
               </td>
               <td>
                  <div id="penal8A-${i+1}" class="col text-center">${datos.Octavos[i].penal.TeamA}</div>
                  <div id="penal8B-${i+1}" class="col text-center">${datos.Octavos[i].penal.TeamB}</div>
               </td>
               <td>
                  <div id="clasified8-${i+1}" class="col cla text-center nospace"></div>
               </td>
            </tr>
         `
         position++
         a8++
         b8--
      }

      //Calculo Global y seteo de clasificados
      var clasificados8 = [];
      try {
         for (var i = 1; i <= 8; i++) {
            if ($("#ida8A-" + i).text() && $("#vuelta8A-" + i).text() && $("#ida8B-" + i).text() && $("#vuelta8B-" + i).text()) {
               document.getElementById("global8A-" + i).innerHTML = parseInt($("#ida8A-" + i).text()) + parseInt($("#vuelta8A-" + i).text());
               document.getElementById("global8B-" + i).innerHTML = parseInt($("#ida8B-" + i).text()) + parseInt($("#vuelta8B-" + i).text());
               var globalA = parseInt($("#global8A-" + i).text())
               var globalB = parseInt($("#global8B-" + i).text())
               if (globalB > globalA) {
                  var identifier = $("#global8B-" + i).attr("data-identifier");
                  clasificados8.push(identifier)
                  document.getElementById("clasified8-" + i).innerHTML = `<img class="logos-sm" src="${datos.Teams[identifier].image}" alt="${datos.Teams[identifier].alt}"> ${datos.Teams[identifier].name} clasificado.`;
               } else if (globalA > globalB) {
                  var identifier = $("#global8A-" + i).attr("data-identifier");
                  clasificados8.push(identifier)
                  document.getElementById("clasified8-" + i).innerHTML = `<img class="logos-sm" src="${datos.Teams[identifier].image}" alt="${datos.Teams[identifier].alt}"> ${datos.Teams[identifier].name} clasificado.`;
               } else if ($("#penal8A-" + i).text() && $("#penal8B-" + i).text()){
                  var penalA = $("#penal8A-" + i).text()
                  var penalB = $("#penal8B-" + i).text()
                  var penalA = penalA.replace(/[^0-9]+/g,"");
                  var penalB = penalB.replace(/[^0-9]+/g,"");
                  if (penalA > penalB) {
                     var identifier = $("#global8A-" + i).attr("data-identifier");
                     clasificados8.push(identifier)
                     document.getElementById("clasified8-" + i).innerHTML = `<img class="logos-sm" src="${datos.Teams[identifier].image}" alt="${datos.Teams[identifier].alt}"> ${datos.Teams[identifier].name} clasificado.`;
                  } else {
                     var identifier = $("#global8B-" + i).attr("data-identifier");
                     clasificados8.push(identifier)
                     document.getElementById("clasified8-" + i).innerHTML = `<img class="logos-sm" src="${datos.Teams[identifier].image}" alt="${datos.Teams[identifier].alt}"> ${datos.Teams[identifier].name} clasificado.`;
                  }
               }
            }
         }
      } catch (error) {
         console.log(error);
      }
   } else {
      for(var i = 0; i < 8; i++){
         teams8.innerHTML += `
            <tr class="left-table-header">
               <th class="text-center">${letras[i]}</th>
               <td>
                  <div class="col nospace"><i class="fas fa-shield-alt nacional"></i> Por Definir</div>
                  <div class="col nospace"><i class="fas fa-shield-alt nacional"></i> Por Definir</div>
               </td>
               <td>
                  <div class="col text-center"></div>
                  <div class="col text-center"></div>
               </td>
               <td>
                  <div class="col text-center"></div>
                  <div class="col text-center"></div>
               </td>
               <td>
                  <div class="col text-center"></div>
                  <div class="col text-center"></div>
               </td>
               <td>
                  <div class="col text-center"></div>
                  <div class="col text-center"></div>
               </td>
               <td>
                  <div class="col text-center nospace"></div>
               </td>
            </tr>
         `
         position++
      }
   }

   //================================================================================================
   //Seteo 4vos de final
   //================================================================================================
   if (datos.Info.t4tos){
      const llaves = ["LLaveA","LLaveB","LLaveC","LLaveD","LLaveE","LLaveF","LLaveG","LLaveH"]
      for (let i = 0; i < 8; i++) {
         document.getElementById(llaves[i]).innerHTML = `<div data-identifier="${clasificados8[i]}"><img class="logos-sm" src="${datos.Teams[clasificados8[i]].image}" alt="${datos.Teams[clasificados8[i]].alt}"> ${datos.Teams[clasificados8[i]].name}</div>`;
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
      for (let i = 0; i < 4; i++) {
         if ($("#CF"+(i+1)+"TeamA-ida").text() && $("#CF"+(i+1)+"TeamA-vuelta").text() && $("#CF"+(i+1)+"TeamB-ida").text() && $("#CF"+(i+1)+"TeamB-vuelta").text()) {
            const llavesA = ["LLaveA","LLaveB","LLaveC","LLaveD"]
            const llavesB = ["LLaveH","LLaveG","LLaveF","LLaveE"]
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
      const llaves = ["Semifinal1","Semifinal2","Semifinal3","Semifinal4"]
      //Seteo Ascendidos a la Liga 2 y Semifinal
      for (let i = 0; i < 4; i++) {
         document.getElementById("Ascendido"+(i+1)).innerHTML =`
            <img class="ascendido-team" src="${datos.Teams[clasificados4[i]].image}" alt="${datos.Teams[clasificados4[i]].alt}">
            <p class="teamsfinal">${datos.Teams[clasificados4[i]].name}</p>
         `;
         document.getElementById(llaves[i]).innerHTML = `<div data-identifier="${clasificados4[i]}"><img class="logos-sm" src="${datos.Teams[clasificados4[i]].image}" alt="${datos.Teams[clasificados4[i]].alt}"> ${datos.Teams[clasificados4[i]].name}</div>`;
      }

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
            const S1 = ["Semifinal1","Semifinal3"]
            const S2 = ["Semifinal2","Semifinal4"]
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
   } else {
      for (let i = 1; i <= 4; i++) {
         document.getElementById("Ascendido"+i).innerHTML =`
            <i class="fas fa-shield-alt ascendido"></i>
            <p class="teamsfinal">Por Definir</p>
         `;
      }
   }

   //================================================================================================
   //Seteo Final
   //================================================================================================
   if (datos.Info.final){
      document.getElementById("Final1").innerHTML = `<div data-identifier="${clasificados2[0]}"><img class="logos-sm" src="${datos.Teams[clasificados2[0]].image}" alt="${datos.Teams[clasificados2[0]].alt}"> ${datos.Teams[clasificados2[0]].name}</div>`;
      document.getElementById("Final2").innerHTML = `<div data-identifier="${clasificados2[1]}"><img class="logos-sm" src="${datos.Teams[clasificados2[1]].image}" alt="${datos.Teams[clasificados2[1]].alt}"> ${datos.Teams[clasificados2[1]].name}</div>`;
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
            document.getElementById("Campeon").innerHTML =`
               <h3>¡CAMPEÓN!</h3>
               <img class="finalist-team" src="${datos.Teams[clasificados2[0]].image}" alt="${datos.Teams[clasificados2[0]].alt}">
               <p class="teamsfinal">${datos.Teams[clasificados2[0]].name}</p>
            `;
            document.getElementById("Subcampeon").innerHTML =`
               <h3>¡SUBCAMPEÓN!</h3>
               <img class="finalist-team" src="${datos.Teams[clasificados2[1]].image}" alt="${datos.Teams[clasificados2[1]].alt}">
               <p class="teamsfinal">${datos.Teams[clasificados2[1]].name}</p>
            `;
         } else if (globalB > globalA ) {
            document.getElementById("Campeon").innerHTML =`
               <h3>¡CAMPEÓN!</h3>
               <img class="finalist-team" src="${datos.Teams[clasificados2[1]].image}" alt="${datos.Teams[clasificados2[1]].alt}">
               <p class="teamsfinal">${datos.Teams[clasificados2[1]].name}</p>
            `;
            document.getElementById("Subcampeon").innerHTML =`
               <h3>¡SUBCAMPEÓN!</h3>
               <img class="finalist-team" src="${datos.Teams[clasificados2[0]].image}" alt="${datos.Teams[clasificados2[0]].alt}">
               <p class="teamsfinal">${datos.Teams[clasificados2[0]].name}</p>
            `;
         } else if ($("#FTeamA-penal").text() && $("#FTeamB-penal").text()){
            var penalA = $("#FTeamA-penal").text()
            var penalB = $("#FTeamB-penal").text()
            var penalA = penalA.replace(/[^0-9]+/g,"");
            var penalB = penalB.replace(/[^0-9]+/g,"");
            if (penalA > penalB) {
               document.getElementById("Campeon").innerHTML =`
                  <h3>¡CAMPEÓN!</h3>
                  <img class="finalist-team" src="${datos.Teams[clasificados2[0]].image}" alt="${datos.Teams[clasificados2[0]].alt}">
                  <p class="teamsfinal">${datos.Teams[clasificados2[0]].name}</p>
               `;
               document.getElementById("Subcampeon").innerHTML =`
                  <h3>¡SUBCAMPEÓN!</h3>
                  <img class="finalist-team" src="${datos.Teams[clasificados2[1]].image}" alt="${datos.Teams[clasificados2[1]].alt}">
                  <p class="teamsfinal">${datos.Teams[clasificados2[1]].name}</p>
               `;
            } else {
               document.getElementById("Campeon").innerHTML =`
                  <h3>¡CAMPEÓN!</h3>
                  <img class="finalist-team" src="${datos.Teams[clasificados2[1]].image}" alt="${datos.Teams[clasificados2[1]].alt}">
                  <p class="teamsfinal">${datos.Teams[clasificados2[1]].name}</p>
               `;
               document.getElementById("Subcampeon").innerHTML =`
                  <h3>¡SUBCAMPEÓN!</h3>
                  <img class="finalist-team" src="${datos.Teams[clasificados2[0]].image}" alt="${datos.Teams[clasificados2[0]].alt}">
                  <p class="teamsfinal">${datos.Teams[clasificados2[0]].name}</p>
               `;
            }
         }
      }
   }
});