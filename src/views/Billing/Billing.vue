<template>
	<div class="container">
		<h1 class="title" v-if="currentLanguage == 'en'">Order Summary</h1>
		<h1 class="title" v-if="currentLanguage == 'ar'">ملخص الطلب</h1>
		<content-items />
		<confirm-button v-if="address.Region && address['House No.'] && address.Email && address.Phone" @click="send_mail"
			confirmroute="/billing/confirmed" cancelroute="/billing" />
		<div class="add-address" v-if="!address.Region && !address.Phone && currentLanguage == 'en'"
			@click="$router.push('/billing/address')" route="/billing">
			Add a New Address to Continue
		</div>
		<div class="add-address" v-if="!address.Region && !address.Phone && currentLanguage == 'ar'"
			@click="$router.push('/billing/address')" route="/billing">
			Add a New Address to Continue
		</div>
	</div>
</template>

<script setup>
import ContentItems from "../../components/View Specific/Billing/Content.vue";
import ConfirmButton from "../../components/Buttons/ConfirmButton.vue"

import { useMainStore } from "../../store/useMainStore";
import { storeToRefs } from "pinia";
import axios from "axios";

const main = useMainStore();
const { address, cartItems, currentLanguage } = storeToRefs(main);

async function send_mail() {
	try {
		const cartItemsJSON = JSON.stringify(cartItems.value)
		const addressJSON = JSON.stringify(address.value)
		const response = await axios.post(`https://api-fnt8.onrender.com/v1/${currentLanguage.value}/billing/reciept/${address.value.Email}/${cartItemsJSON}/${addressJSON}`);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}
</script>

<style scoped>
.container {
	width: 100%;
	padding: 2rem;
	padding-top: 4rem;
}

.title {
	font-size: 1.65rem;
	font-weight: 700;
	font-family: Poppins;
	color: #2a295a;
	margin-bottom: 3.2rem;
}

.add-address {
	border: 0.1rem #C2C2C2 solid;
	height: 4rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: Poppins;
	color: #686868;
	border-radius: 0.5rem;
	margin-top: -0.5rem;
	margin-bottom: 2rem;
}
</style>
