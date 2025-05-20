"use client"


import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"


// Sample data for the confidence tracker
const data = [
 { date: "May 1", confidence: 55 },
 { date: "May 2", confidence: 58 },
 { date: "May 3", confidence: 56 },
 { date: "May 4", confidence: 60 },
 { date: "May 5", confidence: 62 },
 { date: "May 6", confidence: 65 },
 { date: "May 7", confidence: 63 },
 { date: "May 8", confidence: 68 },
 { date: "May 9", confidence: 67 },
 { date: "May 10", confidence: 70 },
 { date: "May 11", confidence: 71 },
 { date: "May 12", confidence: 69 },
 { date: "May 13", confidence: 72 },
 { date: "May 14", confidence: 75 },
]


export function ConfidenceTracker({ height = 200 }) {
 return (
   <ChartContainer className="h-[300px]" customTooltip={CustomTooltip}>
     <ResponsiveContainer width="100%" height={height}>
       <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
         <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
         <XAxis dataKey="date" className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} />
         <YAxis
           domain={[0, 100]}
           className="text-xs fill-muted-foreground"
           tickLine={false}
           axisLine={false}
           tickFormatter={(value) => `${value}%`}
         />
         <Tooltip content={<CustomTooltip />} />
         <Line
           type="monotone"
           dataKey="confidence"
           stroke="url(#colorConfidence)"
           strokeWidth={2}
           dot={{ fill: "#d946ef", strokeWidth: 2, r: 4 }}
           activeDot={{ r: 6, fill: "#d946ef" }}
         />
         <defs>
           <linearGradient id="colorConfidence" x1="0" y1="0" x2="1" y2="0">
             <stop offset="0%" stopColor="#ec4899" />
             <stop offset="50%" stopColor="#d946ef" />
             <stop offset="100%" stopColor="#8b5cf6" />
           </linearGradient>
         </defs>
       </LineChart>
     </ResponsiveContainer>
   </ChartContainer>
 )
}


function CustomTooltip({ active, payload, label }) {
 if (active && payload && payload.length) {
   return (
     <ChartTooltip>
       <ChartTooltipContent>
         <div className="flex flex-col gap-2">
           <p className="text-sm font-medium">{label}</p>
           <p className="text-sm font-semibold text-pink-500">Confidence: {payload[0].value}%</p>
         </div>
       </ChartTooltipContent>
     </ChartTooltip>
   )
 }


 return null
}
