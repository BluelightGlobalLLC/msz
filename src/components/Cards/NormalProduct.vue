<template>
	<div class="wrapper" @click.self="changeRoute(props.data.productId)">
		<div v-if="props.data.tag" class="tag" :style="{ 'background-color': props.data.tag[1] }">
			{{ props.data.tag[0] }}
		</div>
		<img :src="props.data.productThumbnail" :class="{ accessory: props.data.isAccessory }" class="image"
			@click.self="changeRoute(props.data.productId)" />
		<div class="buttons">
			<div class="button cart-button" @click="addToCart(props.data.productId)">
				<img src="../../assets/Cards/cart.svg" class="cart-icon" />
				<h4 class="cart-button-text">{{ cartText }}</h4>
			</div>
			<div class="button favorite-button" @click="addToWishlist">
				<img :key="favoriteIcon" :src="favoriteIcon" class="favorite-icon" loading="eager" />
				<!-- :key triggers image change-->
			</div>
		</div>
		<div class="text" @click="changeRoute(props.data.productId)">
			<div class="name-wrapper">
				<h3 class="name">{{ props.data.productName }}</h3>
			</div>
			<div class="price-wrapper" v-if="currentLanguage == 'en'">
				<h1 class="price">OMR {{ props.data.currentPrice }}</h1>
				<h1 v-if="props.data.oldPrice" class="old-price">OMR {{ props.data.oldPrice }}</h1>
			</div>
			<div class="price-wrapper" v-if="currentLanguage == 'ar'">
				<h1 class="price">رع {{ props.data.currentPrice }}</h1>
				<h1 v-if="props.data.oldPrice" class="old-price">رع {{ props.data.oldPrice }}</h1>
			</div>
		</div>
	</div>
</template>

<script setup>
import favoriteIconUnclicked from "../../assets/Cards/favorite.png"
import favoriteIconClicked from "../../assets/Cards/favoriteclicked.png"
import { Haptics } from '@capacitor/haptics';
import { useRouter } from "vue-router"
import { ref } from "vue"
import { useMainStore } from "../../store/useMainStore"
import { storeToRefs } from "pinia";

const props = defineProps({
	data: {
		type: Object,
	},
})
console.log(props.data.tag)
const main = useMainStore()
const { togglePopupState, addCartItem, addLikedItem, removeLikedItem } = main
const { isVibrationsEnabled, currentLanguage } = storeToRefs(main)
const router = useRouter()

let cartText = ref("Add to cart")
async function addToCart(productId) {
	if (cartText.value == "Add to cart") {
		cartText.value = "Added!"
		togglePopupState(true)
		addCartItem([productId, props.data.deviceColor[0]])

		if (isVibrationsEnabled.value === true) {
			await Haptics.vibrate();
		}
	}
}

let favoriteIcon = ref(favoriteIconUnclicked)
async function addToWishlist() {
	if (favoriteIcon.value == favoriteIconUnclicked) {
		addLikedItem({
			productId: props.data.productId,
			productName: props.data.productName,
			productThumbnail: props.data.productThumbnail,
			rating: null,
			currentPrice: props.data.currentPrice,
			oldPrice: props.data.oldPrice ? props.data.oldPrice : "",
			tags: props.data.tag ? [[props.data.tag[0], props.data.tag[1]]] : null,
		})
		favoriteIcon.value = favoriteIconClicked
		if (isVibrationsEnabled.value === true) {
			await Haptics.vibrate();
		}
	} else if (favoriteIcon.value != favoriteIconUnclicked) {
		removeLikedItem(props.data.productId)
		favoriteIcon.value = favoriteIconUnclicked
	}
}

function changeRoute(productId) {
	router.push({
		name: "Product",
		params: { productId: productId },
	})
}
</script>

<style scoped>
.wrapper {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	text-align: center;
	width: 12.5rem;
	border-radius: 0.94rem;
	background-color: #f8f8f8;
	position: relative;
	font-family: Poppins;
	padding-bottom: 1rem;
}

.image {
	object-fit: cover;
	min-height: 6.1rem;
	max-height: 6.1rem;
	min-width: 5.188rem;
	max-width: 5.188rem;
	object-position: 0% 0%;
	margin-top: 1.2rem;
	margin-bottom: 0.4rem;
}

.accessory {
	width: auto;
	max-width: 10rem;
}

.buttons {
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: inherit;
}

.button {
	height: 2.313rem;
	border-radius: 0.625rem;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	text-align: center;
	font-size: 0.625rem;
	font-weight: 600;
	padding: 0.5rem;
}

.cart-button {
	width: 5.75rem;
	background-color: #cad9ed;
	color: #1164db;
	margin-right: 0.375rem;
	margin-left: 0.375rem;
}

.cart-button-text {
	margin-top: 0.1rem;
}

.cart-icon {
	min-height: 0.875rem;
	max-height: 0.875rem;
	min-width: 0.875rem;
	max-width: 0.875rem;
	margin-right: 0.1rem;
}

.favorite-button {
	width: 2.875rem;
	background-color: #fee0e6;
}

.favorite-icon {
	min-height: 1.3rem;
	max-height: 1.3rem;
	min-width: 1.3rem;
	max-width: 1.3rem;
}

.text {
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.name-wrapper {
	width: 11.9rem;
	padding: 0 1.25rem 0 1.25rem;
	margin-top: 0.5rem;
	overflow: hidden;
	height: 1.75rem;
}

.name {
	font-size: 0.68rem;
	font-weight: 500;
	line-height: 0.875rem;
	color: #404040;
}

.price-wrapper {
	margin-top: 0.4rem;
	display: flex;
	text-align: center;
}

.price {
	font-size: 0.75rem;
	font-weight: 600;
	line-height: 0.875rem;
	color: #222526;
	margin-right: 0.3rem;
}

.old-price {
	font-size: 0.625rem;
	font-weight: 500;
	line-height: 0.875rem;
	color: #949597;
	text-decoration: line-through;
	margin-top: 0.05rem;
}

.tag {
	position: absolute;
	top: 1.2rem;
	left: 0rem;
	background-color: #fb3b5b;
	/* Fallback color */
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 1.5rem;
	min-width: 2.8rem;
	width: max-content;
	font-size: 0.8rem;
	font-weight: 600;
	border-top-right-radius: 0.4rem;
	border-bottom-right-radius: 0.4rem;
	padding: 0 0.3rem;
}
</style>
