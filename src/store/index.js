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
    deleteNote({ id }) {
        state.notes = state.notes.filter((n) => n.id !== id);
    },
    updateNote({ id, title, text }) {
        state.notes = state.notes.map((n) => {
            if (n.id === id) {
                return {
                    ...n,
                    updatedAt: new Date(),
                    title,
                    text,
                };
            }
            return n;
        });
    },
    updateLocalStorage() {
        //
    },
};

const actions = {
    createNote(payload) {
        methods.createNote(payload);
        methods.updateLocalStorage();
    },
    deleteNote(payload) {
        methods.deleteNote(payload);
        methods.updateLocalStorage();
    },
    updateNote(payload) {
        methods.updateNote(payload);
        methods.updateLocalStorage();
    },
};

const getters = {
    findNoteById(id) {
        if (state.notes.length === 0) {
            return;
        }

        return state.notes.find((note) => note.id === id);
    },
};

export default {
    state,
    methods,
    actions,
    getters,
};
