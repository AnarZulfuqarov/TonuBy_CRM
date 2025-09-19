import React, { useState } from "react";
import "./index.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import DoughnutChartCard from "../../../components/Statistika/Chart2/index.jsx";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";
const companies = [
    { id: 1, name: "Şirvanşah" },
    { id: 2, name: "UV Demo" },
    { id: 3, name: "Şirvanşah" },
    { id: 4, name: "Mof" },
    { id: 5, name: "Şirvanşah" },
    { id: 6, name: "UV Demo" },
    { id: 7, name: "Şirvanşah" },
    { id: 8, name: "Mof" },
];

const SelectBox = ({ value, onChange, options, placeholder, width = 190 }) => (
    <label className={`select2 ${value === "__all__" ? "is-placeholder" : ""}`} style={{ width }}>
        <select value={value} onChange={onChange}>
            <option value="__all__" disabled hidden>
                {placeholder}
            </option>
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
        <svg className="chev" width="16" height="16" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" fill="none" stroke="#9A9A9A" strokeWidth="2" />
        </svg>
    </label>
);

// Text -> Date focus trick for dd/mm/yy placeholder
const DateField = ({ label, value, onChange, placeholder = "dd/mm/yy" }) => {
    const [type, setType] = useState("text");
    return (
        <div className="field">
            <span className="field__label">{label} :</span>
            <label className="input2">
                <input
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onFocus={() => setType("date")}
                    onBlur={(e) => {
                        if (!e.target.value) setType("text");
                    }}
                    onChange={(e) => onChange(e.target.value)}
                />
                <svg className="icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        d="M7 2v2M17 2v2M3 8h18M5 5h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
                        fill="none"
                        stroke="#9A9A9A"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                    />
                </svg>
            </label>
        </div>
    );
};

const KassaHesabati = () => {
    const [searchName, setSearchName] = useState("");
    const [activeSearch, setActiveSearch] = useState(null);
    const customers = ["Mof", "Tonuby", "UV Demo", "Şirvanşah"];

    const navigate = useNavigate();

    // filters
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [customer, setCustomer] = useState("__all__");
// ======= data & helpers (komponent daxilində yuxarıda) =======

// seçilmişlər
    const [selectedCats, setSelectedCats] = useState([]);

// mövcud seçilmiş kateqoriyalara görə məhsul opsiyaları
    const availableProducts = selectedCats.length
        ? Array.from(
            new Set(
                selectedCats.flatMap((c) => PRODUCT_BY_CATEGORY[c] || [])
            )
        )
        : []; // kateqoriya seçilməyibsə boş olacaq





// helper: sabit dəyər vermək üçün kiçik hash (demo üçün)
    const valFor = (name) => {
        let h = 0;
        for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 9973;
        return 120 + (h % 420); // 120..540 arası
    }
    // === Cədvəlin altı filterlər və chart üçün ===
    const CATEGORY_LIST = ["tablo", "aksesuar", "poster", "promo"];
    const PRODUCT_BY_CATEGORY = {
        tablo: ["ipək tablo", "canvas 40x60", "tablo çərçivə"],
        aksesuar: ["asma dəmir", "stend"],
        poster: ["poster A3", "poster A2"],
        promo: ["promo 2", "promo 3", "promo 5"],
    };
    const PROD_COLORS = ["#6EA8FE", "#9ADBC1", "#E59BB3", "#E9B24C", "#A693F2"];

    const [catVal, setCatVal] = useState("__all__");
    const [prodVal, setProdVal] = useState("__all__");
    const [selectedCat, setSelectedCat] = useState(null);     // yalnız 1 kateqoriya
    const [selectedProds, setSelectedProds] = useState([]);   // çoxlu məhsul

    const addCategory = (e) => {
        const v = e.target.value;
        if (v !== "__all__") {
            setSelectedCat(v);
            setSelectedProds([]); // kateqoriya dəyişəndə məhsullar sıfırlanır
        }
        setCatVal("__all__");
    };
    const removeCat = () => {
        setSelectedCat(null);
        setSelectedProds([]);
    };

    const addProduct = (e) => {
        const v = e.target.value;
        if (v !== "__all__" && !selectedProds.includes(v)) {
            setSelectedProds([...selectedProds, v]);
        }
        setProdVal("__all__");
    };
    const removeProd = (p) => setSelectedProds(selectedProds.filter((x) => x !== p));

    const productOptions = selectedCat ? PRODUCT_BY_CATEGORY[selectedCat] || [] : [];

    const chartData = selectedProds.map((p, i) => ({
        name: p,
        value: Math.floor(Math.random() * 500) + 100, // demo value
        color: PROD_COLORS[i % PROD_COLORS.length],
    }));

    return (
        <div className="admin-kassa-h-main">
            <div className="admin-kassa-h">
                <div className="headerr">
                    <div className="head">
                        <h2>Kassa hesabatı</h2>
                    </div>
                </div>

                <div className={"root"}>
                    <h2>
                        <NavLink className="link" to="/admin/hesabat/kassa-h">
                            — Şirkət seçimi
                        </NavLink>{" "}
                        — UV Demo
                    </h2>
                </div>

                {/* ===== Filters (image'dəki kimi) ===== */}
                <div className="table-toolbar">
                    <div className="filters">
                        <DateField label="Başlanğıc tarix" value={startDate} onChange={setStartDate} />
                        <DateField label="Son tarix" value={endDate} onChange={setEndDate} />

                        <div className="field">
                            <span className="field__label">Müştəri :</span>
                            <SelectBox
                                value={customer}
                                onChange={(e) => setCustomer(e.target.value)}
                                options={customers}
                                placeholder="Müştəri seç"
                                width={190}
                            />
                        </div>
                    </div>
                </div>

                <div className="admin-kassa-h-table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>
                                {activeSearch === "name" ? (
                                    <div className="th-search">
                                        <input
                                            autoFocus
                                            value={searchName}
                                            onChange={(e) => setSearchName(e.target.value)}
                                            placeholder="Axtar..."
                                        />
                                        <FaTimes onClick={() => { setActiveSearch(null); setSearchName(""); }} />
                                    </div>
                                ) : (
                                    <div className="th-label">
                                        Kateqoriya adı
                                        <svg onClick={() => setActiveSearch("name")} xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                            <path
                                                d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z"
                                                fill="#7A7A7A"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </th>
                            <th>Toplam məhsul sayı</th>
                            <th>Mədaxil</th>
                            <th>Məxaric</th>
                            <th>Toplam</th>
                        </tr>
                        </thead>
                        <tbody>
                        {companies.map((company) => (
                            <tr key={company.id}>
                                <td>{company.name}</td>
                                <td>{company.departmentCount}</td>
                                <td>{company.departmentCount}</td>
                                <td>{company.departmentCount}</td>
                                <td>{company.departmentCount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {/* ===== Cədvəlin altı: kateqoriya & məhsul seçimi ===== */}
                {/* ===== Cədvəlin altı: Kateqoriya & Məhsul seçimi ===== */}
                <div className="below-table-filters">
                    <div className="dropdown-row">
                        <label className="field__label">Kateqoriya seç</label>
                        <label className={`select22 ${catVal === "__all__" ? "is-placeholder" : ""}`} style={{ width: 190 }}>
                            <select value={catVal} onChange={addCategory}>
                                <option value="__all__" disabled hidden>Kateqoriya seç</option>
                                {CATEGORY_LIST.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <svg className="chev" width="16" height="16" viewBox="0 0 24 24">
                                <path d="M6 9l6 6 6-6" fill="none" stroke="#9A9A9A" strokeWidth="2" />
                            </svg>
                        </label>
                    </div>
                    <div className="chips">
                        {selectedCat && (
                            <span className="chip">
        {selectedCat}
                                <button className="chip__x" onClick={removeCat}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M8 8.472L10.164 10.636C10.2262 10.6982 10.3027 10.7316 10.3933 10.736C10.484 10.7404 10.5649 10.7071 10.636 10.636C10.7071 10.5649 10.7427 10.4862 10.7427 10.4C10.7427 10.3138 10.7071 10.2351 10.636 10.164L8.472 8L10.636 5.836C10.6982 5.77378 10.7316 5.69733 10.736 5.60667C10.7404 5.516 10.7071 5.43511 10.636 5.364C10.5649 5.29289 10.4862 5.25733 10.4 5.25733C10.3138 5.25733 10.2351 5.29289 10.164 5.364L8 7.528L5.836 5.364C5.77378 5.30178 5.69733 5.26844 5.60667 5.264C5.516 5.25956 5.43511 5.29289 5.364 5.364C5.29289 5.43511 5.25733 5.51378 5.25733 5.6C5.25733 5.68622 5.29289 5.76489 5.364 5.836L7.528 8L5.364 10.164C5.30178 10.2262 5.26844 10.3029 5.264 10.394C5.25956 10.4842 5.29289 10.5649 5.364 10.636C5.43511 10.7071 5.51378 10.7427 5.6 10.7427C5.68622 10.7427 5.76489 10.7071 5.836 10.636L8 8.472ZM8.002 14C7.17222 14 6.39222 13.8427 5.662 13.528C4.93178 13.2129 4.29644 12.7853 3.756 12.2453C3.21556 11.7053 2.78778 11.0707 2.47267 10.3413C2.15756 9.612 2 8.83222 2 8.002C2 7.17178 2.15756 6.39178 2.47267 5.662C2.78733 4.93178 3.21422 4.29644 3.75333 3.756C4.29244 3.21556 4.92733 2.78778 5.658 2.47267C6.38867 2.15756 7.16867 2 7.998 2C8.82733 2 9.60733 2.15756 10.338 2.47267C11.0682 2.78733 11.7036 3.21444 12.244 3.754C12.7844 4.29356 13.2122 4.92844 13.5273 5.65867C13.8424 6.38889 14 7.16867 14 7.998C14 8.82733 13.8427 9.60733 13.528 10.338C13.2133 11.0687 12.7858 11.704 12.2453 12.244C11.7049 12.784 11.0702 13.2118 10.3413 13.5273C9.61244 13.8429 8.83267 14.0004 8.002 14Z" fill="#FF5353"/>
</svg></button>
      </span>
                        )}
                    </div>

                    <div className="dropdown-row mtop">
                        <label className="field__label">Məhsul seç</label>
                        <label className={`select22 ${prodVal === "__all__" ? "is-placeholder" : ""}`} style={{ width: 190 }}>
                            <select value={prodVal} onChange={addProduct} disabled={!selectedCat}>
                                <option value="__all__" disabled hidden>Məhsul seç</option>
                                {productOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                            <svg className="chev" width="16" height="16" viewBox="0 0 24 24">
                                <path d="M6 9l6 6 6-6" fill="none" stroke="#9A9A9A" strokeWidth="2" />
                            </svg>
                        </label>
                    </div>
                    <div className="chips">
                        {selectedProds.map((p) => (
                            <span className="chip" key={p}>
        {p}
                                <button className="chip__x" onClick={() => removeProd(p)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M8 8.472L10.164 10.636C10.2262 10.6982 10.3027 10.7316 10.3933 10.736C10.484 10.7404 10.5649 10.7071 10.636 10.636C10.7071 10.5649 10.7427 10.4862 10.7427 10.4C10.7427 10.3138 10.7071 10.2351 10.636 10.164L8.472 8L10.636 5.836C10.6982 5.77378 10.7316 5.69733 10.736 5.60667C10.7404 5.516 10.7071 5.43511 10.636 5.364C10.5649 5.29289 10.4862 5.25733 10.4 5.25733C10.3138 5.25733 10.2351 5.29289 10.164 5.364L8 7.528L5.836 5.364C5.77378 5.30178 5.69733 5.26844 5.60667 5.264C5.516 5.25956 5.43511 5.29289 5.364 5.364C5.29289 5.43511 5.25733 5.51378 5.25733 5.6C5.25733 5.68622 5.29289 5.76489 5.364 5.836L7.528 8L5.364 10.164C5.30178 10.2262 5.26844 10.3029 5.264 10.394C5.25956 10.4842 5.29289 10.5649 5.364 10.636C5.43511 10.7071 5.51378 10.7427 5.6 10.7427C5.68622 10.7427 5.76489 10.7071 5.836 10.636L8 8.472ZM8.002 14C7.17222 14 6.39222 13.8427 5.662 13.528C4.93178 13.2129 4.29644 12.7853 3.756 12.2453C3.21556 11.7053 2.78778 11.0707 2.47267 10.3413C2.15756 9.612 2 8.83222 2 8.002C2 7.17178 2.15756 6.39178 2.47267 5.662C2.78733 4.93178 3.21422 4.29644 3.75333 3.756C4.29244 3.21556 4.92733 2.78778 5.658 2.47267C6.38867 2.15756 7.16867 2 7.998 2C8.82733 2 9.60733 2.15756 10.338 2.47267C11.0682 2.78733 11.7036 3.21444 12.244 3.754C12.7844 4.29356 13.2122 4.92844 13.5273 5.65867C13.8424 6.38889 14 7.16867 14 7.998C14 8.82733 13.8427 9.60733 13.528 10.338C13.2133 11.0687 12.7858 11.704 12.2453 12.244C11.7049 12.784 11.0702 13.2118 10.3413 13.5273C9.61244 13.8429 8.83267 14.0004 8.002 14Z" fill="#FF5353"/>
</svg></button>
      </span>
                        ))}
                    </div>
                </div>

                {/* ===== Chart ===== */}
                {selectedProds.length > 0 && (
                    <div className="card chart-card">
                        <div className="chart-card__head">Məhsul</div>
                        <div className="chart-card__body">
                            <ResponsiveContainer width="100%" height={240}>
                                <BarChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tickLine={false} />
                                    <YAxis tickLine={false} />
                                    <Tooltip cursor={{ fillOpacity: 0.08 }} />
                                    <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={selectedProds.length === 1 ? 60 : undefined}>
                                        {chartData.map((d) => <Cell key={d.name} fill={d.color} />)}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="chart-card__legend">
                            {chartData.map((d) => (
                                <div className="legend-item" key={d.name}>
                                    <span className="dot" style={{ background: d.color }} />
                                    <span className="name">{d.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default KassaHesabati;
