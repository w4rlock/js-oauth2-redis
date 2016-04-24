<template>
<div class="mdl-card mdl-shadow--2dp md-full-card">
	<loader :show="loading"> </loader>
	<div class="mdl-card__title">
				<h2 class="mdl-card__title-text">Sign Up</h2>
			</div>
	<div class="mdl-cell mdl-cell--12-col">
		<div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
			<form action="#">

				<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
					<input class="mdl-textfield__input" type="text" id="sample1" v-model="frmModel.name">
					<label class="mdl-textfield__label" for="sample1">Name</label>
					<span class="mdl-textfield__error">Only alphabet and no spaces, please!</span>

				</div>

				<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
					<input class="mdl-textfield__input" type="email" id="sample2" v-model="frmModel.email">
					<label class="mdl-textfield__label" for="sample2">Email</label>
				</div>

				<div id="wrap_pass" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
					<input class="mdl-textfield__input" type="password" id="sample3" v-model="password">
					<label class="mdl-textfield__label" for="sample3">Password</label>
				</div>

				<div id="wrap_repass" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
					<input class="mdl-textfield__input" type="password" id="sample3" v-model="repassword">
					<label class="mdl-textfield__label" for="sample3">Confirm Password</label>
				</div>

			</form>
		</div>
  </div>
	<div class="mdl-card__actions mdl-card--border" v-show="frmModel.oauthCode">
		<h4>Authorization:</h4>
		<span>{{ frmModel.oauthCode }}</span>
	</div>
	<div class="mdl-card__actions mdl-card--border mdl-card-bottom">
		<div class="mdl-cell mdl-cell--5-col">
			<button @click="clickRegister" class="mdl-button mdl-js-button mdl-button--raised 
			mdl-button--colored mdl-js-ripple-effect"> Register </button>
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
			password: null,
			repassword: null,

			frmModel: { 
				name:null,
			  email:null
			}

		}
  },



	ready(){
		this.$watch('password', this.checkPassword);
		this.$watch('repassword', this.checkPassword);
	},



	/*Form Events*/
	methods: {

		checkPassword(val){
			if(this.password != this.repassword){
				this.showFailPass();
			}
			else{
				this.clearFail();
			}
		},



		clickCancel(){
			this.$dispatch('click-cancel');
		},



		clickRegister(){
			this.loading = true;
			this.frmModel.password = this.password;

			http.post('/usr/signup', this.frmModel, (res) => {
					setTimeout(() => this.loading = false, 1500);
					//this.frmModel.oauthCode = res.data.authcode;
					alert(res.data.authcode);
				}, (err) => {
					setTimeout(() => this.loading = false, 1500);
				});

		},

		
		
		showFailPass(){
			document.querySelector('#wrap_pass').className+= ' is-invalid';
			document.querySelector('#wrap_repass').className+= ' is-invalid';
		},



		clearFail(){
			document.querySelector('#wrap_pass').className = 
			document.querySelector('#wrap_pass').className.replace(/is-invalid/g, '');

			document.querySelector('#wrap_repass').className = 
			document.querySelector('#wrap_repass').className.replace(/is-invalid/g,'');
		}
	}


}
</script>


<style>

</style>
