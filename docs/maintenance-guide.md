# Website Maintenance and Extension Guide

## Overview

This guide provides instructions for maintaining and extending the academic website. The website has been simplified and optimized for easy maintenance while maintaining a professional academic appearance.

## Project Structure

```
website-root/
├── index.html              # English homepage (default)
├── research.html           # Research page
├── skills.html             # Skills page  
├── personal.html           # Personal page
├── faq.html               # FAQ/QAs page
├── contact.html           # Contact page
├── zh/
│   └── index.html         # Chinese homepage (simplified)
├── assets/
│   ├── css/
│   │   └── main.css       # Consolidated styles
│   ├── js/
│   │   └── main.js        # Essential JavaScript
│   └── images/            # Optimized images
├── docs/
│   └── maintenance-guide.md # This guide
└── .kiro/                 # Kiro configuration (do not modify)
```

## Design System

### Colors
- **Primary**: `#1e3a8a` (Academic deep blue)
- **Text**: `#1f2937` (Dark gray)
- **Text Light**: `#6b7280` (Light gray for secondary text)
- **Background**: `#ffffff` (Clean white)
- **Border**: `#e5e7eb` (Light border)
- **Accent**: `#dc2626` (Academic red for emphasis)

### Typography
- **Primary Font**: Inter, Source Sans Pro (body text)
- **Heading Font**: Crimson Text, Times New Roman (headings)

### Spacing
- Uses CSS custom properties for consistent spacing
- Scale: xs(0.5rem), sm(1rem), md(1.5rem), lg(2rem), xl(3rem), 2xl(4rem), 3xl(6rem)

## Common Maintenance Tasks

### 1. Updating Content

#### Editing Page Content
1. Open the relevant HTML file (e.g., `research.html`)
2. Find the `<main>` section
3. Edit content within the existing structure
4. Save the file

#### Adding New Research Projects
1. Open `research.html`
2. Find the `.project-grid` section
3. Copy an existing `.project-card` div
4. Update the content:
   ```html
   <div class="project-card">
       <h4>Project Title</h4>
       <p>Project description...</p>
       <div class="tags">
           <span class="tag">Tag1</span>
           <span class="tag">Tag2</span>
       </div>
   </div>
   ```

#### Adding New Skills
1. Open `skills.html`
2. Find the appropriate `.skills-category` section
3. Add new skill items:
   ```html
   <div class="skill-item">
       <div class="skill-name">Skill Name</div>
       <div class="skill-level">
           <div class="skill-progress" style="width: 80%"></div>
       </div>
   </div>
   ```

### 2. Navigation Updates

#### Adding New Pages
1. Create new HTML file in root directory
2. Copy structure from existing page
3. Update navigation in ALL pages:
   ```html
   <nav>
       <ul>
           <li><a href="index.html">Home</a></li>
           <li><a href="research.html">Research</a></li>
           <li><a href="skills.html">Skills</a></li>
           <li><a href="personal.html">Personal</a></li>
           <li><a href="faq.html">QAs</a></li>
           <li><a href="contact.html">Contact</a></li>
           <li><a href="new-page.html">New Page</a></li>
       </ul>
   </nav>
   ```

#### Updating Navigation Cards (Homepage)
1. Open `index.html`
2. Find the `.nav-cards` section
3. Update or add cards:
   ```html
   <a href="page.html" class="nav-card">
       <h3>Page Title</h3>
       <p>Brief description of the page content</p>
   </a>
   ```

### 3. Style Customization

#### Changing Colors
1. Open `assets/css/main.css`
2. Find the `:root` section at the top
3. Update CSS custom properties:
   ```css
   :root {
       --color-primary: #your-new-color;
       --color-accent: #your-accent-color;
   }
   ```

#### Adjusting Spacing
1. Modify spacing variables in `:root`:
   ```css
   :root {
       --space-lg: 2.5rem; /* Increase from 2rem */
   }
   ```

#### Adding New Component Styles
1. Add new styles at the end of `main.css` before responsive sections
2. Follow existing naming conventions
3. Use CSS custom properties for consistency

### 4. Adding Images

#### Optimizing Images
1. Resize images to appropriate dimensions
2. Compress images for web use
3. Save in `assets/images/` directory
4. Use descriptive filenames

#### Adding Images to Pages
```html
<img src="assets/images/your-image.jpg" alt="Descriptive alt text" />
```

### 5. FAQ Management

#### Adding New FAQ Items
1. Open `faq.html`
2. Find the appropriate `.faq-section`
3. Add new FAQ item:
   ```html
   <div class="faq-item">
       <button class="faq-question">
           Your question here?
           <span class="faq-icon">+</span>
       </button>
       <div class="faq-answer">
           <p>Your answer here.</p>
       </div>
   </div>
   ```

### 6. Chinese Version Updates

#### Updating Chinese Homepage
1. Open `zh/index.html`
2. Update content while maintaining the same structure
3. Keep navigation links pointing to English pages for now

#### Adding More Chinese Pages
1. Create new files in `zh/` directory
2. Copy structure from English versions
3. Translate content
4. Update navigation in Chinese pages

## Technical Notes

### CSS Architecture
- Single CSS file for better performance
- Uses CSS custom properties for theming
- Mobile-first responsive design
- Follows BEM-like naming conventions

### JavaScript Functionality
- Minimal JavaScript for better performance
- Progressive enhancement approach
- Accessible menu toggle
- FAQ expand/collapse functionality

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers
- Works without JavaScript

### Performance Considerations
- Single CSS and JS files reduce HTTP requests
- Optimized images
- Minimal external dependencies
- Clean, semantic HTML

## Troubleshooting

### Common Issues

#### Navigation Not Working
- Check that all navigation links are updated across all pages
- Ensure file names match exactly (case-sensitive)

#### Styles Not Applying
- Check CSS syntax for errors
- Ensure CSS custom properties are properly defined
- Clear browser cache

#### Mobile Menu Not Working
- Check that JavaScript is loading properly
- Ensure menu toggle button has correct classes
- Verify navigation structure matches expected format

#### FAQ Not Expanding
- Check JavaScript console for errors
- Ensure FAQ HTML structure is correct
- Verify button and answer elements have proper classes

### Getting Help
- Check browser developer tools for errors
- Validate HTML and CSS syntax
- Test in different browsers
- Review this guide for proper structure examples

## Best Practices

### Content Guidelines
- Keep text concise and scannable
- Use clear, descriptive headings
- Maintain consistent tone and style
- Update content regularly

### Code Guidelines
- Use semantic HTML elements
- Follow existing naming conventions
- Comment complex CSS or JavaScript
- Test changes in multiple browsers

### Accessibility
- Always include alt text for images
- Use proper heading hierarchy
- Ensure sufficient color contrast
- Test with keyboard navigation

### Performance
- Optimize images before uploading
- Minimize CSS and JavaScript changes
- Test page load speeds regularly
- Keep external dependencies minimal

## Future Enhancements

### Potential Improvements
- Add blog functionality
- Implement contact form processing
- Add search functionality
- Create admin interface for content management
- Add more interactive elements

### Expansion Considerations
- Consider static site generator for larger sites
- Implement content management system if needed
- Add analytics tracking
- Implement SEO optimizations
- Add multilingual support system

---

*Last updated: [Current Date]*
*For technical support, refer to the project documentation or contact the development team.*