<template>
<loader :show="loading"> </loader>
<table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
  <thead>
    <tr>
      <th class="mdl-data-table__cell--non-numeric">Name</th>
      <th class="mdl-data-table__cell--non-numeric">Description</th>
      <th class="mdl-data-table__cell--non-numeric">Authorization</th>
      <th class="mdl-data-table__cell--non-numeric">Creation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="mdl-data-table__cell--non-numeric">Name</td>
      <td>25</td>
      <td>$2.90</td>
    </tr>
    <tr>
      <td class="mdl-data-table__cell--non-numeric">Description</td>
      <td>25</td>
      <td>$2.90</td>
    </tr>
    <tr>
      <td class="mdl-data-table__cell--non-numeric">Authorization</td>
      <td>50</td>
      <td>$1.25</td>
    </tr>
    <tr>
      <td class="mdl-data-table__cell--non-numeric">Creation</td>
      <td>10</td>
      <td>$2.35</td>
    </tr>
  </tbody>
</table>
</template>


<script>
import Loader from './Loader.vue'
import http from '../services/http'

export default {
	components: { 
		Loader 
	},

	ready(){
/*
 *    http.get('/app', 
 *      (res) => {
 *        console.log(JSON.stringify(res.data));
 *
 *      },
 *
 *      (err) => {
 *        console.log(JSON.stringify(err));
 *
 *      });
 *
 */
	},

  data () {
    return {
			loading: false,
		};
	}

}
</script>

<style>

</style>
