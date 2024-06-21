<template>
    <div class="alert" v-if="isVisible">
        <span class="alert-wrapper" v-if="currentLanguage == 'en'">
            <h1 class="alert-text">You are viewing M Souq in English. </h1>
            <span class="alert-flex">
                <h1 class="alert-text" @click="changeLanguage('ar')">العربية</h1>
                <img src="../../../assets/Misc/quit.png" @click="isVisible = false">
            </span>
        </span>
        <span class="alert-wrapper" v-if="currentLanguage == 'ar'">
            <h1 class="alert-text">أنت تستخدم M SOUQ باللغة العربية. </h1>
            <span class="alert-flex">
                <h1 class="alert-text" @click="changeLanguage('en')">English</h1>
                <img src="../../../assets/Misc/quit.png" @click="isVisible = false"
                    style="margin-right: 0.5rem; margin-left: 0.5rem;">
            </span>
        </span>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useMainStore } from "../../../store/useMainStore.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const main = useMainStore();
const { currentLanguage } = storeToRefs(main);
const { changeCurrentLanguage } = main;

let isVisible = ref(true);

function changeLanguage(language) {
    changeCurrentLanguage(language);
    router.go();

}

</script>

<style scoped>
.alert {
    height: 2rem;
    width: 100%;
    margin-bottom: 0.3rem;
    display: flex;
    justify-content: center;
    font-family: Poppins;
    font-size: 0.7rem;
}

.alert-wrapper {
    height: 2rem;
    width: 95%;
    background-color: #d5f8ff;
    display: flex;
    border-radius: 0.25rem;
    padding: 0rem 1rem;
    align-items: center;
    justify-content: space-between;
}

.alert img {
    height: 1rem;
    width: auto;
    margin-left: 1rem;
}

.alert-flex {
    display: flex;
    align-items: center;
    text-decoration: underline;
    font-weight: 500;
}
</style>