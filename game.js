const clues = {
  silt: { title: "Czerwony pył", text: "Drobny osad i zapadnięta cembrowina: odwiert wykonano w niestabilnej warstwie." },
  route: { title: "Trasa po wodę", text: "To kobiety i dzieci najczęściej noszą wodę. Lokalizacja zmienia ich dzień." },
  mark: { title: "Znak na akacji", text: "Stary ślad powodzi jest wyżej niż sądzono — zagłębienie zalewa pora deszczowa." },
  pump: { title: "Pompa B-17", text: "Numer z faktury nie zgadza się z numerem pompy przy niedziałającej studni." },
  witness: { title: "Brakująca strona", text: "Pompa B-17 została przeniesiona do kliniki podczas epidemii. Decyzję podjęto jawnie." }
};

const scenes = {
  start: {
    chapter: "PROLOG", step: 0, day: "—", eyebrow: "MISJA: BÉRÉ", title: "Studnia, która milczy",
    text: `<p>Na skraju fikcyjnej wioski Béré rdzawa pompa ani drgnie. Za osiem dni ma przyjść pierwszy deszcz. Potem ciężarówka z wiertnicą nie przejedzie gliniastej drogi.</p><p class="dialogue">„Poprzedni zespół mówił, że woda jest na 34 metrach. Studnia działała tylko jeden sezon” — mówi Moussa, miejscowy technik.</p><p>Masz budżet równy orientacyjnemu kosztowi jednej studni i notatkę z trzema sprzecznymi liczbami. Zanim wydasz choćby franka, trzeba zacząć od właściwego pytania.</p>`,
    fact: "Relacje Misji Sercanów podają, że studnie w Czadzie buduje się głównie od listopada do maja, w porze suchej. Później dojazd ciężkiego sprzętu bywa niemożliwy.",
    choices: [
      { label: "Zbadaj stary odwiert", sub: "Co mówi grunt, zanim przemówią ludzie?", next: "square", effects: { time: -1, clue: "silt" }, feedback: "W szczelinach znajdujesz bardzo drobny, czerwony osad. Cembrowina zapadła się — to nie wygląda na zwykłe zużycie pompy." },
      { label: "Idź z Aïchą po wodę", sub: "Zobacz problem z perspektywy codziennej drogi", next: "square", effects: { trust: 10, time: -1, clue: "route" }, feedback: "Sześć kilometrów w obie strony. Kanister waży więcej w drodze powrotnej, a Aïcha zna każdą porę, gdy źródło mętnieje." },
      { label: "Sprawdź faktury i numery części", sub: "Najpierw dokumenty — coś w nich się nie zgadza", next: "square", effects: { trust: -5, clue: "pump" }, feedback: "Na fakturze widnieje pompa B-17. Na starym odwiercie: C-04. To ważna rozbieżność, ale jeszcze nie dowód kradzieży." }
    ]
  },
  square: {
    chapter: "ROZDZIAŁ I", step: 1, day: "1", eyebrow: "SPOTKANIE POD MANGOWCEM", title: "Czyja będzie ta studnia?",
    text: `<p>Na spotkanie przychodzą starsi, nauczycielka Mariam, pasterze i grupa kobiet. Każdy wskazuje inne miejsce. Szkoła chce wodę blisko klas. Pasterze — przy drodze na pastwiska. Klinika — na wzgórzu.</p><p class="dialogue">„Jeśli wybierzecie bez nas, będzie to wasza studnia. Jeśli wybierzemy razem — będzie nasza” — mówi Mariam.</p>`,
    fact: "W relacjach z Czadu wioska tworzy komitet studni, który zbiera środki na drobne naprawy, np. wymianę łańcucha. Udział mieszkańców jest częścią trwałości projektu.",
    choices: [
      { label: "Zmapuj potrzeby wszystkich grup", sub: "Woda, szkoła, klinika, stada i bezpieczeństwo", next: "markers", effects: { trust: 15, time: -1, budget: -300 }, feedback: "Mapa potrzeb nie daje jeszcze jednej odpowiedzi, ale ujawnia, kto dotąd nie był pytany o zdanie." },
      { label: "Wskaż plac przy szkole", sub: "Najwięcej dzieci skorzysta od razu", next: "markers", effects: { trust: -10 }, feedback: "To brzmi rozsądnie, lecz kobiety milkną. Najkrótsza droga dla uczniów nie zawsze jest bezpieczna po zmroku." },
      { label: "Oddaj decyzję najstarszym", sub: "Uszanuj lokalną hierarchię", next: "markers", effects: { trust: 2 }, feedback: "Szacunek jest ważny, ale głosy osób noszących wodę znikają z rozmowy. Starsi proszą, by jutro wrócić z danymi." }
    ]
  },
  markers: {
    chapter: "ROZDZIAŁ II", step: 2, day: "2", eyebrow: "ŚLADY W TERENIE", title: "Linia, której nie ma na mapie",
    text: `<p>Technik proponuje nowe miejsce w suchym zagłębieniu. Jest płaskie, blisko drogi i idealne dla wiertnicy. Na akacji widzisz jednak jasną obręcz dwa metry nad ziemią. Kilkaset kroków dalej leżą wyschnięte rybie łuski.</p><p>W raporcie z poprzedniego sezonu nie ma słowa o powodzi.</p>`,
    choices: [
      { label: "Zapytaj pasterzy o ślady", sub: "Pamięć terenu bywa dokładniejsza niż mapa", next: "water_for_water", effects: { trust: 8, time: -1, clue: "mark" }, feedback: "Pasterze potwierdzają: co kilka lat woda stoi tu przez tygodnie. Ślad na akacji wyznacza poziom wielkiej powodzi." },
      { label: "Zamów próbne wiercenie tutaj", sub: "Teren jest dostępny, a czas ucieka", next: "water_for_water", effects: { budget: -1800, time: -1 }, feedback: "Próba wykazuje wodę, ale też luźny piasek. Wynik nie odpowiada na pytanie, czy konstrukcja przetrwa powódź." },
      { label: "Przenieś punkt na wzgórze", sub: "Bezpieczniej, choć bez pełnego rozpoznania", next: "water_for_water", effects: { trust: -3, budget: -600 }, feedback: "Unikasz zagłębienia, lecz decyzja bez konsultacji znów osłabia poczucie wspólnej odpowiedzialności." }
    ]
  },
  water_for_water: {
    chapter: "ROZDZIAŁ III", step: 3, day: "3", eyebrow: "LOGISTYCZNY PARADOKS", title: "Woda potrzebna do wody",
    text: `<p>Wiertnica jest już w drodze. Moussa przypomina szczegół pominięty w planie: podczas całodobowego wiercenia potrzebna jest woda do wypłukiwania urobku. Najbliższe pewne źródło jest kilka kilometrów stąd.</p><p class="dialogue">„Jeśli zaczniemy i zabraknie wody, stracimy odwiert i pieniądze.”</p>`,
    fact: "Do wiercenia studni głębinowej także potrzebna jest woda. Misjonarze opisują sytuacje, gdy trzeba ją donosić z odległości kilku kilometrów i nie może jej zabraknąć przez cały proces.",
    choices: [
      { label: "Zorganizuj cysternę i zapas", sub: "Drożej, ale z rezerwą na cały odwiert", next: "invoice", effects: { budget: -2200, time: -1, trust: 3 }, feedback: "Komitet wyznacza dyżury i miejsce na szczelny zapas. Logistyka staje się wspólnym zadaniem." },
      { label: "Poproś rodziny o donoszenie", sub: "Bez kosztu transportu, lecz z dużym ciężarem", next: "invoice", effects: { trust: -15, time: -1 }, feedback: "Kobiety pytają, kto w tym czasie ugotuje i pójdzie na targ. „Darmowa” woda ma realny koszt czyjejś pracy." },
      { label: "Zacznij z połową zapasu", sub: "Wiertnica nie może czekać", next: "invoice", effects: { budget: -700, time: -2 }, feedback: "Pierwsza partia znika szybciej niż zakładano. Awaryjny transport kosztuje czas — i nerwy." }
    ]
  },
  invoice: {
    chapter: "ROZDZIAŁ IV", step: 4, day: "4", eyebrow: "AKTA B-17", title: "Pompa, która zniknęła",
    text: `<p>W starej teczce wraca numer B-17. Faktura mówi o nowej pompie, ale na niedziałającym odwiercie zamontowano starszą C-04. Ktoś dopisał ołówkiem: „klinika — 14/08”. Następna strona została wyrwana.</p><p>W obozie narasta plotka: poprzedni komitet sprzedał sprzęt.</p>`,
    choices: [
      { label: "Oskarż poprzedni komitet", sub: "Numery są jednoznaczne — trzeba działać szybko", next: "diagnosis", effects: { trust: -22 }, feedback: "Plotka staje się wyrokiem. Ludzie dzielą się na dwa obozy, zanim poznajesz całą historię." },
      { label: "Idź do kliniki i pytaj świadków", sub: "Sprawdź dopisek oraz brakującą stronę", next: "diagnosis", effects: { time: -1, trust: 10, clue: "witness" }, feedback: "Podczas epidemii cholery B-17 przeniesiono do kliniki, za zgodą zebrania. Wyrwana kartka wisi tam jako instrukcja naprawy." },
      { label: "Kup od razu kolejną pompę", sub: "Śledztwo nie może zatrzymać budowy", next: "diagnosis", effects: { budget: -2800 }, feedback: "Nowa pompa rozwiązuje brak części, nie wyjaśnia jednak, dlaczego stary odwiert się zapadł ani skąd wzięła się plotka." }
    ]
  },
  diagnosis: {
    chapter: "ROZDZIAŁ V", step: 5, day: "5", eyebrow: "REKONSTRUKCJA", title: "Co naprawdę zabiło studnię?",
    text: `<p>Masz jedną szansę, by przekonać ekipę do zmiany planu. Wybierz hipotezę najlepiej wyjaśniającą ślady. Pamiętaj: brakująca pompa mogła unieruchomić ujęcie, ale nie tłumaczy zapadniętej konstrukcji.</p>`,
    choices: [
      { label: "Kradzież sprzętu", sub: "Ktoś podmienił pompę na starszą", next: "drill", effects: { trust: -15, diagnosis: "wrong" }, feedback: "To łatwe wyjaśnienie, lecz myli awarię pompy z uszkodzeniem odwiertu. Bez pełnej historii B-17 oskarżenie jest ryzykowne." },
      { label: "Złe miejsce i niestabilna warstwa", sub: "Sezonowe zalanie, drobny piasek, płytki odwiert", next: "drill", effects: { trust: 12, budget: -900, diagnosis: "right" }, feedback: "Ślady układają się w całość. Punkt przesuwacie 240 metrów wyżej, a rury filtracyjne zostaną osadzone głębiej." },
      { label: "Susza obniżyła lustro wody", sub: "Wody po prostu jest mniej niż dawniej", next: "drill", effects: { time: -1, diagnosis: "partial" }, feedback: "Susza zwiększa presję, lecz sama nie tłumaczy czerwonego osadu, śladu powodzi ani zapadniętej cembrowiny." }
    ]
  },
  drill: {
    chapter: "ROZDZIAŁ VI", step: 6, day: "6", eyebrow: "ODWIERT: 62 METRY", title: "Noc próby",
    text: `<p>Wiertnica warczy do późna. Na 34 metrach pojawia się wilgoć — dokładnie jak w starej notatce. Operator chce zakończyć pracę. Moussa uważa, że to warstwa sezonowa. Stabilniejszy poziom może być głębiej, ale każdy metr kosztuje.</p><p class="dialogue">„Woda dziś czy woda także za pięć pór suchych?”</p>`,
    fact: "Płytka woda i deszczówka w zagłębieniach mogą być zanieczyszczone bakteriami oraz pasożytami. Sam fakt dotarcia do wody nie oznacza jeszcze, że ujęcie jest bezpieczne i trwałe.",
    choices: [
      { label: "Wierć do stabilnej warstwy", sub: "Drożej teraz, większa szansa trwałości", next: "committee", effects: { budget: -4700, time: -1, deep: true }, feedback: "Na 62 metrach wypływ się stabilizuje. Próbne pompowanie potrwa jeszcze kilka godzin." },
      { label: "Zatrzymaj się na 34 metrach", sub: "Oszczędź środki na pompę i szkolenie", next: "committee", effects: { budget: -2700, time: -1, deep: false }, feedback: "Woda jest, lecz wynik przypomina parametry starego odwiertu. Zyskujesz budżet, bierzesz ryzyko sezonowości." },
      { label: "Przerwij i zamów eksperta", sub: "Najpierw pełna ekspertyza hydrogeologiczna", next: "committee", effects: { budget: -1500, time: -3, deep: false }, feedback: "Ekspertyza potwierdza kierunek, ale droga zaczyna mięknąć po pierwszej burzy. Okno prac niebezpiecznie się zamyka." }
    ]
  },
  committee: {
    chapter: "FINAŁ", step: 7, day: "7", eyebrow: "ZANIM POPŁYNIE WODA", title: "Ostatnia decyzja",
    text: `<p>Próbka wygląda czysto, ale musi przejść badanie. Pompa i betonowa płyta są gotowe. Została kwestia utrzymania ujęcia. Komitet proponuje symboliczną składkę każdej rodziny. Najuboższe gospodarstwa obawiają się wykluczenia.</p><p>Jak domkniesz projekt?</p>`,
    fact: "UNICEF podaje, że według szacunków JMP z 2017 r. dostęp do podstawowych usług wody pitnej w Czadzie miało 43% ludności, a do podstawowych warunków sanitarnych 10%. Studnia musi iść w parze z higieną i planem utrzymania.",
    choices: [
      { label: "Komitet, fundusz i zasada: nikt bez wody", sub: "Składka według możliwości, szkolenie dwóch techników", next: "ending", effects: { budget: -1900, trust: 18, sustainable: true }, feedback: "Wspólnota ustala jawny rejestr, dyżury, fundusz napraw i zwolnienia dla rodzin bez dochodu." },
      { label: "Darmowa woda bez składek", sub: "Dostęp nie powinien zależeć od pieniędzy", next: "ending", effects: { trust: 8, sustainable: false }, feedback: "Dostęp jest równy dziś. Nie ma jednak pieniędzy na łańcuch, uszczelkę ani transport części za rok." },
      { label: "Opłata za każdy kanister", sub: "Stały fundusz zapewni profesjonalny serwis", next: "ending", effects: { trust: -18, sustainable: true }, feedback: "Fundusz szybko rośnie, ale najbiedniejsze rodziny wracają do niebezpiecznego źródła, gdy brakuje pieniędzy." }
    ]
  }
};

const defaultState = { scene: "start", trust: 50, time: 8, budget: 15000, clues: [], flags: {}, history: [], started: false };
let state = structuredClone(defaultState);

const $ = (id) => document.getElementById(id);
const els = {
  overlay: $("introOverlay"), start: $("startButton"), resume: $("resumeButton"), reset: $("resetButton"),
  chapter: $("chapterTag"), progress: $("progressBar"), progressText: $("progressText"), day: $("dayValue"),
  eyebrow: $("eyebrow"), title: $("sceneTitle"), text: $("sceneText"), fact: $("factCard"), choices: $("choices"), feedback: $("feedback"),
  trustValue: $("trustValue"), trustBar: $("trustBar"), timeValue: $("timeValue"), timeBar: $("timeBar"), budgetValue: $("budgetValue"), budgetBar: $("budgetBar"),
  clueCount: $("clueCount"), clueList: $("clueList")
};

function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
function formatMoney(value) { return new Intl.NumberFormat("pl-PL").format(Math.max(0, value)) + " zł"; }
function save() { localStorage.setItem("slad-wody-save", JSON.stringify(state)); }
function load() {
  try {
    const saved = JSON.parse(localStorage.getItem("slad-wody-save"));
    if (saved?.scene) state = { ...structuredClone(defaultState), ...saved };
  } catch (_) { localStorage.removeItem("slad-wody-save"); }
}

function updateStatus() {
  els.trustValue.textContent = state.trust + "%";
  els.trustBar.style.width = clamp(state.trust, 0, 100) + "%";
  els.timeValue.textContent = state.time + (state.time === 1 ? " dzień" : " dni");
  els.timeBar.style.width = clamp(state.time / 8 * 100, 0, 100) + "%";
  els.budgetValue.textContent = formatMoney(state.budget);
  els.budgetBar.style.width = clamp(state.budget / 15000 * 100, 0, 100) + "%";
  els.clueCount.textContent = state.clues.length + "/5";
  if (!state.clues.length) {
    els.clueList.innerHTML = `<p class="empty-note">Wysłuchuj ludzi. Sprawdzaj szczegóły. Nie każda sprzeczność oznacza oszustwo.</p>`;
  } else {
    els.clueList.innerHTML = state.clues.map(id => `<div class="clue"><span>✓</span><div><b>${clues[id].title}</b><small>${clues[id].text}</small></div></div>`).join("");
  }
}

function applyEffects(effects = {}) {
  if (effects.trust) state.trust = clamp(state.trust + effects.trust, 0, 100);
  if (effects.time) state.time = Math.max(0, state.time + effects.time);
  if (effects.budget) state.budget += effects.budget;
  if (effects.clue && !state.clues.includes(effects.clue)) state.clues.push(effects.clue);
  for (const [key, value] of Object.entries(effects)) {
    if (!["trust", "time", "budget", "clue"].includes(key)) state.flags[key] = value;
  }
}

function choose(choice, index) {
  document.querySelectorAll(".choice-button").forEach(button => button.disabled = true);
  applyEffects(choice.effects);
  state.history.push({ scene: state.scene, choice: index });
  state.scene = choice.next;
  save();
  updateStatus();
  els.feedback.textContent = choice.feedback;
  els.feedback.className = "feedback" + ((choice.effects?.trust || 0) < -10 ? " bad" : "");
  els.feedback.hidden = false;
  els.feedback.focus({ preventScroll: true });
  setTimeout(() => {
    render();
    document.querySelector(".story-card").scrollIntoView({ behavior: "smooth", block: "start" });
  }, 1150);
}

function ending() {
  const evidence = state.clues.length;
  const goodDiagnosis = state.flags.diagnosis === "right";
  const deep = state.flags.deep === true;
  const sustainable = state.flags.sustainable === true;
  let title, lead, grade;

  if (goodDiagnosis && deep && sustainable && state.trust >= 55 && state.budget >= 0 && state.time > 0) {
    title = "Źródło, które ma opiekunów";
    grade = "MISJA TRWAŁA";
    lead = "Badanie potwierdza bezpieczną wodę. Po miesiącu dziennik komitetu ma pierwsze wpisy, a Mariam prowadzi w szkole zajęcia z higieny. Najważniejsze: gdy odjeżdżasz, nikt nie mówi „wasza studnia”. Mówią „nasza”.";
  } else if (state.budget < 0 || state.time <= 0 || !deep) {
    title = "Woda na jeden sezon?";
    grade = "MISJA KRUCHA";
    lead = "Woda płynie, ale projekt zostawia ryzyko: budżet, termin albo głębokość odwiertu nie dają spokoju. Pomoc dotarła — nie wiadomo jednak, czy przetrwa kolejną porę suchą.";
  } else {
    title = "Studnia to dopiero początek";
    grade = "MISJA OTWARTA";
    lead = "Ujęcie działa, lecz zaufanie lub plan napraw wymagają dalszej pracy. Techniczny sukces nie zawsze oznacza trwałą zmianę. Zespół zostaje na kolejne spotkanie ze wspólnotą.";
  }

  els.chapter.textContent = "EPILOG";
  els.progress.style.width = "100%";
  els.progressText.textContent = "7 / 7";
  els.day.textContent = "8";
  els.eyebrow.textContent = grade;
  els.title.textContent = title;
  els.text.innerHTML = `<div class="ending-card"><strong>${grade}</strong><p>${lead}</p></div><p>Zebrałeś ${evidence} z 5 tropów. Zakończyłeś misję z zaufaniem ${state.trust}%, budżetem ${formatMoney(state.budget)} i zapasem ${state.time} dni.</p><p><b>Najważniejszy wniosek:</b> studnia jest wspólnym systemem technicznym i społecznym. Potrzebuje bezpiecznego ujęcia, badań, dostępności, funduszu napraw i ludzi przygotowanych do opieki.</p>`;
  els.fact.hidden = true;
  els.feedback.hidden = true;
  els.choices.innerHTML = `<button class="choice-button restart-choice" type="button" id="playAgain"><span class="choice-number">↻</span><span class="choice-copy"><b>Zagraj ponownie</b><small>Odkryj inne tropy i zakończenie</small></span><span class="choice-arrow">→</span></button>`;
  $("playAgain").addEventListener("click", resetGame);
  localStorage.removeItem("slad-wody-save");
  updateStatus();
}

function render() {
  if (state.scene === "ending") return ending();
  const scene = scenes[state.scene];
  els.chapter.textContent = scene.chapter;
  els.progress.style.width = (scene.step / 7 * 100) + "%";
  els.progressText.textContent = scene.step + " / 7";
  els.day.textContent = scene.day;
  els.eyebrow.textContent = scene.eyebrow;
  els.title.textContent = scene.title;
  els.text.innerHTML = scene.text;
  els.fact.textContent = scene.fact || "";
  els.fact.hidden = !scene.fact;
  els.feedback.hidden = true;
  els.feedback.className = "feedback";
  els.choices.innerHTML = scene.choices.map((choice, index) => `
    <button class="choice-button" type="button" data-choice="${index}">
      <span class="choice-number">0${index + 1}</span>
      <span class="choice-copy"><b>${choice.label}</b><small>${choice.sub}</small></span>
      <span class="choice-arrow">→</span>
    </button>`).join("");
  els.choices.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => choose(scene.choices[Number(button.dataset.choice)], Number(button.dataset.choice)));
  });
  updateStatus();
}

function begin(fresh = true) {
  if (fresh) state = { ...structuredClone(defaultState), started: true };
  else state.started = true;
  els.overlay.hidden = true;
  document.body.style.overflow = "";
  save();
  render();
  $("game").focus?.();
}

function resetGame() {
  state = structuredClone(defaultState);
  localStorage.removeItem("slad-wody-save");
  els.overlay.hidden = false;
  els.resume.hidden = true;
  document.body.style.overflow = "hidden";
  render();
  els.start.focus();
}

load();
if (state.started && state.scene !== "ending") els.resume.hidden = false;
document.body.style.overflow = "hidden";
els.start.addEventListener("click", () => begin(true));
els.resume.addEventListener("click", () => begin(false));
els.reset.addEventListener("click", resetGame);
render();
