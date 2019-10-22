var members = data.results[0].members;

//TOTAL NUMBER OF MEMBERS
var democrats = [];
var republicans = [];
var independents = [];
//VOTED WITH PARTY ALL PERCENTAGES
var allDemocratsVotedPercantages = [];
var allRepublicansVotedPercantages = [];
var allIndependentsVotedPercantages = [];
//PARTY LOYALTY 10% 
var statistics;
var bottom10PctMembersByVotesWithPartyHouse = [];
var top10PctMembersByVotesWithPartyHouse = [];

// call to functions
getMembersFromParties(members);
fillTheObject();
partyPctVoted(allDemocratsVotedPercantages);
partyPctVoted(allRepublicansVotedPercantages);
partyPctVoted(allIndependentsVotedPercantages);
getBottomAndTop10PctLoyaltyHouse(sortMembersByVotesWithPartyPctHouse(members), true);
getBottomAndTop10PctLoyaltyHouse(sortMembersByVotesWithPartyPctHouse(members), false);
createLeastAndMostLoyalTables("houseLeastLoyalTable", bottom10PctMembersByVotesWithPartyHouse);
createLeastAndMostLoyalTables("houseMostLoyalTable", top10PctMembersByVotesWithPartyHouse);
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
    var sum = 0;
    if (arr.length === 0) {
        return (0.00);
    } else {
        for (var i = 0; i < arr.length; i++) {
            sum = sum + arr[i];
        }
    }
    var average =Math.fround(sum / arr.length);
    return average;
}


//sort array of members by votes with party pct
function sortMembersByVotesWithPartyPctHouse() {
    var allMembers = Array.from(members);
    allMembers.sort(function (a, b) {
        return (a.votes_with_party_pct > b.votes_with_party_pct) ? 1 : ((b.votes_with_party_pct > a.votes_with_party_pct) ? -1 : 0);
    });
    return allMembers;
}


function getBottomAndTop10PctLoyaltyHouse(sortMembersByVotesWithPartyPctHouse, acc) {
    //calculate 10percent of members and round the number to have a cut off point
    var num = Math.round(sortMembersByVotesWithPartyPctHouse.length * 0.1);
    if (acc) {
        for (var i = 0; i < num; i++) {
            bottom10PctMembersByVotesWithPartyHouse.push(sortMembersByVotesWithPartyPctHouse[i]);
        }

        for (var j = num; j < sortMembersByVotesWithPartyPctHouse.length; j++) {
            if (sortMembersByVotesWithPartyPctHouse[j].votes_with_party_pct === sortMembersByVotesWithPartyPctHouse[num - 1].missed_votes_pct) {
                bottom10PctMembersByVotesWithPartyHouse.push(sortMembersByVotesWithPartyPctHouse[j]);
            }
        }
    } else {

        for (var k = sortMembersByVotesWithPartyPctHouse.length - 1; k > sortMembersByVotesWithPartyPctHouse.length - num - 1; k--) {
            top10PctMembersByVotesWithPartyHouse.push(sortMembersByVotesWithPartyPctHouse[k]);
        }
        for (var l = sortMembersByVotesWithPartyPctHouse.length - num - 1; l > 0; l--) {
            if (sortMembersByVotesWithPartyPctHouse[l].votes_with_party_pct === sortMembersByVotesWithPartyPctHouse[sortMembersByVotesWithPartyPctHouse.length - num].votes_with_party_pct) {
                top10PctMembersByVotesWithPartyHouse.push(sortMembersByVotesWithPartyPctHouse[l]);
            }
        }
    }
}

//TABLES

function fillTheObject() {
    statistics = {
        "parties": [
            {
                "party": "Democrats",
                "number_of_members": democrats.length,
                "votes_with_party_pct": partyPctVoted(allDemocratsVotedPercantages).toFixed(2) + " %"
        },
            {
                "party": "Republicans",
                "number_of_members": republicans.length,
                "votes_with_party_pct": partyPctVoted(allRepublicansVotedPercantages).toFixed(2) + " %"
        },
            {
                "party": "Independents",
                "number_of_members": independents.length,
                "votes_with_party_pct": partyPctVoted(allIndependentsVotedPercantages).toFixed(2) + " %"
        },
            {
                "party": "Total",
                "number_of_members": democrats.length + republicans.length + independents.length,
                "votes_with_party_pct": 0
            }
        ]
    }
    getTotalAvgPercentage(statistics);
}

function createTopTableHouse(statistics, idname) {
    var parties = statistics.parties
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
        statistics.parties[3].votes_with_party_pct = (((partyPctVoted(allDemocratsVotedPercantages) + partyPctVoted(allRepublicansVotedPercantages)) / 2).toFixed(2) + " %") ;
    } else {
        statistics.parties[3].votes_with_party_pct = (((partyPctVoted(allDemocratsVotedPercantages) + partyPctVoted(allRepublicansVotedPercantages) + partyPctVoted(allIndependentsVotedPercantages)) / 3).toFixed(2) + " %")
    }
}