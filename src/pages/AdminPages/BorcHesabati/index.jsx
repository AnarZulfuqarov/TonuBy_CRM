import React, {useEffect, useState} from "react";
import "./index.scss";
import {NavLink, useNavigate} from "react-router-dom";
import DoughnutChartCard from "../../../components/Statistika/Chart2/index.jsx";
import {FaTimes} from "react-icons/fa";
import PieWithCallouts from "../../../components/Statistika/Cart3/index.jsx";

const companies = [
    {id: 1, name: "Şirvanşah"},
    {id: 2, name: "UV Demo"},
    {id: 3, name: "Şirvanşah"},
    {id: 4, name: "Mof"},
    {id: 5, name: "Şirvanşah"},
    {id: 6, name: "UV Demo"},
    {id: 7, name: "Şirvanşah"},
    {id: 8, name: "Mof"},
];
const SelectBox = ({value, onChange, options, placeholder, width = 190}) => (
    <label className={`select2 ${value === "__all__" ? "is-placeholder" : ""}`} style={{width}}>
        <select value={value} onChange={onChange}>
            {/* placeholder içeride label gibi */}
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
            <path d="M6 9l6 6 6-6" fill="none" stroke="#9A9A9A" strokeWidth="2"/>
        </svg>
    </label>
);

const BorcHesabati = () => {
    const [searchName, setSearchName] = useState('');
    const [activeSearch, setActiveSearch] = useState(null);
    const [deleteCompanyId, setDeleteCompanyId] = useState(null);
    const customers = ["Mof", "Tonuby", "UV Demo", "Şirvanşah"];
    const categories = ["tablo", "aksesuar", "poster"];
    const products = ["ipək tablo", "promo 5", "canvas 40x60"];
    const navigate = useNavigate();
    const [customer, setCustomer] = useState("__all__");
    const [category, setCategory] = useState("__all__");
    const [product, setProduct] = useState("__all__");
    const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
    const [showPayment, setShowPayment] = useState(null);
    const [payAmount, setPayAmount] = useState("");   // modal üçün
    const [payDate, setPayDate] = useState("");
    const [payNote, setPayNote] = useState("");
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setShowPayment(null);
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);
    const nativeDateRef = React.useRef(null);

    const formatDateDMY = (iso /* yyyy-mm-dd */) => {
        if (!iso) return "";
        const [y, m, d] = iso.split("-");
        return `${d}/${m}/${String(y).slice(-2)}`;
    };

    const handlePickDate = (e) => {
        const iso = e.target.value; // yyyy-mm-dd
        setPayDate(formatDateDMY(iso));
    };
    return (
        <div className="admin-borc-h-main">
            <div className="admin-borc-h">
                <div className="headerr">
                    <div className="head">
                        <h2>Borc hesabatı</h2>
                    </div>
                </div>
                <div className={"root"}>
                    <h2>
                        <NavLink className="link" to="/admin/hesabat/borc-h">— Şirkət seçimi</NavLink>{' '}
                        — UV Demo
                    </h2>
                </div>
                {/* ===== ÜST DROPDOWNLAR ===== */}


                {/* ===== SUMMARY SECTION (Şəkildəki kimi) ===== */}
                {/* ===== SUMMARY SECTION ===== */}
                <div className="summary-section">
                    {/* SOL BLOK */}
                    <div className="summary-left">
                        <div className="summary-top">
                            <div className="filter-group">
                                <span className="filter-label">Müştəri :</span>
                                <SelectBox
                                    value={customer}
                                    onChange={(e) => setCustomer(e.target.value)}
                                    options={customers}
                                    placeholder="Müştəri seç"
                                    width={120}
                                />
                            </div>
                            <div className="filter-group">
                                <span className="filter-label">Kateqori :</span>
                                <SelectBox
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    options={categories}
                                    placeholder="Kateqori seç"
                                    width={140}
                                />
                            </div>
                        </div>

                        <div className="summary-cards">
                            <div className="stat-card is-green">
                                <span className="currency-pill"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                     height="17" viewBox="0 0 16 17" fill="none">
  <path
      d="M9 7.5C9 8.03043 8.78929 8.53914 8.41421 8.91421C8.03914 9.28929 7.53043 9.5 7 9.5C6.46957 9.5 5.96086 9.28929 5.58579 8.91421C5.21071 8.53914 5 8.03043 5 7.5C5 6.96957 5.21071 6.46086 5.58579 6.08579C5.96086 5.71071 6.46957 5.5 7 5.5C7.53043 5.5 8.03914 5.71071 8.41421 6.08579C8.78929 6.46086 9 6.96957 9 7.5ZM8 7.5C8 7.23478 7.89464 6.98043 7.70711 6.79289C7.51957 6.60536 7.26522 6.5 7 6.5C6.73478 6.5 6.48043 6.60536 6.29289 6.79289C6.10536 6.98043 6 7.23478 6 7.5C6 7.76522 6.10536 8.01957 6.29289 8.20711C6.48043 8.39464 6.73478 8.5 7 8.5C7.26522 8.5 7.51957 8.39464 7.70711 8.20711C7.89464 8.01957 8 7.76522 8 7.5ZM1 4.75C1 4.06 1.56 3.5 2.25 3.5H11.75C12.44 3.5 13 4.06 13 4.75V10.25C13 10.94 12.44 11.5 11.75 11.5H2.25C1.56 11.5 1 10.94 1 10.25V4.75ZM2.25 4.5C2.1837 4.5 2.12011 4.52634 2.07322 4.57322C2.02634 4.62011 2 4.6837 2 4.75V5.5H2.5C2.63261 5.5 2.75979 5.44732 2.85355 5.35355C2.94732 5.25979 3 5.13261 3 5V4.5H2.25ZM2 10.25C2 10.388 2.112 10.5 2.25 10.5H3V10C3 9.86739 2.94732 9.74021 2.85355 9.64645C2.75979 9.55268 2.63261 9.5 2.5 9.5H2V10.25ZM4 10V10.5H10V10C10 9.60218 10.158 9.22064 10.4393 8.93934C10.7206 8.65804 11.1022 8.5 11.5 8.5H12V6.5H11.5C11.1022 6.5 10.7206 6.34196 10.4393 6.06066C10.158 5.77936 10 5.39782 10 5V4.5H4V5C4 5.39782 3.84196 5.77936 3.56066 6.06066C3.27936 6.34196 2.89782 6.5 2.5 6.5H2V8.5H2.5C2.89782 8.5 3.27936 8.65804 3.56066 8.93934C3.84196 9.22064 4 9.60218 4 10ZM11 10.5H11.75C11.8163 10.5 11.8799 10.4737 11.9268 10.4268C11.9737 10.3799 12 10.3163 12 10.25V9.5H11.5C11.3674 9.5 11.2402 9.55268 11.1464 9.64645C11.0527 9.74021 11 9.86739 11 10V10.5ZM12 5.5V4.75C12 4.6837 11.9737 4.62011 11.9268 4.57322C11.8799 4.52634 11.8163 4.5 11.75 4.5H11V5C11 5.13261 11.0527 5.25979 11.1464 5.35355C11.2402 5.44732 11.3674 5.5 11.5 5.5H12ZM4.5 13.5C4.18322 13.5001 3.87453 13.3999 3.61818 13.2138C3.36184 13.0277 3.17099 12.7652 3.073 12.464C3.21167 12.488 3.354 12.5 3.5 12.5H11.75C12.3467 12.5 12.919 12.2629 13.341 11.841C13.7629 11.419 14 10.8467 14 10.25V5.585C14.2926 5.68844 14.5459 5.88008 14.725 6.13351C14.9041 6.38694 15.0002 6.68967 15 7V10.25C15 10.6768 14.9159 11.0994 14.7526 11.4937C14.5893 11.888 14.3499 12.2463 14.0481 12.5481C13.7463 12.8499 13.388 13.0893 12.9937 13.2526C12.5994 13.4159 12.1768 13.5 11.75 13.5H4.5Z"
      fill="white"/>
</svg></span>
                                <div>
                                    <div className="stat-amount">325 ₼</div>
                                    <div className="stat-sub">Alınacaq məbləğ</div>

                                </div>
                            </div>

                            <div className="stat-card is-red">
                                <span className="currency-pill"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                     height="17" viewBox="0 0 16 17" fill="none">
  <path
      d="M3 3.25V3.5H3.5C3.63261 3.5 3.75979 3.44732 3.85355 3.35355C3.94732 3.25979 4 3.13261 4 3V2.5H3.75C3.55109 2.5 3.36032 2.57902 3.21967 2.71967C3.07902 2.86032 3 3.05109 3 3.25ZM3.75 1.5H8.25C9.216 1.5 10 2.284 10 3.25V3.793L12.975 6.768C13.3 7.09303 13.5578 7.47889 13.7337 7.90355C13.9095 8.32822 14 8.78336 14 9.243V15C14 15.1326 13.9473 15.2598 13.8536 15.3536C13.7598 15.4473 13.6326 15.5 13.5 15.5C13.3674 15.5 13.2402 15.4473 13.1464 15.3536C13.0527 15.2598 13 15.1326 13 15V9.243C13.0001 8.91467 12.9354 8.58955 12.8099 8.28619C12.6843 7.98284 12.5001 7.70719 12.268 7.475L10 5.207V7.792L10.854 8.646C10.9479 8.73975 11.0007 8.86696 11.0008 8.99965C11.0009 9.13233 10.9483 9.25961 10.8545 9.3535C10.7607 9.44739 10.6335 9.50019 10.5009 9.50028C10.3682 9.50037 10.2409 9.44775 10.147 9.354L9.164 8.37L9.13 8.336L7.906 7.112C7.83793 7.04136 7.75647 6.98499 7.66636 6.9462C7.57626 6.90741 7.47932 6.88698 7.38123 6.88609C7.28313 6.8852 7.18585 6.90388 7.09506 6.94103C7.00426 6.97819 6.92179 7.03307 6.85246 7.10247C6.78312 7.17187 6.72832 7.25439 6.69126 7.34522C6.65419 7.43605 6.63561 7.53335 6.63659 7.63145C6.63757 7.72954 6.6581 7.82645 6.69697 7.91652C6.73585 8.00659 6.79229 8.088 6.863 8.156L8.354 9.646C8.40058 9.69244 8.43754 9.74761 8.46277 9.80835C8.48799 9.8691 8.50099 9.93423 8.501 10V11C8.501 11.265 8.60622 11.5192 8.79354 11.7068C8.98086 11.8943 9.23496 11.9997 9.5 12C9.63261 12 9.75979 12.0527 9.85355 12.1464C9.94732 12.2402 10 12.3674 10 12.5V13.75C10 14.2141 9.81563 14.6592 9.48744 14.9874C9.15925 15.3156 8.71413 15.5 8.25 15.5H3.75C3.28587 15.5 2.84075 15.3156 2.51256 14.9874C2.18437 14.6592 2 14.2141 2 13.75V3.25C2 2.284 2.784 1.5 3.75 1.5ZM8 14.5H8.25C8.44891 14.5 8.63968 14.421 8.78033 14.2803C8.92098 14.1397 9 13.9489 9 13.75V13.5H8.5C8.36739 13.5 8.24021 13.5527 8.14645 13.6464C8.05268 13.7402 8 13.8674 8 14V14.5ZM8.21 12.528C7.98774 12.3404 7.80908 12.1066 7.68645 11.8429C7.56383 11.5791 7.5002 11.2918 7.5 11.001V10.207L7.307 10.014C7.06053 10.2264 6.76596 10.3755 6.44884 10.4483C6.13172 10.5211 5.80163 10.5154 5.4872 10.4317C5.17277 10.3481 4.88349 10.189 4.64447 9.96824C4.40544 9.74749 4.22388 9.47176 4.11553 9.16496C4.00718 8.85816 3.97532 8.52957 4.02271 8.20767C4.07009 7.88577 4.1953 7.5803 4.38746 7.31774C4.57963 7.05518 4.83295 6.84347 5.12545 6.70097C5.41795 6.55847 5.7408 6.48949 6.066 6.5C6.146 6.40667 6.238 6.321 6.342 6.243C6.67674 5.99253 7.09046 5.87096 7.50749 5.90053C7.92451 5.93009 8.31695 6.10881 8.613 6.404L9 6.792V4.5H8.5C8.10218 4.5 7.72064 4.34196 7.43934 4.06066C7.15804 3.77936 7 3.39782 7 3V2.5H5V3C5 3.39782 4.84196 3.77936 4.56066 4.06066C4.27936 4.34196 3.89782 4.5 3.5 4.5H3V12.5H3.5C3.89782 12.5 4.27936 12.658 4.56066 12.9393C4.84196 13.2206 5 13.6022 5 14V14.5H7V14C6.99993 13.6525 7.12055 13.3157 7.34124 13.0472C7.56194 12.7787 7.86901 12.5952 8.21 12.528ZM8.5 3.5H9V3.25C9 3.05109 8.92098 2.86032 8.78033 2.71967C8.63968 2.57902 8.44891 2.5 8.25 2.5H8V3C8 3.13261 8.05268 3.25979 8.14645 3.35355C8.24021 3.44732 8.36739 3.5 8.5 3.5ZM3 13.5V13.75C3 14.164 3.336 14.5 3.75 14.5H4V14C4 13.8674 3.94732 13.7402 3.85355 13.6464C3.75979 13.5527 3.63261 13.5 3.5 13.5H3ZM6.596 9.303L6.156 8.863C5.98568 8.69348 5.85254 8.49033 5.76508 8.2665C5.67762 8.04268 5.63774 7.80309 5.648 7.563C5.5145 7.61366 5.3934 7.69233 5.29284 7.7937C5.19229 7.89507 5.11461 8.01681 5.06503 8.15071C5.01545 8.28462 4.99512 8.42759 5.00541 8.57C5.0157 8.71242 5.05637 8.85098 5.12468 8.97637C5.19299 9.10175 5.28737 9.21106 5.40145 9.29692C5.51554 9.38279 5.64669 9.44323 5.78608 9.47417C5.92548 9.50512 6.06988 9.50585 6.20959 9.47633C6.34929 9.4468 6.48105 9.3877 6.596 9.303Z"
      fill="white"/>
</svg></span>
                                <div>
                                    <div className="stat-amount">325 ₼</div>
                                    <div className="stat-sub">Veriləcək məbləğ</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SAĞ BLOK */}
                    <div className="amount-card">
                        <div className="amount-card__head">
                            <div className="title">Məbləğ</div>
                            <div className="legend">
                                <div className="legend-row">
                                    <div className={"legend-col"}><span className="dot dot-blue"></span>
                                        Mədaxil
                                    </div>
                                    <>325,00 ₼</>
                                </div>
                                <div className="legend-row">
                                    <div className={"legend-col"}>
                                        <span className="dot dot-yellow"></span>
                                        Məxaric
                                    </div>
                                    <>325,00 ₼</>
                                </div>
                            </div>
                        </div>
                        <div className="amount-card__body">
                            <div className="amount-card__body">
                                <PieWithCallouts values={[65, 35]} labels={["Mədaxil", "Məxaric"]}/>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={"headerr"}>
                    <div className="headd">
                        <h2>Borc əməliyyatları</h2>
                    </div>
                </div>
                <div className="table-toolbar">
                    <div className="filters">
                        <SelectBox
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
                            options={customers}
                            placeholder="Müştəri seç"
                            width={120}
                        />
                        <SelectBox
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            options={categories}
                            placeholder="Kateqoriya seç"
                            width={150}
                        />
                        <SelectBox
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                            options={products}
                            placeholder="Məhsul seç"
                            width={120}
                        />
                    </div>


                </div>

                <div className="admin-borc-h-table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>
                                {activeSearch === 'name' ? (
                                    <div className="th-search">
                                        <input
                                            autoFocus
                                            value={searchName}
                                            onChange={(e) => setSearchName(e.target.value)}
                                            placeholder="Axtar..."
                                        />
                                        <FaTimes onClick={() => {
                                            setActiveSearch(null);
                                            setSearchName('');
                                        }}/>
                                    </div>
                                ) : (
                                    <div className="th-label">
                                        Müştəri
                                        <svg onClick={() => setActiveSearch('name')} xmlns="http://www.w3.org/2000/svg"
                                             width="24" height="24">
                                            <path
                                                d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z"
                                                fill="#7A7A7A"/>
                                        </svg>
                                    </div>
                                )}
                            </th>
                            <th>Kateqoriya</th>
                            <th>Məhsul adı</th>
                            <th>Alınacaq</th>
                            <th>Veriləcək</th>
                            <th>Tarix</th>
                            <th>Qeyd</th>
                            <th>Fəaliyyətlər</th>
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
                                <td>{company.departmentCount}</td>
                                <td>{company.departmentCount}</td>
                                <td>
                                    <div style={{display: 'flex', justifyContent: 'center', gap: '12px'}}>
                                        <svg onClick={() => {
                                            setShowPayment({id: company.id});
                                            setPayAmount("");
                                            setPayDate("");
                                            setPayNote("");
                                        }}
                                             style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" width="25"
                                             height="24" viewBox="0 0 25 24" fill="none">
                                            <path
                                                d="M2.5 4.5H9.257C9.6511 4.49995 10.0414 4.57756 10.4055 4.72838C10.7696 4.8792 11.1004 5.10029 11.379 5.379L14.5 8.5M5.5 13.5H2.5M9 7.5L11 9.5C11.1313 9.63132 11.2355 9.78722 11.3066 9.9588C11.3776 10.1304 11.4142 10.3143 11.4142 10.5C11.4142 10.6857 11.3776 10.8696 11.3066 11.0412C11.2355 11.2128 11.1313 11.3687 11 11.5C10.8687 11.6313 10.7128 11.7355 10.5412 11.8066C10.3696 11.8776 10.1857 11.9142 10 11.9142C9.81428 11.9142 9.63038 11.8776 9.4588 11.8066C9.28722 11.7355 9.13132 11.6313 9 11.5L7.5 10C6.64 10.86 5.277 10.957 4.303 10.227L4 10"
                                                stroke="#747474" stroke-width="1.2" stroke-linecap="round"
                                                stroke-linejoin="round"/>
                                            <path
                                                d="M5.5 11V15.5C5.5 17.386 5.5 18.328 6.086 18.914C6.672 19.5 7.614 19.5 9.5 19.5H18.5C20.386 19.5 21.328 19.5 21.914 18.914C22.5 18.328 22.5 17.386 22.5 15.5V12.5C22.5 10.614 22.5 9.672 21.914 9.086C21.328 8.5 20.386 8.5 18.5 8.5H10"
                                                stroke="#747474" stroke-width="1.2" stroke-linecap="round"
                                                stroke-linejoin="round"/>
                                            <path
                                                d="M15.75 14C15.75 14.4641 15.5656 14.9092 15.2374 15.2374C14.9092 15.5656 14.4641 15.75 14 15.75C13.5359 15.75 13.0908 15.5656 12.7626 15.2374C12.4344 14.9092 12.25 14.4641 12.25 14C12.25 13.5359 12.4344 13.0908 12.7626 12.7626C13.0908 12.4344 13.5359 12.25 14 12.25C14.4641 12.25 14.9092 12.4344 15.2374 12.7626C15.5656 13.0908 15.75 13.5359 15.75 14Z"
                                                stroke="#747474" stroke-width="1.2" stroke-linecap="round"
                                                stroke-linejoin="round"/>
                                        </svg>
                                        <div className={"hrXett"}></div>
                                        <svg style={{cursor: "pointer"}} onClick={() => setDeleteCompanyId(company.id)}
                                             xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             viewBox="0 0 20 20" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                  d="M8.59199 1.875H11.4087C11.5895 1.875 11.747 1.875 11.8953 1.89833C12.1843 1.94462 12.4583 2.05788 12.6956 2.22907C12.933 2.40025 13.1269 2.6246 13.262 2.88417C13.332 3.0175 13.3812 3.16667 13.4387 3.3375L13.5312 3.61667L13.5562 3.6875C13.6316 3.89679 13.772 4.07645 13.9569 4.20016C14.1418 4.32387 14.3614 4.38514 14.5837 4.375H17.0837C17.2494 4.375 17.4084 4.44085 17.5256 4.55806C17.6428 4.67527 17.7087 4.83424 17.7087 5C17.7087 5.16576 17.6428 5.32473 17.5256 5.44194C17.4084 5.55915 17.2494 5.625 17.0837 5.625H2.91699C2.75123 5.625 2.59226 5.55915 2.47505 5.44194C2.35784 5.32473 2.29199 5.16576 2.29199 5C2.29199 4.83424 2.35784 4.67527 2.47505 4.55806C2.59226 4.44085 2.75123 4.375 2.91699 4.375H5.49199C5.71458 4.36966 5.9296 4.29314 6.10552 4.15667C6.28143 4.02019 6.409 3.83094 6.46949 3.61667L6.56283 3.3375C6.61949 3.16667 6.66866 3.0175 6.73783 2.88417C6.87299 2.6245 7.06707 2.40009 7.30453 2.2289C7.542 2.05771 7.81625 1.9445 8.10533 1.89833C8.25366 1.875 8.41116 1.875 8.59116 1.875M7.50616 4.375C7.56387 4.26004 7.61263 4.1408 7.65199 4.01833L7.73533 3.76833C7.81116 3.54083 7.82866 3.495 7.84616 3.46167C7.89115 3.37501 7.95581 3.30009 8.03497 3.24293C8.11413 3.18577 8.20558 3.14795 8.30199 3.1325C8.4106 3.12288 8.51972 3.12037 8.62866 3.125H11.3703C11.6103 3.125 11.6603 3.12667 11.697 3.13333C11.7933 3.14869 11.8847 3.18639 11.9639 3.2434C12.043 3.30041 12.1077 3.37516 12.1528 3.46167C12.1703 3.495 12.1878 3.54083 12.2637 3.76917L12.347 4.01917L12.3795 4.1125C12.4123 4.20361 12.45 4.29111 12.4928 4.375H7.50616Z"
                                                  fill="#ED0303"/>
                                            <path
                                                d="M4.92956 7.04148C4.9185 6.87605 4.84219 6.72179 4.7174 6.61263C4.59261 6.50347 4.42957 6.44835 4.26414 6.4594C4.09871 6.47045 3.94445 6.54676 3.83528 6.67155C3.72612 6.79634 3.671 6.95939 3.68206 7.12482L4.06872 12.9181C4.13956 13.9865 4.19706 14.8498 4.33206 15.5281C4.47289 16.2323 4.71122 16.8207 5.20456 17.2815C5.69789 17.7423 6.30039 17.9423 7.01289 18.0348C7.69789 18.1248 8.56289 18.1248 9.63455 18.1248H10.3671C11.4379 18.1248 12.3037 18.1248 12.9887 18.0348C13.7004 17.9423 14.3037 17.7431 14.7971 17.2815C15.2896 16.8207 15.5279 16.2315 15.6687 15.5281C15.8037 14.8506 15.8604 13.9865 15.9321 12.9181L16.3187 7.12482C16.3298 6.95939 16.2747 6.79634 16.1655 6.67155C16.0563 6.54676 15.9021 6.47045 15.7366 6.4594C15.5712 6.44835 15.4082 6.50347 15.2834 6.61263C15.1586 6.72179 15.0823 6.87605 15.0712 7.04148L14.6879 12.7915C14.6129 13.914 14.5596 14.6956 14.4429 15.2831C14.3287 15.854 14.1704 16.1556 13.9429 16.369C13.7146 16.5823 13.4029 16.7206 12.8262 16.7956C12.2321 16.8731 11.4487 16.8748 10.3229 16.8748H9.67789C8.55289 16.8748 7.76956 16.8731 7.17456 16.7956C6.59789 16.7206 6.28622 16.5823 6.05789 16.369C5.83039 16.1556 5.67206 15.854 5.55789 15.284C5.44122 14.6956 5.38789 13.914 5.31289 12.7906L4.92956 7.04148Z"
                                                fill="#ED0303"/>
                                            <path
                                                d="M7.85428 8.54511C8.01914 8.52859 8.18382 8.57821 8.31211 8.68306C8.44041 8.78792 8.52182 8.93942 8.53844 9.10428L8.95511 13.2709C8.96731 13.4335 8.91551 13.5944 8.81076 13.7193C8.70601 13.8442 8.55659 13.9233 8.39438 13.9396C8.23217 13.9559 8.07001 13.9082 7.94249 13.8066C7.81497 13.7051 7.73218 13.5577 7.71178 13.3959L7.29511 9.22928C7.27859 9.06441 7.32821 8.89973 7.43306 8.77144C7.53792 8.64314 7.68942 8.56174 7.85428 8.54511ZM12.1459 8.54511C12.3106 8.56174 12.462 8.64303 12.5668 8.77114C12.6717 8.89925 12.7214 9.06371 12.7051 9.22844L12.2884 13.3951C12.2678 13.5565 12.185 13.7036 12.0576 13.8049C11.9302 13.9062 11.7683 13.9538 11.6064 13.9377C11.4444 13.9215 11.2952 13.8428 11.1904 13.7183C11.0856 13.5938 11.0334 13.4333 11.0451 13.2709L11.4618 9.10428C11.4784 8.93958 11.5597 8.78821 11.6878 8.68338C11.8159 8.57855 11.9812 8.52882 12.1459 8.54511Z"
                                                fill="#ED0303"/>
                                        </svg>

                                    </div>
                                </td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>


            </div>
            {deleteCompanyId !== null && (
                <div className="modal-overlay" onClick={() => setDeleteCompanyId(null)}>

                    <div className="delete-modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="delete-icon-wrapper">
                            <div className={"delete-icon-circle-one"}>
                                <div className="delete-icon-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="44" viewBox="0 0 45 44"
                                         fill="none">
                                        <path
                                            d="M22.5008 24.566L27.8175 29.8827C28.1536 30.2188 28.5814 30.3869 29.1009 30.3869C29.6203 30.3869 30.0481 30.2188 30.3842 29.8827C30.7203 29.5466 30.8884 29.1188 30.8884 28.5994C30.8884 28.0799 30.7203 27.6522 30.3842 27.3161L25.0675 21.9994L30.3842 16.6827C30.7203 16.3466 30.8884 15.9188 30.8884 15.3994C30.8884 14.8799 30.7203 14.4521 30.3842 14.116C30.0481 13.7799 29.6203 13.6119 29.1009 13.6119C28.5814 13.6119 28.1536 13.7799 27.8175 14.116L22.5008 19.4327L17.1842 14.116C16.8481 13.7799 16.4203 13.6119 15.9008 13.6119C15.3814 13.6119 14.9536 13.7799 14.6175 14.116C14.2814 14.4521 14.1133 14.8799 14.1133 15.3994C14.1133 15.9188 14.2814 16.3466 14.6175 16.6827L19.9342 21.9994L14.6175 27.3161C14.2814 27.6522 14.1133 28.0799 14.1133 28.5994C14.1133 29.1188 14.2814 29.5466 14.6175 29.8827C14.9536 30.2188 15.3814 30.3869 15.9008 30.3869C16.4203 30.3869 16.8481 30.2188 17.1842 29.8827L22.5008 24.566ZM22.5008 40.3327C19.9647 40.3327 17.5814 39.8512 15.3508 38.8881C13.1203 37.925 11.18 36.619 9.52999 34.9702C7.87999 33.3215 6.57404 31.3812 5.61215 29.1494C4.65026 26.9176 4.16871 24.5343 4.16748 21.9994C4.16626 19.4645 4.64782 17.0811 5.61215 14.8494C6.57649 12.6176 7.88243 10.6773 9.52999 9.02852C11.1775 7.37974 13.1178 6.0738 15.3508 5.11068C17.5838 4.14757 19.9672 3.66602 22.5008 3.66602C25.0345 3.66602 27.4179 4.14757 29.6509 5.11068C31.8839 6.0738 33.8241 7.37974 35.4717 9.02852C37.1193 10.6773 38.4258 12.6176 39.3914 14.8494C40.3569 17.0811 40.8379 19.4645 40.8342 21.9994C40.8305 24.5343 40.349 26.9176 39.3895 29.1494C38.4301 31.3812 37.1241 33.3215 35.4717 34.9702C33.8193 36.619 31.879 37.9256 29.6509 38.8899C27.4227 39.8542 25.0394 40.3352 22.5008 40.3327Z"
                                            fill="#E60D0D"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <p className="delete-message">Əməliyyatı silmək istədiyinizə əminsiz?</p>
                        <div className="delete-modal-actions">
                            <button className="cancel-btn" onClick={() => setDeleteCompanyId(null)}>Ləğv et</button>
                            <button
                                className="confirm-btn"
                                onClick={async () => {
                                    try {
                                        await deleteCompany(deleteCompanyId);
                                        setDeleteCompanyId(null);
                                        refetch();
                                        showPopup("Şirkəti uğurla sildiniz", "Seçilmiş şirkət sistemdən silindi", "success")
                                    } catch {
                                        showPopup("Sistem xətası", "Əməliyyat tamamlanmadı. Təkrar cəhd edin və ya dəstəyə müraciət edin.", "error")
                                    }
                                }}
                            >
                                Sil
                            </button>

                        </div>
                    </div>
                </div>
            )}
            {showPayment && (
                <div className="modal-overlay" onClick={() => setShowPayment(null)}>
                    <div className="payment-modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="modalHead">
                            <h3>Ödəniş</h3>
                            <span className="pm-close" onClick={() => setShowPayment(null)} aria-label="Bağla"><svg
                                xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"
                                fill="none">
  <path d="M10.3333 1L1 10.3333M1 1L10.3333 10.3333" stroke="black" stroke-width="1.5" stroke-linecap="round"
        stroke-linejoin="round"/>
</svg></span>
                        </div>

                        <div className="pm-body">
                            {/* Məbləğ */}
                            <label className="pm-label">Ödəniş məbləği daxil et :</label>
                            <div className="pm-row">
                                <div className="pm-input">
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        placeholder="0"
                                        value={payAmount}
                                        onChange={(e) => setPayAmount(e.target.value)}
                                    />
                                </div>
                                {/* sağda kiçik “pill” — dəyəri və valyutanı göstərir */}
                                <span className="pm-amount-pill">{payAmount ? payAmount : 0} ₼</span>
                            </div>

                            {/* Tarix */}
                            <label className="pm-label">Ödəniş tarixi :</label>
                            <div className="pm-row">
                                {/* Görünən input: oxunaqlı dd/mm/yy */}
                                <div className="pm-input pm-date-visible">
                                    <input
                                        type="text"
                                        placeholder="dd/mm/yy"
                                        value={payDate}
                                        onChange={(e) => setPayDate(e.target.value)}
                                        readOnly
                                    />
                                </div>

                                {/* Kvadrat təqvim düyməsi: native date-i açır */}
                                <button
                                    type="button"
                                    className="pm-icon-btn"
                                    onClick={() => nativeDateRef.current?.showPicker?.() || nativeDateRef.current?.click()}
                                    aria-label="Tarix seç"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                         fill="none">
                                        <path
                                            d="M7 3V6M17 3V6M4 9H20M5 5H19C20.104 5 21 5.896 21 7V19C21 20.104 20.104 21 19 21H5C3.896 21 3 20.104 3 19V7C3 5.896 3.896 5 5 5Z"
                                            stroke="#6F6F6F" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                </button>

                                {/* Gizli native date input */}
                                <input
                                    ref={nativeDateRef}
                                    type="date"
                                    className="pm-native-date"
                                    onChange={handlePickDate}
                                />
                            </div>

                            {/* Qeyd */}
                            <div className="pm-textarea">
                                <textarea placeholder="Qeyd..." value={payNote}
                                          onChange={(e) => setPayNote(e.target.value)}/>
                            </div>
                            <div className="pm-actions">
                                <button className="pm-cancel">Ləğv et</button>
                                <button className="pm-confirm" onClick={() => {/* API yazarsan */
                                }}>Təsdiqlə
                                </button>
                            </div>
                        </div>


                    </div>
                </div>
            )}
        </div>
    );
};

export default BorcHesabati;
