<template>
<div class="mdl-card mdl-shadow--2dp md-full-card">
	<loader :show="loading"> </loader>
	<div class="mdl-card__actions mdl-card--border mdl-card-bottom">
		<div class="mdl-cell mdl-cell--12-col">
			<button @click="clickNewApp" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" > New app </button>
			<button @click="clickRefresh" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" > Refresh </button>
			<button @click="clickDelApp" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" > Remove </button>
		</div>
	</div>
	<div class="mdl-cell mdl-cell--12-col">
		<table class="mdl-data-table mdl-js-data-table ml-table-striped  mdl-data-table--selectable mdl-shadow--1dp">
			<thead>
				<tr>
					<th class="mdl-data-table__cell--non-numeric">Name</th>
					<th class="mdl-data-table__cell--non-numeric">Description</th>
					<th class="mdl-data-table__cell--non-numeric">Authorization</th>
					<th class="mdl-data-table__cell--non-numeric">Creation</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="app in gridData"> 
					<td><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="lapp_chk-{{$index}}">
							<input id="lapp_chk-{{$index}}"type="checkbox" class="mdl-checkbox__input" v-model="checks" value="{{ $index }}"/>
						</label>
					</td>
					<td class="mdl-data-table__cell--non-numeric">{{ app.name }}</td>
					<td class="mdl-data-table__cell--non-numeric">{{ app.descr }}</td>
					<td class="mdl-data-table__cell--non-numeric">{{ app.authorization }}</td>
					<td class="mdl-data-table__cell--non-numeric">{{ app.fcreation }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
</template>


<script>
import Loader from './Loader.vue'
import http from '../services/http'

export default {
	components: { 
		Loader 
	},

	ready(){
		this.loadData();
	},

  data () {
    return {
			gridData: [],
			checks: [],
			loading: false,
		};
	},


	methods: {
		loadData(){
			this.checks = [];
			this.loading = true;

			http.get('/app', 
				(res) => {

					this.gridData = this.parseList(res.data);

					setTimeout(() => { 
						componentHandler.upgradeAllRegistered();
						this.loading = false;
					} , 1000);
				},

				(err) => {
					setTimeout(() => { this.loading = false } , 1300);
					console.log(JSON.stringify(err));
				});
		},
		



		clickRefresh(){
			this.loadData();
		},



		clickNewApp(){
			this.$dispatch('clicknewapp');
		},




		clickDelApp(){
			this.checks.forEach((i) => {
				let id = this.gridData[i].clientId;
				http.delete(`/app/${id}`, (res) => {}, (err) => {});
			});

			this.loadData();

			/*this.checks.forEach((i) => {*/
				/*this.gridData.splice(i, 1);*/
			/*});*/
		},




		parseList(data) {
			var r = 0, k = 0;
			var apps = [];

			while(data[r]){
				var app = {};
				while (data[r][1][k]) { 
					var key = data[r][1][k];

					app[key] = data[r][1][++k];
					++k;
				}

				apps.push(app);
				k = 0;
				r++;
			}
			return apps;
		}
	}

}
</script>

<style>
table{
margin-top: 20px;
margin-bottom: 30px;
width: 100%;
}

.mdl-data-table{
border:0 !important;
}
.mdl-data-table td{
border-top: 1px solid rgba(141, 141, 141, 0.12) !important;
border-bottom: 1px solid rgba(141, 141, 141, 0.12) !important;
}

</style>
