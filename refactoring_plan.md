# Workspace重构方案：分项目管理issues和代码

## 📊 现状分析

### 当前存在的问题

1. **Issues混乱**：
   - 50个issues中，33个堆在同一个`ai_entrepreneur`项目下
   - 15个issues没有归属任何项目（project_id为null）
   - 包含9个不同的创业idea，但都混在一个项目里
   - 有些issues已完成但状态标记错误
   - 有重复的autopilot触发issues（如多个"PR 自动测试"、"PR 自动审查"）

2. **代码仓库混乱**：
   - 只有一个GitHub repo：`Candlend/ai_entrepreneur`
   - 根目录下直接放了`landing-page`（应该是减肥健康管理应用的）
   - 不同idea的代码混在一起
   - 无法独立管理各个idea的代码版本

3. **项目管理混乱**：
   - 仅有2个项目：`ai_entrepreneur`（37个issues）和`会议纪要`（2个issues）
   - 9个创业idea无法独立跟踪进度
   - 资源（代码、文档）无法按项目隔离

4. **文件管理问题**：
   - 研究文档、会议纪要都放在同一个repo根目录
   - 无法区分哪些文件属于哪个idea

### 9个创业Idea识别

基于issues分析，当前workspace包含以下9个idea：

1. **AI求职顾问与模拟面试**（in_progress）- 有Landing Page
2. **减肥健康管理应用**（in_progress）- 有Landing Page和MVP开发
3. **全自动视频剪辑工具**（blocked）
4. **AI声乐指导与学歌教培**（backlog）
5. **宠物健康管理应用**（in_progress）
6. **AI P图与穿搭推荐**（backlog）
7. **留学生抢美签服务**（backlog）
8. **流量变现平台**（todo）
9. **AI交友与Dating平台**（backlog）

## 🎯 重构目标

1. **一个idea = 一个GitHub repo + 一个Multica project**
2. **清晰的文件管理**：只用GitHub repo和Multica attachment
3. **共享内容集中管理**：workspace级别的共享信息放在ai_entrepreneur repo
4. **自动化issues归档**：autopilot触发的临时issues自动清理

## 📐 新架构设计

### 1. GitHub Repos结构

```
Candlend/ai_entrepreneur (主repo - 保留)
├── README.md                    # workspace总览
├── CLAUDE.md                    # Agent指令（全局机制）
├── docs/                        # 共享文档
│   ├── agents/                  # Agent使用文档
│   ├── squads/                  # Squad配置文档
│   └── workflows/               # 工作流文档
├── research/                    # 共享调研（跨idea的对比分析）
│   ├── idea_analysis/           # 9个idea的对比分析
│   └── video_analysis/          # AI创业视频分析
└── meetings/                    # 会议纪要

Candlend/ai-job-advisor (新建 - private)
├── README.md
├── frontend/                    # Landing Page + 后续MVP
├── backend/
└── docs/

Candlend/weight-loss-ai (新建 - private)
├── README.md
├── frontend/                    # 瘦享AI - Landing Page
├── backend/
└── docs/

Candlend/video-editing-ai (新建 - private)
├── README.md
├── frontend/
├── backend/
└── docs/

Candlend/vocal-coach-ai (新建 - private)
├── README.md
├── frontend/
├── backend/
└── docs/

Candlend/pet-health-ai (新建 - private)
├── README.md
├── frontend/
├── backend/
└── docs/

# 其余4个idea（P图穿搭、抢美签、流量变现、交友）暂不创建repo
# 等进入MVP开发阶段再创建
```

### 2. Multica Projects结构

```
会议纪要 (保留)
├── 20260529 会议纪要
└── 20260602 会议纪要

ai_entrepreneur (重构 - 仅放workspace共享issues)
├── 建立全局机制：AI 与人类任务并行执行
├── 建立 Agent 工作真实性验证机制
├── 更新所有 Agent 的 Instructions
└── (其他workspace级别的改进issues)

AI求职顾问 (新建)
├── AI求职顾问与模拟面试 - Amazing Prototype研究计划
├── AI求职顾问 - 用户访谈与问题验证
├── 手动服务验证：AI求职顾问付费意愿测试
└── ... (所有相关sub-issues)

减肥健康管理应用 (新建)
├── 减肥健康管理应用 - Amazing Prototype研究计划
├── Landing Page：产品概念与预订单
├── MVP开发：减肥健康管理应用（瘦享AI）
├── 手动验证：AI减肥教练服务
└── ... (所有相关sub-issues)

全自动视频剪辑工具 (新建)
├── 全自动视频剪辑工具 - Amazing Prototype研究计划
├── MVP 构建 - 全自动视频剪辑工具
├── UI/UX设计 - 游戏高光剪辑工具界面
└── ... (所有相关sub-issues)

AI声乐指导 (新建)
├── AI声乐指导与学歌教培 - Amazing Prototype研究计划
└── ... (所有相关sub-issues)

宠物健康管理 (新建)
├── 宠物健康管理应用 - Amazing Prototype研究计划
└── ... (所有相关sub-issues)

# 其余4个idea暂不创建project
# 等开始Amazing Prototype研究时再创建
```

### 3. 文件管理规范

**强制规则**：

1. **代码项目** → 必须放在GitHub repo
2. **文档/调研/会议纪要** → 根据性质选择：
   - 单个idea专属 → 放该idea的GitHub repo的`docs/`目录
   - workspace共享 → 放`ai_entrepreneur` repo
   - 临时讨论/附件 → 用`multica issue comment add --attachment`
3. **严禁在issue中引用本地路径**（如`C:\...`, `file:///`）
4. **引用文件** → 用GitHub URL或说明"见附件"

### 4. Autopilot Issues管理

**问题**：autopilot触发的issues堆积（如"PR 自动测试"有3个done状态的）

**解决方案**：
- Autopilot配置使用`run_only`模式（不创建issue）
- 或在autopilot指令中添加自动归档逻辑
- 手动清理当前已完成的autopilot issues

## 🚀 分步执行计划

### Phase 1: 准备阶段（立即执行）

**任务1.1：创建5个新GitHub repos**
- 创建private repos：ai-job-advisor, weight-loss-ai, video-editing-ai, vocal-coach-ai, pet-health-ai
- 每个repo包含基础README和目录结构
- 设置branch protection rules（main分支）

**任务1.2：重构ai_entrepreneur repo**
- 移除`landing-page/`目录（将迁移到weight-loss-ai）
- 清理根目录，只保留：README, CLAUDE.md, docs/, research/, meetings/, shared/
- 更新README，说明新的workspace结构

**任务1.3：创建5个新Multica Projects**
- 项目名称：AI求职顾问、减肥健康管理应用、全自动视频剪辑工具、AI声乐指导、宠物健康管理
- 设置project resources指向对应的GitHub repo

### Phase 2: Issues迁移（分批执行）

**任务2.1：迁移AI求职顾问相关issues**
- 将5个issues迁移到新project
- 更新issue描述中的文件引用（从本地路径改为GitHub URL）

**任务2.2：迁移减肥健康管理应用相关issues**
- 将7个issues迁移到新project

**任务2.3：迁移全自动视频剪辑工具相关issues**
- 将5个issues迁移到新project

**任务2.4：迁移AI声乐指导相关issues**
- 将7个issues迁移到新project

**任务2.5：迁移宠物健康管理相关issues**
- 将2个issues迁移到新project

**任务2.6：清理workspace级别issues**
- 保留在ai_entrepreneur项目的只有全局机制、agent配置等
- 删除已完成的autopilot临时issues

### Phase 3: 代码迁移（谨慎执行）

**任务3.1：迁移Landing Page到weight-loss-ai repo**
- 在weight-loss-ai repo创建frontend目录
- 将landing-page/内容复制过去
- 在ai_entrepreneur repo删除landing-page/
- 更新相关issues的代码引用

**任务3.2：更新GitHub Pages配置**
- weight-loss-ai repo配置GitHub Pages
- 更新部署文档

### Phase 4: 文档整理（收尾工作）

**任务4.1：整理research文档**
- 将idea_analysis/下各个idea的分析移到对应repo
- 保留综合对比文档在ai_entrepreneur

**任务4.2：更新所有Agent指令**
- 在CLAUDE.md中更新项目结构说明
- 各squad leader的指令中添加repo归属说明

**任务4.3：创建迁移完成报告**
- 记录哪些issues迁移到哪个project
- 记录哪些文件迁移到哪个repo
- 供未来参考

## ✅ 成功标准

1. ✅ 每个idea有独立的GitHub repo（至少5个）
2. ✅ 每个idea有独立的Multica project（至少5个）
3. ✅ ai_entrepreneur repo只包含共享内容
4. ✅ 所有issues都归属到正确的project
5. ✅ 没有issue引用本地文件路径
6. ✅ autopilot临时issues已清理
7. ✅ 代码目录结构清晰（每个repo独立）

## 🔄 后续优化建议

### 建议1：Autopilot配置优化
- 修改PR自动测试/审查的autopilot为`run_only`模式
- 避免创建大量临时issues

### 建议2：Project Templates
- 创建project模板，新idea快速初始化

### 建议3：Squad与Project绑定
- 考虑为每个project创建专属squad（可选）
- 或继续用当前的3个通用squad（开发、产品、上线）

### 建议4：GitHub Topics标签
- 为各repo添加统一的topics：`ai-startup`, `multica`, `mvp`
- 方便搜索和管理

## ⚠️ 风险与注意事项

1. **代码迁移风险**：
   - landing-page已部署到GitHub Pages，迁移后需重新配置
   - 建议先测试新repo的GitHub Pages再删除旧的

2. **Issue迁移风险**：
   - Issue迁移会改变issue ID
   - 建议在comment中留下迁移记录

3. **Agent适应性**：
   - 重构后agent需要时间适应新结构
   - 建议在CLAUDE.md中清晰说明新规则

4. **进行中的工作**：
   - 有3个idea正在in_progress（AI求职顾问、减肥健康管理、宠物健康）
   - 迁移时注意不要中断正在进行的工作

## 🎯 CEO决策点

请您决策以下关键问题：

1. **优先级**：是否立即执行？还是等当前in_progress的issues完成后再重构？
2. **范围**：是否一次性重构全部9个ideas？还是先做5个已有代码/进度的？
3. **GitHub repo可见性**：所有新repo都设为private？
4. **执行方式**：由我（CEO）统一执行？还是分配给各squad执行？
5. **暂停开发**：重构期间是否暂停新feature开发，集中精力重构？

## 📝 执行建议

**推荐方案**：分阶段执行，不暂停开发

- **Week 1**：执行Phase 1 + Phase 2（创建repos和projects，迁移issues）
- **Week 2**：执行Phase 3（代码迁移，谨慎测试）
- **Week 3**：执行Phase 4（文档整理，收尾）

同时，in_progress的issues可以继续推进，互不阻塞。

---

**负责人**：CEO  
**预计工时**：15-20小时（分3周完成）  
**风险等级**：中等（主要风险在代码迁移）  
**收益**：长期收益巨大，workspace可维护性提升10倍
