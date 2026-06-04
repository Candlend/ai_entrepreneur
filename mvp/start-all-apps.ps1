# 启动所有9个MVP应用
# 每个应用会在新的PowerShell窗口中运行

$mvpPath = "D:\Projects\ai_entrepreneur\mvp"
cd $mvpPath

Write-Host "正在启动所有9个MVP应用..." -ForegroundColor Green
Write-Host ""

# 应用1 - 健康管理应用 (端口3000)
Write-Host "[1/9] 启动健康管理应用 (http://localhost:3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$mvpPath\health-management-app'; Write-Host '健康管理应用 - 端口3000' -ForegroundColor Cyan; npm run dev"
Start-Sleep -Seconds 1

# 应用2 - 视频剪辑工具 (端口3001)
Write-Host "[2/9] 启动视频剪辑工具 (http://localhost:3001)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$mvpPath\video-editor-app'; Write-Host '视频剪辑工具 - 端口3001' -ForegroundColor Cyan; npm run dev -- -p 3001"
Start-Sleep -Seconds 1

# 应用3 - 宠物健康助手 (端口3002)
Write-Host "[3/9] 启动宠物健康助手 (http://localhost:3002)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$mvpPath\pet-health-app'; Write-Host '宠物健康助手 - 端口3002' -ForegroundColor Cyan; npm run dev -- -p 3002"
Start-Sleep -Seconds 1

# 应用4 - AI穿搭助手 (端口3003)
Write-Host "[4/9] 启动AI穿搭助手 (http://localhost:3003)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$mvpPath\style-ai-app'; Write-Host 'AI穿搭助手 - 端口3003' -ForegroundColor Cyan; npm run dev -- -p 3003"
Start-Sleep -Seconds 1

# 应用5 - AI求职顾问 (端口3004)
Write-Host "[5/9] 启动AI求职顾问 (http://localhost:3004)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$mvpPath\job-ai-app'; Write-Host 'AI求职顾问 - 端口3004' -ForegroundColor Cyan; npm run dev -- -p 3004"
Start-Sleep -Seconds 1

# 应用6 - AI缘分助手 (端口3005)
Write-Host "[6/9] 启动AI缘分助手 (http://localhost:3005)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$mvpPath\dating-ai-app'; Write-Host 'AI缘分助手 - 端口3005' -ForegroundColor Cyan; npm run dev -- -p 3005"
Start-Sleep -Seconds 1

# 应用7 - 美签预约助手 (端口3006)
Write-Host "[7/9] 启动美签预约助手 (http://localhost:3006)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$mvpPath\visa-helper-app'; Write-Host '美签预约助手 - 端口3006' -ForegroundColor Cyan; npm run dev -- -p 3006"
Start-Sleep -Seconds 1

# 应用8 - 流量变现工具 (端口3007)
Write-Host "[8/9] 启动流量变现工具 (http://localhost:3007)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$mvpPath\traffic-monetization-app'; Write-Host '流量变现工具 - 端口3007' -ForegroundColor Cyan; npm run dev -- -p 3007"
Start-Sleep -Seconds 1

# 应用9 - AI声乐教练 (端口3008)
Write-Host "[9/9] 启动AI声乐教练 (http://localhost:3008)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$mvpPath\vocal-coaching-app'; Write-Host 'AI声乐教练 - 端口3008' -ForegroundColor Cyan; npm run dev -- -p 3008"

Write-Host ""
Write-Host "✅ 所有9个应用已启动！" -ForegroundColor Green
Write-Host ""
Write-Host "访问链接：" -ForegroundColor Cyan
Write-Host "  [1] 健康管理: http://localhost:3000"
Write-Host "  [2] 视频剪辑: http://localhost:3001"
Write-Host "  [3] 宠物健康: http://localhost:3002"
Write-Host "  [4] AI穿搭: http://localhost:3003"
Write-Host "  [5] AI求职: http://localhost:3004"
Write-Host "  [6] AI缘分: http://localhost:3005"
Write-Host "  [7] 美签预约: http://localhost:3006"
Write-Host "  [8] 流量变现: http://localhost:3007"
Write-Host "  [9] AI声乐: http://localhost:3008"
Write-Host ""
Write-Host "按任意键关闭此窗口..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
