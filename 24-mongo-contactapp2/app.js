const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require ('connect-flash');
const {body, validationResult,check} = require('express-validator');
const methodOverride = require('method-override');

require('./utils/db');
const Contact = require('./model/contact');
const { request } = require('express');


const app = express();
const port = 3000;


// Setup method override
app.use(methodOverride('_method'))

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

  // Halaman Form Tambah Data Contact
  app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
      title: 'Form Tambah Data Contact',
      layout: 'layouts/main-layout'
    });
  });

  // Proses tambah data contact
  app.post('/contact', [
    body('nama').custom( async (value) => {
      const duplikat = await Contact.findOne({nama: value});
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
      Contact.insertMany(req.body, (error, result) => {
        // Kirimkan Flashmassage
      req.flash('msg', 'Data contact berhasil ditambahkan!');
      res.redirect('/contact');
      })
      
    }
  })

  // Proses Delete Contact
  // app.get('/contact/delete/:nama', async (req, res) => {
  //   const contact = await Contact.findOne({nama: req.params.nama});

  //   // jika contact tidak ada
  //   if(!contact){
  //     res.status(404);
  //     res.send('<h1>404</h1>');
  //   }else{
  //     Contact.deleteOne({_id: contact._id}).then((result) => {
  //       req.flash('msg', 'Data contact berhasil dihapus!');
  //       res.redirect('/contact');
  //     });
      
  //   }
  // })

 
  // Proses Delete contact menggunakan app.delete
  app.delete('/contact', (req, res) => {
    // res.send(req.body);
    Contact.deleteOne({nama: req.body.nama}).then((result) => {
            req.flash('msg', 'Data contact berhasil dihapus!');
            res.redirect('/contact');
          });
  });

    // Halaman form ubah data contact
    app.get('/contact/edit/:nama', async (req, res) => {
      const contact = await Contact.findOne({nama:req.params.nama});
  
      res.render('edit-contact', {
        title: 'Form Ubah Data Contact',
        layout: 'layouts/main-layout',
        contact: contact
      });
    });
  
    // Proses ubah data
  app.put('/contact', [
    body('nama').custom(async(value, {req}) => {
      const duplikat = await Contact.findOne({nama: value});
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
      res.render('edit-contact', {
        title: 'Form Ubah Data Contact',
        layout: 'layouts/main-layout',
        errors: errors.array(),
        contact: req.body,
      });
    }else{
      
      Contact.updateOne({_id: req.body. _id},
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,
          },
        }
      ).then((result) => {
           // // Kirimkan Flashmassage
      req.flash('msg', 'Data contact berhasil diubah!');
      res.redirect('/contact');
      });
     
    }
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
