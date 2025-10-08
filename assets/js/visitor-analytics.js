/**
 * 访客统计和分析功能
 * Visitor Analytics and Tracking
 */

class VisitorAnalytics {
    constructor() {
        this.storageKey = 'visitor_stats';
        this.sessionKey = 'session_id';
        this.init();
    }

    init() {
        this.trackVisit();
        this.updateVisitorCount();
    }

    // 生成唯一会话ID
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // 获取或创建会话ID
    getSessionId() {
        let sessionId = sessionStorage.getItem(this.sessionKey);
        if (!sessionId) {
            sessionId = this.generateSessionId();
            sessionStorage.setItem(this.sessionKey, sessionId);
        }
        return sessionId;
    }

    // 记录访问
    trackVisit() {
        const now = new Date();
        const today = now.toDateString();
        const sessionId = this.getSessionId();
        
        // 获取现有统计数据
        let stats = this.getStats();
        
        // 更新总访问量
        stats.totalVisits = (stats.totalVisits || 0) + 1;
        
        // 更新今日访问量
        if (stats.lastVisitDate !== today) {
            stats.dailyVisits = 1;
            stats.lastVisitDate = today;
        } else {
            stats.dailyVisits = (stats.dailyVisits || 0) + 1;
        }
        
        // 记录访问历史（最近30天）
        if (!stats.visitHistory) {
            stats.visitHistory = {};
        }
        stats.visitHistory[today] = (stats.visitHistory[today] || 0) + 1;
        
        // 只保留最近30天的数据
        this.cleanOldHistory(stats.visitHistory);
        
        // 记录访客信息
        const visitorInfo = {
            timestamp: now.toISOString(),
            sessionId: sessionId,
            userAgent: navigator.userAgent,
            language: navigator.language,
            screen: `${screen.width}x${screen.height}`,
            page: window.location.pathname,
            referrer: document.referrer || 'direct'
        };
        
        if (!stats.recentVisitors) {
            stats.recentVisitors = [];
        }
        stats.recentVisitors.unshift(visitorInfo);
        
        // 只保留最近100个访客记录
        if (stats.recentVisitors.length > 100) {
            stats.recentVisitors = stats.recentVisitors.slice(0, 100);
        }
        
        // 保存统计数据
        this.saveStats(stats);
    }

    // 清理旧的历史记录
    cleanOldHistory(history) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        Object.keys(history).forEach(date => {
            if (new Date(date) < thirtyDaysAgo) {
                delete history[date];
            }
        });
    }

    // 获取统计数据
    getStats() {
        try {
            const stats = localStorage.getItem(this.storageKey);
            return stats ? JSON.parse(stats) : {};
        } catch (error) {
            console.error('Error reading visitor stats:', error);
            return {};
        }
    }

    // 保存统计数据
    saveStats(stats) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(stats));
        } catch (error) {
            console.error('Error saving visitor stats:', error);
        }
    }

    // 静默更新访客计数（不显示在页面上）
    updateVisitorCount() {
        // 静默记录，不在页面上显示任何统计信息
        // 这样可以保持统计功能运行，但对访客完全隐藏
    }

    // 获取访客统计摘要
    getStatsSummary() {
        const stats = this.getStats();
        return {
            totalVisits: stats.totalVisits || 0,
            todayVisits: stats.dailyVisits || 0,
            recentVisitorsCount: stats.recentVisitors ? stats.recentVisitors.length : 0,
            visitHistory: stats.visitHistory || {}
        };
    }
}

// 初始化访客统计
document.addEventListener('DOMContentLoaded', function() {
    window.visitorAnalytics = new VisitorAnalytics();
});

// Google Analytics 集成（如果需要）
function initGoogleAnalytics(trackingId) {
    if (!trackingId) return;
    
    // 加载 Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', trackingId);
    
    // 存储到全局变量
    window.gtag = gtag;
}

// 如果你有 Google Analytics ID，取消注释下面这行并填入你的ID
// initGoogleAnalytics('GA_MEASUREMENT_ID');