<template>
    <div class="container">
        <SearchBar :navigate-back="true" :results="true" />
    </div>
</template>

<script setup>
import SearchBar from '../components/Navigation/Searchbar.vue';
</script>

<style scoped></style>