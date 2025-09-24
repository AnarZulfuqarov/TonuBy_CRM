import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./index.scss";
import { useGetByIdCashBalanceQuery } from "../../../services/adminApi.jsx";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DoughnutChartCard = ({
                               title = "Balans",
                               labels = ["Ümumi mədaxil", "Ümumi məxaric", "Toplam balans"],
                               colors = ["#45DD42", "#FF2D2D", "#FFD256"],
                               legendColors = ["#45DD42", "#FF2D2D", "#FFD256"],
                               companyId,
                           }) => {
    const { data: getByIdCashBalance, isLoading, isError } = useGetByIdCashBalanceQuery(companyId);
    const balance = getByIdCashBalance?.data;

    if (!companyId) return <div>Zəhmət olmasa şirkət seçin</div>;
    if (isLoading) return <div>Yüklənir...</div>;
    if (isError) return <div>Xəta baş verdi</div>;

    // Orijinal değerler (sol tarafta gösterilecek)
    const originalValues = [
        balance?.incomeTotal ?? 0,
        balance?.expenseTotal ?? 0,
        balance?.balance ?? 0,
    ];

    // Grafikte kullanılacak değerler (negatifler sıfırlanır)
    const chartValues = originalValues.map((value) => (value < 0 ? 0 : value));

    const doughnutData = {
        labels,
        datasets: [
            {
                data: chartValues,
                backgroundColor: colors,
                borderWidth: 0,
            },
        ],
    };

    const doughnutOptions = {
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) => `${ctx.label}: ${ctx.raw} ₼`,
                },
            },
            datalabels: { display: false },
        },
        cutout: "70%",
    };

    return (
        <div className="chart-card">
            <div className="chart-content">
                <div>
                    <p className="card-title">{title}</p>
                    <div className="chart-left">
                        <ul className="legend-list">
                            {labels.map((label, i) => (
                                <li key={i}>
                                    <span className="dot" style={{ background: legendColors[i] }} />
                                    {label} <strong>{originalValues[i]}₼</strong>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="chart-right">
                    <div style={{ width: 160, height: 160, position: "relative" }}>
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                        <div className="chart-center-label">Balans</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoughnutChartCard;