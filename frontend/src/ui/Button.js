import React from 'react';
import { Button as PrimeButton } from 'primereact/button';
import '../CompanyTable.css';

// Supported variants: primary, secondary, danger, success, warning, info, light, dark
export default function Button({ label, icon, onClick, className = '', ...props }) {
    const getButtonClass = (variant) => {
        switch (variant) {
            case 'primary':
                return 'btn-primary';
            case 'secondary':
                return 'btn-secondary';
            case 'danger':
                return 'btn-danger';
            case 'success':
                return 'btn-success';
            case 'warning':
                return 'btn-warning';
            case 'info':
                return 'btn-info';
            case 'light':
                return 'btn-light';
            case 'dark':
                return 'btn-dark';
            default:
                return '';
        }
    };

    const { variant = 'primary' } = props;

    return (
        <PrimeButton
            label={label}
            icon={icon}
            onClick={onClick}
            className={`company-table-btn ${getButtonClass(variant)} ${className}`}
            {...props}
        />
    );
}
