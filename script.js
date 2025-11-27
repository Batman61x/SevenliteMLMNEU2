// === SUPABASE SETUP ===
const supabaseUrl = "https://ymrjacrxdtwnllvybhhcn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltcmphY3hyZHdubGx2eWJobmNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxOTM4ODQsImV4cCI6MjA3OTc2OTg4NH0.TU6QUvp_AaOBqtutWyfeTC9yyTxOh6Z41yepRMH651o"; // den du kopiert hast

const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);
// IntersectionObserver animations
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
},{threshold:0.15});
document.querySelectorAll('[data-animate]').forEach(el=>io.observe(el));

// Year
const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
// === AUTH LOGIK ===
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const msg = document.getElementById("auth-message");
  const logoutBtn = document.getElementById("logout-btn");

  // Helfer zum Anzeigen von Nachrichten
  function setMessage(text, isError = false) {
    if (!msg) return;
    msg.textContent = text;
    msg.style.color = isError ? "#ff6b6b" : "#4caf50";
  }

  // REGISTRIERUNG
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      setMessage("Account wird erstellt...");

      const email = document.getElementById("signup-email").value.trim();
      const password = document.getElementById("signup-password").value.trim();

      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage("Fehler bei der Registrierung: " + error.message, true);
        return;
      }

      setMessage("Registrierung erfolgreich. Prüfe deine E-Mails zur Bestätigung.");
      signupForm.reset();

      // OPTIONAL: direkt ein leeres Profil anlegen
      if (data.user) {
        await supabaseClient.from("Profile").insert({
          id: data.user.id, // gleiche id wie auth.users
        });
      }
    });
  }

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      setMessage("Login läuft...");

      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value.trim();

      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage("Login fehlgeschlagen: " + error.message, true);
        return;
      }

      setMessage("Erfolgreich eingeloggt.");
      if (logoutBtn) logoutBtn.style.display = "inline-block";

      // Hier könntest du später redirecten:
      // window.location.href = "/dashboard.html";
    });
  }

  // LOGOUT
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await supabaseClient.auth.signOut();
      setMessage("Abgemeldet.");
      logoutBtn.style.display = "none";
    });
  }

  // Beim Laden checken, ob schon eingeloggt
  (async () => {
    const { data } = await supabaseClient.auth.getUser();
    if (data.user && logoutBtn) {
      logoutBtn.style.display = "inline-block";
      setMessage("Eingeloggt als: " + (data.user.email || ""), false);
    }
  })();
});
