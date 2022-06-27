// Ordenamiento Apertura
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

//Ordenamiento Clausura
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

//Ordenamiento acumulado
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