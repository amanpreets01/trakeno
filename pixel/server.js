const express = require('express');
const app = express()

app.set('view engine' , 'html');
app.engine('html', require('hbs').__express);

app.get('/get_pixel' , (req,res) => {
	res.render('pixel.html');
});

app.get('/thank_you',(req,res) => {
	res.render('thank.html');
});
app.listen(3000 , () => {
	console.log(`Listening on 3000`)
});