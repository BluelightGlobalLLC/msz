<template>
	<div>
		<popup-settings v-show="isPopupShown" @click="togglePopup(false, false, false)" :setting="propSetting"
			:values="propValues" />
		<div class="wrapper">
			<h1 class="title" v-if="currentLanguage == 'en'">إعدادات</h1>
			<h1 class="title" v-if="currentLanguage == 'ar'"></h1>
			<div class="link">
				<img src="../../../assets/Links/language.svg" />
				<h2 class="name" v-if="currentLanguage == 'en'">Language</h2>
				<h2 class="name" v-if="currentLanguage == 'ar'">لغة</h2>
			</div>
			<div class="link">
				<img src="../../../assets/Links/notifications.svg" />
				<h2 class="name" v-if="currentLanguage == 'en'">Notifications</h2>
				<h2 class="name" v-if="currentLanguage == 'ar'">إشعارات</h2>
			</div>
			<div class="link"
				@click="togglePopup(true, 'vibrations', [['Enabled', isVibrationsEnabled ? 'selected' : ''], ['Disabled', !isVibrationsEnabled ? 'selected' : '']])">
				<img src="../../../assets/Links/vibrations.svg" />
				<h2 class="name" v-if="currentLanguage == 'en'">Vibrations</h2>
				<h2 class="name" v-if="currentLanguage == 'ar'">الاهتزازات</h2>
			</div>
			<h1 class="title" v-if="currentLanguage == 'en'" style="margin-top: 1.6rem">Customer Support</h1>
			<h1 class="title" v-if="currentLanguage == 'ar'" style="margin-top: 1.6rem">يدعم</h1>
			<div class="link">
				<img src="../../../assets/Links/contact.svg" />
				<a href="https://wa.me/91515555">
					<h2 class="name" v-if="currentLanguage == 'en'">Contact Us</h2>
					<h2 class="name" v-if="currentLanguage == 'en'">اتصل بنا</h2>
				</a>
			</div>
			<div class="link">
				<img src="../../../assets/Links/bug.svg" />
				<h2 class="name" v-if="currentLanguage == 'en'">Report a Bug</h2>
				<h2 class="name" v-if="currentLanguage == 'ar'">الإبلاغ عن خطأ</h2>
			</div>
			<div class="link">
				<img src="../../../assets/Links/faqs.svg" />
				<h2 class="name" v-if="currentLanguage == 'en'">FAQs</h2>
				<h2 class="name" v-if="currentLanguage == 'ar'">الأسئلة الشائعة</h2>
			</div>

			<h1 class="title" style="margin-top: 1.6rem" v-if="currentLanguage == 'en'">About Us</h1>
			<h1 class="title" style="margin-top: 1.6rem" v-if="currentLanguage == 'ar'">معلومات عنا</h1>
			<div class="link">
				<img src="../../../assets/Links/outlets.svg" />
				<a href="https://wa.me/91515555?text=Hey! Where are your stores located?">
					<h2 class="name" v-if="currentLanguage == 'en'">Store Locations</h2>
					<h2 class="name" v-if="currentLanguage == 'ar'">مواقع المتجر</h2>
				</a>
			</div>

			<h1 class="title" style="margin-top: 1.6rem" v-if="currentLanguage == 'en'">Socials</h1>
			<h1 class="title" style="margin-top: 1.6rem" v-if="currentLanguage == 'ar'">اتصل بنا</h1>
			<div class="link">
				<img src="../../../assets/Links/instagram.svg" />
				<a href="instagram://user?username=msouq_om">
					<h2 class="name" v-if="currentLanguage == 'en'">Instagram</h2>
					<h2 class="name" v-if="currentLanguage == 'ar'">انستغرام</h2>
				</a>
			</div>
			<div class="link">
				<img src="../../../assets/Links/facebook.svg" />
				<a href="https://www.facebook.com/msouqglobal">
					<h2 class="name" v-if="currentLanguage == 'en'">Facebook</h2>
					<h2 class="name" v-if="currentLanguage == 'ar'">فيسبوك</h2>
				</a>
			</div>
			<div class="link">
				<img src="../../../assets/Links/whatsapp.svg" />
				<a href="https://wa.me/91515555">
					<h2 class="name" v-if="currentLanguage == 'en'">WhatsApp</h2>
					<h2 class="name" v-if="currentLanguage == 'ar'">واتس اب</h2>
				</a>
			</div>
		</div>
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useMainStore } from '../../../store/useMainStore';
import PopupSettings from '../../Popups/PopupSettings.vue';
import { useRouter } from 'vue-router';


const router = useRouter()
const main = useMainStore()
const { isVibrationsEnabled, currentLanguage } = storeToRefs(main)

const propValues = ref(null)
const propSetting = ref(null)
const isPopupShown = ref(false)
function togglePopup(boolValue, component, values) {
	propSetting.value = component
	propValues.value = values
	isPopupShown.value = boolValue
}
</script>

<style scoped>
.wrapper {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: max-content;
	font-family: Poppins;
	padding-left: 0.8rem;
	padding-right: 0.8rem;
	padding-top: 0.7rem;
	color: #2b2b2f;
}

.title {
	font-weight: 600;
	font-size: 1rem;
	margin-bottom: 1rem;
}

.link {
	display: flex;
	align-items: center;
	font-weight: 400;
	font-family: Poppins;
	font-size: 0.9rem;
	color: #1b1b1b;
	margin-bottom: 1rem;
}

.link img {
	height: 1.2rem;
	width: 1.2rem;
	margin-right: 0.4rem;
	margin-left: 0.4rem;
}

a {
	color: inherit;
}
</style>
