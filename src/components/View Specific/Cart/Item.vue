<template>
	<div v-if="data" class="cart-item-wrapper" @click.self="$router.push('/product/' + props.item[0])">
		<div class="c-header">
			<div class="prod-img">
				<img :src="data.productThumbnail" class="prod-img-src"
					@click.self="$router.push('/product/' + props.item[0])" />
			</div>
			<div class="title-wrapper">
				<h1 @click.self="$router.push('/product/' + props.item[0])">{{ data.productName }} {{ props.item[1] }}
				</h1>
				<h1 class="price">
					<span class="omr">OMR </span>{{ data.currentPrice }}
					<span class="details">VAT inclusive</span>
				</h1>
			</div>
			<div class="delete-button" @click="removeItem(props.item)">
				<h1>×</h1>
			</div>
		</div>
		<div class="c-body">
			<div v-for="specification in data.specifications" :key="specification" class="spec-tag">
				{{ specification[0] }}
			</div>
		</div>
		<!-- set v-show to true to enable addon-->
		<div v-show="false" class="addon">
			<input type="checkbox" />
			<h3>
				Secure your device and never fear paying unexpected costs with our trademark
				<span style="font-weight: 700; color: #2c9d04">Smartcare Plus</span>. Get full device protection with
				free replacements and software warranty for upto two years at just OMR 35.
			</h3>
		</div>
	</div>
</template>

<script setup>
import { useMainStore } from "../../../store/useMainStore";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import axios from "axios";

const main = useMainStore();
const { cartItems, currentLanguage } = storeToRefs(main);
const { removeCartItem, generateBilling } = main;

const props = defineProps({
	rem: { type: Number, default: 2 },
	item: { type: Array },
});

// remove product from store and localList
const itemIDs = ref(cartItems.value);
function removeItem(itemID) {
	itemIDs.value = itemIDs.value.filter((item) => item !== itemID); // remove from local list for animation
	removeCartItem(itemID); // remove from Store
}

// get data from API
const data = ref(null);
async function getCartItemData() {
	try {
		const response = await axios.get(`https://api-uhzv.onrender.com/v1/${currentLanguage.value}/cart/item/${props.item[0]}`);
		data.value = response.data;
		generateBilling("items", [data.value.productName, data.value.currentPrice, props.item[1], props.item[0]])
	} catch (error) {
		console.error(error);
	}
}
onMounted(() => getCartItemData());


</script>

<style scoped>
.delete-button {
	height: 1.5rem;
	width: 1.5rem;
	background-color: rgb(253, 220, 220);
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: Poppins;
	font-weight: 400;
	border-radius: 0.3rem;
	color: rgb(212, 3, 3);
	margin-top: 0.3rem;
}

.cart-item-wrapper {
	height: max-content;
	width: 94vw;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	padding-top: 1rem;
}

.c-header {
	display: flex;
}

.prod-img {
	height: inherit;
	width: 4rem;
	background: rgb(245, 245, 245);
	margin-right: 0.9rem;
	border-radius: 0.3rem;
	display: flex;
	justify-content: center;
	align-items: center;
}

.prod-img-src {
	width: 2rem;
	height: auto;
}

.title-wrapper {
	color: rgb(68, 67, 67);
	font-family: Poppins;
	font-size: 1rem;
	font-weight: 600;
	width: calc(100% - 4rem - 20vw);
	margin-right: 15vw;
	line-height: 1.4rem;
}

.amount {
	margin-top: 0.2rem;
	height: 1rem;
	width: max-content;
	padding: 0.7rem 0.5rem 0.7rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(253, 138, 31);
	font-size: 0.8rem;
	border-radius: 0.2rem;
	color: #fff;
	margin-bottom: 0.8rem;
	margin-top: 0.2rem;
}

.c-body {
	margin-top: 0.5rem;
	display: flex;
	overflow-x: visible;
	max-width: 100%;
	gap: 0.3rem;
	overflow-x: auto;
	overflow-y: hidden;
}

.spec-tag {
	background-color: rgb(235, 235, 235);
	height: max-content;
	width: max-content;
	white-space: nowrap;
	font-family: Poppins;
	font-size: 0.7rem;
	padding: 0.2rem 0.4rem 0.2rem;
	border-radius: 0.2rem;
	color: rgb(88, 88, 88);
	margin-bottom: 0.5rem;
}

.spec-tag::-webkit-scrollbar {
	display: none !important;
}

.addon {
	width: 100%;
	height: max-content;
	background-color: #f5f5f5;
	color: #424242;
	font-family: Poppins;
	font-size: 0.8rem;
	line-height: 1.25rem;
	padding-right: 5rem;
	padding-left: 0.8rem;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	display: flex;
	margin-bottom: 1rem;
}

input {
	min-height: 1.5rem;
	min-width: 1.5rem;
	margin-right: 0.8rem;
}

.details {
	font-family: Poppins;
	font-weight: 400;
	font-size: 0.7rem;
	line-height: 1rem;
	color: #515151;
}

.price {
	margin-top: 1rem;
	font-family: Poppins;
	font-weight: 600;
	font-size: 1.125rem;
	line-height: 1rem;
	color: #2b2b2f;
}

.omr {
	font-size: 0.625rem;
}
</style>
