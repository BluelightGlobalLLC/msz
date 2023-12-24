<template>
	<div class="wrapper-cart">
		<div class="content">
			<div class="image-wrapper"><img src="../../assets/ViewCart/cart.png" class="image" /></div>
			<h1 class="title">{{ props.feature[0] }}</h1>
			<span class="text">
				<h1>{{ props.feature[1] }}</h1>
			</span>
			<div class="shop-button" @click="$router.push('/home')">Shop Now</div>
			<div class="line"></div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	"feature": { type: Array, default: () => ["Oops! Your cart is empty!", "Looks like you haven't added anything to your cart yet"] }
})
</script>

<style scoped>
.wrapper-cart {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: Poppins;
}

.image {
	width: auto;
	height: 25vh;
	margin-top: 2rem;
}

.shop-button {
	height: max-content;
	width: max-content;
	padding: 0.8rem 2rem;
	background-color: rgb(255, 149, 28);
	font-weight: 500;
	border-radius: 0.3rem;
	color: rgb(255, 255, 255);
	z-index: 10;
	margin-bottom: 1rem;
	font-size: 0.9rem;
}

.title {
	font-weight: 700;
	color: #f97a46;
	margin-bottom: 0.3rem;
	font-size: 1.3rem;
	line-height: 1.8rem;
}

.text {
	text-align: center;
	margin-bottom: 1.4rem;
}

.text h1 {
	z-index: 10;
	font-weight: 400;
	font-size: 0.8rem;
	color: rgb(114, 114, 114);
	line-height: 1.3rem;
}

.line {
	height: 0.2rem;
	width: calc(100% - 1rem);
	margin-left: 0.8rem;
	margin-right: 0.8rem;
	border-radius: 0.2rem;
	background-color: #f5f5f8;
	margin-bottom: 2rem;
}

.curve {
	height: 12rem;
	width: 100%;
	background-color: #dbe8ec;
	border-radius: 0 0 30% 30%;
}

.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	width: 100%;
	background-color: #fff;
}
</style>
