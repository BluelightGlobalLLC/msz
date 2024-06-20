<template>
    <div class="container">
        <address-fields v-if="currentLanguage == 'ar'" placeholder="منطقة" />
        <address-fields v-if="currentLanguage == 'ar'" placeholder="عنوان" />
        <address-fields v-if="currentLanguage == 'ar'" placeholder="رقم المنزل" />
        <address-fields v-if="currentLanguage == 'ar'" placeholder="بريد إلكتروني" />
        <address-fields v-if="currentLanguage == 'ar'" placeholder="رقم التليفون" />
        <address-fields v-if="currentLanguage == 'en'" placeholder="Region" />
        <address-fields v-if="currentLanguage == 'en'" placeholder="Address" />
        <address-fields v-if="currentLanguage == 'en'" placeholder="House No." />
        <address-fields v-if="currentLanguage == 'en'" placeholder="Email" />
        <address-fields v-if="currentLanguage == 'en'" placeholder="Phone" />
        <confirm-button cancelroute="/billing" confirmroute="/billing" class="btn" />
    </div>
</template>

<script setup>
import AddressFields from '../../components/View Specific/Billing/Inputs.vue'
import ConfirmButton from '../../components/Buttons/ConfirmButton.vue';

import { useMainStore } from "../../store/useMainStore";
import { storeToRefs } from "pinia";


const main = useMainStore();
const { currentLanguage } = storeToRefs(main);
</script>

<style scoped>
.container {
    padding: 1rem;
    padding-top: 2rem;
}

.btn {
    margin-top: 3rem;
}
</style>