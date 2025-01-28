<template>
  <base-dialog :show="!!error" title="Error" @close="error = null">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <h2>Register as a coach</h2>
      <div v-if="isLoading"><base-spinner></base-spinner></div>
      <div v-else><coach-form @save-data="saveCoachData"></coach-form></div>
    </base-card>
  </section>
</template>
<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm
  },
  data() {
    return {
      isLoading: false,
      error: null
    };
  },
  methods: {
   async saveCoachData(data) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/registerCoach', data);
        this.$router.replace('/coaches');
      } catch (error) {
        this.error = error.message || 'An error occurred while registering as coach';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>
