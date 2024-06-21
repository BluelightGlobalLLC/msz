<template>
    <div class="container">
        <img src="../../assets/Misc/confirmed.gif" alt="Order Confirmed">
        <h1 v-if="currentLanguage == 'en'">Your Order Has Been Placed!</h1>
        <h2 v-if="currentLanguage == 'en'">Our representative will reach out to you shortly to confirm the order.</h2>
        <h3 v-if="currentLanguage == 'en'" class="underlined" @click="$router.push('/')">Continue Browsing</h3>
        <h1 v-if="currentLanguage == 'ar'">وقد وضعت طلبك</h1>
        <h2 v-if="currentLanguage == 'ar'">سوف يقوم M.Souq بالاتصال بك قريبا</h2>
        <h3 v-if="currentLanguage == 'ar'" class="underlined" @click="$router.push('/')">Continue Browsing</h3>
    </div>
</template>

<script setup>
import { useMainStore } from "../../store/useMainStore";
import { storeToRefs } from "pinia";

const main = useMainStore();
const { currentLanguage } = storeToRefs(main);
</script>

<style scoped>
.underlined {
    text-decoration: underline;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Poppins;
    padding: 30% 3rem;
    flex-direction: column;
    text-align: center;
}

img {
    height: 10rem;
    width: auto;
}

h1 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

h2 {
    font-size: 0.9rem;
    line-height: 1.3rem;
    color: #7F8A9C;
    margin-bottom: 4rem;
}

h3 {
    color: #242424;
    font-weight: 300;
}
</style>