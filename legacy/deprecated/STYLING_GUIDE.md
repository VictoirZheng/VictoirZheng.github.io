# 样式调整指南

## 快速调整常用样式

### 1. 间距调整 (Spacing)

#### 外边距 (Margin)
```html
<!-- 底部外边距 -->
<h4 class="text-primary mb-0">无底部间距</h4>
<h4 class="text-primary mb-1">很小间距 (4px)</h4>
<h4 class="text-primary mb-2">小间距 (8px)</h4>
<h4 class="text-primary mb-3">中等间距 (12px)</h4>
<h4 class="text-primary mb-4">标准间距 (16px)</h4>
<h4 class="text-primary mb-6">大间距 (24px)</h4>
<h4 class="text-primary mb-8">很大间距 (32px)</h4>

<!-- 顶部外边距 -->
<h4 class="text-primary mt-4">顶部间距</h4>

<!-- 左右外边距 -->
<h4 class="text-primary mx-4">左右间距</h4>

<!-- 上下外边距 -->
<h4 class="text-primary my-6">上下间距</h4>
```

#### 内边距 (Padding)
```html
<div class="card p-4">标准内边距</div>
<div class="card p-6">大内边距</div>
<div class="card p-8">很大内边距</div>
<div class="card px-6 py-4">水平大，垂直标准</div>
```

### 2. 字体大小调整 (Font Size)

```html
<!-- 字体大小选项 -->
<h4 class="text-primary text-xs">超小字体 (12px)</h4>
<h4 class="text-primary text-sm">小字体 (14px)</h4>
<h4 class="text-primary text-base">基础字体 (16px)</h4>
<h4 class="text-primary text-lg">大字体 (18px)</h4>
<h4 class="text-primary text-xl">超大字体 (20px)</h4>
<h4 class="text-primary text-2xl">2倍大字体 (24px)</h4>
<h4 class="text-primary text-3xl">3倍大字体 (30px)</h4>
```

### 3. 字体粗细调整 (Font Weight)

```html
<h4 class="text-primary font-light">细字体</h4>
<h4 class="text-primary font-normal">正常字体</h4>
<h4 class="text-primary font-medium">中等字体</h4>
<h4 class="text-primary font-semibold">半粗字体</h4>
<h4 class="text-primary font-bold">粗字体</h4>
<h4 class="text-primary font-black">超粗字体</h4>
```

### 4. 行高调整 (Line Height)

```html
<p class="leading-tight">紧密行高 (1.25)</p>
<p class="leading-normal">正常行高 (1.5)</p>
<p class="leading-relaxed">宽松行高 (1.75)</p>
```

## 实际应用示例

### 调整研究项目标题
```html
<!-- 原来的 -->
<h4 class="text-primary mb-2">Marital Interaction Analysis</h4>

<!-- 调整选项 -->
<h4 class="text-primary text-lg mb-3">更大字体，更大间距</h4>
<h4 class="text-primary text-xl mb-4 font-semibold">大字体，半粗，标准间距</h4>
<h4 class="text-primary text-sm mb-1">小字体，小间距</h4>
```

### 调整段落样式
```html
<!-- 原来的 -->
<p class="text-secondary mb-0">Using NLP and LLMs to analyze 720+ spousal interaction texts</p>

<!-- 调整选项 -->
<p class="text-secondary text-lg mb-4 leading-relaxed">更大字体，更宽松行高，更大间距</p>
<p class="text-secondary text-sm mb-2">小字体，小间距</p>
```

### 调整卡片内容
```html
<div class="card card--research p-6">  <!-- 调整内边距 -->
    <div class="card__body">
        <h4 class="text-primary text-xl mb-4 font-semibold">大标题</h4>  <!-- 大字体，半粗 -->
        <p class="text-secondary text-lg mb-0 leading-relaxed">大段落文字</p>  <!-- 大字体，宽松行高 -->
    </div>
</div>
```

## 间距数值对照表

| 类名 | CSS值 | 像素值 | 使用场景 |
|------|-------|--------|----------|
| `0` | `0` | 0px | 移除间距 |
| `1` | `0.25rem` | 4px | 很小的间距 |
| `2` | `0.5rem` | 8px | 小间距 |
| `3` | `0.75rem` | 12px | 中小间距 |
| `4` | `1rem` | 16px | 标准间距 |
| `6` | `1.5rem` | 24px | 大间距 |
| `8` | `2rem` | 32px | 很大间距 |
| `10` | `2.5rem` | 40px | 超大间距 |
| `12` | `3rem` | 48px | 章节间距 |

## 字体大小对照表

| 类名 | CSS值 | 像素值 | 使用场景 |
|------|-------|--------|----------|
| `text-xs` | `0.75rem` | 12px | 小标签、注释 |
| `text-sm` | `0.875rem` | 14px | 辅助文字 |
| `text-base` | `1rem` | 16px | 正文 |
| `text-lg` | `1.125rem` | 18px | 重要正文 |
| `text-xl` | `1.25rem` | 20px | 小标题 |
| `text-2xl` | `1.5rem` | 24px | 中标题 |
| `text-3xl` | `1.875rem` | 30px | 大标题 |
| `text-4xl` | `2.25rem` | 36px | 主标题 |
| `text-5xl` | `3rem` | 48px | 超大标题 |

## 组合使用技巧

### 1. 创建视觉层次
```html
<h2 class="text-3xl font-bold mb-6">主标题</h2>
<h3 class="text-xl font-semibold mb-4">副标题</h3>
<h4 class="text-lg font-medium mb-3">小标题</h4>
<p class="text-base mb-4 leading-relaxed">正文内容</p>
<p class="text-sm text-secondary">辅助信息</p>
```

### 2. 调整卡片内容密度
```html
<!-- 紧凑型卡片 -->
<div class="card p-4">
    <h4 class="text-lg mb-2">标题</h4>
    <p class="text-sm mb-0">内容</p>
</div>

<!-- 宽松型卡片 -->
<div class="card p-8">
    <h4 class="text-xl mb-4">标题</h4>
    <p class="text-base mb-0 leading-relaxed">内容</p>
</div>
```

### 3. 响应式调整
```html
<!-- 在不同屏幕尺寸下使用不同样式 -->
<h1 class="text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6">响应式标题</h1>
```

## 常见调整场景

### 让标题更突出
```html
<!-- 原来 -->
<h4 class="text-primary mb-2">标题</h4>

<!-- 调整后 -->
<h4 class="text-primary text-xl font-semibold mb-4">标题</h4>
```

### 让段落更易读
```html
<!-- 原来 -->
<p class="text-secondary mb-0">内容</p>

<!-- 调整后 -->
<p class="text-secondary text-lg mb-4 leading-relaxed">内容</p>
```

### 调整卡片间距
```html
<!-- 原来 -->
<div class="card card--research">

<!-- 调整后 -->
<div class="card card--research p-6 mb-8">  <!-- 更大内边距和底部间距 -->
```

记住：所有这些类都可以组合使用，你可以根据需要自由调整字体大小、间距、粗细等属性来达到最佳的视觉效果！