<template>
    <div>
        <div class="modal-body">
            <div class="container">
                <div class="mb-3">
                    <label for="note-title" class="form-label">
                        Note Title
                    </label>
                    <input
                        v-model="form.title"
                        type="text"
                        class="form-control"
                        id="note-title"
                        placeholder="Note title"
                        :class="getValidationClass('title')"
                        @input="() => checkInputState('title')"
                    />
                </div>
                <div class="mb-3">
                    <label for="note-content" class="form-label">
                        Note Text
                    </label>
                    <textarea
                        v-model="form.text"
                        class="form-control"
                        id="note-content"
                        rows="3"
                        placeholder="Write your note here..."
                        :class="getValidationClass('text')"
                        @input="() => checkInputState('text')"
                    ></textarea>
                </div>
            </div>
        </div>
        <BModalFooter
            :onClose="navigateBack"
            :onSubmit="onSubmit"
            submitBtnText="Save changes"
        />
    </div>
</template>

<script>
import { reactive, inject } from "vue";
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
        const routerValue = router.currentRoute.value;
        const form = reactive({
            id: null,
            title: "",
            text: "",
        });
        const formState = reactive({
            title: {
                valid: false,
                dirty: false,
            },
            text: {
                valid: false,
                dirty: false,
            },
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

        /**
         * Updates the formState and returns if the input is valid
         */
        const validateRequiredInput = (name, setDirty = false) => {
            const formValid = Boolean(form[name]);

            // if the form has not been edited
            if (!formState[name].dirty || setDirty) {
                formState[name].dirty = true;
            }

            formState[name].valid = formValid;
            return formValid;
        };

        /**
         * Checks the input(s) state and returns if they are valid
         */
        const checkInputState = (name) => {
            if (name) {
                return validateRequiredInput(name);
            }

            const titleValid = validateRequiredInput("title", true);
            const textValid = validateRequiredInput("text", true);

            return titleValid && textValid;
        };

        const getValidationClass = (name) => {
            if (!formState[name].dirty) {
                return "";
            }
            return formState[name].valid ? "is-valid" : "is-invalid";
        };

        const onSubmit = () => {
            const inputError = !checkInputState();

            if (inputError) {
                return; // inputs handle invalid state
            }

            if (editingNote) {
                store.actions.updateNote(form);
            } else {
                store.actions.createNote(form);
            }

            props.navigateBack();
        };

        return {
            form,
            formState,
            onSubmit,
            checkInputState,
            getValidationClass,
        };
    },
};
</script>
