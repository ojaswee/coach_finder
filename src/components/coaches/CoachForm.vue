<template>
	<form id="coach-form" @submit.prevent="submitForm">
		<div class="form-control">
			<label for="firstName">First Name</label>
			<input type="text" id="firstName" v-model.trim="firstName">
		</div>
		<div class="form-control">
			<label for="lastName">Last Name</label>
			<input type="text" id="lastName" v-model.trim="lastName">
		</div>
		<div class="form-control">
			<label for="description">Description</label>
			<textarea id="description" rows="6" v-model.trim="description"></textarea>
		</div>
		<div class="form-control">
			<label for="hourlyRate">Hourly Rate</label>
			<input type="number" id="hourlyRate" v-model.number="hourlyRate">
		</div>
		<div class="form-control">
        <label>Areas of expertise</label>
        <div v-for="area in getAreas" :key="area">
          <input type="checkbox" :id="area" :value="area" v-model="selectedAreas" />
          <label :for="area">{{ area }}</label>
        </div>
      </div>
		<base-button type="submit">Register
		</base-button>
	</form>
</template>
<script>
export default {
	emits: ['save-data'],
	data() {
		return {
			firstName: '',
			lastName: '',
			description: '',
			hourlyRate: '',
			selectedAreas: []
		};
	},
	computed: {
		getAreas() {
			return this.$store.getters['coaches/getCoachAreas'];
		}
	},
	methods: {
		submitForm() {
			const formData = {
				firstName: this.firstName,
				lastName: this.lastName,
				description: this.description,
				rate: this.hourlyRate,
				areas: [...this.selectedAreas]
			};
			this.$emit('save-data', formData);
		}
	}
}
</script>

<style scoped>
.form-control {
	margin: 0.5rem 0;
}

label {
	font-weight: bold;
	display: block;
	margin-bottom: 0.5rem;
}

input[type='checkbox']+label {
	font-weight: normal;
	display: inline;
	margin: 0 0 0 0.5rem;
}

input,
textarea {
	display: block;
	width: 100%;
	border: 1px solid #ccc;
	font: inherit;
}

input:focus,
textarea:focus {
	background-color: #f0e6fd;
	outline: none;
	border-color: #3d008d;
}

input[type='checkbox'] {
	display: inline;
	width: auto;
	border: none;
}

input[type='checkbox']:focus {
	outline: #3d008d solid 1px;
}

h3 {
	margin: 0.5rem 0;
	font-size: 1rem;
}

.invalid label {
	color: red;
}

.invalid input,
.invalid textarea {
	border: 1px solid red;
}
</style>