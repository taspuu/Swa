/* ================= PERSONALIZE THIS SECTION FIRST ================= */
const birthdayConfig = {
  herName: "Adiba Tabassum Swa", // e.g. "Maya"
  myName: "Arar Ahamed Taspi", // e.g. "Arif"
  birthdayMessage: "And I wanted to make you something instead of just saying it.",
  music: "audio/our-song.webm",
  letter: [
    "Dear [HER NAME],",
    "Jiboner shobcheye boro upohar holo shomoy. Ami jani, ami tomar shathe amar shomoy gulo koto mulloban banate perechi. Ei chotto chotto moment gulo, ja amader shonge ache, amar jiboner shobcheye boro upohar<3.",
    " Agami dingulo onk kothin hobe, kintu ami jani, amra mile shob kichu parbo. Ami tomar shathe amar jiboner shobcheye boro upohar gulo share korte chai.",
    "Happy Birthday, SWA BABY♥"
  ]
};

// Add, remove, or edit memories here. Image files go in the images folder.
const memories = [
  { date: "14 / 02 / 2023", title: "The day we met", description: "Oxford Mission road a beautiful lady was waiting for me in the Rickshaw", image: "images/photo1.jpeg" },
  { date: "10 / 11 / 2022", title: "Our first conversation", description: "Starts with Hey and never stops loving", image: "images/photo2.jpeg" },
  { date: "01 / 01 / 2023", title: "The moment I started liking you", description: "It was a simple moment, but it changed everything.", image: "images/photo3.jpeg" },
  { date: "DD / MM / YYYY", title: "One of our funniest memories", description: "Pagoler kache dhorai dewa uchit chilo.", image: "images/photo4.jpeg" },
  { date: "25 / 08 / 2026", title: "Where we are now", description: "We're fighting a lot but loving each other more than that.", image: "images/photo5.jpeg" }
];

// Add your photo path and its handwritten-style caption here.
const photos = [
  { image: "images/photo6.jpeg", caption: "A little moment with you." },
  { image: "images/photo7.jpeg", caption: "One of my favorite memories." },
  { image: "images/photo8.jpeg", caption: "You make every day softer." },
  { image: "images/photo9.jpeg", caption: "Us, being us." },
  { image: "images/photo10.jpeg", caption: "A moment worth keeping." },
  { image: "images/photo11.jpeg", caption: "Still smiling about this one." }
];

// Replace the blank spaces with real, personal details.
const thingsILove = [
  { title: "The way you Love Me.", text: "I don't know why, but when you get Jealous, it makes me smile." },
  { title: "Your little habits", text: "Only you could control me, shout at me, slap me, kiss me, bite me. I notice it every time, and I secretly love it." },
  { title: "How you care", text: "The way you care for the people you love says more about you than you know." },
  { title: "Your kind of funny", text: "I still laugh when I think about you told me dhukbe to. It still makes me laugh." },
  { title: "Just being you", text: "There is no one else who could love the way you do. Please never lose that." }
];
/* ===================== END PERSONALIZATION ====================== */

const $ = (selector, parent = document) => parent.querySelector(selector);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function replaceNames() {
  document.querySelectorAll("[data-her-name]").forEach((el) => { el.textContent = birthdayConfig.herName; });
  document.querySelectorAll("[data-my-name]").forEach((el) => { el.textContent = birthdayConfig.myName; });
  $("[data-birthday-message]").textContent = birthdayConfig.birthdayMessage;
  document.title = `Happy Birthday, ${birthdayConfig.herName} ♥`;
}

function makeImage(src, alt) {
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.loading = "lazy";
  image.addEventListener("error", () => image.classList.add("image-missing"));
  return image;
}

function renderTimeline() {
  const timeline = $("#timeline");
  memories.forEach((memory) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "timeline-card";
    card.setAttribute("aria-expanded", "false");
    card.innerHTML = `<span class="timeline-dot"></span><span class="timeline-date">${memory.date}</span><span class="timeline-title">${memory.title}</span><span class="timeline-detail"><span class="timeline-detail-inner"><span class="timeline-copy">${memory.description}</span></span></span>`;
    const detail = $(".timeline-detail-inner", card);
    const image = makeImage(memory.image, memory.title);
    detail.append(image);
    card.addEventListener("click", () => {
      const open = card.classList.toggle("open");
      card.setAttribute("aria-expanded", String(open));
    });
    timeline.append(card);
  });
}

function renderGallery() {
  const gallery = $("#photo-gallery");
  photos.forEach((photo, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "photo-card";
    card.setAttribute("aria-label", `Open photo: ${photo.caption}`);
    const image = makeImage(photo.image, photo.caption);
    const fallback = document.createElement("span");
    fallback.className = "fallback-photo";
    fallback.textContent = `Photo ${index + 1}`;
    const caption = document.createElement("p");
    caption.className = "photo-caption";
    caption.textContent = photo.caption;
    card.append(image, fallback, caption);
    card.addEventListener("click", () => openModal(photo));
    gallery.append(card);
  });
}

function renderLoveCards() {
  const container = $("#love-cards");
  thingsILove.forEach((thing) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "love-card";
    card.setAttribute("aria-expanded", "false");
    card.innerHTML = `<span class="love-card-title">${thing.title}<span>+</span></span><span class="love-card-copy"><span><span class="love-card-text">${thing.text}</span></span></span>`;
    card.addEventListener("click", () => {
      const open = card.classList.toggle("open");
      card.setAttribute("aria-expanded", String(open));
    });
    container.append(card);
  });
}

function renderLetter() {
  const letter = $("#letter-content");
  birthdayConfig.letter.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph.replaceAll("[HER NAME]", birthdayConfig.herName);
    letter.append(p);
  });
}

function revealSection(id) {
  const section = document.getElementById(id);
  if (!section.classList.contains("visible-section")) {
    section.classList.remove("hidden-section");
    section.classList.add("visible-section");
  }
  requestAnimationFrame(() => section.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" }));
}

function createHearts(amount = 12) {
  if (reducedMotion) return;
  const layer = $("#particle-layer");
  for (let i = 0; i < amount; i += 1) {
    const heart = document.createElement("span");
    heart.className = "particle";
    heart.textContent = i % 4 === 0 ? "✦" : "♥";
    heart.style.left = `${8 + Math.random() * 84}%`;
    heart.style.fontSize = `${.65 + Math.random() * 1.1}rem`;
    heart.style.setProperty("--duration", `${2.5 + Math.random() * 2}s`);
    heart.style.setProperty("--drift", `${-45 + Math.random() * 90}px`);
    layer.append(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
}

const modal = $("#photo-modal");
function openModal(photo) {
  const modalImage = $("#modal-image");
  modalImage.src = photo.image;
  modalImage.alt = photo.caption;
  $("#modal-caption").textContent = photo.caption;
  modal.showModal();
}

function setUpEvents() {
  const audio = $("#our-song");
  const musicButton = $("#music-toggle");

  audio.src = birthdayConfig.music;

  // Try to begin the song two seconds after the website opens.
  // Some mobile browsers may require her to tap the music button instead.
  window.setTimeout(() => {
    audio.volume = 0.82;
    audio.play().catch(() => {
      musicButton.title = "Tap to play our song";
    });
  }, 2000);

  $("#promise-button").addEventListener("click", (event) => {
    event.currentTarget.style.display = "none";
    $("#intro").classList.add("awake");
    createHearts(10);
    window.setTimeout(() => revealSection("birthday"), reducedMotion ? 0 : 500);
  });
  document.querySelectorAll(".next-button").forEach((button) => {
    button.addEventListener("click", () => revealSection(button.dataset.next));
  });
  ["yes-button", "obvious-button"].forEach((id) => {
    $("#" + id).addEventListener("click", () => {
      $("#choice-response").textContent = id === "yes-button" ? "Best answer. I was hoping you'd say that. ♥" : "Correct answer. I knew you'd pick that one. 😂";
      createHearts(18);
      window.setTimeout(() => revealSection("letter"), reducedMotion ? 0 : 850);
    });
  });
  $("#surprise-button").addEventListener("click", () => {
    $("#final-before").hidden = true;
    $("#final-message").hidden = false;
    createHearts(20);
  });
  $("#modal-close").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (event) => { if (event.target === modal) modal.close(); });
  musicButton.addEventListener("click", async () => {
    if (audio.paused) {
      audio.muted = false;
      audio.volume = 0.82;
      try { await audio.play(); } catch { return; }
    } else audio.pause();
  });
  audio.addEventListener("play", () => { musicButton.classList.add("playing"); musicButton.setAttribute("aria-label", "Pause our song"); musicButton.setAttribute("aria-pressed", "true"); });
  audio.addEventListener("pause", () => { musicButton.classList.remove("playing"); musicButton.setAttribute("aria-label", "Play our song"); musicButton.setAttribute("aria-pressed", "false"); });
  audio.addEventListener("error", () => {
    musicButton.classList.add("unavailable");
    musicButton.title = "Add the configured music file to the audio folder to play music";
    $(".music-label", musicButton).textContent = "Song unavailable";
    musicButton.setAttribute("aria-label", "Our song is unavailable");
  });
}

replaceNames();
renderTimeline();
renderGallery();
renderLoveCards();
renderLetter();
setUpEvents();
