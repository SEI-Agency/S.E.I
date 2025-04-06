const firebaseConfig = {
  apiKey: "AIzaSyAenLhQLq4u6MWBR9xXESm4N7mO0LR5_dY",
  authDomain: "database---sei.firebaseapp.com",
  projectId: "database---sei",
  storageBucket: "database---sei.firebasestorage.app",
  messagingSenderId: "926818948182",
  appId: "1:926818948182:web:cc3d207aec8a29b8d7d7f7",
  measurementId: "G-FRLP6JNXT3"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS carregado com sucesso");

  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
      alert("Preencha todos os campos.");
      return;
    }

    console.log("Usuário digitado:", username);
    console.log("Senha digitada:", password);

    try {
      const snapshot = await db.collection("usuarios_aprovacao")
        .where("usuario", "==", username) // Campo corrigido aqui
        .get();

      if (snapshot.empty) {
        alert("Usuário não encontrado.");
        return;
      }

      const doc = snapshot.docs[0];
      const data = doc.data();

      if (data.senha !== password) {
        alert("Senha incorreta.");
        return;
      }

      if (data.aprovado !== true) {
        alert("Seu acesso ainda não foi aprovado.");
        return;
      }

      // Salva dados no localStorage
      localStorage.setItem("accessLevel", data.nivel_acesso);
      localStorage.setItem("usuario", data.usuario);

      // Registra o uso
      await db.collection("registros_uso").add({
        usuario: data.usuario,
        horario_uso: new Date(),
        nivel_acesso: data.nivel_acesso
      });

      window.location.href = "home.html";
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro durante o login. Tente novamente.");
    }
  });
});
