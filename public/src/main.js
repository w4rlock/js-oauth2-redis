import _ from 'lodash'
import Vue from 'vue'
import VueRes from 'vue-resource'
import App from './App.vue'
import ls from 'local-storage'

Vue.use(VueRes);
Vue.http.interceptors.push(function () {
	return {
			request(req) {
					if (req.url == '/oauth/token'){
						let tk = 'MTU4N2I3OTBmZGIzMDRmNTk1NjA1ZTczM2RiYzdkNTU6OGFiN2I2Y2U1MmFmYTIxODBkMjIxMDY0ZWI4NDAxMjM=';
						req.headers['Authorization'] = 'Basic ' + tk;
					}
					else{
						const auth = ls.get('auth');
						if (auth && auth.access_token){
							req.headers['Authorization'] = 'Bearer ' + auth.access_token;
						}
					
					}
					return req;
			},

			response(res) {
					return res;
			}
	};
});


/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
