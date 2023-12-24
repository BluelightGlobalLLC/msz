<template>
	<div class="banner-wrapper" :style="{ 'margin-bottom': props.rem + 'rem' }">
		<div class="texts">
			<h1 class="banner-heading" :style="{ color: props.headingColor }">{{ props.heading }}</h1>
			<h1 class="banner-subheading" :style="{ color: props.subheadingColor }">{{ props.subheading }}</h1>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	rem: { type: Number, default: 2 },
	heading: { type: String },
	subheading: { type: String },
	headingColor: { type: String },
	subheadingColor: { type: String },
});
</script>

<style scoped>
.banner-wrapper {
	padding: 0rem 0.8rem;
	display: flex;
	align-items: center;
	width: 100%;
	font-family: Poppins;
}

.banner-img {
	max-height: 2.5rem;
	max-width: 2.5rem;
	margin-right: 0.8rem;
}

.texts {
	display: flex;
	flex-direction: column;
}

.banner-heading {
	font-weight: 700;
	font-size: 0.897rem;
	line-height: 1.3rem;
}

.banner-subheading {
	font-weight: 600;
	font-size: 0.69rem;
}
</style>
