const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 4000;

// Set the 'views' folder as the location for your HTML files
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "assets" folder
app.use('/assets', (req, res, next) => {
    next();
}, express.static(path.join(__dirname, 'assets'),{ extensions: ['js'] }));

// Dynamically serve HTML files from the 'views' directory
app.get('*', (req, res) => {
    const requestedFile = req.path === '/' ? '/home.html' : req.path;
    const filePath = path.join(__dirname, 'views', requestedFile);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // If file does not exist, return 404
            res.status(404).send('404: Page Not Found');
        } else {
            // If file exists, serve it
            res.sendFile(filePath);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
