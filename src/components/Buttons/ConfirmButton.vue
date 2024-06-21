<template>
	<div class="btn-wrapper">
		<div class="cancel-btn" @click="$router.push(props.cancelroute)">
			<h1 v-if="currentLanguage == 'en'" class="btn-text">Cancel</h1>
			<h1 v-if="currentLanguage == 'ar'" class="btn-text">إلغاء</h1>
		</div>

		<div class="confirm-btn" @click="confirmOrder">
			<div class="lds-ring" v-show="isSpinnerActive">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<h1 v-if="currentLanguage == 'en'" v-show="!isSpinnerActive" class="btn-text">Confirm</h1>
			<h1 v-if="currentLanguage == 'ar'" v-show="!isSpinnerActive" class="btn-text">يتأكد</h1>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	confirmroute: { type: String },
	cancelroute: { type: String }
})

import { useMainStore } from "../../store/useMainStore"
import { storeToRefs } from "pinia";
const main = useMainStore()
const { currentLanguage, address, cartItems, } = storeToRefs(main)
const { clearCartItems } = main;

import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { onActivated, ref } from "vue";

let isSpinnerActive = ref(false);
const route = useRoute();
const router = useRouter();

async function confirmOrder() {
	if (route.name == "Billing") {
		try {
			isSpinnerActive.value = true;
			const cartItemsJSON = JSON.stringify(cartItems.value)
			const addressJSON = JSON.stringify(address.value)
			await axios.post(`https://api-uhzv.onrender.com/v1/${currentLanguage.value}/billing/reciept/${address.value.Email}/${cartItemsJSON}/${addressJSON}`)
				.then(() => { router.push('/billing/confirmed') })
			clearCartItems();
		} catch (error) {
			console.error(error);
		}
	}
	else {
		router.push(props.confirmroute)
	}
}

onActivated(() => { isSpinnerActive.value = false })
</script>

<style scoped>
.btn-wrapper {
	display: flex;
	margin-bottom: 5rem;
}

.btn-text {
	font-family: "Poppins";
	font-style: normal;
	font-weight: 600;
	font-size: 0.98rem;
	line-height: 1.688rem;
}

.confirm-btn {
	width: 100%;
	height: 3.2rem;
	border-radius: 0.4rem;
	background-color: #F97A46;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 0.4rem;
	color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
}

.cancel-btn {
	width: 100%;
	height: 3.2rem;
	border-radius: 0.4rem;
	border: 0.1rem #C2C2C2 solid;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 0.4rem;
	color: #898989;
}


.lds-ring,
.lds-ring div {
	box-sizing: border-box;
}

.lds-ring {
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
}

.lds-ring div {
	box-sizing: border-box;
	display: block;
	position: absolute;
	width: 2rem;
	height: 2rem;
	border: 0.2rem solid #fff;
	margin-top: 1.75rem;
	margin-left: 35%;
	border-radius: 50%;
	animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	border-color: #fff transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
	animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
	animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
	animation-delay: -0.15s;
}

@keyframes lds-ring {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>