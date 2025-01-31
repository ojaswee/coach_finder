<template>
	<div>
		<base-dialog :show="!!error" title="Error" @close="handleError">
			<p>{{ error }}</p>
		</base-dialog>
		<base-dialog :show="isLoading" title="Authenticating..." fixed>
			<base-spinner></base-spinner>
		</base-dialog>
		<base-card>
			<form @submit.prevent="onSubmit">
				<div class="form-control">
					<label for="email">Your E-Mail</label>
					<input type="email" id="email" v-model="email" required>
				</div>
				<div class="form-control">
					<label for="password">Password</label>
					<input type="password" id="password" v-model="password" required>
				</div>
				<p v-if="!formIsValid"> Please enter a valid email and password</p>
				<base-button type="submit">{{ isLoginMode ? 'Login' : 'Signup' }}</base-button>
				<base-button type="button" @click="isLoginMode = !isLoginMode">Switch to {{ isLoginMode ? 'Signup' :
					'Login'
					}}</base-button>
			</form>
		</base-card>
	</div>
</template>
<script>
export default {
	data() {
		return {
			isLoginMode: true,
			email: '',
			password: '',
			formIsValid: true,
			isLoading: false,
			error: null
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
		async onSubmit() {
			this.formIsValid = true;

			if (!this.isEmailValid(this.email) || !this.isPasswordValid(this.password)) {
				this.formIsValid = false;
				return;
			}
			this.isLoading = true;
			try {
				if (this.isLoginMode) {
					await this.$store.dispatch('login', {
						email: this.email,
						password: this.password
					});
					const redirectURL = '/'+ (this.$route.query.redirect || 'coaches');
					this.$router.replace(redirectURL);
				} else {
					await this.$store.dispatch('signup', {
						email: this.email,
						password: this.password
					});
				}
			} catch (err) {
				if (err.message === 'EMAIL_EXISTS') {
					this.error = 'Email already exists';
				} else {
					this.error = err.message || 'Failed to authenticate. Please try again';
				}
			}
			this.isLoading = false;
		},
		switchAuthMode() {
			if (this.isLoginMode) {
				this.isLoginMode = false;
			} else {
				this.isLoginMode = true;
			}
		},
		handleError() {
			this.error = null;
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