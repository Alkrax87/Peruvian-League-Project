var table = $('#tablaEliminatorias');
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
while (i < 10) {
  if (i >= 0 && i <= 3) {
    tbody.find("tr").eq(i).find("div").attr("class", "clasificacion");
    tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
    i++;
  } else if (i == 4) {
    tbody.find("tr").eq(i).find("div").attr("class", "repechaje");
    tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
    i++;
  } else if (i >= 5 && i <= 10) {
    tbody.find("tr").eq(i).find("div").text("");
    tbody.find("tr").eq(i).find("th").eq(1).text(j + i);
    i++;
  }
}
