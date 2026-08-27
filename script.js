const form = document.getElementById("signup-form");
const statusEl = document.getElementById("form-status");
const button = form.querySelector("button");

function showStatus(message, type) {
  statusEl.hidden = false;
  statusEl.textContent = message;
  statusEl.className = `form-status ${type}`;
}

form.email.addEventListener("input", () => {
  statusEl.hidden = true;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = form.email.value.trim();
  if (!email || !form.email.checkValidity()) {
    showStatus("Enter a valid email.", "err");
    form.email.focus();
    return;
  }

  button.disabled = true;
  button.textContent = "Sending…";

  try {
    const response = await fetch("https://formsubmit.co/ajax/hello@internetcafe.ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        _subject: "internetcafe signup",
      }),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    form.reset();
    showStatus("You’re on the list.", "ok");
  } catch {
    window.location.href = `mailto:hello@internetcafe.ai?subject=${encodeURIComponent(
      "internetcafe signup"
    )}&body=${encodeURIComponent(email)}`;
    showStatus("Opening your email app…", "ok");
  } finally {
    button.disabled = false;
    button.textContent = "Join";
  }
});
