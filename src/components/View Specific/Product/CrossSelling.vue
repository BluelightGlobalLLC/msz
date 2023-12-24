<template>
	<div class="crossselling-wrapper" :style="{ 'margin-bottom': props.rem + 'rem' }">
		<h1 class="cs-title">Bundle up and save more</h1>

		<div v-for="item in 2" :key="item" class="cs-item">
			<input type="checkbox" />
			<div class="item-box">
				<div class="box-left">
					<img src="https://img.joomcdn.net/11428fff2680a3c6f9902e2c70639b09e752520c_original.jpeg" alt="img"
						class="cs-image" />
					<div class="cs-text">
						<h1 class="cs-name">Silicon Back Cover</h1>
						<h1 class="cs-cost">OMR 1.50</h1>
					</div>
				</div>
				<div class="box-right">
					<div class="cs-offer">14% OFF</div>
				</div>
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
.crossselling-wrapper {
	height: max-content;
	padding-bottom: 1rem;
	width: 100%;
	background: linear-gradient(180deg, #ffffff -2.81%, #e8e8e8 47.52%, #ffffff 100%);
	font-family: Poppins;
	padding-left: 0.8rem;
	padding-right: 0.8rem;
}

.cs-title {
	font-weight: 600;
	margin-bottom: 1.2rem;
}

.cs-item {
	display: flex;
	margin-bottom: 0.7rem;
}

.item-box {
	height: 5.2rem;
	width: 98%;
	border-radius: 0.3rem;
	background-color: #fff;
	padding: 0.5rem;
	display: flex;
	justify-content: space-between;
}

.box-left {
	display: flex;
}

.cs-offer {
	height: max-content;
	width: max-content;
	padding: 0.2rem 0.4rem 0.2rem 0.4rem;
	background-color: #ff8080;
	font-size: 0.8rem;
	color: #ffffff;
	font-weight: 600;
	border-radius: 0.2rem;
}

input {
	min-height: 1.5rem;
	min-width: 1.5rem;
	margin-right: 0.6rem;
}

.cs-image {
	height: 100%;
	width: 4rem;
	margin-right: 0.5rem;
}

.cs-text {
	display: flex;
	flex-direction: column;
	line-height: 1.2rem;
	font-weight: 600;
	margin-top: 1rem;
}

.cs-name {
	font-size: 0.92rem;
}

.cs-cost {
	font-size: 0.82rem;
	color: #6a6a6a;
}
</style>
