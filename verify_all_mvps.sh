#!/bin/bash

echo "========================================="
echo "验证所有9个MVP项目"
echo "========================================="
echo ""

projects=(
  "health-management-app"
  "video-editor-app"
  "pet-health-app"
  "style-ai-app"
  "job-ai-app"
  "dating-ai-app"
  "visa-helper-app"
  "traffic-monetization-app"
  "vocal-coaching-app"
)

success=0
failed=0

for project in "${projects[@]}"; do
  echo "检查项目: $project"
  if [ -d "mvp/$project" ]; then
    echo "  ✅ 目录存在"
    if [ -f "mvp/$project/package.json" ]; then
      echo "  ✅ package.json存在"
      if [ -f "mvp/$project/README.md" ]; then
        echo "  ✅ README.md存在"
        ((success++))
      else
        echo "  ❌ README.md缺失"
        ((failed++))
      fi
    else
      echo "  ❌ package.json缺失"
      ((failed++))
    fi
  else
    echo "  ❌ 目录不存在"
    ((failed++))
  fi
  echo ""
done

echo "========================================="
echo "验证结果"
echo "========================================="
echo "成功: $success/9"
echo "失败: $failed/9"
echo ""

if [ $success -eq 9 ]; then
  echo "🎉 所有9个MVP项目验证通过！"
  exit 0
else
  echo "⚠️  部分项目验证失败"
  exit 1
fi
