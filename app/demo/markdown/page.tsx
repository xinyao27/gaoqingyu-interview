import React from "react";
import { MarkdownRenderer } from "@/components/markdown-renderer";

const sampleMarkdown = `
# Markdown 示例

这是一个 **Markdown** 示例文本，用于测试 \`MarkdownRenderer\` 组件。

## 代码示例

\`\`\`javascript
function hello() {
  console.log("你好，世界！");
}
\`\`\`

## 列表示例

- 项目 1
- 项目 2
  - 子项目 A
  - 子项目 B

## 表格示例

| 名称 | 描述 |
|------|------|
| 示例 1 | 这是第一个示例 |
| 示例 2 | 这是第二个示例 |

## 链接

[访问 shadcn/ui](https://ui.shadcn.com/)
`;

export default function MarkdownDemo() {
    return (
        <div className="container mx-auto p-8 max-w-3xl">
            <h1 className="text-2xl font-bold mb-6">Markdown 渲染器演示</h1>
            <div className="border rounded-lg p-6 bg-card">
                <MarkdownRenderer content={sampleMarkdown} />
            </div>
        </div>
    );
} 