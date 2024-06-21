<template>
	<div class="container">
		<popup-cart v-if="currentPopupState == true" />
		<home-skeleton v-if="!hasViewLoaded.home" />
		<div v-show="hasViewLoaded.home" class="home-wrapper">

			<div class="second-wrapper">
				<!--<banner-autoplay :rem="1.2" />-->
				<banner-static num="4" :height="60" />
				<product-scroll :rem="0.6" num="0" />
				<category-scroll :rem="0.5" />
				<product-scroll num="1" />
				<flash-sale />
				<product-scroll num="2" />
				<banner-static num="1" />
				<product-scroll num="3" />
				<product-scroll num="4" />
				<banner-autoplay />
				<product-scroll num="5" />
				<category-grid />
				<product-scroll num="6" />
			</div>
		</div>
	</div>
</template>

<script setup>
import BannerAutoplay from "../components/Banners/Autoplay.vue";
import ProductScroll from "../components/Scrolls/Product.vue";
import CategoryScroll from "../components/Scrolls/Category.vue";
import BannerStatic from "../components/Banners/Static.vue";
import PopupCart from "../components/Popups/PopupCart.vue";
import FlashSale from "../components/Scrolls/FlashSale.vue";
import CategoryGrid from "../components/Scrolls/CategoryAuto.vue";
import HomeSkeleton from "../components/Skeletons/Views/Home.vue";
import { useMainStore } from "../store/useMainStore";
import { usePopup } from "../Composables/comFunctions.js";
import { storeToRefs } from "pinia";

const main = useMainStore();

// DEPRECATED (HIDES NAV ON SCROLL) const hideNav = useHideNav(); //eslint-disable-line
const popup = usePopup(); //eslint-disable-line
const { currentPopupState, hasViewLoaded, currentLanguage } = storeToRefs(main);

if (currentLanguage.value == "ar") {
	document.body.setAttribute('dir', 'rtl')
}
else if (currentLanguage.value == "en") {
	document.body.setAttribute('dir', 'ltr')
}
</script>

<style scoped>
.home-wrapper {
	height: 100%;
	width: 100%;
	margin-bottom: 1.5rem;
}

.container {
	display: flex;
	height: 100%;
	width: 100%;
}

.logo {
	display: flex;
	padding-top: 3rem;
	justify-content: center;
	padding-left: 2rem;
	height: 15rem;
	width: 100%;
	background-color: #013761;
	position: absolute;
	top: 3.5rem;
}

.logo-img {
	height: 3rem;
	margin-left: -1.5rem;
	margin-bottom: -1rem;
}
</style>
