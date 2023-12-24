<template>
    <div class="container">
        <address-fields placeholder="Region" />
        <address-fields placeholder="Address" />
        <address-fields placeholder="House No." />
        <address-fields placeholder="Email" />
        <address-fields placeholder="Phone" />
        <confirm-button cancelroute="/billing" confirmroute="/billing" class="btn" />
    </div>
</template>

<script setup>
import AddressFields from '../../components/View Specific/Billing/Inputs.vue'
import ConfirmButton from '../../components/Buttons/ConfirmButton.vue';
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