package com.formfit

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // 1. Enable Edge-to-Edge (Immersive) Design
        // This allows the app to draw behind the system bars, matching the web app's design.
        WindowCompat.setDecorFitsSystemWindows(window, false)
        
        webView = WebView(this)
        setContentView(webView)

        setupWebView()
        
        // 2. Load the Application
        // Option A: If hosting remotely
        // webView.loadUrl("https://your-formfit-deploy.vercel.app") 
        
        // Option B: If bundling local assets (copy build/ to android/src/main/assets/)
        webView.loadUrl("file:///android_asset/index.html")
    }

    private fun setupWebView() {
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true // Critical: Enables localStorage for saving User Profile & Logs
            databaseEnabled = true
            useWideViewPort = true
            loadWithOverviewMode = true
            
            // Performance optimizations
            cacheMode = WebSettings.LOAD_DEFAULT
            setRenderPriority(WebSettings.RenderPriority.HIGH)
        }
        
        // Keep navigation inside the app (don't open Chrome)
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                return false
            }
        }
    }

    // Handle the Android "Back" button to navigate browser history instead of closing app
    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}