<template>
	<div class="wrapper">
		<div class="flex-wrapper">
			<div v-for="brand in brands" :key="brand" class="ordered-categories">
				<div :id="brand[0]" class="first-letter">{{ brand[0] }}</div>
				<div class="brands">
					<h1 v-for="name in brand[1]" :key="name" class="brand-name"
						@click="$router.push(`/list/stock/${name}`)">
						{{ name }}
					</h1>
				</div>
			</div>
		</div>
		<div class="letter-navigation">
			<router-link v-for="alphabet in brands" :key="alphabet[0]" :to="`/brands#${alphabet[0]}`"
				@click="setColoredAlphabet(alphabet[0])">
				<h1 class="alphabets" :class="{ clickedAlphabet: clickedAlphabet == alphabet[0] }">
					{{ alphabet[0] }}
				</h1>
			</router-link>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useMainStore } from "../../../store/useMainStore"
import { storeToRefs } from "pinia";

const main = useMainStore()
const { brands } = storeToRefs(main);

const clickedAlphabet = ref("A");
function setColoredAlphabet(alphabet) {
	clickedAlphabet.value = alphabet;
}
</script>

<style scoped>
.clickedAlphabet {
	color: #ff0e0e;
	font-weight: 600;
}

.wrapper {
	width: 100%;
	background: #ffffff;
	display: flex;
	padding: 1.5rem;
	font-family: Poppins;
	color: #131212;
	padding-bottom: 3.5rem;
	padding-top: calc(5rem);
	justify-content: space-between;
	scroll-behavior: smooth !important;
}

.flex-wrapper {
	display: flex;
	flex-direction: column;
}

.first-letter {
	width: 3.5rem;
	font-size: 1rem;
	font-weight: 600;
}

.brands {
	flex-grow: 1;
	font-size: 0.8rem;
	font-weight: 500;
}

.brand-name {
	padding-bottom: 0.7rem;
}

.alphabets {
	padding-bottom: 0.4rem;
	font-size: 0.7rem;
}

.ordered-categories {
	display: flex;
	flex-direction: row;
	margin-bottom: 1rem;
}

a {
	color: #131212;
}
</style>
