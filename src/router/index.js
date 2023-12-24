import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Product from "../views/Product.vue";
import Account from "../views/Account.vue";
import Cart from "../views/Cart.vue";
import Brands from "../views/Brands.vue";
import SignIn from "../views/SignIn/SignIn.vue";
import Whatsapp from "../views/SignIn/Whatsapp.vue";
import List from "../views/List.vue";
import Billing from "../views/Billing/Billing.vue";
import Address from "../views/Billing/Address.vue";
import Confirmed from "../views/Billing/Confirmed.vue";
import Search from "../views/Search.vue"

const routes = [
	{ path: "/", name: "Home", component: Home },
	{ path: "/signin", name: "SignIn", component: SignIn },
	{ path: "/signin/whatsapp", name: "Whatsapp", component: Whatsapp },
	{ path: "/product/:productId", name: "Product", component: Product },
	{ path: "/account", name: "Account", component: Account },
	{ path: "/cart", name: "Cart", component: Cart },
	{ path: "/search", name: "Search", component: Search },
	{ path: "/brands", name: "Brands", component: Brands },
	{ path: "/billing", name: "Billing", component: Billing },
	{ path: "/billing/address", name: "Address", component: Address },
	{ path: "/billing/confirmed", name: "Confirmed", component: Confirmed },
	{ path: "/list/:fetchaddress/:title", name: "List", component: List },
];

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
	scrollBehavior(to, from, savedPosition) {
		if (to.name == "Home") {
			return savedPosition;
		}
		if (to.hash) {
			return {
				el: to.hash,
				behavior: "smooth",
				top: 370,
			};
		}
		// scroll to top
		return { top: 0 };
	},
});

export default router;
