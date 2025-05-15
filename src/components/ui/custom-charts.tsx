
import * as React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface AreaChartProps {
  data: any[];
  categories: string[];
  index: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export const AreaChart = ({
  data,
  categories,
  index,
  colors = ["blue", "green", "yellow"],
  valueFormatter = (value: number) => `${value}`,
  className,
}: AreaChartProps) => {
  const defaultColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

  const getColor = (idx: number) => {
    const colorKey = colors[idx] || defaultColors[idx % defaultColors.length];
    return `hsl(var(--${colorKey}))`;
  };

  return (
    <ChartContainer 
      className={className}
      config={{}}
    >
      <ComposedChart data={data}>
        <XAxis 
          dataKey={index}
          tick={{ fill: "hsl(var(--muted-foreground))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
          axisLine={{ stroke: "hsl(var(--border))" }}
        />
        <YAxis 
          tick={{ fill: "hsl(var(--muted-foreground))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickFormatter={valueFormatter}
        />
        <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
        <Tooltip 
          content={({ active, payload, label }) => {
            if (active && payload?.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="font-medium">{label}</div>
                  <div className="flex flex-col gap-1 pt-1">
                    {payload.map((entry, idx) => (
                      <div 
                        key={`item-${idx}`}
                        className="flex items-center gap-2"
                      >
                        <div 
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-muted-foreground">{entry.name}:</span>
                        <span className="font-medium">
                          {valueFormatter(entry.value as number)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
            return null;
          }}
        />
        {categories.map((category, idx) => (
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            fill={getColor(idx)}
            stroke={getColor(idx)}
            stackId="1"
            fillOpacity={0.6}
          />
        ))}
      </ComposedChart>
    </ChartContainer>
  );
};

interface BarChartProps {
  data: any[];
  categories: string[];
  index: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export const BarChart = ({
  data,
  categories,
  index,
  colors = ["blue"],
  valueFormatter = (value: number) => `${value}`,
  className,
}: BarChartProps) => {
  const defaultColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

  const getColor = (idx: number) => {
    const colorKey = colors[idx] || defaultColors[idx % defaultColors.length];
    return `hsl(var(--${colorKey}))`;
  };

  return (
    <ChartContainer 
      className={className}
      config={{}}
    >
      <ComposedChart data={data}>
        <XAxis 
          dataKey={index}
          tick={{ fill: "hsl(var(--muted-foreground))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
          axisLine={{ stroke: "hsl(var(--border))" }}
        />
        <YAxis 
          tick={{ fill: "hsl(var(--muted-foreground))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickFormatter={valueFormatter}
        />
        <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
        <Tooltip 
          content={({ active, payload, label }) => {
            if (active && payload?.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="font-medium">{label}</div>
                  <div className="flex flex-col gap-1 pt-1">
                    {payload.map((entry, idx) => (
                      <div 
                        key={`item-${idx}`}
                        className="flex items-center gap-2"
                      >
                        <div 
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-muted-foreground">{entry.name}:</span>
                        <span className="font-medium">
                          {valueFormatter(entry.value as number)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
            return null;
          }}
        />
        {categories.map((category, idx) => (
          <Bar
            key={category}
            dataKey={category}
            fill={getColor(idx)}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </ComposedChart>
    </ChartContainer>
  );
};
