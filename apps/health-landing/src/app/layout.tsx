import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "瘦享AI - AI智能减肥健康管理",
  description: "大模型精准识别食材热量，AI视觉分析体脂率，个性化健康管理方案",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
