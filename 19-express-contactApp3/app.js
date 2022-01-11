const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContacts } = require('./utils/contacts');
const { body, validationResult, check, cookie } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require ('connect-flash');


const app = express()
const port = 3000

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
    const contacts = loadContact();
    // console.log(contacts);
    res.render('contact', {
      layout:'layouts/main-layout',
      title:'Halaman Contact',
      contacts: contacts,
      msg: req.flash('msg')
    });
  })  

  // Halaman Form Tambah Data Contact
  app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
      title: 'Form Tambah Data Contact',
      layout: 'layouts/main-layout'
    });
  });

  // Proses tambah data contact
  app.post('/contact', [
    body('nama').custom((value) => {
      const duplikat = cekDuplikat(value);
      if(duplikat){
        throw new Error('Nama Contact sudah digunakan');
      }
      return true;
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('nohp', 'No Hp tidak valid').isMobilePhone('id-ID')
  ], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      // return res.status(400).json({ errors: errors.array() });
      res.render('add-contact', {
        title: 'Form Tambah Data Contact',
        layout: 'layouts/main-layout',
        errors: errors.array(),
      });
    }else{
      addContact(req.body);
      // Kirimkan Flashmassage
      req.flash('msg', 'Data contact berhasil ditambahkan!');
      res.redirect('/contact');
    }
  })

  // Proses Delete Contact
  app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    // jika contact tidak ada
    if(!contact){
      res.status(404);
      res.send('<h1>404</h1>');
    }else{
      deleteContact(req.params.nama);
      req.flash('msg', 'Data contact berhasil dihapus!');
      res.redirect('/contact');
    }
  })

  // Halaman form ubah data contact
  app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('edit-contact', {
      title: 'Form Ubah Data Contact',
      layout: 'layouts/main-layout',
      contact: contact
    });
  });

  // Proses ubah data
  app.post('/contact/update', [
    body('nama').custom((value, {req}) => {
      const duplikat = cekDuplikat(value);
      if(value !== req.body.oldNama && duplikat){
        throw new Error('Nama Contact sudah digunakan');
      }
      return true;
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('nohp', 'No Hp tidak valid').isMobilePhone('id-ID')
  ], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      // return res.status(400).json({ errors: errors.array() });
      res.render('edit-contact', {
        title: 'Form Ubah Data Contact',
        layout: 'layouts/main-layout',
        errors: errors.array(),
        contact: req.body,
      });
    }else{
      // res.send(req.body);
      updateContacts(req.body);
      // // Kirimkan Flashmassage
      req.flash('msg', 'Data contact berhasil diubah!');
      res.redirect('/contact');
    }
  })

  // Halaman Detail Contact
  app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    
    res.render('detail', {
      layout:'layouts/main-layout',
      title:'Halaman Detail Contact',
      contact: contact
    });
  })  


app.use((req, res)=>{
    res.status(404);
    res.send('Halaman Tidak Tersedia');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})





