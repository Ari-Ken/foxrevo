I'll integrate the full FoxRevo branding system into the Antigravity master instruction, replacing the generic design section with precise CSS variables, component rules, and the dark/light mode toggle. The wine red stays classy at #A51C30.

---

FOXREVO BRANDING & DESIGN SYSTEM — FOR ANTIGRAVITY AI AGENT

SECTION 14: DESIGN SYSTEM — "LESS IS MORE"

FoxRevo is a heavy-reading platform. Students will spend hours inside module notes and assessments. The design must reduce eye fatigue while maintaining a serious, confident, revolutionary personality. We steal ChatGPT's readability playbook and add one unique accent so students remember us.

---

14.1 COLOR PALETTE — 4 COLORS ONLY

Color HEX Usage
Pure Black #000000 Text, headers, icons
Off White #FAFAFA Background (light mode)
Charcoal Grey #1E1E1E Chat bubbles, cards, borders, dark mode background
FoxRevo Wine Red #A51C30 CTA buttons, active states, logo accent, send icon, loading indicators

Critical Rule: Wine red must never exceed 10% of the visible screen area at any time. If everything is red, nothing is red. It is the punctuation, not the paragraph. Use it like ChatGPT uses green — sparingly, deliberately, memorably.

---

14.2 CSS VARIABLES — COPY DIRECTLY

```css
:root {
  /* Light Mode (Default) */
  --bg-primary: #FAFAFA;
  --bg-secondary: #FFFFFF;
  --bg-tertiary: #F5F5F5;
  --text-primary: #000000;
  --text-secondary: #333333;
  --text-tertiary: #666666;
  --border-light: #E5E5E5;
  --border-medium: #CCCCCC;
  --accent: #A51C30;
  --accent-hover: #8B1A28;
  --accent-text: #FFFFFF;
  --chat-user-bubble: #FFFFFF;
  --chat-ai-bubble: #1E1E1E;
  --chat-ai-text: #E5E5E5;
  --overlay-bg: rgba(0, 0, 0, 0.6);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  --bg-primary: #000000;
  --bg-secondary: #1E1E1E;
  --bg-tertiary: #2A2A2A;
  --text-primary: #E5E5E5;
  --text-secondary: #CCCCCC;
  --text-tertiary: #999999;
  --border-light: #333333;
  --border-medium: #444444;
  --chat-user-bubble: #2A2A2A;
  --chat-ai-bubble: #1E1E1E;
  --chat-ai-text: #E5E5E5;
  --overlay-bg: rgba(0, 0, 0, 0.8);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
}
```

---

14.3 TYPOGRAPHY

Element Font Size Weight Line Height
Body text Inter 16px 400 1.6
Headers (H1) Inter 24px 700 1.3
Headers (H2) Inter 20px 600 1.4
Small text / captions Inter 14px 400 1.5
Button text Inter 16px 600 1.0
Test question text Inter 16px 500 1.6

Font import: @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

Font stack: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

Rules:

· No bold walls of text. Break content with white space.
· Minimum 16px for all readable text. Students will read for 2+ hours straight.
· Line height 1.6 on body text. More spacing equals less fatigue.
· Headers use weight 600-700, never 800 or 900 (too aggressive for learning).

---

14.4 COMPONENT COLOR ASSIGNMENTS

Logo:

· Text "FoxRevo" in pure black (#000000) on light backgrounds, off white (#E5E5E5) on dark backgrounds.
· The fox icon: black silhouette with a wine red dot (#A51C30) for the eye.

Top Navigation Bar:

· Background: --bg-primary
· Border bottom: --border-light (1px)
· Logo on left, dark/light toggle on right.
· Height: 56px.

Buttons — Primary (CTA):

· Background: #A51C30 (wine red)
· Text: #FFFFFF (white)
· Hover: #8B1A28 (darker wine red)
· Border radius: 8px
· Padding: 12px 24px
· Font weight: 600
· This is the ONLY red button on any screen. Never more than one primary CTA visible at a time unless in a comparison table.

Buttons — Secondary:

· Background: transparent
· Text: --text-primary
· Border: --border-medium (1px)
· Hover: --bg-tertiary
· Same sizing as primary.

Buttons — Tertiary / Text Link:

· Text: --text-secondary
· Underline on hover only.
· No background, no border.

Chat Bubbles (Lecture Brain AI context):

· Student message: Background --chat-user-bubble, border --border-light (1px).
· AI / Lecture Brain message: Background --chat-ai-bubble (#1E1E1E), text --chat-ai-text (#E5E5E5).
· No colored bubbles. Charcoal grey for AI, white/off-white for student.

Cards (Testimonials, Offer Cards, Module Cover):

· Background: --bg-secondary
· Border: --border-light (1px)
· Shadow: --shadow-sm
· Border radius: 12px
· Padding: 24px

AuthGate Overlay:

· Background: --overlay-bg
· Blur: backdrop-filter: blur(8px)
· Card: --bg-secondary, centered, max-width 440px.

Module BookReader Pages:

· Background: --bg-primary
· Text: --text-primary
· Each "page" is a full-screen card with generous padding (24px horizontal on mobile, 48px on desktop).
· Page turn buttons: --text-secondary, hover --accent (wine red — subtle, not solid).

Test Interface (JAMB-style):

· Background: --bg-primary
· Top bar with timer: Background #000000, text #FFFFFF (timer is serious, creates exam tension).
· Question area: --bg-secondary
· Options: --bg-secondary with --border-light, hover --border-medium.
· Selected option: Border turns #A51C30 (wine red), background gets a very faint red tint (rgba(165, 28, 48, 0.05)).
· Submit confirmation: Wine red accent on the checkbox checkmark.

Result Page:

· Score circle: Large number in --text-primary, encircled by a ring that uses wine red for the progress arc.
· Performance tier badge: "Excellent" gets a subtle wine red left-border accent. Others use charcoal.
· Buttons: Primary (View Test Analysis) in wine red. Secondary (Retake Test) outlined.

Footer with Chinese Proverb:

· Background: --bg-primary
· Text: --text-tertiary, italic, centered.
· Font size: 14px.
· Separated from content by a thin --border-light line.

Hamburger Menu:

· Icon: --text-primary
· Slide-out panel: Background --bg-secondary, shadow --shadow-md.
· Active item: Wine red left-border (3px) or wine red text.
· Inactive items: --text-secondary.

Countdown Timer:

· Text: --text-primary
· When under 1 hour: Text turns #A51C30 (wine red) — urgency trigger.
· When under 10 minutes: Text pulses (subtle opacity animation, 1s cycle).

Progress Indicators:

· Completed: Wine red (#A51C30).
· In progress: --border-medium.
· Locked: --text-tertiary, faded.

Price Table (Page 4):

· Green price (student price): --text-primary, bold.
· Grey price (FRA price): --text-tertiary, strikethrough.
· "?" tooltip icon: --text-tertiary, hover turns wine red.

---

14.5 DARK / LIGHT MODE TOGGLE

· Place a toggle in the top navigation bar.
· Icon: Sun (light mode) / Moon (dark mode) — simple SVG.
· Toggle behavior: Stores preference in localStorage. Applies data-theme="dark" attribute to <html> element.
· Default: Light mode. On first visit, respect prefers-color-scheme media query.
· Transition: transition: background-color 0.3s ease, color 0.3s ease on body to prevent jarring flash.

---

14.6 SPACING SYSTEM

Use a 4px base unit for consistency.

Token Value Usage
--space-xs 4px Icons, tight padding
--space-sm 8px Inline elements, small gaps
--space-md 16px Standard padding, card internals
--space-lg 24px Section spacing, page margins (mobile)
--space-xl 32px Section dividers
--space-2xl 48px Page margins (desktop), major sections
--space-3xl 64px Hero sections, large separators

---

14.7 ICONOGRAPHY

· Use a consistent icon library: Lucide React (recommended — clean, minimal, tree-shakeable).
· Icon color: --text-primary default. --text-secondary for secondary icons.
· Wine red only for: send button, active navigation state, alert/warning icons, and the logo fox eye.
· Icon size: 20px for inline, 24px for standalone, 32px for feature icons.

---

14.8 ANIMATION & MICRO-INTERACTIONS

· Page transitions (BookReader): Slide horizontal, 300ms ease-out. No fade (feels slow for reading).
· Button hover: Background color shift, 150ms ease.
· Modal / Overlay open: Fade in overlay + scale up card (0.95 → 1.0), 200ms ease-out.
· Loading spinner: Wine red. Simple CSS border spinner. No elaborate animations that distract.
· Countdown pulse (under 10 min): opacity: 1 → 0.7 → 1, 1s cycle, infinite.
· AuthGate blur: Instant on mount, fade out (300ms) on successful verification.
· Test answer select: Border color transition, 150ms, plus a subtle scale (1.0 → 1.02) on the selected option card.
· Hamburger menu: Slide from right, 250ms ease-out with a subtle overlay fade.

Rule: No bounce. No spring physics. No "delightful" micro-interactions that waste time. FoxRevo is serious. Animations must feel fast, purposeful, and almost invisible.

---

14.9 RESPONSIVE BREAKPOINTS

Breakpoint Min Width Target
Mobile 320px Primary target. Most students are on phones.
Tablet 768px Secondary. Some may use iPads or larger phones.
Desktop 1024px Tertiary. Some professionals on laptops.

Rules:

· Design mobile-first. Every component must work perfectly at 375px width.
· Font sizes remain 16px minimum on all breakpoints.
· BookReader page padding: 16px on mobile, 32px on tablet, 48px on desktop.
· Test interface: Single-column on mobile. Two-column (question + options side by side) is NOT needed. Keep it linear for focus.
· Modals and cards: Max-width 440px, 90vw on mobile.

---

14.10 IMPLEMENTATION CHECKLIST FOR ANTIGRAVITY

1. Install Inter font and apply globally.
2. Set up CSS variables in globals.css exactly as provided.
3. Apply --bg-primary to body. Set text color to --text-primary.
4. Build dark mode toggle with localStorage persistence and data-theme attribute.
5. Create a Button component with variant prop: primary (wine red solid), secondary (outlined), tertiary (text-only).
6. All CTA buttons on all pages must use variant="primary" — EXCEPT where there are two CTAs side by side. In that case, the main CTA is primary (wine red), the secondary CTA is secondary (outlined).
7. Never place two wine red solid buttons next to each other on the same view.
8. Apply the Chinese footer component to all transactional pages with the correct proverb text.
9. Ensure the test interface top bar is pure black with white text — no other element on the screen uses pure black as a background except this and the dark mode primary background.
10. The logo: black text "FoxRevo" with a wine red dot. Use SVG for sharp rendering at all sizes.

---

14.11 FINAL BRANDING NOTE

FoxRevo is not a playful startup. It is not a fintech app with gradients and confetti. It is a revolution. The design must feel like a serious weapon — clean, focused, and confident. Students should feel that simply by opening this app, they have separated themselves from the noise.

Black and white do the heavy lifting. Wine red is the signature — rare, deliberate, and unmistakable. When a student sees that wine red button on a white screen, they should know immediately: "This is FoxRevo."

---

This design system is now part of the master build instruction. Every component, every page, and every interaction must respect these rules. Build with precision. The revolution demands excellence.
