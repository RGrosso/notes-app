<template>
    <div>
        <TheHeader />
        <router-view />
    </div>
</template>

<script>
import { provide } from "vue";
import TheHeader from "@/components/TheHeader";
import store from "@/store";

export default {
    setup() {
        provide("store", store);
    },
    components: { TheHeader },
};
</script>