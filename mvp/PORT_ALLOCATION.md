# MVP应用端口分配表

为了方便在局域网同时运行和审查所有9个MVP应用，每个应用分配不同的端口。

## 端口分配

| 序号 | 应用名称 | 目录 | 端口 | 启动命令 |
|------|---------|------|------|----------|
| 1 | 健康管理应用 | health-management-app | 3000 | `npm run dev` |
| 2 | 视频剪辑工具 | video-editor-app | 3001 | `npm run dev -- -p 3001` |
| 3 | 宠物健康助手 | pet-health-app | 3002 | `npm run dev -- -p 3002` |
| 4 | AI穿搭助手 | style-ai-app | 3003 | `npm run dev -- -p 3003` |
| 5 | AI求职顾问 | job-ai-app | 3004 | `npm run dev -- -p 3004` |
| 6 | AI缘分助手 | dating-ai-app | 3005 | `npm run dev -- -p 3005` |
| 7 | 美签预约助手 | visa-helper-app | 3006 | `npm run dev -- -p 3006` |
| 8 | 流量变现工具 | traffic-monetization-app | 3007 | `npm run dev -- -p 3007` |
| 9 | AI声乐教练 | vocal-coaching-app | 3008 | `npm run dev -- -p 3008` |

## 快速启动所有应用

### Windows (PowerShell)

```powershell
# 启动所有9个应用
cd D:\Projects\ai_entrepreneur\mvp

# 窗口1 - 健康管理
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd health-management-app; npm run dev"

# 窗口2 - 视频剪辑
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd video-editor-app; npm run dev -- -p 3001"

# 窗口3 - 宠物健康
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd pet-health-app; npm run dev -- -p 3002"

# 窗口4 - AI穿搭
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd style-ai-app; npm run dev -- -p 3003"

# 窗口5 - AI求职
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd job-ai-app; npm run dev -- -p 3004"

# 窗口6 - AI缘分
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd dating-ai-app; npm run dev -- -p 3005"

# 窗口7 - 美签预约
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd visa-helper-app; npm run dev -- -p 3006"

# 窗口8 - 流量变现
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd traffic-monetization-app; npm run dev -- -p 3007"

# 窗口9 - AI声乐
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd vocal-coaching-app; npm run dev -- -p 3008"
```

### Linux/Mac (Bash)

```bash
#!/bin/bash
cd /d/Projects/ai_entrepreneur/mvp

# 使用tmux或screen启动多个会话
tmux new-session -d -s health "cd health-management-app && npm run dev"
tmux new-session -d -s video "cd video-editor-app && npm run dev -- -p 3001"
tmux new-session -d -s pet "cd pet-health-app && npm run dev -- -p 3002"
tmux new-session -d -s style "cd style-ai-app && npm run dev -- -p 3003"
tmux new-session -d -s job "cd job-ai-app && npm run dev -- -p 3004"
tmux new-session -d -s dating "cd dating-ai-app && npm run dev -- -p 3005"
tmux new-session -d -s visa "cd visa-helper-app && npm run dev -- -p 3006"
tmux new-session -d -s traffic "cd traffic-monetization-app && npm run dev -- -p 3007"
tmux new-session -d -s vocal "cd vocal-coaching-app && npm run dev -- -p 3008"

echo "所有应用已启动！"
echo "使用 tmux attach -t <name> 连接到指定会话"
echo "使用 tmux ls 查看所有会话"
```

## 访问URL

- 健康管理: http://localhost:3000
- 视频剪辑: http://localhost:3001
- 宠物健康: http://localhost:3002
- AI穿搭: http://localhost:3003
- AI求职: http://localhost:3004
- AI缘分: http://localhost:3005
- 美签预约: http://localhost:3006
- 流量变现: http://localhost:3007
- AI声乐: http://localhost:3008

## 局域网访问

将 `localhost` 替换为你的局域网IP地址，例如：
- http://192.168.1.100:3000
- http://192.168.1.100:3001
- ...

获取IP地址：
- Windows: `ipconfig`
- Linux/Mac: `ifconfig` 或 `ip addr`

## 进程管理

### 查看端口占用

```bash
# Windows
netstat -ano | findstr "300[0-8]"

# Linux/Mac
lsof -i :3000-3008
```

### 终止进程

```bash
# Windows (根据PID)
taskkill /PID <PID> /F

# Linux/Mac
kill -9 <PID>
```

### 终止所有Node进程

```bash
# Windows
taskkill /F /IM node.exe

# Linux/Mac
pkill -9 node
```

## 使用PM2管理（推荐）

PM2可以更方便地管理多个Node.js进程：

```bash
# 安装PM2
npm install -g pm2

# 启动所有应用
pm2 start ecosystem.config.js

# 查看状态
pm2 status

# 查看日志
pm2 logs

# 停止所有
pm2 stop all

# 重启所有
pm2 restart all
```

### ecosystem.config.js 示例

```javascript
module.exports = {
  apps: [
    { name: 'health', cwd: './health-management-app', script: 'npm', args: 'run dev', env: { PORT: 3000 } },
    { name: 'video', cwd: './video-editor-app', script: 'npm', args: 'run dev -- -p 3001' },
    { name: 'pet', cwd: './pet-health-app', script: 'npm', args: 'run dev -- -p 3002' },
    { name: 'style', cwd: './style-ai-app', script: 'npm', args: 'run dev -- -p 3003' },
    { name: 'job', cwd: './job-ai-app', script: 'npm', args: 'run dev -- -p 3004' },
    { name: 'dating', cwd: './dating-ai-app', script: 'npm', args: 'run dev -- -p 3005' },
    { name: 'visa', cwd: './visa-helper-app', script: 'npm', args: 'run dev -- -p 3006' },
    { name: 'traffic', cwd: './traffic-monetization-app', script: 'npm', args: 'run dev -- -p 3007' },
    { name: 'vocal', cwd: './vocal-coaching-app', script: 'npm', args: 'run dev -- -p 3008' }
  ]
};
```

## 注意事项

1. **端口占用检查**：启动前确保端口未被占用
2. **防火墙设置**：如需局域网访问，确保防火墙允许对应端口
3. **内存占用**：同时运行9个应用可能占用较多内存（约2-4GB）
4. **自动重启**：使用PM2可以实现崩溃自动重启
5. **日志管理**：定期清理日志文件避免磁盘占满

## 开发建议

- 开发时只启动需要测试的1-2个应用
- 审查时使用脚本批量启动所有应用
- 使用PM2或tmux进行统一管理
- 配置好.env文件避免配置冲突
