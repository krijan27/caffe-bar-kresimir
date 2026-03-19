document.addEventListener("DOMContentLoaded", () => {
  const forma = document.getElementById("kontakt-forma");
  if (!forma) return;

  const status = document.getElementById("poruka-status");

  forma.addEventListener("submit", (e) => {
    e.preventDefault();

    const ime = document.getElementById("ime").value.trim();
    const email = document.getElementById("email").value.trim();
    const poruka = document.getElementById("poruka").value.trim();

    if (ime.length < 3) {
      status.textContent = "Ime mora imati barem 3 znaka.";
      status.style.color = "red";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      status.textContent = "Unesite ispravnu e-mail adresu.";
      status.style.color = "red";
      return;
    }

    if (poruka.length < 10) {
      status.textContent = "Poruka mora imati barem 10 znakova.";
      status.style.color = "red";
      return;
    }

    const zapis = { ime, email, poruka, datum: new Date().toISOString() };

    const postojece = JSON.parse(localStorage.getItem("poruke") || "[]");
    postojece.push(zapis);
    localStorage.setItem("poruke", JSON.stringify(postojece));

    status.textContent = "Poruka je uspješno poslana.";
    status.style.color = "green";
    forma.reset();
  });
});
