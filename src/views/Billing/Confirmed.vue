<template>
    <div class="container">
        <img src="../../assets/Misc/confirmed.gif" alt="Order Confirmed">
        <h1>Your Order Has Been Placed!</h1>
        <h2>Our representative will reach out to you shortly to confirm the order.</h2>
        <h3>Redirecting you back to Home in {{ seconds }}</h3>
    </div>
</template>

<script setup>
import { onActivated, onDeactivated, ref } from "vue"
import { useRouter } from "vue-router";

const router = useRouter()
const seconds = ref(8)

function countdownSeconds() {
    if (seconds.value != 1) {
        seconds.value = seconds.value - 1
    }
    else {
        clearInterval(redirectInterval);
        router.push('/')
    }
}

const redirectInterval = setInterval(countdownSeconds, 1000)
onActivated(() => { redirectInterval })
onDeactivated(() => { clearInterval(redirectInterval) })
</script>

<style scoped>
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