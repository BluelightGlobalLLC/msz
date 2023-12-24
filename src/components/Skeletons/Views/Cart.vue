<template>
	<div class="cart-skeleton">
		<parent height="20vh" width="94vw" tmargin="2vh" lmargin="1vw" bmargin="0.5rem" />
		<parent height="2rem" width="70vw" lmargin="1vw" bmargin="0.4rem" />
		<parent height="1.5rem" width="45vw" lmargin="1vw" bmargin="0.8rem" />
		<div class="flex">
			<span>
				<parent height="12rem" width="45vw" lmargin="1vw" bmargin="1vh" />
				<parent height="1.2rem" width="35vw" lmargin="1vw" bmargin="0.3rem" />
				<parent height="1.5rem" width="45vw" lmargin="1vw" />
			</span><span>
				<parent height="12rem" width="45vw" lmargin="1vw" bmargin="1vh" />
				<parent height="1.2rem" width="35vw" lmargin="1vw" bmargin="0.3rem" />
				<parent height="1.5rem" width="45vw" lmargin="1vw" />
			</span>
		</div>

		<div class="flex">
			<span>
				<parent height="12rem" width="45vw" lmargin="1vw" bmargin="1vh" />
				<parent height="1.2rem" width="35vw" lmargin="1vw" bmargin="0.3rem" />
				<parent height="1.5rem" width="45vw" lmargin="1vw" />
			</span><span>
				<parent height="12rem" width="45vw" lmargin="1vw" bmargin="1vh" />
				<parent height="1.2rem" width="35vw" lmargin="1vw" bmargin="0.3rem" />
				<parent height="1.5rem" width="45vw" lmargin="1vw" />
			</span>
		</div>
	</div>
</template>

<script setup>
import Parent from "../Parent.vue";
</script>

<style scoped>
.cart-skeleton {
	height: 100%;
	width: 100%;
	padding-left: 0.6rem;
}

.flex {
	display: flex;
	gap: 2vw;
	margin-bottom: 0.8rem;
}
</style>
