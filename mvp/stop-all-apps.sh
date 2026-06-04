#!/bin/bash

# 停止所有MVP应用

echo "正在停止所有MVP应用..."
echo ""

# 停止所有tmux会话
tmux kill-session -t health-app 2>/dev/null && echo "✓ 已停止健康管理应用"
tmux kill-session -t video-app 2>/dev/null && echo "✓ 已停止视频剪辑工具"
tmux kill-session -t pet-app 2>/dev/null && echo "✓ 已停止宠物健康助手"
tmux kill-session -t style-app 2>/dev/null && echo "✓ 已停止AI穿搭助手"
tmux kill-session -t job-app 2>/dev/null && echo "✓ 已停止AI求职顾问"
tmux kill-session -t dating-app 2>/dev/null && echo "✓ 已停止AI缘分助手"
tmux kill-session -t visa-app 2>/dev/null && echo "✓ 已停止美签预约助手"
tmux kill-session -t traffic-app 2>/dev/null && echo "✓ 已停止流量变现工具"
tmux kill-session -t vocal-app 2>/dev/null && echo "✓ 已停止AI声乐教练"

echo ""
echo "✅ 所有应用已停止！"
