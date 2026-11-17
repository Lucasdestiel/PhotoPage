// Clara Mendes Fotografia — filtros, lightbox e formulário de orçamento
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  // Filtra a galeria pela categoria selecionada.
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      galleryItems.forEach((item) => {
        const matches = selectedCategory === "todos" || item.dataset.category === selectedCategory;
        item.classList.toggle("is-hidden", !matches);
      });
    });
  });

  // Abre a fotografia em tamanho maior no modal do Bootstrap.
  const photoModalElement = document.getElementById("photoModal");
  const photoModal = new bootstrap.Modal(photoModalElement);
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");

  document.querySelectorAll(".photo-card").forEach((card) => {
    card.addEventListener("click", () => {
      modalImage.src = card.dataset.image;
      modalImage.alt = card.dataset.title;
      modalTitle.textContent = card.dataset.title;
      modalCategory.textContent = card.dataset.category;
      photoModal.show();
    });
  });

  // Preenche o ano automaticamente no rodapé.
  document.getElementById("year").textContent = new Date().getFullYear();

  // Monta uma mensagem e encaminha o pedido para o WhatsApp.
  const quoteForm = document.getElementById("quoteForm");
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;

    const formData = new FormData(quoteForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const service = formData.get("service");
    const date = formData.get("date") || "A combinar";
    const message = formData.get("message").trim();

    const text = [
      "Olá, Clara! Gostaria de solicitar um orçamento.",
      "",
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Tipo de fotografia: ${service}`,
      `Data desejada: ${date}`,
      `Detalhes: ${message}`
    ].join("\n");

    // Troque pelo número real, com código do país e DDD. Ex.: 5541999999999
    const whatsappNumber = "5541999999999";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
});
