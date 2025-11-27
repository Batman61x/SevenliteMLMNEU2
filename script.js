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
