<template>
    <div :id="`note-${note.id}`" class="card note-card">
        <div class="card-body">
            <h5 class="card-title">{{ note.title }}</h5>
            <p class="card-text">
                {{ note.text }}
            </p>
            <IconBtn
                @click="actions.deleteNote({ id: note.id })"
                iconName="trash"
                class="text-red"
            />
        </div>
    </div>
</template>

<script>
import { inject } from "vue";
import IconBtn from "@/components/IconBtn.vue";
export default {
    props: {
        note: {
            type: Object,
            required: true,
        },
    },
    components: { IconBtn },
    setup() {
        const { actions } = inject("store");

        return {
            actions,
        };
    },
};
</script>