<template>
    <h1>Sign in</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="signin">Sign in via Firebase</button></p>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const auth = getAuth();
  
  const signin = () => {
    
    if (email.value === "" || password.value === "") {
      console.log("Email and Password cannot be empty");
      return;
    }
  
    
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        console.log("Firebase Sign-in Successful!");
        console.log("User Details:", userCredential.user);
        
     
        router.push("/");
        
       
        console.log("Current User:", auth.currentUser);
      })
      .catch((error) => {
       
        console.log("Sign-in Error:", error.message);
        console.log("Error Code:", error.code);
      });
  };
  </script>