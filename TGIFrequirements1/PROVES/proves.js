var members = data.results[0].members;
createtable(members)
function createtable(membersarray) {
	var tbody = document.getElementById("members-data");
	tbody.innerHTML = "";
for (var x = 0; x < membersarray.length; x++) {
	
	//// creat raw and cells
	var row = document.createElement("tr")
	var tdname = document.createElement("td")
	var tdparty = document.createElement("td")
	var tdstate = document.createElement("td")
	var tdseniority = document.createElement("td")
	var tdvotes = document.createElement("td")
	
	
	//// link a name
	var str = membersarray[x].first_name + " " + (membersarray[x].middle_name || "") + " " + membersarray[x].last_name;
	var link = membersarray[x].url;
	var Namelink = str.link(link);
	
	//// content to cells
	tdname.innerHTML = Namelink;
	tdparty.textContent = membersarray[x].party;
	tdstate.textContent = membersarray[x].state;
	tdseniority.textContent = membersarray[x].seniority;
	tdvotes.textContent = membersarray[x].votes_with_party_pct;

	////// push the content
	
	row.append(tdname, tdparty, tdstate, tdseniority, tdvotes);
	
	tbody.append(row);
	}}

/////// checbox filter

document.getElementById("dem").addEventListener("click", function () {
    filter_data(members);
});

document.getElementById("rep").addEventListener("click", function () {
    filter_data(members);
});

document.getElementById("ind").addEventListener("click", function () {
    filter_data(members);
});

document.getElementById("state_list").addEventListener("change", function () {
    filter_data(members);
});

////// filter checkbox

function filter_data(membersArray) {
	
	var selected_state = document.getElementById("state_list").value;

    var newMembers = [];

    for (var x = 0; x < membersArray.length; x++) {
        if ((document.getElementById("dem").checked && membersArray[x].party == "D") && (selected_state == membersArray[x].state || selected_state == "ALL")) {
            newMembers.push(membersArray[x]);
        } 
		else if ((document.getElementById("rep").checked && membersArray[x].party == "R") && (selected_state == membersArray[x].state || selected_state == "ALL")) {
            newMembers.push(membersArray[x]);
        } 
		else if ((document.getElementById("ind").checked && membersArray[x].party == "I") && (selected_state == membersArray[x].state || selected_state == "ALL")) {
            newMembers.push(membersArray[x]);
        }
		
    }

    createtable(newMembers);
}

///////// filter statelist

// function to create dropdown state list
filter_state(members);
function filter_state(membersArray) {
   var stateArray = new Set(membersArray.map(member => member.state).sort()); //remove duplicate creat new array
	
	
	
   var list = document.getElementById("state_list");
   stateArray.forEach(function (element) {
       var optionState = document.createElement("option");
       optionState.setAttribute("value", element);
       optionState.text = element;
       list.add(optionState);

   });
}
 
  




