/* Ways of Seeing — sign-up gate.
   A courtesy gate, not a lock: it asks visitors to sign up before they enter and remembers them
   on this device. Answers go to the curator's Google Form ("Website Sign Up Form"); the questions
   and options below must match that form exactly, or Google discards the answer. */
(function () {
  "use strict";

  var WOS_GATE = {
    endpoint: "https://docs.google.com/forms/d/e/1FAIpQLSfspduSpCTPj9ur6-ZD3pV_KxALncn9zKhNWQrtr6q7QBo7mA/formResponse",
    fields: {
      name: "entry.1222533341",
      email: "entry.909839935",
      role: "entry.153975085",
      heard: "entry.1980491277",
      comments: "entry.1195898743"
    },
    roles: ["Student", "Professional", "Entrepreneur", "Researcher", "Other"],
    heard: ["Social Media", "Friend or Colleague", "Online Advertisement", "Search Engine"],
    storageKey: "wos-entered"
  };

  if (!WOS_GATE.endpoint) return;
  try { if (localStorage.getItem(WOS_GATE.storageKey)) return; } catch (e) { return; }

  function options(list) {
    return '<option value="">Choose one</option>' +
      list.map(function (o) { return "<option>" + o + "</option>"; }).join("");
  }

  var root = document.documentElement;
  var gate = document.createElement("div");
  gate.className = "wos-gate";
  gate.setAttribute("role", "dialog");
  gate.setAttribute("aria-modal", "true");
  gate.setAttribute("aria-labelledby", "wos-gate-title");
  gate.innerHTML =
    '<form class="wos-gate-card" novalidate>' +
      '<p class="wos-eyebrow">Ways of Seeing</p>' +
      '<h2 id="wos-gate-title">Sign up to enter</h2>' +
      '<p>This archive is free to use. We ask you to sign up so that we know who it is reaching, ' +
      'and so that the people whose work is gathered here can know too.</p>' +
      '<label for="wos-gate-name">Full name</label>' +
      '<input id="wos-gate-name" type="text" autocomplete="name" required>' +
      '<label for="wos-gate-email">Email address</label>' +
      '<input id="wos-gate-email" type="email" autocomplete="email" required>' +
      '<label for="wos-gate-role">Which best describes your role?</label>' +
      '<select id="wos-gate-role" required>' + options(WOS_GATE.roles) + '</select>' +
      '<label for="wos-gate-heard">How did you hear about this archive?</label>' +
      '<select id="wos-gate-heard" required>' + options(WOS_GATE.heard.concat(["Other"])) + '</select>' +
      '<input id="wos-gate-heard-other" type="text" placeholder="Tell us where" aria-label="Where you heard about this archive" hidden>' +
      '<label for="wos-gate-comments">Questions or comments (optional)</label>' +
      '<textarea id="wos-gate-comments" rows="2"></textarea>' +
      '<p class="wos-gate-error" hidden></p>' +
      '<button type="submit">Enter the archive</button>' +
      '<p class="wos-gate-note">Your answers are kept privately by the curator, are never sold or shared, ' +
      'and are removed on request: contact@arpitgaind.com.</p>' +
    '</form>';

  var $ = function (id) { return gate.querySelector("#wos-gate-" + id); };

  function open() {
    document.body.appendChild(gate);
    root.classList.add("wos-gated");
    $("name").focus();
  }

  function close() {
    try { localStorage.setItem(WOS_GATE.storageKey, String(Date.now())); } catch (e) {}
    root.classList.remove("wos-gated");
    if (gate.parentNode) gate.parentNode.removeChild(gate);
  }

  gate.addEventListener("change", function (e) {
    if (e.target.id !== "wos-gate-heard") return;
    var other = $("heard-other");
    other.hidden = e.target.value !== "Other";
    if (!other.hidden) other.focus();
  });

  function fail(message, field) {
    var err = gate.querySelector(".wos-gate-error");
    err.textContent = message;
    err.hidden = false;
    field.focus();
  }

  gate.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("name"), email = $("email"), role = $("role"), heard = $("heard"), other = $("heard-other");
    if (!name.value.trim()) return fail("Please enter your name.", name);
    if (!email.value.trim() || !email.checkValidity()) return fail("Please enter a valid email address.", email);
    if (!role.value) return fail("Please choose the role that fits best.", role);
    if (!heard.value) return fail("Please tell us how you heard about the archive.", heard);
    if (heard.value === "Other" && !other.value.trim()) return fail("Please tell us where you heard about it.", other);

    var f = WOS_GATE.fields;
    var data = new URLSearchParams();
    data.append(f.name, name.value.trim());
    data.append(f.email, email.value.trim());
    data.append(f.role, role.value);
    if (heard.value === "Other") {
      data.append(f.heard, "__other_option__");
      data.append(f.heard + ".other_option_response", other.value.trim());
    } else {
      data.append(f.heard, heard.value);
    }
    var comments = $("comments").value.trim();
    if (comments) data.append(f.comments, comments);

    try { fetch(WOS_GATE.endpoint, { method: "POST", mode: "no-cors", body: data }); } catch (e2) {}
    close();
  });

  // Keep keyboard focus inside the dialog while it is open
  gate.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var items = Array.prototype.filter.call(gate.querySelectorAll("input, select, textarea, button"),
      function (el) { return !el.hidden; });
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  if (document.body) open(); else document.addEventListener("DOMContentLoaded", open);
})();
