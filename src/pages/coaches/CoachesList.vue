<template>
    <section>
        <base-card>
            <coach-filter @filter-coaches="setFilters"></coach-filter>
        </base-card>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline">Refresh</base-button>
                <base-button v-if="!isCoach" link to="/register">Register as coach</base-button>
            </div>
            <ul v-if="hasCoaches">
                <coach-item v-for="coach in filteredCoaches" :key="coach.id" :id="coach.id"
                    :first-name="coach.firstName" :last-name="coach.lastName" :rate="coach.hourlyRate"
                    :areas="coach.areas">
                </coach-item>
            </ul>
            <h3 v-else>No coaches found</h3>
        </base-card>
    </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
    components: {
        CoachItem,
        CoachFilter
    },
    data() {
        return {
            activeFilters: [],
            allCoaches: []
        };
    },
    computed: {
        filteredCoaches() {
            if (this.activeFilters.length === 0) {
                return this.allCoaches;
            }
            return this.allCoaches.filter(coach =>
                coach.areas.some(area => this.activeFilters.includes(area))
            );
        },
        hasCoaches() {
            return this.filteredCoaches.length > 0;
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        },
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        fetchCoaches() {
            this.allCoaches = this.$store.getters['coaches/coaches'];
        }
    },
    created() {
        this.fetchCoaches();
    }
};
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
</style>