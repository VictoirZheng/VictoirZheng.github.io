# Personal Website Design System

## Overview

This design system provides a unified visual language and component library for Qingguang Zheng's academic website. It implements the design specifications from the requirements document, focusing on a professional academic presentation with consistent styling, responsive design, and accessibility.

## Design Tokens

### Colors

The design system uses a dark theme with academic red accents:

```css
/* Primary Colors */
--color-primary: #f56a6a;           /* Academic red */
--color-primary-light: #ff8a80;     /* Light red for gradients */
--color-primary-dark: #d32f2f;      /* Dark red for hover states */

/* Background Colors */
--color-bg-primary: #1a1a1a;        /* Main background */
--color-bg-secondary: #2a2a2a;      /* Section backgrounds */
--color-bg-tertiary: #333333;       /* Input/code backgrounds */
--color-bg-card: rgba(255, 255, 255, 0.03);  /* Card backgrounds */

/* Text Colors */
--color-text-primary: #ffffff;      /* Main headings */
--color-text-secondary: rgba(255, 255, 255, 0.65);  /* Body text */
--color-text-tertiary: rgba(255, 255, 255, 0.45);   /* Muted text */
```

### Typography

```css
/* Font Families */
--font-primary: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;

/* Font Sizes (Responsive Scale) */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */
```

### Spacing

Based on an 8px grid system:

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

## Components

### Cards

The card system provides consistent containers for content with hover effects and variants for different use cases.

#### Basic Card
```html
<div class="card">
  <div class="card__header">
    <h3 class="card__title">Card Title</h3>
    <p class="card__subtitle">Subtitle</p>
  </div>
  <div class="card__body">
    <p>Card content goes here.</p>
  </div>
  <div class="card__footer">
    <div class="card__actions">
      <button class="btn btn--primary">Action</button>
    </div>
  </div>
</div>
```

#### Card Variants

**Research Card**
```html
<div class="card card--research">
  <div class="card__header">
    <h3 class="card__title">Research Project</h3>
    <span class="card__status card__status--ongoing">Ongoing</span>
  </div>
  <div class="card__body">
    <p>Project description...</p>
    <div class="card__technologies">
      <span class="tech-tag">Python</span>
      <span class="tech-tag">NLP</span>
      <span class="tech-tag">Machine Learning</span>
    </div>
  </div>
</div>
```

**Skill Card**
```html
<div class="card card--skill">
  <div class="card__icon">
    <i class="fas fa-code"></i>
  </div>
  <div class="card__body">
    <h4 class="card__title">Programming</h4>
    <div class="skill-level">
      <div class="skill-bar">
        <div class="skill-progress" data-percentage="90"></div>
      </div>
      <div class="skill-percentage">90%</div>
    </div>
  </div>
</div>
```

**Navigation Card**
```html
<a href="/research" class="card card--nav">
  <div class="card__icon">
    <i class="fas fa-microscope"></i>
  </div>
  <h3 class="card__title">Research Portfolio</h3>
  <p class="card__description">Explore my research projects and publications.</p>
</a>
```

### Buttons

Consistent button styling with multiple variants and sizes.

```html
<!-- Primary Button -->
<button class="btn btn--primary">Primary Action</button>

<!-- Secondary Button -->
<button class="btn btn--secondary">Secondary Action</button>

<!-- Ghost Button -->
<button class="btn btn--ghost">Ghost Button</button>

<!-- Button Sizes -->
<button class="btn btn--primary btn--sm">Small</button>
<button class="btn btn--primary">Default</button>
<button class="btn btn--primary btn--lg">Large</button>

<!-- Button with Icon -->
<button class="btn btn--primary">
  <i class="fas fa-download btn__icon btn__icon--left"></i>
  Download CV
</button>
```

### Grid System

Responsive grid system using CSS Grid:

```html
<!-- Basic Grid -->
<div class="grid grid--3 grid--gap-md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Responsive Grid -->
<div class="grid grid--responsive">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>

<!-- Auto-fit Grid -->
<div class="grid grid--auto-fit">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Container System

```html
<!-- Standard Container -->
<div class="container">
  <p>Content with responsive padding and max-width</p>
</div>

<!-- Narrow Container -->
<div class="container container--narrow">
  <p>Narrower content for better readability</p>
</div>

<!-- Fluid Container -->
<div class="container container--fluid">
  <p>Full-width content</p>
</div>
```

## Layout Components

### Section

```html
<section class="section">
  <div class="container">
    <h2>Section Title</h2>
    <p>Section content...</p>
  </div>
</section>

<!-- Section Variants -->
<section class="section section--sm">Small padding</section>
<section class="section section--lg">Large padding</section>
<section class="section section--bg">Background color</section>
<section class="section section--bg-accent">Accent background</section>
```

### Hero Section

```html
<section class="hero">
  <div class="container">
    <h1 class="hero__title">Hero Title</h1>
    <p class="hero__subtitle">Hero subtitle with supporting text</p>
    <div class="hero__actions">
      <button class="btn btn--primary btn--lg">Primary CTA</button>
      <button class="btn btn--secondary btn--lg">Secondary CTA</button>
    </div>
  </div>
</section>
```

## Utility Classes

### Text Colors
```html
<p class="text-primary">Primary text color</p>
<p class="text-secondary">Secondary text color</p>
<p class="text-accent">Accent text color</p>
<p class="text-success">Success text color</p>
```

### Spacing
```html
<div class="mt-4">Margin top</div>
<div class="mb-6">Margin bottom</div>
<div class="p-8">Padding all sides</div>
<div class="px-4">Padding horizontal</div>
```

### Flexbox
```html
<div class="flex flex--justify-center flex--items-center flex--gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Display
```html
<div class="hidden">Hidden on all screens</div>
<div class="md:hidden">Hidden on medium screens and up</div>
<div class="lg:block">Visible on large screens and up</div>
```

## Responsive Design

The design system uses a mobile-first approach with the following breakpoints:

- `sm`: 640px and up
- `md`: 768px and up  
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

### Responsive Grid Examples

```html
<!-- 1 column on mobile, 2 on tablet, 3 on desktop -->
<div class="grid grid--1 md:grid--2 lg:grid--3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## JavaScript Functionality

The design system includes interactive JavaScript features:

### Card Animations
- Hover effects with transform animations
- Click ripple effects for interactive cards
- Scroll-triggered animations for card entrance

### Skill Bar Animations
- Animated progress bars when scrolled into view
- Configurable percentage values

### Button Interactions
- Loading states with spinner animations
- Ripple click effects
- Keyboard navigation support

### Utility Functions

```javascript
// Show notification
showNotification('Success message', 'success', 3000);

// Update skill bar
updateSkillBar(skillBarElement, 85);

// Smooth scroll
smoothScrollTo('#target-section', 100);

// Set button loading state
setButtonLoading(buttonElement, true);
```

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles where appropriate
- Keyboard navigation support
- Focus visible indicators
- Color contrast compliance (WCAG 2.1 AA)
- Screen reader friendly text
- Reduced motion support

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## File Structure

```
assets/
├── css/
│   ├── main.css              # Original theme CSS
│   └── design-system.css     # New design system CSS
├── js/
│   ├── main.js              # Original theme JS
│   └── design-system.js     # Design system interactions
└── sass/
    ├── libs/
    │   └── _design-system.scss
    ├── components/
    │   ├── _cards.scss
    │   ├── _buttons.scss
    │   └── _grid.scss
    └── base/
        └── _design-system-overrides.scss
```

## Usage Guidelines

1. **Always use design tokens** instead of hardcoded values
2. **Follow the 8px spacing grid** for consistent layouts
3. **Use semantic HTML** with appropriate ARIA attributes
4. **Test responsive behavior** on multiple screen sizes
5. **Ensure color contrast** meets accessibility standards
6. **Use consistent component patterns** across pages

## Future Enhancements

- Light theme variant
- Additional card types for specific content
- Animation library integration
- Component documentation generator
- CSS-in-JS migration path
- Advanced grid layouts
- Theme customization API

## Implementation Notes

This design system is implemented as a CSS overlay on the existing Phantom theme, ensuring backward compatibility while providing modern design patterns and improved user experience. The system can be gradually adopted across all pages without breaking existing functionality.