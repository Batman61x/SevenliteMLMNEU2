// === SUPABASE SETUP ===
const supabaseUrl = "https://ymrjacrxdtwnllvybhhcn.supabase.co";
const supabaseAnonKey = "DEIN_ANON_KEY_HIER_REIN"; // den du kopiert hast

const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);
// IntersectionObserver animations
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
},{threshold:0.15});
document.querySelectorAll('[data-animate]').forEach(el=>io.observe(el));

// Year
const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
