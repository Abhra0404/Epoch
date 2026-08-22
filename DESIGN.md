# DESIGN.md — Paper Background System

> **Goal**: Replicate the exact background, texture, and color system from
> [paper-one-tau.vercel.app](https://paper-one-tau.vercel.app/) in the Synaptrove website.
>
> Every value below was extracted from the production HTML source. Copy-paste exact values — do not approximate.

---

## 1. Page Background & Root Wrapper

### 1.1 Background Color

The page uses a **warm cream / off-white** — not pure white.

```
Light mode:  #F7F7F4
Dark mode:   #1C1917  (keep current Synaptrove dark value)
```

### 1.2 Root Layout `<body>` Class

The Paper site wraps everything in:

```html
<div class="min-h-screen bg-[#F7F7F4] text-[#1A1A1A] font-sans relative overflow-hidden selection:bg-[#E5E5DF]">
```

**Synaptrove adaptation** — apply these changes to `app/layout.tsx` on the `<body>` tag:

```tsx
<body
  className={`${roboto.variable} ${montserrat.variable} ${ptMono.variable} min-h-screen bg-background font-sans antialiased relative overflow-hidden`}
>
```

> Add `relative overflow-hidden` to `<body>` so the diagonal texture overlay can use `absolute inset-0`.

---

## 2. Diagonal Line Texture (THE Key Visual Element)

This is the single most defining visual feature. A full-page CSS overlay using `repeating-linear-gradient`.

### 2.1 Exact CSS

```css
.paper-lines::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0.03),
    rgba(0, 0, 0, 0.03) 1px,
    transparent 1px,
    transparent 24px
  );
}
```

### 2.2 Specification

| Property | Value | Notes |
|----------|-------|-------|
| Angle | `-45deg` | Top-right to bottom-left |
| Line color | `rgba(0, 0, 0, 0.03)` | Black at 3% opacity — barely visible |
| Line width | `1px` | Hairline |
| Line spacing | `24px` | Gap between consecutive lines |
| Position | `fixed` | Stays fixed on scroll (use `fixed` not `absolute`) |
| Coverage | `inset: 0` | Full viewport |
| Interaction | `pointer-events: none` | Clicks pass through |
| z-index | `1` | Above background, below content |

### 2.3 Dark Mode Adaptation

In dark mode, invert the line color to white at low opacity:

```css
.dark .paper-lines::before {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.03),
    rgba(255, 255, 255, 0.03) 1px,
    transparent 1px,
    transparent 24px
  );
}
```

### 2.4 Implementation Location

Add `paper-lines` class to the root layout `<body>` tag:

```tsx
<body className={`... paper-lines`}>
```

And add the CSS to `globals.css` (replace or supplement the existing `paper-texture::after`).

### 2.5 Reduced Motion

Texture is static — no animation — so it respects `prefers-reduced-motion` by default. No changes needed.

---

## 3. Color Token Mapping

Replace the current tokens in `globals.css` `:root` block.

### 3.1 Light Mode `:root`

| Token | Current Value | New Value | Role |
|-------|--------------|-----------|------|
| `--background` | `#FFFFFF` | **`#F7F7F4`** | Page background (warm cream) |
| `--foreground` | `#111827` | **`#1A1A1A`** | Primary text (near-black) |
| `--card` | `#FFFFFF` | **`#FFFFFF`** | Card background (stays white for contrast against cream) |
| `--card-foreground` | `#111827` | **`#1A1A1A`** | Card text |
| `--popover` | `#FFFFFF` | **`#FFFFFF`** | Popover bg (keep white) |
| `--popover-foreground` | `#111827` | **`#1A1A1A`** | Popover text |
| `--primary` | `#111111` | **`#1A1A1A`** | Primary button bg |
| `--primary-foreground` | `#FFFFFF` | `#FFFFFF` | No change |
| `--secondary` | `#F5F5F4` | **`#F4F4F0`** | Secondary surfaces (slightly darker cream) |
| `--secondary-foreground` | `#1C1917` | **`#1A1A1A`** | Secondary text |
| `--muted` | `#F5F5F4` | **`#F4F4F0`** | Muted bg |
| `--muted-foreground` | `#78716C` | **`#6B6B6B`** | Muted text (neutral gray) |
| `--accent` | `#8B5CF6` | **`#8B5CF6`** | Keep violet accent (Synaptrove identity) |
| `--accent-foreground` | `#FFFFFF` | `#FFFFFF` | No change |
| `--border` | `#E7E5E4` | **`#E8E8E4`** | Warm gray border |
| `--input` | `#E7E5E4` | **`#E8E8E4`** | Input border |
| `--ring` | `#8B5CF6` | `#8B5CF6` | No change |
| `--sidebar` | `#FAFAF9` | **`#F4F4F0`** | Sidebar bg |
| `--sidebar-foreground` | `#1C1917` | **`#1A1A1A`** | Sidebar text |

### 3.2 Selection Color

Replace the current violet selection with the warm gray used by the Paper site:

```css
/* In globals.css */
::selection {
  background: #E5E5DF;
  color: inherit;
}

.dark ::selection {
  background: rgba(167, 139, 250, 0.25);
  color: inherit;
}
```

### 3.3 Dark Mode `.dark`

Keep the existing dark mode tokens — they already use a warm stone palette that complements the Paper look. Only update these two:

| Token | Current Value | New Value | Reason |
|-------|--------------|-----------|--------|
| `--foreground` | `#F5F5F4` | `#F5F5F4` | No change |
| `--card` | `#292524` | `#292524` | No change |

Dark mode is already correct. No changes needed.

### 3.4 Paper Shadow System

Update to match the Paper site's softer, more diffuse shadows:

```css
:root {
  --paper-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.03);
  --paper-shadow-md: 0 4px 20px rgba(0, 0, 0, 0.04);
  --paper-shadow-lg: 0 20px 60px -15px rgba(0, 0, 0, 0.05);
}
```

The Paper site uses extremely soft, wide shadows — `shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]` for hero cards. These are more diffuse and less visible than the current Synaptrove shadows.

---

## 4. Border Radius System

The Paper site uses large, generous border radii — far rounder than the current Synaptrove system.

### 4.1 Values Extracted

| Element | Paper Site Value | CSS |
|---------|-----------------|-----|
| Buttons | Fully round | `rounded-full` (pill shape) |
| Cards | Very round | `rounded-[2rem]` (32px) |
| Large containers | Extra round | `rounded-[3rem]` (48px) |
| Inner card areas | Round | `rounded-[1.5rem]` (24px) |
| Code blocks | Moderately round | `rounded-xl` (12px) |

### 4.2 Implementation — CSS Custom Properties

Update the base radius in `globals.css`:

```css
:root {
  --radius: 1rem;                            /* 16px base — up from 10px */
  --radius-card: 2rem;                       /* 32px for cards */
  --radius-container: 3rem;                  /* 48px for large containers */
  --radius-inner: 1.5rem;                    /* 24px for inner areas */
}
```

### 4.3 Tailwind Theme Extension

Add to `@theme inline` block:

```css
@theme inline {
  /* ... existing tokens ... */
  --radius-card: var(--radius-card);
  --radius-container: var(--radius-container);
  --radius-inner: var(--radius-inner);
}
```

### 4.4 Update `.paper-card`

```css
.paper-card {
  background: var(--card);
  border: 1px solid var(--border);
  box-shadow: var(--paper-shadow-md);
  border-radius: var(--radius-card);          /* 2rem instead of var(--radius) */
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}
```

---

## 5. Card Styling

### 5.1 Standard Card

From the Paper site:

```css
/* Card base */
background: white;
border-radius: 2rem;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
border: 1px solid rgba(0, 0, 0, 0.06);      /* ~gray-100 equivalent */

/* Card hover */
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
```

### 5.2 Hero Card (elevated)

```css
background: white;
border-radius: 2rem;
box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.05);
border: 1px solid rgba(0, 0, 0, 0.06);
```

### 5.3 Inner Surface (within cards)

```css
background: #F4F4F0;                         /* var(--secondary) */
border-radius: 1.5rem;
border: 1px solid rgba(0, 0, 0, 0.04);      /* ~gray-200/50 */
```

### 5.4 Card Utility Classes

Add or update in `globals.css`:

```css
/* Standard card */
.paper-card {
  background: var(--card);
  border: 1px solid color-mix(in srgb, var(--foreground) 6%, transparent);
  box-shadow: var(--paper-shadow-sm);
  border-radius: var(--radius-card);
  transition: box-shadow 0.3s ease;
}

.paper-card:hover {
  box-shadow: var(--paper-shadow-md);
}

/* Elevated card (hero, featured) */
.paper-card-elevated {
  background: var(--card);
  border: 1px solid color-mix(in srgb, var(--foreground) 6%, transparent);
  box-shadow: var(--paper-shadow-lg);
  border-radius: var(--radius-card);
}

/* Inner surface (nested areas within cards) */
.paper-inner {
  background: var(--secondary);
  border: 1px solid color-mix(in srgb, var(--foreground) 4%, transparent);
  border-radius: var(--radius-inner);
}
```

---

## 6. Button Styling

The Paper site uses pill-shaped buttons exclusively.

### 6.1 Primary Button

```css
background: #1A1A1A;
color: white;
border-radius: 9999px;                       /* rounded-full */
padding: 0.625rem 1.5rem;                    /* px-6 py-2.5 */
font-weight: 500;
font-size: 0.875rem;                         /* text-sm */
```

### 6.2 Secondary / Outline Button

```css
background: white;
color: #1A1A1A;
border: 1px solid #E5E7EB;                   /* gray-200 */
border-radius: 9999px;
padding: 0.625rem 1.5rem;
font-weight: 500;
font-size: 0.875rem;
```

### 6.3 shadcn/ui Override

Override in `globals.css` or in the shadcn Button component config:

```css
/* Apply to all buttons globally */
.rounded-md,
[data-slot="button"] {
  border-radius: 9999px !important;
}
```

Or better — update the shadcn Button's `buttonVariants` in `components/ui/button.tsx`:

```tsx
// Change the base variant borderRadius from rounded-md to rounded-full
const buttonVariants = cva(
  "... rounded-full ...",  // <-- change from rounded-md
  { ... }
)
```

---

## 7. Typography Adjustments

The Paper site uses lighter font weights than the current Synaptrove config.

### 7.1 Heading Weight

The Paper site uses `font-normal` (400) for headings — very unusual, creates a refined look.

**Synaptrove adaptation** — reduce heading weights but don't go as light as 400 (we use Montserrat which looks best at 600+):

```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display), var(--font-sans), system-ui, sans-serif;
  font-weight: 600;                           /* Down from 700 */
  letter-spacing: -0.025em;
  line-height: 1.15;
}
```

### 7.2 Body Text Weight

The Paper site uses `font-light` (300) for body copy. Synaptrove should stay at 400 for readability with Roboto, but ensure no elements use 700 for body text.

### 7.3 Tracking

The Paper site uses `tracking-tight` (`letter-spacing: -0.025em`) on almost everything. Current Synaptrove headings already do this — no change needed.

---

## 8. Feature Section Background Pattern

The Paper site has a special treatment for feature sections:

```css
/* Outer wrapper */
background: rgba(255, 255, 255, 0.5);        /* bg-white/50 */
border-top: 1px solid rgba(229, 231, 235, 0.5);    /* border-gray-200/50 */
border-bottom: 1px solid rgba(229, 231, 235, 0.5);

/* Inner container */
background: #F7F7F4;                         /* Same as page bg */
border-radius: 3rem;
border: 1px solid rgba(229, 231, 235, 0.5);
```

### 8.1 Utility Class

```css
.paper-feature-section {
  background: color-mix(in srgb, var(--card) 50%, transparent);
  border-top: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
}

.paper-feature-inner {
  background: var(--background);
  border-radius: var(--radius-container);
  border: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
}
```

---

## 9. Footer Styling

The Paper site footer is dramatically different — dark bg with a rounded top.

### 9.1 Exact Styles

```css
/* Footer wrapper */
background: #1A1A1A;
color: white;
border-radius: 3rem 3rem 0 0;               /* rounded-t-[3rem] */
margin-top: 3rem;                            /* mt-12 */

/* Footer divider */
border-top: 1px solid rgba(255, 255, 255, 0.1);  /* ~gray-800 */

/* Footer watermark (giant brand name) */
font-size: clamp(3.75rem, 8vw, 9rem);       /* text-6xl md:text-9xl */
font-weight: 400;
letter-spacing: -0.05em;                     /* tracking-tighter */
opacity: 0.2;
user-select: none;
```

### 9.2 Tailwind Classes for Footer

```tsx
{/* Footer container */}
<footer className="bg-[#1A1A1A] text-white rounded-t-[3rem] mt-12">
  {/* Footer content... */}
  
  {/* Divider */}
  <div className="border-t border-white/10" />
  
  {/* Watermark */}
  <p className="text-6xl md:text-9xl font-normal tracking-tighter opacity-20 select-none">
    Synaptrove
  </p>
</footer>
```

### 9.3 Dark Mode Footer

In dark mode, the footer bg should be slightly lighter than the page bg to maintain visual separation:

```css
.dark footer {
  background: #292524;                       /* var(--card) in dark */
}
```

Or keep `#1A1A1A` since the dark page bg is `#1C1917` — they're close enough that you may want a darker footer:

```css
.dark footer {
  background: #0F0E0D;                       /* Darker than page bg */
}
```

---

## 10. Complete `globals.css` Changes — Diff Summary

### 10.1 `:root` Token Updates

```diff
 :root {
   --radius: 0.625rem;
+  --radius: 1rem;
+  --radius-card: 2rem;
+  --radius-container: 3rem;
+  --radius-inner: 1.5rem;
-  --background: #FFFFFF;
+  --background: #F7F7F4;
-  --foreground: #111827;
+  --foreground: #1A1A1A;
   --card: #FFFFFF;
-  --card-foreground: #111827;
+  --card-foreground: #1A1A1A;
   --popover: #FFFFFF;
-  --popover-foreground: #111827;
+  --popover-foreground: #1A1A1A;
-  --primary: #111111;
+  --primary: #1A1A1A;
   --primary-foreground: #FFFFFF;
-  --secondary: #F5F5F4;
+  --secondary: #F4F4F0;
-  --secondary-foreground: #1C1917;
+  --secondary-foreground: #1A1A1A;
-  --muted: #F5F5F4;
+  --muted: #F4F4F0;
-  --muted-foreground: #78716C;
+  --muted-foreground: #6B6B6B;
   --accent: #8B5CF6;
   --accent-foreground: #FFFFFF;
   --destructive: #DC2626;
   --warning: #D97706;
   --success: #16A34A;
-  --border: #E7E5E4;
+  --border: #E8E8E4;
-  --input: #E7E5E4;
+  --input: #E8E8E4;
   --ring: #8B5CF6;
-  --sidebar: #FAFAF9;
+  --sidebar: #F4F4F0;
-  --sidebar-foreground: #1C1917;
+  --sidebar-foreground: #1A1A1A;

-  --paper-shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
+  --paper-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.03);
-  --paper-shadow-md: 0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
+  --paper-shadow-md: 0 4px 20px rgba(0, 0, 0, 0.04);
-  --paper-shadow-lg: 0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
+  --paper-shadow-lg: 0 20px 60px -15px rgba(0, 0, 0, 0.05);
 }
```

### 10.2 New CSS Blocks to Add

Add these in the `/* Paper Surface System */` section of `globals.css`:

```css
/* ── Diagonal Line Texture (Paper Background) ──────────────── */
.paper-lines::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0.03),
    rgba(0, 0, 0, 0.03) 1px,
    transparent 1px,
    transparent 24px
  );
}

.dark .paper-lines::before {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.03),
    rgba(255, 255, 255, 0.03) 1px,
    transparent 1px,
    transparent 24px
  );
}
```

### 10.3 Selection Color Update

```diff
 ::selection {
-  background: rgba(139, 92, 246, 0.2);
+  background: #E5E5DF;
   color: inherit;
 }
+
+ .dark ::selection {
+   background: rgba(167, 139, 250, 0.25);
+   color: inherit;
+ }
```

### 10.4 `.paper-card` Update

```diff
 .paper-card {
   background: var(--card);
-  border: 1px solid var(--border);
+  border: 1px solid color-mix(in srgb, var(--foreground) 6%, transparent);
   box-shadow: var(--paper-shadow-md);
-  border-radius: var(--radius);
+  border-radius: var(--radius-card);
   transition: box-shadow 0.3s ease, border-color 0.3s ease;
 }

 .paper-card:hover {
   box-shadow: var(--paper-shadow-lg);
-  border-color: var(--accent);
+  border-color: color-mix(in srgb, var(--foreground) 10%, transparent);
 }
```

### 10.5 Heading Weight Update

```diff
 h1, h2, h3, h4, h5, h6 {
   font-family: var(--font-display), var(--font-sans), system-ui, sans-serif;
-  font-weight: 700;
+  font-weight: 600;
   letter-spacing: -0.025em;
   line-height: 1.15;
 }
```

### 10.6 `pre` Background Update

```diff
 pre {
-  background: #FAFAF9 !important;
+  background: #F4F4F0 !important;
   border: 1px solid var(--border);
-  border-radius: var(--radius);
+  border-radius: 0.75rem;
   overflow-x: auto;
 }
```

---

## 11. Layout File Changes

### 11.1 `app/layout.tsx`

```diff
 <body
-  className={`${roboto.variable} ${montserrat.variable} ${ptMono.variable} min-h-screen bg-background font-sans antialiased`}
+  className={`${roboto.variable} ${montserrat.variable} ${ptMono.variable} min-h-screen bg-background font-sans antialiased relative overflow-hidden paper-lines`}
 >
```

This single change adds:
- `relative` — positioning context for the `::before` pseudo-element
- `overflow-hidden` — prevent horizontal scroll from texture
- `paper-lines` — activate the diagonal line texture overlay

---

## 12. Content Z-Index

Because the texture overlay has `z-index: 1`, all content must sit above it.

### 12.1 Global Content Rule

Add to `globals.css`:

```css
/* Ensure all content sits above the diagonal texture */
main, header, footer, nav, [role="dialog"], [data-radix-popper-content-wrapper] {
  position: relative;
  z-index: 2;
}
```

This ensures the navbar, page content, modals, and dropdowns all render above the texture.

---

## 13. Component-Specific Overrides

### 13.1 Navbar

The Paper site navbar floats with a white bg and border:

```css
/* Navbar container */
background: rgba(255, 255, 255, 0.8);       /* bg-white/80 */
backdrop-filter: blur(12px);
border: 1px solid rgba(0, 0, 0, 0.06);
border-radius: 9999px;                       /* rounded-full — pill shape */
```

Adapt for Synaptrove:

```tsx
<nav className="bg-card/80 backdrop-blur-md border border-foreground/[0.06] rounded-full">
```

### 13.2 Hero Section

Remove the NeuralConstellation SVG background and radial violet wash. Replace with the clean cream background — the diagonal texture provides all the visual interest.

The hero should be a simple centered text layout on the cream + diagonal texture. No additional background elements needed.

### 13.3 Code Blocks

```css
pre {
  background: #F4F4F0 !important;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
}

.dark pre {
  background: #292524 !important;
}
```

---

## 14. Visual Reference — ASCII Layout

```
┌─────────────────────────────────────────────────────────┐
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │
│  │  ╲   ╲   ╲   ╲   ╲   ╲   ╲   ╲   ╲   ╲   ╲   ╲  │ │
│  │   ╲   ╲   ╲   ╲   ╲   ╲   ╲   ╲   ╲   ╲   ╲   ╲ │ │
│  │  Diagonal lines at -45°, 1px wide, 24px apart      │ │
│  │  rgba(0,0,0,0.03) on #F7F7F4 background            │ │
│  │   ╲   ╲   ╲   ╲   ╲   ╲   ╲   ╲   ╲   ╲   ╲   ╲ │ │
│  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │
│                                                         │
│    ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐                       │
│    │  ● ─ ● pill navbar       │  bg-white/80           │
│    └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘  rounded-full         │
│                                                         │
│    ┌──────────────────────────────────┐                 │
│    │  Content Card                    │  bg-white       │
│    │  rounded-[2rem]                  │  shadow-sm      │
│    │  ┌────────────────────────────┐  │                 │
│    │  │  Inner Surface             │  │  bg-[#F4F4F0]  │
│    │  │  rounded-[1.5rem]          │  │                 │
│    │  └────────────────────────────┘  │                 │
│    └──────────────────────────────────┘                 │
│                                                         │
│   ╭─────────────────────────────────────────╮           │
│   │  Footer  bg-[#1A1A1A]  text-white       │           │
│   │  rounded-t-[3rem]                       │           │
│   │                                         │           │
│   │  S y n a p t r o v e  (watermark 20%)   │           │
│   └─────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────┘
```

---

## 15. Implementation Checklist

```
[ ] 1. Update `:root` color tokens in globals.css (Section 3.1)
[ ] 2. Update shadow tokens in globals.css (Section 3.4)
[ ] 3. Add diagonal line texture CSS `.paper-lines` (Section 2.1)
[ ] 4. Add `paper-lines relative overflow-hidden` to <body> in layout.tsx (Section 11.1)
[ ] 5. Add content z-index rules (Section 12.1)
[ ] 6. Update `.paper-card` border-radius to var(--radius-card) (Section 10.4)
[ ] 7. Update selection color (Section 10.3)
[ ] 8. Update heading font-weight to 600 (Section 10.5)
[ ] 9. Add new radius tokens (--radius-card, --radius-container, --radius-inner) (Section 4.2)
[ ] 10. Update pre/code block background (Section 10.6)
[ ] 11. Restyle footer with dark bg + rounded top (Section 9)
[ ] 12. Remove hero NeuralConstellation SVG (Section 13.2)
[ ] 13. Update button border-radius to rounded-full (Section 6)
[ ] 14. Verify dark mode (diagonal lines invert, colors correct)
[ ] 15. Verify all content visible above texture (z-index: 2)
[ ] 16. npm run build — 0 errors
```

---

## 16. Files to Modify

| # | File | Changes |
|---|------|---------|
| 1 | `app/globals.css` | Color tokens, shadows, radius tokens, diagonal texture, selection, card classes, heading weight |
| 2 | `app/layout.tsx` | Add `paper-lines relative overflow-hidden` to body |
| 3 | `components/landing/hero-section.tsx` | Remove NeuralConstellation SVG, simplify bg |
| 4 | `components/layout/footer.tsx` | Dark bg, rounded-t-[3rem], watermark |
| 5 | `components/layout/navbar.tsx` | Pill shape (rounded-full), white/80 bg |
| 6 | `components/ui/button.tsx` | Update base border-radius to rounded-full |

**Total: 6 files modified, 0 new files**
