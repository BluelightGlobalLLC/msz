<template>
	<div class="wrapper">
		<div class="flex-wrapper">
			<div v-if="props.navigateBack" class="arrow-back-wrapper">
				<img src="../../assets/Arrows/leftArrow.png" alt="back" class="arrow-back" @click="$router.go(-1)" />
			</div>
			<div class="searchbar">
				<div class="search-icon-wrapper">
					<img src="../../assets/Navigation/searchicon.png" alt="search" class="search-icon" />
				</div>
				<form @submit.prevent="$router.push(`/list/stock/${searchTerm}`)">
					<input type="text" :placeholder="props.title" v-model="searchTerm" ref="searchTermFocus">
				</form>
			</div>
		</div>
		<div class="results" v-if="findDevices.length">
			<h3 class="num-results">Showing {{ findDevices.length }} of {{ devices.length }} results</h3>
			<div class="result" v-for="device in findDevices" :key="device" @click="$router.push(`/list/stock/${device}`)">
				{{ device }}</div>
		</div>
		<div class="results" v-if="!findDevices.length && props.results">
			<h3 class="num-results">Trending Searches</h3>
			<div class="result" v-for="device in trendingData" :key="device.name"
				@click="$router.push(`/list/stock/${device}`)"> {{ device }}</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	navigateBack: { type: Boolean },
	title: { type: String, default: "Search for products & brands" },
	results: { type: Boolean, default: false }
});


import { ref, computed, onActivated } from 'vue';
import axios from "axios";

let searchTerm = ref('')
let searchTermFocus = ref('')

import { useRoute } from "vue-router";
const route = useRoute();

function focusOnSearchbar() {
	if (route.name == "Search") {
		searchTermFocus.value.focus()
	}
}
onActivated(focusOnSearchbar)

// TODO Fetch from API
let devices = ["Samsung Galaxy S21 Ultra 8GB|256GB", "Xiaomi Redmi Note 10 Pro Global Edition 6GB|128GB", "Xiaomi Poco X3 Pro 4GB|256GB LTE", "Samsung Galaxy A72 5G 3GB|128GB", "Xiaomi Mi 11 Ultra 3GB|256GB Japan Edition", "Apple iPhone 13 Pro Max 8GB|1TB", "OnePlus Nord 2 5G 4GB|256GB India Version", "Samsung Galaxy Note10+ 4GB|128GB", "OnePlus 7T Pro 8GB|256GB", "Xiaomi Redmi Note 8 Pro 3GB|64GB", "Samsung Galaxy A70 6GB|128GB", "Samsung Galaxy M20 12GB|512GB", "Huawei Y9 Prime (2019) 4GB|256GB", "Samsung Galaxy A10 8GB|512GB", "Samsung Galaxy A70 6GB|128GB", "Samsung Galaxy M20 12GB|512GB", "Huawei Y9 Prime (2019) 4GB|256GB", "Samsung Galaxy A10 8GB|512GB", "Xiaomi Poco F4 GT 4GB|128GB", "Xiaomi Poco F4 8GB|256GB", "Realme GT Neo 3T 12GB|512GB", "Samsung Galaxy Buds", "Bose Quiet Comfort 45 Wireless Noise-Cancelling Headphones", "Samsung Galaxy Watch 4 (46mm)", "Iottie Auto Sense Wireless Charging Phone Mount", "QIAYA Selfie camera LED Circle Ring Light", "Xenvo Pro Lens Kit", "Razer Kishi Mobile Game Controller", "Asus ROG Phone 6 Pro 6GB|128GB", "ZTE nubia Red Magic 7 4GB|256GB", "Xiaomi Black Shark 5 Pro 2GB/64GB", "Apple iPhone 13 Pro Max 8GB|256GB", "vivo iQOO 9 12GB|256GB", "Samsung Galaxy A52s 5G 8GB|512GB", "Xiaomi Poco F4 2GB/64GB", "iPhone SE (2022) 8GB|64GB", "Apple iPad Air (2022) 6GB|128GB", "iPhone 13 mini 8GB|128GB", "iPhone 13 Pro 12GB|256GB", "iPhone 13 8GB|512GB", "Apple iPad mini (2021) 12GB|256GB", "Apple iPad Pro 12.9 (2021) 12GB|512GB", "Realme GT Neo 3T 4GB|128GB", "Sony Xperia 10 IV 6GB/256GB", "Realme 9 2GB/64GB", "Realme 8 6GB|128GB", "Realme 8i 12GB|512GB", "Xiaomi Redmi Note 11 3GB|64GB", "Xiaomi Poco M4 Pro 4GB|128GB", "JBL MS4822", "Xplore XPT15 Wireless Earbuds", "Xplore Smartwatch T8406", "Soundcore Wired Gaming Headset", "Haifi Wireless Charger", "Amazon Basic Wireless Earbud", "Awei Data Cable"]

const findDevices = computed(() => {
	if (searchTerm.value === '') {
		return []
	}
	let matches = 0
	return devices.filter(device => {
		if (
			device.toLowerCase().includes(searchTerm.value.toLowerCase())
			&& matches < 3
		) {
			matches++
			return device
		}
	})
});

const trendingData = ref(null);
async function getTrendingData() {
	try {
		const response = await axios.get(`https://api.jeswinsunsi.repl.co/v1/navigation/trending`);
		trendingData.value = response.data;
	} catch (error) {
		console.error(error);
	}
}
getTrendingData();
</script>

<style scoped>
.wrapper {
	width: 100%;
	height: 3.5rem;
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	z-index: 100;
	padding: 0.6rem 0.75rem 0 0.8rem;
}

.flex-wrapper {
	margin-bottom: 0.1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.search-icon {
	height: 1.3rem;
	width: 1.3rem;
}

h1 {
	font-size: 0.8rem;
	font-family: Poppins;
	font-weight: 400;
	line-height: 1.313rem;
	color: #6f6f6f;
	margin-bottom: -0.2rem;
}

.searchbar {
	height: 2.5rem;
	width: 100%;
	padding-left: 0.5rem;
	border-radius: 0.3rem;
	background-color: #eeeeee;
	display: flex;
	align-items: center;
}

form {
	width: 100%;
}

input {
	background-color: #eeeeee;
	color: #6f6f6f;
	border: transparent;
	outline: none;
	height: 2rem;
	font-size: 0.8rem;
	font-family: Poppins;
	font-weight: 400;
	margin-bottom: -0.2rem;
	width: 90%;
}

.arrow-back {
	height: 1.8rem;
	width: auto;
}

.search-icon-wrapper {
	height: 1.3rem;
	width: 1.3rem;
	margin-right: 0.4rem;
}

.arrow-back-wrapper {
	height: 1.8rem;
	width: 1.6rem;
	margin-right: 1.3rem;
	margin-left: 0.6rem;
}

.results {
	margin-top: 1rem;
	font-family: Poppins;
}

.num-results {
	font-weight: 400;
	font-size: 0.8rem;
	color: #6f6f6f;
	margin-bottom: 0.8rem;
}

.result {
	margin-bottom: 0.4rem;
	border: solid 1px #f2f2f2;
	padding: 1rem;
	border-radius: 0.5rem;
	font-weight: 400;
	font-size: 0.8rem;
}
</style>
