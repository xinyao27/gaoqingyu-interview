import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function DemoPage() {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">组件演示</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/demo/chat" className="block">
                    <Card className="h-full transition-all hover:shadow-md">
                        <CardHeader>
                            <CardTitle>聊天界面</CardTitle>
                            <CardDescription>基于Shadcn UI的聊天组件演示</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>包括消息列表、消息项、输入框等组件，支持Markdown渲染。</p>
                        </CardContent>
                        <CardFooter className="text-sm text-muted-foreground">
                            点击查看演示
                        </CardFooter>
                    </Card>
                </Link>

                <Link href="/demo/markdown" className="block">
                    <Card className="h-full transition-all hover:shadow-md">
                        <CardHeader>
                            <CardTitle>Markdown渲染</CardTitle>
                            <CardDescription>支持代码高亮的Markdown渲染组件</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>使用react-markdown和react-syntax-highlighter实现的Markdown渲染器。</p>
                        </CardContent>
                        <CardFooter className="text-sm text-muted-foreground">
                            点击查看演示
                        </CardFooter>
                    </Card>
                </Link>
            </div>
        </div>
    );
} 