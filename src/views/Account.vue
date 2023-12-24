<template>
	<div class="container">
		<search-bar :navigate-back="false" @click="$router.push('/search')" />
		<banner-static :rem="-3" :height="43" num="3" />
		<action-buttons :rem="2" />
		<div class="blank"></div>
		<customer-care :rem="0.8" />
		<div class="white-box">
			<product-scroll :rem="0" num="1" />
		</div>
		<div class="white-box">
			<settings />
		</div>
		<div class="white-box">
			<Footer />
		</div>
	</div>
</template>

<script setup>
import BannerStatic from "../components/Banners/Static.vue";
import SearchBar from "../components/Navigation/Searchbar.vue";
import ActionButtons from "../components/View Specific/Account/ActionButtons.vue";
import Footer from "../components/View Specific/Account/Footer.vue";
import CustomerCare from "../components/View Specific/Account/CustomerCare.vue";
import ProductScroll from "../components/Scrolls/Product.vue";
import Settings from "../components/View Specific/Account/Settings.vue";
</script>

<style scoped>
.container {
	width: 100%;
	background-color: #f1f1f1;
	padding-bottom: 1rem;
}

.blank {
	/* Since "ActionButtons" has position absolute on it, it breaks the normal element flow and it's :rem property has no impact on the element below it, which is why we need this buffer element. Otherwise, "CustomerCare" would appear right behind "ActionButtons"*/
	height: 7.1rem;
	width: 100%;
}

.white-box {
	width: 100%;
	height: max-content;
	background-color: #fff;
	padding: 1rem 0rem;
	margin-bottom: 0.8rem;
}
</style>
