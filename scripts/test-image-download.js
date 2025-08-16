#!/usr/bin/env node

/**
 * Test Image Download with Enhanced Hotlink Protection Bypass
 * Usage: node scripts/test-image-download.js
 */

const { downloadImage } = require('./smart-image-downloader.js');

async function testDownload() {
  console.log('🧪 Testing Enhanced Image Download Methods...\n');
  
  // Test URLs from different retailers
  const testUrls = [
    {
      name: 'Douglas Image',
      url: 'https://media.douglas.nl/medias/diyfeq1224701-0-dgl-NL.jpg?grid=true',
      filename: 'test-douglas.jpg'
    },
    {
      name: 'ICI Paris Image',
      url: 'https://www.iciparisxl.nl/medias/prd-front-1090394-201x201.jpg?context=bWFzdGVyfHByZC1pbWFnZXN8MjU3Mzh8aW1hZ2UvanBlZ3xhRFk0TDJobE1pOHhNVEEzT0RVeU1qWXpOREkzTUM5d2NtUXRabkp2Ym5RdE1UQTVNRE01TkY4eU1ERjRNakF4TG1wd1p3fGVmOTk1MDhkYmEzNWZiM2NhMDJhMzYwMDAxNmU0ZGJjMTc1NmRlMjhkYWIwNDNmZDI3ZThkNDM3MmFiYzNlODc',
      filename: 'test-iciparis.jpg'
    }
  ];
  
  let successCount = 0;
  
  for (const test of testUrls) {
    console.log(`📥 Testing: ${test.name}`);
    console.log(`🔗 URL: ${test.url.substring(0, 80)}...`);
    
    try {
      const result = await downloadImage(test.url, test.filename);
      if (result) {
        console.log(`✅ SUCCESS: ${test.name} downloaded!\n`);
        successCount++;
      } else {
        console.log(`❌ FAILED: ${test.name} could not be downloaded\n`);
      }
    } catch (error) {
      console.log(`❌ ERROR: ${test.name} - ${error.message}\n`);
    }
    
    // Delay between tests
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  console.log(`📊 Test Results: ${successCount}/${testUrls.length} images downloaded successfully`);
  
  if (successCount > 0) {
    console.log(`\n🎉 Success! Enhanced methods are working. You can now run:`);
    console.log(`   node scripts/smart-image-downloader.js`);
  } else {
    console.log(`\n💡 If tests still fail, try these additional strategies:`);
    console.log(`   1. Use a VPN to change your IP location`);
    console.log(`   2. Contact retailers for official image feeds`);
    console.log(`   3. Use a proxy service`);
    console.log(`   4. Manual browser automation with different user agents`);
  }
}

if (require.main === module) {
  testDownload().catch(console.error);
}

module.exports = { testDownload };
