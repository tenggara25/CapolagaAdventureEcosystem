(() => {
  const activeNavClasses = [
    "inline-flex",
    "items-center",
    "px-4",
    "py-2",
    "rounded-lg",
    "bg-teal-600",
    "text-white",
    "text-sm",
    "font-semibold",
    "hover:bg-teal-700",
    "transition-colors",
  ];
  const inactiveNavClasses = [
    "text-sm",
    "font-medium",
    "transition-colors",
    "text-muted-foreground",
    "hover:text-foreground",
  ];
  const nav = document.querySelector("nav");
  const menuButton = document.querySelector('button[aria-label="Toggle menu"]');
  const desktopNavLinks = Array.from(document.querySelectorAll('nav a[href]')).filter((link) => {
    const text = link.textContent.trim();
    return ["Home", "Booking", "Paket Wisata", "Add-on Activity", "Tentang Kami"].includes(text);
  });
  const searchButton = Array.from(document.querySelectorAll("button")).find(
    (button) => button.textContent.includes("Cari...")
  );
  const searchInput = document.querySelector('input[placeholder*="Glamping"]');
  const dateInput = document.querySelector('input[placeholder*="Juni"]');
  const loginButton = Array.from(document.querySelectorAll("button")).find(
    (button) => button.textContent.trim() === "Login"
  );
  const packageButton = Array.from(document.querySelectorAll("button")).find(
    (button) => button.textContent.trim() === "Lihat Paket Wisata"
  );
  let loginModal = null;
  let mobileMenu = null;

  function setNavClasses(link, isActive) {
    link.classList.remove(...activeNavClasses, ...inactiveNavClasses);
    link.classList.add(...(isActive ? activeNavClasses : inactiveNavClasses));
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  }

  function getCurrentNavLabel() {
    const hash = window.location.hash;
    const path = window.location.pathname.split("/").pop() || "index.html";

    if (path === "wisata.html" || path === "booking.html") {
      return "Booking";
    }
    if (hash === "#paket") {
      return "Paket Wisata";
    }
    if (hash === "#addon") {
      return "Add-on Activity";
    }
    if (hash === "#about") {
      return "Tentang Kami";
    }

    return "Home";
  }

  function updateNavState() {
    const currentLabel = getCurrentNavLabel();

    desktopNavLinks.forEach((link) => {
      setNavClasses(link, link.textContent.trim() === currentLabel);
    });

    if (mobileMenu) {
      Array.from(mobileMenu.querySelectorAll("a")).forEach((link) => {
        const isActive = link.textContent.trim() === currentLabel;
        link.className = [
          "block",
          "rounded-xl",
          "px-3",
          "py-2",
          "text-sm",
          isActive
            ? "bg-teal-600 font-semibold text-white"
            : "font-medium text-slate-700 hover:bg-slate-50",
        ].join(" ");
      });
    }
  }

  function ensureLoginModal() {
    if (loginModal) {
      return loginModal;
    }

    loginModal = document.createElement("div");
    loginModal.className =
      "fixed inset-0 z-[100] hidden items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm";
    loginModal.innerHTML = [
      '<div class="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">',
      '<div class="flex items-start justify-between gap-4">',
      '<div>',
      '<p class="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">Masuk</p>',
      '<h2 class="mt-2 text-2xl font-bold text-slate-900">Login sederhana</h2>',
      '<p class="mt-2 text-sm text-slate-600">Gunakan email dan password untuk masuk ke dashboard CapolagaGo.</p>',
      "</div>",
      '<button type="button" data-close-login class="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 transition hover:bg-slate-200">Tutup</button>',
      "</div>",
      '<form class="mt-6 space-y-4" id="login-form">',
      '<label class="block">',
      '<span class="mb-2 block text-sm font-semibold text-slate-700">Email</span>',
      '<input type="email" name="email" required class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-500" placeholder="admin@capolagago.com" />',
      "</label>",
      '<label class="block">',
      '<span class="mb-2 block text-sm font-semibold text-slate-700">Password</span>',
      '<input type="password" name="password" required class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-teal-500" placeholder="••••••••" />',
      "</label>",
      '<div class="flex items-center justify-between gap-3 pt-2">',
      '<label class="flex items-center gap-2 text-sm text-slate-600">',
      '<input type="checkbox" class="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />',
      "<span>Ingat saya</span>",
      "</label>",
      '<a href="mailto:info@capolagago.com?subject=Bantuan%20Login" class="text-sm font-semibold text-teal-700 hover:text-teal-800">Butuh bantuan?</a>',
      "</div>",
      '<button type="submit" class="w-full rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700">Masuk</button>',
      '<p id="login-feedback" class="hidden rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800"></p>',
      "</form>",
      "</div>",
    ].join("");

    document.body.appendChild(loginModal);

    const closeButton = loginModal.querySelector("[data-close-login]");
    const form = loginModal.querySelector("#login-form");
    const feedback = loginModal.querySelector("#login-feedback");

    function closeModal() {
      loginModal.classList.add("hidden");
      loginModal.classList.remove("flex");
    }

    closeButton.addEventListener("click", closeModal);

    loginModal.addEventListener("click", (event) => {
      if (event.target === loginModal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !loginModal.classList.contains("hidden")) {
        closeModal();
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const email = formData.get("email");
      feedback.textContent = `Halo ${email}, fitur autentikasi penuh belum aktif, tapi tampilan login sudah siap dipakai.`;
      feedback.classList.remove("hidden");
    });

    return loginModal;
  }

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", () => {
      searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
      searchInput.focus();
    });
  }

  if (dateInput) {
    const today = new Date();
    const timezoneOffset = today.getTimezoneOffset() * 60000;
    const localToday = new Date(today.getTime() - timezoneOffset);
    const minDate = localToday.toISOString().slice(0, 10);

    dateInput.type = "date";
    dateInput.min = minDate;
    if (!dateInput.value) {
      dateInput.value = minDate;
    }
  }

  if (loginButton) {
    loginButton.addEventListener("click", () => {
      const modal = ensureLoginModal();
      const feedback = modal.querySelector("#login-feedback");
      const emailInput = modal.querySelector('input[name="email"]');
      const form = modal.querySelector("#login-form");
      feedback.classList.add("hidden");
      form.reset();
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      emailInput.focus();
    });
  }

  if (packageButton) {
    packageButton.addEventListener("click", () => {
      window.location.href = "wisata.html";
    });
  }

  if (menuButton && nav) {
    mobileMenu = document.createElement("div");
    mobileMenu.className =
      "lg:hidden hidden absolute left-4 right-4 top-full mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg";
    mobileMenu.innerHTML = [
      '<a class="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" href="index.html">Home</a>',
      '<a class="mt-2 block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" href="wisata.html">Booking</a>',
      '<a class="mt-2 block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" href="index.html#paket">Paket Wisata</a>',
      '<a class="mt-2 block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" href="index.html#addon">Add-on Activity</a>',
      '<a class="mt-2 block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" href="index.html#about">Tentang Kami</a>',
    ].join("");

    nav.parentElement.style.position = "relative";
    nav.parentElement.appendChild(mobileMenu);

    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    mobileMenu.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  }

  updateNavState();
  window.addEventListener("hashchange", updateNavState);
})();
