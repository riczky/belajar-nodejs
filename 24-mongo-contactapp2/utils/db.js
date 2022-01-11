const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser:true, 
    useUnifiedTopology:true, 
    useCreateIndex:true
});

// Membuat Schema
// const Contact = mongoose.model('Contact', {
//     nama: {
//         type: String,
//         required: true
//     },
//     nohp: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String
//     }
// })

    // // Menambah 1 data
    // const contact1 = new Contact({
    //     nama: 'yahiko',
    //     nohp: '081232527512',
    //     email: 'yahiko@gmail.com'
    // })

    // // Simpan ke Collection / table
    // contact1.save().then((contact) => console.log(contact));