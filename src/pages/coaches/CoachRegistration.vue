<template>
  <section>
    <base-card>
      <h2>Register as a coach</h2>
      <coach-form @save-data="saveCoachData"></coach-form>
    </base-card>
  </section>
</template>
<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm
  },
  methods: {
    saveCoachData(data) {
      console.log(data);
      this.$store.dispatch('coaches/registerCoach', data);
    }
  }
};
</script>
