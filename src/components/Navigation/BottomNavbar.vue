<template>
	<div>
		<div class="container" :class="{ hideNavbar: isHidden, topShadow: isEnabledRoute }">
			<div class="button-wrapper" @click.prevent="navTo('Home')">
				<img :class="{ active: activeIcon == 'Home' }" class="icon-modified"
					src="../../assets/Navigation/home.png" />
				<h3 v-show="activeIcon == 'Home'" class="button-text">Home</h3>
			</div>

			<div class="button-wrapper" @click.prevent="navTo('Brands')">
				<img :class="{ active: activeIcon == 'Brands' }" class="icon-modified"
					src="../../assets/Navigation/brands.png" />
				<h3 v-show="activeIcon == 'Brands'" class="button-text">Brands</h3>
			</div>

			<div class="button-wrapper" @click.prevent="navTo('Cart')">
				<img :class="{ active: activeIcon == 'Cart' }" src="../../assets/Navigation/navcart.png" />
				<h3 v-show="activeIcon == 'Cart'" class="button-text">Cart</h3>
				<div v-show="cartItems.length != 0" class="quantity" :class="{ 'move-up': activeIcon == 'Cart' }">
					{{ cartItems.length }}
				</div>
			</div>

			<div class="button-wrapper" @click.prevent="navTo('Account')">
				<img :class="{ active: activeIcon == 'Account' }" class="icon-modified-2 icon-modified"
					src="../../assets/Navigation/account.png" />
				<h3 v-show="activeIcon == 'Account'" class="button-text">Account</h3>
			</div>
		</div>
	</div>
</template>

<script setup>
// Imports
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMainStore } from "../../store/useMainStore";

const main = useMainStore();
const router = useRouter();
const route = useRoute();
const { cartItems, isUserLoggedIn } = storeToRefs(main);

// Navigation
const activeIcon = ref("Home");

function navTo(route) {
	if (route == "Account") {
		if (isUserLoggedIn.value) {
			router.push({ name: route });
		}
		else {
			router.push({ name: route });
			//router.push('/')
		}
	}
	else {
		router.push({ name: route });
	}
}

// To temp hide and unhide BottomNavbar while scolling
const isHidden = ref(false);

const isEnabledRoute = ref(true);
const getCurrentRoute = () => route.name;

watch(getCurrentRoute, (value) => {
	isEnabledRoute.value = true;
	if (value === "ROUTENAMEHERE") {
		// to remove upper shadow
		isEnabledRoute.value = false;
		isHidden.value = false;
	}
	if (value === "Whatsapp" || value === "SignIn" || value === "Product") {
		// to remove navbar completely
		isEnabledRoute.value = false;
		isHidden.value = true;
	}
	else {
		// to enable navbar on all remaining routes
		isEnabledRoute.value = true;
		isHidden.value = false;
	}
	if (value != activeIcon.value) {
		// change bottom menu active icon dynamically
		activeIcon.value = value;
	}
});
</script>

<style scoped>
.container {
	width: 100%;
	height: 3.8rem;
	position: fixed;
	bottom: 0;
	background-color: #ffffff;
	display: flex;
	justify-content: space-around;
	align-items: center;
	transition-timing-function: ease-out;
	transition: 0.5s;
	z-index: 100;
}

.topShadow {
	filter: drop-shadow(0px -2px 4px rgba(122, 122, 127, 0.15));
}

.button-wrapper {
	height: 3.8rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: #959495;
	width: calc(100% / 4);
	position: relative;
	transition: background 0.8s;
	background-position: center;
}

.button-wrapper:hover {
	background: #ffffff radial-gradient(circle, transparent 1%, #ffffff 1%) center/15000%;
}

.button-wrapper:active {
	background-color: #eaeaea;
	background-size: 100%;
	transition: background 0s;
}

img {
	min-height: 1.438rem;
	min-width: 1.313rem;
	max-height: 1.438rem;
	max-width: 1.313rem;
}

.icon-modified {
	min-width: 1.5rem;
	max-width: 1.5rem;
}

.icon-modified-2 {
	margin-bottom: -0.2rem;
}

.button-text {
	font-family: Poppins;
	font-weight: 500;
	font-size: 0.55rem;
	line-height: 0.875rem;
	text-align: center;
	color: #f97a46;
}

/* Better  use filter and change color than assign new img src */
.active {
	filter: invert(68%) sepia(25%) saturate(6830%) hue-rotate(331deg) brightness(101%) contrast(95%);
}

.hideNavbar {
	transform: translateY(100%);
	transition-timing-function: ease-out;
	transition: 0.5s;
}

.decreaseBrightness {
	filter: brightness(50%);
}

.quantity {
	position: absolute;
	height: 1rem;
	width: 1rem;
	border-radius: 50%;
	background-color: #f97a46;
	margin-left: 1.25rem;
	margin-bottom: 0.3rem;
	color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: Poppins;
	font-size: 0.6rem;
	padding-top: 0.1rem;
}

.move-up {
	margin-bottom: 1rem;
}
</style>
