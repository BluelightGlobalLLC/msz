<template>
    <parent-popup>
        <div class="settings-wrapper">
            <div v-for="value in props.values" :key="value" class="item" :class="{ 'selected': value[1] }"
                @click="toggleSettings(value[0])">
                {{ value[0] }}
            </div>
        </div>
    </parent-popup>
</template>

<script setup>
import ParentPopup from "./ParentPopup.vue";
import { useMainStore } from '../../store/useMainStore';

const props = defineProps({
    "setting": { type: [String, Boolean] },
    "values": { type: [Array, Boolean] }
})

const main = useMainStore()
const { toggleVibrations } = main

function toggleSettings(value) {
    switch (props.setting) {
        case "vibrations":
            toggleVibrations(value)
    }

}
</script>

<style scoped>
.item {
    height: 2.3rem;
    width: 15rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    padding-left: 0.6rem;
    border-radius: 0.5rem;
}

.settings-wrapper {
    display: flex;
    flex-direction: column;
    font-family: Poppins;
    font-size: 0.8rem;
}

.selected {
    background-color: #FB803B;
    color: #ffffff;
}
</style>