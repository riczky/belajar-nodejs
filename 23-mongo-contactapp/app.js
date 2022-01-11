const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require ('connect-flash');



require('./utils/db');
const Contact = require('./model/contact');


const app = express();
const port = 3000;

// Menggunakan EJS
app.set('view engine', 'ejs');

// Third Party Middleware
app.use(expressLayouts);

// Built-in middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// Konfigurasi Flash
app.use(cookieParser('secret'));
app.use(session({
  cookie: {maxAge: 6000},
  secret: 'secret',
  resave : true,
  saveUninitialized: true
})
)

app.use(flash());



// Halaman Home
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

// Halaman About
app.get('/about', (req, res) => {
    // res.sendFile('./about.html', {root: __dirname});
    res.render('about', {
      layout:'layouts/main-layout',
      title:'Halaman About'
    });
   
  })

// Halaman Contact
app.get('/contact', async(req, res) => {
    const contacts = await Contact.find();
   
    res.render('contact', {
      layout:'layouts/main-layout',
      title:'Halaman Contact',
      contacts: contacts,
      msg: req.flash('msg')
    });
  })

 // Halaman Detail Contact
 app.get('/contact/:nama', async(req, res) => {
    
    const contact = await Contact.findOne({nama:req.params.nama});
    
    res.render('detail', {
      layout:'layouts/main-layout',
      title:'Halaman Detail Contact',
      contact: contact
    });
  })  



app.listen(port, () => {
    console.log(`Mongo Contact App| Listening at http://localhost:${port}`);
});
