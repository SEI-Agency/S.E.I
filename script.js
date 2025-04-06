document.addEventListener("DOMContentLoaded", () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAenLhQLq4u6MWBR9xXESm4N7mO0LR5_dY",
    authDomain: "database---sei.firebaseapp.com",
    projectId: "database---sei",
    storageBucket: "database---sei.appspot.com",
    messagingSenderId: "926818948182",
    appId: "1:926818948182:web:cc3d207aec8a29b8d7d7f7",
    measurementId: "G-FRLP6JNXT3"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  function multiEncrypt(text, rounds = 4) {
    let encrypted = text;
    for (let i = 0; i < rounds; i++) {
      encrypted = btoa(encrypted);
    }
    return encrypted;
  }

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      const encryptedPassword = multiEncrypt(password);

      try {
        const snapshot = await db
          .collection("usuarios_aprovacao")
          .where("discord", "==", username)
          .get();

        if (snapshot.empty) {
          alert("Usuário não encontrado.");
          return;
        }

        const doc = snapshot.docs[0];
        const data = doc.data();

        if (data.senha !== encryptedPassword) {
          alert("Senha incorreta.");
          return;
        }

        if (data.aprovado !== true) {
          alert("Seu acesso ainda não foi aprovado.");
          return;
        }

        // Salva o nível de acesso e redireciona
        localStorage.setItem("accessLevel", data.nivel);
        localStorage.setItem("usuario", data.discord);

        await db.collection("registros_uso").add({
          usuario: data.discord,
          horario_uso: new Date(),
          nivel_acesso: data.nivel
        });

        window.location.href = "home.html";
      } catch (error) {
        console.error("Erro no login:", error);
        alert("Erro durante o login. Tente novamente.");
      }
    });
  }
});
