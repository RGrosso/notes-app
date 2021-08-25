<template>
    <div class="container">
        <div class="container">Note edit</div>
        <button @click="navigateBack">Go Back</button>
    </div>
</template>


<script>
import router from "@/router/index.js";

export default {
    created() {
        console.log("here");
    },
    methods: {
        navigateBack() {
            router.currentRoute.value.meta.onClose();
        },
    },
};
</script>
