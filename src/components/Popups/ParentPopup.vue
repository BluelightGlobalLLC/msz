<template>
	<div class="popup">
		<div class="inner-popup">
			<slot />
		</div>
	</div>
</template>

<script setup></script>

<style scoped>
.popup {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1001;
	background-color: rgba(0, 0, 0, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
}

.inner-popup {
	background: #ffffff;
	padding: 1.1rem;
	font-size: 0.7rem;
	font-family: Poppins;
	font-weight: 500;
	color: #404040;
	border-radius: 0.625rem;
	display: flex;
	align-items: center;
}
</style>
