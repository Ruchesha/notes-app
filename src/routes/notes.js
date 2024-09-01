const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

// Create a new note
router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = await Note.create({ title, content });
        res.status(201).json(newNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create note' });
    }
});

// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.findAll();
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve notes' });
    }
});

// Delete a note
router.delete('/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        await Note.destroy({ where: { id: noteId } });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete note' });
    }
});

module.exports = router;
