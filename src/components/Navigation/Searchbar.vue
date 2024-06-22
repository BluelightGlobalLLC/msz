<template>
	<div class="wrapper">
		<div class="section" v-if="true">
			<img src="../../../src/assets/Misc/textmsouq.png" class="logo" @click="$router.push('/')">
			<span>
				<img src="../../assets/Navigation/navlike.png" class="gift-icon"
					@click="$router.push('/list/wishlist/title')" />
				<img src="../../assets/Navigation/navcart3.png" class="cart-icon" @click="$router.push('/cart')" />
				<div v-show="cartItems.length != 0" class="quantity" v-if="currentLanguage == 'en'">
					{{ cartItems.length }}
				</div>
				<div v-show="cartItems.length != 0" class="quantity-ar" v-if="currentLanguage == 'ar'">
					{{ cartItems.length }}
				</div>
			</span>
		</div>
		<div class="flex-wrapper" @click="$router.push('/search')">
			<div v-show="navigateBack" class="arrow-back-wrapper" v-if="currentLanguage == 'en'">
				<img src="../../assets/Arrows/leftArrow.png" alt="back" class="arrow-back" @click="$router.go(-1)" />
			</div>
			<div v-show="navigateBack" class="arrow-back-wrapper" v-if="currentLanguage == 'ar'">
				<img src="../../assets/Arrows/leftArrow.png" alt="back" class="arrow-back" @click="$router.go(-1)"
					style="margin-right: -0.9rem;" />
			</div>
			<div class="searchbar">
				<div class="search-icon-wrapper">
					<img src="../../assets/Navigation/searchicon.png" alt="search" class="search-icon" />
				</div>
				<form @submit.prevent="$router.push(`/list/stock/${searchTerm}`)">
					<input type="text" :placeholder="props.title" v-model="searchTerm" ref="searchTermFocus"
						v-if="currentLanguage == 'en'">
					<input type="text" :placeholder="props.titleAr" v-model="searchTerm" ref="searchTermFocus"
						v-if="currentLanguage == 'ar'">
				</form>
			</div>
		</div>
		<span v-if="$route.name == 'Search'">
			<div class="results" v-if="Object.keys(findDevices).length">
				<h3 class="num-results">Showing {{ Object.keys(findDevices).length }} of {{ devices.length }} results
				</h3>
				<div class="result" v-for="device in findDevices" :key="device"
					@click="$router.push(`/product/${device[1] + 1}`)">
					{{ device[0] }}</div>
			</div>
			<div class="results" v-if="!Object.keys(findDevices).length">
				<h3 class="num-results">Trending Searches</h3>
				<div class="result" v-for="device in trendingData" :key="device.name"
					@click="$router.push(`/list/stock/${device}`)"> {{ device }}</div>
			</div>
		</span>
	</div>
</template>

<script setup>
const props = defineProps({
	navigateBack: { type: Boolean },
	title: { type: String, default: "Search for products & brands" },
	titleAr: { type: String, default: "البحث عن المنتجات" },
	results: { type: Boolean, default: false }
});


import { ref, computed, watch } from 'vue';
import axios from "axios";
import { useMainStore } from "../../store/useMainStore.js";
import { storeToRefs } from "pinia";
import Fuse from 'fuse.js'

const main = useMainStore();
const { currentLanguage, cartItems } = storeToRefs(main);

let searchTerm = ref('')
let searchTermFocus = ref('')
let navigateBack = ref(true);

import { useRoute } from "vue-router";
const route = useRoute();

const getCurrentRoute = () => route.name;

watch(getCurrentRoute, (value) => {
	if (value === "Home") {
		navigateBack.value = false;
		searchTerm.value = ""
	}
	else {
		navigateBack.value = true;
		searchTerm.value = ""
	}
})

// TODO Fetch from API or change every two weeks
let devices = ["Apple IPad Mini 32GB Cellular", "Apple IPad Pro 12.9\" 5th Gen WiFi 256GB", "Apple IPhone 11 128GB", "Apple IPhone 11 Pro 256GB", "Apple IPhone 12 128GB", "Apple IPhone 12 256GB", "Apple IPhone 12 Mini 128GB", "Apple IPhone 13 128GB", "Apple IPhone 13 256GB", "Apple IPhone 13 Pro 128", "Apple IPhone 13 Pro 256", "Apple IPhone 13 Pro 512", "Apple IPhone 13 Pro Max 128", "Apple IPhone 13 Pro Max 256GB", "Apple IPhone 13 Pro Max 512GB", "Apple IPhone 5C 32GB", "Apple IPhone 7Plus 256GB", "Apple IPhone SE3 128GB", "Apple IPhone XS Max 256GB", "Apple IPad 9th Gen WiFi 256GB", "Apple IPad 9th Gen WiFi 64GB", "Apple IPad Air 5th Gen WiFi 256GB", "Apple Ipad Air 4th Gen Wifi 256GB", "Apple Ipad Air 4th Gen Wifi 64GB", "Apple IPad Air 5th Gen WiFi 64 GB", "Apple Ipad Mini 6th Gen 64 GB Wifi", "Apple Ipad Pro 11\" 3rd Gen Wifi 128 GB", "Apple Ipad Pro 11\" 3rd Gen Wifi+Cellular 256 GB", "Apple Ipad Pro 11\"  3rd Gen Wifi 256 GB", "Honor X8 5G 6/128", "Honor X8 6/128", "Huawei Mediapad T310 2/32", "Huawei Nova 9 8/128", "Huawei Nova 9SE 8/128", "Huawei Nova Y70 4/128", "Huawei P50 Pro 8/256", "Huawei Y9A 8/128", "Lenovo  K14 Plus 4/128", "Lenovo  K15 Plus 4/128", "Lenovo  Tab M10 4/64 ", "OnePlus 9R 12/256", "OnePlus 9RT 5G 12/256", "OnePlus Nord 2 5G 12/256", "OnePlus Nord CE 2 8/128", "OnePlus Nord CE 2 Lite 5G 8/128", "Oppo A53 4/64", "Oppo A55 4/128", "Oppo A55 4/64", "Oppo Reno 7 Pro 5G 12/256", "Realme C11 2/32GB", "Realme C11 3/32GB", "Realme C21Y 4/64 GB", "Realme C25Y 4/128GB", "Realme C35 4/128GB", "Realme C35 6/128GB", "Realme GT 5G 8/256GB", "Realme GT Master 8/256GB", "Realme Narzo 50 6/128GB", "Redmi 10 6/128GB", "Redmi 10A 3/64GB", "Redmi 10A 4/128GB", "Redmi 10A 6/128 GB", "Redmi 10A 4/64 GB", "Redmi 10C 4/128GB", "Redmi 10C 4/64GB", "Redmi 12C 4/128 GB", "Redmi 12C 4/64 GB", "Redmi A1+ 2/32 GB", "Redmi Note 12 Pro 8/256 GB Black", "Redmi Note 9T 5G 4/128GB Black", "Samsung Galaxy A02 3/32GB", "Samsung Galaxy A03 Core 2/32GB", "Samsung Galaxy A53 5G 6/128GB", "Samsung Galaxy A53 5G 8/256 GB", "Samsung Galaxy A53 5G 8/128GB", "Samsung Galaxy A73 5G 8/128GB", "Samsung Galaxy A73 5G 8/256GB", "Samsung Galaxy M33 6/128GB", "Samsung Galaxy S21FE 6/128GB", "Samsung Galaxy S21FE 8/128GB", "Samsung Galaxy S21FE 8/256GB", "Samsung Galaxy S22 5G 128", "Samsung Galaxy S22 5G 256", "Samsung Galaxy S22 Plus 5G 8/128", "Samsung Galaxy S22 Plus 5G 8/256", "Samsung Galaxy S22 Ultra 12/256", "Samsung Galaxy S22 Ultra 8/256", "Samsung Galaxy Tab A 8 4/64GB", "Samsung Galaxy Tab S8 Ultra 5G 12/256GB", "Samsung Galaxy Tab S6 Lite 4/64GB", "Samsung Galaxy Tab A7 Lite 3/32GB", "Samsung Galaxy Tab A7 Lite Wfi 3/32GB", "Samsung Galaxy Tab S7 FE 4G 4/64GB", "Samsung Galaxy Tab S7 FE 5G 4/64GB", "Samsung Galaxy A04 3/32 GB", "Samsung Galaxy A04 4/64 GB", "Samsung Galaxy A04 E 3/32 GB", "Samsung Galaxy A04 E 3/64 GB", "Samsung Galaxy A14 4/128 GB", "Samsung Galaxy A14 4/64 GB", "Samsung Galaxy A33 5G 6/128 GB", "Samsung Galaxy A33 5G 8/128 GB", "Samsung Galaxy M13 4/128", "Samsung Galaxy M13 4/64 GB", "Samsung Galaxy M13 6/128 GB", "Samsung Galaxy S23 8/256 GB", "Samsung Galaxy S23 Plus 8/256 GB", "Samsung Galaxy S23 Plus 8/512 GB", "Samsung Galaxy S23 Ultra 256GB", "Samsung Galaxy S23 Ultra 512GB", "Samsung Galaxy Z Flip 4 5G 8/512 GB", "Samsung Galaxy Z Fold 4 5G 12/256 GB", "Samsung Galaxy Z Fold 4 5G 12/512 GB", "Modio Tab M8 4G 4/64GB", "Microdigit M7409 1/8GB", "Vivo V23 8/128GB", "Vivo Y76 5G 8/128GB", "Vivo Y15s 3/32GB", "Vivo Y21 4/64GB", "Vivo Y21T 4/128GB", "Vivo Y33s 8/128GB", "Vivo Y53s 8/128GB", "Vivo Y55 5G 6/128GB", "Vivo V21 8/128 GB", "Vivo Y02S 2/32 GB", "Vivo Y12s 3/32GB", "Vivo Y16 4/64 GB", "Vivo Y22 4/128 GB", "Vivo Y22S 6/128 GB", "Vivo Y35 8/128 GB", "Vivo Y51 8/128GB", "Xiaomi 12 Lite 8/256 GB", "Xiaomi MI 11 Lite 5G NE 8/256 GB", "Xiaomi MI 11T Pro 12/256 GB", "Xiaomi 12T 8/256 GB", "Xiaomi 12T Pro 12/256 GB", "Xiaomi 13 Lite 8/256 GB", "Samsung Galaxy M02 2/32GB", "Samsung Galaxy M02 3/32 GB", "Samsung Galaxy A04E 4/128 GB", "Samsung Galaxy A04E 3/32 GB", "Samsung Galaxy A04 4/64 GB", "Samsung Galaxy A04S 4/64 GB", "Samsung Galaxy A05 4/128 GB", "Samsung Galaxy A05 6/128 GB", "Samsung Galaxy A05 4/64 GB", "Samsung Galaxy A05S 6/128 GB", "Samsung Galaxy A14 5G 6/128 GB", "Samsung Galaxy A22 4G 4/64 GB", "Samsung Galaxy A23 4/64 GB", "Samsung Galaxy A24 4/128 GB", "Samsung Galaxy A24 6/128 GB", "Samsung Galaxy A24 8/128 GB", "Samsung Galaxy A34 5G 8/128 GB", "Samsung Galaxy A34 5G 8/256 GB", "Samsung Galaxy M14 5G 6/128 GB", "Samsung Galaxy M33 5G 8/128 GB", "Samsung Galaxy Z Fold 5 12/256 GB", "Samsung Galaxy S21 FE 5G 8/256 GB", "Samsung Galaxy S23 FE 5G 8/128 GB", "Samsung Galaxy S23 FE 5G 8/256 GB"];
const fuse = new Fuse(devices)

const findDevices = computed(() => {
	if (searchTerm.value === '') {
		return []
	}
	let results = fuse.search(searchTerm.value, { limit: 5, includeMatches: true })
	let finalResults = ref({})
	for (let i = 0; i < 4; i++) {
		finalResults.value[i] = [results[i].item, results[i].refIndex]
	}
	return finalResults.value
});

const trendingData = ref(null);
async function getTrendingData() {
	try {
		const response = await axios.get(`https://ff135741-e6c5-4504-bbd8-4006a68674ff-00-1joqn986eucll.sisko.replit.dev/v1/${currentLanguage.value}/navigation/trending`);
		trendingData.value = response.data;
	} catch (error) {
		console.error(error);
	}
}
getTrendingData();
</script>

<style scoped>
.logo {
	height: 1.5rem;
	width: auto;
	margin-bottom: 0.3rem;
}

.cart-icon {
	height: 2rem;
	width: auto;
	margin-top: 0.5rem;
	margin-bottom: 0.09rem;
	margin-right: 0.1rem;
}

.gift-icon {
	height: 2rem;
	width: auto;
	margin-top: 0.5rem;
	margin-bottom: 0.4rem;
	margin-right: 0.7rem;
}

.section {
	padding-top: 0.3rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.wrapper {
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	z-index: 100;
	padding: 0.6rem 0.75rem 0.3rem 0.8rem;
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

.quantity {
	position: absolute;
	height: 1rem;
	width: 1rem;
	border-radius: 50%;
	background-color: #f97a46;
	right: 1.9rem;
	top: 1.4rem;
	color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: Poppins;
	font-size: 0.6rem;
}

.quantity-ar {
	position: absolute;
	height: 1rem;
	width: 1rem;
	border-radius: 50%;
	background-color: #f97a46;
	left: 1.9rem;
	top: 1.4rem;
	color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: Poppins;
	font-size: 0.6rem;
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
	margin-left: 0.4rem;
}

.arrow-back-wrapper {
	height: 1.8rem;
	width: 1.6rem;
	margin-right: 0.8rem;
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
	background-color: #fff;
	font-size: 0.8rem;
}
</style>
