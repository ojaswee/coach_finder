<template>
	<form @submit.prevent="onSubmit">
		<base-card>
			<div class="form-control">
				<label for="email">Your E-Mail</label>
				<input type="email" id="email" v-model="email" required>
			</div>
			<div class="form-control">
				<label for="password">Password</label>
				<input type="password" id="password" v-model="password" required>
			</div>
			<p v-if="!formIsValid"> Please enter a valid email and password</p>
			<base-button type="submit">{{ isLoginMode ? 'Login' : 'Signup'}}</base-button>
			<base-button type="button" @click="isLoginMode = !isLoginMode">Switch to {{ isLoginMode ?  'Signup' : 'Login'
				}}</base-button>
		</base-card>
	</form>
</template>
<script>

export default {
	data() {
		return {
			isLoginMode: true,
			email: '',
			password: '',
			formIsValid: true
		};
	},
	methods: {
		isEmailValid(email) {
			this.email = email.trim();
			if (this.email === '' || !this.email.includes('@')) {
				return false;
			}
			return true;
		},
		isPasswordValid(password) {
			this.password = password.trim();
			if (this.password === '' || this.password.length < 6) {
				return false;
			}
			return true;
		},
		onSubmit() {
			this.formIsValid = true;
			if (!this.isEmailValid(this.email) || !this.isPasswordValid(this.password)) {
				this.formIsValid = false;
				return;
			}
		},
		switchAuthMode() {
			if (this.isLoginMode) {
				this.isLoginMode = false;
			} else {
				this.isLoginMode = true;
			}
		}
	}
};
</script>

<style scoped>
form {
	margin: 1rem;

	padding: 1rem;
}

.form-control {
	margin: 0.5rem 0;
}

label {
	font-weight: bold;
	margin-bottom: 0.5rem;
	display: block;
}

input,
textarea {
	display: block;
	width: 100%;
	font: inherit;
	border: 1px solid #ccc;
	padding: 0.15rem;
}

input:focus,
textarea:focus {
	border-color: #3d008d;
	background-color: #faf6ff;
	outline: none;
}
</style>