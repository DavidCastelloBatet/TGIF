//declaracion variables i arrays

//var members = data.results[0].members;

var democrats = [];
var republicans = [];
var independents = [];
var allDemoVotPercent = [];
var allRepuVotPercent = [];
var allIndepVotPercent = [];
var statistics;
var bottom10PctMembersByVotesWithPartyHouse = [];
var top10PctMembersByVotesWithPartyHouse = [];

var jason = "";

switch (opc) {
  case "congress":
    var jason = "https://api.propublica.org/congress/v1/113/house/members.json";

    console.log(jason);
    break;

  default:
    var jason =
      "https://api.propublica.org/congress/v1/113/senate/members.json";

    console.log(jason);

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
    getMembersFromParties(members);
    fillTheObject();
    partyPctVoted(allDemoVotPercent);
    partyPctVoted(allRepuVotPercent);
    partyPctVoted(allIndepVotPercent);
    getBottomAndTop10PctLoyaltyHouse(
      sortMembersByVotesWithPartyPctHouse(members),
      true
    );
    getBottomAndTop10PctLoyaltyHouse(
      sortMembersByVotesWithPartyPctHouse(members),
      false
    );

    createLeastAndMostLoyalTables(
      "houseLeastLoyalTable",
      bottom10PctMembersByVotesWithPartyHouse
    );
    createLeastAndMostLoyalTables(
      "houseMostLoyalTable",
      top10PctMembersByVotesWithPartyHouse
    );
    createTopTableHouse(statistics, "houseLoyaltyTable");
  })
  .catch(error => {
    console.log(error);
  });

// llamada a funciones desde dentro de fetch

//creacion de funciones

function getMembersFromParties(members) {
  for (var i = 0; i < members.length; i++) {
    if (members[i].party === "D") {
      democrats.push(members[i]);
      allDemoVotPercent.push(members[i].votes_with_party_pct);
    } else if (members[i].party === "R") {
      republicans.push(members[i]);
      allRepuVotPercent.push(members[i].votes_with_party_pct);
    } else {
      independents.push(members[i]);
      allIndepVotPercent.push(members[i].votes_with_party_pct);
    }
  }
}

function partyPctVoted(arr) {
  var sum = 0;
  if (arr.length === 0) {
    return 0.0;
  } else {
    for (var i = 0; i < arr.length; i++) {
      sum = sum + arr[i];
    }
  }
  var average = Math.fround(sum / arr.length);
  return average;
}

//ordeno array votos x miembro
function sortMembersByVotesWithPartyPctHouse() {
  var allMembers = Array.from(members);
  allMembers.sort(function(a, b) {
    return a.votes_with_party_pct > b.votes_with_party_pct
      ? 1
      : b.votes_with_party_pct > a.votes_with_party_pct
      ? -1
      : 0;
  });
  return allMembers;
}

function getBottomAndTop10PctLoyaltyHouse(
  sortMembersByVotesWithPartyPctHouse,
  acc
) {
  //calculo del 10%de miembros, redondeo i punto de corte
  var num = Math.round(sortMembersByVotesWithPartyPctHouse.length * 0.1);
  if (acc) {
    for (var i = 0; i < num; i++) {
      bottom10PctMembersByVotesWithPartyHouse.push(
        sortMembersByVotesWithPartyPctHouse[i]
      );
    }

    for (var j = num; j < sortMembersByVotesWithPartyPctHouse.length; j++) {
      if (
        sortMembersByVotesWithPartyPctHouse[j].votes_with_party_pct ===
        sortMembersByVotesWithPartyPctHouse[num - 1].missed_votes_pct
      ) {
        bottom10PctMembersByVotesWithPartyHouse.push(
          sortMembersByVotesWithPartyPctHouse[j]
        );
      }
    }
  } else {
    for (
      var k = sortMembersByVotesWithPartyPctHouse.length - 1;
      k > sortMembersByVotesWithPartyPctHouse.length - num - 1;
      k--
    ) {
      top10PctMembersByVotesWithPartyHouse.push(
        sortMembersByVotesWithPartyPctHouse[k]
      );
    }
    for (
      var l = sortMembersByVotesWithPartyPctHouse.length - num - 1;
      l > 0;
      l--
    ) {
      if (
        sortMembersByVotesWithPartyPctHouse[l].votes_with_party_pct ===
        sortMembersByVotesWithPartyPctHouse[
          sortMembersByVotesWithPartyPctHouse.length - num
        ].votes_with_party_pct
      ) {
        top10PctMembersByVotesWithPartyHouse.push(
          sortMembersByVotesWithPartyPctHouse[l]
        );
      }
    }
  }
}

//tablas

function fillTheObject() {
  statistics = {
    parties: [
      {
        party: "Democrats",
        number_of_members: democrats.length,
        votes_with_party_pct: partyPctVoted(allDemoVotPercent).toFixed(2) + " %"
      },
      {
        party: "Republicans",
        number_of_members: republicans.length,
        votes_with_party_pct: partyPctVoted(allRepuVotPercent).toFixed(2) + " %"
      },
      {
        party: "Independents",
        number_of_members: independents.length,
        votes_with_party_pct:
          partyPctVoted(allIndepVotPercent).toFixed(2) + " %"
      },
      {
        party: "Total",
        number_of_members:
          democrats.length + republicans.length + independents.length,
        votes_with_party_pct: 0
      }
    ]
  };
  getTotalAvgPercentage(statistics);
}

function createTopTableHouse(statistics, idname) {
  var parties = statistics.parties;
  for (var i = 0; i < parties.length; i++) {
    var tableRow = document.createElement("tr");
    var party = parties[i].party;
    var numberOfReps = parties[i].number_of_members;
    var votesWithParty = parties[i].votes_with_party_pct;
    var cells = [party, numberOfReps, votesWithParty];
    for (var j = 0; j < cells.length; j++) {
      var tableCell = document.createElement("td");
      tableCell.append(cells[j]);
      tableRow.append(tableCell);
    }
    document.getElementById(idname).append(tableRow);
  }
}

function createLeastAndMostLoyalTables(idname, arr) {
  for (var i = 0; i < arr.length; i++) {
    var tableRow = document.createElement("tr");
    var firstName = arr[i].first_name;
    var middleName = arr[i].middle_name;

    if (middleName === null) {
      middleName = "";
    }
    var lastName = arr[i].last_name;
    var completeName = firstName + " " + middleName + " " + lastName;
    var numMissedVotes = arr[i].total_votes;
    var pctMissedVotes = arr[i].votes_with_party_pct + " %";
    var cells = [completeName, numMissedVotes, pctMissedVotes];
    for (var j = 0; j < cells.length; j++) {
      var tableCell = document.createElement("td");
      tableCell.append(cells[j]);
      tableRow.append(tableCell);
    }
    document.getElementById(idname).append(tableRow);
  }
}

function getTotalAvgPercentage(statistics) {
  if (statistics.parties[2].number_of_members == 0) {
    statistics.parties[3].votes_with_party_pct =
      (
        (partyPctVoted(allDemoVotPercent) + partyPctVoted(allRepuVotPercent)) /
        2
      ).toFixed(2) + " %";
  } else {
    statistics.parties[3].votes_with_party_pct =
      (
        (partyPctVoted(allDemoVotPercent) +
          partyPctVoted(allRepuVotPercent) +
          partyPctVoted(allIndepVotPercent)) /
        3
      ).toFixed(2) + " %";
  }
}
