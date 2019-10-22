var members = data.results[0].members;

//declaracion de variables
var democrats = [];
var republicans = [];
var independents = [];

var allDemoVotedPer = [];
var allRepVotPer = [];
var allIndVotPer = [];

var bot10MembMisVotes = [];
var top10MemMisVotes = [];

// call to functions

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
createLeastAndMostEngagedTables("leastEngagedHouse", bot10MembMisVotes);
createLeastAndMostEngagedTables("mostEngagedHouse", top10MemMisVotes);
createTopTable(statistics, "topTableBodyHouse");

// creacion de funciones

function getMembersFromParties(members) {
  //loop through all members
  for (var i = 0; i < members.length; i++) {
    //if they are democrats
    if (members[i].party === "D") {
      //make an array of democrats
      democrats.push(members[i]);
      //make an array or percentage votes for democrats
      allDemoVotedPer.push(members[i].votes_with_party_pct);
    } else if (members[i].party === "R") {
      republicans.push(members[i]);
      allRepVotPer.push(members[i].votes_with_party_pct);
    } else {
      independents.push(members[i]);
      allIndVotPer.push(members[i].votes_with_party_pct);
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
        (partyPctVoted(allDemoVotedPer) + partyPctVoted(allRepVotPer)) /
        2
      ).toFixed(2) + " %";
  } else {
    statistics.parties[3].votes_with_party_pct =
      (
        (partyPctVoted(allDemoVotedPer) +
          partyPctVoted(allRepVotPer) +
          partyPctVoted(allIndVotPer)) /
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
      top10MemMisVotes.push(sortMembersByMissedVotesHouse[i]);
    }

    for (var j = num; j < sortMembersByMissedVotesHouse.length; j++) {
      if (
        sortMembersByMissedVotesHouse[j].missed_votes_pct ===
        sortMembersByMissedVotesHouse[num - 1].missed_votes_pct
      ) {
        top10MemMisVotes.push(sortMembersByMissedVotesHouse[j]);
      }
    }
  } else {
    for (
      var k = sortMembersByMissedVotesHouse.length - 1;
      k > sortMembersByMissedVotesHouse.length - num - 1;
      k--
    ) {
      bot10MembMisVotes.push(sortMembersByMissedVotesHouse[k]);
    }
    for (var l = sortMembersByMissedVotesHouse.length - num - 1; l > 0; l--) {
      if (
        sortMembersByMissedVotesHouse[l].missed_votes_pct ===
        sortMembersByMissedVotesHouse[
          sortMembersByMissedVotesHouse.length - num
        ].missed_votes_pct
      ) {
        bot10MembMisVotes.push(sortMembersByMissedVotesHouse[l]);
      }
    }
  }
}

//se ordena  array de miembros por  votos con party pct
function sortMemByVotPartyPct() {
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

//tablas

function fillTheObject() {
  statistics = {
    parties: [
      {
        party: "Democrats",
        number_of_members: democrats.length,
        votes_with_party_pct: partyPctVoted(allDemoVotedPer).toFixed(2) + " %"
      },
      {
        party: "Republicans",
        number_of_members: republicans.length,
        votes_with_party_pct: partyPctVoted(allRepVotPer).toFixed(2) + " %"
      },
      {
        party: "Independents",
        number_of_members: independents.length,
        votes_with_party_pct: partyPctVoted(allIndVotPer).toFixed(2) + " %"
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

    if (middleName === null) {
      middleName = "";
    }
    var lastName = arr[i].last_name;
    var completeName = firstName + " " + middleName + " " + lastName;
    var numMissedVotes = arr[i].missed_votes;
    var pctMissedVotes = arr[i].missed_votes_pct.toFixed(2) + " %";
    var cells = [completeName, numMissedVotes, pctMissedVotes];
    for (var j = 0; j < cells.length; j++) {
      var tableCell = document.createElement("td");
      tableCell.append(cells[j]);
      tableRow.append(tableCell);
    }
    document.getElementById(idname).append(tableRow);
  }
}
