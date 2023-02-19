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
   let teamsL = document.querySelector('#teams-grid')
   teamsL.innerHTML = '';
   for(let item of datos.Teams){
      teamsL.innerHTML += `
         <li class="list-item col-lg-3 col-md-6 py-2">
            <a href="${item.url}" class="club-animation" style="text-decoration:none; color: #ffff">
               <div>
                  <div class="figure club-banner-top">
                     <img src="${item.banner}" width="100%" alt="StadiumLogo">
                  </div>
                  <div class="clubCircle text-center">
                     <img src="${item.image}" alt="${item.alt}" class="logosclubs">
                  </div>
                  <div class="text-center club-banner-bottom" style="background-color: ${item.color1};">
                     <div class="clubSquareFoot" style="color: ${item.color2};">
                        <p class="club-name"><b>${item.name}</b></p>
                        <p class="club-stadium">${item.stadium}</p>
                        <hr class="club-divider">
                        <span class="perfil"><b>Perfil del Club</b></span> &nbsp&nbsp<i class="fas fa-chevron-right"></i>
                     </div>
                  </div>
               </div>
            </a>
         </li>
      `
   }

});