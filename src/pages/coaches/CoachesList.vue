<template>
    <section>
        <base-card>
            <coach-filter @filter-coaches="setFilters"></coach-filter>
        </base-card>
    </section>
    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" @click="fetchCoaches">Refresh</base-button>
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
        };
    },
    computed: {
        allCoaches() {
            return this.$store.getters['coaches/coaches'];
        },
        filteredCoaches() {
            if (this.activeFilters.length === 0) {
                return this.allCoaches;
            }
            return this.allCoaches.filter(coach =>
                coach.areas.some(area => this.activeFilters.includes(area))
            );
        },
        hasCoaches() {
            return this.$store.getters['coaches/hasCoaches'];
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
           this.$store.dispatch('coaches/loadCoaches');
        }
    },
    created() {
        this.fetchCoaches();
       // console.log(this.allCoaches());
       console.log(this.hasCoaches);
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