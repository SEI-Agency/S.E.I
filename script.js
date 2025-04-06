loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  try {
    const snapshot = await db.collection("usuarios_aprovacao").where("discord", "==", username).get();
    onst snapshot = await db.collection("usuarios_aprovacao").where("senha", "==", password).get();

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
