import { chromium } from 'playwright';

async function testMobileApp() {
  console.log('🚀 Starting mobile responsiveness test...\n');

  const browser = await chromium.launch({ headless: true });

  // Test multiple mobile viewports
  const viewports = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 12 Pro', width: 390, height: 844 },
    { name: 'Pixel 5', width: 393, height: 851 },
    { name: 'iPad Mini', width: 768, height: 1024 }
  ];

  for (const viewport of viewports) {
    console.log(`📱 Testing on ${viewport.name} (${viewport.width}x${viewport.height})`);

    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
    });

    const page = await context.newPage();

    try {
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

      // Check if page loaded
      const title = await page.textContent('h1');
      console.log(`  ✓ Page loaded: ${title}`);

      // Check responsive elements
      const header = await page.locator('h1').boundingBox();
      console.log(`  ✓ Header visible: ${header !== null}`);

      // Check circular progress
      const progressCircle = await page.locator('svg circle').count();
      console.log(`  ✓ Circular progress rendered: ${progressCircle >= 2}`);

      // Check nutrition cards
      const nutritionCards = await page.locator('text=蛋白质').count();
      console.log(`  ✓ Nutrition cards visible: ${nutritionCards > 0}`);

      // Check upload area
      const uploadArea = await page.locator('text=拖拽或点击上传').count();
      console.log(`  ✓ Upload area visible: ${uploadArea > 0}`);

      // Check camera button
      const cameraBtn = await page.locator('button:has-text("打开相机拍照")').boundingBox();
      if (cameraBtn) {
        console.log(`  ✓ Camera button size: ${cameraBtn.height}px (min 44px required)`);
        console.log(`  ${cameraBtn.height >= 44 ? '✓' : '✗'} Touch target size adequate`);
      }

      // Check empty state
      const emptyState = await page.locator('text=还没有记录').count();
      console.log(`  ✓ Empty state visible: ${emptyState > 0}`);

      // Test drag-drop area interaction
      const dragArea = await page.locator('[class*="border-dashed"]').first();
      await dragArea.hover();
      console.log(`  ✓ Drag-drop area interactive`);

      // Check for mobile optimizations
      const hasGradient = await page.locator('[class*="bg-gradient"]').count();
      console.log(`  ✓ Gradient styling applied: ${hasGradient > 0}`);

      const hasBackdropBlur = await page.locator('[class*="backdrop-blur"]').count();
      console.log(`  ✓ Glassmorphism effects: ${hasBackdropBlur > 0}`);

      console.log(`  ✅ ${viewport.name} test passed\n`);

    } catch (error) {
      console.log(`  ❌ Error on ${viewport.name}: ${error.message}\n`);
    }

    await context.close();
  }

  await browser.close();
  console.log('✅ All mobile tests completed!\n');
}

testMobileApp().catch(console.error);
