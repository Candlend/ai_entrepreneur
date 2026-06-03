# 全自动视频剪辑工具 - MVP技术方案

## 一、MVP功能范围

### 核心功能（Phase 1）
1. **视频上传与预览**
   - 支持MP4、MOV格式
   - 最大文件2GB
   - 时长限制30分钟

2. **AI视频分析**
   - 场景分割检测
   - 关键帧提取
   - 音频峰值检测
   - 高光时刻标记

3. **自动剪辑**
   - 生成30秒/1分钟/3分钟短视频
   - 自动添加转场效果
   - 字幕自动生成

4. **导出功能**
   - MP4视频导出
   - 基础剪辑时间轴JSON

### 暂不实现（未来迭代）
- ❌ 导出专业剪辑软件工程文件
- ❌ 本地轻量化模型（先使用云端API验证）
- ❌ BGM自动匹配
- ❌ 批量处理

## 二、技术架构

### 前端技术栈
- **框架**: Next.js 15 + React 19 + TypeScript
- **样式**: Tailwind CSS v4
- **视频播放**: video.js 或 plyr
- **状态管理**: React Hooks + Context
- **文件上传**: react-dropzone

### 后端技术栈
- **运行时**: Next.js API Routes
- **视频处理**: 
  - FFmpeg (场景分割、关键帧提取、剪辑)
  - Whisper API (字幕生成，先用OpenAI API)
- **AI分析**: Claude API (视频帧分析)

### 数据存储
- **临时文件**: 本地文件系统
- **状态**: 客户端内存（MVP阶段）

## 三、核心功能实现

### 3.1 视频分析流程

```typescript
// 1. 用户上传视频
Upload Video (MP4) 
  ↓
// 2. FFmpeg提取关键帧
Extract Key Frames (每2秒一帧)
  ↓
// 3. Claude Vision API分析每帧
Analyze Frames (场景、动作、情绪)
  ↓
// 4. 音频分析
Audio Analysis (音量峰值、静音检测)
  ↓
// 5. 生成高光时刻标记
Mark Highlights (时间戳 + 标签)
  ↓
// 6. 返回分析结果
Return Timeline Data
```

### 3.2 自动剪辑逻辑

**高光检测算法**（简化版）:
1. 音量峰值检测 (dB > 阈值)
2. 画面变化率 (场景切换)
3. Claude Vision识别的"兴奋"场景

**剪辑策略**:
- 30秒版: 选择Top 3高光片段，各10秒
- 1分钟版: Top 5高光片段，各12秒
- 3分钟版: Top 10高光片段，各18秒

### 3.3 字幕生成

使用OpenAI Whisper API:
```typescript
// 从视频提取音频
ffmpeg -i video.mp4 -vn -acodec pcm_s16le audio.wav

// 调用Whisper API
const transcription = await openai.audio.transcriptions.create({
  file: audioFile,
  model: "whisper-1",
  language: "zh"
});

// 生成SRT字幕文件
generateSRT(transcription.words);
```

## 四、MVP页面设计

### 4.1 页面结构

```
/                     # 首页（上传 + 介绍）
/analyze              # 视频分析页面
/editor               # 时间轴编辑器
/preview              # 预览与导出
```

### 4.2 主页面布局

**首页 - 视频上传**:
- Hero区域（产品介绍）
- 拖拽上传区域
- 功能特性展示
- 使用案例

**分析页面**:
- 视频预览播放器
- 分析进度条
- 实时日志输出
- 高光时刻列表

**编辑器页面**:
- 视频播放器
- 时间轴（标记高光片段）
- 剪辑参数配置（时长选择）
- 生成按钮

**预览页面**:
- 成品视频播放
- 下载按钮
- 分享功能

## 五、API设计

### 5.1 核心API端点

```typescript
POST /api/video/upload
// 上传视频文件
Body: FormData (video file)
Response: { videoId, uploadPath }

POST /api/video/analyze
// 分析视频
Body: { videoId }
Response: { 
  scenes: Scene[],
  highlights: Highlight[],
  timeline: TimelineData
}

POST /api/video/clip
// 自动剪辑
Body: { 
  videoId, 
  duration: 30 | 60 | 180,
  highlights: string[]
}
Response: { clipId, clipUrl }

POST /api/video/subtitle
// 生成字幕
Body: { videoId }
Response: { srtContent, srtUrl }
```

### 5.2 数据结构

```typescript
interface Scene {
  id: string;
  startTime: number;
  endTime: number;
  description: string;
  keyFrameUrl: string;
}

interface Highlight {
  id: string;
  timestamp: number;
  duration: number;
  type: 'audio_peak' | 'scene_change' | 'exciting_moment';
  confidence: number;
  description: string;
}

interface TimelineData {
  duration: number;
  scenes: Scene[];
  highlights: Highlight[];
  audioAnalysis: {
    peaks: { time: number, volume: number }[];
  };
}
```

## 六、移动端优化

### 响应式设计要点
- 视频播放器自适应屏幕
- 时间轴支持触摸滑动
- 上传区域移动端友好
- 分析进度大号字体显示

### 性能优化
- 视频缩略图懒加载
- 分析结果分页显示
- 压缩上传视频（可选）

## 七、开发计划

### 阶段1: 基础架构（2天）
- [x] Next.js项目初始化
- [ ] 视频上传组件
- [ ] FFmpeg集成（服务端）
- [ ] 基础页面布局

### 阶段2: 核心功能（3天）
- [ ] 视频分析API
- [ ] Claude Vision集成
- [ ] 高光检测算法
- [ ] 字幕生成API

### 阶段3: 剪辑功能（2天）
- [ ] 自动剪辑逻辑
- [ ] 时间轴编辑器
- [ ] 视频合成与导出

### 阶段4: UI优化（2天）
- [ ] 移动端适配
- [ ] 动画和交互优化
- [ ] 错误处理和提示

### 阶段5: 测试（1天）
- [ ] 功能测试
- [ ] 性能测试
- [ ] 移动端测试

**总开发周期**: 10天

## 八、成本估算

### API成本（MVP阶段）
- **Claude Vision API**: 
  - 每个视频提取60帧（30分钟视频，每30秒一帧）
  - 每帧约0.024美元
  - 单次分析: 60 × $0.024 = $1.44
  
- **OpenAI Whisper API**:
  - 30分钟音频: $0.006/分钟 × 30 = $0.18

**单次处理总成本**: ~$1.62

### 存储成本
- Vercel免费额度: 100GB存储
- 超出后: $0.04/GB/月

### 流量成本
- Vercel免费额度: 100GB/月
- 超出后: $0.40/GB

## 九、技术风险与应对

### 风险1: FFmpeg在Vercel上的限制
**应对**: 使用Vercel Edge Functions + FFmpeg WASM，或迁移到其他支持FFmpeg的平台（Railway、Fly.io）

### 风险2: 视频处理时间过长
**应对**: 
- 实现异步处理 + WebSocket实时推送进度
- 添加队列系统（BullMQ + Redis）

### 风险3: 存储成本过高
**应对**: 
- 处理完成后自动删除临时文件
- 成品视频保留24小时
- 用户下载后立即清理

## 十、MVP限制说明

当前MVP版本限制：
- ⚠️ 无用户账号系统
- ⚠️ 视频仅保留24小时
- ⚠️ 单次处理限制30分钟视频
- ⚠️ 不支持批量处理
- ⚠️ 不支持导出专业剪辑软件工程文件
- ⚠️ 字幕仅支持中文
- ⚠️ 无BGM库

---

**立即开始开发！**
