import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#62B2FD", "#FFB44F"]; // mavi, sarı (şəkildəki tonlara yaxın)

export default function PieWithCallouts({
                                            values = [65, 35],
                                            labels = ["Mədaxil", "Məxaric"],
                                            width = 260,
                                            height = 200,
                                        }) {
    // Negatif veya sıfır değerleri filtrele ve veri dizisini oluştur
    const data = values
        .map((value, index) => ({
            name: labels[index],
            value: value > 0 ? value : 0, // Negatif değerleri 0 ile değiştir
        }))
        .filter((item) => item.value > 0); // Sadece pozitif değerleri dahil et

    // Geçerli veri yoksa hata mesajı göster
    if (data.length === 0) {
        return <div>Geçerli veri yok (tüm değerler negatif veya sıfır).</div>;
    }

    // Toplam değeri hesapla (yüzde için)
    const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

    // Özel etiket: yüzdeleri dışarıda göster + bağlantı çizgisi
    const renderLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;
        const r = outerRadius + 18; // metni çıkarma mesafesi
        const x = cx + r * Math.cos(-midAngle * RADIAN);
        const y = cy + r * Math.sin(-midAngle * RADIAN);

        // küçük bağlantı çizgisi: dilimin kenarından metne
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

    // Tooltip formatter: hover'da yüzde göster
    const renderTooltip = ({ payload }) => {
        if (payload && payload.length) {
            const { value, name } = payload[0];
            const percent = (value / totalValue) * 100;
            return `${name}: ${Math.round(percent)}%`;
        }
        return null;
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
                        outerRadius={70} // ölçüyü buradan ayarlayabilirsin
                        innerRadius={0} // donut değil – tam pie
                        startAngle={90}
                        endAngle={-270} // başlangıç açısı şekle daha yakın
                        labelLine={false} // kendi çizgimizi çiziyoruz
                        label={renderLabel}
                        isAnimationActive={false}
                    >
                        {data.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={renderTooltip} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}