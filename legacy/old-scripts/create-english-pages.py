#!/usr/bin/env python3
"""
脚本用于创建英文版本的页面，基于原始A版本内容
"""

import os
import shutil

# 需要处理的页面列表（除了index.html和QAs.html）
pages_to_copy = [
    'skills.html',
    'personal.html', 
    'contact.html'
]

def create_multilingual_page(original_file, target_file, page_title):
    """创建多语言版本的页面"""
    
    # 读取原始文件
    with open(original_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 基本的HTML结构替换
    replacements = [
        # 添加lang属性
        ('<html>', '<html lang="en">'),
        
        # 更新CSS路径
        ('href="assets/css/', 'href="../assets/css/'),
        ('href="../assets/css/multilingual.css" />', ''),  # 先移除，稍后添加
        
        # 更新图片路径
        ('src="images/', 'src="../images/'),
        
        # 更新资源路径
        ('href="assets/', 'href="../assets/'),
        
        # 添加多语言CSS
        ('<link rel="stylesheet" href="../assets/css/design-system.css" />',
         '<link rel="stylesheet" href="../assets/css/design-system.css" />\n\t<link rel="stylesheet" href="../assets/css/multilingual.css" />'),
        
        # 添加语言元数据
        ('<noscript><link rel="stylesheet" href="../assets/css/noscript.css" /></noscript>',
         '<noscript><link rel="stylesheet" href="../assets/css/noscript.css" /></noscript>\n\t\n\t<!-- Language metadata -->\n\t<link rel="alternate" hreflang="en" href="https://victoir.xyz/en/' + target_file.split('/')[-1] + '" />\n\t<link rel="alternate" hreflang="zh" href="https://victoir.xyz/zh/' + target_file.split('/')[-1] + '" />\n\t<link rel="alternate" hreflang="x-default" href="https://victoir.xyz/en/' + target_file.split('/')[-1] + '" />'),
        
        # 添加顶部控制栏
        ('<body class="is-preload">',
         '<body class="is-preload">\n\t<!-- Unified Top Controls -->\n\t<div id="top-controls">\n\t\t<div id="language-switcher">\n\t\t\t<button class="lang-toggle active" data-lang="en" aria-label="Switch to English">\n\t\t\t\t<span class="lang-flag">🇺🇸</span>\n\t\t\t\t<span class="lang-text">EN</span>\n\t\t\t</button>\n\t\t\t<button class="lang-toggle" data-lang="zh" aria-label="切换到中文">\n\t\t\t\t<span class="lang-flag">🇨🇳</span>\n\t\t\t\t<span class="lang-text">中文</span>\n\t\t\t</button>\n\t\t</div>\n\t\t<a href="#menu" class="menu-toggle" aria-label="Toggle Menu">\n\t\t\t<div class="menu-icon">\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t</div>\n\t\t</a>\n\t</div>\n'),
        
        # 更新脚本路径
        ('src="assets/js/', 'src="../assets/js/'),
        
        # 添加多语言脚本
        ('<script src="../assets/js/design-system.js"></script>',
         '<script src="../assets/js/design-system.js"></script>\n\t<script src="../assets/js/language-detection.js"></script>\n\t<script src="../assets/js/language-preferences.js"></script>\n\t<script src="../assets/js/multilingual.js"></script>\n\t<script src="../assets/js/multilingual-init.js"></script>')
    ]
    
    # 应用替换
    for old, new in replacements:
        content = content.replace(old, new)
    
    # 写入目标文件
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Created {target_file}")

def main():
    # 确保en目录存在
    os.makedirs('en', exist_ok=True)
    
    # 处理每个页面
    for page in pages_to_copy:
        if os.path.exists(page):
            target_path = f'en/{page}'
            page_name = page.replace('.html', '').title()
            create_multilingual_page(page, target_path, page_name)
        else:
            print(f"❌ Original file {page} not found")
    
    print("\n🎉 All English pages created successfully!")
    print("\nNext steps:")
    print("1. Review the generated pages")
    print("2. Test the multilingual functionality")
    print("3. Adjust any specific content as needed")

if __name__ == "__main__":
    main()