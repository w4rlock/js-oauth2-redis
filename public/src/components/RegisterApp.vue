<template>
<div class="mdl-card mdl-shadow--2dp md-full-card">
	<loader :show="loading"> </loader>
	<div class="mdl-card__title">
		<h2 class="mdl-card__title-text">Register App</h2>
	</div>
	<div class="mdl-cell mdl-cell--12-col">
		<div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
			<form action="#">
				<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
					<input class="mdl-textfield__input" type="text" id="sample3" v-model="frmModel.name">
					<label class="mdl-textfield__label" for="sample3">Name</label>
				</div>

				<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
					<input class="mdl-textfield__input" type="text" id="sample3" v-model="frmModel.description">
					<label class="mdl-textfield__label" for="sample3">Description</label>
				</div>

				<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-2">
					<input type="checkbox" id="checkbox-2" class="mdl-checkbox__input" v-model="frmModel.platform" value="web">
					<span class="mdl-checkbox__label">Web App</span>
				</label>

				<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-1">
					<input type="checkbox" id="checkbox-1" class="mdl-checkbox__input" v-model="frmModel.platform" value="mobile">
					<span class="mdl-checkbox__label">Mobile App</span>
				</label>

			</form>
		</div>
  </div>
	<div class="mdl-card__actions mdl-card--border" v-show="frmModel.oauthCode">
		<h4>Authorization:</h4>
		<span>{{ frmModel.oauthCode }}</span>
	</div>
	<div class="mdl-card__actions mdl-card--border mdl-card-bottom">
		<div class="mdl-cell mdl-cell--5-col">
			<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
			@click="clickRegister"
			> Register </button>
			<button @click="clickCancel" class="mdl-button mdl-js-button dl-js-ripple-effect"> Cancel </button>
		</div>
	</div>
</div>
</template>

<script>
import http from '../services/http'
import Loader from './Loader.vue'


export default {
	components: {
		Loader
	},


  data () {

    return {
			loading: false,
			frmModel: { 
				name:null,
			  platform:[],
				oauthCode: null,
			  description:null,
			  redirectURL:null 
			}

		}
  },


	/*Form Events*/
	methods: {
		clickCancel(){
			this.$dispatch('clickcancel');
		},

		clickRegister(){
			this.loading = true;	
			
			http.post('/app', this.frmModel,
				(res) => {
					setTimeout(() => this.loading = false, 1500);
					this.frmModel.oauthCode = res.data.authcode;
				}, 

				(err) => {
					setTimeout(() => this.loading = false, 1500);
					if (err.data.err_description.indexOf('ERR_CLI_EXIST')){

					}
				});

		}
	}
}
</script>


<style>

</style>
