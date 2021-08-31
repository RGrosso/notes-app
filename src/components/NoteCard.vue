<template>
    <div :id="`note-${note.id}`" class="card note-card">
        <div class="card-body">
            <h5 class="card-title">{{ note.title }}</h5>
            <p class="card-text">
                {{ note.text }}
            </p>
            <router-link
                :to="{ name: 'Edit Note', params: { id: note.id } }"
                custom
                v-slot="{ navigate }"
            >
                <IconBtn @click="navigate" iconName="edit" class="text-blue" />
            </router-link>
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