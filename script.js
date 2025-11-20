document.addEventListener('DOMContentLoaded', function() {

const calendar = document.getElementById('calendar');
const openCountDisplay = document.getElementById('openCount');
const doorOpenSound = new Audio('magic-whoosh.wav');
doorOpenSound.volume = 0.6;

const gifts = [
  "Yogi Tee",
  "Kleine Kerze",
  "Süßigkeit",
  "Bälle",
  "Shampoo",
  "an.Schläge /",
  "Süßigkeit",
  "Plätzchen /",
  "WM OL /",
  "Süßigkeit",
  "EEETCafe /",
  "Proteinriegel",
  "Süßigkeit",
  "Bluumen",
  "an.Schläge /",
  "Süßigkeit",
  "Film Wahl /",
  "Selbstgemaltes ",
  "Süßigkeit",
  "WM BRE /",
  "Gewürze",
  "Proteinriegel",
  "Massage /",
  "an.Schläge /"
];

const giftMessages = [
  "Viel Wärme mit deinem Yogi Tee zum gemütlichen Winterstart!",
  "Eine kleine Kerze für Guschellicht.",
  "Gadse muss eety sein!",
  "Balls, Balls, Balls",
  "Neuer Gadsenduft",
  "Männerhass fördern mit dieser Wiener Zeitschrift",
  "Feinster Weihnachts-Eet!",
  "Lass uns kleine Bören backen! Gutschein für eine urliebe Backsession mit einem Rakk deiner Wahl",
  "Ich hörte, auf dem Lambertimarkt gäbe es Eety-Things. Such dir das Beste aus und genieße auf Kosten eines Rakks deiner Wahl!",
  "Eetkalender",
  "Gutschein für einen Besuch im Eetcafé! Lass uns zusammen eine urgemütliche Zeit bei einem Heißgetränk haben!",
  "Gadsen brauchen Kraft und Energie",
  "Und Gadsen brauchen süßen EET",
  "Eine duftende Überraschung",
  "Männer kann man nie genug hassen...",
  "Süßes, falls die Vorräte schon leer sind",
  "Du bestimmst, welcher Film läuft! Gutschein für einen verguschelten Filmeabend mit einem Rakk deiner Wahl!",
  "Es war einmal ein Rakk, der einen STift in die Pfote nahm...",
  "Belly muss full sein",
  "Auch in Bremen warten Leckereien darauf, von Gadsen verschlungen zu werden! Gutschein für einen Besuch des Weihnachtsmarktes in Bremen inklusive EET",
  "Würziger Würzspaß",
  "Ich habe eine starke Gadse",
  "Gadsen müssen gestreichelt werden! Und unter Vorlage dieses Gutscheins müssen sie sogar von einem Rakk deiner Wahl massiert werden!",
  "Auch der Weihnachtsmann kann sein Geschlecht am heutigen tage nicht vor dem Hass schützen"
];

let openDoors = Array(24).fill(false);

const giftModal = document.getElementById('giftModal');
const giftTextElement = document.getElementById('giftText');
const closeModalBtn = document.getElementById('closeModalBtn');

// Fade-In Funktion: robust und unterbrechungssicher
function openGiftModal() {
  clearTimeout(giftModal._fadeOutTimeout); // falls schnelles Öffnen/Schließen
  giftModal.classList.remove('hidden');
  giftModal.style.opacity = '0';
  void giftModal.offsetWidth; // Reflow trick
  setTimeout(() => {
    giftModal.style.opacity = '1';
  }, 10);
}

// Fade-Out Funktion
function closeGiftModal() {
  giftModal.style.opacity = '0';
  giftModal._fadeOutTimeout = setTimeout(() => {
    giftModal.classList.add('hidden');
  }, 1300); // entspricht CSS-Transition
}

// Event-Listener für Modal-Schließen
closeModalBtn.addEventListener('click', closeGiftModal);
giftModal.addEventListener('click', (event) => {
  if (event.target === giftModal) closeGiftModal();
});

// Türchen erzeugen
for (let i = 0; i < 24; i++) {
  const door = document.createElement('div');
  door.className = 'door interactive';
  door.textContent = i + 1;

  // Katzen-Emoji
  const cat = document.createElement('span');
  cat.className = 'cat';
  const catEmojis = ["😺", "😸", "😻", "😼"];
  cat.textContent = catEmojis[i % catEmojis.length];
  door.appendChild(cat);

  door.addEventListener('click', () => {
    doorOpenSound.currentTime = 0;
    doorOpenSound.play();
    giftTextElement.textContent = giftMessages[i] || "Überraschung!";
    openGiftModal();
    openDoors[i] = true;
    updateOpenCount();
    door.classList.add('open');
  });

  calendar.appendChild(door);
}

// Türchen-Zähler
function updateOpenCount() {
  const count = openDoors.filter(Boolean).length;
  openCountDisplay.textContent = count;
}
updateOpenCount();

});

