var site = "";

if (window.location.href.includes("senate")) {
	site = 'https://api.propublica.org/congress/v1/113/senate/members.json';
} else if (window.location.href.includes("house")) {
	site = 'https://api.propublica.org/congress/v1/113/house/members.json';
}


var app = new Vue({
	el: '#app',
	data: {
		site: site,
		membersArray: [],
		selected_party: [],
		selected_state: [],
		/// counter
		counterRep: 0,
		counterDem: 0,
		counterInd: 0,
		rep_votes: 0,
		dem_votes: 0,
		ind_votes: 0,
		tot_votes: 0,
		//// array
		leastengaged: [],
		mostengaged: [],
		leastloyal: [],
		mostloyal: []
	},

	methods: {

		getData: function () {

			fetch(this.site, {
				headers: {
					'X-API-Key': 'C4XByw2wXDOIxeXeeSJXKQBYB2dBZuoTQ6sydW5F',
				}
			}).
			then(function (response) {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error('Unable to retrieve data');
					}
				})
				.then(function (jsonData) {
					app.membersArray = jsonData.results[0].members;
					app.membersCounter();
					app.least_engaged();
					app.most_engaged();
					app.least_loyal();
					app.most_loyal();
				});


		},
		//////// members counter
		membersCounter: function () {



			var counterRepVotes = 0;
			var counterDemVotes = 0;
			var counterIndVotes = 0;
			for (var x = 0; x < this.membersArray.length; x++) {
				if (this.membersArray[x].party == "R") {
					this.counterRep += 1;

					counterRepVotes += this.membersArray[x].votes_with_party_pct;
				} else if (this.membersArray[x].party == "D") {
					this.counterDem += 1;
					counterDemVotes += this.membersArray[x].votes_with_party_pct;

				} else if (this.membersArray[x].party == "I") {
					this.counterInd += 1;
					counterIndVotes += this.membersArray[x].votes_with_party_pct;

				}
			}




			if (this.counterRep == 0) {
				this.rep_votes = 0 + "%";
			} else {
				this.rep_votes = (counterRepVotes / this.counterRep);
			}
			if (this.counterDem == 0) {
				this.dem_votes.textContent = 0 + "%";
			} else {
				this.dem_votes = Math.round(counterDemVotes / this.counterDem);
			}
			if (this.counterInd == 0) {
				this.ind_votes = 0 + "%";
			} else {
				this.ind_votes = Math.round(counterIndVotes / this.counterInd);
			}



		},
		///// least engaged
		least_engaged: function () {
			var least = Array.from(this.membersArray);
			least.sort(function (member1, member2) {
				return member2.missed_votes_pct - member1.missed_votes_pct
			});

			var ten_percent = Math.round(least.length * .10);

			for (var x = 0; x < ten_percent; x++) {
				this.leastengaged.push(least[x]);
			}


		},

		////// most engaged

		most_engaged: function () {
			var most = Array.from(this.membersArray);
			most.sort(function (member1, member2) {
				return member1.missed_votes_pct - member2.missed_votes_pct
			});

			var ten_percent = Math.round(most.length * .10);

			for (var x = 0; x < ten_percent; x++) {
				this.mostengaged.push(most[x]);
			}
		},

		///////// least loyal

		least_loyal: function () {
			var least = Array.from(this.membersArray);
			least.sort(function (member1, member2) {
				return member2.party_with_votes_pct - member1.party_with_votes_pct
			});

			var ten_percent = Math.round(least.length * .10);

			for (var x = 0; x < ten_percent; x++) {
				this.leastloyal.push(least[x]);
				
			}

		},

		/////// most loyal

		most_loyal: function () {
			var most = Array.from(this.membersArray);
			most.sort(function (member1, member2) {
				return member1.party_with_votes_pct - member2.party_with_votes_pct
			});

			var ten_percent = Math.round(most.length * .10);

			for (var x = 0; x < ten_percent; x++) {
				this.mostloyal.push(most[x]);
			}
		},

	}
});

app.getData()
