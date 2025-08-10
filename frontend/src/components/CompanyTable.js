import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../CompanyTable.css';
import Input from '../ui/Input';
import Dropdown from '../ui/Dropdown';
import Button from '../ui/Button';
import Dialog from '../ui/Dialog';
import { useGetCompaniesQuery } from '../services/companyApi';
import {
    useAddCompanyMutation,
    useEditCompanyMutation,
    useDeleteCompanyMutation
} from '../services/companyApi';

export default function CompanyTable() {
    const openEdit = (row) => {
        setEditData(row);
        setForm({
            name: row.name || '',
            industry: row.industry || '',
            location: row.location || '',
            foundedYear: row.foundedYear || '',
            employeeCount: row.employeeCount || '',
            website: row.website || ''
        });
        setShowEdit(true);
        setErrors({});
    };
    const [errors, setErrors] = useState({});

    function validate(form) {
        const newErrors = {};
        if (!form.name) newErrors.name = 'Name is required';
        if (!form.industry) newErrors.industry = 'Industry is required';
        if (!form.location) newErrors.location = 'Location is required';
        if (!form.foundedYear) newErrors.foundedYear = 'Founded Year is required';
        if (!form.employeeCount) newErrors.employeeCount = 'Employees is required';
        if (!form.website) newErrors.website = 'Website is required';
        return newErrors;
    }
    const onFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };
    const industries = [
        { label: 'All', value: '' },
        { label: 'Software', value: 'Software' },
        { label: 'Fintech', value: 'Fintech' },
        { label: 'Healthcare', value: 'Healthcare' },
        { label: 'Education', value: 'Education' },
        { label: 'Agriculture', value: 'Agriculture' }
    ];

    const locations = [
        { label: 'All', value: '' },
        { label: 'Bengaluru', value: 'Bengaluru' },
        { label: 'Mumbai', value: 'Mumbai' },
        { label: 'Hyderabad', value: 'Hyderabad' },
        { label: 'Chennai', value: 'Chennai' },
        { label: 'Pune', value: 'Pune' }
    ];
    const [filters, setFilters] = useState({ name: '', industry: '', location: '' });
    const [page, setPage] = useState(1);
    const { data, isFetching, refetch } = useGetCompaniesQuery({ ...filters, page, limit: 20 });
        const [addCompany] = useAddCompanyMutation();
        const [editCompany] = useEditCompanyMutation();
        const [deleteCompany] = useDeleteCompanyMutation();

        const [showAdd, setShowAdd] = useState(false);
        const [showEdit, setShowEdit] = useState(false);
        const [editData, setEditData] = useState(null);
        const [form, setForm] = useState({ name: '', industry: '', location: '', foundedYear: '', employeeCount: '', website: '' });

        const handleAdd = async () => {
            const newErrors = validate(form);
            setErrors(newErrors);
            if (Object.keys(newErrors).length > 0) return;
            await addCompany(form);
            setShowAdd(false);
            setForm({ name: '', industry: '', location: '', foundedYear: '', employeeCount: '', website: '' });
            setErrors({});
            refetch();
        };

        const handleEdit = async () => {
            const newErrors = validate(form);
            setErrors(newErrors);
            if (Object.keys(newErrors).length > 0) return;
            await editCompany({ id: editData._id, ...form });
            setShowEdit(false);
            setEditData(null);
            setForm({ name: '', industry: '', location: '', foundedYear: '', employeeCount: '', website: '' });
            setErrors({});
            refetch();
        };

        const handleDelete = async (id) => {
            await deleteCompany(id);
            refetch();
        };

            return (
                <div className="company-table-container">
                    <div className="company-table-card">
                        <h2 className="company-table-header">
                            Companies
                            <Button
                                label="Add Company"
                                icon="pi pi-plus"
                                onClick={() => setShowAdd(true)}
                                variant="success"
                                className="company-table-btn-add"
                            />
                        </h2>
                        <div className="company-table-filters">
                            <div>
                                <label htmlFor="name" className="company-table-label">Search by Name</label>
                                <Input id="name" value={filters.name} onChange={(e) => onFilterChange('name', e.target.value)} />
                            </div>
                            <div>
                                <label className="company-table-label">Industry</label>
                                <Dropdown value={filters.industry} options={industries} onChange={(e) => onFilterChange('industry', e.value)} placeholder="Select Industry" />
                            </div>
                            <div>
                                <label className="company-table-label">Location</label>
                                <Dropdown value={filters.location} options={locations} onChange={(e) => onFilterChange('location', e.value)} placeholder="Select Location" />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Button label="Apply Filters" icon="pi pi-search" onClick={refetch} variant="info" className="company-table-btn-add" />
                            </div>
                        </div>

                        <div style={{ borderRadius: '0.75rem', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
                            <DataTable
                                value={data?.data || []}
                                loading={isFetching}
                                scrollable
                                scrollHeight="400px"
                                responsiveLayout="scroll"
                                style={{ minWidth: '100%' }}
                            >
                                <Column field="name" header="Name" sortable />
                                <Column field="industry" header="Industry" sortable />
                                <Column field="location" header="Location" sortable />
                                <Column field="foundedYear" header="Founded Year" sortable />
                                <Column field="employeeCount" header="Employees" sortable />
                                <Column field="website" header="Website" body={(row) => <a href={row.website} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>{row.website}</a>} />
                                <Column header="Actions" body={(row) => (
                                    <div className="company-table-actions">
                                        <Button label="Edit" icon="pi pi-pencil" onClick={() => openEdit(row)} variant="secondary" className="company-table-btn-edit" />
                                        <Button label="Delete" icon="pi pi-trash" onClick={() => handleDelete(row._id)} variant="danger" className="company-table-btn-delete" />
                                    </div>
                                )} />
                            </DataTable>
                            {data && data.totalPages > 1 && (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem', gap: '0.5rem' }}>
                                    <Button label="Prev" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} variant="secondary" />
                                    <span>Page {page} of {data.totalPages}</span>
                                    <Button label="Next" onClick={() => setPage(p => Math.min(data.totalPages, p + 1))} disabled={page === data.totalPages} variant="secondary" />
                                </div>
                            )}
                        </div>

                        <Dialog header="Add Company" visible={showAdd} style={{ width: '30vw' }} className="company-table-modal" onHide={() => setShowAdd(false)}>
                            <div className='addCompany'>
                                <Input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                                {errors.name && <div style={{color:'red',fontSize:'0.9em'}}>{errors.name}</div>}
                                <Dropdown value={form.industry} options={industries.filter(i => i.value)} onChange={e => setForm(f => ({ ...f, industry: e.value }))} placeholder="Select Industry" />
                                {errors.industry && <div style={{color:'red',fontSize:'0.9em'}}>{errors.industry}</div>}
                                <Dropdown value={form.location} options={locations.filter(l => l.value)} onChange={e => setForm(f => ({ ...f, location: e.value }))} placeholder="Select Location" />
                                {errors.location && <div style={{color:'red',fontSize:'0.9em'}}>{errors.location}</div>}
                                <Input placeholder="Founded Year" value={form.foundedYear} onChange={e => setForm(f => ({ ...f, foundedYear: e.target.value }))} />
                                {errors.foundedYear && <div style={{color:'red',fontSize:'0.9em'}}>{errors.foundedYear}</div>}
                                <Input placeholder="Employees" value={form.employeeCount} onChange={e => setForm(f => ({ ...f, employeeCount: e.target.value }))} />
                                {errors.employeeCount && <div style={{color:'red',fontSize:'0.9em'}}>{errors.employeeCount}</div>}
                                <Input placeholder="Website" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} />
                                {errors.website && <div style={{color:'red',fontSize:'0.9em'}}>{errors.website}</div>}
                                <div className="company-table-modal-actions">
                                    <Button label="Add" icon="pi pi-check" onClick={handleAdd} variant="success" className="company-table-btn-add" />
                                    <Button label="Cancel" icon="pi pi-times" onClick={() => setShowAdd(false)} variant="secondary" className="company-table-btn-cancel" />
                                </div>
                            </div>
                        </Dialog>

                        <Dialog header="Edit Company" visible={showEdit} style={{ width: '30vw' }} className="company-table-modal" onHide={() => setShowEdit(false)}>
                            <div className='addCompany'>
                                <Input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                                {errors.name && <div style={{color:'red',fontSize:'0.9em'}}>{errors.name}</div>}
                                <Dropdown value={form.industry} options={industries.filter(i => i.value)} onChange={e => setForm(f => ({ ...f, industry: e.value }))} placeholder="Select Industry" />
                                {errors.industry && <div style={{color:'red',fontSize:'0.9em'}}>{errors.industry}</div>}
                                <Dropdown value={form.location} options={locations.filter(l => l.value)} onChange={e => setForm(f => ({ ...f, location: e.value }))} placeholder="Select Location" />
                                {errors.location && <div style={{color:'red',fontSize:'0.9em'}}>{errors.location}</div>}
                                <Input placeholder="Founded Year" value={form.foundedYear} onChange={e => setForm(f => ({ ...f, foundedYear: e.target.value }))} />
                                {errors.foundedYear && <div style={{color:'red',fontSize:'0.9em'}}>{errors.foundedYear}</div>}
                                <Input placeholder="Employees" value={form.employeeCount} onChange={e => setForm(f => ({ ...f, employeeCount: e.target.value }))} />
                                {errors.employeeCount && <div style={{color:'red',fontSize:'0.9em'}}>{errors.employeeCount}</div>}
                                <Input placeholder="Website" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} />
                                {errors.website && <div style={{color:'red',fontSize:'0.9em'}}>{errors.website}</div>}
                                <div className="company-table-modal-actions">
                                    <Button label="Save" icon="pi pi-check" onClick={handleEdit} variant="success" className="company-table-btn-add" />
                                    <Button label="Cancel" icon="pi pi-times" onClick={() => setShowEdit(false)} variant="secondary" className="company-table-btn-cancel" />
                                </div>
                            </div>
                        </Dialog>
                    </div>
                </div>
            );
    }
