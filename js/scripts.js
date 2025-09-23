document.addEventListener('DOMContentLoaded', function () {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();


    const slider = document.querySelector('.hero-slider');
    if(!slider) return;

    const slides = Array.from(slider.querySelectorAll('.slide'));
    const dotsWrap = slider.querySelector('.dots');
    const prevBtn = slider.querySelector('.nav--prev');
    const nextBtn = slider.querySelector('.nav--next');

    let index = 0;
    let timer = null;
    const AUTOPLAY_MS = 6500;

    // Build dots
    slides.forEach((_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('role','tab');
        b.setAttribute('aria-label', 'Go to slide ' + (i+1));
        b.addEventListener('click', () => go(i, true));
        dotsWrap.appendChild(b);
    });

    function updateUI(){
        slides.forEach((s,i)=>s.classList.toggle('is-active', i===index));
        dotsWrap.querySelectorAll('button').forEach((b,i)=>{
        b.setAttribute('aria-selected', i===index ? 'true' : 'false');
        });
    }

    function go(i, pause){
        index = (i + slides.length) % slides.length;
        updateUI();
        if(pause) restartAutoplay();
    }

    function next(){ go(index+1, true); }
    function prev(){ go(index-1, true); }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    // Keyboard
    slider.addEventListener('keydown', (e)=>{
        if(e.key === 'ArrowRight') next();
        if(e.key === 'ArrowLeft') prev();
    });
    slider.tabIndex = 0;

    // Touch swipe
    let sx = 0;
    slider.addEventListener('touchstart', e => sx = e.touches[0].clientX, {passive:true});
    slider.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - sx;
        if(Math.abs(dx) > 50) (dx < 0 ? next() : prev());
    });

    function restartAutoplay(){
        if(timer) clearInterval(timer);
        timer = setInterval(()=> go(index+1, false), AUTOPLAY_MS);
    }

    // init
    updateUI();
    restartAutoplay();
});