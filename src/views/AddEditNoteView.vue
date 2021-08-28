<template>
    <div>
        <div class="modal-body">
            <div class="container">
                <div class="mb-3">
                    <label for="note-title" class="form-label"
                        >Note Title</label
                    >
                    <input
                        v-model="form.title"
                        type="text"
                        class="form-control"
                        id="note-title"
                        placeholder="Note title"
                    />
                </div>
                <div class="mb-3">
                    <label for="note-content" class="form-label"
                        >Note Text</label
                    >
                    <textarea
                        v-model="form.text"
                        class="form-control"
                        id="note-content"
                        rows="3"
                        placeholder="Write your note here..."
                    ></textarea>
                </div>
            </div>
        </div>
        <BModalFooter :onClose="onClose" :onSave="onSubmit" />
    </div>
</template>

<script>
import { reactive, inject } from "vue";
import { v4 as uuid } from "uuid";
import router from "@/router/index.js";
import BModalFooter from "@/components/BModalFooter.vue";

export default {
    components: {
        BModalFooter,
    },
    props: {
        onClose: {
            type: Function,
            default: () => {},
        },
    },
    setup() {
        const store = inject("store");
        const routerValue = router.currentRoute.value;
        const form = reactive({
            id: null,
            updatedAt: null,
            title: "",
            text: "",
        });
        let editingNote = false;

        // if edit note, get current note
        if (routerValue.name === "Edit Note") {
            const noteData = store.getters.findNoteById(routerValue.params.id);

            // if a note exists with the id
            if (noteData) {
                form.id = noteData.id;
                form.title = noteData.title;
                form.text = noteData.text;
                editingNote = true;
            }
        }

        // if the form (note) does not have an id then it is new and requires one
        if (form.id === null) {
            form.id = uuid();
        }

        const onSubmit = () => {
            console.log("form", form);
            form.updatedAt = new Date();

            if (editingNote) {
                // store edit note
                return;
            }

            // store create note
        };

        return {
            form,
            onSubmit,
        };
    },
};
</script>
