const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const app = express()
const port = 3000

// Menggunakan EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.get('/', (req, res) => {
    // res.sendFile('./index.html', {root: __dirname});
    const mahasiswa = [
      {
      nama : 'riczky',
      email : 'riczky@gmail.com'     
      },
      {
        nama : 'test',
        email : 'test@gmail.com'     
      },
      {
        nama : 'dodo',
        email : 'dodo@gmail.com'     
      }
  ];
  res.render('index', {
     nama: 'test', 
     title: 'Halaman Index',
     mahasiswa: mahasiswa,
     layout: 'layouts/main-layout'
    });
  })

app.get('/about', (req, res) => {
    // res.sendFile('./about.html', {root: __dirname});
    res.render('about', {
      layout:'layouts/main-layout',
      title:'Halaman About'
    });
  })

app.get('/contact', (req, res) => {
    // res.sendFile('./contact.html', {root: __dirname});
    res.render('contact', {
      layout:'layouts/main-layout',
      title:'Halaman Contact'
    });
  })  

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





