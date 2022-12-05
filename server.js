const express = require('express');
const PORT = process.env.PORT || 80;
const path = require('path');

const app = express()
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/admin', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/admin.html'))
})
app.get('/admin-page', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/adminMain.html'))
})
app.listen(PORT, () => console.log(`Server has been started at PORT = ${PORT}`));