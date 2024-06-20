<template>
	<div class="action-buttons-wrapper" :style="{ 'margin-bottom': props.rem + 'rem' }">
		<div class="act-btn">
			<img class="act-btn-img" src="../../../assets/ActionButtons/orders.svg" alt="" />
			<h3 v-if="currentLanguage == 'en'">Orders</h3>
			<h3 v-if="currentLanguage == 'ar'">خصومات</h3>
		</div>
		<div class="act-btn" @click="$router.push('/list/wishlist/Wishlist')">
			<img class="act-btn-img" src="../../../assets/ActionButtons/wishlist.svg" alt="" />
			<h3 v-if="currentLanguage == 'en'">Wishlist</h3>
			<h3 v-if="currentLanguage == 'ar'">قائمة الرغبات</h3>
		</div>
		<div class="act-btn" @click="$router.push('/list/history/History')">
			<img class="act-btn-img" src="../../../assets/ActionButtons/history.svg" alt="" />
			<h3 v-if="currentLanguage == 'en'">History</h3>
			<h3 v-if="currentLanguage == 'ar'">التاريخ السابق</h3>
		</div>
		<div class="act-btn" @click="$router.push('/list/dbase/Top Offers')">
			<img class="act-btn-img" src="../../../assets/ActionButtons/promotions.svg" alt="" />
			<h3 v-if="currentLanguage == 'en'">Promotions</h3>
			<h3 v-if="currentLanguage == 'ar'">تخفيض</h3>
		</div>
		<div class="act-btn">
			<img class="act-btn-img" src="../../../assets/ActionButtons/outlets.svg" alt="" />
			<a href="https://wa.me/91515555?text=Hey! Where are your stores located?">
				<h2 class="name" v-if="currentLanguage == 'en'">Outlets</h2>
				<h2 class="name" v-if="currentLanguage == 'ar'">مواقع المتجر</h2>
			</a>
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
.action-buttons-wrapper {
	margin-left: 0.8rem;
	margin-right: 0.8rem;
	width: calc(100% - 1.6rem);
	height: 6.5rem;
	border-radius: 0.5rem;
	background-color: #fff;
	z-index: 100;
	position: absolute;
	font-family: Poppins;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0rem 7vw;
}

.act-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #404040;
	font-weight: 500;
	font-size: 0.6rem;
}

.act-btn-img {
	height: 1.8rem;
	width: 1.8rem;
	margin-bottom: 0.3rem;
}

a {
	color: inherit;
}
</style>
