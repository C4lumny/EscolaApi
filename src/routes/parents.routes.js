const { Router } = require('express');
const { createParent, getAllParents, updateParent, deleteParent } = require('../controllers/parents.controllers');

const router = Router();

router.get('/parents', getAllParents);
router.post('/parents', createParent);
router.put('/parents', updateParent);
router.delete('/parents/:id', deleteParent);

module.exports = {
    parentsRouter: router,
}