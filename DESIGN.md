# UnlockED Design System — "Obsidian Kinetic"

> Extracted from Google Stitch Project #6434954933055708230

## Brand & Style

This design system expresses a high-caliber, transformative journey for underserved ambition. It bridges the precision, high-velocity feel of modern engineering tooling (Linear, Stripe) with the aspirational warmth of premier cohort learning platforms (Maven, Handshake).

Two deliberate paradigms:
1. **Public Marketing & Acquisition:** Light, luminous, and editorial, using warm ivory, crisp slate, and iridescent indigo-violet gradients to project institutional trust and accessible prestige.
2. **Authenticated Platform & Dashboards:** An obsidian dark workspace engineered for deep focus, tangible momentum, and measurable career mobility.

## Color Palette

### Core Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Primary Violet | `#8B5CF6` | Primary actions, active states, focus markers, milestones |
| Secondary Indigo | `#6366F1` | Systemic workflows, secondary surfaces, tab underlines |
| Tertiary Emerald | `#22C55E` / `#4AE176` | Skill mastery, growth metrics, completion, match rates |
| Accent Amber | `#F59E0B` | Prestige credentials, verified badges, streak multipliers |

### Dashboard Surface Tiers (Dark)
| Token | Hex | Usage |
|-------|-----|-------|
| Base Canvas | `#0B0B12` | Pure void background |
| Surface (Stitch) | `#13131A` | Main surface |
| Card Surface L1 | `#151520` | Dense slate-charcoal container |
| Elevated Surface L2 | `#1C1C2B` | Hover states, dropdowns, modals |
| Inset/Input Surface | `#101018` | Recessed fields, track bars |
| surface-container-lowest | `#0E0E15` | — |
| surface-container-low | `#1B1B22` | — |
| surface-container | `#1F1F26` | — |
| surface-container-high | `#2A2931` | — |
| surface-container-highest | `#34343C` | — |
| Structural Outlines | `#232336` | Hairline separation |
| Interactive Hover | `#363654` | — |

### Typography Colors
| Token | Hex | Usage |
|-------|-----|-------|
| on-surface | `#E4E1EC` / `#F5F3FF` | Primary text (dark) |
| on-surface-variant | `#CBC3D7` / `#94A3B8` | Secondary text, labels |
| Muted/Disabled | `#64748B` | Disabled text |

### Light Theme (Marketing)
| Token | Hex |
|-------|-----|
| Canvas | `#FAFAFD` |
| Surface | `#FFFFFF` |
| Borders | `#E2E8F0` |
| Primary Text | `#0F172A` |
| Secondary Text | `#475569` |

### Stitch Named Colors (Full Set)
| Token | Hex |
|-------|-----|
| primary | `#D0BCFF` |
| on-primary | `#3C0091` |
| primary-container | `#A078FF` |
| on-primary-container | `#340080` |
| inverse-primary | `#6D3BD7` |
| secondary | `#C0C1FF` |
| on-secondary | `#1000A9` |
| secondary-container | `#3131C0` |
| on-secondary-container | `#B0B2FF` |
| tertiary | `#4AE176` |
| on-tertiary | `#003915` |
| tertiary-container | `#00A74B` |
| on-tertiary-container | `#003111` |
| error | `#FFB4AB` |
| on-error | `#690005` |
| error-container | `#93000A` |
| on-error-container | `#FFD AD6` |
| background | `#13131A` |
| on-background | `#E4E1EC` |
| surface | `#13131A` |
| on-surface | `#E4E1EC` |
| surface-variant | `#34343C` |
| on-surface-variant | `#CBC3D7` |
| outline | `#958EA0` |
| outline-variant | `#494454` |
| surface-tint | `#D0BCFF` |
| inverse-surface | `#E4E1EC` |
| inverse-on-surface | `#303038` |
| surface-bright | `#393841` |
| surface-dim | `#13131A` |

## Typography

Font: **Inter** (all weights)

| Token | Size | Weight | Line Height | Letter Spacing |
|-------|------|--------|-------------|----------------|
| display-lg | 56px | 700 | 64px | -0.03em |
| display-lg-mobile | 36px | 700 | 44px | -0.025em |
| headline-lg | 32px | 600 | 40px | -0.02em |
| headline-lg-mobile | 26px | 600 | 34px | -0.02em |
| headline-md | 24px | 600 | 32px | -0.015em |
| headline-sm | 20px | 600 | 28px | -0.01em |
| title-md | 16px | 600 | 24px | -0.01em |
| body-lg | 16px | 400 | 26px | -0.005em |
| body-md | 14px | 400 | 22px | 0em |
| body-sm | 12px | 400 | 18px | 0.005em |
| label-md | 13px | 500 | 18px | 0.01em |
| label-sm | 11px | 600 | 16px | 0.04em |
| code-sm | 12px | 500 | 16px | 0.02em |

## Border Radius
| Token | Value |
|-------|-------|
| sm | 0.25rem |
| DEFAULT | 0.5rem |
| md | 0.75rem |
| lg | 1rem |
| xl | 1.5rem |
| full | 9999px |

## Spacing
| Token | Value |
|-------|-------|
| space-xs | 0.25rem |
| space-sm | 0.5rem |
| space-md | 1rem |
| space-lg | 1.5rem |
| space-xl | 2.5rem |
| gutter | 1.5rem |
| gutter-sm | 1rem |
| margin | 2rem |
| margin-sm | 1rem |

## Elevation & Depth

1. **Base Floor (Canvas):** `#0B0B12` unadorned.
2. **Structural Container (L1):** `#151520` + 1px solid `#232336`. No shadow.
3. **Floating Overlay (L2):** `#1C1C2B` + 1px border `#363654` + `0 12px 32px -4px rgba(0,0,0,0.65), 0 0 1px 1px rgba(139,92,246,0.08)`
4. **Frosted Modal (L3):** `rgba(21,21,32,0.8)` + `backdrop-blur(16px)` + `rgba(255,255,255,0.08)` border

### Accent Glows
- Violet: `box-shadow: 0 0 24px -2px rgba(139,92,246,0.25)`
- Emerald: `box-shadow: 0 0 20px -2px rgba(34,197,94,0.22)`

## Component Specs

### Buttons
- **Primary:** bg `#8B5CF6` → hover `#7C3AED`, white text, `inset 0 1px 0 rgba(255,255,255,0.25)`, h-10 (desktop), h-11 (mobile)
- **Secondary:** bg `#1C1C2B`, border `#232336`, text `#F5F3FF`. Hover: border → `#8B5CF6`, bg → `#25253A`
- **Ghost:** transparent, text `#94A3B8`. Hover: bg `#151520`, text `#F5F3FF`

### Cards
- bg `#151520`, border `1px solid #232336`, rounded-2xl
- Hover: border → `#363654`, translate-y: -1px

### Status Badges
- **Emerald:** bg `rgba(34,197,94,0.12)`, text `#22C55E`, border `rgba(34,197,94,0.25)`
- **Amber:** bg `rgba(245,158,11,0.12)`, text `#F59E0B`, border `rgba(245,158,11,0.25)`
- **Violet:** bg `rgba(139,92,246,0.12)`, text `#C4B5FD`, border `rgba(139,92,246,0.3)`

### Inputs
- h-[42px], bg `#101018`, border `1px solid #232336`, text `#F5F3FF`, placeholder `#64748B`, rounded-lg
- Focus: border `#8B5CF6`, ring `0 0 0 3px rgba(139,92,246,0.2)`

## Stitch Screens Reference
| Screen | Description |
|--------|-------------|
| Public Landing Page | Hero, 4-step method, AI pathfinder, courses, testimonials, CTA |
| Authentication Portal | Sign in / Sign up split-screen |
| Student Dashboard | Overview stats, progress, courses, recommendations |
| Explore Courses | Course catalog with search, filters, cards |
| Skill Assessment Hub | Quiz interface, scores, attempt history |
| AI Career Guidance | Chat interface, career paths, recommendations |
| Project Portfolio | Portfolio grid, project cards, tech tags |
| AI Resume Builder | Resume editor, templates, AI suggestions |
| Jobs and Internships | Job listings, filters, application tracking |
| Recruiter Talent Hub | Candidate search, profiles, shortlisting |
| Platform Admin Console | User mgmt, analytics, moderation |
| Profile and Settings | Profile editor, notifications, preferences |

## Layout Grid
- **Desktop (1280px+):** 12 cols, 2rem margins, 1.5rem gutters, max 1440px
- **Tablet (768-1279px):** 8 cols, 1.5rem margins, 1rem gutters
- **Mobile (<768px):** 4 cols, 1rem margins, 1rem gutters
