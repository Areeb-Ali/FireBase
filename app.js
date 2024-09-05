const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyBfdsPdUzP8Z3QarRWr0-ggDj1JVhT281k",
    authDomain: "last-f1c5a.firebaseapp.com",
    projectId: "last-f1c5a",
    storageBucket: "last-f1c5a.appspot.com",
    messagingSenderId: "653229622710",
    appId: "1:653229622710:web:08a6ca26929f4a6e4cad17",
    measurementId: "G-P09WJQ1G8G"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();


// Sign up function
const signUp = () => {
  const email = document.querySelector("#signup-email").value;
  const password = document.querySelector("#signup-password").value;
  console.log(email, password)
  // firebase code
  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
          // // Signed in 
          window.location.href = 'index.html';
          console.log(result)
          // ...
      })
      .catch((error) => {
          console.log(error.code);
          console.log(error.message)
          // ..
      });
}


// Sign In function
const signIn = () => {
  const email = document.querySelector("#sigin-email").value;
  const password = document.querySelector("#sigin-password").value;
  // firebase code
  firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
          // Signed in 
          window.location.href = "main.html";
          console.log(result)
      })
      .catch((error) => {
          console.log(error.code);
          console.log(error.message)
      });
}