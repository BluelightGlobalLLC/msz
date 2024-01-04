<template>
	<div class="wrapper" dir="ltr">
		<Splide :options="{
			rewind: true,
			gap: '3rem',
			autoWidth: true,
			padding: '5rem',
			autoplay: true,
			lazyLoad: 'sequential',
			pauseOnHover: false,
			arrows: false,
			type: 'loop',
			pagination: false,
		}" class="scroll-container">
			<SplideSlide>
				<img src="https://theaxo.com/wp-content/uploads/2020/09/2020-09-24-15_25_43-Window.jpg" class="banner" />
			</SplideSlide>
			<SplideSlide>
				<img src="https://tmfmart.com/wp-content/uploads/2020/11/x3_banner.jpg" class="banner" />
			</SplideSlide>
			<SplideSlide>
				<img src="https://www.alezay.com/wp-content/uploads/2019/11/HUAWEI-Mate-30-Pro-5G-Series-Banner-Alezay.jpg"
					class="banner" />
			</SplideSlide>
			<SplideSlide>
				<img src="https://www.91-cdn.com/hub/wp-content/uploads/2022/04/Samsung-Galaxy-S22-Ultra-Epic-Green-Featured.jpg"
					class="banner" />
			</SplideSlide>
			<SplideSlide>
				<img src="https://i0.wp.com/store.ave.com.bn/wp-content/uploads/2021/10/iPhone-13-Banner.png"
					class="banner" />
			</SplideSlide>
			<SplideSlide>
				<img src="https://pbs.twimg.com/media/DZXxA8RVwAAv5Rs.jpg" class="banner" />
			</SplideSlide>
		</Splide>
	</div>
</template>

<script setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";
</script>

<style scoped>
.wrapper {
	width: 100%;
	height: 15rem;
	padding-top: 1.3rem;
	background-color: #f7f7f7;
}

.wrapper {
	/* Remove this with conditional classes for views other than category*/
	position: sticky;
	z-index: 10;
	top: calc(3.5rem + 3.063rem);
}

.banner {
	height: 42vw;
	width: auto;
	background-size: cover;
	background-color: #e0dfdf;
	margin-left: -2rem;
}
</style>
