<template>
  <div id="app" v-show="isAuthenticated">
    <header-tabs></header-tabs>
  </div>

	<div class="center-all" v-else>
		<login></login>
  </div>

	<div v-else>
</template>

<script>
import HeaderTabs from './components/HeaderTabs.vue'
import Login from './components/Login.vue'
import ls from 'local-storage'



export default {
  components: {
		HeaderTabs,
		Login
  },

	ready(){
		let auth = ls.get('auth');
		if (auth && auth.access_token){
			this.isAuthenticated = true;
		}
	},


	data(){
		return {
			isAuthenticated: false

		};

	},


	methods:{


	},


	events:{
		usr_loggedin() {
			this.isAuthenticated = true;
		},

	}

}
</script>

<style>
body {
font-family: Helvetica, sans-serif;
background: #e9eaed;
}

.mdl-card-bottom {
background: #EFEFEF;
}

.page-content{
margin: 30px;
}

.md-full-card{
width: 100%;
}

.mdl-card__title{
background: rgb(247, 247, 247);
}

.center-all{
display: flex;
justify-content: center;
align-items: center;
}

</style>
