<template>
<!-- Simple header with fixed tabs. -->
<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header
            mdl-layout--fixed-tabs">
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <!-- Title -->
      <span class="mdl-layout-title">OAuth2 Server </span>
    </div>
    <!-- Tabs -->
    <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
      <a href="#fixed-tab-1" class="mdl-layout__tab is-active">App </a>
      <a href="#fixed-tab-2" class="mdl-layout__tab"> Users</a>
      <a href="#fixed-tab-3" class="mdl-layout__tab">Tab 3</a>
    </div>
  </header>
  <div class="mdl-layout__drawer">
    <span class="mdl-layout-title">Title</span>
  </div>
  <main class="mdl-layout__content">
    <section class="mdl-layout__tab-panel is-active" id="fixed-tab-1">
      <div class="page-content">

				<register-app 
					v-show="showNewAppForm"
					v-on:clickcancel="clickcancel">
			  </register-app>

				<list-app 
					v-show="!showNewAppForm" 
					v-on:clicknewapp="clicknewapp"> 
				</list-app>

			</div>
    </section>

    <section class="mdl-layout__tab-panel" id="fixed-tab-2">
      <div class="page-content">
				<register-user> </register-user>

			</div>
    </section>

    <section class="mdl-layout__tab-panel" id="fixed-tab-3">
      <div class="page-content">

			</div>
    </section>

  </main>
</div>


</template>

<script>

import RegisterApp from './RegisterApp.vue'
import RegisterUser from './RegisterUser.vue'
import ListApp from './ListApp.vue'

export default {
  components: {
		RegisterUser,
		RegisterApp,
		ListApp
  },

  data () {
    return {
      // Note: modifying `msg` below will not cause changes to occur with
      // hot-reload. As reloaded components preserve their initial state,
      // modifying these values will have no effect.
			showNewAppForm: false
    }
  },

	methods: {
		clicknewapp(ev){
			this.showNewAppForm = true;
		},
		clickcancel(ev){
			console.log('Banned: ' );
			this.showNewAppForm = false;
		}
	}
	

}
</script>

