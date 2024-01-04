<template>
    <div class="addr-wrapper">
        <div class="input-wrapper">
            <input type="text" class="input-field" :placeholder="props.placeholder" v-model="data">
        </div>
    </div>
</template>

<script setup>
import { onDeactivated, ref } from "vue";
import { useMainStore } from "../../../store/useMainStore";

const props = defineProps({
    placeholder: { type: String }
})

const main = useMainStore();
const { addToAddress } = main

const data = ref("")
onDeactivated(() => addToAddress(props.placeholder, data.value))
</script>

<style scoped>
.addr-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.input-wrapper {
    margin-bottom: 1rem;
    border: 1px solid #c2c2c2;
    border-radius: 0.5rem;
    display: flex;
    height: 3.5rem;
    justify-content: center;
    align-items: center;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
}

.input-field {
    background-color: transparent;
    border: 0px;
    border-radius: 0;
    width: 100%;
    font-family: Poppins;
    font-weight: 400;
    color: #484848;
    font-size: 1rem;
}

textarea:focus,
input:focus {
    outline: none;
}
</style>