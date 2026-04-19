# Design System Specification

## 1. Overview & Creative North Star: "The Hyper-Curated Canvas"

This design system is built upon the philosophy of **The Hyper-Curated Canvas**. It moves beyond standard portfolio templates to create a high-end, editorial experience where whitespace is not "empty" but is an active structural element. By leveraging extreme typographic scale and tonal layering, we move away from the "boxed-in" web and toward a fluid, airy digital gallery.

The "Canvas" rejects the rigid constraints of traditional grids in favor of intentional asymmetry. It treats every interface as a composition, using the vibrant accent color (#a300aa) as a surgical tool to draw the eye to critical information while maintaining a whisper-quiet background environment.

---

## 2. Colors & Tonal Architecture

Our palette is anchored by a soft, breathable background that allows content to float. The vibrancy of the primary accent provides a high-fashion "pop" against a monochromatic base.

### The Palette
*   **Primary (Accent):** `primary` (#a300aa) — Used exclusively for high-impact brand moments and key CTAs.
*   **Surface:** `surface` (#faf9f9) — The foundation of the canvas.
*   **Typography:** `on-surface` (#1b1c1c) — Deep charcoal for maximum legibility without the harshness of pure black.
*   **Muted Text:** `secondary` (#575f6a) — For metadata and secondary labels.

### The "No-Line" Rule
To maintain a premium editorial feel, **1px solid borders are strictly prohibited for sectioning.** 
*   Boundaries must be defined solely through background color shifts.
*   Example: A project list item should sit on `surface`, but on hover, transition to `surface-container-low` rather than gaining an outline.

### Surface Hierarchy & Nesting
Instead of a flat grid, treat the UI as a series of physical layers.
*   **Level 0 (Base):** `surface`
*   **Level 1 (Sections):** `surface-container-low`
*   **Level 2 (Floating/Cards):** `surface-container-lowest`
Use these shifts to create "nested" depth. Each inner container should use a slightly higher or lower tier to define its importance, mimicking stacked sheets of fine archival paper.

### The "Glass & Gradient" Rule
For floating elements (modals, navigation bars), use **Glassmorphism**.
*   **Token:** Semi-transparent `surface` color with a `backdrop-blur` of 20px.
*   **Signature Texture:** Use a subtle linear gradient transitioning from `primary` to `primary-container` for main action buttons to provide a "soul" and depth that flat color cannot achieve.

---

## 3. Typography: Editorial Rhythm

The typography scale is designed to create a sense of hierarchy through dramatic size contrasts rather than heavy weights.

*   **Display (The Headline):** Use `display-lg` (3.5rem) for hero statements. Set with tight tracking and a light weight to feel like a premium magazine cover.
*   **Title (The Anchor):** Use `title-lg` (1.375rem) for project titles in lists.
*   **Body (The Narrative):** Use `body-lg` (1rem) for descriptions, ensuring a line height that promotes "breathability" (1.6 - 1.8).
*   **Label (The Metadata):** Use `label-sm` (0.6875rem) in all-caps with generous letter-spacing for dates or categories. This provides an authoritative, "archival" feel.

---

## 4. Elevation & Depth: Tonal Layering

This system rejects traditional box-shadows. Hierarchy is achieved through **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a soft, natural lift that feels integrated into the environment.
*   **Ambient Shadows:** If a "floating" effect is mandatory, shadows must be extra-diffused. Use a 40px blur at 4% opacity. The shadow color should be a tinted version of `on-surface` to mimic natural ambient light.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **10% opacity**. Never use 100% opaque, high-contrast borders.

---

## 5. Components

### Buttons
*   **Primary:** `primary` background with `on-primary` text. Use `xl` (0.75rem) roundedness. 
*   **Tertiary (Ghost):** No background or border. Only `on-surface` text with an underline that appears on hover.
*   **Hover State:** A subtle scale-up (1.02x) and a shift to `primary-container`.

### Lists (The Portfolio Core)
The list is the heart of this system.
*   **Structure:** No divider lines. Separate items with vertical white space (e.g., 32px or 48px).
*   **Hover Interaction:** On hover, the entire row background shifts to `surface-container-low`. The `primary` accent color should only appear on a specific element (like the company name or an arrow icon).
*   **Transition:** All hover states must use a 300ms `cubic-bezier(0.4, 0, 0.2, 1)` transition for a "weighted" feel.

### Input Fields
*   **Style:** Minimalist. No background box; only a bottom "Ghost Border" (10% `outline-variant`).
*   **Focus State:** The bottom border transforms into a 2px `primary` line.

### Chips
*   **Visuals:** Use `surface-container-high` with `label-md` text. Roundedness: `full`.
*   **Purpose:** Use for categorizing work (e.g., "UI/UX", "Branding").

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical margins to create visual interest (e.g., a wider left margin for titles).
*   **Do** allow images to break the grid, bleeding into the whitespace.
*   **Do** use the `primary` accent sparingly—it is a spotlight, not a floodlight.
*   **Do** prioritize "Inter" font-weight 300 and 400 for a sophisticated, airy tone.

### Don't
*   **Don't** use 1px black borders to separate content; use whitespace or tonal shifts.
*   **Don't** use traditional "Drop Shadows" with high opacity.
*   **Don't** crowd the interface. If an element feels "stuck," add 16px of padding.
*   **Don't** use pure black (#000000) for large blocks of text; use `on-surface` for a softer editorial look.