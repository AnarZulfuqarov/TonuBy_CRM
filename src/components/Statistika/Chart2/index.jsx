import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./index.scss";
// API: açık bırakıyorum, useMock=false olunca çalışır

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DoughnutChartCard = ({
                               title = "Balans",
                               labels = ["Ümumi mədaxil", "Ümumi məxaric", "Toplam balans"],
                               colors = ["#45DD42", "#FF2D2D", "#FFD256"],
                               legendColors = ["#45DD42", "#FF2D2D", "#FFD256"],
                               useMock = true, // 🔶 ŞİMDİLİK MOCK
                           }) => {
    // 🔸 MOCK veriler (toplam 100 olacak şekilde)
    const mock = { completedPercent: 62, deletedPercent: 8, waitingPercent: 30 };

    const companyId = localStorage.getItem("selectedCompanyId");
    const isValidId = companyId && companyId.length === 36;


    // kaynaktan değerleri belirle
    const dataSrc = useMock
        ? mock
        : {
            completedPercent: api.data?.completedPercent ?? 0,
            deletedPercent: api.data?.deletedPercent ?? 0,
            waitingPercent: api.data?.waitingPercent ?? 0,
        };

    // erken dönüşler (sadece gerçek API modunda)
    if (!useMock && !isValidId) return <div>Zəhmət olmasa şirkət seçin</div>;
    if (!useMock && api.isLoading) return <div>Yüklənir...</div>;
    if (!useMock && api.isError) return <div>Xəta baş verdi</div>;

    const chartValues = [
        dataSrc.completedPercent,
        dataSrc.deletedPercent,
        dataSrc.waitingPercent,
    ];

    const centerText = "Balans"
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
                enabled: true,
                callbacks: {
                    label: (ctx) => `${ctx.label || ""}: ${ctx.raw || 0}%`,
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
                                    <strong>{chartValues[i]}%</strong> {label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="chart-right">
                    <div style={{ width: 160, height: 160, position: "relative" }}>
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                        <div className="chart-center-label">{centerText}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoughnutChartCard;
