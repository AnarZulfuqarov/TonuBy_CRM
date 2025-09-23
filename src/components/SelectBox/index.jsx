import React, { useState } from "react";
import "./index.scss";

const SelectBox = ({ value, onChange, options = [], placeholder }) => {
    const [open, setOpen] = useState(false);

    const handleSelect = (opt) => {
        onChange(opt.id);
        setOpen(false);
    };

    const selectedOption = options.find((opt) => opt.id === value);

    return (
        <div className="custom-select">
            <div className="select-trigger" onClick={() => setOpen(!open)}>
                <span>{selectedOption ? selectedOption.name : placeholder}</span>
                <svg className={`chev ${open ? "rotate" : ""}`} width="16" height="16" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" fill="none" stroke="#666" strokeWidth="2" />
                </svg>
            </div>

            {open && (
                <ul className="options">
                    {options.map((opt) => (
                        <li
                            key={opt.id}
                            className={opt.id === value ? "active" : ""}
                            onClick={() => handleSelect(opt)}
                        >
                            {opt.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectBox;
