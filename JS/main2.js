//var members = data.results[0].members;

//selector jason para fetch
console.log(document.title);

var jason = "";

switch (opc) {
  case "congress":
    var jason = "https://api.propublica.org/congress/v1/113/house/members.json";

    break;

  default:
    var jason =
      "https://api.propublica.org/congress/v1/113/senate/members.json";

    break;
}
var members = [];
fetch(jason, {
  method: "GET",
  headers: {
    "X-API-Key": "1BwNGhOrT1o9ZCBj4SrIehWcR0QTAXPnAq7HvLcT"
  }
})
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
    members = data.results[0].members;
    var node = document.getElementById("loader");
    node.parentNode.removeChild(node);
    showMemberDropDown(members);
    createStates();
    createTable();
  })
  .catch(error => {
    console.log(error);
  });

//function calls

//showMemberDropDown(members);
//createStates();
//createTable();

//tabla

function createTable() {
  let message = true;
  var tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  for (var i = 0; i < members.length; i++) {
    var tableRow = document.createElement("tr");
    //for each row create 5 cells (full name, party, state, seniority, precentage of votes)
    var firstName = members[i].first_name;
    var middleName = members[i].middle_name;
    //control de los que no tienen middleName
    if (middleName === null) {
      middleName = "";
    }
    var lastName = members[i].last_name;
    var completeName = firstName + " " + middleName + " " + lastName;

    var link = document.createElement("a");
    link.setAttribute("href", members[i].url);
    link.innerHTML = completeName;
    var party = members[i].party;
    var state = members[i].state;
    var seniority = members[i].seniority;
    var votesParty = members[i].votes_with_party_pct + " %";
    var cells = [link, party, state, seniority, votesParty];

    if (showMember(members[i])) {
      message = false;
      for (var j = 0; j < cells.length; j++) {
        var tableCell = document.createElement("td");
        tableCell.append(cells[j]);
        tableRow.append(tableCell);
      }
      tableBody.append(tableRow);
    }
  }

  if (message) {
    var tableRow = document.createElement("tr");
    var tableCell = document.createElement("td");
    tableRow.append(tableCell);
    tableCell.innerHTML = "There are no Independent members in the chamber.";
    tableRow.append(tableCell);
    tableBody.append(tableRow);
  }
}

//checkscajitas

document
  .querySelectorAll("input[name=Party]")[0]
  .addEventListener("click", createTable);
document
  .querySelectorAll("input[name=Party]")[1]
  .addEventListener("click", createTable);
document
  .querySelectorAll("input[name=Party]")[2]
  .addEventListener("click", createTable);

function showMember(member) {
  var options = document.getElementById("dropDownBody").value;
  var checkboxes = document.querySelectorAll("input[name=Party]");
  var checkedCheckboxes = document.querySelectorAll(
    "input[name=Party]:checked"
  );
  if (checkedCheckboxes.length == 0 && options == "All") {
    return true;
  }
  for (var j = 0; j < checkboxes.length; j++) {
    if (
      checkboxes[j].checked &&
      member.party == checkboxes[j].value &&
      (options === member.state || options === "All")
    ) {
      return true;
    } else if (checkedCheckboxes.length == 0 && options === member.state) {
      return true;
    }
  }
  return false;
}

// dropstates
function showMemberDropDown(member) {
  var options = document.getElementById("dropDownBody").value;
  if (options === member.state || options === "All") {
    return true;
  }
}

document.getElementById("dropDownBody").addEventListener("change", createTable);

function createStates() {
  var filteredStates = [];
  for (i = 0; i < members.length; i++) {
    if (filteredStates.indexOf(members[i].state) == -1) {
      filteredStates.push(members[i].state);
      filteredStates.sort();
    }
  }
  for (var j = 0; j < filteredStates.length; j++) {
    var option = document.createElement("option");
    option.classList.add("stateOptions");
    option.setAttribute("value", filteredStates[j]);
    option.innerHTML = filteredStates[j];
    var dropDownOptions = document.getElementById("dropDownBody");
    dropDownOptions.appendChild(option);
  }
}
