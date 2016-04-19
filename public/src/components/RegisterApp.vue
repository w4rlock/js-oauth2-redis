<template>
<div class="mdl-card mdl-shadow--2dp md-full-card">
	<div class="mdl-card__title">
				<h2 class="mdl-card__title-text">Register New App</h2>
			</div>
	<div class="mdl-cell mdl-cell--12-col">
		<div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
			<form action="#">
				<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
					<input class="mdl-textfield__input" type="text" id="sample3">
					<label class="mdl-textfield__label" for="sample3">Name</label>
				</div>

				<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
					<input class="mdl-textfield__input" type="text" id="sample3">
					<label class="mdl-textfield__label" for="sample3">Description</label>
				</div>

				<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-2">
					<input type="checkbox" id="checkbox-2" class="mdl-checkbox__input">
					<span class="mdl-checkbox__label">Web App</span>
				</label>

				<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-1">
					<input type="checkbox" id="checkbox-1" class="mdl-checkbox__input">
					<span class="mdl-checkbox__label">Mobile App</span>
				</label>



			</form>
		</div>
  </div>
		<div class="mdl-card__actions mdl-card--border">
			<div class="mdl-cell mdl-cell--1-col">
				<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"> Register </button>
			</div>
	</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      // Note: modifying `msg` below will not cause changes to occur with
      // hot-reload. As reloaded components preserve their initial state,
      // modifying these values will have no effect.
      oomsg: 'Hello World!'
    }
  }
}
</script>


<style>
.md-full-card{
width: 90%;
margin: 50px;
}
.mdl-card__title{
background: rgb(247, 247, 247);
}

</style>
