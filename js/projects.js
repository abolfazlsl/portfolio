(function () {
  const projects = [
    {
      title: "Pixels Position",
      repo: "abolfazlsl/pixels",
      url: "https://github.com/abolfazlsl/pixels",
      description: "A simple web application for posting and discovering job opportunities.",
    },
    {
      title: "Book Buddy",
      repo: "abolfazlsl/BookBuddy",
      url: "https://github.com/abolfazlsl/BookBuddy",
      description: "A CLI tool for adding audiobooks, ebooks, and online books, while tracking users’ reading progress across all titles.",
    },
    {
      title: "Mini Store",
      repo: "abolfazlsl/miniStore",
      url: "https://github.com/abolfazlsl/miniStore",
      description: "A lightweight CLI-based mini shop for managing products and simulating basic store operations.",
    },
    {
      title: "Password Validation",
      repo: "abolfazlsl/passwordValidation",
      url: "https://github.com/abolfazlsl/passwordValidation",
      description: "A simple password-strength checker that validates user passwords against strict security rules.",
    },
  ];

  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  projects.forEach((p, i) => {
    const card = document.createElement("article");
    card.className =
      "relative w-full h-full p-4 md:p-8 border rounded-xl border-zinc-700/70 hover:border-zinc-500/70 duration-300 hover:bg-zinc-800/10";

    const dateOrSoon = document.createElement("div");
    dateOrSoon.className = "flex items-center justify-between gap-2";
    dateOrSoon.innerHTML = `
      <div class="text-xs text-zinc-100">${p.repo}</div>
      <span class="text-xs text-zinc-500">GitHub</span>
    `;

    const title = document.createElement("h2");
    title.id = `project-${i}`;
    title.className =
      "mt-4 text-2xl md:text-3xl font-bold text-zinc-100 group-hover:text-white font-display";
    title.textContent = p.title;

    const desc = document.createElement("p");
    desc.className =
      "mt-4 leading-7 md:leading-8 text-zinc-400 duration-150 group-hover:text-zinc-300";
    desc.textContent = p.description;

    const linkWrap = document.createElement("div");
    linkWrap.className = "mt-6 md:mt-8";
    linkWrap.innerHTML = `
      <a href="${p.url}" target="_blank"
         class="inline-flex items-center gap-2 text-zinc-200 hover:text-white underline underline-offset-4">
        View on GitHub <span aria-hidden="true">&rarr;</span>
      </a>
    `;

    card.appendChild(dateOrSoon);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(linkWrap);

    grid.appendChild(card);
  });
})();