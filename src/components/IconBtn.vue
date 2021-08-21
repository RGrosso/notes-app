<template>
    <button class="btn p-1">
        <i :class="`fas fa-${iconName}`"></i>
    </button>
</template>

<script>
export default {
    props: {
        iconName: {
            type: String,
            required: true,
        },
    },
};
</script>
