import express from 'express'
import { Table } from '../db/schema.js'
const router = express.Router();

// CRUD Routes for Elements
router.get('/elements', async (req, res) => {
  try {
    const elements = await Table.find();

    res.status(200).json({ success: true, data: elements, });
  }
  catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching products', });
  }
});

// Search and Filter Routes
router.get('/elements/search', async (req, res) => {
  const { name, discoveryYear , discoveredBy } = req.query;

  // Build the search query dynamically based on available parameters
  const query = {};

  if (name) query.name = name;  
  if (discoveryYear) query.discoveryYear = discoveryYear;
  if (discoveredBy) query.discoveredBy = discoveredBy;

  try {
      const elements = await Table.find(query);

      if (elements.length === 0) {
          return res.status(404).json({ success: false, message: 'No elements found' });
      }

      res.status(200).json({ success: true, data: elements });
  } catch (error) {
      console.error('Error fetching elements by search criteria:', error);
      res.status(500).json({ success: false, message: 'Server error while fetching elements' });
  }
});


router.get('/elements/:name', async (req, res) => {

  const elementName = req.params.name;

  try {
    const element = await Table.findOne({ name: elementName });

    if (!element) return res.status(404).json({ success: false, message: `Element with name ${elementName} not found`, })

    res.status(200).json({ success: true, data: element, });
  }
  catch (error) {
    console.error('Error fetching element:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching the element', });
  }
});

router.post('/elements', async (req, res) => {
  try {
    const { name } = req.body;

    // Check if element already exists
    const existingElement = await Table.findOne({ name: name });
    if (existingElement) return res.status(400).json({ success: false, message: 'Element with this name already exists' });

    // Create and save the new element
    const newElement = new Table(req.body);
    await newElement.save();

    res.status(201).json({ success: true, message: 'Element created successfully', data: newElement, });
  }
  catch (error) {
    console.error('Error creating element:', error);
    res.status(500).json({ success: false, message: 'Server error while creating the element', });
  }
});

router.put('/elements/:atomicNumber', async (req, res) => {

  const { atomicNumber } = req.params;
  const updatedData = req.body;

  try {
    const updatedElement = await Table.findOneAndUpdate({ atomicNumber: atomicNumber }, updatedData, { new: true });

    if (!updatedElement) return res.status(404).json({ success: false, message: 'Element not found' })

    res.status(200).json({ success: true, data: updatedElement });
  } catch (error) {
    console.error('Error updating element:', error);
    res.status(500).json({ success: false, message: 'Server error while updating element' });
  }
});


router.delete('/elements/:atomicNumber', async (req, res) => {
  const { atomicNumber } = req.params;

  try {
    const deletedElement = await Table.findOneAndDelete({ atomicNumber: atomicNumber });

    if (!deletedElement) res.status(404).json({ success: false, message: 'Element not found' });

    res.status(200).json({ success: true, message: 'Element deleted successfully', data: deletedElement });
  } catch (error) {
    console.error('Error deleting element:', error);
    res.status(500).json({ success: false, message: 'Server error while deleting element' });
  }
});

// Additional Routes (Optional)
router.get('/elements/category/:category', async (req, res) => {
  const { category } = req.params;

  try {
    const element = await Table.find({ category: category });

    if (element.length === 0) res.status(404).json({ success: false, message: `No elements found in category: ${category}` });

    res.status(200).json({ success: true, data: element });
  } catch (error) {
    console.error('Error fetching elements by category:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching elements by category' });
  }
});

router.get('/elements/group/:group', async (req, res) => {
  const { group } = req.params;

  try {
    const elements = await Table.find({ group: group });

    if (elements.length === 0) return res.status(404).json({ success: false, message: `No elements found in group: ${group}` });

    res.status(200).json({ success: true, data: elements });
  } catch (error) {
    console.error('Error fetching elements by group:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching elements by group' });
  }
});

router.get('/elements/period/:period', async (req, res) => {
  const { period } = req.params;

  try {
    const elements = await Table.find({ period: period });

    if (elements.length === 0) return res.status(404).json({ success: false, message: `No elements found in period: ${group}` });

    res.status(200).json({ success: true, data: elements });
  } catch (error) {
    console.error('Error fetching elements by period:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching elements by period' });
  }
});

router.get('/elements/state/:state', async (req, res) => {
  const { state } = req.params;

  try {
    const elements = await Table.find({ stateAtRoomTemp: state });

    if (elements.length === 0) return res.status(404).json({ success: false, message: 'No elements found for the given state' });

    res.status(200).json({ success: true, data: elements });
  } catch (error) {
    console.error('Error fetching elements by state:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching elements by state' });
  }
});

router.all('*', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});

export default router;
