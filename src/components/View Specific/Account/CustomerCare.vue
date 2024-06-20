<template>
	<div class="customer-care-wrapper" :style="{ 'margin-bottom': props.rem + 'rem' }">
		<h1 v-if="currentLanguage == 'en'">Customer Service</h1>
		<h1 v-if="currentLanguage == 'ar'">يدعم</h1>
		<div class="customer-care-btns" v-if="currentLanguage == 'en'">
			<div class="customer-care-btn">
				<a href="https://wa.me/91515555?text=Hey! I need support using the MSouq App.">
					<img class="customer-care-btn-img support-btn-img" src="../../../assets/CustomerCare/support.svg"
						alt="" />
					<h2 class="name">Support</h2>
				</a>
			</div>
			<div class="customer-care-btn">
				<a href="https://wa.me/91515555?text=Hey! I want to return a product I've purchased.">
					<img class="customer-care-btn-img" src="../../../assets/CustomerCare/returns.svg" alt="" />
					<h2 class="name">Returns</h2>
				</a>
			</div>
			<div class="customer-care-btn">
				<img class="customer-care-btn-img" src="../../../assets/CustomerCare/feedback.svg" alt="" />
				<h3>Feedback</h3>
			</div>
		</div>
		<!--ARABIC-->
		<div class="customer-care-btns" v-if="currentLanguage == 'ar'">
			<div class="customer-care-btn">
				<a href="https://wa.me/91515555?text=Hey! I need support using the MSouq App.">
					<img class="customer-care-btn-img support-btn-img" src="../../../assets/CustomerCare/support.svg"
						alt="" />
					<h2 class="name">يدعم</h2>
				</a>
			</div>
			<div class="customer-care-btn">
				<a href="https://wa.me/91515555?text=Hey! I want to return a product I've purchased.">
					<img class="customer-care-btn-img" src="../../../assets/CustomerCare/returns.svg" alt="" />
					<h2 class="name">عائدات</h2>
				</a>
			</div>
			<div class="customer-care-btn">
				<img class="customer-care-btn-img" src="../../../assets/CustomerCare/feedback.svg" alt="" />
				<h3>تعليق</h3>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	rem: { type: Number, default: 2 },
});

import { useMainStore } from "../../../store/useMainStore";
import { storeToRefs } from "pinia";

const main = useMainStore();
const { currentLanguage } = storeToRefs(main);
</script>

<style scoped>
.customer-care-wrapper {
	margin-left: 0.8rem;
	margin-right: 0.8rem;
	padding-top: 1.5rem;
	padding-bottom: 6.8rem;
	width: calc(100% - 1.6rem);
	height: 6.5rem;
	border-radius: 0.5rem;
	background-color: #fff;
	z-index: 100;
	font-family: Poppins;
}

.customer-care-wrapper h1 {
	margin-bottom: 1.5rem;
	font-weight: 500;
	font-size: 0.9rem;
	margin-left: 1rem;
	margin-right: 1rem;
}

.customer-care-btns {
	width: 100%;
	display: flex;
	padding-left: 1rem;
}

.customer-care-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #404040;
	font-weight: 500;
	font-size: 0.6rem;
	margin-right: 2.3rem;
}

.customer-care-btn-img {
	height: 1.8rem;
	width: 1.8rem;
	margin-bottom: 0.3rem;
}



a {
	color: inherit;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
