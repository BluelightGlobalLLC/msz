import { storeToRefs } from "pinia";
import { onMounted, onDeactivated, watch, onActivated } from "vue";
import { useMainStore } from "../store/useMainStore";

// DEPRECATED FUNCTION - HIDES AND UNHIDES NAV ON SCROLL
export function useHideNav() {
	const main = useMainStore();
	const { changeCurrentScrollDirection } = main;
	const { currentScrollDirection } = storeToRefs(main);

	function scrollDirection() {
		const scrollY = window.scrollY;
		if (scrollY > this.startY + 25 && currentScrollDirection.value == false && this.startY != 0) {
			changeCurrentScrollDirection(true); // if scrolled down
		} else if (scrollY < this.startY - 10 && currentScrollDirection.value == true) {
			changeCurrentScrollDirection(false); // if scrolled up
		}
		this.startY = scrollY;
	}

	onActivated(() => {
		window.addEventListener("scroll", scrollDirection);
	});

	onDeactivated(() => {
		window.removeEventListener("scroll", scrollDirection);
	});
}

export function usePopup() {
	const main = useMainStore();
	const { togglePopupState } = main;
	const { currentPopupState } = storeToRefs(main);

	onMounted(() => {
		watch(currentPopupState, (value) => {
			if (value) {
				togglePopupState(true);
				setTimeout(() => {
					togglePopupState(false);
				}, 1800);
			}
		});
	});
}
