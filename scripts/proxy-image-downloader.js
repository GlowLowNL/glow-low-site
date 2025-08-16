#!/usr/bin/env node

/**
 * Advanced Image Download with Proxy Support
 * Usage: node scripts/proxy-image-downloader.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Free proxy list (you can add more)
const PROXY_LIST = [
  // Add proxies here if needed
  // 'http://proxy1:port',
  // 'http://proxy2:port',
];

async function downloadWithTor(url, filename) {
  // Use Tor for anonymous downloads (requires Tor to be installed)
  try {
    const filePath = path.join(__dirname, '../public/images/products', filename);
    const command = `curl --socks5-hostname 127.0.0.1:9050 -s -L --max-time 30 -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${url}" -o "${filePath}"`;
    
    await execAsync(command);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size > 1000) {
        console.log(`✅ Downloaded via Tor: ${filename}`);
        return filePath;
      }
    }
    return null;
  } catch (error) {
    console.log(`❌ Tor download failed: ${error.message}`);
    return null;
  }
}

async function downloadWithCloudflareWorker(url, filename) {
  // Use a Cloudflare Worker as a proxy
  try {
    const workerUrl = `https://your-worker.your-subdomain.workers.dev/?url=${encodeURIComponent(url)}`;
    // You would need to deploy a simple Cloudflare Worker for this
    const response = await fetch(workerUrl);
    
    if (response.ok) {
      const buffer = await response.arrayBuffer();
      const filePath = path.join(__dirname, '../public/images/products', filename);
      fs.writeFileSync(filePath, Buffer.from(buffer));
      
      const stats = fs.statSync(filePath);
      if (stats.size > 1000) {
        console.log(`✅ Downloaded via Cloudflare Worker: ${filename}`);
        return filePath;
      }
    }
    return null;
  } catch (error) {
    console.log(`❌ Cloudflare Worker download failed: ${error.message}`);
    return null;
  }
}

async function downloadViaScreenshot(url, filename) {
  // Take a screenshot of the image (requires puppeteer)
  try {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Set viewport for image
    await page.setViewport({ width: 800, height: 800 });
    
    // Navigate directly to image
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Take screenshot
    const filePath = path.join(__dirname, '../public/images/products', filename.replace(/\.(jpg|png)$/i, '.png'));
    await page.screenshot({ path: filePath, fullPage: true });
    
    await browser.close();
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size > 1000) {
        console.log(`✅ Downloaded via screenshot: ${filename}`);
        return filePath;
      }
    }
    return null;
  } catch (error) {
    console.log(`❌ Screenshot download failed: ${error.message}`);
    return null;
  }
}

module.exports = {
  downloadWithTor,
  downloadWithCloudflareWorker,
  downloadViaScreenshot
};
