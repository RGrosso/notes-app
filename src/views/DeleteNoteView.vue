<template>
    <div>
        <div class="modal-body">
            <p>Are you sure you want to delete the following file?</p>
        </div>
        <BModalFooter
            :onClose="navigateBack"
            :onSubmit="onSubmit"
            submitBtnText="Delete"
            submitBtnVariant="danger"
        />
    </div>
</template>

<script>
import { inject } from "vue";
import router from "@/router/index.js";
import BModalFooter from "@/components/BModalFooter.vue";

export default {
    components: {
        BModalFooter,
    },
    props: {
        navigateBack: {
            type: Function,
            default: () => {},
        },
    },
    setup(props) {
        const store = inject("store");

        const onSubmit = () => {
            store.actions.deleteNote({
                id: router.currentRoute.value.params.id,
            });
            props.navigateBack();
        };

        return {
            onSubmit,
        };
    },
};
</script>
