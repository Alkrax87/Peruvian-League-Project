for (i = 1; i <= 10; i++) {
  Fixture("Team"+i)
}

function Fixture(team){
  var pg=0, pe=0, pp=0, gf=0, gc=0

  var nteam = 1;

  while (nteam <= 18) {
    try {
      var club = team+"-F"+nteam;
      if (document.getElementById(club).parentElement){
        var score = document.getElementById(club).parentElement;
        localid = score.getElementsByTagName('span')[0].id;
        visitanteid = score.getElementsByTagName('span')[1].id;
        localscore = parseInt(score.getElementsByTagName('span')[0].textContent);
        visitantescore = parseInt(score.getElementsByTagName('span')[1].textContent);

        if(localid==club){
          if(isNaN(localscore) || isNaN(visitantescore)){
            nteam++
          } else {
            gf = gf + localscore;
            gc = gc + visitantescore;
            if (localscore > visitantescore){
              pg = pg+1;
            } else if (localscore < visitantescore){
              pp = pp+1;
            } else {
              pe = pe+1;
            }
            nteam++;
          }
        } else if(visitanteid==club){
          if(isNaN(localscore) || isNaN(visitantescore)){
            nteam++
          } else {
            gf = gf + visitantescore;
            gc = gc + localscore;
            if (visitantescore > localscore){
              pg = pg+1;
            } else if (visitantescore < localscore){
              pp = pp+1;
            } else {
              pe = pe+1;
            }
            nteam++;
          }
        }
      }
    } catch (error) {
      nteam++;
    }
  }
  document.getElementById("pj".concat(team)).innerHTML = pg+pe+pp;
  document.getElementById("puntos".concat(team)).innerHTML = (pg*3)+pe;
  document.getElementById("pg".concat(team)).innerHTML = pg;
  document.getElementById("pe".concat(team)).innerHTML = pe;
  document.getElementById("pp".concat(team)).innerHTML = pp;
  document.getElementById("gf".concat(team)).innerHTML = gf;
  document.getElementById("gc".concat(team)).innerHTML = gc;
  document.getElementById("dg".concat(team)).innerHTML = gf-gc;
}