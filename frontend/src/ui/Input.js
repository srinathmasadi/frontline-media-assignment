import React from 'react';
import { InputText } from 'primereact/inputtext';
import '../CompanyTable.css';

export default function Input({ value, onChange, placeholder, className = '', ...props }) {
  return (
    <InputText
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`company-table-input ${className}`}
      {...props}
    />
  );
}
