<template>
	<div class="home-skeleton">
		<parent height="40vh" width="95.2vw" bmargin="1.2rem" />
		<parent height="2.2rem" width="75vw" bmargin="0.3rem" />
		<parent height="1.5rem" width="50vw" bmargin="0.99rem" />

		<div class="product-scroll">
			<parent height="3rem" width="6rem" />
			<parent height="3rem" width="6rem" />
			<parent height="3rem" width="6rem" />
		</div>
		<parent height="2.2rem" width="75vw" bmargin="0.3rem" />
		<parent height="1.5rem" width="50vw" bmargin="0.99rem" />
		<div class="banner-scroll">
			<parent height="14vh" width="45vw" />
			<parent height="14vh" width="45vw" />
			<parent height="14vh" width="5vw" />
		</div>
		<parent height="2.2rem" width="75vw" bmargin="0.3rem" />
	</div>
</template>

<script setup>
import Parent from "../Parent.vue";
</script>

<style scoped>
.home-skeleton {
	height: 100%;
	width: 100%;
	padding-left: 0.6rem;
	padding-top: 1rem;
}

.product-scroll {
	display: flex;
	gap: 0.5rem;
	margin-bottom: 1.7rem;
}

.banner-scroll {
	display: flex;
	gap: 0.5rem;
	margin-bottom: 1rem;
}
</style>
