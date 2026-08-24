# NAVBAR.md — Synaptrove Navbar Specification

> **Goal**: A pixel-precise spec to reproduce the Synaptrove site navbar in any
> framework. Every value below is extracted directly from the production
> implementation in `components/layout/navbar.tsx` — copy values exactly, do
> not approximate.

---

## 1. Behavior Summary

A `position: sticky` header that lives in two distinct visual states:

| State | Trigger | Visual |
|-------|---------|--------|
| **Resting** | `window.scrollY ≤ 50` | Transparent, full-bleed, generous height. Logo + links float on the page. |
| **Floating pill** | `window.scrollY > 50` | Compresses to a centered, narrow, fully-rounded white pill with backdrop blur and a soft drop shadow. |

The transition between the two states is a single coordinated animation on
the inner container (`520ms`, custom easing) — **not** a class swap on multiple
descendants.

The navbar is permanently **light-themed**: black logo and text on transparent
background at rest, on a near-white pill when scrolled. There is no dark
variant. There is no theme toggle.

---

## 2. Layout

### 2.1 Outer header

```css
position: sticky;
top: 0;
z-index: 50;
width: 100%;
```

The `<header>` element does not have padding or background — the inner
wrapper does, so the pill has room to "float" inside the safe area when
scrolled.

### 2.2 Wrapper (responds to scroll)

A single `<div>` immediately inside the header. Its only job is to add safe
padding around the pill when scrolled.

| State | `padding` |
|-------|-----------|
| Resting | `px-0 pt-0` (none) |
| Scrolled | `px-4 pt-3` (mobile) → `sm:px-6` (≥640px) |

### 2.3 Inner container (the pill)

The single animated element. Centered horizontally, max-width changes by
state.

```css
/* Resting */
display: flex;
align-items: center;
justify-content: space-between;
height: 80px;
max-width: 1024px;            /* max-w-5xl */
background: transparent;
padding-inline: 16px;          /* px-4 → sm:px-6 → lg:px-8 */

/* Scrolled */
height: 64px;                  /* sm: 68px */
max-width: 672px;              /* max-w-2xl */
border-radius: 9999px;         /* rounded-full */
background: rgba(255, 255, 255, 0.95);
box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
backdrop-filter: blur(24px);   /* xl */
-webkit-backdrop-filter: blur(24px);
padding-inline: 20px;          /* px-5 → sm:px-6 */
```

**The simultaneous shrink in `max-width` (1024 → 672) and `height` (80 → 64)
is what produces the "floating pill" effect.** Both transition together.

### 2.4 Transition

Applied to the wrapper **and** the inner container:

```css
transition-property: all;
transition-duration: 500ms;
transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
```

The easing (`cubic-bezier(0.22,1,0.36,1)` — Quint Out) is critical — a
linear/ease-out curve makes the pill arrival look mechanical.

---

## 3. Scroll Logic

```ts
const SCROLL_THRESHOLD = 50

const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)

useEffect(() => {
  onScroll()  // run once on mount to handle refresh-mid-page
  window.addEventListener("scroll", onScroll, { passive: true })
  return () => window.removeEventListener("scroll", onScroll)
}, [])
```

Rules:

- **Threshold**: a single `50px` boundary. No hysteresis — flipping back at
  the same threshold is acceptable because the easing absorbs the snap.
- **Passive listener**: required, the navbar must not block scroll.
- **Initial sample**: invoke `onScroll()` once on mount so refreshing
  mid-page doesn't flash the resting state.
- **No `requestAnimationFrame` throttling** — React 18 batching plus the
  `transition` on the element handle the work.

---

## 4. Logo Block

A `<Link href="/">` containing a square icon tile and a wordmark.

### 4.1 Icon tile

| Property | Resting | Scrolled |
|----------|---------|----------|
| Size | `44px × 44px` (`h-11 w-11`) | `40px × 40px` (`h-10 w-10`) |
| Background | `rgba(0, 0, 0, 0.10)` | `rgba(0, 0, 0, 0.10)` |
| Hover background | `rgba(0, 0, 0, 0.15)` | `rgba(0, 0, 0, 0.15)` |
| Border radius | `8px` (`rounded-lg`) | `8px` |
| Inner icon | Lucide `Brain`, `28×28` | Lucide `Brain`, `24×24` |
| Icon stroke | Default (1.6 weight at this size) | Default |
| Icon color | `#000` | `#000` |

The icon size and tile size shrink together; both transition with the same
500ms / Quint Out easing.

### 4.2 Wordmark

```css
font-family: var(--font-display), sans-serif;  /* Montserrat */
font-weight: 700;
letter-spacing: -0.01em;                        /* tracking-tight */
color: #000;

/* Resting */
font-size: 24px;       /* text-2xl */

/* Scrolled */
font-size: 20px;       /* text-xl */
```

### 4.3 Spacing

`gap: 8px` between the icon tile and the wordmark, in **both** states. Do not
animate the gap — only the icon and text resize.

---

## 5. Action Cluster (right side)

A single flex row, `gap: 4px` (`gap-1`).

Order, left → right:
1. `Research` link (desktop only)
2. `Docs` link (desktop only)
3. Optional `extraActions` slot (page-injected items)
4. GitHub icon link (desktop only)
5. Mobile menu trigger (mobile only)

### 5.1 Desktop nav links

Both `Research` and `Docs` are ghost buttons.

| Property | Resting | Scrolled |
|----------|---------|----------|
| Height | `40px` (`h-10`) | `36px` (`h-9`) |
| Padding-x | `16px` (`px-4`) | `12px` (`px-3`) |
| Font-size | `18px` (`text-lg`) | `16px` (`text-base`) |
| Font-weight | `500` | `500` |
| Color | `rgba(0, 0, 0, 0.80)` | same |
| Hover color | `#000` | same |
| Hover background | `rgba(0, 0, 0, 0.04)` | same |
| Visibility | `display: none` < md (768px); `inline-flex` ≥ md | same |

### 5.2 GitHub icon link

```css
display: none;                    /* < md */
border-radius: 9999px;
padding: 6px;                     /* p-1.5 */
color: rgba(0, 0, 0, 0.80);

@media (min-width: 768px) {
  display: inline-flex;
}

/* hover */
background: rgba(0, 0, 0, 0.04);
color: #000;
```

Icon size:
- Resting: `28×28` (`h-7 w-7`)
- Scrolled: `24×24` (`h-6 w-6`)

The icon is the project's `GitHubIcon` SVG (filled mark).

### 5.3 Mobile menu trigger

Visible only `< md`. Lucide `Menu`, button is a perfect square that scales
with the header.

| Property | Resting | Scrolled |
|----------|---------|----------|
| Button | `40×40` | `36×36` |
| Icon | `24×24` | `20×20` |
| Icon color | `#000` | `#000` |

Opening the trigger calls `setMobileOpen(true)` which mounts the `MobileNav`
(a Radix `Dialog` / sheet that owns its own design — out of scope for this
spec, but the open/close handlers live on the navbar).

---

## 6. Entrance Animation

Runs **once** on mount. Targets every element marked with
`data-nav-item` (the logo container and the action cluster).

```ts
gsap.set(targets, { opacity: 0, y: -12 })
gsap.to(targets, {
  opacity: 1,
  y: 0,
  duration: 0.5,
  stagger: 0.06,
  ease: "power2.out",
  delay: 0.15,
})
```

Rules:
- Idempotent — guarded by `hasAnimated.current` so it never replays during
  hot reload or re-render.
- **Mark fewer items than you think.** Only the logo and the actions cluster
  carry `data-nav-item`. Sub-buttons inherit timing by being descendants.
- Plays regardless of scroll state — the entrance and the pill transition
  are independent.

If you don't want a GSAP dependency, this can be replaced with a Framer
Motion variant or a vanilla `Web Animations API` call — the values translate
directly.

---

## 7. Tokens & Imports

The navbar uses these design tokens (defined globally):

```css
--font-display: var(--font-montserrat);   /* wordmark */
--font-sans:    var(--font-roboto);       /* nav links */
```

No color tokens — the navbar is hand-tuned around `#000` and `rgba(0,0,0,…)`
because the floating pill must be perceptible against any page background
(cream, white, or imagery in a hero).

---

## 8. Accessibility

- The header is a `<header>` landmark.
- Logo `<Link>` has implicit accessible name from its inner text.
- GitHub link has `aria-label="GitHub"`.
- Mobile trigger button has `aria-label="Open menu"`.
- The skip link defined in the root `<body>` (`<a href="#main-content">`)
  is intentionally **outside** the navbar — it focuses before the navbar.
- Focus rings inherit from the global `Button` primitive (2px ring,
  `--ring` color, 2px offset).
- All interactive elements are keyboard-reachable; the mobile sheet traps
  focus internally (handled by Radix).

---

## 9. Responsive Breakpoints

| Width | Behavior |
|-------|----------|
| `< 640px` (mobile) | Resting padding `px-4`. Pill padding `px-4 pt-3`. Pill height `64px`. Mobile menu trigger visible; desktop links hidden. |
| `640–767px` (sm) | Resting padding `px-6`. Pill padding `px-6`. Pill height `68px`. Still mobile layout (no inline links). |
| `≥ 768px` (md) | Desktop links + GitHub icon become visible. Mobile menu trigger hidden. |
| `≥ 1024px` (lg) | Resting padding maxes out at `px-8`. Max-widths unchanged. |

---

## 10. Performance Notes

- The navbar is sticky, not fixed — it does not create a new compositing
  layer at rest, only when `backdrop-filter: blur(24px)` is applied
  (scrolled state).
- The 500ms transition runs on `all` properties — acceptable here because
  the only changing properties (`max-width`, `height`, `padding`,
  `border-radius`, `background`, `box-shadow`, `backdrop-filter`) are all
  GPU-friendly composites in modern browsers.
- The scroll listener is `passive: true`, so it never blocks the scroll
  thread.
- Avoid doing layout reads inside `onScroll`. The current implementation
  only sets boolean state; do not add `getBoundingClientRect()` reads here.

---

## 11. Implementation Checklist

- [ ] `<header>` is `sticky`, `top-0`, `z-50`.
- [ ] Inner pill is the *only* element animating; do not animate logo,
      links, or icons individually except for size step-downs.
- [ ] Both resting and scrolled padding values are present and switch
      together.
- [ ] `cubic-bezier(0.22, 1, 0.36, 1)` is used (not `ease-in-out`).
- [ ] Initial `onScroll()` invocation is in the mount effect.
- [ ] Mobile trigger and desktop links are mutually exclusive at the
      `md` breakpoint.
- [ ] GSAP entrance animation is guarded against replay.
- [ ] No dark-mode branches anywhere in the file.
- [ ] No `data-nav-theme` reads — the navbar is permanently light.

---

## 12. Reference Implementation

Source: [`components/layout/navbar.tsx`](../components/layout/navbar.tsx)

This file is the canonical reference. Any value in this document that
disagrees with the source code is wrong — fix the doc.
