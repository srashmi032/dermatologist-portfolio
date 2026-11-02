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

//add ...more to google reviews


var MAX = 210;      // longest excerpt, in characters
  var MIN_OK = 60;    // shortest excerpt worth showing when cutting at a sentence
  var uid = 0;
 
  // function makeExcerpt(text) {
  //   // Remove wrapping quotes and star emojis for the excerpt only
  //   var t = text
  //     .replace(/^["\u201C\u201D]\s*/, '')
  //     .replace(/\s*["\u201C\u201D]$/, '')
  //     .replace(/^(\u2B50\uFE0F?\s*)+/, '')
  //     .replace(/(\s*\u2B50\uFE0F?)+$/, '');
 
  //   if (t.length <= MAX) return null; // short enough, leave as is
 
  //   // Take whole sentences while they fit
  //   var re = /[^.!?]+[.!?]+(\s|$)/g, m, out = '';
  //   while ((m = re.exec(t))) {
  //     if ((out + m[0]).length > MAX) break;
  //     out += m[0];
  //     if (out.length >= 110) break;
  //   }
  //   out = out.trim();
  //   if (out.length >= MIN_OK) return out;
 
  //   // Otherwise cut at the last whole word
  //   var cut = t.slice(0, MAX);
  //   return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,.;:!-]+$/, '');
  // }

  function makeExcerpt(text) {
  // Keep the leading stars so they can go back on the excerpt
  var lead = (text.match(/^["\u201C\u201D]?\s*((?:\u2B50\uFE0F?\s*)+)/) || [])[1] || '';
  lead = lead.trim() ? lead.trim() + ' ' : '';

  // Strip quotes and stars only to measure and cut the real text
  var t = text
    .replace(/^["\u201C\u201D]\s*/, '')
    .replace(/\s*["\u201C\u201D]$/, '')
    .replace(/^(\u2B50\uFE0F?\s*)+/, '')
    .replace(/(\s*\u2B50\uFE0F?)+$/, '');

  if (t.length <= MAX) return null; // short enough, leave as is

  // Take whole sentences while they fit
  var re = /[^.!?]+[.!?]+(\s|$)/g, m, out = '';
  while ((m = re.exec(t))) {
    if ((out + m[0]).length > MAX) break;
    out += m[0];
    if (out.length >= 110) break;
  }
  out = out.trim();
  if (out.length >= MIN_OK) return lead + out;

  // Otherwise cut at the last whole word
  var cut = t.slice(0, MAX);
  return lead + cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,.;:!-]+$/, '');
}
 
  function enhance(card) {
    var url = card.getAttribute('data-review-url');
    var p = card.querySelector('p');
    if (!url || !p) return;
 
    var full = p.textContent.replace(/\s+/g, ' ').trim();
    var excerpt = makeExcerpt(full);
    if (!excerpt) return;
 
    var fullId = 'review-full-' + (++uid);
 
    var excerptEl = document.createElement('span');
    excerptEl.className = 'review-excerpt';
    excerptEl.textContent = excerpt + ' ';
 
    var fullEl = document.createElement('span');
    fullEl.className = 'review-full';
    fullEl.id = fullId;
    fullEl.hidden = true;
    fullEl.textContent = full + ' ';
 
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'review-more';
    btn.textContent = '...more';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', fullId);
 
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      excerptEl.hidden = !open;
      fullEl.hidden = open;
      btn.textContent = open ? '...more' : 'Show less';
    });
 
    p.textContent = '';
    p.appendChild(excerptEl);
    p.appendChild(fullEl);
    p.appendChild(btn);
 
    // Link to the original review on Google
    var src = document.createElement('p');
    src.className = 'review-source';
    var a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    a.textContent = 'Read on Google ';
    var arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '\u2197'; // ↗
    a.appendChild(arrow);
    a.setAttribute('aria-label', 'Read this review on Google (opens in a new tab)');

    src.appendChild(a);
    p.insertAdjacentElement('afterend', src);
  }

 
 
  function init() {
    var cards = document.querySelectorAll('.testimonial-card[data-review-url]');
    Array.prototype.forEach.call(cards, enhance);
  }
 
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
