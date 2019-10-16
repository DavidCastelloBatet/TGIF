var statistics = {
	
}
var members = data.results[0].members;
members_counter(members)
if (window.location.pathname.includes("loyalty")){
	least_loyal(members)
	most_loyal(members)
	
}
else { least_engaged(members) 
	  most_engaged(members)
} 
function members_counter(membersArray) {
   var trRep = document.getElementById("rep-members");
   var trDem = document.getElementById("dem-members");
   var trInd = document.getElementById("ind-members");
   var trMembers = document.getElementById("tot-members");
   var counterRep = 0;
   var counterDem = 0;
   var counterInd = 0;
   var counterRepVotes = 0;
   var counterDemVotes = 0;
   var counterIndVotes = 0;
   for (var x = 0; x < membersArray.length; x++) {
       if (membersArray[x].party == "R") {
           counterRep += 1;

           counterRepVotes += membersArray[x].votes_with_party_pct;
       } else if (membersArray[x].party == "D") {
           counterDem += 1;
           counterDemVotes += membersArray[x].votes_with_party_pct;

       } else if (membersArray[x].party == "I") {
           counterInd += 1;
           counterIndVotes += membersArray[x].votes_with_party_pct;

       }
   }

   var tdRep = document.createElement("td");
   var tdDem = document.createElement("td");
   var tdInd = document.createElement("td");
   var tdRepVotes = document.createElement("td");
   var tdDemVotes = document.createElement("td");
   var tdIndVotes = document.createElement("td");
   var tdMembers = document.createElement("td");
   tdRep.textContent = counterRep;
   tdDem.textContent = counterDem;
   tdInd.textContent = counterInd;
   tdMembers.textContent = counterRep + counterDem + counterInd;
   console.log(tdMembers);

   if (counterRep == 0) {
       tdRepVotes.textContent = 0 + "%";
   } else {
       tdRepVotes.textContent = Math.round(counterRepVotes / counterRep) + "%";
   }
   if (counterDem == 0) {
       tdDemVotes.textContent = 0 + "%";
   } else {
       tdDemVotes.textContent = Math.round(counterDemVotes / counterDem) + "%";
   }
   if (counterInd == 0) {
       tdIndVotes.textContent = 0 + "%";
   } else {
       tdIndVotes.textContent = Math.round(counterIndVotes / counterInd) + "%";
   }

   trRep.append(tdRep, tdRepVotes);
   trDem.append(tdDem, tdDemVotes);
   trInd.append(tdInd, tdIndVotes);
   trMembers.append(tdMembers);
}

//////// objects

var statistics_attendance = {
    "num_democrats": 0,
    "num_republican": 0,
    "num_independent": 0,
    "pct_votes_democrats": 0,
    "pct_votes_republican": 0,
    "pct_votes_independent": 0,
    "least_engaged": 0,
    "most_engaged": 0,
}

var statistics_loyalty = {
    "num_democrats": 0,
    "num_republican": 0,
    "num_independent": 0,
    "pct_votes_democrats": 0,
    "pct_votes_republican": 0,
    "pct_votes_independent": 0,
    "least_loyal": 0,
    "most_loyal": 0,
}


/////least engaged

function least_engaged(membersArray) {


	membersArray.sort(function (member1, member2) {
		return member2.missed_votes_pct - member1.missed_votes_pct
	});


	var ten_percent = Math.round(membersArray.length * .10);
	var tBody = document.getElementById("least-engaged");

	for (var x = 0; x < ten_percent; x++) {

		var row = document.createElement("tr")
		var tdName = document.createElement("td")
		var tdMissedVotes = document.createElement("td")
		var tdMissedVotesPct = document.createElement("td")

		var str = membersArray[x].first_name + " " + (membersArray[x].middle_name || "") + " " + membersArray[x].last_name;
		var link = membersArray[x].url;
		var NameLink = str.link(link);

		tdName.innerHTML = NameLink;
		tdMissedVotes.textContent = membersArray[x].missed_votes;
		tdMissedVotesPct.textContent = membersArray[x].missed_votes_pct + "%";
		row.append(tdName, tdMissedVotes, tdMissedVotesPct);
		tBody.append(row);
	}
}
//////// most engaged

function most_engaged(membersArray) {

	membersArray.sort(function (member1,member2) {
		return member1.missed_votes_pct - member2.missed_votes_pct
	});


	var ten_percent = Math.round(membersArray.length * .10);
	var tBody = document.getElementById("most-engaged");

	for (var x = 0; x < ten_percent; x++) {

		var row = document.createElement("tr");
		var tdName = document.createElement("td");
		var tdMissedVotes = document.createElement("td");
		var tdMissedVotesPct = document.createElement("td");

		var str = membersArray[x].first_name + " " + (membersArray[x].middle_name || "") + " " + membersArray[x].last_name;
		var link = membersArray[x].url;
		var NameLink = str.link(link);

		tdName.innerHTML = NameLink;
		tdMissedVotes.textContent = membersArray[x].missed_votes;
		tdMissedVotesPct.textContent = membersArray[x].missed_votes_pct + "%";
		row.append(tdName, tdMissedVotes, tdMissedVotesPct);
		tBody.append(row);
	}
}

////////// least loyal

function least_loyal(membersArray) {


	membersArray.sort(function (member1, member2) {
		return member2.party_with_votes_pct - member1.party_with_votes_pct
	});


	var ten_percent = Math.round(membersArray.length * .10);
	var tBody = document.getElementById("least-loyal");

	for (var x = 0; x < ten_percent; x++) {

		var row = document.createElement("tr")
		var tdName = document.createElement("td")
		var tdPartyVotes = document.createElement("td")
		var tdPartyVotesPct = document.createElement("td")

		var str = membersArray[x].first_name + " " + (membersArray[x].middle_name || "") + " " + membersArray[x].last_name;
		var link = membersArray[x].url;
		var NameLink = str.link(link);

		tdName.innerHTML = NameLink;
		tdPartyVotes.innerHTML = membersArray[x].total_votes;
		tdPartyVotesPct.innerHTML = membersArray[x].votes_with_party_pct;
		row.append(tdName, tdPartyVotes, tdPartyVotesPct);
		tBody.append(row);
	}
}

///////// most loyal

function most_loyal(membersArray) {


	membersArray.sort(function (member1, member2) {
		return member1.party_with_votes_pct - member2.party_with_votes_pct
	});


	var ten_percent = Math.round(membersArray.length * .10);
	var tBody = document.getElementById("most-loyal");

	for (var x = 0; x < ten_percent; x++) {

		var row = document.createElement("tr")
		var tdName = document.createElement("td")
		var tdPartyVotes = document.createElement("td")
		var tdPartyVotesPct = document.createElement("td")

		var str = membersArray[x].first_name + " " + (membersArray[x].middle_name || "") + " " + membersArray[x].last_name;
		var link = membersArray[x].url;
		var NameLink = str.link(link);

		tdName.innerHTML = NameLink;
		tdPartyVotes.innerHTML = membersArray[x].total_votes;
		tdPartyVotesPct.innerHTML = membersArray[x].votes_with_party_pct;
		row.append(tdName, tdPartyVotes, tdPartyVotesPct);
		tBody.append(row);
	}
}