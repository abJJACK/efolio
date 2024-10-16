<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2">
        <!-- Title section -->
        <h1 class="text-center">
          <i class="bi bi-card-list"></i> W5. Library Registration Form
        </h1>
        <p class="text-center">Let's build some more advanced features into our form.</p>

        <!-- Form section -->
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username"
                     v-model="formData.username"
                     @blur="() => validateName(true)" 
                     @input="() => validateName(false)">
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select class="form-select" id="gender" v-model="formData.gender">
                <option value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password"
                     v-model="formData.password"
                     @blur="() => validatePassword(true)" 
                     @input="() => validatePassword(false)">
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="confirm-password" class="form-label">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @blur="() => validateConfirmPassword(true)"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label for="reason" class="form-label">Reason for joining</label>
              <textarea class="form-control" id="reason" rows="3"
                        v-model="formData.reason"
                        @input="validateReason"></textarea>
              <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
              <div v-if="errors.reasonSuccess" class="text-success">{{ errors.reasonSuccess }}</div> <!-- Show success message -->
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>

        <!-- PrimeVue DataTable -->
        <DataTable :value="submittedCards" tableStyle="min-width: 50rem" class="mt-5">
          <Column field="username" header="Username"></Column>
          <Column field="password" header="Password"></Column>
          <Column field="isAustralian" header="Australian Resident"></Column>
          <Column field="gender" header="Gender"></Column>
          <Column field="reason" header="Reason"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: ''
});

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null,
  reasonSuccess: null // Add success message field
});

const submittedCards = ref([]);

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    errors.value.username = blur ? "Name must be at least 3 characters" : null;
  } else {
    errors.value.username = null;
  }
};

const validatePassword = (blur) => {
  const password = formData.value.password;
  if (password.length < 8) {
    errors.value.password = blur ? "Password must be at least 8 characters long." : null;
    return;
  }
  if (!/[A-Z]/.test(password)) {
    errors.value.password = blur ? "Password must contain at least one uppercase letter." : null;
    return;
  }
  if (!/[a-z]/.test(password)) {
    errors.value.password = blur ? "Password must contain at least one lowercase letter." : null;
    return;
  }
  if (!/\d/.test(password)) {
    errors.value.password = blur ? "Password must contain at least one number." : null;
    return;
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.value.password = blur ? "Password must contain at least one special character." : null;
    return;
  }
  errors.value.password = null;
};

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.';
  } else {
    errors.value.confirmPassword = null;
  }
};

const validateResident = () => {
  if (!formData.value.isAustralian) {
    errors.value.resident = "Confirming if you are an Australian resident is required.";
  } else {
    errors.value.resident = null;
  }
};

const validateGender = () => {
  if (!formData.value.gender) {
    errors.value.gender = "Selecting a gender is required.";
  } else {
    errors.value.gender = null;
  }
};

const validateReason = () => {
  const reasonText = formData.value.reason.trim().toLowerCase();
  if (reasonText.length < 10) {
    errors.value.reason = "Reason must be at least 10 characters.";
    errors.value.reasonSuccess = null; // Clear success message
  } else {
    errors.value.reason = null;
    if (reasonText.includes('friend')) {
      errors.value.reasonSuccess = "Great to have a friend";
    } else {
      errors.value.reasonSuccess = null; // Clear success message
    }
  }
};

const submitForm = () => {
  validateName(true);
  validatePassword(true);
  validateConfirmPassword(true);
  validateResident();
  validateGender();
  validateReason();
  if (!errors.value.username && !errors.value.password && !errors.value.confirmPassword && !errors.value.resident && !errors.value.gender && !errors.value.reason) {
    submittedCards.value.push({ ...formData.value });
    clearForm(); // Optionally clear form after submit
  } else {
    console.log('Form validation failed');
  }
};

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: ''
  };
  errors.value = {
    username: null,
    password: null,
    confirmPassword: null,
    resident: null,
    gender: null,
    reason: null,
    reasonSuccess: null
  };
};
</script>

<style scoped>
.text-danger {
  color: #dc3545;
}

.text-success {
  color: #28a745;
}
</style>