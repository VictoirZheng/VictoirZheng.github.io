const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// MIME类型映射
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return mimeTypes[ext] || 'text/plain';
}

function serveLanguageSelection(res) {
    // Redirect to English version instead of showing language selection
    res.writeHead(302, { 'Location': '/en/' });
    res.end();
    return;
}

function serveLanguageSelectionOld(res) {
    const html = `
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
</html>`;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
}

function serveFile(filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }
        
        const mimeType = getMimeType(filePath);
        res.writeHead(200, { 'Content-Type': mimeType });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    console.log(\`请求路径: \${pathname}\`);
    
    // 根路径显示语言选择页面
    if (pathname === '/' || pathname === '') {
        serveLanguageSelection(res);
        return;
    }
    
    // 构建文件路径
    let filePath = path.join(__dirname, pathname);
    
    // 检查文件是否存在
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // 如果文件不存在，返回404
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }
        
        // 检查是否是目录
        fs.stat(filePath, (err, stats) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server error');
                return;
            }
            
            if (stats.isDirectory()) {
                // 如果是目录，尝试提供index.html
                const indexPath = path.join(filePath, 'index.html');
                fs.access(indexPath, fs.constants.F_OK, (err) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('Directory index not found');
                    } else {
                        serveFile(indexPath, res);
                    }
                });
            } else {
                // 提供文件
                serveFile(filePath, res);
            }
        });
    });
});

const PORT = process.argv[2] || 8000;

server.listen(PORT, () => {
    console.log('🚀 本地测试服务器启动成功!');
    console.log(\`📍 服务器地址: http://localhost:\${PORT}\`);
    console.log('🌐 测试地址:');
    console.log(\`   - 语言选择页面: http://localhost:\${PORT}/\`);
    console.log(\`   - 原始英文首页: http://localhost:\${PORT}/index.html\`);
    console.log(\`   - 英文版本: http://localhost:\${PORT}/en/\`);
    console.log(\`   - 中文版本: http://localhost:\${PORT}/zh/\`);
    console.log(\`   - 测试页面: http://localhost:\${PORT}/legacy/root-pages/test-unified-controls.html\`);
    console.log('🛑 按 Ctrl+C 停止服务器');
    console.log('-'.repeat(50));
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(\`❌ 端口 \${PORT} 已被占用，请尝试其他端口\`);
        console.log(\`   例如: node local-server.js 8001\`);
    } else {
        console.log('❌ 服务器错误:', err.message);
    }
});