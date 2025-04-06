document.addEventListener("DOMContentLoaded", () => {

  // Configurações do Firebase (substitua com as suas configurações)
  const firebaseConfig = {
    apiKey: "AIzaSyAenLhQLq4u6MWBR9xXESm4N7mO0LR5_dY",
    authDomain: "database---sei.firebaseapp.com",
    projectId: "database---sei",
    storageBucket: "database---sei.firebasestorage.app",
    messagingSenderId: "926818948182",
    appId: "1:926818948182:web:cc3d207aec8a29b8d7d7f7",
    measurementId: "G-FRLP6JNXT3"
  };

  // Inicialize o Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  // === LOGIN (index.html) ===
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const password = document.getElementById("password").value;

      const keys = [
        { key: "3xTr#9@pLz!Q", accessLevel: 1 },
        { key: "R7g$1*aY8w%Fn", accessLevel: 2 },
        { key: "nZ!7@Gq$2pLt#", accessLevel: 3 },
        { key: "vP#4r@Ls!q8&M", accessLevel: 4 },
        { key: "L#p93!a@RtZ&9", accessLevel: 5 }
      ];

      const userKey = keys.find(k => k.key === password);

      if (userKey) {
        localStorage.setItem("accessLevel", userKey.accessLevel);

        // Coleta os dados
        const enderecoIp = ""; // Obter o IP do cliente é complexo no lado do cliente
        const horarioUso = new Date();

        // Armazena os dados no Firestore
        try {
          await db.collection("registros_uso").add({
            senha: password,
            endereco_ip: enderecoIp,
            horario_uso: horarioUso,
            nivel_acesso: userKey.accessLevel,
          });
          console.log("Dados de uso armazenados com sucesso!");
        } catch (error) {
          console.error("Erro ao armazenar dados de uso:", error);
        }

        window.location.href = "home.html";
      } else {
        alert("Acesso negado. Verifique sua chave.");
      }
    });
  }

  // === DOCUMENTOS (documentos.html) ===
  const docContainer = document.getElementById("doc-container");

  if (docContainer) {
    const accessLevel = parseInt(localStorage.getItem("accessLevel"));

    if (!accessLevel) {
      alert("Acesso negado. Faça login.");
      window.location.href = "index.html";
      return;
    }

    const docs = [
      {
        titulo: "Introdução Agentes",
        descricao: "Resumo detalhado das operações realizadas.",
        link: "https://docs.google.com/document/d/1qsZBZvHSKDamTn8aaQF2PtkyGQlzNsIssEs59Az4-Ak/edit?usp=sharing",
        nivel: 1
      },
      {
        titulo: "Plano Estratégico",
        descricao: "Documento com as estratégias futuras.",
        link: "https://www.youtube.com/watch?v=xvFZjo5PgG0",
        nivel: 3
      },
      {
        titulo: "Dados Confidenciais",
        descricao: "Informações sensíveis e restritas.",
        link: "https://www.youtube.com/watch?v=xvFZjo5PgG0",
        nivel: 4
      }
    ];

    docs.forEach(doc => {
      if (accessLevel >= doc.nivel) {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <h3>${doc.titulo}</h3>
          <p>${doc.descricao}</p>
          <a href="${doc.link}" target="_blank">Acessar Documento</a>
        `;
        docContainer.appendChild(div);
      }
    });
  }
});
