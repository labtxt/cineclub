/* ==================== SMOOTH SCROLL ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 40;
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

// Aplicar animaciones a elementos
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
      contactMessage.innerHTML = '❌ Por favor completá todos los campos';
      contactMessage.className = 'form-message error';
      return;
    }
    
    contactMessage.innerHTML = '📨 Enviando...';
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
        contactMessage.innerHTML = '✅ ¡Mensaje enviado! Te contactaremos pronto.';
        contactMessage.className = 'form-message success';
        contactForm.reset();
      } else {
        throw new Error();
      }
    } catch (error) {
      contactMessage.innerHTML = '❌ Error. Escribinos directamente a silviaprietocineclub@gmail.com';
      contactMessage.className = 'form-message error';
    }
    
    setTimeout(() => {
      contactMessage.innerHTML = '';
      contactMessage.className = 'form-message';
    }, 5000);
  });
}

/* ==================== EFECTO HEADER AL SCROLL ==================== */
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.opacity = '0.9';
    header.style.transition = 'opacity 0.3s';
  } else {
    header.style.opacity = '1';
  }
  
  lastScroll = currentScroll;
});

/* ==================== PREVENIR CIERRE ACCIDENTAL DE FORM ==================== */
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
  input.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});
