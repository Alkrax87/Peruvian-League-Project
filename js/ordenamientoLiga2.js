// Ordenamiento Apertura
var table = $('#tablaApertura');
var tbody = $('#table1');

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
while (i < 13) {
  tbody.find("tr").eq(i).find("div").text("");
  tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
  i++;
}

//Ordenamiento Clausura
var table = $('#tablaClausura');
var tbody = $('#table2');

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
while (i < 13) {
  tbody.find("tr").eq(i).find("div").text("");
  tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
  i++;
}

//Ordenamiento acumulado
var table = $('#tablaAcumulada');
var tbody = $('#table3');

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
while (i < 13) {
  if (i <= 1) {
    tbody.find("tr").eq(i).find("div").attr("class", "ascenso");
    tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
    i++;
  } else if (i >= 2 && i < 12) {
    tbody.find("tr").eq(i).find("div").text("");
    tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
    i++;
  } else if (i == 12) {
    tbody.find("tr").eq(i).find("div").attr("class", "descenso");
    tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
    i++;
  }
}
