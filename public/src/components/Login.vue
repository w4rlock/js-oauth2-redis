<template>
<div class="mdl-card mdl-shadow--2dp frm-login">
	<loader :show="loading"> </loader>
	<div class="mdl-card__title">
				<h2 class="mdl-card__title-text">Login</h2>
			</div>
	<div class="mdl-cell mdl-cell--12-col">
		<div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
			<form action="#">

				<div id="wrap_mail" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
					<input class="mdl-textfield__input" type="email" id="sample2" v-model="frmModel.username">
					<label class="mdl-textfield__label" for="sample2">Email</label>
				</div>

				<div id="wrap_pass" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
					<input class="mdl-textfield__input" type="password" id="sample3" v-model="frmModel.password">
					<label class="mdl-textfield__label" for="sample3">Password</label>
				</div>

			</form>
		</div>
  </div>

	<div class="mdl-card__actions mdl-card--border mdl-card-bottom">
		<div class="mdl-cell mdl-cell--1-col">
			<button @click="login" class="mdl-button mdl-js-button mdl-button--raised 
			mdl-button--colored mdl-js-ripple-effect"> Login </button>
		</div>
	</div>
</div>
</template>

<script>
import Loader from './Loader.vue'
import http from '../services/http'
import ls from 'local-storage'

export default {
	components: { 
		Loader 
	},


  data () {
    return {
			loading: false,

      frmModel: {
					username: 'developer@rockboxstudios.com'
				, password: '_d3v310p3r_'
				, grant_type: 'password'

			}
    }
  },



	methods:{
		login(){
			this.loading = true;

			http.build('post', '/oauth/token', http.encode(this.frmModel), this.beforeSend,
			(res) => {
					setTimeout(() => {
						ls.set('auth', res.data);
						this.loading = false;
						this.$dispatch('usr_loggedin');
					}, 1300);

			},
			(err) => setTimeout(this.showFailLogin, 1300));
		},


		beforeSend(req){
			req.headers["Content-Type"] = 'application/x-www-form-urlencoded';
		},

		showFailLogin(){
			this.loading = false;
			document.querySelector('#wrap_mail').className+= ' is-invalid';
			document.querySelector('#wrap_pass').className+= ' is-invalid';
		}
	},

}
</script>

<style>
.frm-login{
margin-top: 20px;
width: 600px;
}
</style>
