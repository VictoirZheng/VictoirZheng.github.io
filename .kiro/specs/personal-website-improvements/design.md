# Design Document

## Overview

This design document outlines the technical approach for implementing comprehensive improvements to a bilingual personal academic website. The solution addresses language switching functionality, layout improvements, content restructuring, and template standardization while maintaining the existing design system and user experience.

## Architecture

### Current System Analysis

The website currently uses:
- HTML5 UP Phantom theme as the base design
- Multilingual architecture with separate `/en/` and `/zh/` directories
- JavaScript-based language switching system (`multilingual.js`, `language-detection.js`)
- Shared components and configuration system in `/shared/` directory
- CSS design system with custom styling

### Proposed Architecture Changes

1. **Enhanced Language Switching System**
   - Modify existing `multilingual.js` to properly handle page refreshes
   - Implement proper URL redirection instead of content loading
   - Maintain language preference persistence

2. **Layout Standardization**
   - Create unified footer component based on contact page design
   - Implement consistent styling across all pages
   - Standardize navigation and header components

3. **Content Management System**
   - Implement template-based approach for Chinese pages
   - Create reusable "coming soon" template
   - Maintain English content while restructuring layout

## Components and Interfaces

### 1. Language Switching Component

**Interface:**
```javascript
class EnhancedLanguageSwitcher {
  switchLanguage(targetLang: string): void
  redirectToLanguagePage(lang: string, currentPage: string): void
  updateLanguagePreference(lang: string): void
}
```

**Implementation:**
- Replace content loading with direct page redirection
- Maintain URL structure: `/{lang}/{page}.html`
- Preserve user preferences in cookies and localStorage

### 2. Footer Standardization Component

**Interface:**
```html
<footer id="footer">
  <div class="inner">
    <ul class="copyright">
      <li>&copy; 2025 Victoir Zheng All rights reserved</li>
      <li>Design: <a href="http://html5up.net">HTML5 UP</a> & <a href="#">Kiro</a></li>
    </ul>
  </div>
</footer>
```

**Implementation:**
- Extract footer from contact page as template
- Apply consistent styling across all pages
- Update copyright and attribution text

### 3. Chinese Pages Template System

**Interface:**
```html
<div class="coming-soon-container">
  <h1>即将推出</h1>
  <p>中文内容正在准备中，敬请期待。</p>
</div>
```

**Implementation:**
- Create unified template for all Chinese pages
- Maintain navigation and language switching functionality
- Apply consistent styling with main website theme
## 
Data Models

### Language Configuration Model
```json
{
  "supportedLanguages": ["en", "zh"],
  "defaultLanguage": "en",
  "languageNames": {
    "en": "English",
    "zh": "中文"
  },
  "redirectMode": true,
  "contentLoadingMode": false
}
```

### Page Structure Model
```json
{
  "pages": {
    "index": { "en": "/en/index.html", "zh": "/zh/index.html" },
    "research": { "en": "/en/research.html", "zh": "/zh/research.html" },
    "skills": { "en": "/en/skills.html", "zh": "/zh/skills.html" },
    "personal": { "en": "/en/personal.html", "zh": "/zh/personal.html" },
    "QAs": { "en": "/en/QAs.html", "zh": "/zh/QAs.html" },
    "contact": { "en": "/en/contact.html", "zh": "/zh/contact.html" }
  }
}
```

### Footer Configuration Model
```json
{
  "copyright": "© 2025 Victoir Zheng All rights reserved",
  "designCredits": [
    { "name": "HTML5 UP", "url": "http://html5up.net" },
    { "name": "Kiro", "url": "#" }
  ]
}
```

## Error Handling

### Language Switching Errors
- **Fallback Strategy**: If target language page doesn't exist, redirect to English version
- **Error Logging**: Log failed language switches for debugging
- **User Feedback**: Display subtle notification for failed switches

### Content Loading Errors
- **Graceful Degradation**: Show placeholder content if resources fail to load
- **Retry Mechanism**: Implement automatic retry for failed requests
- **Error Boundaries**: Prevent JavaScript errors from breaking entire page

### Navigation Errors
- **404 Handling**: Redirect broken links to appropriate language homepage
- **Menu Fallbacks**: Ensure navigation remains functional even if some pages fail

## Testing Strategy

### Unit Testing
- Test language detection logic
- Test URL generation and redirection
- Test footer component rendering
- Test template system functionality

### Integration Testing
- Test complete language switching workflow
- Test navigation between pages in different languages
- Test footer consistency across all pages
- Test Chinese template rendering

### User Acceptance Testing
- Verify language switching works without manual refresh
- Confirm layout improvements meet design requirements
- Validate footer standardization across all pages
- Test Chinese pages show appropriate "coming soon" content

### Cross-Browser Testing
- Test language switching in Chrome, Firefox, Safari, Edge
- Verify layout consistency across different browsers
- Test mobile responsiveness for all components

### Performance Testing
- Measure page load times after language switching
- Test memory usage of enhanced JavaScript components
- Verify no performance regression from design changes