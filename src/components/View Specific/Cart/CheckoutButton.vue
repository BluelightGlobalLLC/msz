<template>
	<span v-if="data">
		<div v-show="data" class="checkout-btn-wrapper">
			<parent-button class="parent-btn" :class="{ expandParent: showPriceBreakdown }">
				<div class="checkout-wrapper">
					<div class="price-summary">
						<div class="amount-title" v-if="currentLanguage == 'en'">Total Amount <span
								class="small-text">VAT
								Inclusive</span></div>
						<div class="amount-title" v-if="currentLanguage == 'ar'">الاجمالي المستحق <span
								class="small-text">شامل ضريبة القيمة المضافة</span></div>
						<div class="amount-wrapper">
							<h1 class="amount" v-if="currentLanguage == 'en'">OMR {{ data.totalAmount.toFixed(2) }}</h1>
							<h1 class="amount" v-if="currentLanguage == 'ar'">رع {{ data.totalAmount.toFixed(2) }}</h1>
							<img class="expand-btn"
								:class="{ rotateArrowUp: showPriceBreakdown, rotateArrowDown: !showPriceBreakdown }"
								src="../../../assets/Arrows/expand.png"
								@click="showPriceBreakdown = !showPriceBreakdown" />
						</div>
					</div>
					<div class="price-breakdown-wrapper">
						<div class="breakdowns">
							<div class="breakdown" v-if="currentLanguage == 'en'">
								<h1 class="breakdown-title">Subtotal</h1>
								<h1 class="breakdown-value">RO {{ data.subtotalAmount.toFixed(2) }}</h1>
							</div>
							<div class="breakdown" v-if="currentLanguage == 'en'">
								<h1 class="breakdown-title">Shipping Fee</h1>
								<h1 class="breakdown-value">
									{{
		data.shippingAmount == "Free"
			? data.shippingAmount
			: "RO " + data.shippingAmount
	}}
								</h1>
							</div>
							<div class="breakdown" v-if="currentLanguage == 'ar'">
								<h1 class="breakdown-title">المجموع الفرعي</h1>
								<h1 class="breakdown-value">رع {{ data.subtotalAmount.toFixed(2) }}</h1>
							</div>
							<div class="breakdown" v-if="currentLanguage == 'ar'">
								<h1 class="breakdown-title">مصاريف الشحن</h1>
								<h1 class="breakdown-value">
									{{
		data.shippingAmount == "حر / Free"
			? data.shippingAmount
			: "رع " + data.shippingAmount
	}}
								</h1>
							</div>
							<div class="breakdown" v-if="currentLanguage == 'en'">
								<h1 class="breakdown-title">Amount Saved</h1>
								<h1 class="breakdown-value">RO {{ data.savedAmount.toFixed(2) }}</h1>
							</div>
							<div class="breakdown" v-if="currentLanguage == 'ar'">
								<h1 class="breakdown-title">المبلغ المحفوظة</h1>
								<h1 class="breakdown-value">رع {{ data.savedAmount.toFixed(2) }}</h1>
							</div>
						</div>
					</div>
				</div>
			</parent-button>
			<div class="checkout-btn" @click="$router.push('/billing')">
				<h1 class="btn-text" v-if="currentLanguage == 'en'">Proceed to Checkout</h1>
				<h1 class="btn-text" v-if="currentLanguage == 'ar'">المتابعة إلى الدفع</h1>
			</div>
		</div>
	</span>
</template>

<script setup>
import ParentButton from "../../Buttons/ParentButton.vue";
import { useMainStore } from "../../../store/useMainStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import axios from "axios";

const showPriceBreakdown = ref(false);

const main = useMainStore();
const { cartItems, currentLanguage } = storeToRefs(main);
const { generateBilling } = main;

const data = ref(null);
let productIDs = []

function getProductIDs() {
	productIDs.length = 0; // To clear Arr
	for (let index = 0; index < cartItems.value.length; index++) {
		productIDs.push(cartItems.value[index][0])
	}
}

async function getData() {
	try {
		const response = await axios.get(
			`https://api-uhzv.onrender.com/v1/${currentLanguage.value}/cart/data/${JSON.stringify(productIDs)}`
		);
		data.value = response.data;
		generateBilling("total", data.value.totalAmount.toFixed(2))
		generateBilling("subtotal", data.value.subtotalAmount.toFixed(2))
		const shippingFee = data.value.shippingAmount == "Free" ? data.value.shippingAmount : "RO " + data.value.shippingAmount
		generateBilling("shipping", shippingFee)

	} catch (error) {
		console.error(error);
	}
}


main.$subscribe(() => {
	getProductIDs()
	getData();
});
</script>

<style scoped>
.checkout-btn-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.parent-btn {
	bottom: 1.8rem !important;
	height: 7.3rem !important;
	transition-timing-function: ease-out;
	transition: 0.5s;
}

.expandParent {
	height: 11.5rem !important;
}

.rotateArrowUp {
	animation: rotateUp 0.5s forwards;
}

.rotateArrowDown {
	animation: rotateDown 0.5s forwards;
}

@keyframes rotateUp {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(180deg);
	}
}

@keyframes rotateDown {
	0% {
		transform: rotate(180deg);
	}

	100% {
		transform: rotate(0deg);
	}
}

.btn-text {
	font-family: "Poppins";
	font-style: normal;
	font-weight: 500;
	font-size: 0.98rem;
	line-height: 1.688rem;
	color: #ffffff;
}

.checkout-btn {
	width: 95vw;
	height: 3.2rem;
	border-radius: 0.4rem;
	background-color: #f97a46;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	bottom: 2.4rem;
	z-index: 11;
}

.price-summary {
	width: 94vw;
	font-family: Poppins;
	font-size: 1.1rem;
	font-weight: 600;
	color: #2b2b2f;
	margin-bottom: 0.9rem;
	margin-top: 0.7rem;
	display: flex;
	justify-content: space-between;
}

.small-text {
	font-size: 0.7rem;
	font-weight: 500;
	color: #686868;
}

.amount-wrapper {
	display: flex;
}

.expand-btn {
	height: 1.3rem;
	width: 1.3rem;
	margin-top: -0.1rem;
	margin-left: 0.4rem;
}

.price-breakdown-wrapper {
	margin-bottom: 0.7rem;
}

.breakdown {
	display: flex;
	justify-content: space-between;
	font-family: Poppins;
	margin-bottom: 0.4rem;
}

.breakdown-title {
	font-size: 0.85rem;
	font-weight: 400;
	color: rgb(44, 44, 44);
}

.breakdown-value {
	font-size: 0.85rem;
	color: rgb(99, 99, 99);
	font-weight: 400;
}
</style>
