<template>
	<form id="coach-form" @submit.prevent="submitForm">
		<div class="form-control" :class="{ invalid: !firstName.isValid }">
			<label for="firstName">First Name</label>
			<input type="text" id="firstName" v-model="firstName.value" @blur="clearValidity('firstName')">
			<p v-if="!firstName.isValid">Please enter a first name</p>
		</div>
		<div class="form-control" :class="{ invalid: !lastName.isValid }">
			<label for="lastName">Last Name</label>
			<input type="text" id="lastName" v-model="lastName.value" @blur="clearValidity('lastName')">
			<p v-if="!lastName.isValid">Please enter a last name</p>
		</div>
		<div class="form-control" :class="{ invalid: !description.isValid }">
			<label for="description">Description</label>
			<textarea id="description" rows="6" v-model="description.value"
				@blur="clearValidity('description')"></textarea>
			<p v-if="!description.isValid">Please enter a description</p>
		</div>
		<div class="form-control" :class="{ invalid: !hourlyRate.isValid }">
			<label for="hourlyRate">Hourly Rate</label>
			<input type="number" id="hourlyRate" v-model="hourlyRate.value" @blur="clearValidity('hourlyRate')">
			<p v-if="!hourlyRate.isValid">Please enter hourly rate as digits</p>
		</div>
		<div class="form-control" :class="{ invalid: !selectedAreas.isValid }">
			<label>Areas of expertise</label>
			<div v-for="area in getAreas" :key="area">
				<input type="checkbox" :id="area" :value="area" v-model="selectedAreas.value"
					@blur="clearValidity('selectedAreas')" />
				<label :for="area">{{ area }}</label>
			</div>
			<p v-if="!selectedAreas.isValid">Please select at least one area</p>
		</div>
		<p v-if="!formIsValid">Please correct the errors</p>
		<base-button type="submit">Register
		</base-button>
	</form>
</template>
<script>
export default {
	emits: ['save-data'],
	data() {
		return {
			firstName: { value: '', isValid: true },
			lastName: { value: '', isValid: true },
			description: { value: '', isValid: true },
			hourlyRate: { value: null, isValid: true },
			selectedAreas: { value: [], isValid: true },
			formIsValid: true
		};
	},
	computed: {
		getAreas() {
			return this.$store.getters['coaches/getCoachAreas'];
		}
	},
	methods: {
		clearValidity(input) {
			this[input].isValid = true;
		},
		validateForm() {
			this.formIsValid = true;
			if (this.firstName.value.trim() === '') {
				this.firstName.isValid = false;
				this.formIsValid = false;
			}
			if (this.lastName.value.trim() === '') {
				this.lastName.isValid = false;
				this.formIsValid = false;
			}
			if (this.description.value.trim() === '') {
				this.description.isValid = false;
				this.formIsValid = false;
			}
			if (this.hourlyRate.value === null || this.hourlyRate.value < 0) {
				this.hourlyRate.isValid = false;
				this.formIsValid = false;
			}
			if (this.selectedAreas.value.length === 0) {
				this.selectedAreas.isValid = false;
				this.formIsValid = false;
			}
		},
		submitForm() {
			this.validateForm();
			if (!this.formIsValid) {
				return;
			}
			const formData = {
				firstName: this.firstName.value,
				lastName: this.lastName.value,
				description: this.description.value,
				rate: this.hourlyRate.value,
				areas: this.selectedAreas.value
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
label {
  text-transform: none; /* Ensure no text transformation */
}
</style>