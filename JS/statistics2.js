var members = data.results[0].members;

//TOTAL NUMBER OF MEMBERS
var democrats = [];
var republicans = [];
var independents = [];
//VOTED WITH PARTY ALL PERCENTAGES
var allDemVotPer = [];
var allRepVotPer = [];
var allIndVotPer = [];
//PARTY LOYALTY 10%
var statistics;
var bot10PctMemVotesWhitPart = [];
var top10PctMemVotesWhitPart = [];

// call to functions
getMembersFromParties(members);
fillTheObject();
partyPctVoted(allDemVotPer);
partyPctVoted(allRepVotPer);
partyPctVoted(allIndVotPer);
getBottomAndTop10PctLoyaltyHouse(sortMemByVotPartyPct(members), true);
getBottomAndTop10PctLoyaltyHouse(sortMemByVotPartyPct(members), false);
createLeastAndMostLoyalTables("houseLeastLoyalTable", bot10PctMemVotesWhitPart);
createLeastAndMostLoyalTables("houseMostLoyalTable", top10PctMemVotesWhitPart);
createTopTableHouse(statistics, "houseLoyaltyTable");

//create functions

function getMembersFromParties(members) {
  //loop through all members
  for (var i = 0; i < members.length; i++) {
    //if they are democrats
    if (members[i].party === "D") {
      //make an array of democrats
      democrats.push(members[i]);
      //make an array or percentage votes for democrats
      allDemVotPer.push(members[i].votes_with_party_pct);
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

//se ordena aary de by votes with party pct
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

function getBottomAndTop10PctLoyaltyHouse(sortMemByVotPartyPct, acc) {
  //calculate 10percent of members and round the number to have a cut off point
  var num = Math.round(sortMemByVotPartyPct.length * 0.1);
  if (acc) {
    for (var i = 0; i < num; i++) {
      bot10PctMemVotesWhitPart.push(sortMemByVotPartyPct[i]);
    }

    for (var j = num; j < sortMemByVotPartyPct.length; j++) {
      if (
        sortMemByVotPartyPct[j].votes_with_party_pct ===
        sortMemByVotPartyPct[num - 1].missed_votes_pct
      ) {
        bot10PctMemVotesWhitPart.push(sortMemByVotPartyPct[j]);
      }
    }
  } else {
    for (
      var k = sortMemByVotPartyPct.length - 1;
      k > sortMemByVotPartyPct.length - num - 1;
      k--
    ) {
      top10PctMemVotesWhitPart.push(sortMemByVotPartyPct[k]);
    }
    for (var l = sortMemByVotPartyPct.length - num - 1; l > 0; l--) {
      if (
        sortMemByVotPartyPct[l].votes_with_party_pct ===
        sortMemByVotPartyPct[sortMemByVotPartyPct.length - num]
          .votes_with_party_pct
      ) {
        top10PctMemVotesWhitPart.push(sortMemByVotPartyPct[l]);
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
        votes_with_party_pct: partyPctVoted(allDemVotPer).toFixed(2) + " %"
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
    //some members don't have middle names
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
      ((partyPctVoted(allDemVotPer) + partyPctVoted(allRepVotPer)) / 2).toFixed(
        2
      ) + " %";
  } else {
    statistics.parties[3].votes_with_party_pct =
      (
        (partyPctVoted(allDemVotPer) +
          partyPctVoted(allRepVotPer) +
          partyPctVoted(allIndVotPer)) /
        3
      ).toFixed(2) + " %";
  }
}
