# How This Website Works - A Beginner's Guide

Welcome! This guide explains this website's code like you've never seen code before.

---

## What is a website?

A website is made of 3 types of files working together:

- **HTML** = The structure (like the walls and rooms of a house)
- **CSS** = The decoration (paint colors, furniture, curtains)
- **JavaScript (JS)** = The electricity (lights turn on, doors open, things move)

Our website has these files:

```
index.html              ← The structure
css/style.css           ← The decoration
js/script.js            ← The electricity (animations, interactions)
js/language-switcher.js ← Switches text between Greek and English
sw.js                   ← Makes the site work without internet
images/                 ← All the photos
```

---

## Part 1: index.html (The Structure)

### What is HTML?

HTML uses "tags" — instructions wrapped in angle brackets. Tags come in pairs:

```html
<p>This is a paragraph</p>
```

- `<p>` = "start a paragraph"
- `</p>` = "end the paragraph"
- The text between is what the user sees

### The two main parts

Every HTML page has two sections:

```html
<html>
  <head> ... </head>   ← INVISIBLE stuff (settings, instructions for the browser)
  <body> ... </body>   ← VISIBLE stuff (what people actually see)
</html>
```

### What's inside `<head>`? (The invisible settings)

**The title:**
```html
<title>Tsiardaka Apartment | Trikala</title>
```
This is the text you see on the browser TAB. Not on the page itself.

**Meta tags — information about the page:**
```html
<meta name="description" content="Comfortable apartment in Trikala...">
```
This is what Google shows as the description in search results. The visitor never sees it on the page, but Google does.

**Links to other files:**
```html
<link rel="stylesheet" href="css/style.css">
```
This says: "Go get the file `style.css` and use it to decorate this page."

```html
<script src="js/script.js" defer></script>
```
This says: "Go get `script.js` and run it." The word `defer` means "wait until the page is fully loaded first."

**Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display..." rel="stylesheet">
```
This downloads special fonts from Google. Our site uses:
- **Playfair Display** = Fancy serif font for headings
- **Inter** = Clean modern font for regular text

### What's inside `<body>`? (The visible content)

The body is divided into **sections**. Think of it like chapters in a book:

```html
<section id="hero">...</section>       Chapter 1: Big intro with house photo
<section id="about">...</section>      Chapter 2: About the apartment
<section id="gallery">...</section>    Chapter 3: Photo gallery
<section id="amenities">...</section>  Chapter 4: WiFi, parking, etc.
<section id="attractions">...</section> Chapter 5: Nearby places
<section id="location">...</section>   Chapter 6: Map
<section id="reviews">...</section>    Chapter 7: Guest reviews
<section id="pricing">...</section>    Chapter 8: Prices and calendar
<section id="contact">...</section>    Chapter 9: How to book
```

The `id` is like a name tag — it lets CSS and JS find that specific section.

### Navigation (the menu bar)

```html
<nav class="main-nav">
  <a href="#about">About</a>
  <a href="#gallery">Gallery</a>
</nav>
```

- `<nav>` = "this is a navigation menu"
- `<a href="#about">` = a clickable link. The `#about` means "scroll down to the section with id=about"

### Special attributes you'll see

```html
<span data-i18n="hero.title">Greek text here</span>
```

`data-i18n` is a custom label we invented. It tells our language switcher: "This text can be translated. Look up the key `hero.title` to find the English version."

```html
<img src="images/gallery/kitchen.jpg" alt="Kitchen" loading="lazy">
```

- `src` = where the image file is
- `alt` = description for blind users (screen readers read this aloud)
- `loading="lazy"` = "don't load this image until the user scrolls near it" (saves bandwidth)

---

## Part 2: css/style.css (The Decoration)

### What is CSS?

CSS = rules that say "make THIS thing look LIKE THIS":

```css
h1 {
    color: red;
    font-size: 40px;
}
```

Translation: "All `<h1>` headings should be red and 40 pixels tall."

### How CSS selects things

| Selector | Meaning | Example |
|----------|---------|---------|
| `h1` | All h1 elements | `h1 { color: red; }` |
| `.box` | All elements with class="box" | `.box { padding: 10px; }` |
| `#hero` | The ONE element with id="hero" | `#hero { height: 100vh; }` |

### CSS Variables (reusable colors)

```css
:root {
    --primary: #1C1C1E;
    --cream: #F5F4F2;
}
```

`:root` means "the whole page." We define colors once here, then reuse them:

```css
background: var(--cream);    /* Uses #F5F4F2 */
color: var(--primary);       /* Uses #1C1C1E */
```

Why? If we want to change a color later, we change it in ONE place instead of hundreds.

### Our color palette

```
--primary: #1C1C1E    = Almost black (main dark color)
--secondary: #6B5A4E  = Warm brown
--accent: #B5ADA5     = Light grey/taupe
--cream: #F5F4F2      = Off-white (page background)
--gold: #9A8573       = Muted gold (buttons, highlights)
```

### Key CSS tricks used

**Flexbox** — putting things side by side:
```css
display: flex;    /* Children line up in a row */
```

**Grid** — making a grid layout:
```css
display: grid;
grid-template-columns: 1fr 1fr 1fr;  /* 3 equal columns */
```

**Frosted glass effect (the menu bar):**
```css
backdrop-filter: blur(20px);             /* Blur what's behind */
background: rgba(245, 244, 242, 0.88);  /* Semi-transparent white */
```
`rgba` = color with transparency. The last number (0.88) = 88% opaque.

**Making it work on phones:**
```css
@media (max-width: 768px) {
    /* These rules ONLY apply on screens smaller than 768px */
    .grid { grid-template-columns: 1fr; }  /* 1 column instead of 3 */
}
```

**Smooth size changes:**
```css
font-size: clamp(1rem, 4vw, 3rem);
```
`clamp(minimum, preferred, maximum)` = the size adjusts with screen width but never goes below minimum or above maximum.

---

## Part 3: js/script.js (The Electricity)

### What is JavaScript?

JavaScript makes things happen. HTML is static (frozen), JS makes it dynamic (alive).

```javascript
// When someone clicks the button, show a message
button.addEventListener('click', function() {
    alert('Hello!');
});
```

### Variables — storing information

```javascript
const name = 'Tsiardaka';     // const = value that never changes
let count = 0;                  // let = value that CAN change
```

### Functions — reusable actions

```javascript
function sayHello() {
    console.log('Hello!');     // Prints to browser console (F12 to see)
}
sayHello();  // Run the function
```

### Objects — grouping related things

```javascript
const CONFIG = {
    phone: '+306987589044',
    email: 'reservations@tsiardaka-apartment.gr'
};
// Access with: CONFIG.phone
```

### Our script.js is organized into "modules"

Each module is a group of code that handles ONE feature:

**CONFIG** — All settings (phone numbers, URLs, map location). Like a contacts list.

**FeatureDetect** — Asks the device: "Can you do 3D graphics? Do you have a mouse? Is this a touchscreen?" So we don't try to show a custom cursor on a phone (phones have no cursor).

**Preloader** — The loading screen you see first. It:
1. Shows the logo and a progress bar
2. Waits at least 2.8 seconds (so you actually see it)
3. Fades away when everything is ready

**Navigation** — Controls the top menu:
- Transparent when you're at the top (so you see the hero image)
- Turns white/solid when you scroll down
- On phones: hamburger menu that opens full-screen

**HeroAnimations** — The big title that appears letter by letter when the page loads. Uses GSAP (an animation library — someone else wrote it, we just use it).

**EditorialGallery** — The photo strip you can drag:
1. Drag left/right to browse photos
2. Click a photo = it zooms to fill the screen
3. Arrow keys or swipe to go next/previous
4. Press ESC or click outside to close

**StatsCounter** — The numbers (800, 5, 100+, 2) that count up from zero when you scroll to them.

**AmenitiesReveal** — The WiFi, parking, kitchen icons that fade in one by one as you scroll down.

**Attractions3D** — The nearby places section. When you scroll down, the cards move sideways with a 3D effect. This is the trickiest part — it "pins" the section in place and converts your vertical scrolling into horizontal movement.

**LocationMap** — Shows an interactive map using MapLibre (a free map library). Has 5 pins: the apartment, Elf Mill, central square, old town, taverns.

**ReviewsMarquee** — Two rows of guest reviews that scroll automatically in opposite directions. Like a news ticker. Pauses when you hover over them.

**Calendar** — The interactive calendar where you:
1. Click a date = check-in date (green)
2. Click another date = check-out date (green)
3. Days in between turn light grey
4. Red/grey dates = already booked (can't select)

**AvailabilityChecker** — Downloads the Airbnb calendar to know which dates are booked. When you pick dates, it checks: "Are any of these days already booked?" and tells you.

**FloatingBookBtn** — The "Book Now" button that floats at the bottom-right corner. Click it and it expands to show options: Phone, WhatsApp, Airbnb, Booking.com.

**ParticleBackground** — Tiny dots floating in the background. Made with Three.js (a 3D graphics library). Purely decorative.

**CookieConsentModule** — The cookie banner at the bottom ("We use cookies..."). Required by EU law (GDPR). If the user says "no" to analytics, Google Analytics doesn't load.

### How it all starts

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // This code runs when the HTML is fully loaded
    Preloader.init();        // Show loading screen first
    Navigation.init();       // Set up the menu
    HeroAnimations.init();   // Prepare hero animation
    // ... all other modules ...
});
```

`DOMContentLoaded` = "the HTML skeleton is ready." We wait for this because we can't animate elements that don't exist yet.

### What is GSAP?

GSAP is an animation library (code someone else wrote that we use). Instead of writing complex animation math ourselves, we say:

```javascript
gsap.to('.box', { x: 100, duration: 1 });
// "Move .box 100 pixels to the right over 1 second"
```

**ScrollTrigger** (GSAP plugin) = "start this animation when the user scrolls to this point":
```javascript
gsap.from('.title', {
    opacity: 0,           // Start invisible
    y: 50,                // Start 50px lower
    scrollTrigger: {
        trigger: '.title', // Watch this element
        start: 'top 80%'  // Start when it's 80% down the screen
    }
});
```

---

## Part 4: js/language-switcher.js (Greek/English)

This file contains ALL text in both languages:

```javascript
const translations = {
    el: {
        "hero.title": "800 βήματα από το Μύλο...",
        "nav.home": "Αρχική"
    },
    en: {
        "hero.title": "800 steps from the Elf Mill...",
        "nav.home": "Home"
    }
};
```

When you click the EL/EN button:
1. It looks at every element with `data-i18n="some.key"`
2. Finds the matching text in the translations object
3. Replaces the visible text
4. Saves your choice in `localStorage` (browser memory that persists)

Next time you visit, it remembers your language preference.

---

## Part 5: sw.js (Offline Support)

**Service Worker** = a helper that runs silently in the background.

Think of it like a waiter at a restaurant:
1. First visit: You order food (request files). The waiter brings them from the kitchen (internet) and secretly saves copies in the fridge (cache).
2. Next visit: The waiter checks the fridge first. If the food is there, you get it instantly. If not, he goes to the kitchen.
3. No internet? The waiter serves from the fridge. You still eat (site still works)!

---

## Part 6: sitemap.xml and robots.txt

**robots.txt** — A message for Google's crawler:
```
"Hey Google, you're allowed to look at everything here.
Here's my sitemap to help you find stuff."
```

**sitemap.xml** — A table of contents for Google:
```
"These are all the pages on my site and when they were last updated."
```

Both help Google find and understand your site = better search ranking.

---

## Summary: How it all fits together

```
You type the website URL in your browser
         |
Browser downloads index.html
         |
index.html says: "Also get style.css and script.js"
         |
style.css makes everything look pretty
         |
script.js makes everything move and respond
         |
language-switcher.js translates text when you click EL/EN
         |
Service Worker saves everything for offline use
         |
Google reads sitemap.xml + robots.txt + meta tags for search ranking
```

That's it! Every website in the world works on these same principles.
The rest is just details and practice.
