<template>
	<div class="container">

		<img src="../../assets/Intro/hero_2.png" class="hero-header" alt="header" />
		<div class="main-content">
			<h1 class="header">Sign In</h1>
			<div class="small-text">
				Sign in to access exclusive promotions and offers
			</div>
			<div class="option">
				<img class="google-icon" src="../../assets/Intro/googlelogo.png" alt="Google">
				<h3 class="text">Continue with <span class="highlighted">Google</span></h3>
			</div>
			<div class="option" @click="$router.push('/signin/whatsapp')">
				<img class="whatsapp-icon" src="../../assets/Intro/whatsapplogo.png" alt="Google">
				<h3 class="text">Continue with <span class="highlighted">WhatsApp</span></h3>
			</div>
			<h2 class="close-btn" @click="$router.push('/')">Continue as Guest</h2>
		</div>
	</div>
</template>

<script setup>
import { Preferences } from '@capacitor/preferences';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMainStore } from '../../store/useMainStore';

const main = useMainStore()
const router = useRouter()
const { login, addCartItem, addLikedItem, addToAddress } = main


const checkName = async () => {
	const { value } = await Preferences.get({ key: 'isUserLoggedIn' });
	if (value == "true") {
		login()
		router.push("/home")
	}
};

const restoreCart = async () => {
	let { value } = await Preferences.get({ key: 'cartItems' });
	const cartItems = JSON.parse(value)
	if (cartItems) {
		for (let index = 0; index < cartItems.length; index++) {
			addCartItem(cartItems[index])
		}
	}

}

const restoreWishlist = async () => {
	const { value } = await Preferences.get({ key: 'likedItems' })
	const likedItems = JSON.parse(value)
	if (likedItems) {
		for (let index = 0; index < likedItems.length; index++) {
			addLikedItem(likedItems[index])
		}
	}
}

// Persist Address
const getAddress = async () => {
	const { value } = await Preferences.get({ key: 'Address' });
	if (value) {
		addToAddress('Address', value)
	}
};
const getRegion = async () => {
	const { value } = await Preferences.get({ key: 'Region' });
	if (value) {
		addToAddress('Region', value)
	}
};
const getHouse = async () => {
	const { value } = await Preferences.get({ key: 'House No.' });
	if (value) {
		addToAddress('House No.', value)
	}
};
const getEmail = async () => {
	const { value } = await Preferences.get({ key: 'Email' });
	if (value) {
		addToAddress('Email', value)
	}
};
const getPhone = async () => {
	const { value } = await Preferences.get({ key: 'Phone' });
	if (value) {
		addToAddress('Phone', value)
	}
};

onMounted(getAddress)
onMounted(getEmail)
onMounted(getHouse)
onMounted(getPhone)
onMounted(getRegion)

onMounted(restoreCart)
onMounted(restoreWishlist)
onMounted(checkName)
</script>

<style scoped>
.container {
	width: 100%;
	height: 100%;
	font-family: Poppins;
}

.close-btn {
	color: #464d5b;
	font-size: 0.8rem;
	font-weight: 400;
	margin-top: 1.25rem;
	text-decoration: underline;
}

.hero-header {
	max-width: 100%;
	min-width: 100%;
	height: auto;
}

@media screen {}

.main-content {
	width: 100%;
	background-color: #ffffff;
	position: absolute;
	margin-top: -3.6rem;
	border-radius: 2rem 2rem 0px 0px;
	padding-left: 2.1rem;
	padding-right: 2rem;
	padding-top: 5.5rem;
}

.header {
	font-size: 1.9rem;
	font-family: Poppins;
	font-weight: 700;
	color: #2a295a;
	margin-bottom: .9rem;
}

.option {
	width: 99%;
	height: 4rem;
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
	border-radius: 0.2rem;
	border: solid 1px#DDDDDD;
}

.small-text {
	width: 100%;
	font-size: 0.9rem;
	font-family: Poppins;
	font-weight: 400;
	color: #657189;
	line-height: 1.3rem;
	margin-bottom: 2rem;
	width: 100%;

}

.highlighted {
	font-weight: 600;
}

.google-icon {
	max-width: 1.3rem;
	max-height: 1.3rem;
	margin-left: 1.4rem;
	margin-right: 1.8rem;
}

.whatsapp-icon {
	max-width: 2rem;
	max-height: 2rem;
	margin-left: 1.2rem;
	margin-right: 1.3rem;
}
</style>
