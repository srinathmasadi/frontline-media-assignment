import React from 'react';
import { Dialog as PrimeDialog } from 'primereact/dialog';
import '../CompanyTable.css';

export default function Dialog({ header, visible, onHide, children, className = '', style = {}, ...props }) {
  return (
    <PrimeDialog
      header={header}
      visible={visible}
      onHide={onHide}
      className={`company-table-modal ${className}`}
      style={style}
      {...props}
    >
      {children}
    </PrimeDialog>
  );
}
