import Vue from 'vue';

/**
 * Responsible for all HTTP requests.
 */
export default {
    request(method, url, data, doneCb = null, errorCb = null) {
        return Vue.http[method](url, data).then(doneCb, errorCb);
    },

    get(url, doneCb = null, errorCb = null) {
        return this.request('get', url, {}, doneCb, errorCb);
    },

    post(url, data, doneCb = null, errorCb = null) {
        return this.request('post', url, data, doneCb, errorCb);
    },

    put(url, data, doneCb = null, errorCb = null) {
        return this.request('put', url, data, doneCb, errorCb);
    },

    delete(url, data = {}, doneCb = null, errorCb = null) {
        return this.request('delete', url, data, doneCb, errorCb);
    },

    build(method, url, data = {}, beforeSend = null, doneCb = null, errorCb = null) {
        return Vue.http(url, {
						method: method
					, data: data
					, beforeSend: beforeSend
				})
				.then(doneCb, errorCb);
    },

		encode(obj){
			var str = "";
			for (var key in obj) {
				if (str != "") {
						str += "&";
				}
				str += key + "=" + encodeURIComponent(obj[key]);
			}
			return str;
		},

    /**
     * A shortcut method to ping and check if the user session is still valid.
     */
    ping() {
        return this.get('/');
    },
};
