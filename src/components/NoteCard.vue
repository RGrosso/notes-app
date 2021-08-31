<template>
    <div :id="`note-${note.id}`" class="col-3">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ note.title }}</h5>
                <p class="card-text">
                    {{ note.text }}
                </p>
                <div class="d-flex justify-content-end">
                    <router-link
                        :to="mapTo('Edit Note')"
                        v-slot="{ navigate }"
                        custom
                    >
                        <IconBtn
                            @click="navigate"
                            iconName="edit"
                            class="text-blue"
                        />
                    </router-link>
                    <router-link
                        :to="mapTo('Delete Note')"
                        v-slot="{ navigate }"
                        custom
                    >
                        <IconBtn
                            @click="navigate"
                            iconName="trash"
                            class="text-red"
                        />
                    </router-link>
                </div>
            </div>
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
    setup(props) {
        const { actions } = inject("store");

        const mapTo = (name) => ({ name, params: { id: props.note.id } });

        return {
            actions,
            mapTo,
        };
    },
};
</script>