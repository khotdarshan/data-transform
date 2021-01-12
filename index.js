const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const transformService = require('./transformService');
app.use(bodyParser.json({ limit: '10mb' }));


app.post('/transform', (req, res) => {
    const { payload, referenceData } = req.body;
    if (!payload || Object.keys(payload).length === 0 || !referenceData || Object.keys(referenceData).length === 0) {
        res.status(400).send('Invalid payload or referenceData');
    }
    const output = transformService.transformData(payload, referenceData);
    res.status(200).send(output);
});

app.listen(8081, () => {
    console.log(`Server running on port 8081`);
});