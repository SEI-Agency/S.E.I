document.addEventListener("DOMContentLoaded", () => {
  // === LOGIN (index.html) ===
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const password = document.getElementById("password").value;

      const keys = [
        { key: "1", accessLevel: 1 },
        { key: "2", accessLevel: 2 },
        { key: "3", accessLevel: 3 },
        { key: "4", accessLevel: 4 },
        { key: "5", accessLevel: 5 }
      ];

      const userKey = keys.find(k => k.key === password);

      if (userKey) {
        localStorage.setItem("accessLevel", userKey.accessLevel);
        window.location.href = "documents.html";
      } else {
        alert("Acesso negado. Verifique sua chave.");
      }
    });
  }

  // === DOCUMENTOS (documents.html) ===
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
