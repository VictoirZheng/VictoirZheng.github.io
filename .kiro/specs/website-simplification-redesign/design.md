# Design Document

## Overview

本设计文档概述了个人学术网站的简化和重新设计策略。设计理念专注于**学术凝练**，创建一个美观简洁、风格统一的网站，便于后续人工调整和扩展。

核心设计原则：
- **学术专业性**：体现学术环境的严谨和专业
- **内容精炼**：信息简洁明了，避免冗余
- **易于维护**：代码结构清晰，便于修改扩展
- **双语支持**：英文为主，中文为辅的简单切换

## Architecture

### 项目文件结构设计

#### 目标文件结构
```
website-root/
├── index.html (英文首页，默认页面)
├── research.html (研究页面)
├── skills.html (技能页面)
├── personal.html (个人页面)
├── faq.html (问答页面，对应QAs)
├── contact.html (联系页面)
├── zh/
│   └── index.html (中文首页，简化版本)
├── assets/
│   ├── css/
│   │   └── main.css (合并后的样式文件)
│   ├── js/
│   │   └── main.js (必要的JavaScript功能)
│   └── images/ (优化后的图片资源)
└── docs/
    └── maintenance-guide.md (维护和修改指南)
```

#### 架构设计原则
1. **文件职责单一**：每个文件都有明确的用途
2. **结构清晰**：目录组织逻辑清楚，便于理解
3. **易于维护**：代码结构支持快速修改和扩展
4. **资源整合**：合并CSS和JS文件，减少冗余
5. **文档完善**：提供清晰的维护指南

### 文件清理和优化策略

#### 需要删除的文件
- 复杂的语言检测系统
- 冗余的CSS文件（合并为单一文件）
- 复杂的多语言JavaScript模块
- 重复的导航和布局文件
- 未使用的模板组件和页面
- 测试文件和开发工具文件
- 旧版本和备份文件

#### 需要保留和简化的文件
- 核心HTML模板结构（头部、导航、页脚）
- 基础CSS样式（排版和布局）
- 必要的JavaScript功能（菜单切换等）
- 优化后的图片和图标

## Components and Interfaces

### 导航系统设计

#### 导航结构
```
主导航：
├── Home (index.html) - 首页
├── Research (research.html) - 研究
├── Skills (skills.html) - 技能
├── Personal (personal.html) - 个人
├── QAs (faq.html) - 问答
└── Contact (contact.html) - 联系

语言切换：
└── 中文 (zh/index.html) - 简单链接切换
```

#### 导航组件设计
- **页头**：简洁的标识 + 水平导航菜单
- **主菜单**：6个主要页面的清晰导航
- **语言切换**：简单的文本链接到中文版本
- **页脚**：最小化的版权信息

### 页面布局系统

#### 通用页面模板
```html
<!DOCTYPE HTML>
<html lang="en">
<head>
  <!-- 基础meta标签 -->
  <!-- 单一CSS文件 -->
</head>
<body>
  <header>
    <!-- 标识 + 导航 -->
  </header>
  
  <main>
    <!-- 页面特定内容 -->
  </main>
  
  <footer>
    <!-- 简化页脚 -->
  </footer>
  
  <!-- 单一JS文件 -->
</body>
</html>
```

#### 内容结构标准
- **页面标题区**：姓名、职位、简短描述（最多2句话）
- **主要内容**：单列布局，清晰的分区
- **行动按钮**：每页最多2个主要操作
- **留白设计**：元素间充足的间距

### 视觉设计系统

#### 学术风格色彩方案
```css
:root {
  /* 主色：学术深蓝 */
  --color-primary: #1e3a8a;
  
  /* 辅助色：优雅灰色系 */
  --color-text: #1f2937;
  --color-text-light: #6b7280;
  --color-background: #ffffff;
  --color-border: #e5e7eb;
  
  /* 强调色：学术红色用于重点 */
  --color-accent: #dc2626;
}
```

#### 字体系统（学术风格）
```css
:root {
  /* 主字体：清晰易读的无衬线字体 */
  --font-primary: 'Inter', 'Source Sans Pro', sans-serif;
  
  /* 标题字体：优雅的衬线字体 */
  --font-heading: 'Crimson Text', 'Times New Roman', serif;
  
  /* 字体大小层级 */
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;
}
```

#### 间距系统
```css
:root {
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4rem;
}
```

### 内容组件设计

#### 首页组件
1. **标题区域**
   - 姓名和职位
   - 简短的个人介绍（1-2句话）
   - 主要行动按钮（Research + CV下载）

2. **导航卡片**（5个卡片）
   - Research: 研究领域简介
   - Skills: 技能概览
   - Personal: 个人兴趣
   - QAs: 常见问题
   - Contact: 联系方式

#### 各页面特定组件
1. **Research页面**
   - 项目卡片（简洁信息）
   - 发表论文列表
   - 研究技能标签

2. **Skills页面**
   - 技术分类
   - 技能水平指示
   - 工具和框架列表

3. **Personal页面**
   - 兴趣爱好分区
   - 教学经验
   - 个人理念

4. **QAs页面**
   - 可展开的问题区域
   - 清晰的分类
   - 简洁的问答格式

5. **Contact页面**
   - 联系信息
   - 联系表单（如需要）
   - 社交媒体链接

## Data Models

### 内容结构模型

#### 页面内容模型
```javascript
{
  page: {
    title: string,        // 页面标题
    description: string,  // 页面描述
    sections: [
      {
        id: string,       // 区域标识
        title: string,    // 区域标题
        content: string,  // 区域内容
        type: 'text' | 'list' | 'cards' | 'grid'  // 显示类型
      }
    ]
  }
}
```

#### 导航模型
```javascript
{
  navigation: {
    primary: [
      { label: string, url: string, active: boolean }
    ],
    language: {
      current: 'en' | 'zh',
      toggle: { label: string, url: string }
    }
  }
}
```

### 资源管理

#### CSS架构设计
```css
/* main.css 结构 */
/* 1. 重置样式 */
/* 2. 字体和排版 */
/* 3. 布局系统 */
/* 4. 组件样式 */
/* 5. 工具类 */
```

#### 图片优化策略
- 保留必要的图片资源
- 优化图片大小和格式
- 使用适当的图片压缩
- 确保图片有合适的alt文本

## Error Handling

### 容错设计策略

#### 基础功能保障
- 所有导航功能无需JavaScript即可工作
- 表单提交使用标准HTML表单
- 内容完全可访问

#### 内容回退机制
- 空白区域提供默认占位文本
- 图片链接失效时的回退方案
- 表单提交失败的错误提示

#### 语言切换
- 基于简单链接的语言切换（无需JavaScript）
- 清晰显示当前语言状态
- 中文内容缺失时回退到英文

## Testing Strategy

### 基础功能测试
- 所有页面链接正常工作
- 导航菜单在各页面正确显示
- 语言切换功能正常
- 表单提交功能正常

### 内容质量检查
- 拼写和语法检查
- 链接有效性验证
- 图片alt文本完整性
- 页面标题和描述优化

## 维护和扩展指南

### 代码组织原则
1. **HTML结构**：使用语义化标签，保持清晰的层次结构
2. **CSS样式**：采用模块化组织，便于修改和扩展
3. **JavaScript功能**：保持最小化，只包含必要功能
4. **图片资源**：统一存放在assets/images目录

### 常见修改场景
1. **添加新页面**：复制现有页面模板，修改内容
2. **修改导航**：更新header部分的导航链接
3. **更新内容**：直接编辑对应HTML文件的main区域
4. **调整样式**：修改main.css中的相应样式规则

### 扩展建议
1. **中文页面扩展**：在zh目录下添加对应的HTML文件
2. **新功能添加**：遵循现有的代码结构和命名规范
3. **样式调整**：使用CSS变量系统，便于全局调整
4. **内容管理**：考虑使用简单的内容管理系统或静态站点生成器