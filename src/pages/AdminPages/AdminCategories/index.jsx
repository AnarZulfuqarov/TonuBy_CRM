import './index.scss';
import {useEffect, useRef, useState} from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";

import { usePopup } from "../../../components/Popup/PopupContext.jsx";
import {
    useCreateCategoriesMutation,
    useDeleteCategoriesMutation,
    useEditCategoriesMutation,
    useGetByIdCompaniesQuery
} from "../../../services/adminApi.jsx";

const SuperAdminCategories = () => {
    const { id: companyId } = useParams();
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);
    const [searchName, setSearchName] = useState('');
    const [activeSearch, setActiveSearch] = useState(null);
    const [editCategoryData, setEditCategoryData] = useState({ id: '', name: '' });
    const showPopup = usePopup();
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [createName, setCreateName] = useState('');

    const { data: getByIdCompanies, refetch } = useGetByIdCompaniesQuery(companyId);
    const categories = getByIdCompanies?.data?.categories;

    const [createCategory] = useCreateCategoriesMutation();
    const [editCategory] = useEditCategoriesMutation();
    const [deleteCategory] = useDeleteCategoriesMutation();

    useEffect(() => {
        const onEsc = (e) => {
            if (e.key === 'Escape') {
                setModalVisible(false);
                setCreateModalVisible(false);
                setDeleteCategoryId(null);
            }
        };
        window.addEventListener('keydown', onEsc);
        return () => window.removeEventListener('keydown', onEsc);
    }, []);
    const filteredCategories = categories?.filter((category) => {
        if (activeSearch === 'name') {
            return category.name?.toLowerCase().includes(searchName.toLowerCase());
        }
        return true; // heç bir search yoxdursa hamısını göstər
    });
    useEffect(() => {
        refetch()
    }, []);
    const createInputRef = useRef(null);
    useEffect(() => {
        if (createModalVisible && createInputRef.current) {
            createInputRef.current.focus(); // ⬅️ Modal açıldığında inputa odaklan
        }
    }, [createModalVisible]);
    return (
        <div className="admin-categories-main">
            <div className="admin-categories">
                <div className="headerr">
                    <div className="head">
                        <h2>Kateqoriyalar</h2>
                        <p>Kateqoriyaları izləyin, idarə edin və fəaliyyətlərini yoxlayın</p>
                    </div>
                    <button onClick={() => setCreateModalVisible(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path d="M12 23C6.21 23 1.5 18.29 1.5 12.5C1.5 6.71 6.21 2 12 2C17.79 2 22.5 6.71 22.5 12.5C22.5 18.29 17.79 23 12 23ZM12 3.5C7.035 3.5 3 7.535 3 12.5C3 17.465 7.035 21.5 12 21.5C16.965 21.5 21 17.465 21 12.5C21 7.535 16.965 3.5 12 3.5Z" fill="white" />
                            <path d="M12 17.75C11.58 17.75 11.25 17.42 11.25 17V8C11.25 7.58 11.58 7.25 12 7.25C12.42 7.25 12.75 7.58 12.75 8V17C12.75 17.42 12.42 17.75 12 17.75Z" fill="white" />
                            <path d="M16.5 13.25H7.5C7.08 13.25 6.75 12.92 6.75 12.5C6.75 12.08 7.08 11.75 7.5 11.75H16.5C16.92 11.75 17.25 12.08 17.25 12.5C17.25 12.92 16.92 13.25 16.5 13.25Z" fill="white" />
                        </svg>
                        Kateqoriya yarat
                    </button>
                </div>
                <div className="root">
                    <h2>
                        <NavLink className="link" to="/admin/companies">— Şirkətlər</NavLink>{' '}
                        — Kateqoriya
                    </h2>
                </div>
                <div className="paths">
                    <div className="path1">
                        <h3>Şirkətin adı:</h3>
                        <span>{getByIdCompanies?.data?.name}</span>
                    </div>
                </div>

                <div className="order-table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>
                                {activeSearch === 'name' ? (
                                    <div style={{cursor:"pointer"}} className="th-search">
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
                                        Kateqoriya adı
                                        <svg style={{cursor:"pointer"}} onClick={() => setActiveSearch('name')} xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                            <path d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z" fill="#7A7A7A" />
                                        </svg>
                                    </div>
                                )}
                            </th>
                            <th>Fəaliyyətlər</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredCategories?.map((category) => (
                            <tr key={category.id}>
                                <td>{category.name}</td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                                        <svg style={{ cursor: "pointer" }} onClick={() => {
                                            setEditCategoryData({ id: category.id, name: category.name });
                                            setModalVisible(true);
                                        }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M18.3337 6.03367C18.3343 5.924 18.3133 5.81528 18.2718 5.71375C18.2303 5.61222 18.1692 5.51987 18.092 5.44201L14.5587 1.90867C14.4808 1.83144 14.3885 1.77033 14.2869 1.72886C14.1854 1.68739 14.0767 1.66637 13.967 1.66701C13.8573 1.66637 13.7486 1.68739 13.6471 1.72886C13.5456 1.77033 13.4532 1.83144 13.3753 1.90867L11.017 4.26701L1.90867 13.3753C1.83144 13.4532 1.77033 13.5456 1.72886 13.6471C1.68739 13.7486 1.66637 13.8573 1.66701 13.967V17.5003C1.66701 17.7214 1.7548 17.9333 1.91108 18.0896C2.06736 18.2459 2.27933 18.3337 2.50034 18.3337H6.03367C6.15028 18.34 6.26692 18.3218 6.37602 18.2801C6.48513 18.2385 6.58427 18.1744 6.66701 18.092L15.7253 8.98367L18.092 6.66701C18.1679 6.58614 18.2299 6.49321 18.2753 6.39201C18.2834 6.32558 18.2834 6.25843 18.2753 6.19201C18.2792 6.15321 18.2792 6.11413 18.2753 6.07534L18.3337 6.03367ZM5.69201 16.667H3.33367V14.3087L11.6087 6.03367L13.967 8.39201L5.69201 16.667ZM15.142 7.21701L12.7837 4.85867L13.967 3.68367L16.317 6.03367L15.142 7.21701Z" fill="#919191" />
                                        </svg>
                                        <div className={'hrXett'}></div>
                                        <svg style={{ cursor: "pointer" }} onClick={() => setDeleteCategoryId(category.id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5915 1.875H11.4082C11.589 1.875 11.7465 1.875 11.8948 1.89833C12.1838 1.94462 12.4578 2.05788 12.6952 2.22907C12.9325 2.40025 13.1264 2.6246 13.2615 2.88417C13.3315 3.0175 13.3807 3.16667 13.4382 3.3375L13.5307 3.61667L13.5557 3.6875C13.6311 3.89679 13.7715 4.07645 13.9564 4.20016C14.1413 4.32387 14.3609 4.38514 14.5832 4.375H17.0832C17.2489 4.375 17.4079 4.44085 17.5251 4.55806C17.6423 4.67527 17.7082 4.83424 17.7082 5C17.7082 5.16576 17.6423 5.32473 17.5251 5.44194C17.4079 5.55915 17.2489 5.625 17.0832 5.625H2.9165C2.75074 5.625 2.59177 5.55915 2.47456 5.44194C2.35735 5.32473 2.2915 5.16576 2.2915 5C2.2915 4.83424 2.35735 4.67527 2.47456 4.55806C2.59177 4.44085 2.75074 4.375 2.9165 4.375H5.4915C5.71409 4.36966 5.92911 4.29314 6.10503 4.15667C6.28095 4.02019 6.40851 3.83094 6.469 3.61667L6.56234 3.3375C6.619 3.16667 6.66817 3.0175 6.73734 2.88417C6.8725 2.6245 7.06658 2.40009 7.30405 2.2289C7.54151 2.05771 7.81576 1.9445 8.10484 1.89833C8.25317 1.875 8.41067 1.875 8.59067 1.875M7.50567 4.375C7.56339 4.26004 7.61214 4.1408 7.6515 4.01833L7.73484 3.76833C7.81067 3.54083 7.82817 3.495 7.84567 3.46167C7.89066 3.37501 7.95532 3.30009 8.03448 3.24293C8.11364 3.18577 8.20509 3.14795 8.3015 3.1325C8.41011 3.12288 8.51924 3.12037 8.62817 3.125H11.3698C11.6098 3.125 11.6598 3.12667 11.6965 3.13333C11.7928 3.14869 11.8842 3.18639 11.9634 3.2434C12.0425 3.30041 12.1073 3.37516 12.1523 3.46167C12.1698 3.495 12.1873 3.54083 12.2632 3.76917L12.3465 4.01917L12.379 4.1125C12.4118 4.20361 12.4496 4.29111 12.4923 4.375H7.50567Z" fill="#ED0303"/>
                                            <path d="M4.92907 7.04167C4.91802 6.87624 4.8417 6.72197 4.71691 6.61281C4.59212 6.50365 4.42908 6.44853 4.26365 6.45958C4.09822 6.47063 3.94396 6.54695 3.8348 6.67174C3.72563 6.79653 3.67052 6.95957 3.68157 7.125L4.06823 12.9183C4.13907 13.9867 4.19657 14.85 4.33157 15.5283C4.4724 16.2325 4.71073 16.8208 5.20407 17.2817C5.6974 17.7425 6.2999 17.9425 7.0124 18.035C7.6974 18.125 8.5624 18.125 9.63407 18.125H10.3666C11.4374 18.125 12.3032 18.125 12.9882 18.035C13.6999 17.9425 14.3032 17.7433 14.7966 17.2817C15.2891 16.8208 15.5274 16.2317 15.6682 15.5283C15.8032 14.8508 15.8599 13.9867 15.9316 12.9183L16.3182 7.125C16.3293 6.95957 16.2742 6.79653 16.165 6.67174C16.0558 6.54695 15.9016 6.47063 15.7361 6.45958C15.5707 6.44853 15.4077 6.50365 15.2829 6.61281C15.1581 6.72197 15.0818 6.87624 15.0707 7.04167L14.6874 12.7917C14.6124 13.9142 14.5591 14.6958 14.4424 15.2833C14.3282 15.8542 14.1699 16.1558 13.9424 16.3692C13.7141 16.5825 13.4024 16.7208 12.8257 16.7958C12.2316 16.8733 11.4482 16.875 10.3224 16.875H9.6774C8.5524 16.875 7.76907 16.8733 7.17407 16.7958C6.5974 16.7208 6.28573 16.5825 6.0574 16.3692C5.8299 16.1558 5.67157 15.8542 5.5574 15.2842C5.44073 14.6958 5.3874 13.9142 5.3124 12.7908L4.92907 7.04167Z" fill="#ED0303"/>
                                            <path d="M7.85428 8.54499C8.01914 8.52847 8.18382 8.57809 8.31211 8.68294C8.44041 8.78779 8.52182 8.9393 8.53844 9.10415L8.95511 13.2708C8.96731 13.4334 8.91551 13.5943 8.81076 13.7192C8.70601 13.8441 8.55659 13.9232 8.39438 13.9395C8.23217 13.9558 8.07001 13.9081 7.94249 13.8065C7.81497 13.7049 7.73218 13.5576 7.71178 13.3958L7.29511 9.22915C7.27859 9.06429 7.32821 8.89961 7.43306 8.77132C7.53792 8.64302 7.68942 8.56161 7.85428 8.54499ZM12.1459 8.54499C12.3106 8.56162 12.462 8.64291 12.5668 8.77102C12.6717 8.89913 12.7214 9.06359 12.7051 9.22832L12.2884 13.395C12.2678 13.5564 12.185 13.7034 12.0576 13.8048C11.9302 13.9061 11.7683 13.9537 11.6064 13.9375C11.4444 13.9214 11.2952 13.8427 11.1904 13.7182C11.0856 13.5936 11.0334 13.4332 11.0451 13.2708L11.4618 9.10415C11.4784 8.93946 11.5597 8.78809 11.6878 8.68326C11.8159 8.57843 11.9812 8.5287 12.1459 8.54499Z" fill="#ED0303"/>

                                        </svg>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CREATE Modal */}
            {createModalVisible && (
                <div className="vendor-edit-modal-overlay" onClick={() => setCreateModalVisible(false)}>
                    <div className="create-company-modal" onClick={(e) => e.stopPropagation()}>
                        <div className={"modalHead"}>
                            <button className="modal-close-btn" onClick={() => setCreateModalVisible(false)}>✖</button>
                            <h3>Yeni kateqoriya əlavə et</h3>
                        </div>
                        <div className="modal-fields">
                            <label>Yeni kateqoriya adı</label>
                            <input
                                type="text"
                                placeholder="Kateqoriya adı daxil et"
                                value={createName}
                                onChange={(e) => setCreateName(e.target.value)}
                                ref={createInputRef}
                            />
                            <button
                                className="save-btn save-btn--dark"
                                onClick={async () => {
                                    try {
                                        if (!createName.trim()) return;

                                        await createCategory({ name: createName, companyId }).unwrap();
                                        await refetch();

                                        setCreateModalVisible(false);
                                        setCreateName('');

                                        showPopup("Kateqoriya yaradıldı", "Yeni kateqoriya sistemə əlavə olundu.", "success");
                                    } catch {
                                        showPopup("Xəta baş verdi", "Kateqoriya yaradıla bilmədi, təkrar cəhd edin.", "error");
                                    }
                                }}
                            >
                                Yadda saxla
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT Modal */}
            {modalVisible && (
                <div className="vendor-edit-modal-overlay" onClick={() => setModalVisible(false)}>
                    <div className="vendor-edit-modal" onClick={(e) => e.stopPropagation()}>
                        <div className={"modalHead"}>
                            <button className="modal-close-btn" onClick={() => setModalVisible(false)}>✖</button>
                            <h3>Düzəliş et</h3>
                        </div>
                        <div className="modal-fields">
                            <label>Kateqoriya adı</label>
                            <div className={'searchInput'}>
                                <input
                                    type="text"
                                    placeholder="Məsələn: Tablo"
                                    value={editCategoryData.name}
                                    onChange={(e) =>
                                        setEditCategoryData((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                />
                                <svg className={'searchIcon'} xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                    <path d="M16.5 5.93001C16.5006 5.83131 16.4817 5.73346 16.4443 5.64208C16.407 5.5507 16.352 5.46759 16.2825 5.39751L13.1025 2.21751C13.0324 2.148 12.9493 2.09301 12.8579 2.05568C12.7666 2.01836 12.6687 1.99944 12.57 2.00001C12.4713 1.99944 12.3735 2.01836 12.2821 2.05568C12.1907 2.09301 12.1076 2.148 12.0375 2.21751L9.91501 4.34001L1.71751 12.5375C1.648 12.6076 1.59301 12.6907 1.55568 12.7821C1.51836 12.8735 1.49944 12.9713 1.50001 13.07V16.25C1.50001 16.4489 1.57903 16.6397 1.71968 16.7803C1.86033 16.921 2.0511 17 2.25001 17H5.43001C5.53496 17.0057 5.63993 16.9893 5.73813 16.9518C5.83632 16.9144 5.92555 16.8567 6.00001 16.7825L14.1525 8.58501L16.2825 6.50001C16.3509 6.42724 16.4066 6.34359 16.4475 6.25251C16.4547 6.19273 16.4547 6.13229 16.4475 6.07251C16.451 6.0376 16.451 6.00242 16.4475 5.96751L16.5 5.93001ZM5.12251 15.5H3.00001V13.3775L10.4475 5.93001L12.57 8.05251L5.12251 15.5ZM13.6275 6.99501L11.505 4.87251L12.57 3.81501L14.685 5.93001L13.6275 6.99501Z" fill="#3D3D3D"/>
                                </svg>
                            </div>
                            <button
                                className="save-btn"
                                onClick={async () => {
                                    try {
                                        if (!editCategoryData.name.trim()) return;

                                        await editCategory({
                                            id: editCategoryData.id,
                                            name: editCategoryData.name,
                                            companyId,
                                        }).unwrap();

                                        await refetch();
                                        setModalVisible(false);
                                        setEditCategoryData({ id: '', name: '' });

                                        showPopup("Düzəliş uğurludur", "Kateqoriya məlumatları yeniləndi.", "success");
                                    } catch {
                                        showPopup("Xəta baş verdi", "Düzəliş edilə bilmədi, təkrar cəhd edin.", "error");
                                    }
                                }}
                            >
                                Yadda saxla
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE Modal */}
            {deleteCategoryId !== null && (
                <div className="modal-overlay" onClick={() => setDeleteCategoryId(null)}>
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
                        <p className="delete-message">Kateqoriyanı silmək istədiyinizə əminsiniz?</p>
                        <div className="delete-modal-actions">
                            <button className="cancel-btn" onClick={() => setDeleteCategoryId(null)}>Ləğv et</button>
                            <button
                                className="confirm-btn"
                                onClick={async () => {
                                    try {
                                        await deleteCategory(deleteCategoryId).unwrap();
                                        await refetch();
                                        setDeleteCategoryId(null);

                                        showPopup("Kateqoriya silindi", "Kateqoriya sistemdən uğurla silindi.", "success");
                                    } catch {
                                        showPopup("Xəta baş verdi", "Kateqoriya silinə bilmədi, təkrar cəhd edin.", "error");
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

export default SuperAdminCategories;
