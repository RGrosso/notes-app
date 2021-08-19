import { reactive } from "vue";
import { v4 as uuid } from "uuid";

const state = reactive({
    notes: [
        {
            id: "12324",
            createdAt: "2021-08-19T18:48:19.427Z",
            updatedAt: "2021-08-19T18:48:19.427Z",
            title: "Title Example",
            text: "The note text goes here",
        },
    ],
});

const methods = {
    createNote({ title, text }) {
        let timestamp = new Date();
        let note = {
            id: uuid(),
            createdAt: timestamp,
            updatedAt: timestamp,
            title,
            text,
        };
        state.notes.push(note);
    },
    deleteNote(id) {
        state.notes = state.notes.filter((n) => n.id !== id);
    },
    updateNote() {
        //
    },
    updateLocalStorage() {
        //
    },
};

const actions = {
    createNote() {
        methods.createNote();
        methods.updateLocalStorage();
    },
    deleteNote(id) {
        methods.deleteNote(id);
        methods.updateLocalStorage();
    },
    updateNote() {
        methods.updateNote();
        methods.updateLocalStorage();
    },
};

export default {
    state: state,
    methods,
    actions,
};
