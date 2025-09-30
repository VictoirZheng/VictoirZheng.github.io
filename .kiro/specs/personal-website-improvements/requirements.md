# Requirements Document

## Introduction

This specification outlines comprehensive improvements to a bilingual (Chinese/English) personal academic website. The project focuses on fixing language switching functionality, improving page layouts and designs, updating content structure, and creating a unified template system for Chinese pages. The website serves as an academic portfolio for a PhD applicant in computational psychology.

## Requirements

### Requirement 1: Language Switching Functionality

**User Story:** As a website visitor, I want the language switching buttons to work properly so that I can seamlessly navigate between Chinese and English content without manual page refreshes.

#### Acceptance Criteria

1. WHEN a user clicks the language toggle button THEN the page content SHALL refresh automatically to display the selected language version
2. WHEN a user switches languages THEN the URL SHALL update to reflect the new language path (e.g., /en/ or /zh/)
3. WHEN a user switches languages THEN the page SHALL load the corresponding content without requiring manual browser refresh
4. WHEN a user visits a page in one language THEN the language switcher SHALL correctly indicate the current language as active
5. IF a user switches from English to Chinese THEN they SHALL be redirected to the corresponding Chinese page with appropriate content

### Requirement 2: English Index Page Layout Improvements

**User Story:** As a website visitor viewing the English homepage, I want a clean and professional layout with proper visual hierarchy so that I can easily read and navigate the content.

#### Acceptance Criteria

1. WHEN viewing the introduction section THEN all elements SHALL be properly centered and aligned
2. WHEN viewing text content THEN colors SHALL remain consistent without unnecessary color variations
3. WHEN viewing text against backgrounds THEN there SHALL be sufficient contrast for readability (minimum WCAG AA compliance)
4. WHEN viewing the page THEN the "Research Impact & Academic Excellence" section SHALL be removed
5. WHEN viewing the page THEN the "Research Portfolio Highlights" section SHALL be removed  
6. WHEN viewing the page THEN the "Research Impact" section SHALL be removed
7. WHEN viewing the page THEN "Explore My Academic Journey" SHALL be converted into a navigation section with links to other pages
8. WHEN viewing the footer THEN it SHALL match the design from the contact page
9. WHEN viewing any page footer THEN it SHALL display "© 2025 Victoir Zheng All rights reserved" and credit both HTML5 UP and Kiro for design

### Requirement 3: Research Page Design Update

**User Story:** As a website visitor, I want the research page to use the legacy design template so that it has a consistent and professional appearance.

#### Acceptance Criteria

1. WHEN accessing the research page THEN it SHALL use the design and layout from legacy/root-pages/research.html
2. WHEN viewing the research page THEN all existing content SHALL be preserved and properly formatted
3. WHEN viewing the research page THEN the navigation and header SHALL remain consistent with other pages
4. WHEN viewing the research page THEN all interactive elements SHALL function properly

### Requirement 4: QAs Page Content Cleanup

**User Story:** As a website visitor viewing the QAs page, I want to see only relevant and meaningful filter categories so that I can efficiently find the information I need.

#### Acceptance Criteria

1. WHEN viewing the QAs page THEN the following filter tags SHALL be removed: "Research Motivation", "PhD Application", "Future Plans", "Personal"
2. WHEN viewing the QAs page THEN only meaningful and useful filter categories SHALL remain
3. WHEN viewing the QAs page THEN the content organization SHALL remain logical and accessible
4. WHEN filtering questions THEN the remaining categories SHALL function properly

### Requirement 5: Chinese Pages Template System

**User Story:** As a website visitor accessing Chinese pages, I want to see a consistent "coming soon" template so that I understand the current status of the Chinese content.

#### Acceptance Criteria

1. WHEN accessing any Chinese page THEN it SHALL display a unified, consistent template design
2. WHEN viewing Chinese pages THEN they SHALL show "coming soon" or similar placeholder messaging
3. WHEN viewing Chinese pages THEN the template SHALL maintain visual consistency with the overall website design
4. WHEN viewing Chinese pages THEN the navigation and language switching SHALL remain functional
5. WHEN viewing Chinese pages THEN no specific content SHALL be filled in, only placeholder structure
6. WHEN viewing Chinese pages THEN the design SHALL be professional and cohesive across all Chinese pages

### Requirement 6: Footer Standardization

**User Story:** As a website visitor, I want all pages to have consistent footer design and content so that the website maintains professional uniformity.

#### Acceptance Criteria

1. WHEN viewing any website page THEN the footer SHALL match the contact page footer design
2. WHEN viewing any footer THEN it SHALL display "© 2025 Victoir Zheng All rights reserved"
3. WHEN viewing any footer THEN it SHALL credit "Design: HTML5 UP" and "Kiro" 
4. WHEN viewing any footer THEN the styling and layout SHALL be consistent across all pages
5. WHEN viewing any footer THEN all links and elements SHALL function properly