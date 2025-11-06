package com.example.controldwebapp

import android.annotation.SuppressLint
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.webkit.CookieManager
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var swipeRefreshLayout: SwipeRefreshLayout
    private var swipeCount = 0
    private val handler = Handler(Looper.getMainLooper())
    private val SWIPE_RESET_DELAY = 2000L // 2 segundos para resetear el contador
    private val REQUIRED_SWIPES = 2 // Número de swipes requeridos para refrescar

    private val resetSwipeCountRunnable = Runnable {
        swipeCount = 0
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webView)
        swipeRefreshLayout = findViewById(R.id.swipeRefreshLayout)

        // Configurar SwipeRefreshLayout
        swipeRefreshLayout.setOnRefreshListener {
            swipeCount++

            // Cancelar el reset anterior si existe
            handler.removeCallbacks(resetSwipeCountRunnable)

            if (swipeCount >= REQUIRED_SWIPES) {
                // Segunda vez - refrescar la página
                webView.reload()
                Toast.makeText(
                    this,
                    "🔄 Refrescando página...",
                    Toast.LENGTH_SHORT
                ).show()
                swipeCount = 0
            } else {
                // Primera vez - mostrar mensaje indicando que se necesita otro swipe
                val swipesRemaining = REQUIRED_SWIPES - swipeCount
                Toast.makeText(
                    this,
                    "⬇️ Desliza hacia abajo $swipesRemaining vez más para refrescar",
                    Toast.LENGTH_SHORT
                ).show()
                swipeRefreshLayout.isRefreshing = false

                // Resetear el contador después del tiempo especificado si no se vuelve a deslizar
                handler.postDelayed(resetSwipeCountRunnable, SWIPE_RESET_DELAY)
            }
        }

        // WebView settings for modern sites
        val settings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true
        settings.cacheMode = WebSettings.LOAD_DEFAULT
        settings.loadWithOverviewMode = true
        settings.useWideViewPort = true
        settings.allowFileAccess = false
        settings.mediaPlaybackRequiresUserGesture = true
        settings.javaScriptCanOpenWindowsAutomatically = true
        settings.mixedContentMode = WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE

        CookieManager.getInstance().setAcceptCookie(true)
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true)

        webView.webChromeClient = WebChromeClient()
        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                findViewById<View>(R.id.progress)?.visibility = View.GONE
                swipeRefreshLayout.isRefreshing = false
            }
        }

        if (savedInstanceState == null) {
            webView.loadUrl("https://controld.com/")
        }

        // Back navigation inside WebView
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) webView.goBack() else finish()
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

    override fun onDestroy() {
        super.onDestroy()
        handler.removeCallbacks(resetSwipeCountRunnable)
    }
}

