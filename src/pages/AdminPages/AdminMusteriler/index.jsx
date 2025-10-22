import './index.scss';
import React, {useEffect, useRef, useState} from 'react';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import { FaTimes } from "react-icons/fa";

import {usePopup} from "../../../components/Popup/PopupContext.jsx";
import {
    useCreateClientsMutation,
    useCreateProductsMutation, useDeleteClientsMutation, useDeleteProductsMutation, useEditClientsMutation,
    useEditProductsMutation, useGetByCompanyClientsQuery,
    useGetByIdCategoriesQuery, useGetByIdCompaniesQuery
} from "../../../services/adminApi.jsx";

const AdminMusteriler = () => {
    const {id} = useParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [searchName, setSearchName] = useState('');
    const [activeSearch, setActiveSearch] = useState(null);
    const showPopup = usePopup()
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [createName, setCreateName] = useState('');
    const [createPhoneNumber, setCreatePhoneNumber] = useState('');
    const [createAdress, setCreateAdress] = useState('');
    const [createDesc, setCreateDesc] = useState('');
    const [showNote, setShowNote] = useState({ open: false, text: "" });
    // edit states
    const [editData, setEditData] = useState({
        id: '',
        name: '',
        phoneNumber: '',
        adress: '',
        desc: ''
    });
    const {data:getByIdCategories,refetch:productRefetch} = useGetByCompanyClientsQuery(id)
    const companies = getByIdCategories?.data
    const [createProduct] = useCreateClientsMutation()
    const [editProduct] = useEditClientsMutation()
    const [deleteProduct] =useDeleteClientsMutation()
    useEffect(() => {
        const onEsc = (e) => {
            if (e.key === 'Escape') {
                setModalVisible(false);
                setCreateModalVisible(false);
                setDeleteProductId(null);
            }
        };
        window.addEventListener('keydown', onEsc);
        return () => window.removeEventListener('keydown', onEsc);
    }, []);
    const handleCreate = async () => {
        try {
            if (!createName.trim() || !createPhoneNumber.trim()) return;

            await createProduct({
                companyId: id,
                name: createName,
                phoneNumber: createPhoneNumber,
                adress: createAdress,
                description: createDesc
            }).unwrap();

            await productRefetch();

            setCreateModalVisible(false);
            setCreateName('');
            setCreatePhoneNumber('');
            setCreateAdress('');
            setCreateDesc('');

            showPopup("Müştəri yaradıldı", "Yeni müştəri sistemə əlavə olundu.", "success");
        } catch {
            showPopup("Xəta baş verdi", "Müştəri yaradıla bilmədi, təkrar cəhd edin.", "error");
        }
    };

    // EDIT handler
    const handleEdit = async () => {
        try {
            if (!editData.name.trim() || !editData.phoneNumber.trim()) return;

            await editProduct({
                id: editData.id,
                companyId: id,
                name: editData.name,
                phoneNumber: editData.phoneNumber,
                adress: editData.adress,
                description: editData.desc
            }).unwrap();

            await productRefetch();
            setModalVisible(false);
            setEditData({ id: '', name: '', phoneNumber: '', adress: '', desc: '' });

            showPopup("Düzəliş uğurludur", "Müştəri məlumatları yeniləndi.", "success");
        } catch {
            showPopup("Xəta baş verdi", "Düzəliş edilə bilmədi, təkrar cəhd edin.", "error");
        }
    };


    // DELETE handler
    const handleDelete = async () => {
        try {
            await deleteProduct(deleteProductId).unwrap();
            await productRefetch();
            setDeleteProductId(null);

            showPopup("Müştəri silindi", "Müştəri sistemdən uğurla silindi.", "success");
        } catch {
            showPopup("Xəta baş verdi", "Müştəri silinə bilmədi, təkrar cəhd edin.", "error");
        }
    };
    const filteredProducts = companies?.filter((product) => {
        if (activeSearch === 'name') {
            return product.name?.toLowerCase().includes(searchName.toLowerCase());
        }
        return true;
    });
    const createInputRef = useRef(null);
    useEffect(() => {
        if (createModalVisible && createInputRef.current) {
            createInputRef.current.focus(); // ⬅️ Modal açıldığında inputa odaklan
        }
    }, [createModalVisible]);
    return (
        <div className="admin-musteriler-main">
            <div className="admin-musteriler">
                <div className="headerr">
                    <div className="head">
                        <h2>Müştərilər</h2>
                        <div className={"root"}>
                            <h2 >
                                <NavLink className="link" to="/admin/musteri">— Şirkətlər</NavLink>
                                — Müştərilər
                            </h2>
                        </div>
                    </div>
                    <button onClick={() => setCreateModalVisible(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path d="M12 23C6.21 23 1.5 18.29 1.5 12.5C1.5 6.71 6.21 2 12 2C17.79 2 22.5 6.71 22.5 12.5C22.5 18.29 17.79 23 12 23ZM12 3.5C7.035 3.5 3 7.535 3 12.5C3 17.465 7.035 21.5 12 21.5C16.965 21.5 21 17.465 21 12.5C21 7.535 16.965 3.5 12 3.5Z" fill="white" />
                            <path d="M12 17.75C11.58 17.75 11.25 17.42 11.25 17V8C11.25 7.58 11.58 7.25 12 7.25C12.42 7.25 12.75 7.58 12.75 8V17C12.75 17.42 12.42 17.75 12 17.75Z" fill="white" />
                            <path d="M16.5 13.25H7.5C7.08 13.25 6.75 12.92 6.75 12.5C6.75 12.08 7.08 11.75 7.5 11.75H16.5C16.92 11.75 17.25 12.08 17.25 12.5C17.25 12.92 16.92 13.25 16.5 13.25Z" fill="white" />
                        </svg>
                        Yeni müştəri yarat
                    </button>
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
                                        Müştəri
                                        <svg style={{cursor:"pointer"}} onClick={() => setActiveSearch('name')} xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                            <path d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z" fill="#7A7A7A"/>
                                        </svg>
                                    </div>
                                )}
                            </th>
                            <th>Əlaqə nömrəsi</th>
                            <th>Ünvanı</th>
                            <th>Təsvir</th>
                            <th>Fəaliyyətlər</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredProducts ?.map((company) => (
                            <tr key={company.id}>
                                <td>{company.name}</td>
                                <td>{company.phoneNumber}</td>
                                <td>{company.adress}</td>
                                <td
                                    style={{
                                        width: "100px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        cursor: company.description ? "pointer" : "default",
                                        color: company.description ? "#333" : "#888",
                                    }}
                                    onClick={() =>
                                        company.description && setShowNote({ open: true, text: company.description })
                                    }
                                    title={company.description}
                                >{company.description}</td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>

                                        <svg style={{cursor:"pointer"}}  onClick={() => {
                                            setEditData({
                                                id: company.id,
                                                name: company.name,
                                                phoneNumber: company.phoneNumber,
                                                adress: company.adress,
                                                desc: company.description,
                                            });
                                            setModalVisible(true);
                                        }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M18.3337 6.03367C18.3343 5.924 18.3133 5.81528 18.2718 5.71375C18.2303 5.61222 18.1692 5.51987 18.092 5.44201L14.5587 1.90867C14.4808 1.83144 14.3885 1.77033 14.2869 1.72886C14.1854 1.68739 14.0767 1.66637 13.967 1.66701C13.8573 1.66637 13.7486 1.68739 13.6471 1.72886C13.5456 1.77033 13.4532 1.83144 13.3753 1.90867L11.017 4.26701L1.90867 13.3753C1.83144 13.4532 1.77033 13.5456 1.72886 13.6471C1.68739 13.7486 1.66637 13.8573 1.66701 13.967V17.5003C1.66701 17.7214 1.7548 17.9333 1.91108 18.0896C2.06736 18.2459 2.27933 18.3337 2.50034 18.3337H6.03367C6.15028 18.34 6.26692 18.3218 6.37602 18.2801C6.48513 18.2385 6.58427 18.1744 6.66701 18.092L15.7253 8.98367L18.092 6.66701C18.1679 6.58614 18.2299 6.49321 18.2753 6.39201C18.2834 6.32558 18.2834 6.25843 18.2753 6.19201C18.2792 6.15321 18.2792 6.11413 18.2753 6.07534L18.3337 6.03367ZM5.69201 16.667H3.33367V14.3087L11.6087 6.03367L13.967 8.39201L5.69201 16.667ZM15.142 7.21701L12.7837 4.85867L13.967 3.68367L16.317 6.03367L15.142 7.21701Z" fill="#919191"/>
                                        </svg>
                                        <div className={'hrXett'}></div>
                                        <svg style={{cursor:"pointer"}} onClick={() => setDeleteProductId(company.id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
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

            </div>
            {createModalVisible && (
                <div className="vendor-edit-modal-overlay" onClick={() => setCreateModalVisible(false)}>
                    <div className="create-company-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modalHead">
                            <button className="modal-close-btn" onClick={() => setCreateModalVisible(false)}>✖</button>
                            <h3>Yeni müştəri yarat</h3>
                        </div>

                        <div className="modal-fields">
                            <label>Müştəri adı</label>
                            <input
                                type="text"
                                placeholder="Ad daxil et"
                                value={createName}
                                onChange={(e) => setCreateName(e.target.value)}
                                ref={createInputRef}

                            />
                            <label>Əlaqə nömrəsi</label>
                            <input
                                type="number"
                                placeholder="Əlaqə nömrəsi daxil et"
                                value={createPhoneNumber}
                                onChange={(e) => setCreatePhoneNumber(e.target.value)}
                                min={0}
                            />
                            <label>Ünvan</label>
                            <input
                                type="text"
                                placeholder="Ünvan daxil et"
                                value={createAdress}
                                onChange={(e) => setCreateAdress(e.target.value)}
                            />
                            <label>Təsvir</label>
                            <input
                                type="text"
                                placeholder="Təsvir daxil et"
                                value={createDesc}
                                onChange={(e) => setCreateDesc(e.target.value)}
                            />
                            <button className="save-btn save-btn--dark" onClick={handleCreate}>
                                Yadda saxla
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for edit */}
            {modalVisible && (
                <div className="vendor-edit-modal-overlay" onClick={() => setModalVisible(false)}>
                    <div className="vendor-edit-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modalHead">
                            <button className="modal-close-btn" onClick={() => setModalVisible(false)}>✖</button>
                            <h3>Düzəliş et</h3>
                        </div>

                        <div className="modal-fields">
                            <label>Müştəri adı</label>
                            <div className={"searchInput"}>
                                <input
                                    type="text"
                                    placeholder="Ad daxil et"
                                    value={editData.name}
                                    onChange={(e) => setEditData((prev) => ({ ...prev, name: e.target.value }))}
                                /><svg className={'searchIcon'} xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                <path d="M16.5 5.93001C16.5006 5.83131 16.4817 5.73346 16.4443 5.64208C16.407 5.5507 16.352 5.46759 16.2825 5.39751L13.1025 2.21751C13.0324 2.148 12.9493 2.09301 12.8579 2.05568C12.7666 2.01836 12.6687 1.99944 12.57 2.00001C12.4713 1.99944 12.3735 2.01836 12.2821 2.05568C12.1907 2.09301 12.1076 2.148 12.0375 2.21751L9.91501 4.34001L1.71751 12.5375C1.648 12.6076 1.59301 12.6907 1.55568 12.7821C1.51836 12.8735 1.49944 12.9713 1.50001 13.07V16.25C1.50001 16.4489 1.57903 16.6397 1.71968 16.7803C1.86033 16.921 2.0511 17 2.25001 17H5.43001C5.53496 17.0057 5.63993 16.9893 5.73813 16.9518C5.83632 16.9144 5.92555 16.8567 6.00001 16.7825L14.1525 8.58501L16.2825 6.50001C16.3509 6.42724 16.4066 6.34359 16.4475 6.25251C16.4547 6.19273 16.4547 6.13229 16.4475 6.07251C16.451 6.0376 16.451 6.00242 16.4475 5.96751L16.5 5.93001ZM5.12251 15.5H3.00001V13.3775L10.4475 5.93001L12.57 8.05251L5.12251 15.5ZM13.6275 6.99501L11.505 4.87251L12.57 3.81501L14.685 5.93001L13.6275 6.99501Z" fill="#3D3D3D"/>
                            </svg>
                            </div>
                            <label>Əlaqə nömrəsi</label>
                           <div className={"searchInput"}>
                               <input
                                   type="number"
                                   placeholder="Əlaqə nömrəsi daxil et"
                                   value={editData.phoneNumber}
                                   onChange={(e) => setEditData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                                   min={0}
                               /><svg className={'searchIcon'} xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                               <path d="M16.5 5.93001C16.5006 5.83131 16.4817 5.73346 16.4443 5.64208C16.407 5.5507 16.352 5.46759 16.2825 5.39751L13.1025 2.21751C13.0324 2.148 12.9493 2.09301 12.8579 2.05568C12.7666 2.01836 12.6687 1.99944 12.57 2.00001C12.4713 1.99944 12.3735 2.01836 12.2821 2.05568C12.1907 2.09301 12.1076 2.148 12.0375 2.21751L9.91501 4.34001L1.71751 12.5375C1.648 12.6076 1.59301 12.6907 1.55568 12.7821C1.51836 12.8735 1.49944 12.9713 1.50001 13.07V16.25C1.50001 16.4489 1.57903 16.6397 1.71968 16.7803C1.86033 16.921 2.0511 17 2.25001 17H5.43001C5.53496 17.0057 5.63993 16.9893 5.73813 16.9518C5.83632 16.9144 5.92555 16.8567 6.00001 16.7825L14.1525 8.58501L16.2825 6.50001C16.3509 6.42724 16.4066 6.34359 16.4475 6.25251C16.4547 6.19273 16.4547 6.13229 16.4475 6.07251C16.451 6.0376 16.451 6.00242 16.4475 5.96751L16.5 5.93001ZM5.12251 15.5H3.00001V13.3775L10.4475 5.93001L12.57 8.05251L5.12251 15.5ZM13.6275 6.99501L11.505 4.87251L12.57 3.81501L14.685 5.93001L13.6275 6.99501Z" fill="#3D3D3D"/>
                           </svg>
                           </div>
                            <label>Ünvan</label>
                            <div className={"searchInput"}>
                                <input
                                    type="text"
                                    placeholder="Ünvan daxil et"
                                    value={editData.adress}
                                    onChange={(e) => setEditData((prev) => ({ ...prev, adress: e.target.value }))}
                                /><svg className={'searchIcon'} xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                <path d="M16.5 5.93001C16.5006 5.83131 16.4817 5.73346 16.4443 5.64208C16.407 5.5507 16.352 5.46759 16.2825 5.39751L13.1025 2.21751C13.0324 2.148 12.9493 2.09301 12.8579 2.05568C12.7666 2.01836 12.6687 1.99944 12.57 2.00001C12.4713 1.99944 12.3735 2.01836 12.2821 2.05568C12.1907 2.09301 12.1076 2.148 12.0375 2.21751L9.91501 4.34001L1.71751 12.5375C1.648 12.6076 1.59301 12.6907 1.55568 12.7821C1.51836 12.8735 1.49944 12.9713 1.50001 13.07V16.25C1.50001 16.4489 1.57903 16.6397 1.71968 16.7803C1.86033 16.921 2.0511 17 2.25001 17H5.43001C5.53496 17.0057 5.63993 16.9893 5.73813 16.9518C5.83632 16.9144 5.92555 16.8567 6.00001 16.7825L14.1525 8.58501L16.2825 6.50001C16.3509 6.42724 16.4066 6.34359 16.4475 6.25251C16.4547 6.19273 16.4547 6.13229 16.4475 6.07251C16.451 6.0376 16.451 6.00242 16.4475 5.96751L16.5 5.93001ZM5.12251 15.5H3.00001V13.3775L10.4475 5.93001L12.57 8.05251L5.12251 15.5ZM13.6275 6.99501L11.505 4.87251L12.57 3.81501L14.685 5.93001L13.6275 6.99501Z" fill="#3D3D3D"/>
                            </svg>
                            </div>
                            <label>Təsvir</label>
                            <div className={"searchInput"}><input
                                type="text"
                                placeholder="Təsvir daxil et"
                                value={editData.desc}
                                onChange={(e) => setEditData((prev) => ({ ...prev, desc: e.target.value }))}
                            /><svg className={'searchIcon'} xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                <path d="M16.5 5.93001C16.5006 5.83131 16.4817 5.73346 16.4443 5.64208C16.407 5.5507 16.352 5.46759 16.2825 5.39751L13.1025 2.21751C13.0324 2.148 12.9493 2.09301 12.8579 2.05568C12.7666 2.01836 12.6687 1.99944 12.57 2.00001C12.4713 1.99944 12.3735 2.01836 12.2821 2.05568C12.1907 2.09301 12.1076 2.148 12.0375 2.21751L9.91501 4.34001L1.71751 12.5375C1.648 12.6076 1.59301 12.6907 1.55568 12.7821C1.51836 12.8735 1.49944 12.9713 1.50001 13.07V16.25C1.50001 16.4489 1.57903 16.6397 1.71968 16.7803C1.86033 16.921 2.0511 17 2.25001 17H5.43001C5.53496 17.0057 5.63993 16.9893 5.73813 16.9518C5.83632 16.9144 5.92555 16.8567 6.00001 16.7825L14.1525 8.58501L16.2825 6.50001C16.3509 6.42724 16.4066 6.34359 16.4475 6.25251C16.4547 6.19273 16.4547 6.13229 16.4475 6.07251C16.451 6.0376 16.451 6.00242 16.4475 5.96751L16.5 5.93001ZM5.12251 15.5H3.00001V13.3775L10.4475 5.93001L12.57 8.05251L5.12251 15.5ZM13.6275 6.99501L11.505 4.87251L12.57 3.81501L14.685 5.93001L13.6275 6.99501Z" fill="#3D3D3D"/>
                            </svg></div>
                            <button className="save-btn" onClick={handleEdit}>
                                Yadda saxla
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Modal for delete */}
            {deleteProductId !== null && (
                <div className="modal-overlay" onClick={() => setDeleteProductId(null)}>
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
                        <p className="delete-message">Müştərini silmək istədiyinizə əminsiz?</p>
                        <div className="delete-modal-actions">
                            <button className="cancel-btn" onClick={() => setDeleteProductId(null)}>Ləğv et</button>
                            <button className="confirm-btn" onClick={handleDelete}>
                                Sil
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showNote.open && (
                <div className="modal-overlay" onClick={() => setShowNote({ open: false, text: "" })}>
                    <div className="note-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="close-btn" onClick={() => setShowNote({ open: false, text: "" })}>
                            ×
                        </div>
                        <h3>Qeyd</h3>
                        <p>{showNote.text}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminMusteriler;
