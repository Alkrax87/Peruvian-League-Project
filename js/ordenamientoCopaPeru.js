//FASE NACIONAL
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

//FINALISIMA
var table = $('#tablaFinalisima');
var tbody = $('#table1')

tbody.find('tr').sort(function(a, b) {

  if ($("td", b).eq(1).text() != $("td", a).eq(1).text()) {
    return $("td", b).eq(1).text() - $("td", a).eq(1).text();
  } else if ($("td", b).eq(8).text() != $("td", a).eq(8).text()) {
    return $("td", b).eq(8).text() - $("td", a).eq(8).text();
  } else {
    return $("td", b).eq(6).text() - $("td", a).eq(6).text();
  }
}).appendTo(tbody);

var i = 0;
var j = 1;
while (i < 4) {
  if (i == 0) {
    tbody.find("tr").eq(i).find("div").attr("class", "ascensol1");
    tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
    i++;
  } else if (i == 1) {
    tbody.find("tr").eq(i).find("div").attr("class", "ascensol2");
    tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
    i++;
  } else {
    tbody.find("tr").eq(i).find("div").text("");
    tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
    i++;
  }
}