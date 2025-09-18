#!/usr/bin/env python3
"""
本地测试服务器
用于测试多语言网站的重定向和路由功能
"""

import http.server
import socketserver
import os
import urllib.parse
from pathlib import Path

class MultilingualHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # 解析请求路径
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path
        
        print(f"请求路径: {path}")
        
        # 如果是根路径，显示语言选择页面而不是重定向
        if path == '/' or path == '':
            self.serve_language_selection()
            return
            
        # 如果请求的是根目录的HTML文件，直接提供服务
        if path.startswith('/') and not path.startswith('/en/') and not path.startswith('/zh/'):
            file_path = path.lstrip('/')
            if file_path.endswith('.html') and os.path.exists(file_path):
                print(f"提供根目录文件: {file_path}")
                self.path = '/' + file_path
                return super().do_GET()
        
        # 处理语言特定的路径
        if path.startswith('/en/') or path.startswith('/zh/'):
            return super().do_GET()
            
        # 处理静态资源
        if any(path.startswith(prefix) for prefix in ['/assets/', '/images/', '/shared/']):
            return super().do_GET()
            
        # 其他情况，正常处理
        return super().do_GET()
    
    def serve_language_selection(self):
        """重定向到英文版本"""
        self.send_response(302)
        self.send_header('Location', '/en/')
        self.end_headers()
        return
        
    def serve_language_selection_old(self):
        """提供语言选择页面（备用）"""
        html_content = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Language Selection - Qingguang Zheng</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
            width: 90%;
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 2em;
        }
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 1.1em;
        }
        .language-options {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-bottom: 30px;
        }
        .lang-option {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            border: 2px solid #e0e0e0;
            border-radius: 15px;
            text-decoration: none;
            color: #333;
            transition: all 0.3s ease;
            min-width: 150px;
        }
        .lang-option:hover {
            border-color: #667eea;
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .lang-flag {
            font-size: 3em;
            margin-bottom: 10px;
        }
        .lang-name {
            font-size: 1.2em;
            font-weight: 600;
            margin-bottom: 5px;
        }
        .lang-desc {
            font-size: 0.9em;
            color: #666;
        }
        .original-link {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
        }
        .original-link a {
            color: #667eea;
            text-decoration: none;
            font-size: 0.9em;
        }
        .original-link a:hover {
            text-decoration: underline;
        }
        @media (max-width: 600px) {
            .language-options {
                flex-direction: column;
                align-items: center;
            }
            .lang-option {
                width: 100%;
                max-width: 200px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome 欢迎</h1>
        <p class="subtitle">Please select your preferred language<br>请选择您的首选语言</p>
        
        <div class="language-options">
            <a href="/en/" class="lang-option">
                <div class="lang-flag">🇺🇸</div>
                <div class="lang-name">English</div>
                <div class="lang-desc">Academic Portfolio</div>
            </a>
            
            <a href="/zh/" class="lang-option">
                <div class="lang-flag">🇨🇳</div>
                <div class="lang-name">中文</div>
                <div class="lang-desc">个人博客</div>
            </a>
        </div>
        
        <div class="original-link">
            <a href="/index.html">View Original English Version (原始英文版本)</a>
        </div>
    </div>
</body>
</html>
        """
        
        self.send_response(200)
        self.send_header('Content-type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(html_content.encode('utf-8'))

def run_server(port=8000):
    """运行本地测试服务器"""
    handler = MultilingualHTTPRequestHandler
    
    with socketserver.TCPServer(("", port), handler) as httpd:
        print(f"🚀 本地测试服务器启动成功!")
        print(f"📍 服务器地址: http://localhost:{port}")
        print(f"🌐 测试地址:")
        print(f"   - 语言选择页面: http://localhost:{port}/")
        print(f"   - 原始英文首页: http://localhost:{port}/index.html")
        print(f"   - 英文版本: http://localhost:{port}/en/")
        print(f"   - 中文版本: http://localhost:{port}/zh/")
        print(f"   - 测试页面: http://localhost:{port}/test-unified-controls.html")
        print(f"🛑 按 Ctrl+C 停止服务器")
        print("-" * 50)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 服务器已停止")

if __name__ == "__main__":
    import sys
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    run_server(port)