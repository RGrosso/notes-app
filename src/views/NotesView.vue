<template>
    <div class="container">
        <div>
            <h1>Notes</h1>
            <router-link
                :to="{ name: 'New Note' }"
                custom
                v-slot="{ href, navigate }"
            >
                <a :href="href" @click="navigate" class="btn btn-primary mb-3">
                    Create note
                </a>
            </router-link>
            <div
                v-if="store.state.notes.length > 0"
                class="d-flex flex-gap mb-3"
            >
                <NoteCard
                    v-for="note in store.state.notes"
                    :key="note.id"
                    :note="note"
                />
            </div>
            <p v-else>You currently have no notes available.</p>

            <router-view v-slot="{ Component }">
                <BModal
                    :id="modalId"
                    :onClose="navigateToNotes"
                    :title="router.currentRoute.value.meta.title"
                >
                    <component
                        :is="Component"
                        :navigateBack="navigateToNotes"
                    />
                </BModal>
            </router-view>
        </div>
    </div>
</template>

<script>
import { inject, ref, onMounted, watch } from "vue";
import NoteCard from "@/components/NoteCard.vue";
import BModal from "@/components/BModal.vue";
import router from "@/router/index.js";
import { Modal } from "bootstrap";

export default {
    components: { NoteCard, BModal },
    setup() {
        const store = inject("store");
        const modalId = "notes-router-modal";
        const routerModal = ref(null);

        /**
         * Initialises the modal use Bootstrap Modal and checks if it needs to display
         */
        const initialiseModal = () => {
            routerModal.value = new Modal(document.getElementById(modalId));
            toggleRouterModal(
                router.currentRoute.value.meta.displayInNoteModal
            );
        };

        /**
         * Toggles if to show or hide the modal
         * @param show {Boolean} if show the modal
         */
        const toggleRouterModal = (show = false) => {
            if (show) {
                routerModal.value.show();
                return;
            }
            routerModal.value.hide();
        };

        /**
         * Navigate back to notes for when the router modal is closed
         */
        const navigateToNotes = () => {
            router.push({ name: "Notes" });
        };

        onMounted(initialiseModal);
        watch(
            () => router.currentRoute.value.meta.displayInNoteModal,
            (newValue) => toggleRouterModal(newValue)
        );

        return {
            store,
            modalId,
            toggleRouterModal,
            navigateToNotes,
            router,
        };
    },
};
</script>
