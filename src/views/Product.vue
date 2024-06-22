<template>
	<div :key="route.params.productId" class="container">
		<product-skeleton v-if="!data" />
		<popup-cart v-if="currentPopupState == true" />
		<div v-if="data" class="wrapper">
			<carousal :images="data.productCarousal" />
			<info :data="data.productInfo" />
			<specification-scroll :rem="2" :specifications="data.specifications" />
			<customization-field :data="data.deviceColor" :rem="1.8" @change-color="changeColor" />
			<text-banner :rem="1.5" heading="100% GENUINE GUARANTEE"
				subheading="WE MAKE SURE THAT ALL OUR DEVICES ARE 100% GENUINE" heading-color="#008D06"
				subheading-color="#34B233" />
			<text-banner v-if="data.productInfo.currentPrice > 200" :rem="2.8" heading="FREE SECURE SHIPPING"
				subheading="GET FREE & SECURE SHIPPING WITH THIS PRODUCT" heading-color="#8D2A00"
				subheading-color="#B25133" />
			<!--TODO do not hardcode this 200. take it from api so it can be set variably/dynamically -->
			<banner-static :rem="1" :height="34" num="1" />
			<div class="line"></div>
			<product-scroll :rem="1.5" num="7" />
			<product-scroll num="2" />
			<div class="bottom-space"></div>
			<atc-button :id="data.productId" :color="selectedColor" :name="data.productInfo.productName" />
		</div>
	</div>
</template>

<script setup>
import Carousal from "../components/View Specific/Product/Carousal.vue";
import Info from "../components/View Specific/Product/Info.vue";
import ProductScroll from "../components/Scrolls/Product.vue";
import PopupCart from "../components/Popups/PopupCart.vue";
import AtcButton from "../components/Buttons/AtcButton.vue";
import SpecificationScroll from "../components/Scrolls/Specification.vue";
import BannerStatic from "../components/Banners/Static.vue";
import TextBanner from "../components/View Specific/Product/TextBanner.vue";
import CustomizationField from "../components/View Specific/Product/CustomizationField.vue";
import ProductSkeleton from "../components/Skeletons/Views/Product.vue";

import { useMainStore } from "../store/useMainStore";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { usePopup } from "../Composables/comFunctions.js";
import { ref, watch, onMounted } from "vue";
import axios from "axios";

const route = useRoute();
const popup = usePopup(); //eslint-disable-line
const main = useMainStore();
const { currentPopupState, currentLanguage } = storeToRefs(main);
const { addHistoryItem } = main;

const data = ref(null);
const selectedColor = ref(null)		// To pass into ATCBtn

async function getProductData() {
	if (route.name == "Product") {
		data.value = null;
		try {
			const response = await axios.get(`https://ff135741-e6c5-4504-bbd8-4006a68674ff-00-1joqn986eucll.sisko.replit.dev/v1/${currentLanguage.value}/products/${route.params.productId}`);
			data.value = response.data;
			selectedColor.value = data.value.deviceColor[0]
			addHistoryItem({
				productId: route.params.productId,
				productName: data.value.productInfo.productName,
				productThumbnail: data.value.productCarousal[0],
				rating: data.value.productInfo.rating,
				currentPrice: data.value.productInfo.currentPrice,
				oldPrice: data.value.productInfo.oldPrice ? data.value.productInfo.oldPrice : "",
				tags: data.value.productInfo.availability.includes("Limited")
					? [["Limited Quantity", "#cc2e20"]]
					: null,
			});
		} catch (error) {
			console.error(error);
		}
	}
}

// update data.value when param changes (productId changes)
onMounted(getProductData);
watch(() => route.params.productId, getProductData);

function changeColor(color) {
	selectedColor.value = color;
}
</script>

<script>
export default {
	name: "Product", // to exclude from keep-alive
};
</script>

<style scoped>
.wrapper {
	background-color: #ffffff;
}

.line {
	height: 0.2rem;
	width: calc(100% - 1.6rem);
	margin-left: 0.8rem;
	margin-right: 0.8rem;
	border-radius: 0.2rem;
	background-color: #eeeeee;
	margin-bottom: 1.5rem;
}

.bottom-space {
	width: 100%;
	height: 3.5rem;
}
</style>
