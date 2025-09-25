**HTML → Webflow XscpData: Authoring Rules**

- Purpose: Deterministic rules to convert plain HTML (plus intent) into Webflow’s XscpData JSON that pastes cleanly into the Designer.
- Scope: Structures, node typing, text handling, classes (+ combo classes), attributes, and common Webflow quirks. CSS mapping comes later.

**Core Schema**
- Root: `{"type":"@webflow/XscpData","payload":{...},"meta":{...}}`
- `payload.nodes`: ordered flat list of nodes. Parent-child relationships are by id inside each node’s `children` array.
- Node id: unique string. Use stable, readable ids where possible.
- Text node: `{"_id":"<id>","text":true,"v":"..."}`. Text nodes appear in `children` of element nodes.
- Styles: `payload.styles` contains class definitions with combo relationships. Keep entries flat; do not nest object literals inside `children`.

**Node Typing Rules**
- `div/section/header/footer/nav/...`: use `type:"Block"`, set block-level HTML tag in `tag` and in `data.tag` for sections only if needed. Example: section → `{"type":"Block","tag":"section"}`.
- Headings (h1..h6): use `type:"Heading"`, `tag:"hN"`, and one text child node.
  - Example: `{"type":"Heading","tag":"h2","children":["h2-text"],"data":{"tag":"h2"}}` and `{"_id":"h2-text","text":true,"v":"Title"}`.
- Paragraphs: use `type:"Paragraph"`, `tag:"p"`, plus a text child node.
- Spans and other inline-only tags: use `type:"DOM"`, `tag:"div"`, and specify the real inline tag in `data.tag`.
  - Example (span): `{"type":"DOM","tag":"div","data":{"tag":"span","attributes":[],"slot":"","text":false}}` with text children.
  - Rationale: Mirrors Webflow’s paste structure; avoids span/inline paste issues.
- Images: `type:"Image"`, `tag:"img"`, set `data.img` and relevant attributes (`alt`, `src`, etc.).
- Links: `type:"Link"`, `tag:"a"`, set `data.link` (mode/url) and optional `button`/`block` flags.
- Embeds (SVG/HTML): `type:"HtmlEmbed"`, `tag:"div"`, set `data.embed` with `type:"html"` and `v` to the markup when needed.

**Children Ordering**
- Preserve DOM order. Children array must list ids in the exact visual/semantic order expected.
- For instructional helper nodes (e.g., notes to apply a style manually), place them first so they’re visible after paste.

**Text Handling**
- Always separate text into a dedicated text node (`text:true, v:"..."`). Do not embed text directly on element nodes.
- Headings/paragraphs: exactly one text child unless intentional rich content.
- Line breaks: avoid `<br>` unless explicitly required. Prefer single-line text; designer can handle wrapping.

**Attributes (xattr) and Constraints**
- Arbitrary attributes go under `data.xattr` as `{name, value}` pairs.
- Known constraints:
  - Inline `style` is blocked on some tags (notably `section`). Do not emit a `style` xattr on those. Instead:
    - Add a visible instruction paragraph as the first child with text like: “add --current-slide: ... to the section-work-scroll”.
    - Or, if allowed, move styles to a child `div` or to CSS classes (future CSS mapping phase).
- Data attributes (e.g., `data-*`) are allowed. Keep them in `xattr`.

**Classes and Styles**
- Node `classes` must list all applied classes, including base and all combos, in order. Example: `["cls-section","cls-section-work-scroll"]`.
- In `payload.styles`, create one entry per class id. Use ids like `cls-<kebab-name>` for readability.
- Base class entry:
  - `{"_id":"cls-section","type":"class","name":"section","comb":"","styleLess":"","children":["cls-section-work-scroll"]}`
- Combo class entry:
  - `{"_id":"cls-section-work-scroll","type":"class","name":"section-work-scroll","comb":"&","styleLess":""}`
  - Rule: `comb:"&"` for combos. Base classes use `comb:""`.
- Never nest class objects inside another class’s `children`. Children must be an array of id strings.
- When the same combo name (e.g., “hidden”) is applied on multiple different bases, generate distinct combo ids for each base to avoid Webflow showing the combo as the base class:
  - Example: `cls-single-title-hidden` and `cls-xl-hidden` (both with `name:"hidden"`, `comb:"&"`).
  - Then apply them on nodes as `classes: ["cls-single-title","cls-single-title-hidden"]` or `classes: ["cls-xl","cls-xl-hidden"]`.

**Combo Class Application Rules**
- Always add combo classes to node `classes` alongside the base class.
- Connect combos under their base in `styles` via `children`.
- Typical patterns observed:
  - Bubble variant: `selected-work` + `bubble` → node classes `["cls-selected-work","cls-bubble"]`; styles define base `cls-selected-work` with child `cls-bubble` (combo).
  - Eyebrow size variant: `eyebrow` + `l` → node classes `["cls-eyebrow","cls-l"]`; styles define base `cls-eyebrow` with child `cls-l`.
  - Column variants: `col` + `col-grow` (+ specific) and `col` + `col-no-grow` → include all in node classes, and define combos with `comb:"&"`.

**Span Construction Pattern (Inline + Nested spans)**
- Principle: Never leave bare text nodes directly under a `DOM` span; always wrap text parts into child `DOM` spans. Preserve the original text position relative to child spans.
- Algorithm for any span that has both text and one or more child spans:
  1) Split the parent span’s text nodes into one or more new `DOM` span children (no classes), each with a text node inside.
  2) Insert each new text span at the same index position where the original bare text appeared (before the first child, between children, or after the last child).
  3) Keep all original child spans unchanged (ids and classes preserved).
- Counter example “<span class="eyebrow l"><span class="current-slide-index-change">1</span>"/3"</span>”:
  - Outer wrapper: `type:"DOM"`, `data.tag:"span"`, classes `["cls-eyebrow","cls-l"]`.
  - Children: `[current-span, total-span]` (because the text comes after the first child in the source).
    - `current-span`: `type:"DOM"`, `data.tag:"span"`, class `cls-current-slide-index-change`, with text child `"1"`.
    - `total-span`: `type:"DOM"`, `data.tag:"span"` (no classes), with text child `"/3"`.
- If the text appears before the first nested span, output `[text-span, original-first-span, ...]`. If between spans, insert the new text span at that exact index.

**Heading Construction Pattern**
- Always:
  - Use `type:"Heading"`, set `tag:"hN"` (and mirror in `data.tag`), add a single text child.
  - Apply base + combo classes on the heading node (e.g., `xl` plus `xl-hidden` when hidden).
- Never use `type:"Block"` for headings.

**Hidden Elements Pattern**
- Hidden state must be a combo on the base class. Do not assign a generic `hidden` class id everywhere.
- Create base-specific hidden combos (ids unique per base) and apply them on nodes, e.g.:
  - Node: `classes: ["cls-single-title","cls-single-title-hidden"]`.
  - Styles: `cls-single-title` children → `["cls-single-title-hidden"]`; `cls-single-title-hidden` → `comb:"&"`.

**Instructional Placeholder Pattern**
- When a required inline style cannot be placed (e.g., section variables): add a first-child instruction Paragraph.
- Example node:
  - `{"type":"Paragraph","tag":"p","children":["note-text"],"data":{"tag":"p"}}`
  - Text: “add --current-slide: -0%; --current-slide-precentage: -66.66666666666666%; to the section-work-scroll”
  - Optionally add a lightweight class (e.g., `instruction`) if you want it visually distinct, then remove after editing in Webflow.

**ID, Naming, and Stability**
- `cls-` prefix for class ids, then kebab-case of the class name. For combos per base, introduce a base-specific prefix (e.g., `cls-xl-hidden`).
- Node ids should be readable and map to the DOM role (`title-1`, `h2-1`, `logo-visual-1`, etc.).
- Keep ids stable across regenerations to avoid breaking interactions later.

**Validation Checklist Before Paste**
- Nodes
  - Headings use `type:"Heading"` with a text child.
  - Spans use `type:"DOM"` with `data.tag:"span"` and a text child.
  - No freeform text on non-text nodes (text must be a child node).
  - Children order matches the expected visual/semantic order.
- Classes
  - Every node has base + all combos in `classes`.
  - `styles` has exactly one entry per class id.
  - Base entries use `comb:""`; combos use `comb:"&"`.
  - Base `children` lists contain only id strings of combo classes.
  - Reused combo names across different bases use distinct ids (e.g., `*-hidden`).
- Attributes
  - Only allowed attributes are placed in `data.xattr`.
  - Avoid inline `style` on restricted tags (e.g., `section`). Use instructional child instead.
- Meta
  - Include empty `assets`, `ix1`, and `ix2` unless necessary.

**Practical Examples**
- Section + combo class:
  - Node: `classes: ["cls-section","cls-section-work-scroll"]`.
  - Styles: `cls-section` with children `["cls-section-work-scroll"]`; `cls-section-work-scroll` has `comb:"&"`.
- Selected work bubble:
  - Node: `classes: ["cls-selected-work","cls-bubble"]`.
  - Styles: `cls-selected-work` → children `["cls-bubble"]`; `cls-bubble` → `comb:"&"`.
- Eyebrow l:
  - Node: `classes: ["cls-eyebrow","cls-l"]`.
  - Styles: `cls-eyebrow` → children `["cls-l"]`; `cls-l` → `comb:"&"`.
- Hidden title pattern:
  - Node: wrapper `single-title` + `single-title-hidden`; inner h2 uses `xl` + `xl-hidden`.

**Generation Algorithm (Deterministic)**
1) Parse HTML into a DOM.
2) Walk DOM depth-first and emit nodes:
   - Map tags to node `type` per rules above.
   - Create element node id, push to `payload.nodes`.
   - For textual content, emit separate text nodes and reference via `children`.
   - For `span`, create `DOM` node with `data.tag:"span"`.
   - If a `span` has both text and child `span` elements, split each text run into its own child `DOM` span and place it at the original position (before/after/between). Do not alter the original nested span(s).
   - For heading tags, use `Heading`.
3) Build class graph:
   - For each element’s class list, split into base + inferred combos (when authoring specifies combo relationships) or treat all as base unless a known base/variant mapping exists.
   - Add all classes (base + combos) to the node `classes` array.
   - In `styles`, create base class entries (`comb:""`) and combo class entries (`comb:"&"`).
   - Connect combos under their base via `children` (id strings only).
   - For reused combo names across bases (e.g., `hidden`), generate per-base combo ids like `cls-<base>-hidden` to avoid base detection issues in Webflow.
4) Attributes:
   - Move `data-*` attributes to `data.xattr`.
   - If a `style` is present on restricted tags, remove it and inject an instruction Paragraph as the first child.
5) Ordering:
   - Maintain child order from the original HTML. Ensure instruction nodes are first when present.
6) Finalization:
   - Ensure `assets`, `ix1`, `ix2` exist (even if empty) on `payload`.
   - Keep `meta` with zeroed counts.

**Edge Cases and Do/Don’t**
- Don’t nest style objects inside other style objects’ `children`.
- Don’t omit combos from node `classes`; Webflow needs base + combos listed on the node.
- Don’t reuse a single `hidden` class id across different bases; make base-specific hidden combos.
- Do convert spans and counters into `DOM` span wrappers with text children.
- Do convert headings to `Heading` nodes with text children.
- Do add instruction paragraphs when a style variable is required on a restricted element.

**Minimal Template**
- Nodes list: flat array, each `{_id, type, tag, classes?, children?, data?}`.
- Styles list: one entry per class id; base `comb:""`; combo `comb:"&"`; base `children` lists combos by id.
- Text nodes: `{"_id":"...","text":true,"v":"..."}`.

**Future CSS Mapping (Placeholder)**
- Strategy: collect inline styles and class styles from source HTML/CSS, convert them into `styleLess` on class entries; variants map to `variants` in styles; preserve tokenization and variable usage when present.
- Ensure deterministic class naming to avoid collisions across sections.

**Operational Tips**
- Use stable `cls-` ids and node ids so re-pasting updates predictably.
- Keep instructional nodes clearly labeled so editors can remove them post-adjustment.
- Validate with the checklist before handing off.

**Finsweet TS Utils Tips (Optional Integration)**
- CopyJSONButton (from Finsweet ts-utils/components)
  - Purpose: Bind a trigger element that copies a JSON payload to clipboard in the Webflow-compatible MIME type so it can be pasted directly into the Designer.
  - Signature (from docs):
    - `element: HTMLElement` — the clickable element
    - `copyData: Record<string, unknown>` — the JSON to copy
    - `successText?: string` — optional success message
    - `errorText?: string` — optional error message
    - `successCSSClass?: string` — optional CSS class added on success
  - Behavior: listens to `copy` event and writes `application/json` content; aligns with our `copyComponent()` approach. If adopting this util, delegate our click handler to it and pass the XscpData object you build.
  - Quick mapping from our code:
    - `element` → the `.copy-btn`
    - `copyData` → parsed JSON of the string we store in `components[id]`
    - Our notification can be replaced by `successText`/`successCSSClass`.
- Type guards and runtime validation (ts-utils/type-guards)
  - Strategy: define narrow guards for XscpData shapes to fail fast before copying:
    - `isXscpData`, `isNode`, `isTextNode`, `isStyleClass`, `isComboClass` — specialized guards for your generator’s outputs.
    - Guard rules: reject nodes missing `type/tag`, reject headings without a single text child, reject DOM spans with bare text children, reject styles with nested objects in `children`.
  - Benefit: provides strong, typed assurances before attempting to paste into Webflow.
- Helpers (ts-utils/helpers)
  - DOM helpers: centralize `qs/qsa` lookups, add safe event listener helpers with typed handlers, and implement a small `once()` utility for one-time listeners (copy success, etc.).
  - Data helpers: stable `stringify` that preserves key order for predictable diffs; deep-clone utilities to avoid accidental mutations between generator passes.
- Webflow utils (ts-utils/webflow)
  - Pattern: wait for Webflow runtime/IX to initialize (e.g., on `DOMContentLoaded` and then `Webflow.require('ix2')` readiness) before binding UI buttons on live sites.
  - When programmatically toggling classes or elements after paste, debounce to avoid fighting Designer state.
- DisplayController / Interaction (ts-utils/components)
  - Use typed controllers for show/hide or stateful UI linked to data attributes if you need to preview interactions outside Designer.
  - Keep selectors resilient and prefer `data-*` hooks over class names used for styling.

Note: The above Finsweet tips are optional; they complement this spec when you implement the converter in a TypeScript app or when you ship copy/paste helpers on a site. The core XscpData rules in this document remain the source of truth for generating valid, pasteable JSON.
