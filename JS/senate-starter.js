// Global Variables
var members = data.results[0].members;


// Function Calls
addTable(members);



// Function Declarations
function addTable(members) {
    var table = document.getElementById("senate-body");
    
    for (var i = 0; i < members.length; i++) {

        var firstName = members[i].first_name;
        var lastName = members[i].last_name;
        var midName = members[i].middle_name;
        if (midName == null) {
            midName = "";
        }
        var fullName = firstName + " " + midName + " " + lastName;

        
        var row = document.createElement("tr");
        var nameCell = document.createElement("td");
        var partyCell = document.createElement("td");
        var stateCell = document.createElement("td");
        var seniorCell = document.createElement("td");
        var votesCell = document.createElement("td");

        nameCell.append(fullName);

        var party = members[i].party;
        partyCell.append(party);

        var state = members[i].state;
        stateCell.append(state);

        var seniority = members[i].seniority;
        seniorCell.append(seniority);

        var votes = members[i].votes_with_party_pct;
        votesCell.append(votes);


        row.append(nameCell);
        row.append(partyCell);
        row.append(stateCell);
        row.append(seniorCell);
        row.append(votesCell);

        table.append(row);
    }
}
