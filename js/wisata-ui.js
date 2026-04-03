(() => {
  const searchInput = document.querySelector('input[placeholder*="Cari glamping"]');
  const heroFilterButton = Array.from(document.querySelectorAll("button")).find(
    (button) => button.textContent.trim() === "Filter"
  );
  const categoryButtons = Array.from(document.querySelectorAll("button")).filter((button) =>
    ["Semua", "Glamping", "Camping", "Homestay"].includes(button.textContent.trim())
  );
  const resultCount = document.querySelector("p.text-muted-foreground .font-semibold");
  const cards = Array.from(document.querySelectorAll('[data-slot="card"]'));
  let activeCategory = "semua";

  function getCategory(card) {
    const badge = card.querySelector(".capitalize");
    return badge ? badge.textContent.trim().toLowerCase() : "semua";
  }

  function getSearchText(card) {
    return card.textContent.toLowerCase();
  }

  function updateCategoryUI() {
    categoryButtons.forEach((button) => {
      const isActive = button.textContent.trim().toLowerCase() === activeCategory;
      button.classList.toggle("bg-teal-600", isActive);
      button.classList.toggle("hover:bg-teal-700", isActive);
      button.classList.toggle("text-white", isActive);
      button.classList.toggle("border", !isActive);
      button.classList.toggle("bg-background", !isActive);
      button.classList.toggle("shadow-xs", !isActive);
    });
  }

  function applyFilters() {
    const searchValue = searchInput ? searchInput.value.trim().toLowerCase() : "";
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesCategory = activeCategory === "semua" || getCategory(card) === activeCategory;
      const matchesSearch = !searchValue || getSearchText(card).includes(searchValue);
      const isVisible = matchesCategory && matchesSearch;

      card.style.display = isVisible ? "" : "none";
      if (isVisible) {
        visibleCount += 1;
      }
    });

    if (resultCount) {
      resultCount.textContent = String(visibleCount);
    }
  }

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.textContent.trim().toLowerCase();
      updateCategoryUI();
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  if (heroFilterButton && categoryButtons.length) {
    heroFilterButton.addEventListener("click", () => {
      categoryButtons[0].scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  updateCategoryUI();
  applyFilters();
})();
