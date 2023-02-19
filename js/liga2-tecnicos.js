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

   //Fill tabla tecnicos
   let table = document.querySelector('#table')
   table.innerHTML = '';
   for(let item of datos.Teams){
      var ndt = (item.dt).length
      if (ndt == 1){
         table.innerHTML += `
            <tr class="tableitem">
               <td><div class="${item.dt[0].status}"></div></td>
               <td class="nospace table-height"><i class="fas fa-user-tie dt"></i>&nbsp&nbsp ${item.dt[0].name}</td>
               <td class="nospace table-height"><img src="${item.image}" alt="${item.alt}" class="logos">&nbsp&nbsp ${item.name}</td>
               <td class="nospace table-height"><span class="flag-icon flag-icon-${item.dt[0].cod}" style="font-size: 25px;"></span>&nbsp&nbsp ${item.dt[0].country}</td>
            </tr>
         `
      } else {
         for(var i=0; i < ndt; i++){
            table.innerHTML += `
               <tr class="tableitem">
                  <td><div class="${item.dt[i].status}"></div></td>
                  <td class="nospace table-height"><i class="fas fa-user-tie dt"></i>&nbsp&nbsp ${item.dt[i].name}</td>
                  <td class="nospace table-height"><img src="${item.image}" alt="${item.alt}" class="logos">&nbsp&nbsp ${item.name}</td>
                  <td class="nospace table-height"><span class="flag-icon flag-icon-${item.dt[i].cod}" style="font-size: 25px;"></span>&nbsp&nbsp ${item.dt[i].country}</td>
               </tr>
            `
         }
      }
   }

});