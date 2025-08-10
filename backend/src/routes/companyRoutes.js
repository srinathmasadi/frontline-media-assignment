const express = require('express');
const router = express.Router();
const controller = require('../controllers/companyController');
router.post('/add', controller.createCompany);
router.get('/', controller.getCompanies);
router.get('/:id', controller.getCompanyById);
router.put('/:id', controller.updateCompany);
router.delete('/:id', controller.deleteCompany);
module.exports = router;
