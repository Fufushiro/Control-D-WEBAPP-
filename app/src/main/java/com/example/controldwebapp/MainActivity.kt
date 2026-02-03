package com.example.controldwebapp

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.View
import android.webkit.CookieManager
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webView)
        configureWebView()
        setupWebViewClient()
        setupNavigation()

        if (savedInstanceState == null) {
            webView.loadUrl("https://controld.com/")
        } else {
            webView.restoreState(savedInstanceState)
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun configureWebView() {
        val settings = webView.settings
        
        // Core functionality
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true
        settings.cacheMode = WebSettings.LOAD_DEFAULT
        
        // UI adaptability
        settings.loadWithOverviewMode = true
        settings.useWideViewPort = true
        
        // Security: restrict file access
        settings.allowFileAccess = false
        settings.allowContentAccess = false
        
        // Mixed content for HTTPS compatibility
        settings.mixedContentMode = WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE
        
        // User interaction required for media
        settings.mediaPlaybackRequiresUserGesture = true
        
        // Privacy: minimize feature exposure
        // Disable automatic opening of windows (reduces fingerprinting)
        settings.javaScriptCanOpenWindowsAutomatically = false
        
        // Note: geolocationEnabled is deprecated in modern Android APIs
        // Geolocation is now controlled via Android permissions and WebChromeClient callbacks

        // Cookie management for session persistence
        CookieManager.getInstance().apply {
            setAcceptCookie(true)
            setAcceptThirdPartyCookies(webView, true)
        }
    }

    private fun setupWebViewClient() {
        webView.webChromeClient = WebChromeClient()
        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                findViewById<View>(R.id.progress)?.visibility = View.GONE
                // Inject defensive CSS/JS after page load
                injectPrivacyAndPerformanceEnhancements()
            }
        }
    }

    private fun injectPrivacyAndPerformanceEnhancements() {
        // Inject CSS to reduce layout shifts and smooth scrolling
        val defensiveCSS = """
            (function() {
                const style = document.createElement('style');
                style.textContent = `
                    * { 
                        animation-duration: 0s !important; 
                        animation-delay: 0s !important; 
                        transition-duration: 0s !important;
                        transition-delay: 0s !important;
                    }
                    html, body { 
                        overflow-y: scroll; 
                        scroll-behavior: auto !important;
                    }
                    body { 
                        margin: 0; 
                        padding: 0; 
                        user-select: none; 
                        -webkit-user-select: none;
                        -webkit-touch-callout: none;
                    }
                `;
                document.head.appendChild(style);
                
                // Disable pull-to-refresh by preventing overscroll behavior
                document.addEventListener('touchmove', function(e) {
                    if (e.touches.length > 1) {
                        e.preventDefault();
                    }
                }, { passive: false });
                
                // Disable refresh gestures (Ctrl+R, Cmd+R, etc.)
                document.addEventListener('keydown', function(e) {
                    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
                        e.preventDefault();
                        return false;
                    }
                });
                
                // Disable F5 and other refresh shortcuts
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'F5' || e.key === 'F12') {
                        e.preventDefault();
                        return false;
                    }
                });
                
                // Limit MutationObserver spam
                const originalObserve = MutationObserver.prototype.observe;
                let observerCount = 0;
                const MAX_OBSERVERS = 10;
                MutationObserver.prototype.observe = function(target, options) {
                    if (observerCount < MAX_OBSERVERS) {
                        observerCount++;
                        return originalObserve.call(this, target, options);
                    }
                    return undefined;
                };
            })();
        """.trimIndent()
        
        webView.evaluateJavascript(defensiveCSS, null)
    }

    private fun setupNavigation() {
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    finish()
                }
            }
        })
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        webView.saveState(outState)
    }

    override fun onRestoreInstanceState(savedInstanceState: Bundle) {
        super.onRestoreInstanceState(savedInstanceState)
        webView.restoreState(savedInstanceState)
    }
}

