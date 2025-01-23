<template>
    <section>
        <base-card>
            <h2>Filter Coach</h2>
            <span v-for="area in getAreas()" :key="area" class="filter-option">
                <input type="checkbox" :id="area" :value="area" v-model="selectedAreas[area]" checked @change="setFilter">
                <label :for="area">{{ area }}</label>
            </span>
        </base-card>
    </section>
</template>

<script>

export default {
    emits: ['filter-coaches'],
    data() {
        return {
            selectedAreas: {}
        };
    },
    computed: {
    },
    methods: {
        getAreas() {
            return this.$store.getters['coaches/getCoachAreas'];
        },
        setFilter(event) {
            const inputId = event.target.id;
            const isChecked = event.target.checked;
            this.selectedAreas[inputId] = isChecked;
            const activeFilters = Object.keys(this.selectedAreas).filter(area => this.selectedAreas[area]);
            console.log(activeFilters);
            this.$emit('filter-coaches', activeFilters);
        }
    },
    created() {
        const areas = this.getAreas();
        const initialFilters = {};
        areas.forEach(area => {
            initialFilters[area] = true;
        });
        this.selectedAreas = initialFilters;
    }
};
</script>

<style scoped>
h2 {
    margin: 0.5rem 0;
}

.filter-option {
    margin-right: 1rem;
}

.filter-option label,
.filter-option input {
    vertical-align: middle;
}

.filter-option label {
    margin-left: 0.25rem;
}

.filter-option.active label {
    font-weight: bold;
}
</style>