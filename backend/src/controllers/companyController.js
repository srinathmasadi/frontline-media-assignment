const Company = require('../models/Company');
exports.createCompany = async (req, res) => {
  console.log('Creating company with data:', req.body);
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    console.log('Error creating company:', err.message);
    res.status(400).json({ error: err.message });
  }
};
exports.getCompanies = async (req, res) => {
  console.log('Fetching companies with filters:', req.query);
  try {
    const { name, industry, location, minEmployees, maxEmployees, foundedBefore, foundedAfter, page=1, limit=20, sortBy='createdAt', sortDir='desc' } = req.query;
    const filters = {};
    if (name) filters.name = new RegExp(name, 'i');
    if (industry) filters.industry = industry;
    if (location) filters.location = location;
    if (minEmployees) filters.employeeCount = { ...filters.employeeCount, $gte: Number(minEmployees) };
    if (maxEmployees) filters.employeeCount = { ...filters.employeeCount, $lte: Number(maxEmployees) };
    if (foundedBefore) filters.foundedYear = { ...filters.foundedYear, $lte: Number(foundedBefore) };
    if (foundedAfter) filters.foundedYear = { ...filters.foundedYear, $gte: Number(foundedAfter) };
    const skip = (Number(page)-1)*Number(limit);
    const sort = { [sortBy]: sortDir === 'asc' ? 1 : -1 };
    const [items, total] = await Promise.all([ Company.find(filters).sort(sort).skip(skip).limit(Number(limit)), Company.countDocuments(filters) ]);
    res.json({ data: items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total/Number(limit)) });
  } catch (err) {
    console.log('Error fetching companies:', err.message);
    res.status(500).json({ error: err.message });
  }
};
exports.getCompanyById = async (req, res) => {
  console.log('Fetching company by ID:', req.params.id);
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    res.json(company);
  } catch (err) { 
    console.log('Error fetching company by ID:', err.message);
    res.status(400).json({ error: 'Invalid id' }); 
  }
};
exports.updateCompany = async (req, res) => {
  console.log('Updating company with ID:', req.params.id, 'and data:', req.body);
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!company) return res.status(404).json({ error: 'Company not found' });
    res.json(company);
  } catch (err) { 
    console.log('Error updating company:', err.message);
    res.status(400).json({ error: err.message }); 
  }
};
exports.deleteCompany = async (req, res) => {
  console.log('Deleting company with ID:', req.params.id);
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ error: 'Company not found' });
    res.json({ message: 'Company deleted' });
  } catch (err) { 
    console.log('Error deleting company:', err.message);
    res.status(400).json({ error: err.message }); 
  }
};
