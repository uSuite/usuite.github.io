// uSuite landing page. No dependencies, no tracking; everything degrades to plain links without JavaScript.

const NETWORKS = {
  x: "X", bluesky: "Bluesky", mastodon: "Mastodon", reddit: "Reddit", hn: "Hacker News",
  facebook: "Facebook", linkedin: "LinkedIn", github: "GitHub", youtube: "YouTube", blog: "Blog",
};

// Voices: curated posts from data/voices.json, rendered as text only.
async function loadVoices() {
  const list = document.getElementById("voices-list");
  if (!list) return;
  let voices;
  try {
    const res = await fetch("data/voices.json", { cache: "no-cache" });
    if (!res.ok) return;
    voices = await res.json();
  } catch {
    return;
  }
  if (!Array.isArray(voices) || voices.length === 0) return;
  voices.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  list.replaceChildren(...voices.map(renderVoice));
}

function renderVoice(v) {
  const fig = document.createElement("figure");
  fig.className = "voice";
  const quote = document.createElement("blockquote");
  quote.textContent = v.quote;
  const cap = document.createElement("figcaption");
  const who = document.createElement("span");
  who.textContent = v.handle ? `${v.name} ${v.handle}` : v.name;
  cap.append(who);
  if (v.url) {
    const a = document.createElement("a");
    a.href = v.url;
    a.rel = "nofollow noopener";
    a.textContent = `on ${NETWORKS[v.network] || v.network || "the web"}`;
    cap.append(a);
  }
  fig.append(quote, cap);
  return fig;
}

// Share: share links open in a small window; Copy link uses the native share sheet when there is one.
function setupShare() {
  for (const a of document.querySelectorAll("[data-share]")) {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(a.href, "share", "noopener,width=640,height=640");
    });
  }
  const btn = document.getElementById("copy-link");
  if (!btn) return;
  const url = document.querySelector('link[rel="canonical"]').href;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(url);
      btn.textContent = "Link copied";
    } catch {
      btn.textContent = url;
    }
    setTimeout(() => { btn.textContent = "Copy link"; }, 2000);
  });
}

// Comments: giscus loads only when the section scrolls into view, and only once the repository ids are set.
function setupGiscus() {
  const host = document.getElementById("giscus");
  if (!host || !host.dataset.repoId || !host.dataset.categoryId) return;
  const load = () => {
    const s = document.createElement("script");
    s.src = "https://giscus.app/client.js";
    s.async = true;
    s.crossOrigin = "anonymous";
    const attrs = {
      "data-repo": host.dataset.repo,
      "data-repo-id": host.dataset.repoId,
      "data-category": host.dataset.category,
      "data-category-id": host.dataset.categoryId,
      "data-mapping": "specific",
      "data-term": "uSuite landing page",
      "data-strict": "1",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": "preferred_color_scheme",
      "data-lang": "en",
      "data-loading": "lazy",
    };
    for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
    host.replaceChildren(s);
  };
  if (!("IntersectionObserver" in window)) return load();
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { io.disconnect(); load(); }
  }, { rootMargin: "400px" });
  io.observe(host);
}

loadVoices();
setupShare();
setupGiscus();
