//variables y objetos globales
var members = data.results[0].members;

var stadistics = {
  democratNumberOfReps: 0,
  republicanNumberOfReps: 0,
  independentNumberOfReps: 0,
  totalNumberOfReps: 0,
  totPorcentDemocrat: 0,
  totPorcentRepublican: 0,
  totPorcentIndependent: 0,
  totalPorcent: 0,
  least_engange: [],
  most_engange: [],
  least_loyal: [],
  most_loyal: [],
  totalStates: []
};

//llamada de funciones
countAll(members);

//declaracion de funciones

function countAll(members) {
  var len = members.length;
  var totDemocrat = 0;
  var totRepublican = 0;
  var totIndependent = 0;
  var totalForParty = 0;
  var totPorcD = 0;
  var totPorcR = 0;
  var totPorcI = 0;
  var totalPorc = 0;

  //contar miembros de cada partido y
  //porcentajes

  //bucle selector de partidos

  for (var i = 0; i < len; i++) {
    valParty = members[i].party;

    if (valParty == "D") {
      totDemocrat++;
    } else {
      if (valParty == "R") {
        totRepublican++;
      } else {
        totIndependent++;
      }
    }
  }
  //calculos matematicos para porcentaje
  totalForParty = totDemocrat + totRepublican + totIndependent;
  totPorcD = parseFloat(((totDemocrat * 100) / totalForParty).toFixed(2));
  totPorcR = parseFloat(((totRepublican * 100) / totalForParty).toFixed(2));
  totPorcI = parseFloat(((totIndependent * 100) / totalForParty).toFixed(2));
  totalPorc = parseFloat(totPorcD + totPorcR + totPorcI);

  //meto representantes a objeto para mostrar en html

  stadistics.totDemocrat = totDemocrat;
  document.getElementById("totDemocrat").innerHTML =
    stadistics.totDemocrat + " rep.";

  stadistics.totRepublican = totRepublican;
  document.getElementById("totRepublican").innerHTML =
    stadistics.totRepublican + " rep.";

  stadistics.totIndependent = totIndependent;
  document.getElementById("totIndependent").innerHTML =
    stadistics.totIndependent + " rep.";

  stadistics.totalForParty = totalForParty;
  document.getElementById("totalForParty").innerHTML =
    stadistics.totalForParty + " rep.";

  //meto % a objeto para mostrar en html

  stadistics.totPorcD = totPorcD;
  document.getElementById("totPorcD").innerHTML = stadistics.totPorcD + " %";
  stadistics.totPorcR = totPorcR;
  document.getElementById("totPorcR").innerHTML = stadistics.totPorcR + " %";
  stadistics.totPorcI = totPorcI;
  document.getElementById("totPorcI").innerHTML = stadistics.totPorcI + " %";
  stadistics.totalPorc = totalPorc;
  document.getElementById("totalPorc").innerHTML = stadistics.totalPorc + " %";

  console.log(totDemocrat);
  console.log(totRepublican);
  console.log(totIndependent);
  console.log(totalForParty);
  console.log(totPorcD);
  console.log(totPorcR);
  console.log(totPorcI);
  console.log(totalPorc);
}
