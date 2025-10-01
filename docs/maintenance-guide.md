# 网站维护和扩展指南 / Website Maintenance and Extension Guide

## 概述 / Overview

本指南提供了维护和扩展学术网站的详细说明。网站已经过简化和优化，便于维护，同时保持专业的学术外观。

This comprehensive guide provides detailed instructions for maintaining and extending the academic website. The website has been simplified and redesigned for easy maintenance while maintaining a professional academic appearance.

## 快速开始 / Quick Start

### 基本修改流程 / Basic Modification Process
1. **备份当前版本** / Backup current version
2. **进行修改** / Make changes  
3. **测试功能** / Test functionality
4. **验证显示效果** / Verify display
5. **部署更新** / Deploy updates

### 紧急修复 / Emergency Fixes
- **页面无法访问**: 检查文件名和路径
- **样式丢失**: 检查CSS文件路径和语法
- **导航失效**: 验证所有页面的导航链接

## 项目结构 / Project Structure

### 文件组织架构 / File Organization Architecture

```
website-root/
├── index.html              # 英文首页 (默认) / English homepage (default)
├── research.html           # 研究页面 / Research page
├── skills.html             # 技能页面 / Skills page  
├── personal.html           # 个人页面 / Personal page
├── faq.html               # 问答页面 / FAQ/QAs page
├── contact.html           # 联系页面 / Contact page
├── zh/                     # 中文版本目录 / Chinese version directory
│   └── index.html         # 中文首页 (简化版) / Chinese homepage (simplified)
├── assets/                 # 资源文件夹 / Assets folder
│   ├── css/
│   │   └── main.css       # 合并样式文件 / Consolidated styles
│   ├── js/
│   │   └── main.js        # 核心JavaScript / Essential JavaScript
│   └── images/            # 优化图片 / Optimized images
├── docs/                   # 文档目录 / Documentation directory
│   └── maintenance-guide.md # 本指南 / This guide
└── .kiro/                 # Kiro配置 (请勿修改) / Kiro config (do not modify)
```

### 文件职责说明 / File Responsibilities

#### 核心页面文件 / Core Page Files
- **index.html**: 网站入口，包含导航卡片和主要行动按钮
- **research.html**: 展示研究项目、论文发表和研究技能
- **skills.html**: 技术技能分类和水平展示
- **personal.html**: 个人兴趣、教学经验和理念
- **faq.html**: 常见问题的可展开式问答
- **contact.html**: 联系信息和联系表单

#### 资源文件 / Asset Files
- **main.css**: 包含所有样式规则，使用CSS变量系统
- **main.js**: 最小化JavaScript，仅包含必要交互功能
- **images/**: 存放所有优化后的图片资源

#### 特殊目录 / Special Directories
- **zh/**: 中文版本页面，目前仅包含简化首页
- **docs/**: 项目文档和维护指南
- **.kiro/**: 开发工具配置，正常维护时无需修改

## 设计系统 / Design System

### 学术风格设计原则 / Academic Style Design Principles

#### 核心理念 / Core Philosophy
- **学术专业性**: 体现严谨和专业的学术环境
- **内容精炼**: 信息简洁明了，避免冗余
- **易于维护**: 代码结构清晰，便于修改扩展
- **视觉一致**: 所有页面保持统一的设计风格

### 色彩系统 / Color System

#### 主色调 / Primary Colors
```css
:root {
  --color-primary: #1e3a8a;    /* 学术深蓝 / Academic deep blue */
  --color-accent: #dc2626;     /* 学术红色强调 / Academic red accent */
}
```

#### 文本色彩 / Text Colors
```css
:root {
  --color-text: #1f2937;       /* 主文本深灰 / Primary text dark gray */
  --color-text-light: #6b7280; /* 辅助文本浅灰 / Secondary text light gray */
  --color-text-muted: #9ca3af; /* 弱化文本 / Muted text */
}
```

#### 背景和边框 / Background and Borders
```css
:root {
  --color-background: #ffffff;  /* 纯净白色背景 / Clean white background */
  --color-background-light: #f9fafb; /* 浅色背景 / Light background */
  --color-border: #e5e7eb;      /* 浅色边框 / Light border */
  --color-border-dark: #d1d5db; /* 深色边框 / Dark border */
}
```

### 字体系统 / Typography System

#### 字体族 / Font Families
```css
:root {
  /* 主字体：清晰易读的无衬线字体 / Primary font: Clear sans-serif */
  --font-primary: 'Inter', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* 标题字体：优雅的衬线字体 / Heading font: Elegant serif */
  --font-heading: 'Crimson Text', 'Times New Roman', Georgia, serif;
  
  /* 代码字体：等宽字体 / Code font: Monospace */
  --font-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;
}
```

#### 字体大小层级 / Font Size Scale
```css
:root {
  --text-xs: 0.75rem;   /* 12px - 小标签 / Small labels */
  --text-sm: 0.875rem;  /* 14px - 辅助文本 / Secondary text */
  --text-base: 1rem;    /* 16px - 正文 / Body text */
  --text-lg: 1.125rem;  /* 18px - 大正文 / Large body */
  --text-xl: 1.25rem;   /* 20px - 小标题 / Small headings */
  --text-2xl: 1.5rem;   /* 24px - 中标题 / Medium headings */
  --text-3xl: 2rem;     /* 32px - 大标题 / Large headings */
  --text-4xl: 2.5rem;   /* 40px - 特大标题 / Extra large headings */
}
```

### 间距系统 / Spacing System

#### 间距变量 / Spacing Variables
```css
:root {
  --space-xs: 0.5rem;   /* 8px - 最小间距 / Minimal spacing */
  --space-sm: 1rem;     /* 16px - 小间距 / Small spacing */
  --space-md: 1.5rem;   /* 24px - 中等间距 / Medium spacing */
  --space-lg: 2rem;     /* 32px - 大间距 / Large spacing */
  --space-xl: 3rem;     /* 48px - 特大间距 / Extra large spacing */
  --space-2xl: 4rem;    /* 64px - 超大间距 / Super large spacing */
  --space-3xl: 6rem;    /* 96px - 巨大间距 / Huge spacing */
}
```

#### 使用指南 / Usage Guidelines
- **xs**: 元素内部小间距，如按钮内边距
- **sm**: 相关元素间距，如列表项间距
- **md**: 段落间距，卡片内边距
- **lg**: 区域间距，页面区块间距
- **xl**: 页面主要区域间距
- **2xl**: 页面顶部和底部间距
- **3xl**: 特殊场景的大间距

## 常见维护任务 / Common Maintenance Tasks

### 1. 内容更新 / Content Updates

#### 编辑页面内容 / Editing Page Content

**基本步骤 / Basic Steps:**
1. 打开相关HTML文件 (如 `research.html`) / Open relevant HTML file
2. 找到 `<main>` 区域 / Find the `<main>` section
3. 在现有结构内编辑内容 / Edit content within existing structure
4. 保存文件 / Save the file
5. 在浏览器中测试 / Test in browser

**注意事项 / Important Notes:**
- 保持HTML标签结构完整 / Keep HTML tag structure intact
- 使用语义化的HTML元素 / Use semantic HTML elements
- 确保所有标签正确闭合 / Ensure all tags are properly closed

#### 添加新研究项目 / Adding New Research Projects

**详细步骤 / Detailed Steps:**
1. 打开 `research.html` / Open `research.html`
2. 找到 `.project-grid` 区域 / Find the `.project-grid` section
3. 复制现有的 `.project-card` 结构 / Copy existing `.project-card` structure
4. 更新项目内容 / Update project content:

```html
<div class="project-card">
    <h4>项目标题 / Project Title</h4>
    <p class="project-description">
        项目描述，保持简洁明了...
        Project description, keep it concise and clear...
    </p>
    <div class="project-details">
        <span class="project-date">2024</span>
        <span class="project-status">进行中 / Ongoing</span>
    </div>
    <div class="tags">
        <span class="tag">标签1 / Tag1</span>
        <span class="tag">标签2 / Tag2</span>
        <span class="tag">标签3 / Tag3</span>
    </div>
    <div class="project-links">
        <a href="#" class="btn-link">查看详情 / View Details</a>
        <a href="#" class="btn-link">GitHub</a>
    </div>
</div>
```

**项目卡片最佳实践 / Project Card Best Practices:**
- 标题控制在1-2行内 / Keep title within 1-2 lines
- 描述不超过3句话 / Description no more than 3 sentences
- 标签数量控制在3-5个 / Limit tags to 3-5 items
- 链接只包含最重要的2-3个 / Include only 2-3 most important links

#### 添加新技能 / Adding New Skills

**技能分类结构 / Skill Category Structure:**
1. 打开 `skills.html` / Open `skills.html`
2. 找到合适的 `.skills-category` 区域 / Find appropriate `.skills-category` section
3. 添加新技能项目 / Add new skill items:

```html
<div class="skills-category">
    <h3>技能分类名称 / Skill Category Name</h3>
    <div class="skills-list">
        <div class="skill-item">
            <div class="skill-header">
                <span class="skill-name">技能名称 / Skill Name</span>
                <span class="skill-level-text">熟练 / Proficient</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" style="width: 85%"></div>
            </div>
            <p class="skill-description">
                简短的技能描述或应用场景...
                Brief skill description or application scenarios...
            </p>
        </div>
    </div>
</div>
```

**技能水平指南 / Skill Level Guidelines:**
- **初学者 / Beginner**: 20-40% (基础了解 / Basic understanding)
- **中级 / Intermediate**: 50-70% (能够应用 / Can apply)
- **熟练 / Proficient**: 75-85% (熟练使用 / Proficient use)
- **专家 / Expert**: 90-95% (深度掌握 / Deep mastery)
- **大师 / Master**: 100% (行业领先 / Industry leading)

#### 更新个人信息 / Updating Personal Information

**个人页面结构 / Personal Page Structure:**
```html
<section class="personal-section">
    <h3>区域标题 / Section Title</h3>
    <div class="personal-content">
        <div class="personal-item">
            <h4>项目标题 / Item Title</h4>
            <p>详细描述... / Detailed description...</p>
            <ul class="personal-list">
                <li>要点1 / Point 1</li>
                <li>要点2 / Point 2</li>
            </ul>
        </div>
    </div>
</section>
```

#### 管理FAQ内容 / Managing FAQ Content

**添加新FAQ项目 / Adding New FAQ Items:**
1. 打开 `faq.html` / Open `faq.html`
2. 找到合适的 `.faq-section` / Find appropriate `.faq-section`
3. 添加新的FAQ项目 / Add new FAQ item:

```html
<div class="faq-item">
    <button class="faq-question" aria-expanded="false">
        <span class="question-text">
            您的问题在这里？/ Your question here?
        </span>
        <span class="faq-icon" aria-hidden="true">+</span>
    </button>
    <div class="faq-answer" aria-hidden="true">
        <div class="answer-content">
            <p>详细的回答内容... / Detailed answer content...</p>
            <ul>
                <li>要点1 / Point 1</li>
                <li>要点2 / Point 2</li>
            </ul>
        </div>
    </div>
</div>
```

**FAQ组织原则 / FAQ Organization Principles:**
- 按主题分组 / Group by topics
- 常见问题优先 / Prioritize common questions
- 答案简洁明了 / Keep answers concise and clear
- 提供相关链接 / Provide relevant links

### 2. 导航系统更新 / Navigation System Updates

#### 添加新页面 / Adding New Pages

**完整流程 / Complete Process:**

1. **创建新页面文件 / Create New Page File**
   ```bash
   # 在根目录创建新HTML文件 / Create new HTML file in root directory
   cp research.html new-page.html
   ```

2. **复制页面结构 / Copy Page Structure**
   - 使用现有页面作为模板 / Use existing page as template
   - 保持头部和导航结构 / Keep header and navigation structure
   - 更新页面标题和内容 / Update page title and content

3. **更新所有页面的导航 / Update Navigation in ALL Pages**
   
   **重要提醒**: 必须在每个页面中更新导航！/ **Important**: Must update navigation in every page!
   
   ```html
   <nav class="main-nav">
       <ul class="nav-list">
           <li><a href="index.html" class="nav-link">首页 / Home</a></li>
           <li><a href="research.html" class="nav-link">研究 / Research</a></li>
           <li><a href="skills.html" class="nav-link">技能 / Skills</a></li>
           <li><a href="personal.html" class="nav-link">个人 / Personal</a></li>
           <li><a href="faq.html" class="nav-link">问答 / QAs</a></li>
           <li><a href="contact.html" class="nav-link">联系 / Contact</a></li>
           <li><a href="new-page.html" class="nav-link">新页面 / New Page</a></li>
       </ul>
       <div class="nav-language">
           <a href="zh/index.html" class="lang-link">中文</a>
       </div>
   </nav>
   ```

4. **需要更新导航的文件列表 / Files That Need Navigation Updates:**
   - `index.html`
   - `research.html`
   - `skills.html`
   - `personal.html`
   - `faq.html`
   - `contact.html`
   - `zh/index.html` (如果适用 / if applicable)

#### 更新首页导航卡片 / Updating Homepage Navigation Cards

**导航卡片结构 / Navigation Card Structure:**
1. 打开 `index.html` / Open `index.html`
2. 找到 `.nav-cards` 区域 / Find the `.nav-cards` section
3. 更新或添加卡片 / Update or add cards:

```html
<div class="nav-cards">
    <a href="research.html" class="nav-card">
        <div class="card-icon">
            <svg><!-- 图标SVG / Icon SVG --></svg>
        </div>
        <h3 class="card-title">研究 / Research</h3>
        <p class="card-description">
            查看我的研究项目和学术成果...
            View my research projects and academic achievements...
        </p>
        <span class="card-arrow">→</span>
    </a>
    
    <a href="new-page.html" class="nav-card">
        <div class="card-icon">
            <svg><!-- 新页面图标 / New page icon --></svg>
        </div>
        <h3 class="card-title">新页面 / New Page</h3>
        <p class="card-description">
            新页面的简短描述...
            Brief description of the new page...
        </p>
        <span class="card-arrow">→</span>
    </a>
</div>
```

**导航卡片设计原则 / Navigation Card Design Principles:**
- 每个卡片包含图标、标题、描述和箭头 / Each card includes icon, title, description, and arrow
- 描述控制在1-2句话内 / Keep description within 1-2 sentences
- 使用一致的图标风格 / Use consistent icon style
- 保持卡片大小一致 / Maintain consistent card sizes

#### 设置当前页面高亮 / Setting Current Page Highlight

**自动高亮当前页面 / Auto-highlight Current Page:**
```html
<!-- 在每个页面的导航中添加 'current' 类 / Add 'current' class in each page's navigation -->
<nav class="main-nav">
    <ul class="nav-list">
        <li><a href="index.html" class="nav-link">首页 / Home</a></li>
        <li><a href="research.html" class="nav-link current">研究 / Research</a></li>
        <!-- 其他导航项... / Other nav items... -->
    </ul>
</nav>
```

**CSS样式支持 / CSS Style Support:**
```css
.nav-link.current {
    color: var(--color-primary);
    font-weight: 600;
    position: relative;
}

.nav-link.current::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color-primary);
}
```

### 3. 样式定制 / Style Customization

#### 更改颜色方案 / Changing Color Scheme

**基本颜色修改 / Basic Color Modifications:**
1. 打开 `assets/css/main.css` / Open `assets/css/main.css`
2. 找到文件顶部的 `:root` 区域 / Find the `:root` section at the top
3. 更新CSS自定义属性 / Update CSS custom properties:

```css
:root {
    /* 主色调修改 / Primary color modifications */
    --color-primary: #1e40af;      /* 新的主色 / New primary color */
    --color-accent: #ef4444;       /* 新的强调色 / New accent color */
    
    /* 文本颜色调整 / Text color adjustments */
    --color-text: #111827;         /* 更深的文本色 / Darker text */
    --color-text-light: #6b7280;   /* 保持不变 / Keep unchanged */
    
    /* 背景色变化 / Background color changes */
    --color-background: #ffffff;    /* 纯白背景 / Pure white */
    --color-background-light: #f8fafc; /* 浅色背景 / Light background */
}
```

**颜色选择建议 / Color Selection Guidelines:**
- **学术蓝色系**: `#1e3a8a`, `#1e40af`, `#2563eb` / Academic blues
- **专业灰色系**: `#374151`, `#4b5563`, `#6b7280` / Professional grays  
- **强调红色系**: `#dc2626`, `#ef4444`, `#f87171` / Accent reds
- **成功绿色系**: `#059669`, `#10b981`, `#34d399` / Success greens

**颜色对比度检查 / Color Contrast Check:**
- 确保文本和背景对比度至少4.5:1 / Ensure text-background contrast ratio at least 4.5:1
- 使用在线工具检查可访问性 / Use online tools to check accessibility
- 测试不同设备和屏幕上的显示效果 / Test display on different devices and screens

#### 调整间距系统 / Adjusting Spacing System

**间距变量修改 / Spacing Variable Modifications:**
```css
:root {
    /* 基础间距调整 / Basic spacing adjustments */
    --space-xs: 0.25rem;   /* 减小最小间距 / Reduce minimal spacing */
    --space-sm: 0.75rem;   /* 调整小间距 / Adjust small spacing */
    --space-md: 1.25rem;   /* 调整中等间距 / Adjust medium spacing */
    --space-lg: 2.5rem;    /* 增加大间距 / Increase large spacing */
    --space-xl: 4rem;      /* 增加特大间距 / Increase extra large spacing */
    
    /* 特殊用途间距 / Special purpose spacing */
    --header-height: 4rem;  /* 页头高度 / Header height */
    --footer-height: 3rem;  /* 页脚高度 / Footer height */
    --content-max-width: 1200px; /* 内容最大宽度 / Content max width */
}
```

**间距应用示例 / Spacing Application Examples:**
```css
/* 页面区域间距 / Page section spacing */
.page-section {
    margin-bottom: var(--space-xl);
    padding: var(--space-lg) var(--space-md);
}

/* 卡片内部间距 / Card internal spacing */
.card {
    padding: var(--space-md);
    margin-bottom: var(--space-lg);
}

/* 文本元素间距 / Text element spacing */
h2 {
    margin-bottom: var(--space-md);
}

p {
    margin-bottom: var(--space-sm);
}
```

#### 添加新组件样式 / Adding New Component Styles

**组件样式结构 / Component Style Structure:**
1. 在 `main.css` 文件末尾添加新样式 / Add new styles at the end of `main.css`
2. 在响应式媒体查询之前 / Before responsive media queries
3. 遵循现有命名约定 / Follow existing naming conventions
4. 使用CSS自定义属性保持一致性 / Use CSS custom properties for consistency

**新组件样式模板 / New Component Style Template:**
```css
/* ================================
   新组件名称 / New Component Name
   ================================ */

.new-component {
    /* 布局属性 / Layout properties */
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    
    /* 尺寸属性 / Size properties */
    width: 100%;
    max-width: var(--content-max-width);
    
    /* 间距属性 / Spacing properties */
    padding: var(--space-lg);
    margin: var(--space-xl) auto;
    
    /* 视觉属性 / Visual properties */
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    /* 过渡效果 / Transition effects */
    transition: all 0.3s ease;
}

.new-component:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

.new-component__title {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    color: var(--color-primary);
    margin-bottom: var(--space-sm);
}

.new-component__content {
    font-family: var(--font-primary);
    font-size: var(--text-base);
    color: var(--color-text);
    line-height: 1.6;
}

/* 响应式设计 / Responsive design */
@media (max-width: 768px) {
    .new-component {
        padding: var(--space-md);
        margin: var(--space-lg) var(--space-sm);
    }
    
    .new-component__title {
        font-size: var(--text-lg);
    }
}
```

#### 字体定制 / Font Customization

**更换字体系统 / Changing Font System:**
```css
:root {
    /* 引入新字体 / Import new fonts */
    --font-primary: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    --font-heading: 'Playfair Display', 'Georgia', serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}

/* 字体加载优化 / Font loading optimization */
@font-face {
    font-family: 'Roboto';
    src: url('path/to/roboto.woff2') format('woff2');
    font-display: swap; /* 优化字体加载 / Optimize font loading */
}
```

**字体大小调整 / Font Size Adjustments:**
```css
:root {
    /* 调整字体大小比例 / Adjust font size scale */
    --text-scale: 1.125; /* 大字体比例 / Large font scale */
    
    --text-xs: calc(0.75rem * var(--text-scale));
    --text-sm: calc(0.875rem * var(--text-scale));
    --text-base: calc(1rem * var(--text-scale));
    --text-lg: calc(1.125rem * var(--text-scale));
}
```

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

## 故障排除和调试 / Troubleshooting and Debugging

### 常见问题解决 / Common Issue Solutions

#### 导航功能失效 / Navigation Not Working

**问题症状 / Problem Symptoms:**
- 点击导航链接无响应 / Navigation links not responding
- 页面跳转到错误位置 / Page jumping to wrong location
- 导航高亮显示错误 / Navigation highlighting incorrectly

**解决步骤 / Solution Steps:**
1. **检查文件路径 / Check File Paths:**
   ```bash
   # 验证所有HTML文件是否存在 / Verify all HTML files exist
   ls -la *.html
   ls -la zh/*.html
   ```

2. **检查链接语法 / Check Link Syntax:**
   ```html
   <!-- 正确格式 / Correct format -->
   <a href="research.html" class="nav-link">Research</a>
   
   <!-- 错误格式 / Incorrect format -->
   <a href="Research.html" class="nav-link">Research</a> <!-- 大小写错误 / Case error -->
   <a href="research" class="nav-link">Research</a>      <!-- 缺少扩展名 / Missing extension -->
   ```

3. **验证所有页面的导航更新 / Verify Navigation Updates in All Pages:**
   ```bash
   # 搜索所有导航链接 / Search all navigation links
   grep -n "nav-link" *.html zh/*.html
   ```

#### 样式不生效 / Styles Not Applying

**问题诊断 / Problem Diagnosis:**
1. **检查CSS文件加载 / Check CSS File Loading:**
   ```html
   <!-- 确保CSS链接正确 / Ensure CSS link is correct -->
   <link rel="stylesheet" href="assets/css/main.css">
   ```

2. **验证CSS语法 / Validate CSS Syntax:**
   ```bash
   # 使用在线CSS验证器或浏览器开发工具 / Use online CSS validator or browser dev tools
   # 检查控制台是否有CSS错误 / Check console for CSS errors
   ```

3. **清除浏览器缓存 / Clear Browser Cache:**
   - Chrome: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
   - Firefox: Ctrl+F5 (Windows) / Cmd+Shift+R (Mac)
   - Safari: Cmd+Option+R

4. **检查CSS变量定义 / Check CSS Variable Definitions:**
   ```css
   /* 确保变量在 :root 中正确定义 / Ensure variables are correctly defined in :root */
   :root {
       --color-primary: #1e3a8a; /* 不要忘记分号 / Don't forget semicolon */
   }
   ```

#### 移动端菜单失效 / Mobile Menu Not Working

**调试步骤 / Debugging Steps:**
1. **检查JavaScript加载 / Check JavaScript Loading:**
   ```html
   <!-- 确保JS文件路径正确 / Ensure JS file path is correct -->
   <script src="assets/js/main.js"></script>
   ```

2. **验证HTML结构 / Verify HTML Structure:**
   ```html
   <button class="menu-toggle" aria-label="Toggle menu">
       <span class="hamburger"></span>
   </button>
   <nav class="main-nav" id="main-nav">
       <!-- 导航内容 / Navigation content -->
   </nav>
   ```

3. **检查JavaScript控制台 / Check JavaScript Console:**
   - 打开浏览器开发工具 / Open browser dev tools
   - 查看Console标签页的错误信息 / Check Console tab for error messages
   - 确保没有JavaScript语法错误 / Ensure no JavaScript syntax errors

#### FAQ展开功能失效 / FAQ Not Expanding

**问题排查 / Problem Investigation:**
1. **验证HTML结构 / Verify HTML Structure:**
   ```html
   <div class="faq-item">
       <button class="faq-question" aria-expanded="false">
           问题文本 / Question text
           <span class="faq-icon">+</span>
       </button>
       <div class="faq-answer" aria-hidden="true">
           答案内容 / Answer content
       </div>
   </div>
   ```

2. **检查JavaScript事件绑定 / Check JavaScript Event Binding:**
   ```javascript
   // 确保FAQ按钮事件正确绑定 / Ensure FAQ button events are correctly bound
   document.querySelectorAll('.faq-question').forEach(button => {
       button.addEventListener('click', toggleFAQ);
   });
   ```

3. **验证CSS样式 / Verify CSS Styles:**
   ```css
   .faq-answer {
       display: none;
       padding: var(--space-md);
       border-top: 1px solid var(--color-border);
       background: var(--color-background);
   }
   
   .faq-answer.active {
       display: block;
   }
   ```

4. **常见FAQ样式问题 / Common FAQ Style Issues:**
   - **文字不可见问题**: 检查是否有重复的CSS规则导致背景色冲突
   - **Hover效果异常**: 确保只有一个`.faq-question:hover`规则
   - **图标不旋转**: 验证`.faq-icon`的transform属性

### 高级调试技巧 / Advanced Debugging Techniques

#### 使用浏览器开发工具 / Using Browser Developer Tools

**Elements面板 / Elements Panel:**
- 检查HTML结构和CSS样式 / Inspect HTML structure and CSS styles
- 实时修改样式进行测试 / Modify styles in real-time for testing
- 查看元素的计算样式 / View computed styles of elements

**Console面板 / Console Panel:**
- 查看JavaScript错误和警告 / View JavaScript errors and warnings
- 执行JavaScript代码进行调试 / Execute JavaScript code for debugging
- 监控网络请求和资源加载 / Monitor network requests and resource loading

**Network面板 / Network Panel:**
- 检查CSS和JS文件是否正确加载 / Check if CSS and JS files load correctly
- 查看文件加载时间和大小 / View file loading time and size
- 识别404错误和资源问题 / Identify 404 errors and resource issues

#### 代码验证工具 / Code Validation Tools

**HTML验证 / HTML Validation:**
```bash
# 使用W3C HTML验证器 / Use W3C HTML Validator
# https://validator.w3.org/
```

**CSS验证 / CSS Validation:**
```bash
# 使用W3C CSS验证器 / Use W3C CSS Validator
# https://jigsaw.w3.org/css-validator/
```

**可访问性检查 / Accessibility Check:**
```bash
# 使用WAVE工具 / Use WAVE tool
# https://wave.webaim.org/
```

### 性能优化调试 / Performance Optimization Debugging

#### 页面加载速度 / Page Loading Speed

**检查项目 / Check Items:**
1. 图片大小和格式优化 / Image size and format optimization
2. CSS和JS文件压缩 / CSS and JS file compression
3. 字体加载优化 / Font loading optimization
4. 减少HTTP请求数量 / Reduce number of HTTP requests

**优化工具 / Optimization Tools:**
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

#### 移动端性能 / Mobile Performance

**测试方法 / Testing Methods:**
1. 使用浏览器移动端模拟器 / Use browser mobile simulator
2. 在真实设备上测试 / Test on real devices
3. 检查触摸交互响应 / Check touch interaction response
4. 验证响应式布局 / Verify responsive layout

### 获取帮助 / Getting Help

#### 自助解决步骤 / Self-Help Steps
1. **查看浏览器开发工具错误信息** / Check browser dev tools error messages
2. **验证HTML和CSS语法** / Validate HTML and CSS syntax
3. **在多个浏览器中测试** / Test in multiple browsers
4. **参考本指南的结构示例** / Review structure examples in this guide
5. **检查文件权限和路径** / Check file permissions and paths

#### 寻求技术支持 / Seeking Technical Support
- 准备详细的错误描述和截图 / Prepare detailed error description and screenshots
- 提供浏览器和操作系统信息 / Provide browser and OS information
- 包含相关的代码片段 / Include relevant code snippets
- 说明重现问题的步骤 / Describe steps to reproduce the issue

## 最佳实践指南 / Best Practices Guide

### 内容管理最佳实践 / Content Management Best Practices

#### 内容编写原则 / Content Writing Principles

**文本内容指南 / Text Content Guidelines:**
- **简洁明了** / Keep text concise and scannable
  - 每段不超过3-4句话 / No more than 3-4 sentences per paragraph
  - 使用要点列表提高可读性 / Use bullet points for better readability
  - 避免冗长的技术术语解释 / Avoid lengthy technical explanations

- **标题层次清晰** / Use clear, descriptive headings
  ```html
  <h1>页面主标题 / Page Main Title</h1>
  <h2>主要区域标题 / Major Section Title</h2>
  <h3>子区域标题 / Subsection Title</h3>
  <h4>具体项目标题 / Specific Item Title</h4>
  ```

- **保持一致的语调和风格** / Maintain consistent tone and style
  - 学术专业但不过于正式 / Academic professional but not overly formal
  - 双语内容保持对等 / Bilingual content should be equivalent
  - 使用主动语态 / Use active voice

- **定期更新内容** / Update content regularly
  - 至少每季度检查一次 / Review at least quarterly
  - 及时更新过时信息 / Update outdated information promptly
  - 添加新的研究成果和技能 / Add new research achievements and skills

#### 图片和媒体管理 / Image and Media Management

**图片优化标准 / Image Optimization Standards:**
```html
<!-- 标准图片格式 / Standard image format -->
<img src="assets/images/project-screenshot.jpg" 
     alt="项目界面截图显示用户仪表板 / Project interface screenshot showing user dashboard"
     width="800" 
     height="600"
     loading="lazy">
```

**图片文件命名规范 / Image File Naming Convention:**
- 使用描述性文件名 / Use descriptive filenames
- 小写字母和连字符 / Lowercase letters and hyphens
- 包含尺寸信息（如需要）/ Include size info if needed
- 示例：`research-project-ai-800x600.jpg`

**图片尺寸建议 / Recommended Image Sizes:**
- 项目截图：800x600px 或 1200x900px / Project screenshots: 800x600px or 1200x900px
- 个人照片：400x400px (正方形) / Profile photos: 400x400px (square)
- 图标：64x64px 或 SVG格式 / Icons: 64x64px or SVG format
- 背景图片：1920x1080px / Background images: 1920x1080px

### 代码开发最佳实践 / Code Development Best Practices

#### HTML编写规范 / HTML Writing Standards

**语义化HTML / Semantic HTML:**
```html
<!-- 推荐的语义化结构 / Recommended semantic structure -->
<article class="research-project">
    <header class="project-header">
        <h3 class="project-title">项目标题 / Project Title</h3>
        <time class="project-date" datetime="2024-01">2024年1月 / January 2024</time>
    </header>
    
    <section class="project-content">
        <p class="project-description">项目描述... / Project description...</p>
    </section>
    
    <footer class="project-footer">
        <div class="project-tags">
            <span class="tag">Python</span>
            <span class="tag">Machine Learning</span>
        </div>
    </footer>
</article>
```

**可访问性属性 / Accessibility Attributes:**
```html
<!-- ARIA标签和可访问性 / ARIA labels and accessibility -->
<button class="menu-toggle" 
        aria-label="打开导航菜单 / Open navigation menu"
        aria-expanded="false"
        aria-controls="main-nav">
    <span class="sr-only">菜单 / Menu</span>
</button>

<nav id="main-nav" aria-label="主导航 / Main navigation">
    <!-- 导航内容 / Navigation content -->
</nav>
```

#### CSS编写规范 / CSS Writing Standards

**命名约定 / Naming Conventions:**
```css
/* BEM方法论 / BEM methodology */
.component-name { }           /* 块 / Block */
.component-name__element { }  /* 元素 / Element */
.component-name--modifier { } /* 修饰符 / Modifier */

/* 实际示例 / Actual examples */
.project-card { }
.project-card__title { }
.project-card__description { }
.project-card--featured { }
```

**CSS组织结构 / CSS Organization Structure:**
```css
/* 1. CSS重置和基础样式 / CSS reset and base styles */
/* 2. CSS变量定义 / CSS variable definitions */
/* 3. 字体和排版 / Typography */
/* 4. 布局系统 / Layout system */
/* 5. 组件样式 / Component styles */
/* 6. 工具类 / Utility classes */
/* 7. 响应式媒体查询 / Responsive media queries */
```

**注释规范 / Comment Standards:**
```css
/* ================================
   组件名称 / Component Name
   ================================ */

.component {
    /* 布局属性 / Layout properties */
    display: flex;
    
    /* 视觉属性 / Visual properties */
    background: var(--color-background);
    
    /* 交互属性 / Interactive properties */
    transition: all 0.3s ease;
}

/* 特殊情况说明 / Special case explanation */
.component--special {
    /* 解释为什么需要这个特殊样式 / Explain why this special style is needed */
    z-index: 999;
}
```

#### JavaScript编写规范 / JavaScript Writing Standards

**代码结构 / Code Structure:**
```javascript
// 立即执行函数表达式 / Immediately Invoked Function Expression
(function() {
    'use strict';
    
    // 常量定义 / Constants definition
    const SELECTORS = {
        menuToggle: '.menu-toggle',
        mainNav: '.main-nav',
        faqQuestion: '.faq-question'
    };
    
    // 初始化函数 / Initialization function
    function init() {
        setupNavigation();
        setupFAQ();
    }
    
    // 导航功能 / Navigation functionality
    function setupNavigation() {
        const menuToggle = document.querySelector(SELECTORS.menuToggle);
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMenu);
        }
    }
    
    // 页面加载完成后初始化 / Initialize after page load
    document.addEventListener('DOMContentLoaded', init);
})();
```

### 可访问性最佳实践 / Accessibility Best Practices

#### 基本可访问性要求 / Basic Accessibility Requirements

**图片可访问性 / Image Accessibility:**
```html
<!-- 内容图片 / Content images -->
<img src="research-diagram.jpg" 
     alt="研究流程图显示数据收集、分析和结果三个阶段 / Research flowchart showing three stages: data collection, analysis, and results">

<!-- 装饰性图片 / Decorative images -->
<img src="decorative-pattern.jpg" alt="" role="presentation">

<!-- 复杂图表 / Complex charts -->
<img src="data-chart.jpg" 
     alt="2024年研究进展图表 / 2024 research progress chart"
     longdesc="chart-description.html">
```

**表单可访问性 / Form Accessibility:**
```html
<form class="contact-form">
    <div class="form-group">
        <label for="name">姓名 / Name *</label>
        <input type="text" 
               id="name" 
               name="name" 
               required 
               aria-describedby="name-help">
        <div id="name-help" class="form-help">
            请输入您的真实姓名 / Please enter your real name
        </div>
    </div>
</form>
```

**键盘导航支持 / Keyboard Navigation Support:**
```css
/* 焦点样式 / Focus styles */
.nav-link:focus,
.btn:focus,
.form-input:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}

/* 跳过链接 / Skip links */
.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--color-primary);
    color: white;
    padding: 8px;
    text-decoration: none;
    transition: top 0.3s;
}

.skip-link:focus {
    top: 6px;
}
```

#### 颜色对比度标准 / Color Contrast Standards

**WCAG 2.1 AA标准 / WCAG 2.1 AA Standards:**
- 正常文本：对比度至少4.5:1 / Normal text: contrast ratio at least 4.5:1
- 大文本（18pt+）：对比度至少3:1 / Large text (18pt+): contrast ratio at least 3:1
- 非文本元素：对比度至少3:1 / Non-text elements: contrast ratio at least 3:1

**对比度检查工具 / Contrast Checking Tools:**
- WebAIM Contrast Checker
- Colour Contrast Analyser
- Chrome DevTools Accessibility panel

### 性能优化最佳实践 / Performance Optimization Best Practices

#### 图片优化 / Image Optimization

**图片格式选择 / Image Format Selection:**
- **JPEG**: 照片和复杂图像 / Photos and complex images
- **PNG**: 透明背景和简单图形 / Transparent backgrounds and simple graphics
- **SVG**: 图标和矢量图形 / Icons and vector graphics
- **WebP**: 现代浏览器的优化格式 / Optimized format for modern browsers

**响应式图片 / Responsive Images:**
```html
<picture>
    <source media="(min-width: 800px)" srcset="large-image.jpg">
    <source media="(min-width: 400px)" srcset="medium-image.jpg">
    <img src="small-image.jpg" alt="描述文本 / Description text">
</picture>
```

#### CSS和JavaScript优化 / CSS and JavaScript Optimization

**CSS优化策略 / CSS Optimization Strategies:**
- 使用CSS变量减少重复 / Use CSS variables to reduce repetition
- 避免过度嵌套选择器 / Avoid overly nested selectors
- 使用简写属性 / Use shorthand properties
- 删除未使用的CSS规则 / Remove unused CSS rules

**JavaScript优化策略 / JavaScript Optimization Strategies:**
- 最小化DOM操作 / Minimize DOM manipulation
- 使用事件委托 / Use event delegation
- 延迟加载非关键脚本 / Lazy load non-critical scripts
- 避免全局变量污染 / Avoid global variable pollution

#### 加载性能优化 / Loading Performance Optimization

**关键资源优先级 / Critical Resource Priority:**
```html
<!-- 预加载关键CSS / Preload critical CSS -->
<link rel="preload" href="assets/css/main.css" as="style">

<!-- 预连接外部资源 / Preconnect external resources -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- 延迟加载非关键JavaScript / Defer non-critical JavaScript -->
<script src="assets/js/main.js" defer></script>
```

### 测试和质量保证 / Testing and Quality Assurance

#### 跨浏览器测试 / Cross-Browser Testing

**测试浏览器列表 / Browser Testing List:**
- **桌面 / Desktop**: Chrome, Firefox, Safari, Edge
- **移动端 / Mobile**: Chrome Mobile, Safari Mobile, Samsung Internet
- **旧版本支持 / Legacy Support**: IE11 (如果需要 / if required)

**测试检查清单 / Testing Checklist:**
- [ ] 所有页面正常加载 / All pages load correctly
- [ ] 导航功能正常 / Navigation works properly
- [ ] 表单提交功能 / Form submission functionality
- [ ] 响应式布局 / Responsive layout
- [ ] 图片和媒体显示 / Images and media display
- [ ] JavaScript交互功能 / JavaScript interactions

#### 代码质量检查 / Code Quality Checks

**HTML验证 / HTML Validation:**
```bash
# 使用W3C验证器检查所有HTML文件 / Use W3C validator to check all HTML files
# 确保没有语法错误和警告 / Ensure no syntax errors or warnings
```

**CSS验证 / CSS Validation:**
```bash
# 检查CSS语法和属性使用 / Check CSS syntax and property usage
# 验证浏览器兼容性 / Verify browser compatibility
```

**性能测试 / Performance Testing:**
```bash
# 使用Lighthouse进行性能评估 / Use Lighthouse for performance assessment
# 目标分数：Performance > 90, Accessibility > 95
```

## 常见修改场景操作指南 / Common Modification Scenarios Guide

### 场景1：添加新的研究项目 / Scenario 1: Adding New Research Project

**完整操作流程 / Complete Operation Process:**

1. **准备项目信息 / Prepare Project Information:**
   - 项目标题（中英文）/ Project title (bilingual)
   - 项目描述（1-2句话）/ Project description (1-2 sentences)
   - 技术标签（3-5个）/ Technology tags (3-5 items)
   - 项目链接（GitHub、演示等）/ Project links (GitHub, demo, etc.)
   - 项目截图（可选）/ Project screenshot (optional)

2. **编辑research.html文件 / Edit research.html File:**
   ```html
   <!-- 在.project-grid区域添加新项目卡片 / Add new project card in .project-grid area -->
   <div class="project-card">
       <div class="project-header">
           <h4 class="project-title">智能数据分析平台 / Intelligent Data Analysis Platform</h4>
           <span class="project-date">2024</span>
       </div>
       
       <p class="project-description">
           基于机器学习的数据分析平台，支持多种数据源和可视化展示。
           Machine learning-based data analysis platform supporting multiple data sources and visualization.
       </p>
       
       <div class="project-tags">
           <span class="tag">Python</span>
           <span class="tag">Django</span>
           <span class="tag">React</span>
           <span class="tag">PostgreSQL</span>
       </div>
       
       <div class="project-links">
           <a href="https://github.com/username/project" class="btn-link" target="_blank">
               GitHub
           </a>
           <a href="https://demo.example.com" class="btn-link" target="_blank">
               在线演示 / Live Demo
           </a>
       </div>
   </div>
   ```

3. **更新首页导航卡片（如需要）/ Update Homepage Navigation Card (if needed):**
   - 如果这是重要项目，考虑在首页突出显示
   - 更新Research卡片的描述以反映新内容

### 场景2：更新个人技能水平 / Scenario 2: Updating Personal Skill Levels

**操作步骤 / Operation Steps:**

1. **评估当前技能水平 / Assess Current Skill Level:**
   - 初学者 (20-40%): 基础了解，能完成简单任务
   - 中级 (50-70%): 能独立完成常见任务
   - 熟练 (75-85%): 能处理复杂问题和优化
   - 专家 (90-95%): 能指导他人，深度理解原理
   - 大师 (100%): 行业领先水平，创新能力

2. **编辑skills.html文件 / Edit skills.html File:**
   ```html
   <div class="skill-item">
       <div class="skill-header">
           <span class="skill-name">Python开发 / Python Development</span>
           <span class="skill-level-text">专家 / Expert</span>
       </div>
       <div class="skill-bar">
           <div class="skill-progress" style="width: 90%"></div>
       </div>
       <p class="skill-description">
           5年+开发经验，熟练使用Django、Flask等框架，具备大型项目架构能力。
           5+ years development experience, proficient in Django, Flask frameworks, capable of large project architecture.
       </p>
   </div>
   ```

3. **添加新技能类别 / Add New Skill Category:**
   ```html
   <div class="skills-category">
       <h3>新兴技术 / Emerging Technologies</h3>
       <div class="skills-list">
           <div class="skill-item">
               <div class="skill-header">
                   <span class="skill-name">区块链开发 / Blockchain Development</span>
                   <span class="skill-level-text">中级 / Intermediate</span>
               </div>
               <div class="skill-bar">
                   <div class="skill-progress" style="width: 60%"></div>
               </div>
           </div>
       </div>
   </div>
   ```

### 场景3：添加新的FAQ问题 / Scenario 3: Adding New FAQ Questions

**实施步骤 / Implementation Steps:**

1. **确定FAQ分类 / Determine FAQ Category:**
   - 学术相关 / Academic Related
   - 技术相关 / Technical Related
   - 合作相关 / Collaboration Related
   - 个人相关 / Personal Related

2. **编写问答内容 / Write Q&A Content:**
   ```html
   <div class="faq-section">
       <h3>技术合作 / Technical Collaboration</h3>
       
       <div class="faq-item">
           <button class="faq-question" aria-expanded="false">
               <span class="question-text">
                   您接受远程技术咨询项目吗？
                   Do you accept remote technical consulting projects?
               </span>
               <span class="faq-icon" aria-hidden="true">+</span>
           </button>
           <div class="faq-answer" aria-hidden="true">
               <div class="answer-content">
                   <p>
                       是的，我接受远程技术咨询项目。主要专长领域包括：
                       Yes, I accept remote technical consulting projects. My main areas of expertise include:
                   </p>
                   <ul>
                       <li>数据科学和机器学习项目架构 / Data science and ML project architecture</li>
                       <li>Python后端开发和API设计 / Python backend development and API design</li>
                       <li>数据库设计和优化 / Database design and optimization</li>
                   </ul>
                   <p>
                       请通过联系页面与我讨论具体需求。
                       Please contact me through the contact page to discuss specific requirements.
                   </p>
               </div>
           </div>
       </div>
   </div>
   ```

### 场景4：更新联系信息 / Scenario 4: Updating Contact Information

**更新流程 / Update Process:**

1. **编辑contact.html文件 / Edit contact.html File:**
   ```html
   <div class="contact-grid">
       <div class="contact-item">
           <h3>Email</h3>
           <p><a href="mailto:new.email@example.com">new.email@example.com</a></p>
       </div>
       
       <div class="contact-item">
           <h3>Office</h3>
           <p>Department Name<br>
           Room Number, Building<br>
           University Campus</p>
       </div>
       
       <div class="contact-item">
           <h3>Office Hours</h3>
           <p>Days & Times<br>
           Time Range<br>
           <em>Or by appointment</em></p>
       </div>
   </div>
   ```

2. **更新专业网络链接 / Update Professional Network Links:**
   ```html
   <div class="social-links">
       <a href="#" class="social-link" target="_blank" rel="noopener">
           <span class="social-icon">🎓</span>
           <span class="social-text">Google Scholar</span>
       </a>
       <!-- 添加更多专业链接 / Add more professional links -->
   </div>
   ```

3. **更新页脚联系信息（如有）/ Update Footer Contact Info (if any):**
   - 检查所有页面的页脚部分
   - 确保联系信息的一致性

**注意事项 / Important Notes:**
- 当前网站已移除联系表单功能，专注于直接联系方式
- 如需重新添加表单，需要配置后端处理服务
- 建议使用第三方服务如Netlify Forms或Formspree

### 场景5：添加中文页面 / Scenario 5: Adding Chinese Pages

**扩展中文版本 / Expanding Chinese Version:**

1. **创建新的中文页面 / Create New Chinese Page:**
   ```bash
   # 复制英文页面结构 / Copy English page structure
   cp research.html zh/research.html
   ```

2. **翻译和本地化内容 / Translate and Localize Content:**
   ```html
   <!DOCTYPE html>
   <html lang="zh-CN">
   <head>
       <meta charset="UTF-8">
       <title>研究项目 - 您的姓名</title>
       <!-- 其他meta标签 / Other meta tags -->
   </head>
   <body>
       <!-- 翻译后的内容 / Translated content -->
   </body>
   </html>
   ```

3. **更新中文导航 / Update Chinese Navigation:**
   ```html
   <nav class="main-nav">
       <ul class="nav-list">
           <li><a href="index.html" class="nav-link">首页</a></li>
           <li><a href="research.html" class="nav-link">研究</a></li>
           <li><a href="skills.html" class="nav-link">技能</a></li>
           <li><a href="personal.html" class="nav-link">个人</a></li>
           <li><a href="faq.html" class="nav-link">问答</a></li>
           <li><a href="contact.html" class="nav-link">联系</a></li>
       </ul>
       <div class="nav-language">
           <a href="../index.html" class="lang-link">English</a>
       </div>
   </nav>
   ```

## 未来增强功能 / Future Enhancements

### 潜在改进项目 / Potential Improvements

#### 短期改进 (1-3个月) / Short-term Improvements (1-3 months)
- **博客功能** / Blog functionality
  - 添加简单的博客页面用于分享研究心得
  - 使用静态HTML文件或简单的CMS系统

- **联系表单处理** / Contact form processing
  - 实现表单后端处理（使用Netlify Forms或类似服务）
  - 添加表单验证和反馈机制

- **搜索功能** / Search functionality
  - 添加简单的客户端搜索功能
  - 支持搜索项目、技能和FAQ内容

#### 中期改进 (3-6个月) / Medium-term Improvements (3-6 months)
- **内容管理界面** / Content management interface
  - 创建简单的管理界面用于更新内容
  - 支持在线编辑项目和技能信息

- **更多交互元素** / More interactive elements
  - 添加项目筛选和排序功能
  - 实现技能图表可视化
  - 增加页面过渡动画

- **SEO优化** / SEO optimizations
  - 添加结构化数据标记
  - 优化页面元数据和描述
  - 实现sitemap.xml生成

#### 长期改进 (6个月+) / Long-term Improvements (6+ months)
- **多语言支持系统** / Multilingual support system
  - 实现完整的多语言内容管理
  - 支持更多语言版本

- **分析和统计** / Analytics and statistics
  - 添加访问统计和用户行为分析
  - 实现性能监控和优化建议

- **移动应用** / Mobile application
  - 考虑开发PWA（渐进式Web应用）
  - 提供离线访问功能

### 扩展考虑因素 / Expansion Considerations

#### 技术架构升级 / Technical Architecture Upgrade
- **静态站点生成器** / Static site generator
  - 考虑使用Jekyll、Hugo或Gatsby
  - 适合内容较多的大型网站

- **内容管理系统** / Content management system
  - 评估Headless CMS解决方案
  - 如Strapi、Contentful或Ghost

- **现代化前端框架** / Modern frontend frameworks
  - 考虑React、Vue或Angular
  - 适合复杂交互和动态内容

#### 性能和可扩展性 / Performance and Scalability
- **CDN集成** / CDN integration
  - 使用Cloudflare或AWS CloudFront
  - 提高全球访问速度

- **图片优化服务** / Image optimization service
  - 自动图片压缩和格式转换
  - 响应式图片服务

- **缓存策略** / Caching strategy
  - 实现浏览器缓存优化
  - 服务器端缓存配置

## 维护计划和检查清单 / Maintenance Schedule and Checklist

### 日常维护 (每周) / Daily Maintenance (Weekly)
- [ ] 检查网站是否正常访问 / Check website accessibility
- [ ] 验证所有链接是否有效 / Verify all links are working
- [ ] 检查联系表单功能 / Check contact form functionality
- [ ] 监控网站加载速度 / Monitor website loading speed

### 定期维护 (每月) / Regular Maintenance (Monthly)
- [ ] 更新项目信息和技能水平 / Update project info and skill levels
- [ ] 检查和修复任何显示问题 / Check and fix any display issues
- [ ] 备份网站文件和数据 / Backup website files and data
- [ ] 审查和更新FAQ内容 / Review and update FAQ content
- [ ] 检查移动端显示效果 / Check mobile display performance

### 季度维护 (每3个月) / Quarterly Maintenance (Every 3 months)
- [ ] 全面内容审查和更新 / Comprehensive content review and update
- [ ] 性能优化和速度测试 / Performance optimization and speed testing
- [ ] 安全检查和更新 / Security check and updates
- [ ] 用户体验评估和改进 / User experience evaluation and improvement
- [ ] 搜索引擎优化检查 / SEO optimization check

### 年度维护 (每年) / Annual Maintenance (Yearly)
- [ ] 完整的网站重新设计评估 / Complete website redesign evaluation
- [ ] 技术栈更新和升级 / Technology stack update and upgrade
- [ ] 全面的可访问性审计 / Comprehensive accessibility audit
- [ ] 竞争对手分析和改进建议 / Competitor analysis and improvement suggestions
- [ ] 长期发展规划制定 / Long-term development planning

---

## 联系和支持 / Contact and Support

### 技术支持 / Technical Support
如果在维护过程中遇到技术问题，请：
If you encounter technical issues during maintenance, please:

1. **查看本指南的故障排除部分** / Check the troubleshooting section of this guide
2. **使用浏览器开发工具检查错误** / Use browser dev tools to check for errors
3. **准备详细的问题描述和截图** / Prepare detailed problem description and screenshots
4. **联系技术支持团队** / Contact the technical support team

### 文档更新 / Documentation Updates
本指南会定期更新以反映最新的最佳实践和技术变化。
This guide is regularly updated to reflect the latest best practices and technical changes.

**最后更新时间 / Last Updated:** 2024年10月1日 / October 1, 2024
**版本 / Version:** 2.0
**维护者 / Maintainer:** 网站开发团队 / Website Development Team

---

*如需技术支持，请参考项目文档或联系开发团队。*
*For technical support, refer to the project documentation or contact the development team.*