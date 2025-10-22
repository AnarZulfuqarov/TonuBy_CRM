import { useEffect, useRef, useState } from "react";
import {NavLink, useParams} from "react-router-dom";
import "./index.scss";
import {
    useCreateCashOperatorMutation, useCreateProductsMutation, useGetByCompanyClientsQuery,
    useGetByIdCompaniesQuery
} from "../../../services/adminApi.jsx";

export default function AdminKassaEAdd() {
    const {id} = useParams();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // ⬅️ Loading state'i eklendi
    const refDate = useRef(null);
    const { data: getByCompanyClients } = useGetByCompanyClientsQuery(id);
    const clientsInit = getByCompanyClients?.data || [];
    const [createProduct] = useCreateProductsMutation()
    const [createOperation] = useCreateCashOperatorMutation();
    const {data:getByIdCompanies} = useGetByIdCompaniesQuery(id)
    const company = getByIdCompanies?.data
    const categoriesInit = getByIdCompanies?.data?.categories || [];
    const [form, setForm] = useState({
        categoryId: "",
        categoryName: "",
        productId: "",
        productName: "",
        madaxil: "",
        mexaric: "",
        tarix: "",
        note: "",
    });

    const productsInit = form.categoryId
        ? categoriesInit.find((c) => c.id === form.categoryId)?.products || []
        : [];

    const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

    const [lists, setLists] = useState({
        client: [],
        category: [],
        product: [],
    });
    useEffect(() => {
        if (clientsInit?.length) {
            setLists((prev) => ({
                ...prev,
                client: clientsInit.map((c) => ({ id: c.id, name: c.name })),
            }));
        }
    }, [clientsInit]);


    useEffect(() => {
        if (categoriesInit?.length) {
            setLists((prev) => ({
                ...prev,
                category: categoriesInit.map((c) => ({ id: c.id, name: c.name })),
            }));
        }
    }, [categoriesInit]);

    useEffect(() => {
        if (productsInit.length) {
            setLists((prev) => ({
                ...prev,
                product: productsInit.map((p) => ({ id: p.id, name: p.name })),
            }));
        } else {
            setLists((prev) => ({ ...prev, product: [] }));
        }
    }, [form.categoryId]);

    const [activeHeaderSearch, setActiveHeaderSearch] = useState(null);
    const [q, setQ] = useState({ category: "", product: "" });
    const [hover, setHover] = useState(-1);
    const headerRef = useRef(null);

    useEffect(() => {
        const onDown = (e) => {
            if (!headerRef.current?.contains(e.target)) {
                setActiveHeaderSearch(null);
                setHover(-1);
            }
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, []);

    const filtered = (key) => {
        const list = lists[key] || [];
        const needle = (q[key] || "").toLowerCase();
        return list.filter((x) => x.name.toLowerCase().includes(needle)).slice(0, 100);
    };

    const selectValue = (key, val) => {
        if (key === "client") {
            setForm((p) => ({
                ...p,
                clientId: val.id,
                clientName: val.name,
            }));
            setQ((s) => ({ ...s, client: val.name }));
        }

        if (key === "category") {
            setForm((p) => ({
                ...p,
                categoryId: val.id,
                categoryName: val.name,
                productId: "",
                productName: "",
            }));
            setQ((s) => ({ ...s, category: val.name }));
        }
        if (key === "product") {
            setForm((p) => ({
                ...p,
                productId: val.id,
                productName: val.name,
            }));
            setQ((s) => ({ ...s, product: val.name }));
        }
        setActiveHeaderSearch(null);
        setHover(-1);
    };

    const openSearch = (key) => {
        setActiveHeaderSearch(key);
        setHover(-1);
    };

    const toDDMMYYYY = (value) => {
        if (!value) return "";
        if (/^\d{2}\.\d{2}\.\d{4}$/.test(value)) return value;
        const parts = value.split("-");
        if (parts.length === 3) {
            const [y, m, d] = parts;
            const dd = d.padStart(2, "0");
            const mm = m.padStart(2, "0");
            return `${dd}.${mm}.${y}`;
        }
        const dt = new Date(value);
        if (!isNaN(dt.getTime())) {
            const dd = String(dt.getDate()).padStart(2, "0");
            const mm = String(dt.getMonth() + 1).padStart(2, "0");
            const yy = String(dt.getFullYear());
            return `${dd}.${mm}.${yy}`;
        }
        return value;
    };



    const isFormValid =
        form.clientId &&
        form.categoryId &&
        (form.productId || form.productName) &&
        (Number(form.madaxil) > 0 || Number(form.mexaric) > 0) &&
        form.tarix


    const handleSubmit = async () => {
        if (!isFormValid) return;

        setIsLoading(true); // ⬅️ Loading başlasın
        let productIdToUse = form.productId;
        console.log(form.categoryId)
        if (!form.productId && form.productName.trim() !== "") {
            const newProduct = await createProduct({
                categoryId: form.categoryId,
                name: form.productName.trim(),
            }).unwrap();

            productIdToUse = newProduct?.data?.id;
        }


        const payload = {
            clientId: form.clientId,
            productId: productIdToUse,
            incomeAmount: Number(form.madaxil) > 0 ? Number(form.madaxil) : 0,
            expenseAmount: Number(form.mexaric) > 0 ? Number(form.mexaric) : 0,
            description: form.note || "",
            createTime: toDDMMYYYY(form.tarix),
        };

        try {
            const res = await createOperation(payload).unwrap();
            console.log("success:", res);
            setShowSuccessModal(true);
            // ⬅️ Formu sıfırla
            setForm({
                categoryId: "",
                categoryName: "",
                productId: "",
                productName: "",
                madaxil: "",
                mexaric: "",
                tarix: "",
                note: "",
            });
        } catch (err) {
            console.error("error:", err);
            alert(
                (err?.data?.error ?? err?.data?.message ?? "Xəta baş verdi!") +
                "\nGöndərilən tarix formatı: " +
                payload.createTime
            );
        } finally {
            setIsLoading(false); // ⬅️ Loading bitsin
        }
    };

    const headers = [
        { label: "Müştəri seç", key: "client" },
        { label: "Kateqoriya seç", key: "category" },
        { label: "Məhsul seç", key: "product" },
    ];


    return (
        <div className="admin-kassa-e-add-main">
            <div className="admin-kassa-e-add">
                <div className="headerr">
                    <div className="head">
                        <h1>Yeni kassa əməliyyatı</h1>
                    </div>
                    <h2>
                        <NavLink className="link" to="/admin/emeliyyat/kassa-e">
                            — Şirkət seçimi
                        </NavLink>
                        <NavLink className="link" to={`/admin/emeliyyat/kassa-e/${id}`}>
                            — {company?.name}
                        </NavLink>
                        — Yeni kassa əməliyyatı
                    </h2>
                </div>

                <div className={"product-table kasa-add ux-tight"}>
                    <div className="table-scroll">
                        <table ref={headerRef}>
                            <thead>
                            <tr>
                                {headers.map(({ label, key }) => (
                                    <th key={label}>
                                        {key && activeHeaderSearch === key ? (
                                            <div className="th-search th-search--with-dropdown">
                                                <input
                                                    autoFocus
                                                    value={q[key]}
                                                    onChange={(e) => {
                                                        setQ((s) => ({ ...s, [key]: e.target.value }));
                                                        setHover(0);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        const list = filtered(key);
                                                        if (e.key === "Escape") {
                                                            setActiveHeaderSearch(null);
                                                            setHover(-1);
                                                        } else if (e.key === "ArrowDown") {
                                                            e.preventDefault();
                                                            setHover((h) => Math.min(h + 1, list.length - 1));
                                                        } else if (e.key === "ArrowUp") {
                                                            e.preventDefault();
                                                            setHover((h) => Math.max(h - 1, 0));
                                                        } else if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            const v = list[hover] ?? list[0];
                                                            if (v) selectValue(key, v);
                                                        }
                                                    }}
                                                    placeholder="Axtar... (Enter ilə seç)"
                                                />
                                                <button
                                                    className="th-clear"
                                                    onClick={() => {
                                                        setActiveHeaderSearch(null);
                                                        setQ((s) => ({ ...s, [key]: "" }));
                                                        setHover(-1);
                                                    }}
                                                    aria-label="Bağla"
                                                >
                                                    ×
                                                </button>

                                                <ul className="th-dropdown">
                                                    {filtered(key).map((v, idx) => (
                                                        <li
                                                            key={v.id}
                                                            className={idx === hover ? "active" : ""}
                                                            onMouseEnter={() => setHover(idx)}
                                                            onMouseDown={(e) => {
                                                                e.preventDefault();
                                                                selectValue(key, v);
                                                            }}
                                                        >
                                                            {v.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <div className="th-label" onClick={() => key && openSearch(key)}>
                                                {label}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41775 18.5308 7.87103 17.6518 6.55544C16.7727 5.23985 15.5233 4.21447 14.0615 3.60897C12.5997 3.00347 10.9911 2.84504 9.43928 3.15372C7.88743 3.4624 6.46197 4.22433 5.34315 5.34315C4.22433 6.46197 3.4624 7.88743 3.15372 9.43928C2.84504 10.9911 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8037 19.4936 20.8781 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8781 20.617 20.8037 20.71 20.71C20.8037 20.617 20.8781 20.5064 20.9289 20.3846C20.9797 20.2627 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6154C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81332 5.3519 8.65328 6.01119 7.66658C6.67047 6.67989 7.60755 5.91085 8.7039 5.45673C9.80026 5.0026 11.0067 4.88378 12.1705 5.11529C13.3344 5.3468 14.4035 5.91825 15.2426 6.75736C16.0818 7.59648 16.6532 8.66558 16.8847 9.82946C17.1162 10.9933 16.9974 12.1997 16.5433 13.2961C16.0892 14.3925 15.3201 15.3295 14.3334 15.9888C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2426C5.63214 14.1174 5 12.5913 5 11Z"
                                                        fill="#7A7A7A"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </th>
                                ))}
                                <th>Mədaxil</th>
                                <th>Məxaric</th>
                                <th>Tarix</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Müştəri daxil et"
                                        value={form.clientName}
                                        onChange={(e) => setField("clientName", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Kateqoriya daxil et"
                                        value={form.categoryName}
                                        onChange={(e) => setField("categoryName", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Məhsul daxil et"
                                        value={form.productName}
                                        onChange={(e) => setField("productName", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        placeholder="Mədaxil daxil et"
                                        value={form.madaxil}
                                        onChange={(e) => setForm((p) => ({ ...p, madaxil: e.target.value }))}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        placeholder="Məxaric daxil et"
                                        value={form.mexaric}
                                        onChange={(e) => setForm((p) => ({ ...p, mexaric: e.target.value }))}
                                    />
                                </td>
                                <td
                                    onClick={() => {
                                        if (refDate.current?.showPicker) refDate.current.showPicker();
                                        else refDate.current?.focus();
                                    }}
                                    style={{ cursor: "pointer" }}
                                >
                                    <input
                                        ref={refDate}
                                        type="date"
                                        value={form.tarix}
                                        onChange={(e) => setField("tarix", e.target.value)}
                                        style={{
                                            border: "none",
                                            background: "transparent",
                                            width: "100%",
                                            cursor: "pointer",
                                            outline: "none",
                                        }}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={6}>
                                    <textarea
                                        placeholder="Qeyd.."
                                        rows={3}
                                        value={form.note}
                                        onChange={(e) => setField("note", e.target.value)}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <button
                    className={`confirm-btn ${!isFormValid ? "disabled" : ""} ${isLoading ? "loading" : ""}`} // ⬅️ Loading sınıfı eklendi
                    onClick={handleSubmit}
                    disabled={!isFormValid || isLoading} // ⬅️ Loading sırasında buton devre dışı
                >
                    {isLoading ? "Yüklənir..." : "Təsdiqlə"}
                </button>
            </div>

            {showSuccessModal && (
                <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
                    <div className="success-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="close-btn" onClick={() => setShowSuccessModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path
                                    d="M14.25 3.74963L3.75 14.2496M3.75 3.74963L14.25 14.2496"
                                    stroke="#333333"
                                    strokeWidth="2.4375"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div className="check-icon">
                            <div className="circle pulse">
                                <div className="circle-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                                        <path
                                            d="M11.7714 19.353L22.1402 8.98422C22.3849 8.73953 22.6704 8.61719 22.9966 8.61719C23.3229 8.61719 23.6083 8.73953 23.853 8.98422C24.0977 9.22891 24.2201 9.51969 24.2201 9.85654C24.2201 10.1934 24.0977 10.4838 23.853 10.7276L12.6279 21.9834C12.3832 22.2281 12.0977 22.3504 11.7714 22.3504C11.4452 22.3504 11.1597 22.2281 10.915 21.9834L5.65419 16.7226C5.4095 16.4779 5.29205 16.1875 5.30183 15.8515C5.31162 15.5154 5.43927 15.2246 5.68477 14.9791C5.93028 14.7336 6.22105 14.6113 6.5571 14.6121C6.89314 14.6129 7.1835 14.7353 7.42819 14.9791L11.7714 19.353Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <h3>Yeni kassa əməliyyatı uğurla əlavə edildi !</h3>
                        <button className="back-btn" onClick={() => (window.location.href = `/admin/emeliyyat/kassa-e/${id}`)}>
                            Əsas səhifəyə qayıt
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}