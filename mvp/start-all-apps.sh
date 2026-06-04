#!/bin/bash

# 启动所有9个MVP应用
# 使用tmux在后台运行

MVP_PATH="/d/Projects/ai_entrepreneur/mvp"
cd "$MVP_PATH"

echo "正在启动所有9个MVP应用..."
echo ""

# 检查tmux是否安装
if ! command -v tmux &> /dev/null; then
    echo "错误: tmux未安装，请先安装tmux"
    echo "安装命令: sudo apt-get install tmux (Ubuntu/Debian)"
    echo "         brew install tmux (Mac)"
    exit 1
fi

# 应用1 - 健康管理应用 (端口3000)
echo "[1/9] 启动健康管理应用 (http://localhost:3000)..."
tmux new-session -d -s health-app "cd $MVP_PATH/health-management-app && npm run dev"

# 应用2 - 视频剪辑工具 (端口3001)
echo "[2/9] 启动视频剪辑工具 (http://localhost:3001)..."
tmux new-session -d -s video-app "cd $MVP_PATH/video-editor-app && npm run dev -- -p 3001"

# 应用3 - 宠物健康助手 (端口3002)
echo "[3/9] 启动宠物健康助手 (http://localhost:3002)..."
tmux new-session -d -s pet-app "cd $MVP_PATH/pet-health-app && npm run dev -- -p 3002"

# 应用4 - AI穿搭助手 (端口3003)
echo "[4/9] 启动AI穿搭助手 (http://localhost:3003)..."
tmux new-session -d -s style-app "cd $MVP_PATH/style-ai-app && npm run dev -- -p 3003"

# 应用5 - AI求职顾问 (端口3004)
echo "[5/9] 启动AI求职顾问 (http://localhost:3004)..."
tmux new-session -d -s job-app "cd $MVP_PATH/job-ai-app && npm run dev -- -p 3004"

# 应用6 - AI缘分助手 (端口3005)
echo "[6/9] 启动AI缘分助手 (http://localhost:3005)..."
tmux new-session -d -s dating-app "cd $MVP_PATH/dating-ai-app && npm run dev -- -p 3005"

# 应用7 - 美签预约助手 (端口3006)
echo "[7/9] 启动美签预约助手 (http://localhost:3006)..."
tmux new-session -d -s visa-app "cd $MVP_PATH/visa-helper-app && npm run dev -- -p 3006"

# 应用8 - 流量变现工具 (端口3007)
echo "[8/9] 启动流量变现工具 (http://localhost:3007)..."
tmux new-session -d -s traffic-app "cd $MVP_PATH/traffic-monetization-app && npm run dev -- -p 3007"

# 应用9 - AI声乐教练 (端口3008)
echo "[9/9] 启动AI声乐教练 (http://localhost:3008)..."
tmux new-session -d -s vocal-app "cd $MVP_PATH/vocal-coaching-app && npm run dev -- -p 3008"

echo ""
echo "✅ 所有9个应用已启动！"
echo ""
echo "访问链接："
echo "  [1] 健康管理: http://localhost:3000"
echo "  [2] 视频剪辑: http://localhost:3001"
echo "  [3] 宠物健康: http://localhost:3002"
echo "  [4] AI穿搭: http://localhost:3003"
echo "  [5] AI求职: http://localhost:3004"
echo "  [6] AI缘分: http://localhost:3005"
echo "  [7] 美签预约: http://localhost:3006"
echo "  [8] 流量变现: http://localhost:3007"
echo "  [9] AI声乐: http://localhost:3008"
echo ""
echo "查看tmux会话列表: tmux ls"
echo "连接到会话: tmux attach -t <session-name>"
echo "停止所有应用: ./stop-all-apps.sh"
