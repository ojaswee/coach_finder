<template>
    <div>
      <base-dialog :show="!!error" title="Error" @close="error = null">
        <p>{{ error }}</p>
      </base-dialog>
      <section>
        <base-card>
          <coach-filter @filter-coaches="setFilters"></coach-filter>
        </base-card>
      </section>
      <section>
        <base-card>
          <div class="controls">
            <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to Register as Coach</base-button>
            <base-button mode="outline" @click="fetchCoaches(true)">Refresh</base-button>
            <base-button v-if="isLoggedIn && !isLoading && !isCoach" link to="/register">Register as coach</base-button>
          </div>
          <div v-if="isLoading"><base-spinner></base-spinner></div>
          <ul v-else-if="hasCoaches" class="list-none m-0 p-0">
            <coach-item v-for="coach in filteredCoaches" :key="coach.id" :id="coach.id"
              :first-name="coach.firstName" :last-name="coach.lastName" :rate="coach.hourlyRate"
              :areas="coach.areas">
            </coach-item>
          </ul>
          <h3 v-else>No coaches found</h3>
      </base-card>
    </section>
  </div>
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
            isLoading: false,
            error: null
        };
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuthenticated;
        },
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
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        },

    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        async fetchCoaches(refresh = false) {
            this.isLoading = true;
            try {
                await this.$store.dispatch('coaches/loadCoaches', { forceRefresh: refresh });
            } catch (error) {
                this.error = error.message;
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        }
    },
    created() {
        this.fetchCoaches();
    }
};
</script>
