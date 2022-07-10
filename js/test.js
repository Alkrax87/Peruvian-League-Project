for (i = 1; i <= 10; i++) {
    Fixture("Team"+i)
}

function Fixture(team){
    var pg=0, pe=0, pp=0, gf=0, gc=0

    var nteam = 1;

    while (nteam <= 18) {
        try {
            //console.log("=============================================");
            var club = team+"-F"+nteam;
            //console.log(club);
            //console.log("=============================================");
            if (document.getElementById(club).parentElement){
                var score = document.getElementById(club).parentElement;
                localid = score.getElementsByTagName('span')[0].id;
                visitanteid = score.getElementsByTagName('span')[1].id;
                localscore = parseInt(score.getElementsByTagName('span')[0].textContent);
                visitantescore = parseInt(score.getElementsByTagName('span')[1].textContent);
                //console.log("=======> "+localid + " " + localscore + " - " + visitantescore + " " + visitanteid);

                if(localid==club){
                    if(isNaN(localscore) || isNaN(visitantescore)){
                        //console.log("raaaaa")
                        nteam++
                    } else {
                        //console.log("local");
                        gf = gf + localscore;
                        gc = gc + visitantescore;
                        if (localscore > visitantescore){
                            pg = pg+1;
                            //console.log("ganador");
                        } else if (localscore < visitantescore){
                            pp = pp+1;
                            //console.log("perdedor");
                        } else {
                            pe = pe+1;
                            //console.log("empate");
                        }
                        //console.log(club+"--->"+"pg:"+pg,"pe:"+pe,"pp:"+pp,"gf:"+gf,"gc:"+gc);
                        nteam++;
                    }
                } else if(visitanteid==club){
                    if(isNaN(localscore) || isNaN(visitantescore)){
                        //console.log("raaaaa")
                        nteam++
                    } else {
                        //console.log("visitante");
                        gf = gf + visitantescore;
                        gc = gc + localscore;
                        if (visitantescore > localscore){
                            pg = pg+1;
                            //console.log("ganador");
                        } else if (visitantescore < localscore){
                            pp = pp+1;
                            //console.log("perdedor");
                        } else {
                            pe = pe+1;
                            //console.log("empate");
                        }
                        //console.log(club+"--->"+"pg:"+pg,"pe:"+pe,"pp:"+pp,"gf:"+gf,"gc:"+gc);
                        nteam++;
                    }
                }
            }
        } catch (error) {
            nteam++;
        }
    }
    document.getElementById("pg".concat(team)).innerHTML = pg;
    document.getElementById("pe".concat(team)).innerHTML = pe;
    document.getElementById("pp".concat(team)).innerHTML = pp;
    document.getElementById("gf".concat(team)).innerHTML = gf;
    document.getElementById("gc".concat(team)).innerHTML = gc;
    pj = pg+pe+pp
    dg = gf-gc
    console.log(team+"--->"+"pj "+pj,"pg: "+pg,"pe: "+pe,"pp: "+pp,"gf: "+gf,"gc: "+gc,"dg: "+dg);
}