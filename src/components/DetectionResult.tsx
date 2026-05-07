// components/DetectionResult.tsx
"use client"

import { cn } from "@/lib/utils"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

interface ModelResult {
    is_ai_generated: boolean
    confidence: number
    artificial: number
    human: number
}

interface DetectionResultProps {
    filename: string
    is_ai_generated: boolean
    confidence: number
    vote_count: number
    model_results: Record<string, ModelResult>
}

const chartConfig = {
    artificial: {
        label: "AI",
        color: "#64748b",
    },
    human: {
        label: "Human",
        color: "#7c3aed",
    },
} satisfies ChartConfig

const DetectionResult = ({
    is_ai_generated,
    confidence,
    vote_count,
    model_results,
}: DetectionResultProps) => {
    const chartData = Object.entries(model_results).map(([model, data]) => ({
        model,
        artificial: parseFloat((data.artificial * 100).toFixed(1)),
        human: parseFloat((data.human * 100).toFixed(1)),
    }))

    return (
        <div className="mt-6 space-y-4 ">
            {/* Verdict */}
            <div className={cn(
                "rounded-xl p-5 border text-center",
                is_ai_generated
                    ? "bg-slate-50 border-slate-200 dark:bg-slate-950/30 dark:border-slate-800"
                    : "bg-violet-50 border-violet-200 dark:bg-violet-950/30 dark:border-violet-800"
            )}>
                <p className={cn(
                    "text-xs font-medium uppercase tracking-widest mb-1",
                    is_ai_generated ? "text-slate-500" : "text-violet-500"
                )}>
                    {is_ai_generated ? "AI Generated" : "Likely Human"}
                </p>
                <p className={cn(
                    "text-4xl font-bold",
                    is_ai_generated
                        ? "text-slate-600 dark:text-slate-400"
                        : "text-violet-600 dark:text-violet-400"
                )}>
                    {(confidence * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                    confidence · {vote_count} models voted
                </p>
            </div>

            {/* Chart */}
            <Card className="rounded-lg bg-violet-50">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-violet-800 font-michroma">Model breakdown</CardTitle>
                    <CardDescription className="text-xs">
                        AI vs Human score per detection model
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={chartData}>
                            <XAxis
                                dataKey="model"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(v) => `${v}%`}
                                domain={[0, 100]}
                            />
                            <Bar
                                dataKey="artificial"
                                stackId="a"
                                fill="var(--color-artificial)"
                                radius={[0, 0, 16, 16]}
                                barSize={60}
                            />
                            <Bar
                                dataKey="human"
                                stackId="a"
                                fill="var(--color-human)"
                                radius={[16, 16, 0, 0]}
                                barSize={60}
                            />
                            <ChartTooltip
                                content={<ChartTooltipContent indicator="line" />}
                                cursor={false}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* Per-model rows */}
            <div className="rounded-xl border border-muted overflow-hidden bg-violet-100 p-4">
                <div className="divide-y divide-muted">
                    {Object.entries(model_results).map(([model, data]) => (
                        <div key={model} className="first:rounded-t-2xl last:rounded-b-2xl border border-violet-400 px-4 py-3">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium capitalize text-violet-700">{model}</span>
                                <span className={cn(
                                    "text-xs px-2 py-0.5 rounded-full font-medium",
                                    data.is_ai_generated
                                        ? "bg-slate-100 text-slate-600 dark:bg-slate-900/40 dark:text-slate-400"
                                        : "bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400"
                                )}>
                                    {data.is_ai_generated ? "AI" : "Human"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                <span className="w-10 shrink-0">AI</span>
                                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                    <div
                                        className="h-full bg-slate-400 rounded-full"
                                        style={{ width: `${(data.artificial * 100).toFixed(1)}%` }}
                                    />
                                </div>
                                <span className="w-10 text-right">{(data.artificial * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="w-10 shrink-0">Human</span>
                                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                    <div
                                        className="h-full bg-violet-400 rounded-full"
                                        style={{ width: `${(data.human * 100).toFixed(1)}%` }}
                                    />
                                </div>
                                <span className="w-10 text-right">{(data.human * 100).toFixed(1)}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DetectionResult