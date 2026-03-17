const API_BASE_URL = "/api"; // ←  backend root
const POSTS_PER_PAGE = 6;

const state = {
  allPosts: [],
  filteredPosts: [],
  categories: [],
  tags: [],
  featuredPost: null,
  currentPage: 1,
  activeCategory: "all",
  searchQuery: "",
};

/* -------------------------------------------------------
       MOCK DATA — mirrors the backend schema exactly.
       Delete getMockData() and the mock branch in
       fetchBlogData() once your API is live.
    ------------------------------------------------------- */
// function getMockData() {
//   return {
//     meta: { total: 8, page: 1, limit: 50 },
//     categories: [
//       { slug: "manufacturing", label: "Manufacturing", emoji: "🏭", count: 3 },
//       { slug: "recipes", label: "Recipes", emoji: "🍽️", count: 2 },
//       { slug: "health", label: "Health & Nutrition", emoji: "💚", count: 1 },
//       { slug: "industry", label: "Industry Trends", emoji: "📊", count: 1 },
//       { slug: "sourcing", label: "Sourcing", emoji: "🌾", count: 1 },
//     ],
//     tags: [
//       "Pickles",
//       "Honey",
//       "Wholesale",
//       "FSSAI",
//       "B2B",
//       "HoReCa",
//       "Mango Pickle",
//       "Food Safety",
//       "Organic",
//       "Mustard Oil",
//       "Indian Food",
//     ],
//     posts: [
//       {
//         id: "1",
//         slug: "art-science-behind-indian-pickles",
//         title:
//           "The Art & Science Behind India's Best Pickles — How Foodsbay Maintains Quality at Scale",
//         excerpt:
//           "From hand-selecting raw mangoes in Rajasthan to cold-pressed mustard oil blending — we take you inside our manufacturing facility to reveal the meticulous process that goes into every jar of Foodsbay pickle.",
//         coverImage:
//           "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&auto=format&fit=crop&q=80",
//         category: {
//           slug: "manufacturing",
//           label: "Manufacturing",
//           emoji: "🏭",
//         },
//         tags: ["Pickle Making", "Quality Control", "Manufacturing"],
//         author: {
//           name: "Foodsbay Editorial",
//           role: "In-house Team",
//           initials: "FI",
//           avatarColor: "from-primary to-primary-light",
//         },
//         publishedAt: "2026-03-10T00:00:00Z",
//         readTimeMinutes: 8,
//         isFeatured: true,
//         status: "published",
//       },
//       {
//         id: "2",
//         slug: "benefits-of-raw-indian-honey",
//         title:
//           "7 Scientifically Proven Benefits of Raw Indian Honey You Need to Know",
//         excerpt:
//           "Unprocessed honey is more than a sweetener — it's a powerhouse of antioxidants, enzymes, and antimicrobial compounds. Here's what the science actually says.",
//         coverImage:
//           "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=700&auto=format&fit=crop&q=75",
//         category: { slug: "health", label: "Health & Nutrition", emoji: "💚" },
//         tags: ["Honey", "Organic", "Health"],
//         author: {
//           name: "Dr. Rahul Sharma",
//           role: "Nutrition Expert",
//           initials: "R",
//           avatarColor: "from-amber-400 to-amber-600",
//         },
//         publishedAt: "2026-02-28T00:00:00Z",
//         readTimeMinutes: 5,
//         isFeatured: false,
//         status: "published",
//       },
//       {
//         id: "3",
//         slug: "classic-aam-ka-achaar-recipe",
//         title:
//           "Classic Aam Ka Achaar: The Traditional North Indian Mango Pickle Recipe",
//         excerpt:
//           "There's a reason grandmothers guard this recipe fiercely. We're sharing the authentic process — the right raw mangoes, mustard oil ratio, and sun-curing method.",
//         coverImage:
//           "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=700&auto=format&fit=crop&q=75",
//         category: { slug: "recipes", label: "Recipes", emoji: "🍽️" },
//         tags: ["Mango Pickle", "Recipes", "Indian Food"],
//         author: {
//           name: "Priya Nair",
//           role: "Recipe Developer",
//           initials: "P",
//           avatarColor: "from-green-400 to-green-600",
//         },
//         publishedAt: "2026-02-20T00:00:00Z",
//         readTimeMinutes: 10,
//         isFeatured: false,
//         status: "published",
//       },
//       {
//         id: "4",
//         slug: "india-packaged-food-market-2026",
//         title:
//           "India's Packaged Food Market 2026: Trends Every B2B Buyer Must Know",
//         excerpt:
//           "Clean labels, regional flavours, and sustainable packaging are reshaping India's food retail landscape. Here's what distributors and HoReCa buyers should prepare for.",
//         coverImage:
//           "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&auto=format&fit=crop&q=75",
//         category: { slug: "industry", label: "Industry Trends", emoji: "📊" },
//         tags: ["B2B", "Industry", "Wholesale"],
//         author: {
//           name: "Amit Verma",
//           role: "Industry Analyst",
//           initials: "A",
//           avatarColor: "from-purple-400 to-purple-600",
//         },
//         publishedAt: "2026-02-14T00:00:00Z",
//         readTimeMinutes: 7,
//         isFeatured: false,
//         status: "published",
//       },
//       {
//         id: "5",
//         slug: "kachi-ghani-mustard-oil-sourcing",
//         title:
//           "From Farm to Factory: How We Source Pure Kachi Ghani Mustard Oil for Our Pickles",
//         excerpt:
//           "The quality of your pickle starts with the oil. We trace our mustard oil sourcing journey across Rajasthan and UP.",
//         coverImage:
//           "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=700&auto=format&fit=crop&q=75",
//         category: { slug: "sourcing", label: "Sourcing", emoji: "🌾" },
//         tags: ["Mustard Oil", "Sourcing", "Pickles"],
//         author: {
//           name: "Suresh Kumar",
//           role: "Sourcing Head",
//           initials: "S",
//           avatarColor: "from-yellow-500 to-orange-500",
//         },
//         publishedAt: "2026-02-05T00:00:00Z",
//         readTimeMinutes: 6,
//         isFeatured: false,
//         status: "published",
//       },
//       {
//         id: "6",
//         slug: "fssai-compliance-food-manufacturers",
//         title:
//           "FSSAI Compliance for Food Manufacturers: What It Means for Product Quality",
//         excerpt:
//           "Understanding FSSAI regulations isn't just about legal compliance — it's the backbone of consumer trust. Here's how Foodsbay ensures every batch meets the standard.",
//         coverImage:
//           "https://images.unsplash.com/photo-1576867757603-05b134ebc379?w=700&auto=format&fit=crop&q=75",
//         category: {
//           slug: "manufacturing",
//           label: "Manufacturing",
//           emoji: "🏭",
//         },
//         tags: ["FSSAI", "Food Safety", "Manufacturing"],
//         author: {
//           name: "Foodsbay Team",
//           role: "Compliance",
//           initials: "FI",
//           avatarColor: "from-primary to-primary-light",
//         },
//         publishedAt: "2026-01-20T00:00:00Z",
//         readTimeMinutes: 6,
//         isFeatured: false,
//         status: "published",
//       },
//       {
//         id: "7",
//         slug: "distributor-questions-food-manufacturer",
//         title:
//           "10 Questions Every Distributor Should Ask Before Partnering with a Food Manufacturer",
//         excerpt:
//           "MOQs, certifications, shelf life, private labelling, payment terms — partnering with a manufacturer is a serious decision. Here's your due diligence checklist.",
//         coverImage:
//           "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&auto=format&fit=crop&q=75",
//         category: { slug: "recipes", label: "Recipes", emoji: "🍽️" },
//         tags: ["B2B", "HoReCa", "Wholesale"],
//         author: {
//           name: "Neha Gupta",
//           role: "Business Consultant",
//           initials: "N",
//           avatarColor: "from-blue-400 to-blue-600",
//         },
//         publishedAt: "2026-01-29T00:00:00Z",
//         readTimeMinutes: 9,
//         isFeatured: false,
//         status: "published",
//       },
//       {
//         id: "8",
//         slug: "soya-chaap-manufacturing-process",
//         title:
//           "Inside Our Soya Chaap Plant: How We Make India's Favourite Protein-Rich Snack",
//         excerpt:
//           "Soya chaap has gone from street food to restaurant staple. Here's a behind-the-scenes look at how we manufacture it at scale while keeping it fresh and flavourful.',",
//         coverImage:
//           "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=700&auto=format&fit=crop&q=75",
//         category: {
//           slug: "manufacturing",
//           label: "Manufacturing",
//           emoji: "🏭",
//         },
//         tags: ["Manufacturing", "Soya Chaap", "Food Safety"],
//         author: {
//           name: "Foodsbay Editorial",
//           role: "In-house Team",
//           initials: "FI",
//           avatarColor: "from-primary to-primary-light",
//         },
//         publishedAt: "2026-01-12T00:00:00Z",
//         readTimeMinutes: 7,
//         isFeatured: false,
//         status: "published",
//       },
//     ],
//   };
// }

/* -------------------------------------------------------
       API LAYER — Swap mock for real calls when ready
    ------------------------------------------------------- */
async function fetchBlogData() {
  // --- REAL (uncomment when API is ready) ---
  // const res = await fetch(`${API_BASE_URL}/blogs?limit=50&status=published`);
  // if (!res.ok) throw new Error(`HTTP ${res.status}`);
  // return res.json();

  const res = await fetch("/blogs-data.json");
  if (!res.ok) throw new Error("Failed to load");
  const data=await res.json()
  return {
    meta: { total: data.length, page: 1, limit: 50 },
    categories: [
      { slug: "manufacturing", label: "Manufacturing", emoji: "🏭", count: data.filter(b=>b.category.slug ==='manufacturing').length },
      { slug: "recipes", label: "Recipes", emoji: "🍽️", count: data.filter(b=>b.category.slug==='recipes').length },
      { slug: "health", label: "Health & Nutrition", emoji: "💚", count: data.filter(b=>b.category.slug==='health').length },
      { slug: "industry", label: "Industry Trends", emoji: "📊", count: data.filter(b=>b.category.slug==='industry').length },
      { slug: "sourcing", label: "Sourcing", emoji: "🌾", count: data.filter(b=>b.category.slug==='sourcing').length },
    ],
    tags: [
      "Pickles",
      "Honey",
      "Wholesale",
      "FSSAI",
      "B2B",
      "HoReCa",
      "Mango Pickle",
      "Food Safety",
      "Organic",
      "Mustard Oil",
      "Indian Food",
    ],
    posts: data,
  };

  // --- MOCK ---
//   return new Promise((r) => setTimeout(() => r(getMockData()), 900));
}

async function subscribeNewsletter(email) {
  // const res = await fetch(`${API_BASE_URL}/newsletter/subscribe`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email}) });
  // if (!res.ok) throw new Error('Failed');
  return new Promise((r) => setTimeout(r, 1200));
}

/* -------------------------------------------------------
       HELPERS
    ------------------------------------------------------- */
const BADGE_MAP = {
  manufacturing: "badge-manufacturing",
  recipes: "badge-recipes",
  health: "badge-health",
  industry: "badge-industry",
  sourcing: "badge-sourcing",
  tips: "badge-tips",
};

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

/* -------------------------------------------------------
       RENDERERS
    ------------------------------------------------------- */
function renderFeatured(post) {
  const badge = BADGE_MAP[post.category.slug] || "badge-manufacturing";
  return `
        <div class="bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(45,80,22,.08)] hover:shadow-[0_30px_80px_rgba(45,80,22,.14)] hover:-translate-y-1.5 transition-all duration-300">
            <div class="grid lg:grid-cols-2">
                <div class="overflow-hidden h-64 sm:h-80 lg:h-full min-h-[320px] relative group">
                    <img src="${post.coverImage}" alt="${post.title}" loading="eager" style="opacity:1;animation:none" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div class="p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                    <div>
                        <div class="flex flex-wrap items-center gap-3 mb-5">
                            <span class="cat-badge ${badge} text-xs font-semibold px-3 py-1 rounded-full">${post.category.emoji} ${post.category.label}</span>
                            <span class="flex items-center gap-1 text-xs text-gray-500"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${post.readTimeMinutes} min read</span>
                            <span class="text-xs text-gray-400">${fmtDate(post.publishedAt)}</span>
                        </div>
                       <a href="blog-post.html?slug=${post.slug}" <h2 class="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight link-u cursor-pointer">${post.title}</h2></a>
                        <p class="text-gray-600 leading-relaxed mb-6">${post.excerpt}</p>
                        <div class="flex flex-wrap gap-2 mb-8">
                            ${post.tags.map((t) => `<span class="px-3 py-1 bg-green-50 text-primary rounded-full text-xs font-medium border border-primary/10 hover:bg-primary hover:text-white transition-colors cursor-pointer" onclick="searchByTag('${t}')">${t}</span>`).join("")}
                        </div>
                    </div>
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-gradient-to-br ${post.author.avatarColor} flex items-center justify-center text-white font-bold text-sm">${post.author.initials}</div>
                            <div><p class="text-sm font-semibold text-gray-900">${post.author.name}</p><p class="text-xs text-gray-500">${post.author.role}</p></div>
                        </div>
                        <a href="blog-post.html?slug=${post.slug}" class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-full text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                            Read Article <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>`;
}

function renderCard(post) {
  const badge = BADGE_MAP[post.category.slug] || "badge-manufacturing";
  return `
        <article class="bg-white rounded-2xl overflow-hidden border border-primary/[.06] shadow-sm hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(45,80,22,.12)] transition-all duration-300 flex flex-col card-appear">
            <div class="overflow-hidden h-52 relative group">
                <img src="${post.coverImage}" alt="${post.title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-500">
            </div>
            <div class="p-6 flex flex-col flex-1">
                <div class="flex items-center gap-2 mb-3">
                    <span class="cat-badge ${badge} text-[0.7rem] font-semibold px-2.5 py-0.5 rounded-full">${post.category.emoji} ${post.category.label}</span>
                    <span class="flex items-center gap-1 text-[0.75rem] text-gray-500 ml-auto"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${post.readTimeMinutes} min</span>
                </div>
               <a href="blog-post.html?slug=${post.slug}" <h3 class="font-serif text-[1.05rem] font-bold text-gray-900 mb-3 leading-snug link-u cursor-pointer">${post.title}</h3></a>
                <p class="text-sm text-gray-600 leading-relaxed flex-1 mb-4" style="display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">${post.excerpt}</p>
                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div class="flex items-center gap-2">
                        <div class="w-7 h-7 rounded-full bg-gradient-to-br ${post.author.avatarColor} flex items-center justify-center text-white text-xs font-bold">${post.author.initials}</div>
                        <span class="text-xs text-gray-500">${post.author.name}</span>
                    </div>
                    <span class="text-xs text-gray-400">${fmtDate(post.publishedAt)}</span>
                </div>
                <a href="blog-post.html?slug=${post.slug}" class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-4 group hover:gap-2.5 transition-all duration-250">
                    Read More <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="group-hover:translate-x-0.5 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
            </div>
        </article>`;
}

function renderPills(categories) {
  const base =
    "flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium border-2 cursor-pointer select-none transition-all duration-200";
  const on = `${base} border-primary bg-primary text-white shadow-[0_4px_14px_rgba(45,80,22,.25)]`;
  const off = `${base} border-gray-200 bg-white text-gray-600 hover:border-primary hover:bg-primary hover:text-white hover:shadow-[0_4px_14px_rgba(45,80,22,.25)]`;
  return (
    `<button class="${on} cat-pill" data-cat="all">All Posts</button>` +
    categories
      .map(
        (c) =>
          `<button class="${off} cat-pill" data-cat="${c.slug}">${c.emoji} ${c.label}</button>`,
      )
      .join("")
  );
}

function renderPagination(total, cur, per) {
  const pages = Math.ceil(total / per);
  if (pages <= 1) return "";
  const btn = (p, label, disabled = false, active = false) =>
    `<button onclick="${disabled ? "" : `goToPage(${p})`}" ${disabled ? "disabled" : ""} class="flex items-center justify-center w-10 h-10 rounded-xl text-sm font-medium border-[1.5px] ${active ? "border-primary bg-primary text-white shadow-[0_4px_12px_rgba(45,80,22,.25)]" : "border-gray-200 bg-white text-gray-600 hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_4px_12px_rgba(45,80,22,.25)]"} transition-all duration-250 ${disabled ? "opacity-40 cursor-not-allowed" : ""}">${label}</button>`;
  let html = btn(cur - 1, "&#8592;", cur === 1);
  for (let p = 1; p <= pages; p++) {
    if (pages > 7 && p > 3 && p < pages - 1 && Math.abs(p - cur) > 1) {
      if (p === 4 || p === pages - 2)
        html += `<span class="text-gray-400 px-1">…</span>`;
      continue;
    }
    html += btn(p, p, false, p === cur);
  }
  html += btn(cur + 1, "&#8594;", cur === pages);
  return html;
}

/* -------------------------------------------------------
       FILTERS & GRID
    ------------------------------------------------------- */
function applyFilters() {
  let posts = [...state.allPosts];
  if (state.activeCategory !== "all")
    posts = posts.filter((p) => p.category.slug === state.activeCategory);
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }
  state.filteredPosts = posts;
  state.currentPage = 1;
  renderGrid();
}

function renderGrid() {
  const grid = document.getElementById("blogGrid");
  const noResults = document.getElementById("noResults");
  const pagination = document.getElementById("pagination");
  const countEl = document.getElementById("postCount");
  const start = (state.currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = state.filteredPosts.slice(start, start + POSTS_PER_PAGE);

  if (!state.filteredPosts.length) {
    grid.classList.add("hidden");
    noResults.classList.remove("hidden");
    pagination.classList.add("hidden");
    countEl.textContent = "";
    return;
  }
  noResults.classList.add("hidden");
  grid.classList.remove("hidden");
  grid.innerHTML = pagePosts.map(renderCard).join("");
  countEl.textContent = `Showing ${start + 1}–${Math.min(start + POSTS_PER_PAGE, state.filteredPosts.length)} of ${state.filteredPosts.length} posts`;
  pagination.classList.remove("hidden");
  pagination.innerHTML = renderPagination(
    state.filteredPosts.length,
    state.currentPage,
    POSTS_PER_PAGE,
  );
}

function goToPage(page) {
  const total = Math.ceil(state.filteredPosts.length / POSTS_PER_PAGE);
  if (page < 1 || page > total) return;
  state.currentPage = page;
  renderGrid();
  document
    .getElementById("blogGrid")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

function filterByCategory(cat) {
  state.activeCategory = cat;
  state.searchQuery = "";
  ["heroSearch", "sideSearch"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  document.querySelectorAll(".cat-pill").forEach((p) => {
    const on =
      "flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium border-2 cursor-pointer select-none transition-all duration-200 border-primary bg-primary text-white shadow-[0_4px_14px_rgba(45,80,22,.25)] cat-pill";
    const off =
      "flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium border-2 cursor-pointer select-none transition-all duration-200 border-gray-200 bg-white text-gray-600 hover:border-primary hover:bg-primary hover:text-white hover:shadow-[0_4px_14px_rgba(45,80,22,.25)] cat-pill";
    p.className = p.dataset.cat === cat ? on : off;
  });
  applyFilters();
}

function resetFilters() {
  filterByCategory("all");
}

function searchByTag(tag) {
  state.searchQuery = tag;
  state.activeCategory = "all";
  ["heroSearch", "sideSearch"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = tag;
  });
  applyFilters();
  document
    .getElementById("blogGrid")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

/* -------------------------------------------------------
       MAIN LOAD
    ------------------------------------------------------- */
async function loadBlogData() {
  document.getElementById("errorState").classList.add("hidden");
  document.getElementById("gridSkeleton").classList.remove("hidden");
  document.getElementById("featuredSkeleton").classList.remove("hidden");
  document.getElementById("featuredPost").classList.add("hidden");

  try {
    const data = await fetchBlogData();
    state.featuredPost = data.posts.find((p) => p.isFeatured) || data.posts[0];
    state.allPosts = data.posts.filter((p) => !p.isFeatured);
    state.filteredPosts = [...state.allPosts];
    state.categories = data.categories;
    state.tags = data.tags;

    // Hero stats
    document.getElementById("totalPostsCount").textContent =
      data.posts.length + "+";
    document.getElementById("totalCatsCount").textContent =
      data.categories.length;

    // Featured
    document.getElementById("featuredSkeleton").classList.add("hidden");
    const featEl = document.getElementById("featuredPost");
    featEl.innerHTML = renderFeatured(state.featuredPost);
    featEl.classList.remove("hidden");

    // Category pills
    const catBar = document.getElementById("categoryFilter");
    document.getElementById("catSkeleton")?.remove();
    catBar.insertAdjacentHTML("beforeend", renderPills(data.categories));
    catBar
      .querySelectorAll(".cat-pill")
      .forEach((p) =>
        p.addEventListener("click", () => filterByCategory(p.dataset.cat)),
      );

    // Grid
    document.getElementById("gridSkeleton").classList.add("hidden");
    renderGrid();

    // Sidebar trending
    document.getElementById("trendingSkeleton")?.remove();
    const trendEl = document.getElementById("trendingList");
    trendEl.innerHTML = data.posts
      .slice(0, 4)
      .map(
        (p, i) => `
                <a href="blog-post.html?slug=${p.slug}" class="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0 hover:pl-1.5 cursor-pointer transition-all duration-200">
                    <span class="font-serif text-2xl font-extrabold text-primary/15 min-w-[2rem] leading-none">${String(i + 1).padStart(2, "0")}</span>
                    <div>
                        <p class="text-sm font-semibold text-gray-900 leading-snug mb-0.5" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${p.title}</p>
                        <span class="flex items-center gap-1 text-xs text-gray-500"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${p.readTimeMinutes} min read</span>
                    </div>
                </a>`,
      )
      .join("");
    trendEl.classList.remove("hidden");

    // Sidebar categories
    document.getElementById("sidebarCatsSkeleton")?.remove();
    const sideCatEl = document.getElementById("sidebarCats");
    sideCatEl.innerHTML = data.categories
      .map(
        (c) => `
                <div class="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 cursor-pointer hover:pl-1.5 group transition-all duration-200" onclick="filterByCategory('${c.slug}')">
                    <span class="text-sm text-gray-700 group-hover:text-primary flex items-center gap-2 transition-colors">${c.emoji} ${c.label}</span>
                    <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">${c.count}</span>
                </div>`,
      )
      .join("");
    sideCatEl.classList.remove("hidden");

    // Tags
    document.getElementById("tagsSkeleton")?.remove();
    const tagEl = document.getElementById("tagCloud");
    tagEl.innerHTML = data.tags
      .map(
        (t) =>
          `<span class="px-3 py-1 bg-green-50 text-primary rounded-full text-xs font-medium border border-primary/10 hover:bg-primary hover:text-white cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-md" onclick="searchByTag('${t}')">${t}</span>`,
      )
      .join("");
    tagEl.classList.remove("hidden");

    // Footer categories
    document.getElementById("footerCats").innerHTML = data.categories
      .map(
        (c) =>
          `<div><a href="#" onclick="filterByCategory('${c.slug}');return false" class="text-white/70 hover:text-white transition-colors">${c.emoji} ${c.label}</a></div>`,
      )
      .join("");

    AOS.refresh();
  } catch (err) {
    console.error(err);
    document.getElementById("gridSkeleton").classList.add("hidden");
    document.getElementById("featuredSkeleton").classList.add("hidden");
    document.getElementById("errorState").classList.remove("hidden");
  }
}

/* -------------------------------------------------------
       SEARCH (debounced)
    ------------------------------------------------------- */
const debounce = (fn, ms) => {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
};
const onSearch = debounce((q) => {
  state.searchQuery = q;
  state.activeCategory = "all";
  document.querySelectorAll(".cat-pill").forEach((p) => {
    const on =
      "flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium border-2 cursor-pointer select-none transition-all duration-200 border-primary bg-primary text-white shadow-[0_4px_14px_rgba(45,80,22,.25)] cat-pill";
    const off =
      "flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium border-2 cursor-pointer select-none transition-all duration-200 border-gray-200 bg-white text-gray-600 hover:border-primary hover:bg-primary hover:text-white hover:shadow-[0_4px_14px_rgba(45,80,22,.25)] cat-pill";
    p.className = p.dataset.cat === "all" ? on : off;
  });
  applyFilters();
  if (q)
    document
      .getElementById("blogGrid")
      .scrollIntoView({ behavior: "smooth", block: "start" });
}, 350);

/* -------------------------------------------------------
       NEWSLETTER
    ------------------------------------------------------- */
async function handleNewsletter(e) {
  e.preventDefault();
  const btn = document.getElementById("nlBtn"),
    txt = document.getElementById("nlBtnText"),
    ico = document.getElementById("nlBtnIcon");
  btn.disabled = true;
  txt.textContent = "Subscribing…";
  ico.innerHTML = `<svg class="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>`;
  try {
    await subscribeNewsletter(document.getElementById("newsletterEmail").value);
    txt.textContent = "✓ Subscribed!";
    ico.innerHTML = "";
    btn.classList.replace("bg-secondary", "bg-green-400");
    document.getElementById("newsletterEmail").value = "";
    setTimeout(() => {
      btn.disabled = false;
      txt.textContent = "Subscribe Free";
      ico.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      btn.classList.replace("bg-green-400", "bg-secondary");
    }, 3000);
  } catch {
    txt.textContent = "Try Again";
    btn.disabled = false;
    ico.innerHTML = "";
  }
}

/* -------------------------------------------------------
       INIT
    ------------------------------------------------------- */
AOS.init({ duration: 700, once: true, offset: 60, easing: "ease-out-cubic" });

window.addEventListener(
  "scroll",
  () => {
    document.getElementById("scrollProgress").style.width =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
        100 +
      "%";
    document
      .getElementById("navbar")
      .classList.toggle("shadow-md", window.scrollY > 20);
  },
  { passive: true },
);

const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});
navMenu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  }),
);

document.getElementById("heroSearch").addEventListener("input", (e) => {
  document.getElementById("sideSearch").value = e.target.value;
  onSearch(e.target.value);
});
document.getElementById("sideSearch").addEventListener("input", (e) => {
  document.getElementById("heroSearch").value = e.target.value;
  onSearch(e.target.value);
});

loadBlogData();
