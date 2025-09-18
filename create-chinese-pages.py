#!/usr/bin/env python3
"""
脚本用于创建中文版本的B版本页面（示范版占位）
"""

import os

# 中文页面配置
chinese_pages = {
    'index.html': {
        'title': '郑庆广 - 计算心理学研究者',
        'description': '郑庆广 - 北京师范大学发展心理学硕士研究生（中国心理学排名第一）。专注于计算心理学、自然语言处理应用和多模态神经影像分析。正在寻求2026年秋季博士申请机会。',
        'heading': '欢迎来到我的学术主页',
        'content': '这是中文版本的首页，采用B版本设计作为占位内容。'
    },
    'research.html': {
        'title': '研究作品集 - 郑庆广',
        'description': '全面的研究作品集，展示计算心理学项目、心理健康研究中的自然语言处理应用、多模态神经影像研究和大规模数据分析。',
        'heading': '研究作品集',
        'content': '这里展示我在计算心理学、自然语言处理和关系科学交叉领域的研究项目。'
    },
    'skills.html': {
        'title': '技术技能与研究专长 - 郑庆广',
        'description': 'Python、R、MATLAB技术专长，机器学习框架（TensorFlow、PyTorch）、高级统计方法、神经影像分析工具，以及心理科学计算研究方法论。',
        'heading': '技术技能与研究专长',
        'content': '我的技术技能涵盖编程、机器学习、统计分析和神经影像分析等多个领域。'
    },
    'personal.html': {
        'title': '个人兴趣 - 郑庆广',
        'description': '个人兴趣、教学经验、社区参与和文化视角，这些都补充了我在计算心理学方面的研究，并有助于心理科学的整体方法。',
        'heading': '个人兴趣与经历',
        'content': '除了学术研究，我还热衷于教学、指导和跨文化交流。'
    },
    'blog.html': {
        'title': '学术博客 - 郑庆广',
        'description': '学术思考、研究心得、技术分享和个人成长记录。探讨计算心理学、人工智能与心理健康研究的交叉领域。',
        'heading': '学术博客',
        'content': '这里分享我的学术思考、研究心得和技术见解。'
    },
    'contact.html': {
        'title': '联系方式 - 郑庆广',
        'description': '联系我进行研究合作、博士项目讨论或学术伙伴关系。多种联系方式、可用性信息和专业沟通的响应时间承诺。',
        'heading': '联系方式',
        'content': '欢迎与我联系讨论研究合作、博士项目或学术伙伴关系。'
    }
}

def create_chinese_page(filename, config):
    """创建中文B版本页面"""
    
    html_template = f'''<!DOCTYPE HTML>
<!--
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html lang="zh-CN">
<head>
	<title>{config['title']}</title>
	<meta charset="utf-8" />
	<meta name="description" content="{config['description']}" />
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
	<link rel="stylesheet" href="../assets/css/main.css" />
	<link rel="stylesheet" href="../assets/css/design-system.css" />
	<link rel="stylesheet" href="../assets/css/simple-navigation-reset.css" />
	<link rel="stylesheet" href="../assets/css/multilingual.css" />
	<link rel="stylesheet" href="../assets/css/chinese-typography.css" />
	<noscript><link rel="stylesheet" href="../assets/css/noscript.css" /></noscript>
	
	<!-- Language metadata -->
	<link rel="alternate" hreflang="en" href="https://victoir.xyz/en/{filename}" />
	<link rel="alternate" hreflang="zh" href="https://victoir.xyz/zh/{filename}" />
	<link rel="alternate" hreflang="x-default" href="https://victoir.xyz/en/{filename}" />
</head>
<body class="is-preload chinese-layout">
	<!-- Unified Top Controls -->
	<div id="top-controls">
		<div id="language-switcher">
			<button class="lang-toggle" data-lang="en" aria-label="Switch to English">
				<span class="lang-flag">🇺🇸</span>
				<span class="lang-text">EN</span>
			</button>
			<button class="lang-toggle active" data-lang="zh" aria-label="切换到中文">
				<span class="lang-flag">🇨🇳</span>
				<span class="lang-text">中文</span>
			</button>
		</div>
		<a href="#menu" class="menu-toggle" aria-label="切换菜单">
			<div class="menu-icon">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</a>
	</div>

	<!-- Wrapper -->
	<div id="wrapper">
		<!-- Header -->
		<header id="header">
			<div class="inner">
				<!-- Logo -->
				<a href="index.html" class="logo">
					<span class="symbol"><img src="../images/logo.svg" alt="" /></span><span class="title">庆广</span>
				</a>
				<!-- Nav -->
				<nav>
					<ul>
						<li><a href="#menu">菜单</a></li>
					</ul>
				</nav>
			</div>
		</header>

		<!-- Menu -->
		<nav id="menu">
			<h2>导航菜单</h2>
			<ul>
				<li><a href="index.html">首页</a></li>
				<li><a href="research.html">研究经历</a></li>
				<li><a href="skills.html">技能专长</a></li>
				<li><a href="personal.html">个人兴趣</a></li>
				<li><a href="blog.html">学术博客</a></li>
				<li><a href="contact.html">联系方式</a></li>
			</ul>
		</nav>

		<!-- Main -->
		<div id="main">
			<div class="inner">
				<h1>{config['heading']}</h1>
				<p style="font-size: 1.1em; margin-bottom: 2em; line-height: 1.8;">{config['content']}</p>
				
				<div class="content-placeholder" style="background: rgba(245, 106, 106, 0.05); border: 1px solid rgba(245, 106, 106, 0.2); border-radius: 8px; padding: 2em; margin: 2em 0;">
					<h3 style="color: #f56a6a; margin-bottom: 1em;">📝 内容占位说明</h3>
					<p style="line-height: 1.7;">这是中文版本的<strong>B版本设计</strong>（示范版），作为占位内容使用。</p>
					<p style="line-height: 1.7;">主要特点：</p>
					<ul style="line-height: 1.6; margin-left: 1.5em;">
						<li>简洁的页面布局</li>
						<li>统一的多语言顶部控制栏</li>
						<li>中文字体优化</li>
						<li>响应式设计</li>
						<li>完整的导航系统</li>
					</ul>
					<p style="line-height: 1.7; margin-top: 1.5em;"><strong>注意：</strong>这是临时占位内容，后续可以根据需要添加具体的中文内容。</p>
				</div>
				
				<div style="text-align: center; margin: 3em 0;">
					<a href="../en/{filename}" class="button primary">查看英文版本</a>
					<a href="index.html" class="button">返回首页</a>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<footer id="footer">
			<div class="inner">
				<ul class="copyright">
					<li>&copy; 2025 郑庆广。保留所有权利。</li>
					<li>设计: <a href="http://html5up.net">HTML5 UP</a></li>
				</ul>
			</div>
		</footer>
	</div>

	<!-- Scripts -->
	<script src="../assets/js/jquery.min.js"></script>
	<script src="../assets/js/browser.min.js"></script>
	<script src="../assets/js/breakpoints.min.js"></script>
	<script src="../assets/js/util.js"></script>
	<script src="../assets/js/main.js"></script>
	<script src="../assets/js/design-system.js"></script>
	<script src="../assets/js/language-detection.js"></script>
	<script src="../assets/js/language-preferences.js"></script>
	<script src="../assets/js/multilingual.js"></script>
	<script src="../assets/js/multilingual-init.js"></script>
</body>
</html>'''
    
    # 写入文件
    target_path = f'zh/{filename}'
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(html_template)
    
    print(f"✅ Created {target_path}")

def main():
    # 确保zh目录存在
    os.makedirs('zh', exist_ok=True)
    
    # 创建所有中文页面
    for filename, config in chinese_pages.items():
        create_chinese_page(filename, config)
    
    print("\n🎉 All Chinese B-version pages created successfully!")
    print("\nPages created:")
    for filename in chinese_pages.keys():
        print(f"  - zh/{filename}")
    
    print("\nFeatures:")
    print("  ✅ B版本设计（示范版）")
    print("  ✅ 中文字体优化")
    print("  ✅ 统一的多语言控制栏")
    print("  ✅ 完整的导航系统")
    print("  ✅ 占位内容说明")

if __name__ == "__main__":
    main()