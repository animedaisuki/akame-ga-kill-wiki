// ============ CHARACTER DATA ============
const CHARACTERS = {
  akame: {
    name: "Akame",
    nameJp: "アカメ",
    role: "The Crimson-Eyed Blade",
    image: "assets/images/akame.png",
    jpBig: "赤目",
    stats: [
      { lbl: "Voice", val: "Sora Amamiya", jp: "雨宮天" },
      { lbl: "Teigu", val: "Murasame", jp: "村雨" },
      { lbl: "Class", val: "Swordswoman" },
    ],
    placeholderNote:
      "[ Akame portrait — long black hair, crimson eyes, katana stance ]",
    bio: `<p>Akame <span class="teigu">(アカメ)</span> is the titular female protagonist of the story. She has long black hair, red eyes, and a cold, serious demeanor. Sold along with her sister Kurome to the Empire at a young age, she becomes one of the <span class="emphasis">Elite Seven</span> assassins under Gozuki. Despite her serious attitude in battle, she displays genuine concern for her comrades.</p>
    <p>During a mission to assassinate former general Najenda, she is convinced by the latter to join <span class="emphasis">Night Raid</span> and the cause against the Empire. Her treason sparks an intense rivalry between fellow assassin and sibling Kurome, along with a mutual desire to be the one to end the other. In Night Raid, she assumes the cooking duties prior to Tatsumi joining the group.</p>
    <p>While she originally used the Shingu <span class="teigu">"Kiriichimonji"</span>, a katana capable of inflicting wounds that never heal, Akame acquired Gozuki's Imperial Arm <span class="teigu">"One Slice Kill: Murasame" (一斬必殺 村雨)</span> — whose poison blade instantly kills whoever it cuts. During the final battle with Esdeath, as a final resort due to the method of activation, Akame activates Murasame's <span class="emphasis">Little War Horn</span> Trump Card to permanently boost her physical abilities by increasing her density so she can kill Esdeath.</p>
    <p>Following the revolution, still an assassin, Akame leaves the empire to deal with those in neighboring nations that might take advantage of the weakened government.</p>`,
  },
  mine: {
    name: "Mine",
    nameJp: "マイン",
    role: "The Genius Sniper",
    image: "assets/images/mine.png",
    jpBig: "魔銃",
    stats: [
      { lbl: "Voice", val: "Yukari Tamura", jp: "田村ゆかり" },
      { lbl: "Teigu", val: "Pumpkin", jp: "パンプキン" },
      { lbl: "Class", val: "Sniper" },
    ],
    placeholderNote:
      "[ Mine portrait — pink twin tails, pink eyes, rifle in hand ]",
    bio: `<p>Mine <span class="teigu">(マイン, Main)</span> serves as the sniper of Night Raid. She has pink hair styled in twin tails and pink eyes. She initially shows a cold exterior and hates Tatsumi after he joined the group, but <span class="emphasis">warms up to Tatsumi</span> after he rescues her from Seryu's suicide nuclear bombing attack.</p>
    <p>In her childhood, she suffered harsh discrimination and racism for her half-foreign blood; she ran away and joined the Revolutionary Army with hopes that when the Army wins, there will be more acceptance of different races.</p>
    <p>Mine's Teigu is a machine gun called the <span class="teigu">"Roman Artillery: Pumpkin" (浪漫砲台 パンプキン, Roman Hōdai: Panpukin)</span> that fires highly concentrated piercing shots of spirit energy. Her powers are <span class="emphasis">amplified based on her emotions</span>, such as anger while fighting in a tight situation.</p>
    <p>Later on, Mine dies after sacrificing Pumpkin to defeat Budo during Night Raid's mission to rescue Tatsumi. Tatsumi promises her to carry out her goal — to come out on top.</p>`,
  },
};

// ============ CHARACTER RENDERER ============
const charContent = document.getElementById("charContent");
const charTabs = document.querySelectorAll(".char-tab");
const slashOverlay = document.getElementById("slashOverlay");

function renderCharacter(key) {
  const c = CHARACTERS[key];
  if (!c) return;
  charContent.innerHTML = `
    <div class="char-portrait">
      <span class="corner tl"></span>
      <span class="corner tr"></span>
      <span class="corner bl"></span>
      <span class="corner br"></span>
      ${
        c.image
          ? `<img src="${c.image}" alt="${c.name}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"/>`
          : `<div class="portrait-inner">
            <div class="jp-big">${c.jpBig}</div>
            <div class="placeholder-note">${c.placeholderNote}</div>
          </div>`
      }
    </div>
    <div class="char-info">
      <div class="char-name-block">
        <div class="char-role">${c.role}</div>
        <h3 class="char-name">${c.name}</h3>
        <div class="char-name-jp">${c.nameJp}</div>
      </div>
      <div class="char-stats">
        ${c.stats
          .map(
            (s) => `
          <div>
            <div class="char-stat-lbl">${s.lbl}</div>
            <div class="char-stat-val">${s.val}${s.jp ? `<span class="jp-inline">${s.jp}</span>` : ""}</div>
          </div>
        `,
          )
          .join("")}
      </div>
      <div class="char-bio">${c.bio}</div>
    </div>
  `;
}

function playSlash() {
  slashOverlay.classList.remove("active");
  // force reflow
  void slashOverlay.offsetWidth;
  slashOverlay.classList.add("active");
}

charTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.char;
    if (tab.classList.contains("active")) return;

    charTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    playSlash();
    // swap content mid-slash
    setTimeout(() => renderCharacter(key), 280);
  });
});

// initial render
renderCharacter("akame");

// ============ NAV ACTIVE STATE ============
const navLinks = document.querySelectorAll(".nav-links a");
const sections = ["intro", "plot", "characters", "watch"].map((id) =>
  document.getElementById(id),
);

function updateNav() {
  const scrollY = window.scrollY + 120;
  let active = "intro";
  sections.forEach((s) => {
    if (s && s.offsetTop <= scrollY) active = s.id;
  });
  navLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + active);
  });
}
window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

// ============ SLASH on nav click (section transitions) ============
navLinks.forEach((a) => {
  a.addEventListener("click", () => {
    playSlash();
  });
});

// ============ PARALLAX KANJI in hero ============
const heroKanji = document.querySelector(".hero-kanji");
window.addEventListener(
  "scroll",
  () => {
    const y = window.scrollY;
    if (heroKanji && y < window.innerHeight) {
      heroKanji.style.transform = `translateY(calc(-50% + ${y * 0.3}px))`;
    }
  },
  { passive: true },
);
