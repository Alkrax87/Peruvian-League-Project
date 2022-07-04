//LLamada a las funciones de operaciones
for (var i=1;i<=8;i++){
    operacionesN("Team"+i);
    operacionesC("Team"+i);
    operacionesS("Team"+i);
    operacionesL("Team"+i);
}
//Operaciones Tabla
//Tabla Norte
function operacionesN(team){
    document.getElementById("Npuntos".concat(team)).innerHTML = (parseInt($("#Npg".concat(team)).text()) * 3) + parseInt($("#Npe".concat(team)).text());
    document.getElementById("Npj".concat(team)).innerHTML = parseInt($("#Npg".concat(team)).text()) + parseInt($("#Npe".concat(team)).text()) + parseInt($("#Npp".concat(team)).text());
    document.getElementById("Ndg".concat(team)).innerHTML = parseInt($("#Ngf".concat(team)).text()) - parseInt($("#Ngc".concat(team)).text());
}
//Tabla Centro
function operacionesC(team){
    document.getElementById("Cpuntos".concat(team)).innerHTML = (parseInt($("#Cpg".concat(team)).text()) * 3) + parseInt($("#Cpe".concat(team)).text());
    document.getElementById("Cpj".concat(team)).innerHTML = parseInt($("#Cpg".concat(team)).text()) + parseInt($("#Cpe".concat(team)).text()) + parseInt($("#Cpp".concat(team)).text());
    document.getElementById("Cdg".concat(team)).innerHTML = parseInt($("#Cgf".concat(team)).text()) - parseInt($("#Cgc".concat(team)).text());
}
//Tabla Sur
function operacionesS(team){
    document.getElementById("Spuntos".concat(team)).innerHTML = (parseInt($("#Spg".concat(team)).text()) * 3) + parseInt($("#Spe".concat(team)).text());
    document.getElementById("Spj".concat(team)).innerHTML = parseInt($("#Spg".concat(team)).text()) + parseInt($("#Spe".concat(team)).text()) + parseInt($("#Spp".concat(team)).text());
    document.getElementById("Sdg".concat(team)).innerHTML = parseInt($("#Sgf".concat(team)).text()) - parseInt($("#Sgc".concat(team)).text());
}
//Tabla Lima
function operacionesL(team){
    document.getElementById("Lpuntos".concat(team)).innerHTML = (parseInt($("#Lpg".concat(team)).text()) * 3) + parseInt($("#Lpe".concat(team)).text());
    document.getElementById("Lpj".concat(team)).innerHTML = parseInt($("#Lpg".concat(team)).text()) + parseInt($("#Lpe".concat(team)).text()) + parseInt($("#Lpp".concat(team)).text());
    document.getElementById("Ldg".concat(team)).innerHTML = parseInt($("#Lgf".concat(team)).text()) - parseInt($("#Lgc".concat(team)).text());
}

//Ordenamiento Tabla
//TablaNorte
var table = $('#tablaNorte');
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
while (i < 8) {
    if (i < 2) {
        tbody.find("tr").eq(i).find("div").attr("class", "winner-sm");
        tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
        i++;
    } else if (i >= 2 && i < 8) {
        tbody.find("tr").eq(i).find("div").attr("class", "");
        tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
        i++;
    }
}
//Tabla Centro
var table = $('#tablaCentro');
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
while (i < 8) {
    if (i < 2) {
        tbody.find("tr").eq(i).find("div").attr("class", "winner-sm");
        tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
        i++;
    } else if (i >= 2 && i < 8) {
        tbody.find("tr").eq(i).find("div").attr("class", "");
        tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
        i++;
    }
}
//Tabla Sur
var table = $('#tablaSur');
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
while (i < 8) {
    if (i < 2) {
        tbody.find("tr").eq(i).find("div").attr("class", "winner-sm");
        tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
        i++;
    } else if (i >= 2 && i < 8) {
        tbody.find("tr").eq(i).find("div").attr("class", "");
        tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
        i++;
    }
}
//Tabla Lima
var table = $('#tablaLima');
var tbody = $('#table4')

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
while (i < 8) {
    if (i < 2) {
        tbody.find("tr").eq(i).find("div").attr("class", "winner-sm");
        tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
        i++;
    } else if (i >= 2 && i < 8) {
        tbody.find("tr").eq(i).find("div").attr("class", "");
        tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
        i++;
    }
}