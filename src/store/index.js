import { reactive } from "vue";
import { v4 as uuid } from "uuid";

const state = reactive({
    notes: [],
});

const methods = {
    setNotes({ notes }) {
        state.notes = notes;
    },
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
        localStorage.setItem("notes", JSON.stringify(state.notes));
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
    getRecentNotesBy({ property = "createdAt", descending = true }) {
        const notes = [...state.notes].sort(function (a, b) {
            a = new Date(a[property]);
            b = new Date(b[property]);
            return a > b ? -1 : a < b ? 1 : 0;
        });

        if (descending) {
            return notes;
        }
        return notes.reverse();
    },
};

const initialiseNotes = () => {
    const notes = localStorage.getItem("notes");
    let userHasNotes = false;

    if (notes) {
        const parsedNotes = JSON.parse(notes);
        if (parsedNotes) {
            methods.setNotes({ notes: parsedNotes });
            userHasNotes = true;
        }
    }

    if (userHasNotes) {
        return;
    }

    actions.createNote({
        title: "Your first note",
        text: "Create, edit or delete notes",
    });
};

initialiseNotes();

export default {
    state,
    methods,
    actions,
    getters,
};
