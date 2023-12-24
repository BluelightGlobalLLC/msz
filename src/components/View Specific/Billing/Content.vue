<template>
	<div class="wrapper">
		<h2 class="heading">Items</h2>
		<div v-for="item in billing.items" :key="item" class="item-wrapper">
			<h3 class="item-name">{{ item[0] }} {{ item[2] }}</h3>
			<h4 class="item-price">OMR {{ item[1] }} VAT Inclusive</h4>
		</div>
		<div class="line"></div>
		<h2 class="heading">Shipping Address</h2>
		<div class="item-wrapper">
			<!--<h4 v-for="item in 3" :key="item" class="address">Dar Al Zain, As' Seeb</h4>-->
			<h4 class="address" v-if="address.Address">{{ address.Address }}</h4>
			<h4 class="address" v-if="address['House No.']">House No. {{ address["House No."] }}, {{ address.Region
			}}</h4>
			<h4 class="address" v-if="address.Email">{{ address.Email }}</h4>
			<h4 class="address" v-if="address.Phone">Contact: {{ address.Phone }}</h4>
			<h4 class="address" v-if="!address.Address">No Shipping Addresses Found</h4>
			<h4 class="new-address" @click="$router.push('/billing/address')">Add a <span class="orange">new Shipping
					Address</span></h4>
		</div>
		<div class="line"></div>
		<div class="prices">
			<div class="row">
				<h4 class="item-price">Subtotal</h4>
				<h4 class="item-price">OMR {{ billing.subtotal }}</h4>
			</div>
			<div class="row">
				<h4 class="item-price">Shipping Fee</h4>
				<h4 class="item-price">{{ billing.shipping }}</h4>
			</div>
			<div class="row">
				<h4 class="item-price">Taxes</h4>
				<h4 class="item-price">OMR {{ billing.subtotal * 5 / 100 }}</h4>
			</div>
			<div class="row">
				<h4 class="total-price">Total Due</h4>
				<h4 class="total-price">OMR {{ billing.total }}</h4>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useMainStore } from "../../../store/useMainStore";
import { storeToRefs } from "pinia";


const main = useMainStore();
const { billing, address } = storeToRefs(main);




</script>

<style scoped>
.wrapper {
	font-family: Poppins;
	margin-bottom: 3rem;
}

.heading {
	font-weight: 600;
	font-size: 1.1rem;
	color: #363636;
}

.item-wrapper {
	font-family: Poppins;
	width: 70%;
	/* TODO CHANGE TO 80% */
	margin-top: 2rem;
}

.item-name {
	line-height: 1.7rem;
	color: #4f4f4f;
	font-weight: 500;
	font-size: 1.1rem;
	margin-bottom: 0.6rem;
}

.item-price {
	color: #7F8A9C;
	font-weight: 400;
	font-size: 0.9rem;
}

.address {
	color: #7F8A9C;
	font-weight: 400;
	font-size: 0.9rem;
	margin-bottom: 0.5rem;
}

.line {
	height: 0.05rem;
	width: calc(100% - 0.5rem);
	margin-left: 0.25rem;
	margin-right: 0.25rem;
	border-radius: 0.2rem;
	background-color: #C2C2C2;
	margin-top: 1.95rem;
	margin-bottom: 2.3rem;
}

.orange {
	color: #D11B1B;
	font-weight: 600;
}

.new-address {
	color: #7F8A9C;
	font-weight: 400;
	font-size: 0.9rem;
	margin-top: 1rem;
}

.prices {
	width: 100%;
}

.row {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 0.5rem;
}

.total-price {
	color: #363636;
	font-weight: 600;
	font-size: 1.2rem;
	margin-top: 0.8rem;
}
</style>
