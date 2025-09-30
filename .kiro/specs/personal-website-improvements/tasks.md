# Implementation Plan

- [x] 1. Fix Language Switching Functionality


  - Modify the multilingual.js to use page redirection instead of content loading
  - Update language switcher click handlers to redirect to appropriate language URLs
  - Test language switching works without manual refresh across all pages
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 2. Standardize Footer Design Across All Pages


  - Extract footer HTML and CSS from contact page as template
  - Update footer text to "© 2025 Victoir Zheng All rights reserved"
  - Add Kiro attribution alongside HTML5 UP in design credits
  - Apply standardized footer to all English pages (index, research, skills, personal, QAs)
  - _Requirements: 2.8, 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 3. Improve English Index Page Layout


  - Center and align all elements in the introduction section properly
  - Fix color consistency issues to prevent unnecessary color variations
  - Ensure sufficient text-background contrast for WCAG AA compliance
  - Remove "Research Impact & Academic Excellence" section completely
  - Remove "Research Portfolio Highlights" section completely
  - Remove "Research Impact" section completely
  - Convert "Explore My Academic Journey" into navigation links to other pages
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [x] 4. Update Research Page with Legacy Design


  - Replace current research page content with legacy/root-pages/research.html design
  - Preserve existing research content while applying legacy layout structure
  - Ensure navigation and header remain consistent with other pages
  - Test all interactive elements function properly with new design
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 5. Clean Up QAs Page Filter Categories


  - Remove meaningless filter tags: "Research Motivation", "PhD Application", "Future Plans", "Personal"
  - Preserve remaining useful filter categories and ensure they function properly
  - Maintain logical content organization and accessibility
  - Test filtering functionality works correctly with remaining categories
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 6. Create Unified Chinese Pages Template System



  - Design consistent "coming soon" template for all Chinese pages
  - Create template with professional styling matching overall website design
  - Implement template across all Chinese pages (index, research, skills, personal, blog, contact)
  - Ensure navigation and language switching remain functional on Chinese pages
  - Add appropriate "coming soon" messaging in Chinese
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_