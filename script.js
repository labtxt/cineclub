/* ==================== IDIOMA ==================== */
const langEs = document.getElementById('langEs');
const langEn = document.getElementById('langEn');
let currentLang = 'es';

function updateLanguage(lang) {
  document.querySelectorAll('[data-es][data-en]').forEach(el => {
    if (lang === 'es') {
      el.textContent = el.getAttribute('data-es');
    } else {
      el.textContent = el.getAttribute('data-en');
    }
  });
  currentLang = lang;
  localStorage.setItem('lang', lang);
}

if (langEs && langEn) {
  langEs.addEventListener('click', () => {
    updateLanguage('es');
    langEs.classList.add('active');
    langEn.classList.remove('active');
  });

  langEn.addEventListener('click', () => {
    updateLanguage('en');
    langEn.classList.add('active');
    langEs.classList.remove('active');
  });
}

const savedLang = localStorage.getItem('lang');
if (savedLang === 'en') {
  updateLanguage('en');
  langEn.classList.add('active');
  langEs.classList.remove('active');
} else {
  updateLanguage('es');
}

/* ==================== MODO OSCURO/CLARO ==================== */
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
let isDark = true;

function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.remove('light');
    body.classList.add('dark');
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    body.classList.add('light');
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  setTheme('light');
} else {
  setTheme('dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.contains('dark');
    setTheme(isDarkMode ? 'light' : 'dark');
  });
}

/* ==================== SMOOTH SCROLL ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

/* ==================== ANIMACIONES AL HACER SCROLL ==================== */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.edicion-card, .info-card, .galeria-item, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

/* ==================== FORMULARIO DE CONTACTO ==================== */
const contactForm = document.getElementById('contactForm');
const contactMessage = document.getElementById('contactMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('contactNombre').value;
    const email = document.getElementById('contactEmail').value;
    const mensaje = document.getElementById('contactMensaje').value;
    
    if (!nombre || !email || !mensaje) {
      contactMessage.innerHTML = currentLang === 'es' ? '❌ Por favor completá todos los campos' : '❌ Please fill all fields';
      contactMessage.className = 'form-message error';
      return;
    }
    
    contactMessage.innerHTML = currentLang === 'es' ? '📨 Enviando...' : '📨 Sending...';
    contactMessage.className = 'form-message';
    
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('email', email);
    formData.append('mensaje', mensaje);
    formData.append('_subject', `Cineclub - Consulta de ${nombre}`);
    formData.append('_replyto', email);
    
    try {
      const response = await fetch('https://formsubmit.co/silviaprietocineclub@gmail.com', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        contactMessage.innerHTML = currentLang === 'es' ? '✅ ¡Mensaje enviado! Te contactaremos pronto.' : '✅ Message sent! We will contact you soon.';
        contactMessage.className = 'form-message success';
        contactForm.reset();
      } else {
        throw new Error();
      }
    } catch (error) {
      contactMessage.innerHTML = currentLang === 'es' ? '❌ Error. Escribinos directamente a silviaprietocineclub@gmail.com' : '❌ Error. Write directly to silviaprietocineclub@gmail.com';
      contactMessage.className = 'form-message error';
    }
    
    setTimeout(() => {
      contactMessage.innerHTML = '';
      contactMessage.className = 'form-message';
    }, 5000);
  });
}

/* ==================== HEADER SCROLL EFFECT ==================== */
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.padding = '0.5rem 2rem';
  } else {
    header.style.padding = '1rem 2rem';
  }
});
