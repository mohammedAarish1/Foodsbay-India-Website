const API_BASE = "/api";

/* -----------------------------------------------------------
       URL PARAM — supports both:
         blog-post.html?slug=my-post-slug
         blog-post.html?id=66f1a2b3c4d5e6f7a8b9c0d1
    ----------------------------------------------------------- */
const urlParams = new URLSearchParams(window.location.search);
const SLUG = urlParams.get("slug");
const POST_ID = urlParams.get("id");

/* -----------------------------------------------------------
       BADGE COLOUR MAP
    ----------------------------------------------------------- */
const BADGE = {
  manufacturing: "badge-manufacturing",
  recipes: "badge-recipes",
  health: "badge-health",
  industry: "badge-industry",
  sourcing: "badge-sourcing",
  tips: "badge-tips",
};

/* -----------------------------------------------------------
       MOCK DATA — delete when API is ready
    ----------------------------------------------------------- */
// function getMockPost(slugOrId) {
//   const posts = {
//     "art-science-behind-indian-pickles": {
//       _id: "66f1a2b3c4d5e6f7a8b9c0d1",
//       slug: "art-science-behind-indian-pickles",
//       title:
//         "The Art & Science Behind India's Best Pickles — How Foodsbay Maintains Quality at Scale",
//       excerpt:
//         "From hand-selecting raw mangoes in Rajasthan to cold-pressed mustard oil blending — we take you inside our manufacturing facility to reveal the meticulous process that goes into every jar of Foodsbay pickle.",
//       body: `
//                     <h2>Why Traditional Methods Still Win</h2>
//                     <p>India has been making pickles — <em>achar</em> — for thousands of years. Long before refrigerators, before preservatives, before food-tech startups, Indian households had figured out that salt, oil, and sun were all you needed to keep mangoes safe for two years and flavourful for ten.</p>
//                     <p>At Foodsbay India, we don't treat this as nostalgia. We treat it as engineering. Our manufacturing process is built on the same principles that grandmothers used, but with ISO-grade hygiene controls, batch traceability, and moisture testing that would satisfy any food scientist.</p>
//                     <blockquote>The difference between a good pickle and a great one is patience — and the willingness to wait for the right raw material, no matter the season.</blockquote>
//                     <h2>Step 1: Raw Material Selection</h2>
//                     <p>Every batch of Foodsbay Aam ka Achaar starts in Rajasthan's Chittorgarh district, where <strong>Rajapuri mangoes</strong> are harvested between March and May. Our sourcing team personally inspects each lot for:</p>
//                     <ul>
//                         <li>Brix level (natural sugar content) — we target 9–11°Bx for the right tartness balance</li>
//                         <li>Skin firmness — soft mangoes yield mushy pickle; we reject anything below Grade A firmness</li>
//                         <li>Pesticide residue testing — every lot is lab-tested before acceptance</li>
//                     </ul>
//                     <p>Rejected lots are returned to the farmer, not diverted into a cheaper product line. This policy costs us roughly 12% of sourced volumes every season, but it's non-negotiable.</p>
//                     <h2>Step 2: The Oil — Kachi Ghani Mustard</h2>
//                     <p>Mustard oil is the backbone of North Indian pickle. The variety matters enormously. We use only <strong>Kachi Ghani cold-pressed mustard oil</strong> from Uttar Pradesh, which retains its natural allyl isothiocyanate — the compound that gives mustard its heat and also acts as a natural preservative.</p>
//                     <p>Heat-refined or solvent-extracted oils are cheaper, but they lose this compound entirely. The difference in shelf life and flavour is dramatic.</p>
//                     <h3>Our Oil Quality Checklist</h3>
//                     <ul>
//                         <li>Erucic acid content below 2% (FSSAI limit: 5%)</li>
//                         <li>Pungency test: minimum 85 on our internal heat scale</li>
//                         <li>Moisture content: below 0.1%</li>
//                         <li>Filtered at 5-micron before blending</li>
//                     </ul>
//                     <h2>Step 3: Spice Blending</h2>
//                     <p>The spice masala for our pickle is a proprietary blend of 11 spices — fennel, fenugreek, nigella, turmeric, red chilli, asafoetida, and five others we'll keep to ourselves. Each spice is individually roasted at a controlled temperature to unlock its essential oils before blending.</p>
//                     <p>We use a <strong>cold-blend process</strong>: the roasted spices are ground and mixed at room temperature rather than in a hot oil tadka. This preserves more volatile aromatic compounds and extends shelf life without artificial antioxidants.</p>
//                     <h2>Step 4: Sun-Curing</h2>
//                     <p>After mixing, the raw pickle rests in sealed stainless-steel vats for <strong>21 days</strong> in a controlled sun-curing environment. Temperature: 28–35°C. Humidity: below 60%. During this period, natural fermentation creates lactic acid, lowering the pH and creating the tangy depth that no artificial acidulant can replicate.</p>
//                     <p>Batches are sampled on day 7, 14, and 21. Anything that hasn't reached our target pH of 3.8–4.2 is extended. We don't ship before the pickle is ready.</p>
//                     <h2>Step 5: Quality Checks Before Packaging</h2>
//                     <p>Every batch goes through our 8-point QC protocol before any jar is filled:</p>
//                     <table>
//                         <thead><tr><th>Test</th><th>Method</th><th>Pass Criterion</th></tr></thead>
//                         <tbody>
//                             <tr><td>pH</td><td>Digital pH meter</td><td>3.8 – 4.2</td></tr>
//                             <tr><td>Water Activity (Aw)</td><td>Labmaster Aw meter</td><td>≤ 0.85</td></tr>
//                             <tr><td>Salt %</td><td>Mohr titration</td><td>6 – 8%</td></tr>
//                             <tr><td>Colour</td><td>Visual + Lovibond</td><td>Golden-amber</td></tr>
//                             <tr><td>Texture</td><td>Sensory panel</td><td>Firm, no mushiness</td></tr>
//                             <tr><td>Microbial count</td><td>Plate count agar</td><td>&lt; 100 CFU/g</td></tr>
//                             <tr><td>Pesticide residues</td><td>GC-MS</td><td>BDL (below detection limit)</td></tr>
//                             <tr><td>Taste & Aroma</td><td>Trained sensory panel</td><td>Pass</td></tr>
//                         </tbody>
//                     </table>
//                     <h2>What This Means for Our B2B Partners</h2>
//                     <p>When you stock Foodsbay pickle, you get a product with a <strong>24-month shelf life</strong> from manufacture date, consistent Brix, consistent colour, and consistent flavour profile — batch after batch. For retail partners who care about customer loyalty, and for HoReCa buyers who need predictable flavour in their recipes, this consistency matters more than the price per kg.</p>
//                     <p>We're not the cheapest pickle in the market. We're designed to be the most reliable.</p>
//                 `,
//       category: { slug: "manufacturing", label: "Manufacturing", emoji: "🏭" },
//       coverImage:
//         "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1400&auto=format&fit=crop&q=85",
//       coverAlt: "Indian pickle jars in a manufacturing facility",
//       tags: [
//         "Pickle Making",
//         "Quality Control",
//         "Manufacturing",
//         "FSSAI",
//         "B2B",
//       ],
//       author: {
//         name: "Foodsbay Editorial",
//         role: "In-house Manufacturing Team",
//         initials: "FI",
//         avatarColor: "from-primary to-primary-light",
//         bio: "The Foodsbay India editorial team brings together food scientists, sourcing experts, and culinary specialists to deliver insights grounded in real manufacturing experience.",
//       },
//       status: "published",
//       isFeatured: true,
//       publishedAt: "2026-03-10T00:00:00Z",
//       readTimeMinutes: 8,
//       viewCount: 1240,
//       likeCount: 87,
//     },
//     "benefits-of-raw-indian-honey": {
//       _id: "66f1a2b3c4d5e6f7a8b9c0d2",
//       slug: "benefits-of-raw-indian-honey",
//       title:
//         "7 Scientifically Proven Benefits of Raw Indian Honey You Need to Know",
//       excerpt:
//         "Unprocessed honey is more than a sweetener — it's a powerhouse of antioxidants, enzymes, and antimicrobial compounds. Here's what the science actually says.",
//       body: `
//                     <h2>What Makes Raw Honey Different?</h2>
//                     <p>Commercial honey is typically heated to 70°C or higher during processing to prevent crystallisation and extend shelf life. This pasteurisation destroys most of the beneficial enzymes, pollen, and antioxidants that make honey nutritionally remarkable.</p>
//                     <p>Raw honey — honey that is unheated, unfiltered, and minimally processed — retains these compounds in their natural form. The difference isn't marketing. It's measurable in a lab.</p>
//                     <h2>1. Rich in Antioxidants</h2>
//                     <p>Raw honey contains polyphenols, flavonoids, and phenolic acids. A 2020 study in <em>Antioxidants</em> found that raw honey had antioxidant activity roughly <strong>4.3× higher</strong> than processed honey from the same floral source.</p>
//                     <blockquote>Antioxidants neutralise free radicals, reducing oxidative stress that contributes to ageing, inflammation, and chronic disease.</blockquote>
//                     <h2>2. Natural Antimicrobial Properties</h2>
//                     <p>Honey produces hydrogen peroxide through the enzyme glucose oxidase — a compound with documented antimicrobial properties. Additionally, raw honey's low moisture content (below 20%) and acidic pH (3.2–4.5) create an environment inhospitable to most bacteria.</p>
//                     <h2>3. Prebiotic Support for Gut Health</h2>
//                     <p>Raw honey contains oligosaccharides — short-chain carbohydrates that feed beneficial gut bacteria like <em>Lactobacillus</em> and <em>Bifidobacterium</em>. Research from the Journal of Nutritional Science (2021) found regular raw honey consumption was associated with improved gut microbiome diversity.</p>
//                     <h2>4. Wound Healing</h2>
//                     <p>The combination of low pH, hydrogen peroxide production, and the peptide defensin-1 gives raw honey clinically validated wound-healing properties. Manuka honey (a specific variety) is licensed for medical wound care in Australia and the EU.</p>
//                     <h2>5. Cough Suppression</h2>
//                     <p>The WHO recognises honey as a demulcent — a substance that soothes mucous membranes. Multiple randomised trials have found honey as effective as dextromethorphan (a common OTC cough suppressant) for reducing cough frequency and severity in children.</p>
//                     <h2>6. Blood Sugar Regulation</h2>
//                     <p>While honey is still a sugar, its fructose-to-glucose ratio and bioactive compounds result in a lower glycaemic impact than refined sugar. Some studies suggest moderate raw honey consumption may actually improve insulin sensitivity. This is not a licence to overconsume — but for non-diabetic adults, it's a better sweetener than white sugar.</p>
//                     <h2>7. Sleep Quality</h2>
//                     <p>A teaspoon of honey before bed triggers a mild insulin spike that facilitates tryptophan crossing the blood-brain barrier, where it converts to serotonin and then melatonin. The anecdotal advice your grandmother gave you has a mechanism.</p>
//                     <h2>How to Identify Genuinely Raw Honey</h2>
//                     <ul>
//                         <li>It should crystallise over time — this is a sign of natural glucose content, not spoilage</li>
//                         <li>It should have a complex, almost malty or floral aroma, not just generic sweetness</li>
//                         <li>Look for small pollen particles or beeswax traces — these indicate minimal filtering</li>
//                         <li>The label should say "raw" or "unprocessed" — not just "pure" or "natural"</li>
//                     </ul>
//                     <p>All Foodsbay India honey is sourced directly from registered apiarists in Himachal Pradesh and Uttarakhand, cold-strained at below 40°C to preserve enzyme activity, and third-party tested for adulteration before dispatch.</p>
//                 `,
//       coverImage:
//         "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1400&auto=format&fit=crop&q=85",
//       coverAlt: "Raw honey being poured from a spoon",
//       category: { slug: "health", label: "Health & Nutrition", emoji: "💚" },
//       tags: ["Honey", "Organic", "Health", "Nutrition"],
//       author: {
//         name: "Dr. Rahul Sharma",
//         role: "Nutrition & Food Science Expert",
//         initials: "R",
//         avatarColor: "from-amber-400 to-amber-600",
//         bio: "Dr. Rahul Sharma holds a PhD in Food Science from IIT Delhi and has 12 years of experience consulting for FMCG companies on nutrition claims and food quality standards.",
//       },
//       status: "published",
//       isFeatured: false,
//       publishedAt: "2026-02-28T00:00:00Z",
//       readTimeMinutes: 5,
//       viewCount: 892,
//       likeCount: 64,
//     },
//   };
//   return posts[slugOrId] || posts["art-science-behind-indian-pickles"];
// }

// function getMockRelated(currentSlug) {
//   return [
//     {
//       slug: "kachi-ghani-mustard-oil-sourcing",
//       title: "From Farm to Factory: How We Source Pure Kachi Ghani Mustard Oil",
//       excerpt:
//         "The quality of your pickle starts with the oil. We trace our mustard oil sourcing journey across Rajasthan and UP.",
//       coverImage:
//         "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=600&auto=format&fit=crop&q=70",
//       category: { slug: "sourcing", label: "Sourcing", emoji: "🌾" },
//       readTimeMinutes: 6,
//       publishedAt: "2026-02-05T00:00:00Z",
//       author: {
//         name: "Suresh Kumar",
//         initials: "S",
//         avatarColor: "from-yellow-500 to-orange-500",
//       },
//     },
//     {
//       slug: "fssai-compliance-food-manufacturers",
//       title: "FSSAI Compliance: What It Means for Product Quality",
//       excerpt:
//         "Understanding FSSAI regulations isn't just about legal compliance — it's the backbone of consumer trust.",
//       coverImage:
//         "https://images.unsplash.com/photo-1576867757603-05b134ebc379?w=600&auto=format&fit=crop&q=70",
//       category: { slug: "manufacturing", label: "Manufacturing", emoji: "🏭" },
//       readTimeMinutes: 6,
//       publishedAt: "2026-01-20T00:00:00Z",
//       author: {
//         name: "Foodsbay Team",
//         initials: "FI",
//         avatarColor: "from-primary to-primary-light",
//       },
//     },
//     {
//       slug: "india-packaged-food-market-2026",
//       title:
//         "India's Packaged Food Market 2026: Trends Every B2B Buyer Must Know",
//       excerpt:
//         "Clean labels, regional flavours, and sustainable packaging are reshaping India's food retail landscape.",
//       coverImage:
//         "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=70",
//       category: { slug: "industry", label: "Industry Trends", emoji: "📊" },
//       readTimeMinutes: 7,
//       publishedAt: "2026-02-14T00:00:00Z",
//       author: {
//         name: "Amit Verma",
//         initials: "A",
//         avatarColor: "from-purple-400 to-purple-600",
//       },
//     },
//   ].filter((p) => p.slug !== currentSlug);
// }

/* -----------------------------------------------------------
       API LAYER
    ----------------------------------------------------------- */
async function fetchPost(slugOrId) {
  // REAL: uncomment when API is ready
  // const param = SLUG ? `slug=${SLUG}` : `id=${POST_ID}`;
  // const res = await fetch(`${API_BASE}/blogs?${param}`);
  // if (!res.ok) throw new Error(res.status === 404 ? 'Post not found' : `HTTP ${res.status}`);
  // const data = await res.json();
  // return data.post;

  const res = await fetch("/blogs-data.json");
  const data = await res.json();
  const post = data.find((p) => p.slug === slugOrId || p._id === slugOrId);
  if (!post) throw new Error("Post not found");
  return post;

  // MOCK
  // return new Promise((res, rej) => {
  //     setTimeout(() => {
  //         const key = slugOrId || 'art-science-behind-indian-pickles';
  //         res(getMockPost(key));
  //     }, 800);
  // });
}

async function fetchRelated(currentSlug, categorySlug) {
  // REAL:
  // const res = await fetch(`${API_BASE}/blogs?status=published&category=${categorySlug}&limit=3`);
  // const data = await res.json();
  // return data.posts.filter(p => p.slug !== currentSlug).slice(0,3);

  const res = await fetch("/blogs-data.json");
  const data = await res.json();
  return data
    .filter((p) => p.slug !== currentSlug && p.category.slug === categorySlug)
    .slice(0, 3);

  // MOCK
  // return new Promise(res => setTimeout(() => res(getMockRelated(currentSlug)), 400));
}

/* -----------------------------------------------------------
       HELPERS
    ----------------------------------------------------------- */
const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
const fmtShort = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
const fmtViews = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n));
const set = (id, v) => {
  const el = document.getElementById(id);
  if (el) el[typeof v === "object" ? "innerHTML" : "textContent"] = v;
};
const setAttr = (id, a, v) => {
  const el = document.getElementById(id);
  if (el) el.setAttribute(a, v);
};

/* -----------------------------------------------------------
       LIKE — persisted in localStorage per post
    ----------------------------------------------------------- */
let likedPosts = JSON.parse(localStorage.getItem("fb_liked") || "[]");
let currentPostSlug = "";

function toggleLike() {
  const btn = document.getElementById("likeBtn");
  const icon = document.getElementById("likeIcon");
  const countEl = document.getElementById("likeCount");

  if (likedPosts.includes(currentPostSlug)) {
    likedPosts = likedPosts.filter((s) => s !== currentPostSlug);
    countEl.textContent = parseInt(countEl.textContent) - 1;
    icon.setAttribute("fill", "none");
    icon.style.color = "";
    btn.classList.remove("border-primary", "text-primary");
  } else {
    likedPosts.push(currentPostSlug);
    countEl.textContent = parseInt(countEl.textContent) + 1;
    icon.setAttribute("fill", "#ef4444");
    icon.style.color = "#ef4444";
    btn.classList.add("border-primary", "text-primary");
    btn.classList.add("like-pop");
    btn.addEventListener(
      "animationend",
      () => btn.classList.remove("like-pop"),
      { once: true },
    );
  }
  localStorage.setItem("fb_liked", JSON.stringify(likedPosts));
  set("infoLikes", countEl.textContent);
}

/* -----------------------------------------------------------
       SHARE
    ----------------------------------------------------------- */
function shareOn(platform) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const urls = {
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    whatsapp: `https://wa.me/?text=${title}%20${url}`,
  };
  window.open(urls[platform], "_blank", "noopener,width=600,height=450");
}

function copyLink(btn) {
  navigator.clipboard.writeText(window.location.href).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
    btn.classList.add("bg-green-500", "text-white", "border-green-500");
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.classList.remove("bg-green-500", "text-white", "border-green-500");
    }, 2000);
  });
}

/* -----------------------------------------------------------
       TABLE OF CONTENTS — auto-built from h2/h3 in article body
    ----------------------------------------------------------- */
function buildTOC() {
  const body = document.getElementById("articleBody");
  const tocList = document.getElementById("tocList");
  const widget = document.getElementById("tocWidget");
  if (!body || !tocList) return;

  const headings = body.querySelectorAll("h2, h3");
  if (headings.length < 2) return;

  widget.classList.remove("hidden");
  let html = "";
  headings.forEach((h, i) => {
    const id = "section-" + i;
    h.id = id;
    const isH3 = h.tagName === "H3";
    html += `<a href="#${id}" class="toc-item block py-1 text-sm transition-all ${isH3 ? "pl-4 text-gray-500" : "text-gray-600"}" data-target="${id}">${h.textContent}</a>`;
  });
  tocList.innerHTML = html;

  // Intersection observer for active TOC item
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document
            .querySelectorAll(".toc-item")
            .forEach((a) => a.classList.remove("active"));
          const active = tocList.querySelector(
            `[data-target="${entry.target.id}"]`,
          );
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-20% 0px -70% 0px" },
  );

  headings.forEach((h) => observer.observe(h));
}

/* -----------------------------------------------------------
       RELATED CARDS RENDERER
    ----------------------------------------------------------- */
function renderRelatedCard(post) {
  const badge = BADGE[post.category.slug] || "badge-manufacturing";
  return `
        <div class="related-card bg-white rounded-2xl overflow-hidden border border-primary/[.06] shadow-sm flex flex-col cursor-pointer" onclick="window.location.href='blog-post.html?slug=${post.slug}'">
            <div class="overflow-hidden h-44 relative">
                <img src="${post.coverImage}" alt="${post.title}" loading="lazy" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
            </div>
            <div class="p-5 flex flex-col flex-1">
                <div class="flex items-center gap-2 mb-3">
                    <span class="cat-badge ${badge} text-[.7rem] font-bold px-2.5 py-0.5 rounded-full">${post.category.emoji} ${post.category.label}</span>
                    <span class="ml-auto flex items-center gap-1 text-xs text-gray-500">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        ${post.readTimeMinutes} min
                    </span>
                </div>
                <h3 class="font-serif text-base font-bold text-gray-900 mb-2 leading-snug flex-1" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${post.title}</h3>
                <p class="text-xs text-gray-500 mt-2">${fmtShort(post.publishedAt)}</p>
            </div>
        </div>`;
}

/* -----------------------------------------------------------
       HYDRATE PAGE — fills all DOM nodes with post data
    ----------------------------------------------------------- */
function hydratePage(post) {
  currentPostSlug = post.slug;

  // ── Dynamic <head> ──
  document.title = `${post.title} | Foodsbay India Blog`;
  document.querySelector('meta[name="description"]').content = post.excerpt;
  document.getElementById("ogTitle").content = post.title;
  document.getElementById("ogDescription").content = post.excerpt;
  document.getElementById("ogImage").content = post.ogImage || post.coverImage;
  document.getElementById("ogUrl").content = window.location.href;
  document.getElementById("twitterTitle").content = post.title;
  document.getElementById("twitterDesc").content = post.excerpt;
  document.getElementById("twitterImage").content =
    post.ogImage || post.coverImage;

  // JSON-LD Article schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
    publisher: {
      "@type": "Organization",
      name: "Foodsbay India",
      logo: {
        "@type": "ImageObject",
        url: "https://www.foodsbay.com/assets/brand_logo.webp",
      },
    },
  };
  const ldEl = document.createElement("script");
  ldEl.type = "application/ld+json";
  ldEl.textContent = JSON.stringify(schema);
  document.head.appendChild(ldEl);

  // ── Hero ──
  const cover = document.getElementById("heroCover");
  cover.src = post.coverImage;
  cover.alt = post.coverAlt || post.title;

  const badgeCls = BADGE[post.category.slug] || "badge-manufacturing";
  const heroB = document.getElementById("heroBadge");
  heroB.textContent = `${post.category.emoji} ${post.category.label}`;
  heroB.className = `cat-badge ${badgeCls} text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide`;

  set("heroTitle", post.title);
  set("heroReadTime", post.readTimeMinutes);
  set("heroDate", fmtDate(post.publishedAt));
  set("heroViews", fmtViews(post.viewCount));
  set("heroAuthorName", post.author.name);
  set("heroAuthorRole", post.author.role);
  set("breadcrumbTitle", post.title);

  const heroAv = document.getElementById("heroAvatar");
  heroAv.textContent = post.author.initials;
  heroAv.className = `w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br ${post.author.avatarColor}`;

  // ── Article body ──
  set("articleExcerpt", post.excerpt);
//   document.getElementById("articleBody").innerHTML = post.body;
document.getElementById('articleBody').innerHTML = DOMPurify.sanitize(marked.parse(post.body));
  // ── Tags ──
  document.getElementById("articleTags").innerHTML = post.tags
    .map(
      (t) =>
        `<span class="px-3 py-1.5 bg-green-50 text-primary rounded-full text-xs font-semibold border border-primary/10 hover:bg-primary hover:text-white cursor-pointer transition-colors">${t}</span>`,
    )
    .join("");

  // ── Author card ──
  const authAv = document.getElementById("authorAvatar");
  authAv.textContent = post.author.initials;
  authAv.className = `w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0 bg-gradient-to-br ${post.author.avatarColor}`;
  set("authorName", post.author.name);
  set("authorRole", post.author.role);
  set(
    "authorBio",
    post.author.bio || "A valued contributor to the Foodsbay India blog.",
  );

  // ── Like button ──
  set("likeCount", post.likeCount);
  set("infoLikes", post.likeCount);
  if (likedPosts.includes(post.slug)) {
    document.getElementById("likeIcon").setAttribute("fill", "#ef4444");
    document.getElementById("likeIcon").style.color = "#ef4444";
    document
      .getElementById("likeBtn")
      .classList.add("border-primary", "text-primary");
  }

  // ── Sidebar ──
  set("sideReadTime", post.readTimeMinutes);
  set("sideDate", fmtShort(post.publishedAt));
  set("infoViews", fmtViews(post.viewCount));
  set("infoDate", fmtShort(post.publishedAt));
  set("infoAuthor", post.author.name.split(" ")[0]);

  // ── Show article, hide skeleton ──
  document.getElementById("skeletonState").remove();
  document.getElementById("articleState").classList.remove("hidden");

  // ── Post-render ──
  buildTOC();
  AOS.refresh();
}

/* -----------------------------------------------------------
       MAIN LOAD
    ----------------------------------------------------------- */
async function loadPost() {
  document.getElementById("errorState").classList.add("hidden");

  const lookupKey = SLUG || POST_ID;
  if (!lookupKey) {
    showError("No post identifier found in URL. Try ?slug=your-post-slug");
    return;
  }

  try {
    const post = await fetchPost(lookupKey);
    hydratePage(post);

    // Load related in parallel (non-blocking)
    fetchRelated(post.slug, post.category.slug)
      .then((related) => {
        const grid = document.getElementById("relatedGrid");
        if (!related.length) {
          grid.parentElement.remove();
          return;
        }
        grid.innerHTML = related.map(renderRelatedCard).join("");
      })
      .catch(() => {
        /* silently ignore */
      });

    // Footer latest posts
    fetchRelated(post.slug, "")
      .then((posts) => {
        document.getElementById("footerPosts").innerHTML = posts
          .map(
            (p) =>
              `<div><a href="blog-post.html?slug=${p.slug}" class="text-white/70 hover:text-white transition-colors text-sm leading-snug line-clamp-2 block">${p.title}</a></div>`,
          )
          .join("");
      })
      .catch(() => {});
  } catch (err) {
    console.error("errrr", err);
    showError(err.message || "Failed to load article. Please try again.");
  }
}

function showError(msg) {
  document.getElementById("skeletonState")?.remove();
  document.getElementById("articleState").classList.add("hidden");
  document.getElementById("errorMessage").textContent = msg;
  document.getElementById("errorState").classList.remove("hidden");
}

/* -----------------------------------------------------------
       SCROLL — reading progress + nav shadow + back-to-top
    ----------------------------------------------------------- */
const backToTop = document.getElementById("backToTop");
window.addEventListener(
  "scroll",
  () => {
    const scrolled = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? Math.round((scrolled / docH) * 100) : 0;

    document.getElementById("readingProgress").style.width = pct + "%";
    document.getElementById("progressBar").style.width = pct + "%";
    set("progressPct", pct + "%");
    document
      .getElementById("navbar")
      .classList.toggle("shadow-md", scrolled > 20);

    // Back to top
    if (scrolled > 400) {
      backToTop.style.opacity = "1";
      backToTop.style.transform = "translateY(0)";
    } else {
      backToTop.style.opacity = "0";
      backToTop.style.transform = "translateY(1rem)";
    }
  },
  { passive: true },
);

/* -----------------------------------------------------------
       MOBILE NAV
    ----------------------------------------------------------- */
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

/* -----------------------------------------------------------
       NEWSLETTER
    ----------------------------------------------------------- */
async function handleNewsletter(e) {
  e.preventDefault();
  const btn = document.getElementById("nlBtn"),
    txt = document.getElementById("nlBtnText"),
    ico = document.getElementById("nlBtnIcon");
  btn.disabled = true;
  txt.textContent = "Subscribing…";
  ico.innerHTML = `<svg class="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>`;
  await new Promise((r) => setTimeout(r, 1200));
  txt.textContent = "✓ Subscribed!";
  ico.innerHTML = "";
  btn.classList.replace("bg-secondary", "bg-green-400");
  document.getElementById("nlEmail").value = "";
  setTimeout(() => {
    btn.disabled = false;
    txt.textContent = "Subscribe Free";
    ico.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    btn.classList.replace("bg-green-400", "bg-secondary");
  }, 3000);
}

/* -----------------------------------------------------------
       INIT
    ----------------------------------------------------------- */
AOS.init({ duration: 700, once: true, offset: 50, easing: "ease-out-cubic" });
loadPost();
