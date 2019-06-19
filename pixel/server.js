const express = require('express');

const app = express()
app.get('/getPixel' , (req,res) => {
	res.send('DONE');
});
app.listen(3000 , () => {
	console.log(`Listening on 3000`)
});