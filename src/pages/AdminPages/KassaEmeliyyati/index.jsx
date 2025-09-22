import React, { useState } from "react";
import "./index.scss";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import DoughnutChartCard from "../../../components/Statistika/Chart2/index.jsx";
import {FaTimes} from "react-icons/fa";
import {
    useGetAllCategoriesQuery,
    useGetByIdCashOperatorQuery
} from "../../../services/adminApi.jsx";


const SelectBox = ({ value, onChange, options, placeholder, width = 190 }) => (
    <label className={`select2 ${value === "__all__" ? "is-placeholder" : ""}`} style={{ width }}>
        <select value={value} onChange={onChange}>
            <option value="__all__" disabled hidden>
                {placeholder}
            </option>
            {options?.map((opt) => (
                <option key={opt.id} value={opt.id}>
                    {opt.name}
                </option>
            ))}
        </select>
        <svg className="chev" width="16" height="16" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" fill="none" stroke="#9A9A9A" strokeWidth="2" />
        </svg>
    </label>
);


const KassaEmeliyyati = () => {
    const {id}= useParams()
    const {data:getByIdCashOperator} = useGetByIdCashOperatorQuery(id)
    const companies = getByIdCashOperator?.data

    const {data:getAllCategories} = useGetAllCategoriesQuery()
    const categories = getAllCategories?.data


    const [searchName, setSearchName] = useState('');
    const [activeSearch, setActiveSearch] = useState(null);
    const [deleteCompanyId, setDeleteCompanyId] = useState(null);
    const navigate = useNavigate();
    const [category, setCategory] = useState("__all__");
    const [product, setProduct] = useState("__all__");
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryChange = (e) => {
        const selectedId = e.target.value;
        setCategory(selectedId);
        const foundCategory = categories?.find(c => c.id === selectedId);
        setSelectedCategory(foundCategory);
    };





    return (
        <div className="admin-kassa-e-main">
            <div className="admin-kassa-e">
                <div className="headerr">
                    <div className="head">
                        <h2>Kassa əməliyyatı</h2>
                    </div>
                </div>
                <div className={"root"}>
                    <h2 >
                        <NavLink className="link" to="/admin/emeliyyat/kassa-e">— Şirkət seçimi</NavLink>{' '}
                        — UV Demo
                    </h2>
                </div>
                <div style={{
                    marginBottom:'32px'
                }}>
                    <DoughnutChartCard/>
                </div>
                <div className="table-toolbar">
                    <div className="filters">

                        <SelectBox
                            value={category}
                            onChange={handleCategoryChange}
                            options={categories}
                            placeholder="Kateqoriya seç"
                            width={150}
                        />

                        <SelectBox
                            value={product}
                            onChange={(e)=>setProduct(e.target.value)}
                            options={selectedCategory?.products || []}
                            placeholder="Məhsul seç"
                            width={120}
                        />


                    </div>

                    <button className="create-op" onClick={()=>navigate(`/admin/emeliyyat/kassa-e/add/${id}`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M12.4258 22.5C6.63578 22.5 1.92578 17.79 1.92578 12C1.92578 6.21 6.63578 1.5 12.4258 1.5C18.2158 1.5 22.9258 6.21 22.9258 12C22.9258 17.79 18.2158 22.5 12.4258 22.5ZM12.4258 3C7.46078 3 3.42578 7.035 3.42578 12C3.42578 16.965 7.46078 21 12.4258 21C17.3908 21 21.4258 16.965 21.4258 12C21.4258 7.035 17.3908 3 12.4258 3Z" fill="white"/>
                            <path d="M12.4258 17.25C12.0058 17.25 11.6758 16.92 11.6758 16.5V7.5C11.6758 7.08 12.0058 6.75 12.4258 6.75C12.8458 6.75 13.1758 7.08 13.1758 7.5V16.5C13.1758 16.92 12.8458 17.25 12.4258 17.25Z" fill="white"/>
                            <path d="M16.9258 12.75H7.92578C7.50578 12.75 7.17578 12.42 7.17578 12C7.17578 11.58 7.50578 11.25 7.92578 11.25H16.9258C17.3458 11.25 17.6758 11.58 17.6758 12C17.6758 12.42 17.3458 12.75 16.9258 12.75Z" fill="white"/>
                        </svg>
                        Yeni əməliyyat yarat
                    </button>
                </div>

                <div className="admin-kassa-e-table-wrapper">
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
                                        <FaTimes onClick={() => { setActiveSearch(null); setSearchName(''); }} />
                                    </div>
                                ) : (
                                    <div className="th-label">
                                        Kateqoriya
                                        <svg onClick={() => setActiveSearch('name')} xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                            <path d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z" fill="#7A7A7A"/>
                                        </svg>
                                    </div>
                                )}
                            </th>
                            <th>Məhsul adı</th>
                            <th>Mədaxil</th>
                            <th>Məxaric</th>
                            <th>Tarix</th>
                            <th>Qeyd</th>
                            <th>Fəaliyyətlər</th>
                        </tr>
                        </thead>
                        <tbody>
                        {companies?.map((company) => (
                            <tr key={company.id}>
                                <td>{company.name}</td>
                                <td>{company.departmentCount}</td>
                                <td>{company.departmentCount}</td>
                                <td>{company.departmentCount}</td>
                                <td>{company.departmentCount}</td>
                                <td>{company.departmentCount}</td>
                                <td>{company.departmentCount}</td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>

                                        <svg style={{cursor:"pointer"}} onClick={() => setDeleteCompanyId(company.id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.59199 1.875H11.4087C11.5895 1.875 11.747 1.875 11.8953 1.89833C12.1843 1.94462 12.4583 2.05788 12.6956 2.22907C12.933 2.40025 13.1269 2.6246 13.262 2.88417C13.332 3.0175 13.3812 3.16667 13.4387 3.3375L13.5312 3.61667L13.5562 3.6875C13.6316 3.89679 13.772 4.07645 13.9569 4.20016C14.1418 4.32387 14.3614 4.38514 14.5837 4.375H17.0837C17.2494 4.375 17.4084 4.44085 17.5256 4.55806C17.6428 4.67527 17.7087 4.83424 17.7087 5C17.7087 5.16576 17.6428 5.32473 17.5256 5.44194C17.4084 5.55915 17.2494 5.625 17.0837 5.625H2.91699C2.75123 5.625 2.59226 5.55915 2.47505 5.44194C2.35784 5.32473 2.29199 5.16576 2.29199 5C2.29199 4.83424 2.35784 4.67527 2.47505 4.55806C2.59226 4.44085 2.75123 4.375 2.91699 4.375H5.49199C5.71458 4.36966 5.9296 4.29314 6.10552 4.15667C6.28143 4.02019 6.409 3.83094 6.46949 3.61667L6.56283 3.3375C6.61949 3.16667 6.66866 3.0175 6.73783 2.88417C6.87299 2.6245 7.06707 2.40009 7.30453 2.2289C7.542 2.05771 7.81625 1.9445 8.10533 1.89833C8.25366 1.875 8.41116 1.875 8.59116 1.875M7.50616 4.375C7.56387 4.26004 7.61263 4.1408 7.65199 4.01833L7.73533 3.76833C7.81116 3.54083 7.82866 3.495 7.84616 3.46167C7.89115 3.37501 7.95581 3.30009 8.03497 3.24293C8.11413 3.18577 8.20558 3.14795 8.30199 3.1325C8.4106 3.12288 8.51972 3.12037 8.62866 3.125H11.3703C11.6103 3.125 11.6603 3.12667 11.697 3.13333C11.7933 3.14869 11.8847 3.18639 11.9639 3.2434C12.043 3.30041 12.1077 3.37516 12.1528 3.46167C12.1703 3.495 12.1878 3.54083 12.2637 3.76917L12.347 4.01917L12.3795 4.1125C12.4123 4.20361 12.45 4.29111 12.4928 4.375H7.50616Z" fill="#ED0303"/>
                                            <path d="M4.92956 7.04148C4.9185 6.87605 4.84219 6.72179 4.7174 6.61263C4.59261 6.50347 4.42957 6.44835 4.26414 6.4594C4.09871 6.47045 3.94445 6.54676 3.83528 6.67155C3.72612 6.79634 3.671 6.95939 3.68206 7.12482L4.06872 12.9181C4.13956 13.9865 4.19706 14.8498 4.33206 15.5281C4.47289 16.2323 4.71122 16.8207 5.20456 17.2815C5.69789 17.7423 6.30039 17.9423 7.01289 18.0348C7.69789 18.1248 8.56289 18.1248 9.63455 18.1248H10.3671C11.4379 18.1248 12.3037 18.1248 12.9887 18.0348C13.7004 17.9423 14.3037 17.7431 14.7971 17.2815C15.2896 16.8207 15.5279 16.2315 15.6687 15.5281C15.8037 14.8506 15.8604 13.9865 15.9321 12.9181L16.3187 7.12482C16.3298 6.95939 16.2747 6.79634 16.1655 6.67155C16.0563 6.54676 15.9021 6.47045 15.7366 6.4594C15.5712 6.44835 15.4082 6.50347 15.2834 6.61263C15.1586 6.72179 15.0823 6.87605 15.0712 7.04148L14.6879 12.7915C14.6129 13.914 14.5596 14.6956 14.4429 15.2831C14.3287 15.854 14.1704 16.1556 13.9429 16.369C13.7146 16.5823 13.4029 16.7206 12.8262 16.7956C12.2321 16.8731 11.4487 16.8748 10.3229 16.8748H9.67789C8.55289 16.8748 7.76956 16.8731 7.17456 16.7956C6.59789 16.7206 6.28622 16.5823 6.05789 16.369C5.83039 16.1556 5.67206 15.854 5.55789 15.284C5.44122 14.6956 5.38789 13.914 5.31289 12.7906L4.92956 7.04148Z" fill="#ED0303"/>
                                            <path d="M7.85428 8.54511C8.01914 8.52859 8.18382 8.57821 8.31211 8.68306C8.44041 8.78792 8.52182 8.93942 8.53844 9.10428L8.95511 13.2709C8.96731 13.4335 8.91551 13.5944 8.81076 13.7193C8.70601 13.8442 8.55659 13.9233 8.39438 13.9396C8.23217 13.9559 8.07001 13.9082 7.94249 13.8066C7.81497 13.7051 7.73218 13.5577 7.71178 13.3959L7.29511 9.22928C7.27859 9.06441 7.32821 8.89973 7.43306 8.77144C7.53792 8.64314 7.68942 8.56174 7.85428 8.54511ZM12.1459 8.54511C12.3106 8.56174 12.462 8.64303 12.5668 8.77114C12.6717 8.89925 12.7214 9.06371 12.7051 9.22844L12.2884 13.3951C12.2678 13.5565 12.185 13.7036 12.0576 13.8049C11.9302 13.9062 11.7683 13.9538 11.6064 13.9377C11.4444 13.9215 11.2952 13.8428 11.1904 13.7183C11.0856 13.5938 11.0334 13.4333 11.0451 13.2709L11.4618 9.10428C11.4784 8.93958 11.5597 8.78821 11.6878 8.68338C11.8159 8.57855 11.9812 8.52882 12.1459 8.54511Z" fill="#ED0303"/>
                                        </svg>

                                    </div>
                                </td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className={'kecid'}>
                    <p>Əgər istəsəniz bura daxil olaraq kassa hesabatına keçid edə bilərsiniz.</p>
                    <button onClick={()=>navigate("/admin/hesabat/kassa-h/:id")}>Keçid et</button>
                </div>


            </div>
            {deleteCompanyId  !== null && (
                <div className="modal-overlay" onClick={() => setDeleteCompanyId(null)}>

                    <div className="delete-modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="delete-icon-wrapper">
                            <div className={"delete-icon-circle-one"}>
                                <div className="delete-icon-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="44" viewBox="0 0 45 44" fill="none">
                                        <path d="M22.5008 24.566L27.8175 29.8827C28.1536 30.2188 28.5814 30.3869 29.1009 30.3869C29.6203 30.3869 30.0481 30.2188 30.3842 29.8827C30.7203 29.5466 30.8884 29.1188 30.8884 28.5994C30.8884 28.0799 30.7203 27.6522 30.3842 27.3161L25.0675 21.9994L30.3842 16.6827C30.7203 16.3466 30.8884 15.9188 30.8884 15.3994C30.8884 14.8799 30.7203 14.4521 30.3842 14.116C30.0481 13.7799 29.6203 13.6119 29.1009 13.6119C28.5814 13.6119 28.1536 13.7799 27.8175 14.116L22.5008 19.4327L17.1842 14.116C16.8481 13.7799 16.4203 13.6119 15.9008 13.6119C15.3814 13.6119 14.9536 13.7799 14.6175 14.116C14.2814 14.4521 14.1133 14.8799 14.1133 15.3994C14.1133 15.9188 14.2814 16.3466 14.6175 16.6827L19.9342 21.9994L14.6175 27.3161C14.2814 27.6522 14.1133 28.0799 14.1133 28.5994C14.1133 29.1188 14.2814 29.5466 14.6175 29.8827C14.9536 30.2188 15.3814 30.3869 15.9008 30.3869C16.4203 30.3869 16.8481 30.2188 17.1842 29.8827L22.5008 24.566ZM22.5008 40.3327C19.9647 40.3327 17.5814 39.8512 15.3508 38.8881C13.1203 37.925 11.18 36.619 9.52999 34.9702C7.87999 33.3215 6.57404 31.3812 5.61215 29.1494C4.65026 26.9176 4.16871 24.5343 4.16748 21.9994C4.16626 19.4645 4.64782 17.0811 5.61215 14.8494C6.57649 12.6176 7.88243 10.6773 9.52999 9.02852C11.1775 7.37974 13.1178 6.0738 15.3508 5.11068C17.5838 4.14757 19.9672 3.66602 22.5008 3.66602C25.0345 3.66602 27.4179 4.14757 29.6509 5.11068C31.8839 6.0738 33.8241 7.37974 35.4717 9.02852C37.1193 10.6773 38.4258 12.6176 39.3914 14.8494C40.3569 17.0811 40.8379 19.4645 40.8342 21.9994C40.8305 24.5343 40.349 26.9176 39.3895 29.1494C38.4301 31.3812 37.1241 33.3215 35.4717 34.9702C33.8193 36.619 31.879 37.9256 29.6509 38.8899C27.4227 39.8542 25.0394 40.3352 22.5008 40.3327Z" fill="#E60D0D"/>
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
                                        showPopup("Şirkəti uğurla sildiniz","Seçilmiş şirkət sistemdən silindi","success")
                                    } catch {
                                        showPopup("Sistem xətası","Əməliyyat tamamlanmadı. Təkrar cəhd edin və ya dəstəyə müraciət edin.","error")
                                    }
                                }}
                            >
                                Sil
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KassaEmeliyyati;
