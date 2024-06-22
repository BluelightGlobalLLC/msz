<template>
	<div class="wrapper">
		<div class="padded">
			<div class="stock-availability"
				:style="[props.data.availability.includes('Limited') ? { color: '#cc2e20' } : { color: '#24cc20' }]">
				{{ props.data.availability }}
			</div>
			<h1 class="product-name">{{ props.data.productName }}</h1>
			<div class="basic-info">
				<div class="rating">
					<img v-for="star in Math.round(props.data.rating)" :key="star" class="ratings-icon"
						src="../../../assets/ViewProduct/star.png" />
					<h3 class="rating-score">{{ props.data.rating.toFixed(1) }}</h3>
				</div>
			</div>
			<h3 v-if="props.data.oldPrice" class="old-price">OMR {{ props.data.oldPrice }}</h3>
			<h1 class="new-price">
				<span class="currency">OMR </span>{{ props.data.currentPrice }}<span class="tax"> VAT Inclusive</span>
			</h1>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	data: { type: Object },
});
</script>

<style scoped>
.wrapper {
	display: flex;
	flex-direction: column;
	text-align: start;
	align-content: start;
	margin-top: 1.188rem;
	font-family: Poppins;
	height: 100%;
	width: 100%;
}

.padded {
	padding-left: 0.8rem;
	padding-right: 0.8rem;
}

.product-name {
	font-size: 1.25rem;
	font-weight: 600;
	color: #454545;
	margin-right: 1vw;
	line-height: 1.688rem;
	margin-bottom: 0.37rem;
}

.basic-info {
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
}

.basic-info div {
	display: flex;
	align-items: center;
}

.rating-score {
	font-size: 0.75rem;
	font-weight: 500;
	color: #656565;
	margin-left: 0.25rem;
	margin-right: 0.25rem;
}

.ratings-icon {
	height: 0.9rem;
	width: 0.9rem;
	margin-top: -0.1rem;
}

.stock-availability {
	font-weight: 400;
	font-size: 0.625rem;
	margin-bottom: 0.2rem;
}

.new-price {
	font-size: 1.5rem;
	font-weight: 600;
	color: #2b2b2f;
	margin-bottom: 1.5rem;
}

.old-price {
	font-size: 0.8rem;
	color: #454545;
	text-decoration: line-through;
	font-weight: 500;
	margin-bottom: 0.1rem;
}

.subheading {
	font-size: 1rem;
	font-weight: 600;
	color: #2b2b2f;
	margin-top: 0.625rem;
	line-height: 1.688rem;
	margin-bottom: 0.75rem;
}

.currency {
	font-size: 1rem;
	color: #2b2b2f;
}

.tax {
	font-size: 0.8rem;
	font-weight: 400;
	color: #7c7c7c;
}
</style>
