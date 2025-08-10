import React from 'react';
import { Dropdown as PrimeDropdown } from 'primereact/dropdown';
import '../CompanyTable.css';

export default function Dropdown({ value, options, onChange, placeholder, className = '', ...props }) {
return (
    <PrimeDropdown
        value={value}
        options={options}
        onChange={onChange}
        placeholder={placeholder}
        className={`company-table-dropdown ${className}`}
        style={{ height: '3rem' }}
        {...props}
    />
);
}
