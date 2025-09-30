# 本地测试指南

## 问题解决方案

### 1. 按钮间距调整 ✅
已修改CSS使三个按钮间距完全一致，使用 `flex: 1` 确保等宽分布。

### 2. 保护原有设计 ✅
修改了重定向逻辑，现在只有访问根路径 `/` 时才会重定向，访问 `/index.html` 等具体文件不会被重定向。

### 3. 本地测试解决方案 ✅
提供了多种本地测试服务器选项。

## 本地测试服务器使用方法

### 方法一：Python服务器（推荐）

1. **启动服务器**：
   ```bash
   # Windows
   python local-server.py
   # 或双击 start-local-server.bat
   
   # macOS/Linux
   python3 local-server.py
   # 或运行 ./start-local-server.sh
   ```

2. **访问地址**：
   - 根路径（自动重定向到英文）：http://localhost:8000/
   - **原始英文首页**：http://localhost:8000/index.html ⭐
   - **英文版本（完整内容）**：http://localhost:8000/en/ ⭐⭐
   - 中文版本：http://localhost:8000/zh/
   - 测试页面：http://localhost:8000/legacy/root-pages/test-unified-controls.html

### 方法二：Node.js服务器

1. **启动服务器**：
   ```bash
   node local-server.js
   ```

2. **访问地址**：同上

### 方法三：简单HTTP服务器

如果您只想快速测试，也可以使用：

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (需要先安装 http-server)
npx http-server -p 8000
```

## 测试重点

### 1. 按钮布局测试
- 访问任意页面，检查顶部三个按钮是否等宽等间距
- 测试悬停效果和激活状态
- 测试移动端响应式效果

### 2. 原有设计保护测试
- 直接访问 http://localhost:8000/index.html 应该显示原始设计
- 不应该被重定向到语言版本
- 所有原有功能应该正常工作

### 3. 多语言功能测试
- 语言切换按钮功能
- 菜单按钮功能
- URL路由正确性

### 4. 重定向逻辑测试
- 访问 http://localhost:8000/ 应该显示语言选择页面
- 访问 http://localhost:8000/en/ 应该显示英文版本
- 访问 http://localhost:8000/zh/ 应该显示中文版本

## 文件结构说明

```
/
├── index.html                 # 原始英文首页（保持不变）
├── research.html             # 原始页面（保持不变）
├── skills.html               # 原始页面（保持不变）
├── personal.html             # 原始页面（保持不变）
├── QAs.html                  # 原始页面（保持不变）
├── contact.html              # 原始页面（保持不变）
├── en/                       # 英文版本目录
│   ├── index.html
│   ├── research.html
│   └── ...
├── zh/                       # 中文版本目录
│   ├── index.html
│   ├── research.html
│   └── ...
├── assets/                   # 共享资源
├── shared/                   # 多语言共享配置
├── local-server.py           # Python测试服务器
├── local-server.js           # Node.js测试服务器
└── legacy/root-pages/test-unified-controls.html # 按钮测试页面（已归档）
```

## 常见问题解决

### Q: 端口被占用怎么办？
A: 使用不同端口启动：
```bash
python local-server.py 8001
# 或
node local-server.js 8001
```

### Q: 样式没有生效？
A: 检查浏览器缓存，按 Ctrl+F5 强制刷新

### Q: 重定向不工作？
A: 确保访问的是根路径 `/` 而不是 `/index.html`

### Q: 移动端测试？
A: 在浏览器开发者工具中切换到移动设备模式，或使用：
```
http://你的IP地址:8000
```
在手机上访问（确保在同一网络）

## 部署前检查清单

- [ ] 按钮间距一致
- [ ] 原有页面功能正常
- [ ] 语言切换功能正常
- [ ] 菜单按钮功能正常
- [ ] 移动端响应式正常
- [ ] 所有链接可访问
- [ ] CSS和JS文件正确加载
- [ ] 重定向逻辑符合预期

## 技术说明

### 重定向逻辑改进
- 只有访问根路径 `/` 时才显示语言选择页面
- 访问具体文件如 `/index.html` 不会被重定向
- 保护了原有的页面设计和功能

### 按钮样式改进
- 使用 `flex: 1` 确保三个按钮等宽
- 统一的分隔线样式
- 一致的悬停和激活效果

### 服务器功能
- 智能路由处理
- 静态文件服务
- 语言选择页面
- MIME类型支持
- 错误处理