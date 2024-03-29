//Llamado al JSON de la Copa Perú
function cargarDatos() {
   return fetch("./js/copa-peru.json").then((response) => response.json()).then((data) => {
         return data;
      })
      .catch((error) => {
         console.error("Error al cargar el archivo JSON:", error);
      });
}

//Seteo de la informacion enla pagina web
cargarDatos().then((datos) => {
   //Fill de info sobre la temporada
   document.getElementById("temporadaH").innerHTML = "<b>" + datos.Info.temporada + "</b>";
   document.getElementById("temporadaR").innerHTML = "<b>" + datos.Info.temporada + "</b>";
   document.getElementById("equiposH").innerHTML = "<b>" + datos.Info.equipos + "</b>";
   document.getElementById("equiposR").innerHTML = "<b>" + datos.Info.equipos + "</b>";

   //Fill equipos
   let teamsL = document.querySelector("#table");
   teamsL.innerHTML = "";

   var a = 0, b = 1, logoA = '', logoB = '';
   for (i = 0; i < datos.Departamentos.length; i++) {
      if (datos.Teams[a].image != "images/copa-peru/.png") {
         logoA = `<img src="${datos.Teams[a].image}" alt="${datos.Teams[a].alt}" width="20px">`;
      }
      if (datos.Teams[b].image != "images/copa-peru/.png") {
         logoB = `<img src="${datos.Teams[b].image}" alt="${datos.Teams[b].alt}" width="20px">`;
      }

      teamsL.innerHTML += `
         <tr>
            <td class="nospace" rowspan="2"><span><img src="${datos.Departamentos[i].flag}" alt="${datos.Departamentos[i].alt}" width="50px"></span>&nbsp&nbsp ${datos.Departamentos[i].name}</td>
            <td class="t-h nospace">${logoA} ${datos.Teams[a].name}</td>
            <td class="t-h nospace">${datos.Teams[a].ciudad}</td>
         </tr>
         <tr>
            <td class="t-h nospace">${logoB} ${datos.Teams[b].name}</td>
            <td class="t-h nospace">${datos.Teams[b].ciudad}</td>
         </tr>
      `;
      a = a + 2;
      b = b + 2;
      logoA = ''
      logoB = ''
   }
});
