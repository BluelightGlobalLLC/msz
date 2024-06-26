import { defineStore } from "pinia";
import axios from "axios";
import { Preferences } from '@capacitor/preferences';

export const useMainStore = defineStore("main", {
	state: () => ({
		currentScrollDirection: false,
		currentLanguage: "en",
		currentPopupState: false,
		hasViewLoaded: { home: false, cart: false },
		isVibrationsEnabled: true,
		cartItems: [],
		likedItems: [],
		historyItems: [],
		categories: [],
		brands: [],
		address: { Region: "", Address: "", "House No.": "", Email: "", Phone: "" },
		billing: { "total": 0, "subtotal": 0, "shipping": 0, "items": [] },
		isUserLoggedIn: false
	}),
	actions: {
		changeCurrentScrollDirection(newDirection) {
			this.currentScrollDirection = newDirection;
		},
		changeCurrentLanguage(newLanguage) {
			this.currentLanguage = newLanguage;
		},
		login() {
			this.isUserLoggedIn = true;
		},
		togglePopupState(stateBool) {
			this.currentPopupState = stateBool;
		},
		toggleVibrations(value = true) {
			if (value == "Enabled") {
				this.isVibrationsEnabled = true
			}
			else if (value == "Disabled") {
				this.isVibrationsEnabled = false
			}
		},
		async addCartItem(itemID) {
			this.cartItems.push(itemID);
			await Preferences.set({
				key: 'cartItems',
				value: JSON.stringify(this.cartItems),
			});
		},
		async removeCartItem(itemID) {
			this.cartItems.splice(this.cartItems.indexOf(itemID), 1);
			for (let index = 0; index < this.billing.items.length; index++) {
				console.log(this.billing.items[index][3]);
				if (this.billing.items[index][3] == itemID[0]) {
					this.billing.items.splice(index, 1)
				}
			}
			await Preferences.set({
				key: 'cartItems',
				value: JSON.stringify(this.cartItems),
			});
		},
		toggleViewLoaded(view) {
			switch (view) {
				case "home":
					this.hasViewLoaded.home = true;
					break;
				case "cart":
					this.hasViewLoaded.cart = true;
					break;
			}
		},
		addHistoryItem(itemID) {
			this.historyItems.push(itemID);
			let arrayLength = this.historyItems.length;
			if (arrayLength > 9) {
				this.historyItems.splice(0, arrayLength - 10);
			}
		},
		async addLikedItem(itemID) {
			this.likedItems.push(itemID);
			await Preferences.set({
				key: 'likedItems',
				value: JSON.stringify(this.likedItems),
			});
		},
		async removeLikedItem(itemID) {
			for (let element = 0; element < this.likedItems.length; element++) {
				if (this.likedItems[element].productId === itemID) {
					this.likedItems.splice(this.likedItems.indexOf(this.likedItems[element]));
				}
			}
			await Preferences.set({
				key: 'likedItems',
				value: JSON.stringify(this.likedItems),
			});
		},
		async addToAddress(field, value) {
			switch (field) {
				case "منطقة":
					field = "Region";
					break;
				case "عنوان":
					field = "Address";
					break;
				case "رقم المنزل":
					field = "House No.";
					break;
				case "بريد إلكتروني":
					field = "Email";
					break;
				case "رقم التليفون":
					field = "Phone";
					break;
			}

			this.address[field] = value
			await Preferences.set({
				key: field,
				value: value,
			});
		},
		generateBilling(field, value) {
			if (field === "items") {
				this.billing.items.push(value)
			}
			else {
				this.billing[field] = value
			}
		},
		clearCartItems() {
			this.cartItems = [];
			this.billing = { "total": 0, "subtotal": 0, "shipping": 0, "items": [] };
		},
		async fetchCategories() {
			try {
				const response = await axios.get(`https://ff135741-e6c5-4504-bbd8-4006a68674ff-00-1joqn986eucll.sisko.replit.dev/v1/${this.currentLanguage}/categories`);
				this.categories = response.data
			} catch (error) {
				console.error(error);
			}
		},
		async fetchBrands(category) {
			try {
				const response = await axios.get(`https://ff135741-e6c5-4504-bbd8-4006a68674ff-00-1joqn986eucll.sisko.replit.dev/v1/${this.currentLanguage}/brands/${category.toLowerCase()}`);
				this.brands = response.data
			} catch (error) {
				console.error(error);
			}
		},
	},
	persist: {
		paths: ['currentScrollDirection', 'currentLanguage', 'currentPopupState', 'hasViewLoaded', 'isVibrationsEnabled', 'cartItems', 'likedItems', 'historyItems', 'categories', 'brands', 'address']
	},
});

// If you need to process data before returning it use getters: {}
