// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => preloader.classList.add('hidden'), 300);
  }
});

// Header scroll state
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

function onScroll() {
  const scrolled = window.scrollY > 20;
  header.classList.toggle('scrolled', scrolled);
  backToTop.classList.toggle('show', window.scrollY > 400);
}
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamburger.classList.toggle('active');
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#nav a');

function setActiveLink() {
  let current = sections[0]?.id;
  const scrollPos = window.scrollY + 140;
  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      current = section.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', setActiveLink);
setActiveLink();

//send Email via Gmail app or web
function openGmail(email) {
  const recipient = encodeURIComponent(email);
  const gmailWeb =
    `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}`;

  if (/Android/i.test(navigator.userAgent)) {
    window.location.href =
      `intent:mailto:${recipient}#Intent;` +
      `action=android.intent.action.SENDTO;` +
      `package=com.google.android.gm;` +
      `S.browser_fallback_url=${encodeURIComponent(gmailWeb)};end`;
  } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.location.href = `googlegmail:///co?to=${recipient}`;
  } else {
    window.open(gmailWeb, "_blank", "noopener,noreferrer");
  }
}

// Reveal on scroll
const revealEls = document.querySelectorAll('[data-reveal]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// Contact form (client-side only demo)

function bookViaWhatsApp({ name, phone, email, service, date, time }) {
  // Replace with Tersi Clinic's WhatsApp number
  const clinicNumber = "918123512696";

  const message = `Hello Tersi Clinic,
I would like to book an appointment.

Patient Name: ${name}
Patient Phone: ${phone}
Patient Email: ${email}
Service: ${service}
Preferred Date: ${date}
Preferred Time: ${time}

Please confirm my appointment.`;

  const url = `https://wa.me/${clinicNumber}?text=${encodeURIComponent(message)}`;

  window.location.href = url;
}

const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    if (!name) return;

    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const service = form.treatment.value.trim();
    const date = form.date.value.trim();
    const time = form.time.value.trim();
    bookViaWhatsApp({
      name,
      phone,
      email,
      service,
      date,
      time
    });

    formNote.textContent = `WhatsApp is opening. Please send the message to request your appointment.`;
    form.reset();
  });
}
