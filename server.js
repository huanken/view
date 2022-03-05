const port = process.env.PORT || 8080; //Line 3

const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function (req, res) {
    const index = path.join(__dirname, 'dist', 'index.html');
    res.sendFile(index);
  });

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log("Listening on port ${port}")); //Line 6