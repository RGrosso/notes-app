<template>
    <div class="modal-footer">
        <button
            @click="() => onClose()"
            :class="`btn-${closeBtnVariant}`"
            class="btn"
            data-bs-dismiss="modal"
            type="button"
        >
            {{ closeBtnText }}
        </button>
        <button
            @click="() => onSubmit()"
            :class="`btn-${submitBtnVariant}`"
            class="btn btn-primary"
            type="button"
        >
            {{ submitBtnText }}
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
        onSubmit: {
            type: Function,
            default: () => {},
        },
        submitBtnText: {
            type: String,
            default: "Submit",
        },
        closeBtnText: {
            type: String,
            default: "Close",
        },
        submitBtnVariant: {
            type: String,
            default: "primary",
        },
        closeBtnVariant: {
            type: String,
            default: "outline-dark",
        },
    },
};
</script>

