<template>
    <div class="modal-footer">
        <button
            type="button"
            class="btn btn-outline-primary"
            data-bs-dismiss="modal"
            @click="() => onClose()"
        >
            Close
        </button>
        <button @click="() => onSave()" type="button" class="btn btn-primary">
            Save changes
        </button>
    </div>
</template>

<script>
export default {
    props: {
        onClose: {
            type: Function,
            default: () => {},
        },
        onSave: {
            type: Function,
            default: () => {},
        },
    },
};
</script>

