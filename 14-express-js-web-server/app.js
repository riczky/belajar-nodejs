const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    // Mengirim Json
    // res.json({
    //     nama : 'Riczky',
    //     email : 'riczky@gmail.com',
    //     NoHP : '0891281298' 
    // });
    
    // Mengirim Text
    //   res.send('Hello World!')

    // Mengirim File
    res.sendFile('./index.html', {root: __dirname});

})

app.get('/about', (req, res) => {
    // res.send('Ini Halaman About!');
    res.sendFile('./about.html', {root: __dirname});
  })

app.get('/contact', (req, res) => {
    // res.send('Ini Halaman Contact!');
    res.sendFile('./contact.html', {root: __dirname});
  })  

// Mengambil Id menggunakan params  
// app.get('/product/:id/category/:idCat', (req, res) => {
//     res.send(`Product Id:   ${req.params.id} <br> Category Id : ${req.params.idCat}`);
// });

// Mengambil id dan nama kategory menggunakan query
app.get('/product/:id', (req, res) => {
    res.send(`Product Id:   ${req.params.id} <br> Category Id : ${req.query.category}`);
});


app.use('/', (req, res)=>{
    res.status(404);
    res.send('Halaman Tidak Tersedia');
})
  


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})





