// IntersectionObserver animations
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
},{threshold:0.15});
document.querySelectorAll('[data-animate]').forEach(el=>io.observe(el));

// Year
const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
