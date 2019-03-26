const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname + '/public')));


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.listen(process.env.PORT || 8081);