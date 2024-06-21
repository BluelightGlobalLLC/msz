<template>
	<parent-button>
		<div class="buy-btn">
			<a :href="`https://wa.me/91515555?text=Hey! What's the best price for ${props.name}`">
				<h1 class="btn-text" v-if="currentLanguage == 'en'">Enquire</h1>
			</a>
			<a :href="`https://wa.me/91515555?text=Hey! What's the best price for ${props.name}`">
				<h1 class="btn-text" v-if="currentLanguage == 'ar'">Enquire</h1>
			</a>
		</div>

		<div v-if="currentLanguage == 'en'" class="atc-btn" @click="addToCart(props.id)">
			<h1 class="btn-text">{{ cartText }}</h1>
		</div>
		<div v-if="currentLanguage == 'ar'" class="atc-btn" @click="addToCartAr(props.id)">
			<h1 class="btn-text">{{ cartTextAr }}</h1>
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
	name: { type: String },
	color: { type: String }
})

const main = useMainStore()
const { togglePopupState, addCartItem } = main
const { isVibrationsEnabled, currentLanguage } = storeToRefs(main)

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

let cartTextAr = ref("إضافة إلى السلة")
async function addToCartAr(productId) {
	if (cartText.value != "تمت إضافة هذا البند إلى عربة التسوق") {
		cartText.value = "تمت إضافة هذا البند إلى عربة التسوق"
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
	background-color: #48A9DD;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 0.4rem;
}

.atc-btn {
	width: 100%;
	height: 3.2rem;
	border-radius: 0.4rem;
	background-color: #0D385E;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 0.4rem;
}
</style>
