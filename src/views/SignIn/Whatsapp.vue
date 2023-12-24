<template>
    <div class="container">

        <img src="../../assets/Intro/hero_2.png" class="hero-header" alt="header" />
        <div class="main-content">
            <h1 class="header">Sign In</h1>
            <div class="small-text">
                Sign in to access exclusive promotions and offers
            </div>

            <div class="wrapper" v-show="!phoneEntered">
                <form @submit.prevent="getOTP">
                    <input placeholder="WhatsApp No." type="tel" ref="whatsappNumber" class="number" required>
                    <div class="proceed-btn"><input type="submit" value="Get OTP"></div>
                </form>
                <h2 class="close-btn" @click="$router.push('/signin')">Sign In with Google Instead</h2>
            </div>

            <div class="wrapper" v-if="phoneEntered">
                <form @submit.prevent="verifyOTP">
                    <input placeholder="Enter OTP" type="tel" ref="recievedOTP" class="number" required>
                    <h4 v-if="errorOTP" class="error-msg">Incorrect OTP Entered!</h4>
                    <div class="proceed-btn"><input type="submit" value="Verify OTP"></div>
                </form>
                <h2 class="close-btn" @click="resendOTP">Resend OTP to Another Number</h2>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from "axios";
import { Preferences } from '@capacitor/preferences';

import { useRouter } from "vue-router";
import { useMainStore } from '../../store/useMainStore';

const main = useMainStore()
const router = useRouter();

const { login } = main

const whatsappNumber = ref('')
const recievedOTP = ref('')
const errorOTP = ref(false)
const phoneEntered = ref(false)

async function getOTP() {
    try {
        await axios.post(`https://api.jeswinsunsi.repl.co/v1/login/otp/${whatsappNumber.value.value}`);
        phoneEntered.value = true
    } catch (error) {
        console.error(error);
    }
}

async function verifyOTP() {
    let generatedOTP = whatsappNumber.value.value.slice(0, 1) + whatsappNumber.value.value.slice(2, 3) + whatsappNumber.value.value.slice(4, 5) + whatsappNumber.value.value.slice(6, 7)
    generatedOTP = Math.floor((generatedOTP * new Date().getUTCHours()) / 10);
    if (recievedOTP.value.value == generatedOTP) {
        login()
        await Preferences.set({
            key: 'isUserLoggedIn',
            value: 'true',
        });
        router.push('/')
    }
    else {
        errorOTP.value = true
    }
}

function resendOTP() {
    phoneEntered.value = false
}
</script>

<style scoped>
.container {
    width: 100%;
    font-family: Poppins;
}

.hero-header {
    max-width: 100%;
    min-width: 100%;
    height: auto;
}

.main-content {
    width: 100%;
    background-color: #ffffff;
    position: absolute;
    margin-top: -3.6rem;
    border-radius: 2rem 2rem 0px 0px;
    padding-left: 2.1rem;
    padding-right: 2rem;
    padding-top: 5.5rem;
}

.header {
    font-size: 1.9rem;
    font-weight: 700;
    color: #2a295a;
    margin-bottom: .9rem;
}

.small-text {
    width: 100%;
    font-size: 0.9rem;
    font-weight: 400;
    color: #657189;
    line-height: 1.3rem;
    margin-bottom: 2rem;
    width: 100%;
}

input[type=tel] {
    background-color: #ffffff;
    color: #6f6f6f;
    border: transparent;
    border-bottom: 1px #657189 solid;
    border-radius: 0;
    outline: none;
    height: 2rem;
    font-size: 0.8rem;
    font-weight: 400;
    width: 90%;
}

input[type=submit] {
    background-color: transparent;
    border: none;
    outline: none;
    padding: none;
    font-size: 0.8rem;
    font-weight: 400;
    color: #2a295a;
}

.error-msg {
    color: rgb(205, 56, 56);
}

.number {
    margin-bottom: 1rem;
}

.close-btn {
    color: #464d5b;
    font-size: 0.8rem;
    font-weight: 400;
    margin-top: 1.25rem;
    text-decoration: underline;
}

.proceed-btn {
    background-color: #eee;
    border-radius: 0.4rem;
    width: max-content;
    padding: 0.8rem;
    margin-bottom: 3rem;
}

h4 {
    margin-bottom: 1rem;
    font-size: 0.8rem;
}
</style>
