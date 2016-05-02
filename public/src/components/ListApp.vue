<template lang='jade'>
  .mdl-card.mdl-shadow--2dp.md-full-card
    loader(:show='loading')
    mdl-card__actions.mdl-card--border.mdl-card-bottom
      mdl-cell.mdl-cell--12-col
        button.mdl-button.mdl-js-button.mdl-button--raised.mdl-button--colored.mdl-js-ripple-effect(@click='clickNewApp')
          i.material-icons add

        button.mdl-button.mdl-js-button.mdl-button--raised.mdl-button--colored.mdl-js-ripple-effect(@click='clickRefresh')
          i.material-icons refresh

        button.mdl-button.mdl-js-button.mdl-button--raised.mdl-button--colored.mdl-js-ripple-effect(@click='clickDelApp')
          i.material-icons delete

    mdl-cell.mdl-cell--12-col
      table.mdl-data-table.mdl-js-data-table.ml-table-striped.mdl-shadow--1dp
        thead
          tr
            th.mdl-data-table__cell--non-numeric 
            th.mdl-data-table__cell--non-numeric Name
            th.mdl-data-table__cell--non-numeric Description
            th.mdl-data-table__cell--non-numeric Authorization
            th.mdl-data-table__cell--non-numeric Creation
        tbody
          tr(v-for='app in gridData')
            td
              label.mdl-checkbox.mdl-js-checkbox.mdl-js-ripple-effect(for='lapp_chk-{{$index}}')
                <input class="mdl-checkbox__input" id="#lapp_chk-{{$index}}" type='checkbox' v-model='checks' value='{{ $index }}'>
                </input>
            td.mdl-data-table__cell--non-numeric {{ app.name }}
            td.mdl-data-table__cell--non-numeric {{ app.descr }}
            td.mdl-data-table__cell--non-numeric {{ app.authorization }}
            td.mdl-data-table__cell--non-numeric {{ app.fcreation }}
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

<style lang='stylus'>
table
  margin-top: 20px;
  margin-bottom: 30px;
  width: 100%;

.mdl-data-table
  border:0 !important;

.mdl-data-table td
  border-top: 1px solid rgba(141, 141, 141, 0.12) !important;
  border-bottom: 1px solid rgba(141, 141, 141, 0.12) !important;

.mdl-button
  margin 3px
  min-width 50px

</style>
