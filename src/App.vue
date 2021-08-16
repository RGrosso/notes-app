<template>
    <div>
        <TheHeader />
        <router-view />
    </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";

export default {
    components: { TheHeader },
};
</script>