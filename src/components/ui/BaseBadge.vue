<template>
  <span :class="badgeClass">
    {{ title }}
  </span>
</template>

<script>
export default
  {
    props: {
      type: {
        type: String,
        required: false,
      },
      title: {
        type: String,
        required: true
      },
    },
    computed: {
      badgeClass() {
        return this.type.toLowerCase();
      }
    }
  };
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.frontend {
  background-color: #3d008d;
  color: white;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.backend {
  background-color: #71008d;
  color: white;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.devops {
  background-color: #8d006e;
  color: white;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
}
</style>