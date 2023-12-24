<template>
	<parent-popup>
		<h2>Item added to Cart</h2>
		<img src="../../assets/Popups/conf.gif" class="confetti" />
	</parent-popup>
</template>

<script setup>
import ParentPopup from "./ParentPopup.vue";
</script>

<style scoped>
.confetti {
	max-height: 2rem;
	max-width: 2rem;
	min-height: 2rem;
	min-width: 2rem;
	margin-top: -0.5rem;
	margin-left: 0.3rem;
}
</style>
