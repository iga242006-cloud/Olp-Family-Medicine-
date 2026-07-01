(function () {
  "use strict";

  var GREETING =
    "Hi! I'm ARIA. I can answer questions about membership, pricing, and scheduling at Olp Family Medicine. What can I help you with?";

  var CHIPS = [
    "How much is membership?",
    "What's included?",
    "Do you take insurance?",
    "How do I join?",
    "Hours & location",
    "Weight loss program"
  ];

  var FALLBACK =
    "That's a great question — I want to make sure you get a real answer from our team. I'll have someone follow up with you. What's the best number to reach you?";

  var RESPONSES = [
    {
      keys: ["how much", "cost", "price", "pricing", "fee", "fees", "rate", "monthly", "afford", "expensive"],
      reply:
        "Membership is one flat, transparent monthly fee — no copays, no surprise bills, no insurance paperwork.\n\nIt covers all of your primary care: office visits, preventative care, annual labs, and virtual visits. You can see sample plans on our home page, and we're happy to walk you through current rates at (317) 343-0611."
    },
    {
      keys: ["included", "include", "covered", "what do i get", "what comes with", "benefit"],
      reply:
        "Your membership includes:\n\n• Same or next-day appointments\n• Relaxed 30–60 minute visits\n• Direct call, text, and video access to your care team\n• All primary and preventative care\n• Annual labs\n• Virtual visits\n\nNo copays, ever. Optional add-ons include weight loss support and hormone replacement therapy."
    },
    {
      keys: ["insurance", "copay", "co-pay", "medicare", "medicaid", "hsa", "deductible", "bill my"],
      reply:
        "We don't bill insurance — and that's by design. Skipping the insurance middleman is what lets Dr. Olp keep visits long, access direct, and pricing transparent.\n\nMany members pair their membership with a high-deductible or catastrophic plan for emergencies, specialists, and hospital care. We're happy to talk through how that works: (317) 343-0611."
    },
    {
      keys: ["dpc", "direct primary care", "how does it work", "how it works", "membership work", "what is this", "model"],
      reply:
        "Direct Primary Care is simple: instead of billing insurance for every visit, you pay the practice one flat monthly fee.\n\nThat covers all your primary care — and because Dr. Olp keeps her patient panel intentionally small, you get same or next-day visits, unhurried 30–60 minute appointments, and her direct number."
    },
    {
      keys: ["join", "sign up", "signup", "enroll", "become a member", "new patient", "get started", "accepting"],
      reply:
        "We'd love to meet you! Joining is easy:\n\n1. Call or text us at (317) 343-0611\n2. Or email info@olpfamilymedicine.com\n3. Or send the form on our Contact page\n\nWe keep our patient panel small on purpose, so we recommend reaching out soon to check availability."
    },
    {
      keys: ["hour", "open", "location", "address", "where", "directions", "parking", "carmel", "schedule", "appointment"],
      reply:
        "You'll find us at 221 N Rangeline Rd, Carmel, IN 46032 — right in the heart of Carmel.\n\nOffice visits are by appointment, usually same or next day for members. Members can also reach the team directly by call, text, or video anytime. Phone: (317) 343-0611."
    },
    {
      keys: ["weight", "glp", "glp-1", "semaglutide", "nutrition", "diet", "lose", "obesity"],
      reply:
        "Our weight loss support program is a popular add-on. It combines nutrition coaching, lifestyle modification, and — when appropriate — GLP-1 injections, all guided personally by Dr. Olp.\n\nBecause visits are 30–60 minutes, there's real time to build a plan that fits your life. Want to learn more? Call (317) 343-0611."
    },
    {
      keys: ["hormone", "hrt", "menopause", "perimenopause", "estrogen", "testosterone", "thyroid"],
      reply:
        "Yes — hormone replacement therapy is available as a membership add-on. Dr. Olp takes a thoughtful, evidence-based approach to hormone health, with the unhurried visits it deserves.\n\nWomen's health is one of her core specialties. Call (317) 343-0611 to talk through whether HRT is right for you."
    },
    {
      keys: ["dr olp", "dr. olp", "ashlie", "doctor", "physician", "who is", "molly", "candi", "team", "staff"],
      reply:
        "Dr. Ashlie Olp, MD is a board-certified family physician (IU School of Medicine) and a Carmel native — she founded the practice in 2017 after her own frustrating experience as a patient.\n\nShe's joined by Molly, our adult primary care NP (Vanderbilt-trained), and Candi, a professional medical assistant who has worked with Dr. Olp since 2002. You can meet them all on our About page."
    },
    {
      keys: ["thank", "thanks", "great", "awesome", "perfect"],
      reply:
        "You're so welcome! Is there anything else I can help you with — membership, pricing, or scheduling?"
    },
    {
      keys: ["hi", "hello", "hey", "good morning", "good afternoon"],
      reply:
        "Hello! 👋 I'm ARIA, Olp Family Medicine's virtual receptionist. Ask me about membership, what's included, insurance, or how to join — or tap one of the suggestions below."
    }
  ];

  var awaitingPhone = false;
  var opened = false;
  var greeted = false;

  /* ---- Build widget DOM ---- */

  var root = document.createElement("div");
  root.className = "aria-widget";
  root.innerHTML =
    '<button class="aria-launcher" type="button" aria-label="Chat with ARIA, our virtual receptionist" aria-expanded="false">' +
    '  <svg class="icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>' +
    '  <svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
    '  <span class="aria-unread" aria-hidden="true"></span>' +
    "</button>" +
    '<div class="aria-panel" role="dialog" aria-label="ARIA — Olp Family Medicine\'s virtual receptionist">' +
    '  <div class="aria-header">' +
    '    <div class="aria-avatar" aria-hidden="true">A</div>' +
    '    <div class="titles">' +
    "      <strong>ARIA <span class=\"status-dot\" aria-hidden=\"true\"></span></strong>" +
    "      <span>Olp Family Medicine's virtual receptionist</span>" +
    "    </div>" +
    '    <button class="aria-close" type="button" aria-label="Close chat">' +
    '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
    "    </button>" +
    "  </div>" +
    '  <div class="aria-messages" aria-live="polite"></div>' +
    '  <div class="aria-chips"></div>' +
    '  <form class="aria-input-row">' +
    '    <input type="text" placeholder="Type your question…" aria-label="Type your question" autocomplete="off" />' +
    '    <button class="aria-send" type="submit" aria-label="Send message">' +
    '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>' +
    "    </button>" +
    "  </form>" +
    '  <div class="aria-footer-note">ARIA demo by Pavlina · Responses are scripted for demonstration</div>' +
    "</div>";
  document.body.appendChild(root);

  var launcher = root.querySelector(".aria-launcher");
  var unread = root.querySelector(".aria-unread");
  var closeBtn = root.querySelector(".aria-close");
  var messages = root.querySelector(".aria-messages");
  var chipsWrap = root.querySelector(".aria-chips");
  var form = root.querySelector(".aria-input-row");
  var input = form.querySelector("input");

  /* ---- Helpers ---- */

  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  function addMessage(text, who) {
    var el = document.createElement("div");
    el.className = "aria-msg " + who;
    el.textContent = text;
    messages.appendChild(el);
    scrollToBottom();
  }

  function showTyping() {
    var t = document.createElement("div");
    t.className = "aria-typing";
    t.innerHTML = "<i></i><i></i><i></i>";
    messages.appendChild(t);
    scrollToBottom();
    return t;
  }

  function botReply(text, delay) {
    var t = showTyping();
    window.setTimeout(function () {
      t.remove();
      addMessage(text, "bot");
    }, delay || 850);
  }

  function renderChips() {
    chipsWrap.innerHTML = "";
    CHIPS.forEach(function (label) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "aria-chip";
      chip.textContent = label;
      chip.addEventListener("click", function () {
        handleUserMessage(label);
      });
      chipsWrap.appendChild(chip);
    });
  }

  function matchResponse(text) {
    var q = text.toLowerCase();
    for (var i = 0; i < RESPONSES.length; i++) {
      var r = RESPONSES[i];
      for (var k = 0; k < r.keys.length; k++) {
        if (q.indexOf(r.keys[k]) !== -1) return r.reply;
      }
    }
    return null;
  }

  function handleUserMessage(text) {
    var clean = text.trim();
    if (!clean) return;
    addMessage(clean, "user");

    if (awaitingPhone) {
      awaitingPhone = false;
      var digits = clean.replace(/\D/g, "");
      if (digits.length >= 7) {
        botReply(
          "Perfect — thank you! I've passed your number along and someone from Olp Family Medicine will reach out shortly. 🌿\n\n(This is a demo — no message was actually sent.)"
        );
      } else {
        botReply(
          "No problem! You can always reach the team directly at (317) 343-0611 or info@olpfamilymedicine.com. Is there anything else I can help with?"
        );
      }
      return;
    }

    var reply = matchResponse(clean);
    if (reply) {
      botReply(reply);
    } else {
      awaitingPhone = true;
      botReply(FALLBACK);
    }
  }

  /* ---- Open / close ---- */

  function setOpen(open) {
    opened = open;
    document.body.classList.toggle("aria-open", open);
    launcher.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      if (unread) unread.remove();
      if (!greeted) {
        greeted = true;
        window.setTimeout(function () {
          botReply(GREETING, 900);
          renderChips();
        }, 250);
      }
      window.setTimeout(function () { input.focus(); }, 350);
    }
  }

  launcher.addEventListener("click", function () { setOpen(!opened); });
  closeBtn.addEventListener("click", function () { setOpen(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && opened) setOpen(false);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var val = input.value;
    input.value = "";
    handleUserMessage(val);
  });
})();
