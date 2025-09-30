# 个人主页系统性优化设计文档

## 概述

本设计文档基于需求分析，为Qingguang Zheng的个人学术主页提供全面的系统架构、内容策略、视觉设计和技术实现方案。设计重点关注PhD申请的目标受众，同时为未来的多语言扩展预留架构空间。

## 架构设计

### 信息架构

```
个人主页 (victoir.xyz)
├── 首页 (index.html) - 学术身份与核心亮点
├── 研究经历 (research.html) - 详细研究项目与成果
├── 技能专长 (skills.html) - 技术能力与方法论
├── 个人特质 (personal.html) - 兴趣爱好与个人品质
├── 常见问题 (QAs.html) - 申请相关FAQ
├── 联系方式 (contact.html) - 多渠道联系信息
└── 资源下载 (assets/) - CV、论文等文档
```

### 多语言架构预留

```
未来扩展结构:
├── en/ (英文版 - 学术申请导向)
│   ├── index.html
│   ├── research.html
│   └── ...
├── zh/ (中文版 - 个人博客导向)
│   ├── index.html
│   ├── blog/
│   └── ...
└── shared/
    ├── assets/
    ├── images/
    └── data/
```

## 组件和接口设计

### 核心组件

#### 1. 导航系统 (Navigation Component)
- **功能**: 统一的页面导航和面包屑
- **接口**: 
  - `currentPage`: 当前页面标识
  - `languageToggle`: 预留语言切换接口
- **样式**: 固定顶部导航，移动端汉堡菜单

#### 2. 学术成就卡片 (Achievement Card)
- **功能**: 标准化展示研究项目、技能、成就
- **接口**:
  - `title`: 标题
  - `description`: 描述
  - `metadata`: 时间、地点、状态等元信息
  - `tags`: 技能标签或分类
- **样式**: 统一的卡片设计，悬停效果，响应式布局

#### 3. 时间线组件 (Timeline Component)
- **功能**: 展示研究经历的时间顺序
- **接口**:
  - `events`: 事件数组
  - `orientation`: 垂直/水平布局
- **样式**: 清晰的时间轴视觉，重要节点突出

#### 4. 技能评估组件 (Skill Assessment)
- **功能**: 可视化技能水平
- **接口**:
  - `skillName`: 技能名称
  - `proficiency`: 熟练度等级
  - `evidence`: 证明材料链接
- **样式**: 进度条或雷达图展示

#### 5. 联系表单组件 (Contact Form)
- **功能**: 结构化的联系方式
- **接口**:
  - `formData`: 表单数据
  - `validation`: 验证规则
  - `submitHandler`: 提交处理
- **样式**: 清晰的表单布局，实时验证反馈

## 数据模型

### 个人信息模型 (PersonalProfile)
```javascript
{
  basicInfo: {
    name: "Qingguang Zheng",
    chineseName: "郑庆广",
    title: "Master's Student in Developmental Psychology",
    institution: "Beijing Normal University",
    email: "zhengqg@mail.bnu.edu.cn",
    phone: "+86 178 5339 1186",
    website: "https://victoir.xyz",
    github: "https://github.com/VictoirZheng"
  },
  academicFocus: [
    "Computational Psychology",
    "Natural Language Processing",
    "Multimodal Data Analysis",
    "Marital and Family Dynamics"
  ],
  keyMetrics: {
    researchYears: "5+",
    participantsAnalyzed: "5M+",
    codeLines: "7K+",
    toeflScore: 106
  }
}
```

### 研究项目模型 (ResearchProject)
```javascript
{
  id: "marital-interaction-nsfc",
  title: "The Effect of Marital Interaction on Marital Relationship",
  type: "Primary Research",
  status: "Ongoing",
  duration: "Oct 2022 - Present",
  funding: {
    source: "NSFC General Program",
    amount: "CNY 1,256,520"
  },
  role: "Primary Student Researcher",
  pi: "Dr. Xiaoyi Fang",
  institution: "Beijing Normal University",
  description: "Leading computational analysis of spousal interactions...",
  achievements: [
    "Applied LIWC, LDA topic modeling, and fine-tuned LLMs",
    "Analyzed 720+ spousal interaction texts",
    "Achieved 79% coding consistency"
  ],
  technologies: ["Python", "NLP", "LLMs", "MATLAB", "fMRI"],
  publications: ["under-review-jmf-2024"]
}
```

### 技能模型 (Skill)
```javascript
{
  category: "Programming Languages",
  skills: [
    {
      name: "Python",
      proficiency: "Expert",
      evidence: "7,000+ lines of production code",
      applications: [
        "Data pipelines",
        "TensorFlow/PyTorch for deep learning",
        "NLP with BERT fine-tuning"
      ]
    }
  ]
}
```

## 错误处理

### 用户体验错误处理
1. **页面加载失败**: 显示友好的错误页面，提供导航选项
2. **图片加载失败**: 使用占位符图片，保持布局完整性
3. **表单提交错误**: 实时验证，清晰的错误提示
4. **移动端适配问题**: 渐进式增强，确保基本功能可用

### 内容管理错误处理
1. **缺失内容**: 使用默认内容或"即将更新"提示
2. **格式错误**: 内容验证和自动格式化
3. **链接失效**: 定期检查和更新机制

## 测试策略

### 功能测试
1. **导航测试**: 确保所有页面链接正常工作
2. **响应式测试**: 在不同设备和屏幕尺寸上测试
3. **表单测试**: 验证联系表单的提交和验证功能
4. **性能测试**: 页面加载时间和资源优化

### 内容测试
1. **语言质量**: 英文表达的准确性和专业性
2. **信息完整性**: 确保所有重要信息都已包含
3. **逻辑一致性**: 各页面间信息的一致性
4. **目标受众适配**: PhD招生委员会的需求匹配度

### 可访问性测试
1. **屏幕阅读器兼容性**: 使用NVDA/JAWS测试
2. **键盘导航**: 确保所有功能可通过键盘访问
3. **颜色对比度**: 符合WCAG 2.1 AA标准
4. **语义化HTML**: 正确的标签使用

## 视觉设计系统

### 色彩方案
- **主色调**: #f56a6a (学术红) - 用于重点强调和CTA
- **辅助色**: #ff8a80 (浅红) - 用于渐变和悬停效果
- **背景色**: 深色主题，营造专业学术氛围
- **文字色**: 白色主文字，rgba(255,255,255,0.65)次要文字
- **强调色**: #ffffff 用于标题和重要信息

### 字体系统
- **主字体**: 系统默认无衬线字体栈，确保跨平台一致性
- **标题字体**: 加粗处理，层次分明
- **代码字体**: 等宽字体，用于技术内容展示
- **中文字体**: 预留中文字体栈，支持未来中文版本

### 布局原则
- **网格系统**: 12列响应式网格
- **间距系统**: 基于8px的间距单位
- **卡片设计**: 统一的圆角(8px)和阴影效果
- **动画效果**: 微妙的过渡动画，提升用户体验

### 组件样式规范

#### 按钮样式
```css
.primary-button {
  background: linear-gradient(90deg, #f56a6a, #ff8a80);
  border-radius: 25px;
  padding: 0.8em 2em;
  transition: transform 0.3s ease;
}

.secondary-button {
  border: 2px solid #f56a6a;
  background: transparent;
  color: #f56a6a;
}
```

#### 卡片样式
```css
.content-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 2em;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.content-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(245, 106, 106, 0.1);
}
```

## 内容策略

### 首页内容策略
1. **英雄区域**: 姓名、学术身份、核心研究领域
2. **关键指标**: 量化的研究成果和能力证明
3. **研究亮点**: 3-4个最重要的研究方向
4. **快速导航**: 引导访问者到相关页面

### 研究页面内容策略
1. **研究兴趣概览**: 6个核心研究方向的可视化展示
2. **当前项目**: 详细的进行中项目，突出贡献和成果
3. **发表论文**: 按状态分类的论文列表
4. **会议展示**: 学术会议参与记录
5. **获奖认可**: 学术奖项和认可

### 技能页面内容策略
1. **技能概览**: 4个核心能力领域的图标化展示
2. **编程技能**: 详细的编程语言和框架经验
3. **研究方法**: 实验设计、统计分析、数据处理
4. **专业工具**: 神经影像、多模态分析工具
5. **持续学习**: 展示学习能力和发展方向

### Personal页面内容策略
1. **兴趣爱好**: 与研究能力相关的个人兴趣
2. **教学经验**: 展示沟通和知识传播能力
3. **社区参与**: 体现社会责任感和领导力
4. **文化背景**: 展示跨文化理解和适应能力
5. **个人成长**: 体现持续学习和自我提升

### QAs页面内容策略
1. **研究动机**: 为什么选择这个研究方向
2. **申请原因**: 为什么申请PhD，为什么选择美国
3. **未来规划**: 学术职业发展计划
4. **适应能力**: 跨文化学习和生活准备
5. **研究贡献**: 期望对学术界的贡献

### Contact页面内容策略
1. **联系信息**: 多种联系方式和偏好说明
2. **时区信息**: 便于国际合作安排
3. **社交媒体**: 专业学术平台链接
4. **合作意向**: 欢迎的合作类型和研究方向
5. **响应承诺**: 回复时间和沟通方式说明

## 技术实现细节

### 前端技术栈
- **HTML5**: 语义化标签，支持SEO和可访问性
- **CSS3**: 现代CSS特性，响应式设计
- **JavaScript**: 渐进式增强，不依赖框架
- **图标系统**: Font Awesome 5.x
- **动画库**: CSS动画为主，必要时使用轻量级JS库

### 性能优化
1. **图片优化**: WebP格式，懒加载，响应式图片
2. **CSS优化**: 关键CSS内联，非关键CSS异步加载
3. **JavaScript优化**: 代码分割，按需加载
4. **缓存策略**: 静态资源长期缓存，HTML短期缓存

### SEO优化
1. **Meta标签**: 每页独特的title、description、keywords
2. **结构化数据**: JSON-LD格式的学者信息
3. **URL结构**: 语义化URL，支持多语言扩展
4. **站点地图**: XML sitemap，便于搜索引擎索引

### 多语言架构准备
1. **文件结构**: 预留语言目录结构
2. **资源管理**: 共享资源和语言特定资源分离
3. **URL设计**: 支持语言前缀的URL结构
4. **内容管理**: 便于维护双语内容的组织方式

## 部署和维护

### 部署策略
1. **静态托管**: GitHub Pages或Netlify
2. **CDN加速**: Cloudflare全球加速
3. **域名配置**: victoir.xyz主域名
4. **HTTPS**: 强制HTTPS，提升安全性和SEO

### 维护计划
1. **内容更新**: 定期更新研究进展和成果
2. **性能监控**: 使用Google Analytics和PageSpeed Insights
3. **链接检查**: 定期检查外部链接有效性
4. **备份策略**: Git版本控制，多地备份

这个设计文档为个人主页的系统性优化提供了全面的技术和内容指导，确保网站能够有效服务于PhD申请目标，同时为未来的功能扩展奠定坚实基础。