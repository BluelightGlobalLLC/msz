<template>
	<div>
		<cart-skeleton v-if="!hasViewLoaded.cart" />
		<div v-show="hasViewLoaded.cart" class="container-cart" :class="{ 'decreased-padding': cartItems.length == 0 }">
			<span v-if="cartItems.length != 0">
				<items :rem="0" :data="cartItems" />
				<checkout-button />
			</span>
			<Transition>
				<div v-show="cartItems.length == 0">
					<empty-cart />
					<filler-products :rem="0" />
				</div>
			</Transition>
		</div>
	</div>
</template>

<script setup>
import Items from "../components/View Specific/Cart/Items.vue";
import CheckoutButton from "../components/View Specific/Cart/CheckoutButton.vue";
import FillerProducts from "../components/Scrolls/Filler.vue";
import EmptyCart from "../components/Miscellaneous/EmptyFeature.vue";
import CartSkeleton from "../components/Skeletons/Views/Cart.vue";

import { useMainStore } from "../store/useMainStore";
import { storeToRefs } from "pinia";

const main = useMainStore();
const { cartItems, hasViewLoaded } = storeToRefs(main);
</script>

<style scoped>
.container-cart {
	height: 100%;
	width: 100vw;
	padding-bottom: 11rem;
}

.decreased-padding {
	padding-bottom: 3.8rem !important;
}

.v-enter-active,
.v-leave-active {
	transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
