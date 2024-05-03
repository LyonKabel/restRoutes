const express = require('express');
const bodyParser = require('body-parser');
const app = express();


let contacts = [];

app.use(bodyParser.json());

const path = require('path');




app.post('/contacts', (req, res) => {
    const newContact = req.body;
    contacts.push(newContact);
    res.status(200).json(newContact);
});


app.get('/contacts', (req, res) => {
    res.status(200).json(contacts);
});


app.get('/contacts/:id', (req, res) => {
    const contactId = req.params.id;
    const foundContact = contacts.find(contact => contact.id === contactId);
    if (!foundContact) {
        res.status(404).send('Contact not found');
    } else {
        res.status(200).json(foundContact);
    }
});


app.put('/contacts/:id', (req, res) => {
    const contactId = req.params.id;
    const updatedContact = req.body;
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        res.status(404).send('Contact not found');
    } else {
        contacts[index] = updatedContact;
        res.status(200).json(updatedContact);
    }
});

app.delete('/contacts/:id', (req, res) => {
    const contactId = req.params.id;
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        res.status(404).send('Contact not found');
    } else {
        contacts.splice(index, 1);
        res.status(204).send();
    }
});












const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
