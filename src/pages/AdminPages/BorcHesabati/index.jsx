import {useState} from "react";
import "./index.scss";
import {NavLink, useParams} from "react-router-dom";
import {FaTimes} from "react-icons/fa";
import PieWithCallouts from "../../../components/Statistika/Cart3/index.jsx";
import SelectBox from "../../../components/SelectBox/index.jsx";
import {
    useGetAllCategoriesQuery, useGetByIdCompaniesQuery,
    useGetSummaryChart2Query, useGetSummaryChartQuery,
} from "../../../services/adminApi.jsx";

const BorcHesabati = () => {
    const {id} = useParams();

const {data:getByIdCompanies} = useGetByIdCompaniesQuery(id)
    const company = getByIdCompanies?.data
    const {data: getAllCategories} = useGetAllCategoriesQuery();
    const categories = getAllCategories?.data || [];

    // Seçilmiş filterlər
    const [categorySummary, setCategorySummary] = useState("__all__");
    const [categoryTable, setCategoryTable] = useState("__all__");
    const [product, setProduct] = useState("__all__");
    const { data: getByIdCashOperator,refetch } = useGetSummaryChartQuery({companyId:id});
    const operations = getByIdCashOperator?.data;
// Məhsullar (table filter üçün category-yə görə)
    const products =
        categoryTable !== "__all__"
            ? categories.find((c) => c.id === categoryTable)?.products || []
            : categories.flatMap((c) => c.products || []);

// Summary chart
    const {data: getSummaryChart} = useGetSummaryChart2Query({
        companyId: id,
        categoryId: categorySummary === "__all__" ? "" : categorySummary,
        productId: product === "__all__" ? "" : product
    });


    // Table search
    const [searchName, setSearchName] = useState('');
    const [activeSearch, setActiveSearch] = useState(null);

    // ===== API gələn summary dataları =====
    const cards = getSummaryChart?.data?.cards || {willReceive: 0, willPay: 0};
    const labels = getSummaryChart?.data?.labels || ["Mədaxil", "Məxaric"];
    const chartData = getSummaryChart?.data?.data || [0, 0];
// Filtrlənmiş əməliyyatlar
    const filteredOperations = operations?.filter((op) => {
        const matchCategory =
            categoryTable === "__all__" || op.categoryId === categoryTable;
        const matchProduct =
            product === "__all__" || op.productId === product;
        const matchSearch =
            !searchName ||
            op.categoryName?.toLowerCase().includes(searchName.toLowerCase()) ||
            op.productName?.toLowerCase().includes(searchName.toLowerCase());

        return matchCategory && matchProduct && matchSearch;
    }) || [];

    return (
        <div className="admin-borc-h-main">
            <div className="admin-borc-h">
                <div className="headerr">
                    <div className="head">
                        <h2>Borc hesabatı</h2>
                    </div>
                </div>

                {/* Şirkət */}
                <div className={"root"}>
                    <h2>
                        <NavLink className="link" to="/admin/hesabat/borc-h">— Şirkət seçimi</NavLink>{' '}
                            — {company?.name}
                    </h2>
                </div>

                {/* ===== SUMMARY SECTION ===== */}
                <div className="summary-section">
                    {/* SOL BLOK */}
                    <div className="summary-left">
                        <div className="summary-top">
                            <div className="filter-group">
                                <span className="filter-label">Kateqori :</span>
                                <SelectBox
                                    value={categorySummary}
                                    onChange={(id) => {
                                        setCategorySummary(id);
                                    }}
                                    options={[{id: "__all__", name: "Hamısı"}, ...categories]}
                                    placeholder="Kateqori seç"
                                    width={140}
                                />
                            </div>
                        </div>

                        <div className="summary-cards">
                            <div className="stat-card is-green">
                                <span className="currency-pill"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
  <path d="M9 7.5C9 8.03043 8.78929 8.53914 8.41421 8.91421C8.03914 9.28929 7.53043 9.5 7 9.5C6.46957 9.5 5.96086 9.28929 5.58579 8.91421C5.21071 8.53914 5 8.03043 5 7.5C5 6.96957 5.21071 6.46086 5.58579 6.08579C5.96086 5.71071 6.46957 5.5 7 5.5C7.53043 5.5 8.03914 5.71071 8.41421 6.08579C8.78929 6.46086 9 6.96957 9 7.5ZM8 7.5C8 7.23478 7.89464 6.98043 7.70711 6.79289C7.51957 6.60536 7.26522 6.5 7 6.5C6.73478 6.5 6.48043 6.60536 6.29289 6.79289C6.10536 6.98043 6 7.23478 6 7.5C6 7.76522 6.10536 8.01957 6.29289 8.20711C6.48043 8.39464 6.73478 8.5 7 8.5C7.26522 8.5 7.51957 8.39464 7.70711 8.20711C7.89464 8.01957 8 7.76522 8 7.5ZM1 4.75C1 4.06 1.56 3.5 2.25 3.5H11.75C12.44 3.5 13 4.06 13 4.75V10.25C13 10.94 12.44 11.5 11.75 11.5H2.25C1.56 11.5 1 10.94 1 10.25V4.75ZM2.25 4.5C2.1837 4.5 2.12011 4.52634 2.07322 4.57322C2.02634 4.62011 2 4.6837 2 4.75V5.5H2.5C2.63261 5.5 2.75979 5.44732 2.85355 5.35355C2.94732 5.25979 3 5.13261 3 5V4.5H2.25ZM2 10.25C2 10.388 2.112 10.5 2.25 10.5H3V10C3 9.86739 2.94732 9.74021 2.85355 9.64645C2.75979 9.55268 2.63261 9.5 2.5 9.5H2V10.25ZM4 10V10.5H10V10C10 9.60218 10.158 9.22064 10.4393 8.93934C10.7206 8.65804 11.1022 8.5 11.5 8.5H12V6.5H11.5C11.1022 6.5 10.7206 6.34196 10.4393 6.06066C10.158 5.77936 10 5.39782 10 5V4.5H4V5C4 5.39782 3.84196 5.77936 3.56066 6.06066C3.27936 6.34196 2.89782 6.5 2.5 6.5H2V8.5H2.5C2.89782 8.5 3.27936 8.65804 3.56066 8.93934C3.84196 9.22064 4 9.60218 4 10ZM11 10.5H11.75C11.8163 10.5 11.8799 10.4737 11.9268 10.4268C11.9737 10.3799 12 10.3163 12 10.25V9.5H11.5C11.3674 9.5 11.2402 9.55268 11.1464 9.64645C11.0527 9.74021 11 9.86739 11 10V10.5ZM12 5.5V4.75C12 4.6837 11.9737 4.62011 11.9268 4.57322C11.8799 4.52634 11.8163 4.5 11.75 4.5H11V5C11 5.13261 11.0527 5.25979 11.1464 5.35355C11.2402 5.44732 11.3674 5.5 11.5 5.5H12ZM4.5 13.5C4.18322 13.5001 3.87453 13.3999 3.61818 13.2138C3.36184 13.0277 3.17099 12.7652 3.073 12.464C3.21167 12.488 3.354 12.5 3.5 12.5H11.75C12.3467 12.5 12.919 12.2629 13.341 11.841C13.7629 11.419 14 10.8467 14 10.25V5.585C14.2926 5.68844 14.5459 5.88008 14.725 6.13351C14.9041 6.38694 15.0002 6.68967 15 7V10.25C15 10.6768 14.9159 11.0994 14.7526 11.4937C14.5893 11.888 14.3499 12.2463 14.0481 12.5481C13.7463 12.8499 13.388 13.0893 12.9937 13.2526C12.5994 13.4159 12.1768 13.5 11.75 13.5H4.5Z" fill="white"/>
</svg></span>
                                <div>
                                    <div className="stat-amount">{cards.willReceive} ₼</div>
                                    <div className="stat-sub">Alınacaq məbləğ</div>
                                </div>
                            </div>
                            <div className="stat-card is-red">
                                <span className="currency-pill"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
  <path d="M3 3.25V3.5H3.5C3.63261 3.5 3.75979 3.44732 3.85355 3.35355C3.94732 3.25979 4 3.13261 4 3V2.5H3.75C3.55109 2.5 3.36032 2.57902 3.21967 2.71967C3.07902 2.86032 3 3.05109 3 3.25ZM3.75 1.5H8.25C9.216 1.5 10 2.284 10 3.25V3.793L12.975 6.768C13.3 7.09303 13.5578 7.47889 13.7337 7.90355C13.9095 8.32822 14 8.78336 14 9.243V15C14 15.1326 13.9473 15.2598 13.8536 15.3536C13.7598 15.4473 13.6326 15.5 13.5 15.5C13.3674 15.5 13.2402 15.4473 13.1464 15.3536C13.0527 15.2598 13 15.1326 13 15V9.243C13.0001 8.91467 12.9354 8.58955 12.8099 8.28619C12.6843 7.98284 12.5001 7.70719 12.268 7.475L10 5.207V7.792L10.854 8.646C10.9479 8.73975 11.0007 8.86696 11.0008 8.99965C11.0009 9.13233 10.9483 9.25961 10.8545 9.3535C10.7607 9.44739 10.6335 9.50019 10.5009 9.50028C10.3682 9.50037 10.2409 9.44775 10.147 9.354L9.164 8.37L9.13 8.336L7.906 7.112C7.83793 7.04136 7.75647 6.98499 7.66636 6.9462C7.57626 6.90741 7.47932 6.88698 7.38123 6.88609C7.28313 6.8852 7.18585 6.90388 7.09506 6.94103C7.00426 6.97819 6.92179 7.03307 6.85246 7.10247C6.78312 7.17187 6.72832 7.25439 6.69126 7.34522C6.65419 7.43605 6.63561 7.53335 6.63659 7.63145C6.63757 7.72954 6.6581 7.82645 6.69697 7.91652C6.73585 8.00659 6.79229 8.088 6.863 8.156L8.354 9.646C8.40058 9.69244 8.43754 9.74761 8.46277 9.80835C8.48799 9.8691 8.50099 9.93423 8.501 10V11C8.501 11.265 8.60622 11.5192 8.79354 11.7068C8.98086 11.8943 9.23496 11.9997 9.5 12C9.63261 12 9.75979 12.0527 9.85355 12.1464C9.94732 12.2402 10 12.3674 10 12.5V13.75C10 14.2141 9.81563 14.6592 9.48744 14.9874C9.15925 15.3156 8.71413 15.5 8.25 15.5H3.75C3.28587 15.5 2.84075 15.3156 2.51256 14.9874C2.18437 14.6592 2 14.2141 2 13.75V3.25C2 2.284 2.784 1.5 3.75 1.5ZM8 14.5H8.25C8.44891 14.5 8.63968 14.421 8.78033 14.2803C8.92098 14.1397 9 13.9489 9 13.75V13.5H8.5C8.36739 13.5 8.24021 13.5527 8.14645 13.6464C8.05268 13.7402 8 13.8674 8 14V14.5ZM8.21 12.528C7.98774 12.3404 7.80908 12.1066 7.68645 11.8429C7.56383 11.5791 7.5002 11.2918 7.5 11.001V10.207L7.307 10.014C7.06053 10.2264 6.76596 10.3755 6.44884 10.4483C6.13172 10.5211 5.80163 10.5154 5.4872 10.4317C5.17277 10.3481 4.88349 10.189 4.64447 9.96824C4.40544 9.74749 4.22388 9.47176 4.11553 9.16496C4.00718 8.85816 3.97532 8.52957 4.02271 8.20767C4.07009 7.88577 4.1953 7.5803 4.38746 7.31774C4.57963 7.05518 4.83295 6.84347 5.12545 6.70097C5.41795 6.55847 5.7408 6.48949 6.066 6.5C6.146 6.40667 6.238 6.321 6.342 6.243C6.67674 5.99253 7.09046 5.87096 7.50749 5.90053C7.92451 5.93009 8.31695 6.10881 8.613 6.404L9 6.792V4.5H8.5C8.10218 4.5 7.72064 4.34196 7.43934 4.06066C7.15804 3.77936 7 3.39782 7 3V2.5H5V3C5 3.39782 4.84196 3.77936 4.56066 4.06066C4.27936 4.34196 3.89782 4.5 3.5 4.5H3V12.5H3.5C3.89782 12.5 4.27936 12.658 4.56066 12.9393C4.84196 13.2206 5 13.6022 5 14V14.5H7V14C6.99993 13.6525 7.12055 13.3157 7.34124 13.0472C7.56194 12.7787 7.86901 12.5952 8.21 12.528ZM8.5 3.5H9V3.25C9 3.05109 8.92098 2.86032 8.78033 2.71967C8.63968 2.57902 8.44891 2.5 8.25 2.5H8V3C8 3.13261 8.05268 3.25979 8.14645 3.35355C8.24021 3.44732 8.36739 3.5 8.5 3.5ZM3 13.5V13.75C3 14.164 3.336 14.5 3.75 14.5H4V14C4 13.8674 3.94732 13.7402 3.85355 13.6464C3.75979 13.5527 3.63261 13.5 3.5 13.5H3ZM6.596 9.303L6.156 8.863C5.98568 8.69348 5.85254 8.49033 5.76508 8.2665C5.67762 8.04268 5.63774 7.80309 5.648 7.563C5.5145 7.61366 5.3934 7.69233 5.29284 7.7937C5.19229 7.89507 5.11461 8.01681 5.06503 8.15071C5.01545 8.28462 4.99512 8.42759 5.00541 8.57C5.0157 8.71242 5.05637 8.85098 5.12468 8.97637C5.19299 9.10175 5.28737 9.21106 5.40145 9.29692C5.51554 9.38279 5.64669 9.44323 5.78608 9.47417C5.92548 9.50512 6.06988 9.50585 6.20959 9.47633C6.34929 9.4468 6.48105 9.3877 6.596 9.303Z" fill="white"/>
</svg></span>
                                <div>
                                    <div className="stat-amount">{cards.willPay} ₼</div>
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
                                    <div className={"legend-col"}>
                                        <span className="dot dot-blue"></span> {labels[0]}
                                    </div>
                                    <>{chartData[0]} ₼</>
                                </div>
                                <div className="legend-row">
                                    <div className={"legend-col"}>
                                        <span className="dot dot-yellow"></span> {labels[1]}
                                    </div>
                                    <>{chartData[1]} ₼</>
                                </div>
                            </div>
                        </div>
                        <div className="amount-card__body">
                            <PieWithCallouts values={chartData} labels={labels}/>
                        </div>
                    </div>
                </div>

                {/* ===== TABLE FILTER ===== */}
                <div className="headerr">
                    <div className="headd">
                        <h2>Borc əməliyyatları</h2>
                    </div>
                </div>
                <div className="table-toolbar">
                    <div className="filters">
                        <SelectBox
                            value={categoryTable}
                            onChange={(id) => {
                                setCategoryTable(id);
                                setProduct("__all__"); // category dəyişəndə product sıfırlanır
                            }}
                            options={[{ id: "__all__", name: "Hamısı" }, ...categories]}
                            placeholder="Kateqoriya seç"
                            width={150}
                        />
                        <SelectBox
                            value={product}
                            onChange={(id) => setProduct(id)}
                            options={[{ id: "__all__", name: "Hamısı" }, ...products]}
                            placeholder="Məhsul seç"
                            width={120}
                        />
                    </div>
                </div>

                {/* ===== TABLE ===== */}
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
                                        Kateqoriya
                                        <svg onClick={() => setActiveSearch('name')} xmlns="http://www.w3.org/2000/svg"
                                             width="24" height="24">
                                            <path
                                                d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z"
                                                fill="#7A7A7A"/>
                                        </svg>
                                    </div>
                                )}
                            </th>
                            <th>Məhsul adı</th>
                            <th>Alınacaq</th>
                            <th>Veriləcək</th>
                            <th>Tarix</th>
                            <th>Qeyd</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredOperations.length > 0 ? (
                            filteredOperations.map((op) => (
                                <tr key={op.id}>
                                    <td>{op.categoryName}</td>
                                    <td>{op.productName}</td>
                                    <td>{op.receivedAmount} ₼</td>
                                    <td>{op.paidAmount} ₼</td>
                                    <td>{op.createTime}</td>
                                    <td>{op.description}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center", padding: "12px" }}>
                                    Məlumat tapılmadı
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BorcHesabati;
