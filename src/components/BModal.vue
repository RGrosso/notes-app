<template>
    <div
        class="modal fade"
        :id="id"
        tabindex="-1"
        :aria-labelledby="`${id}Label`"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 v-if="title" class="modal-title" :id="`${id}Label`">
                        {{ title }}
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        @click="() => onClose()"
                    ></button>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            default: "",
        },
        onClose: {
            type: Function,
            default: () => {},
        },
    },
};
</script>

