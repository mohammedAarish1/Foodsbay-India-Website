// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: "ease-out",
  once: true,
  offset: 100,
  disable: "mobile", // Disable on mobile for better performance
});

// Navbar Scroll Effect
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

let lastScroll = 0;
window.addEventListener(
  "scroll",
  () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add("shadow-lg");
    } else {
      navbar.classList.remove("shadow-lg");
    }

    lastScroll = currentScroll;
  },
  { passive: true },
);

// Mobile Menu Toggle
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
  document.body.classList.toggle("overflow-hidden");
});

// Close Mobile Menu on Link Click
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.classList.remove("overflow-hidden");
  });
});

// Close Mobile Menu on Outside Click
document.addEventListener("click", (e) => {
  if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.classList.remove("overflow-hidden");
  }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offset = 80;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Animated Counter for Statistics
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + (target >= 1 ? "+" : "");
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Trigger Counter Animation When Visible
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px",
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll(".stat-number");
      statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-target"));
        animateCounter(stat, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe stats section
const heroSection = document.querySelector("#home");
if (heroSection) {
  statsObserver.observe(heroSection);
}

// Scroll Progress Indicator
const scrollProgress = document.getElementById("scrollProgress");
window.addEventListener(
  "scroll",
  () => {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + "%";
  },
  { passive: true },
);

// Active Navigation Based on Scroll Position
const sections = document.querySelectorAll("section[id]");
const navLinksForActive = document.querySelectorAll(".nav-link");

function highlightNavigation() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinksForActive.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightNavigation, { passive: true });

// Form Submission Handler
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get button elements
  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const btnLoader = document.getElementById("btnLoader");
  const btnArrow = document.getElementById("btnArrow");

  // Disable button and show loading
  submitBtn.disabled = true;
  btnText.textContent = "Sending...";
  btnLoader.classList.remove("hidden");
  btnArrow.classList.add("hidden");

  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch(
      "https://foodsbay.com/api/admin/foodsbay/query/form/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    const result = await response.json();
    if (result.success) {
      showNotification(
        "Thank you for your message! We will contact you soon.",
        "success",
      );
      contactForm.reset();
    }

  } catch (error) {
    console.error(error);
    showNotification("Something went wrong. Please try again later.", "error");
  } finally {
    // Re-enable button and hide loading
    submitBtn.disabled = false;
    btnText.textContent = "Send Message";
    btnLoader.classList.add("hidden");
    btnArrow.classList.remove("hidden");
  }

  // Show success notification
  // showNotification(
  //   "Thank you for your message! We will contact you soon.",
  //   "success",
  // );

  // Reset form
  // contactForm.reset();

  // Log for development (replace with actual API call)
  // console.log("Form submitted:", data);
});

// Notification Function
// function showNotification(message, type = "success") {
//   const notification = document.createElement("div");
//   notification.className = `fixed top-24 right-4 md:right-8 max-w-md z-50 animate-slideIn`;
//   notification.innerHTML = `
//         <div class="bg-${type === "success" ? "green" : "red"}-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4">
//             <span class="text-2xl">${type === "success" ? "✓" : "✕"}</span>
//             <p class="font-medium">${message}</p>
//         </div>
//     `;

//   document.body.appendChild(notification);

//   // Auto remove after 4 seconds
//   setTimeout(() => {
//     notification.style.animation = "slideOutRight 0.4s ease-out";
//     setTimeout(() => {
//       notification.remove();
//     }, 400);
//   }, 4000);
// }


function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `fixed top-24 right-4 md:right-8 max-w-md z-50 animate-slideIn`;
  notification.innerHTML = `
    <div class="bg-${type === "success" ? "green" : "red"}-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4">
      <span class="text-2xl">${type === "success" ? "✓" : "✕"}</span>
      <p class="font-medium flex-1">${message}</p>
      <button onclick="this.closest('.fixed').remove()" 
        class="ml-2 text-white/80 hover:text-white text-xl font-bold leading-none transition-colors duration-200 cursor-pointer">
        ✕
      </button>
    </div>
  `;

  document.body.appendChild(notification);

  // Auto remove after 60 seconds
  const autoRemove = setTimeout(() => {
    notification.style.animation = "slideOutRight 0.4s ease-out";
    setTimeout(() => notification.remove(), 400);
  }, 60000);

  // Clear timeout if manually closed
  notification.querySelector("button").addEventListener("click", () => {
    clearTimeout(autoRemove);
  });
}

// Add slideIn animation
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(400px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    .animate-slideIn {
        animation: slideIn 0.4s ease-out;
    }
`;
document.head.appendChild(style);

// Form Validation Enhancement
const inputs = document.querySelectorAll("input, textarea, select");
inputs.forEach((input) => {
  input.addEventListener("invalid", (e) => {
    e.preventDefault();
    input.classList.add("error");

    const errorMsg = input.parentElement.querySelector(".error-message");
    if (!errorMsg) {
      const msg = document.createElement("span");
      msg.className = "error-message text-red-500 text-sm mt-1 block";
      msg.textContent = input.validationMessage;
      input.parentElement.appendChild(msg);
    }
  });

  input.addEventListener("input", () => {
    input.classList.remove("error");
    const errorMsg = input.parentElement.querySelector(".error-message");
    if (errorMsg) {
      errorMsg.remove();
    }
  });
});

// Lazy Loading for Images (Native lazy loading is already used in HTML)
// This is a fallback for older browsers
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document
    .querySelectorAll("img[data-src]")
    .forEach((img) => imageObserver.observe(img));
}

// Performance: Debounce Function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to expensive operations
const debouncedHighlight = debounce(highlightNavigation, 100);
window.addEventListener("scroll", debouncedHighlight, { passive: true });

// Console Message for Developers
// console.log(
//   "%c🌿 Foods Bay - Premium B2B Food Supplier",
//   "font-size: 20px; color: #2d5016; font-weight: bold;",
// );
// console.log(
//   "%cInterested in working with us? Visit our website or send us a message!",
//   "font-size: 14px; color: #4a4a4a;",
// );
// console.log(
//   "%c💻 Built with Tailwind CSS & AOS Animations",
//   "font-size: 12px; color: #7a7a7a;",
// );

// Analytics Tracking (Placeholder)
function trackEvent(eventName, eventData) {
  // console.log("Event tracked:", eventName, eventData);
  // Replace with actual analytics code (Google Analytics, etc.)
  // Example: gtag('event', eventName, eventData);
}

// Track important user interactions
document.querySelectorAll('a[href^="#contact"]').forEach((btn) => {
  btn.addEventListener("click", () => {
    trackEvent("cta_click", {
      button_text: btn.textContent.trim(),
      button_location: btn.closest("section")?.id || "unknown",
    });
  });
});

contactForm.addEventListener("submit", () => {
  trackEvent("form_submission", {
    form_name: "contact_form",
  });
});

// Prevent FOUC (Flash of Unstyled Content)
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "1";
});

// Refresh AOS on window resize for better responsiveness
window.addEventListener(
  "resize",
  debounce(() => {
    AOS.refresh();
  }, 250),
);

// Accessibility: Add skip to main content link
const skipLink = document.createElement("a");
skipLink.href = "#home";
skipLink.className =
  "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded z-50";
skipLink.textContent = "Skip to main content";
document.body.insertBefore(skipLink, document.body.firstChild);

// Performance Optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.body.classList.add("reduce-motion");
}

// Add custom cursor effect for interactive elements (optional enhancement)
const interactiveElements = document.querySelectorAll(
  "a, button, .cursor-pointer",
);
interactiveElements.forEach((el) => {
  el.style.cursor = "pointer";
});
