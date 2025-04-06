document.addEventListener("DOMContentLoaded", () => {

  async function encrypt4x(password) {
    const encoder = new TextEncoder();
    let data = encoder.encode(password);

    for (let i = 0; i < 4; i++) {
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      data = new Uint8Array(hashBuffer);
      // Convert the hash buffer to a base64 string without extra encoding.
      data = encoder.encode(btoa(String.fromCharCode(...new Uint8Array(hashBuffer))));
    }

    return btoa(String.fromCharCode(...data));
  }

  // === LOGIN (index.html) ===
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const password = document.getElementById("password").value;

      const keys = [
        { key: "Z33uNHew9k/gm0MXQaMx6BMdo5/Uyudd5htbT7kN9es=", accessLevel: 1 }, // 3xTr#9@pLz!Q
        { key: "e+/ywh2mvunRD1nSS/37pcH3jxuK6Nm/bD01ATA7i8Q=", accessLevel: 2 }, // R7g$1*aY8w%Fn
        { key: "W9KvQqcYpDjjMhCWRdZzqUwiM5usEo2qmf781007nqY=", accessLevel: 3 }, // nZ!7@Gq$2pLt#
        { key: "9Wf6qT25IZY/Eh6a1aPEgGE2F01Y64pGYjLa4KkzsCI=", accessLevel: 4 }, // vP#4r@Ls!q8&M
        { key: "c+EvOT7Wfxr4FREX6tIst8nowNPVYFKS3t1dIm/gNeQ=", accessLevel: 5 }  // L#p93!a@RtZ&9
      ];

      const encrypted = await encrypt4x(password);
      const userKey = keys.find(k => k.key === encrypted);

      if (userKey) {
        localStorage.setItem("accessLevel", userKey.accessLevel);
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
