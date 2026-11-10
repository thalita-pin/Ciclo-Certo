/* CICLO CERTO — interações locais, sem bibliotecas ou serviços externos.
 * Para editar as perguntas: veja o array QUESTIONS abaixo.
 * Para editar o guia: veja o objeto DEVICE_GUIDE abaixo.
 */
"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// Armazenamento opcional: o site continua funcionando se o navegador bloquear localStorage.
const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* opcional */
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* opcional */
    }
  },
};

// ----- Navegação, acessibilidade e volta ao topo -----
const nav = $("#main-nav");
const menuButton = $("#menu-toggle");
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  menuButton.setAttribute(
    "aria-label",
    expanded ? "Abrir menu" : "Fechar menu",
  );
  nav.classList.toggle("open", !expanded);
});
$$("#main-nav a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
  }),
);
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
  }
});

const contrastButton = $("#contrast");
const setContrast = (enabled) => {
  document.body.classList.toggle("high-contrast", enabled);
  contrastButton.setAttribute("aria-pressed", String(enabled));
  storage.set("ciclo-contraste", String(enabled));
};
setContrast(storage.get("ciclo-contraste") === "true");
contrastButton.addEventListener("click", () =>
  setContrast(!document.body.classList.contains("high-contrast")),
);
let fontScale = Number(storage.get("ciclo-fonte")) || 1;
if (!Number.isFinite(fontScale) || fontScale < 0.9 || fontScale > 1.3)
  fontScale = 1;
const applyFontScale = () => {
  document.documentElement.style.setProperty(
    "--font-scale",
    fontScale.toFixed(2),
  );
  storage.set("ciclo-fonte", String(fontScale));
};
applyFontScale();
$("#font-up").addEventListener("click", () => {
  fontScale = Math.min(1.3, Math.round((fontScale + 0.1) * 100) / 100);
  applyFontScale();
});
$("#font-down").addEventListener("click", () => {
  fontScale = Math.max(0.9, Math.round((fontScale - 0.1) * 100) / 100);
  applyFontScale();
});

const topButton = $("#back-to-top");
const updateTopButton = () =>
  topButton.classList.toggle("visible", window.scrollY > 420);
window.addEventListener("scroll", updateTopButton, { passive: true });
updateTopButton();
topButton.addEventListener("click", () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
});

// ----- Guia de descarte: orientações por material -----
const DEVICE_GUIDE = {
  celular: {
    title: "Celular ou tablet",
    intro:
      "Mesmo pequeno, o aparelho contém materiais que merecem destinação adequada.",
    steps: [
      "Se ainda funcionar, avalie consertar ou doar para prolongar o uso.",
      "Se for possível ligar o aparelho, faça backup do que precisa e remova contas, cartões e dados pessoais antes de doar ou descartar.",
      "Não tente abrir nem retirar a bateria integrada. Procure um recebimento de eletroeletrônicos.",
      "Consulte a ABREE ou as opções de Curitiba e confira se o local aceita seu aparelho.",
    ],
    alert:
      "Se a bateria estiver estufada, vazando ou muito quente, não a perfure, pressione, carregue ou tente removê-la. Peça orientação especializada.",
    label: "Encontrar ponto na ABREE ↗",
    url: "https://abree.org.br/",
  },
  computador: {
    title: "Computador ou periférico",
    intro:
      "Notebooks, monitores, impressoras e acessórios podem seguir para logística reversa.",
    steps: [
      "Avalie se o equipamento pode ser reaproveitado, consertado ou doado.",
      "Se houver armazenamento de dados, apague arquivos e contas com segurança antes da doação ou destinação, quando possível.",
      "Mantenha peças e baterias no equipamento; não faça desmontagem caseira.",
      "Consulte um ponto oficial e verifique se recebe o tipo e o tamanho do item.",
    ],
    alert:
      "Monitores, impressoras e notebooks podem ter componentes que exigem tratamento especializado. Não quebre nem queime.",
    label: "Ver locais na ABREE ↗",
    url: "https://abree.org.br/",
  },
  cabo: {
    title: "Cabos, carregadores e fones",
    intro:
      "Acessórios também são resíduos eletrônicos quando não podem mais ser usados.",
    steps: [
      "Verifique se o acessório pode ser reutilizado de forma segura.",
      "Separe os itens de resíduos orgânicos e evite cortar ou desmontar cabos.",
      "Procure um ponto que aceite acessórios eletroeletrônicos.",
      "Confira as regras de entrega e leve os materiais organizados.",
    ],
    alert:
      "Carregadores danificados podem oferecer risco elétrico. Não continue usando peças com fios expostos ou superaquecimento.",
    label: "Ver orientações de Curitiba ↗",
    url: "https://coletalixo.curitiba.pr.gov.br/lixo-eletroeletronico",
  },
  pilha: {
    title: "Pilhas e baterias portáteis",
    intro:
      "São materiais que precisam de uma destinação específica, diferente da lixeira comum.",
    steps: [
      "Guarde temporariamente em um local seco, fresco e longe de crianças e fontes de calor.",
      "Não abra, esmague, perfure nem tente recarregar pilhas não recarregáveis.",
      "Consulte os locais para pilhas e baterias no portal da Green Eletron.",
      "Confirme o tipo aceito no ponto antes de levar; baterias maiores podem ter outras regras.",
    ],
    alert:
      "Se houver vazamento, estufamento, aquecimento ou dano, evite manusear e solicite orientação ao ponto especializado antes de transportar.",
    label: "Pesquisar no portal Green Eletron ↗",
    url: "https://greeneletron.org.br/onde-descartar/",
  },
  eletrodomestico: {
    title: "Eletrodoméstico ou eletrônico grande",
    intro:
      "Equipamentos de maior porte podem exigir agendamento ou condições de entrega próprias.",
    steps: [
      "Verifique se é possível consertar, reutilizar ou doar o equipamento em boas condições.",
      "Não abra componentes, não descarte peças no lixo doméstico e evite quebrar o produto.",
      "Consulte a Prefeitura de Curitiba ou a ABREE para identificar o recebimento adequado.",
      "Confirme previamente local, horário, tamanho e quantidade permitida.",
    ],
    alert:
      "Geladeiras e aparelhos de ar-condicionado exigem cuidados específicos por causa de fluidos e outros componentes; use serviço apropriado.",
    label: "Consultar a Prefeitura de Curitiba ↗",
    url: "https://coletalixo.curitiba.pr.gov.br/lixo-eletroeletronico",
  },
};
const deviceSelect = $("#device-select");
let condition = "sem-uso";
function renderDeviceGuide() {
  const guide = DEVICE_GUIDE[deviceSelect.value];
  $("#result-title").textContent = guide.title;
  $("#result-intro").textContent =
    condition === "danificado"
      ? `${guide.intro} Se estiver quebrado, evite utilizá-lo ou tentar desmontá-lo.`
      : guide.intro;
  const list = $("#result-steps");
  list.replaceChildren();
  guide.steps.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    list.append(li);
  });
  $("#result-alert").textContent = guide.alert;
  const link = $("#result-link");
  link.href = guide.url;
  link.textContent = guide.label;
}
deviceSelect.addEventListener("change", renderDeviceGuide);
$$(".condition").forEach((button) =>
  button.addEventListener("click", () => {
    condition = button.dataset.condition;
    $$(".condition").forEach((b) => {
      const active = b === button;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    renderDeviceGuide();
  }),
);
$$(".choose-device").forEach((button) =>
  button.addEventListener("click", () => {
    deviceSelect.value = button.dataset.device;
    renderDeviceGuide();
    $("#guia").scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }),
);
renderDeviceGuide();

// ----- Desafio de boas práticas -----
const habitInputs = $$(".habit input[type=checkbox]");
const savedHabits = (() => {
  try {
    const saved = JSON.parse(storage.get("ciclo-habitos") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
})();
habitInputs.forEach((input, i) => {
  input.checked = savedHabits[i] === true;
});
function updateHabitProgress() {
  const total = habitInputs.filter((input) => input.checked).length;
  $("#habit-counter").textContent = `${total} de ${habitInputs.length}`;
  $("#habit-progress").style.width = `${(total / habitInputs.length) * 100}%`;
  $("#habit-message").textContent =
    total === 4
      ? "Muito bem! Agora você já conhece quatro atitudes importantes."
      : total === 0
        ? "Um pequeno passo já conta."
        : total === 1
          ? "Ótimo começo. Continue aprendendo."
          : total === 2
            ? "Você já está no meio do caminho."
            : "Só falta mais uma atitude para completar a lista.";
  storage.set(
    "ciclo-habitos",
    JSON.stringify(habitInputs.map((input) => input.checked)),
  );
}
habitInputs.forEach((input) =>
  input.addEventListener("change", updateHabitProgress),
);
$("#reset-habits").addEventListener("click", () => {
  habitInputs.forEach((input) => {
    input.checked = false;
  });
  updateHabitProgress();
});
updateHabitProgress();

// ----- Quiz educativo: 8 questões, respostas com explicações -----
const QUESTIONS = [
  {
    question: "O que pode ser considerado lixo eletrônico?",
    options: [
      "Somente celulares muito antigos.",
      "Equipamentos elétricos ou eletrônicos sem uso, como celulares e carregadores.",
      "Somente papel e plástico.",
    ],
    correct: 1,
    explanation:
      "Celulares, computadores, cabos, carregadores e muitos outros equipamentos sem uso podem ser resíduos eletrônicos.",
  },
  {
    question:
      "Qual é uma atitude adequada ao encontrar um celular antigo funcionando?",
    options: [
      "Verificar se pode ser reutilizado ou doado, removendo os dados pessoais.",
      "Quebrá-lo para separar os materiais.",
      "Jogá-lo no lixo comum sem verificar nada.",
    ],
    correct: 0,
    explanation:
      "Prolongar a vida útil é uma boa opção. Antes de doar, remova seus dados e contas, quando possível.",
  },
  {
    question: "Por que o descarte incorreto de alguns eletrônicos preocupa?",
    options: [
      "Porque sempre deixam o lixo mais pesado.",
      "Porque não podem ser consertados.",
      "Porque podem liberar substâncias perigosas e causar contaminação ambiental.",
    ],
    correct: 2,
    explanation:
      "Alguns componentes podem representar riscos ao ambiente e à saúde quando descartados ou reciclados de forma inadequada.",
  },
  {
    question: "Onde procurar um local de entrega de eletrônicos em Curitiba?",
    options: [
      "Em qualquer lixeira da rua.",
      "Nos canais da Prefeitura de Curitiba e em buscadores de pontos de logística reversa, como a ABREE.",
      "Somente em uma loja de material escolar.",
    ],
    correct: 1,
    explanation:
      "A Prefeitura e a ABREE orientam a população sobre opções de recebimento. Confirme o tipo de item aceito no local.",
  },
  {
    question: "O que fazer com pilhas e baterias portáteis usadas?",
    options: [
      "Descartar com restos de alimentos.",
      "Abrir para reaproveitar o material.",
      "Buscar um ponto apropriado para pilhas e baterias, como os indicados pela Green Eletron.",
    ],
    correct: 2,
    explanation:
      "Pilhas e baterias portáteis devem seguir orientações específicas de logística reversa.",
  },
  {
    question:
      "Qual cuidado é importante quando um aparelho contém dados pessoais?",
    options: [
      "Apagar contas e dados antes de doar ou entregar, se isso puder ser feito com segurança.",
      "Deixar senhas anotadas junto ao aparelho.",
      "Publicar fotos da tela com informações pessoais.",
    ],
    correct: 0,
    explanation:
      "Proteja sua privacidade: faça backup do que precisa e remova os dados antes de repassar o dispositivo, quando possível.",
  },
  {
    question:
      "Uma bateria está estufada, vazando ou muito quente. O que fazer?",
    options: [
      "Perfurá-la para diminuir o volume.",
      "Evitar o manuseio e solicitar orientação especializada antes de transportar.",
      "Colocá-la ao sol para secar.",
    ],
    correct: 1,
    explanation:
      "Não perfure, pressione, aqueça ou recarregue uma bateria danificada. Procure orientação especializada.",
  },
  {
    question:
      "Antes de levar um aparelho a um ponto de coleta, é importante...",
    options: [
      "Conferir se o local aceita aquele tipo de equipamento e quais são os horários de atendimento.",
      "Desmontar completamente o aparelho em casa.",
      "Ignorar as regras de recebimento.",
    ],
    correct: 0,
    explanation:
      "As condições de entrega podem variar. Confirme endereço, horário e tipo de material aceito.",
  },
];
let quizIndex = 0;
let quizScore = 0;
let selectedIndex = null;
let answered = false;
const quizOptions = $("#quiz-options");
const quizButton = $("#quiz-next");
function renderQuestion() {
  const q = QUESTIONS[quizIndex];
  selectedIndex = null;
  answered = false;
  $("#quiz-count").textContent =
    `PERGUNTA ${quizIndex + 1} DE ${QUESTIONS.length}`;
  $("#quiz-score").textContent =
    `${quizScore} ${quizScore === 1 ? "ponto" : "pontos"}`;
  $("#quiz-progress-fill").style.width =
    `${((quizIndex + 1) / QUESTIONS.length) * 100}%`;
  $("#quiz-question").textContent = q.question;
  quizOptions.replaceChildren();
  const letters = ["A", "B", "C", "D"];
  q.options.forEach((option, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    const badge = document.createElement("span");
    badge.className = "option-letter";
    badge.textContent = letters[i];
    const content = document.createElement("span");
    content.textContent = option;
    button.append(badge, content);
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      if (answered) return;
      selectedIndex = i;
      $$(".quiz-option", quizOptions).forEach((opt, j) => {
        opt.classList.toggle("selected", j === i);
        opt.setAttribute("aria-pressed", String(j === i));
      });
      quizButton.disabled = false;
    });
    quizOptions.append(button);
  });
  const feedback = $("#quiz-feedback");
  feedback.hidden = true;
  feedback.classList.remove("wrong");
  quizButton.disabled = true;
  quizButton.textContent = "Verificar resposta →";
}
function showQuizResult() {
  $("#quiz-question-screen").hidden = true;
  $("#quiz-result-screen").hidden = false;
  $("#quiz-final-score").textContent = `${quizScore}/${QUESTIONS.length}`;
  $("#quiz-result-title").textContent =
    quizScore === QUESTIONS.length
      ? "Excelente! Tudo certo."
      : "Você concluiu o desafio!";
  $("#quiz-result-text").textContent =
    quizScore >= 7
      ? "Você reconheceu muito bem os cuidados com o descarte de eletrônicos. Compartilhe o que aprendeu!"
      : quizScore >= 4
        ? "Bom caminho! Reveja as orientações do guia e tente novamente para reforçar seu aprendizado."
        : "Cada resposta é uma oportunidade de aprender. Explore as seções e refaça o desafio.";
}
quizButton.addEventListener("click", () => {
  if (!answered) {
    if (selectedIndex === null) return;
    const q = QUESTIONS[quizIndex];
    const correct = selectedIndex === q.correct;
    if (correct) quizScore++;
    answered = true;
    const options = $$(".quiz-option", quizOptions);
    options.forEach((option, i) => {
      option.disabled = true;
      if (i === q.correct) option.classList.add("correct");
      else if (i === selectedIndex) option.classList.add("incorrect");
    });
    const feedback = $("#quiz-feedback");
    feedback.hidden = false;
    feedback.classList.toggle("wrong", !correct);
    feedback.textContent = `${correct ? "✓ Resposta correta!" : "✕ Não foi dessa vez."} ${q.explanation}`;
    $("#quiz-score").textContent =
      `${quizScore} ${quizScore === 1 ? "ponto" : "pontos"}`;
    quizButton.textContent =
      quizIndex + 1 === QUESTIONS.length
        ? "Ver resultado →"
        : "Próxima pergunta →";
  } else {
    quizIndex++;
    if (quizIndex === QUESTIONS.length) showQuizResult();
    else renderQuestion();
  }
});
$("#quiz-restart").addEventListener("click", () => {
  quizIndex = 0;
  quizScore = 0;
  $("#quiz-question-screen").hidden = false;
  $("#quiz-result-screen").hidden = true;
  renderQuestion();
});
$("#quiz-download").addEventListener("click", () => {
  const date = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());
  const text = [
    "CICLO CERTO — RESULTADO DO QUIZ",
    "Projeto educativo: descarte consciente de lixo eletrônico",
    `Data: ${date}`,
    `Resultado: ${quizScore} de ${QUESTIONS.length} respostas corretas`,
    "",
    "Este comprovante informa somente a pontuação obtida neste navegador.",
    "Não comprova presença em atividade presencial nem mede acessos ao site.",
    "Nenhum nome ou dado pessoal foi solicitado.",
  ].join("\n");
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "resultado-quiz-ciclo-certo.txt";
  link.style.display = "none";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
renderQuestion();
