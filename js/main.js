/* ============================================================
   PowerRH Consultoria — main.js
   Navbar, drawer mobile, reveal on scroll, formulário de diagnóstico.
   ============================================================ */
(function () {
  "use strict";

  /* ----------------------------------------------------------
     CONFIG — preencher quando a Gracy responder o briefing.
     TODO: WhatsApp comercial, e-mail do formulário e domínio.
     ---------------------------------------------------------- */
  var CONFIG = {
    whatsapp: "",      // ex.: "5591984376712" (somente dígitos, com DDI+DDD)
    email: "",         // ex.: "contato@powerrh.com.br"
    domain: "",        // ex.: "https://www.powerrh.com.br"
    formEndpoint: ""   // ex.: endpoint do FormSubmit/serviço de envio; vazio = simula envio local
  };

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Ano dinâmico ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Navbar: transparente -> navy sólida ---------- */
  var navbar = document.querySelector(".navbar");
  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  if (navbar) {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Drawer mobile ---------- */
  var toggle = document.querySelector(".navbar__toggle");
  var drawer = document.querySelector(".drawer");
  var overlay = document.querySelector(".drawer__overlay");
  var closeBtn = document.querySelector(".drawer__close");
  var lastFocused = null;

  function openDrawer() {
    lastFocused = document.activeElement;
    drawer.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    toggle.setAttribute("aria-expanded", "true");
    closeBtn.focus();
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    toggle.setAttribute("aria-expanded", "false");
    if (lastFocused) lastFocused.focus();
  }

  if (toggle && drawer) {
    toggle.addEventListener("click", openDrawer);
    closeBtn.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("open")) closeDrawer();
    });
    // Fecha o drawer ao navegar (mantém foco simples)
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeDrawer);
    });
    // Foco travado dentro do drawer (ciclo simples com Tab)
    drawer.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var focusables = drawer.querySelectorAll("a, button");
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Links configuráveis (WhatsApp / e-mail) ---------- */
  document.querySelectorAll("[data-config-whatsapp]").forEach(function (a) {
    if (CONFIG.whatsapp) {
      var msg = encodeURIComponent("Olá! Visitei o site da PowerRH e gostaria de agendar uma Reunião Estratégica de Diagnóstico.");
      a.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + msg;
      a.removeAttribute("aria-disabled");
    } else {
      // Placeholder: mantém o link visível, mas sem destino até a Gracy informar o número.
      a.href = "#";
      a.setAttribute("aria-disabled", "true");
      a.title = "Número do WhatsApp a definir";
    }
  });

  document.querySelectorAll("[data-config-email]").forEach(function (a) {
    if (CONFIG.email) {
      a.href = "mailto:" + CONFIG.email;
      a.textContent = CONFIG.email;
    }
    // sem e-mail configurado: o HTML já traz o texto "a definir" + comentário TODO
  });

  /* ---------- Pré-seleção do desafio via URL (?desafio=...) ---------- */
  var params = new URLSearchParams(window.location.search);
  var desafioParam = params.get("desafio");
  if (desafioParam) {
    var map = {
      cultura: "cultura",
      lideranca: "lideranca",
      sucessao: "sucessao"
    };
    var key = map[desafioParam.toLowerCase()];
    if (key) {
      var radio = document.querySelector('input[name="desafio"][value="' + key + '"]');
      if (radio) radio.checked = true;
    }
  }

  /* ---------- Formulário de diagnóstico ---------- */
  var form = document.getElementById("diagnostico-form");
  if (!form) return;

  var successPanel = document.getElementById("form-success");
  var submitBtn = form.querySelector('[type="submit"]');

  function setFieldError(field, message) {
    field.classList.add("field--error");
    var err = field.querySelector(".field__error");
    if (err) {
      err.textContent = message;
      err.id = err.id || "err-" + Math.random().toString(36).slice(2, 8);
      var input = field.querySelector("input, select, textarea");
      if (input) input.setAttribute("aria-describedby", err.id);
    }
  }

  function clearFieldError(field) {
    field.classList.remove("field--error");
    var input = field.querySelector("input, select, textarea");
    if (input) input.removeAttribute("aria-describedby");
  }

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var firstError = null;

    // Campos de texto
    ["nome", "email", "telefone", "empresa"].forEach(function (name) {
      var input = form.querySelector('[name="' + name + '"]');
      var field = input.closest(".field");
      clearFieldError(field);
      var val = input.value.trim();
      if (!val) {
        setFieldError(field, "Este campo é obrigatório.");
        if (!firstError) firstError = input;
      } else if (name === "email" && !isValidEmail(val)) {
        setFieldError(field, "Informe um e-mail válido.");
        if (!firstError) firstError = input;
      }
    });

    // Grupos de radio
    ["colaboradores", "desafio"].forEach(function (name) {
      var group = form.querySelector('[data-group="' + name + '"]');
      clearFieldError(group);
      var checked = form.querySelector('input[name="' + name + '"]:checked');
      if (!checked) {
        setFieldError(group, "Escolha uma das opções.");
        if (!firstError) firstError = group.querySelector("input");
      }
    });

    // Consentimento LGPD
    var consent = form.querySelector('[name="consentimento"]');
    var consentField = consent.closest(".field");
    clearFieldError(consentField);
    if (!consent.checked) {
      setFieldError(consentField, "É necessário autorizar o contato para prosseguir.");
      if (!firstError) firstError = consent;
    }

    if (firstError) {
      firstError.focus();
      return;
    }

    // Estado de loading
    submitBtn.classList.add("btn--loading");
    submitBtn.disabled = true;
    var originalLabel = submitBtn.querySelector(".btn__label").textContent;
    submitBtn.querySelector(".btn__label").textContent = "Enviando…";

    function showSuccess() {
      form.hidden = true;
      successPanel.hidden = false;
      successPanel.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
      var heading = successPanel.querySelector("h2");
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }

    if (CONFIG.formEndpoint) {
      // Envio real para o endpoint configurado
      var data = new FormData(form);
      fetch(CONFIG.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error("Falha no envio");
          showSuccess();
        })
        .catch(function () {
          submitBtn.classList.remove("btn--loading");
          submitBtn.disabled = false;
          submitBtn.querySelector(".btn__label").textContent = originalLabel;
          var alertBox = document.getElementById("form-alert");
          alertBox.hidden = false;
          alertBox.focus();
        });
    } else {
      // Sem endpoint: simula o envio (modo demonstração)
      setTimeout(showSuccess, 900);
    }
  });

  // Limpa erro ao digitar / trocar opção
  form.addEventListener("input", function (e) {
    var field = e.target.closest(".field");
    if (field) clearFieldError(field);
  });
  form.addEventListener("change", function (e) {
    var field = e.target.closest(".field");
    if (field) clearFieldError(field);
  });
})();
