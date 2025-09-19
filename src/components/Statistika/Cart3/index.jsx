import React from "react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

const COLORS = ["#62B2FD", "#FFB44F"]; // mavi, sarı (şəkildəki tonlara yaxın)

export default function PieWithCallouts({
                                            values = [65, 35],
                                            labels = ["Mədaxil", "Məxaric"],
                                            width = 260,
                                            height = 200,
                                        }) {
    const data = [
        { name: labels[0], value: values[0] },
        { name: labels[1], value: values[1] },
    ];

    // custom label: faizləri kənarda göstər + leader line
    const renderLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;
        const r = outerRadius + 18; // mətni çıxarma məsafəsi
        const x = cx + r * Math.cos(-midAngle * RADIAN);
        const y = cy + r * Math.sin(-midAngle * RADIAN);

        // kiçik leader line: dilimin kənarından mətinə
        const lx = cx + (outerRadius + 6) * Math.cos(-midAngle * RADIAN);
        const ly = cy + (outerRadius + 6) * Math.sin(-midAngle * RADIAN);

        return (
            <>
                <line x1={lx} y1={ly} x2={x} y2={y} stroke="#bdbdbd" strokeWidth="1" />
                <circle cx={lx} cy={ly} r={2} fill="#bdbdbd" />
                <text
                    x={x}
                    y={y}
                    fill="#6f6f6f"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    fontSize={12}
                >
                    {`${Math.round(percent * 100)}%`}
                </text>
            </>
        );
    };

    return (
        <div style={{ width, height, margin: "0 auto" }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}       // ölçünü bura ilə oynaya bilərsən
                        innerRadius={0}        // donut deyil – tam pie
                        startAngle={90}
                        endAngle={-270}        // başlama bucağı şəkilə daha yaxın
                        labelLine={false}      // öz xəttimizi çəkirik
                        label={renderLabel}
                        isAnimationActive={false}
                    >
                        {data.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(v) => [`${v}%`, "Faiz"]} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
