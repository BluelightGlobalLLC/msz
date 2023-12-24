<template>
	<div class="container">
		<slot />
	</div>
</template>

<script setup></script>

<style scoped>
.container {
	width: 100%;
	height: 4.5rem;
	background-color: #ffffff;
	bottom: 0rem;
	right: 0;
	position: fixed;
	padding-left: 0.8rem;
	padding-right: 0.8rem;
	padding-top: 0.625rem;
	box-shadow: 0px -4px 4px rgba(139, 139, 139, 0.1);
	z-index: 10;
	display: flex;
	justify-content: center;
}
</style>
