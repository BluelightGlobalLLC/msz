<template>
	<parent-button>
		<div class="buy-btn" @click="addToCart(props.id); $router.push('/cart');">
			<h1 class="btn-text">Buy now</h1>
		</div>

		<div class="atc-btn" @click="addToCart(props.id)">
			<h1 class="btn-text">{{ cartText }}</h1>
		</div>
	</parent-button>
</template>

<script setup>
import ParentButton from "./ParentButton.vue"
import { ref } from "vue"
import { useMainStore } from "../../store/useMainStore"
import { storeToRefs } from "pinia";
import { Haptics } from '@capacitor/haptics';


const props = defineProps({
	id: { type: String },
	color: { type: String }
})

const main = useMainStore()
const { togglePopupState, addCartItem } = main
const { isVibrationsEnabled } = storeToRefs(main)

let cartText = ref("Add to cart")
async function addToCart(productId) {
	if (cartText.value != "Added to Cart!") {
		cartText.value = "Added to Cart!"
		togglePopupState(true)
		addCartItem([productId, props.color])
		if (isVibrationsEnabled.value === true) {
			await Haptics.vibrate();
		}
	}
}
</script>

<style scoped>
.btn-text {
	font-family: "Poppins";
	font-style: normal;
	font-weight: 500;
	font-size: 0.98rem;
	line-height: 1.688rem;
	color: #ffffff;
}

.buy-btn {
	width: 60%;
	height: 3.2rem;
	border-radius: 0.4rem;
	background-color: #f9b146;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 0.4rem;
}

.atc-btn {
	width: 100%;
	height: 3.2rem;
	border-radius: 0.4rem;
	background-color: #f97a46;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 0.4rem;
}
</style>
