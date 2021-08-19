<template>
    <div :id="`note-${note.id}`" class="card note-card">
        <div class="card-body">
            <h5 class="card-title">{{ note.title }}</h5>
            <p class="card-text">
                {{ note.text }}
            </p>
            <button
                class="text-red btn p-1"
                @click="actions.deleteNote(note.id)"
            >
                <i class="fas fa-trash text-red"></i>
            </button>
        </div>
    </div>
</template>

<script>
import { inject } from "vue";
export default {
    props: {
        note: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const { actions } = inject("store");

        return {
            actions,
        };
    },
};
</script>