// Variables globales
var members = data.results[0].members;

// Objetos globales


// Llamadas a funciones
addTable(members);

// Declaración de funciones
function addTable(members) {
  var table = document.getElementById("t-body");
  
  for (var i = 0, len = members.length; i < len; i++) {
    var firstName = members[i].first_name;
    var lastName = members[i].last_name;
    var midName = members[i].middle_name;
    if (midName == null) {
      midName = "";
    }
    var fullName = firstName + " " + midName + " " + lastName;
    var urlName = members[i].url;
    
    var row = document.createElement("tr");
    var ancor = document.createElement("a");
    ancor.setAttribute("href", urlName);
    ancor.setAttribute("target", "_blank");
    ancor.innerHTML = fullName;

    var nameCell = document.createElement("td");
    var partyCell = document.createElement("td");
    var stateCell = document.createElement("td");
    var seniorCell = document.createElement("td");
    var votesCell = document.createElement("td");
    
    nameCell.append(ancor);
    partyCell.append(members[i].party);
    stateCell.append(members[i].state);
    seniorCell.append(members[i].seniority);
    var votes = members[i].votes_with_party_pct;
    votesCell.append(votes.toFixed(2) + " %");
    
    row.append(nameCell, partyCell, stateCell, seniorCell, votesCell);
    table.append(row);
  }
}

