//Llamado al JSON de la Liga 1
function cargarDatos() {
   return fetch('./js/liga1.json')
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

   //Fill equipos
   let teamsL = document.querySelector('#teams-list')
   teamsL.innerHTML = '';
   for(let item of datos.Teams){
      teamsL.innerHTML += `
         <img src="${item.image}" alt="${item.alt}" class="img-team-info">
      `
   }

});