var members = data.results[0].members;

showMemberDropDown(members);
createStates();
createTable();

//tabla

function createTable() {
  var tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  for (var i = 0; i < members.length; i++) {
    var tableRow = document.createElement("tr");
    var firstName = members[i].first_name;
    var middleName = members[i].middle_name;
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
    var votesParty = members[i].votes_with_party_pct.toFixed(2) + " %";
    var cells = [link, party, state, seniority, votesParty];

    if (showMember(members[i])) {
      for (var j = 0; j < cells.length; j++) {
        var tableCell = document.createElement("td");
        tableCell.append(cells[j]);
        tableRow.append(tableCell);
      }
      document.getElementById("tableBody").append(tableRow);
    }
  }
}

// dropdown
function showMemberDropDown(member) {
  var options = document.getElementById("dropDownBody").value;
  if (options === member.state || options === "All") {
    return true;
  }
}

document.getElementById("dropDownBody").addEventListener("change", createTable);

function createStates() {
  var filtStat = [];
  for (i = 0; i < members.length; i++) {
    if (filtStat.indexOf(members[i].state) == -1) {
      filtStat.push(members[i].state);
      filtStat.sort();
    }
  }
  for (var j = 0; j < filtStat.length; j++) {
    var option = document.createElement("option");
    option.classList.add("stateOptions");
    option.setAttribute("value", filtStat[j]);
    option.innerHTML = filtStat[j];
    var dropDowStat = document.getElementById("dropDownBody");
    dropDowStat.appendChild(option);
  }
}
//checBo

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
  var checBo = document.querySelectorAll("input[name=Party]");
  var cheChBox = document.querySelectorAll("input[name=Party]:checked");
  if (cheChBox.length == 0 && options == "All") {
    return true;
  }
  for (var j = 0; j < checBo.length; j++) {
    if (
      checBo[j].checked &&
      member.party == checBo[j].value &&
      (options === member.state || options === "All")
    ) {
      return true;
    } else if (cheChBox.length === 0 && options === member.state) {
      return true;
    }
  }
  return false;
}
