//var members = data.results[0].members;

//TOTAL NUMBER OF MEMBERS
var democrats = [];
var republicans = [];
var independents = [];
//VOTED WITH PARTY ALL PERCENTAGES
var allDemocratsVotedPercantages = [];
var allRepublicansVotedPercantages = [];
var allIndependentsVotedPercantages = [];

//PARTY ENGAGEDMENT 10% ATTENDANCE
var bottom10PctMembersByMissedVotesHouse = [];
var top10PctMembersByMissedVotesHouse = [];

//selector jason para fetch
console.log(opc);

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
    getMembersFromParties(members);
    fillTheObject();
    getBottomAndTop10PctAttendanceHouse(
      sortMembersByMissedVotesHouse(members),
      true
    );
    getBottomAndTop10PctAttendanceHouse(
      sortMembersByMissedVotesHouse(members),
      false
    );
    createLeastAndMostEngagedTables(
      "leastEngagedHouse",
      bottom10PctMembersByMissedVotesHouse
    );
    createLeastAndMostEngagedTables(
      "mostEngagedHouse",
      top10PctMembersByMissedVotesHouse
    );
    createTopTable(statistics, "topTableBodyHouse");
  })
  .catch(error => {
    console.log(error);
  });

//function calls

// call to functions
/*
getMembersFromParties(members);
fillTheObject();
getBottomAndTop10PctAttendanceHouse(
  sortMembersByMissedVotesHouse(members),
  true
);
getBottomAndTop10PctAttendanceHouse(
  sortMembersByMissedVotesHouse(members),
  false
);
createLeastAndMostEngagedTables(
  "leastEngagedHouse",
  bottom10PctMembersByMissedVotesHouse
);
createLeastAndMostEngagedTables(
  "mostEngagedHouse",
  top10PctMembersByMissedVotesHouse
);
createTopTable(statistics, "topTableBodyHouse");
*/
// create function

function getMembersFromParties(members) {
  //loop through all members
  for (var i = 0; i < members.length; i++) {
    //if they are democrats
    if (members[i].party === "D") {
      //make an array of democrats
      democrats.push(members[i]);
      //make an array or percentage votes for democrats
      allDemocratsVotedPercantages.push(members[i].votes_with_party_pct);
    } else if (members[i].party === "R") {
      republicans.push(members[i]);
      allRepublicansVotedPercantages.push(members[i].votes_with_party_pct);
    } else {
      independents.push(members[i]);
      allIndependentsVotedPercantages.push(members[i].votes_with_party_pct);
    }
  }
}

function partyPctVoted(arr) {
  var sum = 0.0;
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

function getTotalAvgPercentage(statistics) {
  if (statistics.parties[2].number_of_members == 0) {
    statistics.parties[3].votes_with_party_pct =
      (
        (partyPctVoted(allDemocratsVotedPercantages) +
          partyPctVoted(allRepublicansVotedPercantages)) /
        2
      ).toFixed(2) + " %";
  } else {
    statistics.parties[3].votes_with_party_pct =
      (
        (partyPctVoted(allDemocratsVotedPercantages) +
          partyPctVoted(allRepublicansVotedPercantages) +
          partyPctVoted(allIndependentsVotedPercantages)) /
        3
      ).toFixed(2) + " %";
  }
}

//sort array of members by missed votes pct
function sortMembersByMissedVotesHouse(members) {
  var allMembers = Array.from(members);
  allMembers.sort(function(a, b) {
    return a.missed_votes_pct > b.missed_votes_pct
      ? 1
      : b.missed_votes_pct > a.missed_votes_pct
      ? -1
      : 0;
  });
  return allMembers;
}

function getBottomAndTop10PctAttendanceHouse(
  sortMembersByMissedVotesHouse,
  acc
) {
  //calculate 10percent of members and round the number to have a cut off point
  var num = Math.round(sortMembersByMissedVotesHouse.length * 0.1);
  if (acc) {
    for (var i = 0; i < num; i++) {
      top10PctMembersByMissedVotesHouse.push(sortMembersByMissedVotesHouse[i]);
    }

    for (var j = num; j < sortMembersByMissedVotesHouse.length; j++) {
      if (
        sortMembersByMissedVotesHouse[j].missed_votes_pct ===
        sortMembersByMissedVotesHouse[num - 1].missed_votes_pct
      ) {
        top10PctMembersByMissedVotesHouse.push(
          sortMembersByMissedVotesHouse[j]
        );
      }
    }
  } else {
    for (
      var k = sortMembersByMissedVotesHouse.length - 1;
      k > sortMembersByMissedVotesHouse.length - num - 1;
      k--
    ) {
      bottom10PctMembersByMissedVotesHouse.push(
        sortMembersByMissedVotesHouse[k]
      );
    }
    for (var l = sortMembersByMissedVotesHouse.length - num - 1; l > 0; l--) {
      if (
        sortMembersByMissedVotesHouse[l].missed_votes_pct ===
        sortMembersByMissedVotesHouse[
          sortMembersByMissedVotesHouse.length - num
        ].missed_votes_pct
      ) {
        bottom10PctMembersByMissedVotesHouse.push(
          sortMembersByMissedVotesHouse[l]
        );
      }
    }
  }
}

//sort array of members by votes with party pct
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

//TABLES

function fillTheObject() {
  statistics = {
    parties: [
      {
        party: "Democrats",
        number_of_members: democrats.length,
        votes_with_party_pct:
          partyPctVoted(allDemocratsVotedPercantages).toFixed(2) + " %"
      },
      {
        party: "Republicans",
        number_of_members: republicans.length,
        votes_with_party_pct:
          partyPctVoted(allRepublicansVotedPercantages).toFixed(2) + " %"
      },
      {
        party: "Independents",
        number_of_members: independents.length,
        votes_with_party_pct:
          partyPctVoted(allIndependentsVotedPercantages).toFixed(2) + " %"
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

function createTopTable(statistics, idname) {
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

function createLeastAndMostEngagedTables(idname, arr) {
  for (var i = 0; i < arr.length; i++) {
    var tableRow = document.createElement("tr");
    var firstName = arr[i].first_name;
    var middleName = arr[i].middle_name;
    //some members don't have middle names
    if (middleName === null) {
      middleName = "";
    }
    var lastName = arr[i].last_name;
    var completeName = firstName + " " + middleName + " " + lastName;
    var numMissedVotes = arr[i].missed_votes;
    var pctMissedVotes = arr[i].missed_votes_pct + " %";
    var cells = [completeName, numMissedVotes, pctMissedVotes];
    for (var j = 0; j < cells.length; j++) {
      var tableCell = document.createElement("td");
      tableCell.append(cells[j]);
      tableRow.append(tableCell);
    }
    document.getElementById(idname).append(tableRow);
  }
}
