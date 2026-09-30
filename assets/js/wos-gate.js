/* Ways of Seeing — sign-in gate.
   A courtesy gate, not a lock: it asks visitors for an email before they enter and remembers
   them on this device. It stays switched off until WOS_GATE.endpoint is set below. */
(function () {
  "use strict";

  var WOS_GATE = {
    endpoint: "",                 // where sign-ins are sent (a form service address)
    fields: { name: "name", email: "email", role: "role", updates: "updates" },
    storageKey: "wos-entered"
  };

  if (!WOS_GATE.endpoint) return;
  try { if (localStorage.getItem(WOS_GATE.storageKey)) return; } catch (e) { return; }

  var root = document.documentElement;
  var gate = document.createElement("div");
  gate.className = "wos-gate";
  gate.setAttribute("role", "dialog");
  gate.setAttribute("aria-modal", "true");
  gate.setAttribute("aria-labelledby", "wos-gate-title");
  gate.innerHTML =
    '<form class="wos-gate-card" novalidate>' +
      '<p class="wos-eyebrow">Ways of Seeing</p>' +
      '<h2 id="wos-gate-title">Before you enter</h2>' +
      '<p>This archive is free to use. We ask for your email so that we know who it is reaching, ' +
      'and so that the people whose work is gathered here can know too.</p>' +
      '<label for="wos-gate-name">Name (optional)</label>' +
      '<input id="wos-gate-name" type="text" autocomplete="name">' +
      '<label for="wos-gate-email">Email</label>' +
      '<input id="wos-gate-email" type="email" autocomplete="email" required>' +
      '<label for="wos-gate-role">I am here as (optional)</label>' +
      '<select id="wos-gate-role">' +
        '<option value="">Choose one</option>' +
        '<option>A community member</option>' +
        '<option>A filmmaker or media maker</option>' +
        '<option>A student or researcher</option>' +
        '<option>A teacher</option>' +
        '<option>Someone else</option>' +
      '</select>' +
      '<label class="wos-gate-check"><input id="wos-gate-updates" type="checkbox"> ' +
      '<span>Email me occasionally when the archive changes.</span></label>' +
      '<p class="wos-gate-error" hidden>Please enter a valid email address.</p>' +
      '<button type="submit">Enter the archive</button>' +
      '<p class="wos-gate-note">Your email is kept by the curator, is never sold or shared, and is ' +
      'removed on request: contact@arpitgaind.com.</p>' +
    '</form>';

  function open() {
    document.body.appendChild(gate);
    root.classList.add("wos-gated");
    var first = gate.querySelector("#wos-gate-email");
    if (first) first.focus();
  }

  function close() {
    try { localStorage.setItem(WOS_GATE.storageKey, String(Date.now())); } catch (e) {}
    root.classList.remove("wos-gated");
    if (gate.parentNode) gate.parentNode.removeChild(gate);
  }

  gate.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = gate.querySelector("#wos-gate-email");
    var err = gate.querySelector(".wos-gate-error");
    if (!email.value || !email.checkValidity()) { err.hidden = false; email.focus(); return; }
    var data = new FormData();
    data.append(WOS_GATE.fields.email, email.value.trim());
    data.append(WOS_GATE.fields.name, gate.querySelector("#wos-gate-name").value.trim());
    data.append(WOS_GATE.fields.role, gate.querySelector("#wos-gate-role").value);
    data.append(WOS_GATE.fields.updates, gate.querySelector("#wos-gate-updates").checked ? "Yes" : "No");
    try { fetch(WOS_GATE.endpoint, { method: "POST", mode: "no-cors", body: data }); } catch (e2) {}
    close();
  });

  // Keep keyboard focus inside the dialog while it is open
  gate.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var items = gate.querySelectorAll("input, select, button");
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  if (document.body) open(); else document.addEventListener("DOMContentLoaded", open);
})();
