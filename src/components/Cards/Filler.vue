<template>
	<!--TODO check this on smaller devices to confirm whether products stay in two columns or not-->
	<div @click="$router.push('/product/' + props.data.productId)">
		<div class="img-container">
			<img :src="props.data.productThumbnail" />
		</div>
		<h1 class="product-name">{{ props.data.productName }}</h1>
		<div class="prices">
			<h1 class="price">{{ props.data.currentPrice }}</h1>
			<h1 v-if="props.data.oldPrice" class="old-price">{{ props.data.oldPrice }}</h1>
		</div>
		<div class="tags">
			<div v-if="parseInt(props.data.currentPrice) > 190" class="tag">FREE SHIPPING</div>
			<div v-if="props.data.availability" class="tag">LIMITED</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	data: { type: Object },
});
</script>

<style scoped>
.img-container {
	width: 100%;
	display: flex;
	justify-content: center;
	background-color: #fff;
	padding-top: 0.9rem;
	padding-bottom: 0.5rem;
}

.img-container img {
	height: 8rem;
	width: auto;
	max-width: 11rem;
}

.product-name {
	margin-top: 0.3rem;
	margin-bottom: 0.5rem;
	font-size: 0.8rem;
	font-weight: 500;
	color: #474749;
	line-height: 1rem;
}

.prices {
	margin-top: 0.5rem;
	display: flex;
	align-items: flex-end;
	margin-bottom: 0.7rem;
}

.price {
	font-weight: 600;
	font-size: 3.7vw;
	margin-right: 0.2rem;
}

.old-price {
	font-weight: 500;
	font-size: 2.7vw;
	color: rgb(145, 145, 145);
	text-decoration: line-through;
}

.tags {
	display: flex;
	gap: 0.2rem;
	margin-top: 0.3rem;
}

.tag {
	height: max-content;
	width: max-content;
	background-color: #bc7cd6;
	padding: 0.2rem 0.4rem 0.2rem;
	text-align: center;
	font-size: 2.3vw;
	font-weight: 500;
	border-radius: 0.2rem;
	color: #fff;
}
</style>
