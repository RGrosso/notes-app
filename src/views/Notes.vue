<template>
    <div class="container">
        <div>
            <h1>Notes</h1>
            <div v-if="store.state.notes.length > 0">
                <NoteCard
                    v-for="note in store.state.notes"
                    :key="note.id"
                    :note="note"
                />
            </div>
            <p v-else>You currently have no notes available.</p>
            <!-- TODO: Create a link to create a note -->
        </div>
        <router-view />
    </div>
</template>

<script>
import { inject } from "vue";
import NoteCard from "@/components/NoteCard.vue";

export default {
    components: { NoteCard },
    setup() {
        const store = inject("store");

        return {
            store,
        };
    },
};
</script>
