<template>
	<div class="btn-wrapper">
		<div class="cancel-btn" @click="$router.push(props.cancelroute)">
			<h1 v-if="currentLanguage == 'en'" class="btn-text">Cancel</h1>
			<h1 v-if="currentLanguage == 'ar'" class="btn-text">إلغاء</h1>
		</div>

		<div class="confirm-btn" @click="$router.push(props.confirmroute)">
			<h1 v-if="currentLanguage == 'en'" class="btn-text">Confirm</h1>
			<h1 v-if="currentLanguage == 'ar'" class="btn-text">يتأكد</h1>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	confirmroute: { type: String },
	cancelroute: { type: String }
})
import { useMainStore } from "../../store/useMainStore"
import { storeToRefs } from "pinia";
const main = useMainStore()
const { currentLanguage } = storeToRefs(main)
</script>

<style scoped>
.btn-wrapper {
	display: flex;
	margin-bottom: 5rem;
}

.btn-text {
	font-family: "Poppins";
	font-style: normal;
	font-weight: 600;
	font-size: 0.98rem;
	line-height: 1.688rem;
}

.confirm-btn {
	width: 100%;
	height: 3.2rem;
	border-radius: 0.4rem;
	background-color: #F97A46;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 0.4rem;
	color: #ffffff;
}

.cancel-btn {
	width: 100%;
	height: 3.2rem;
	border-radius: 0.4rem;
	border: 0.1rem #C2C2C2 solid;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 0.4rem;
	color: #898989;
}
</style>