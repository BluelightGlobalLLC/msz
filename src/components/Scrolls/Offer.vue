<template>
	<div :style="{ 'margin-bottom': props.rem + 'rem' }">
		<h1 class="subheading">Save more with us 🥳</h1>
		<div class="scroll-container">
			<div class="initial-scroll-padding"></div>
			<div v-for="banner in 3" :key="banner">
				<div class="banner-item scroll-item" style="background-image: url('https://i.imgur.com/EbMRQL4.png')"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	rem: { type: Number, default: 2 },
});
</script>

<style scoped>
.scroll-container {
	scroll-padding: 3rem;
	display: flex;
	scroll-snap-points-x: repeat(300px);
	scroll-snap-type: x mandatory;
	overflow-y: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;
	scroll-behavior: smooth;
}

/* To hide scrollbar in Chromium */
.scroll-container::-webkit-scrollbar {
	display: none;
}

.initial-scroll-padding {
	padding: 0.3rem;
	scroll-snap-align: start;
}

.scroll-item {
	scroll-snap-align: start;
	scroll-snap-stop: always;
	margin-right: 0.6rem;
	background-color: #ececec;
}

.banner-item {
	width: 16.813rem;
	height: 8.938rem;
	border-radius: 0.75rem;
	background-size: cover;
}

.subheading {
	font-size: 1rem;
	font-weight: 600;
	color: #2b2b2f;
	margin-top: 0.625rem;
	line-height: 1.688rem;
	margin-bottom: 0.75rem;
	font-family: Poppins;
	margin-left: 0.8rem;
}
</style>
