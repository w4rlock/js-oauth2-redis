<template>
	<div class="overlay-spinner center-all" v-show="show">
		<div class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
	</div>
</template>

<script>
export default{
	props: ['show'],

}
</script>

<style>
.overlay-spinner{
position: absolute;
background: rgba(255, 255, 255, 0.86);
width: 100%;
height: 100%;
z-index: 11;
text-align: center;
}

.center-all{
display: flex;
justify-content: center;
align-items: center;
}
</style>
