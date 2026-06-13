# AI创业工作区

AI创业团队的主仓库，包含共享文档、调研资料和会议纪要。

## 📋 项目概述

这是一个AI创业团队的workspace，我们正在探索和开发多个AI创业idea。每个idea有独立的GitHub repo和Multica project进行管理。

## 🎯 活跃项目

我们目前正在推进以下5个项目：

1. **[AI求职顾问](https://github.com/Candlend/ai-job-advisor)** 💼
   - 简历优化 + 模拟面试服务
   - 状态：Amazing Prototype阶段 - 用户访谈中

2. **[减肥健康管理应用（瘦享AI）](https://github.com/Candlend/weight-loss-ai)** 🏃
   - AI减肥教练 + 饮食管理
   - 状态：MVP开发中

3. **[全自动视频剪辑工具](https://github.com/Candlend/video-editing-ai)** 🎬
   - 游戏高光自动识别与剪辑
   - 状态：Blocked - 等待市场验证

4. **[AI声乐指导](https://github.com/Candlend/vocal-coach-ai)** 🎤
   - 智能声乐训练平台
   - 状态：Amazing Prototype阶段 - 需求验证中

5. **[宠物健康管理](https://github.com/Candlend/pet-health-ai)** 🐾
   - 宠物健康信息聚合与智能诊断
   - 状态：Amazing Prototype阶段 - 手动服务验证中

## 📁 仓库结构

```
ai_entrepreneur/
├── README.md                    # 本文件
├── CLAUDE.md                    # Agent指令和工作机制
├── docs/                        # 共享文档
│   ├── agents/                  # Agent使用文档
│   ├── squads/                  # Squad配置文档
│   └── workflows/               # 工作流文档
├── research/                    # 共享调研资料
│   ├── idea_analysis/           # 9个idea的对比分析
│   └── video_analysis/          # AI创业视频分析
├── meetings/                    # 会议纪要
└── shared/                      # 共享代码配置

# 每个idea有独立的repo：
# Candlend/ai-job-advisor
# Candlend/weight-loss-ai
# Candlend/video-editing-ai
# Candlend/vocal-coach-ai
# Candlend/pet-health-ai
```

## 🚀 快速开始

### 查看项目进度
访问 [Multica Workspace](https://multica.ai/workspace) 查看所有项目的实时进度。

### 参与开发
1. Clone对应项目的repo
2. 查看该项目的README了解当前状态
3. 在Multica中查看分配给你的issues

### 添加新Idea
1. 创建新的private GitHub repo
2. 在Multica中创建新project
3. 添加project resource指向GitHub repo
4. 创建Amazing Prototype研究计划issue

## 📚 文档资源

### 核心文档
- **[综合对比分析报告](research/idea_analysis/00-综合对比与优先级排序.md)** - 9个idea的详细对比
- **[CLAUDE.md](CLAUDE.md)** - Agent工作机制和全局规则

### 调研资料
- [9个软件创业Idea深度分析](research/idea_analysis/20260602_九个软件创业Idea深度分析报告.md)
- [AI创业视频综合分析](research/video_analysis/AI创业视频综合分析报告.md)

### 会议纪要
- [20260602 会议纪要](meetings/20260602_summary.md)
- [20260529 会议纪要](meetings/20260529_summary.md)

## 👥 团队组织

### Squads
- **产品小队**：产品规划、市场分析、技术决策
- **开发小队**：架构设计、代码实现、UI设计
- **上线小队**：部署上线、质量保证、文档维护

### Agents
- CEO：全局战略决策、项目审核、资源调度
- 产品经理：产品规划和需求管理
- 技术架构师：技术方案设计
- UI设计师：界面设计和用户体验
- 质量工程师：测试和质量保证
- 市场调研分析师：市场调研和数据分析
- ...（更多agent见Multica workspace）

## 📋 工作流程

### 全局机制：AI与人类任务并行执行
- **AI任务**：立即开始，不等待人类
- **人类任务**：并行进行，用于验证和优化
- **模拟数据使用**：AI可以用模拟数据先行，等真实数据出来后再迭代
- **文档最小化**：机制内置在agent指令里，避免冗余文档

详见 [CLAUDE.md](CLAUDE.md) 中的全局机制说明。

### 文件管理规则
1. **代码项目** → 必须放在对应idea的GitHub repo
2. **单个idea专属文档** → 放该idea的repo的`docs/`目录
3. **workspace共享文档** → 放本repo（ai_entrepreneur）
4. **临时讨论/附件** → 使用`multica issue comment add --attachment`
5. **严禁引用本地路径**（如`C:\...`, `file:///`）

## 🔄 最近更新

### 2026-06-13
- ✅ 完成workspace重构
- ✅ 创建5个独立GitHub repos
- ✅ 创建5个独立Multica projects
- ✅ 迁移所有issues到对应项目
- ✅ 清理autopilot临时issues

### 2026-06-12
- ✅ 建立AI与人类任务并行执行机制
- ✅ 减肥健康管理应用 Landing Page上线

### 2026-06-10
- ✅ 启动Amazing Prototype研究计划
- ✅ 9个idea深度分析完成

## 🎯 当前优先级

### P0（紧急）
- [CAN-67] Workspace重构执行

### P1（高优先级）
- AI求职顾问 - 用户访谈与付费意愿测试
- 减肥健康管理应用 - MVP开发
- 宠物健康管理 - 手动服务验证

### P2（中优先级）
- AI声乐指导 - 用户需求验证
- 全自动视频剪辑工具 - 市场调研

## 📞 联系方式

- **Workspace Owner**: candlend@outlook.com
- **Multica Workspace**: https://multica.ai/workspace

---

**记住：行动 > 完美计划。选择一个方向，立即开始！**

**项目启动日期**：2026年5月29日  
**最后更新**：2026年6月13日
