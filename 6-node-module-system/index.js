// console.log('Hello WPU');

// nama = 'Muhammad Rizqi';
// const cetakNama = (nama) => `Hi, Nama Saya ${nama}`;

// console.log(cetakNama(nama));

// const fs = require('fs'); // core module 
// const cetakNama = require('./coba'); //local module
// const moment = require ('moment'); // Third party module/npm module / node_module


// console.log(cetakNama('Riczky'));


const coba = require('./coba');
// console.log(coba);

console.log(coba.cetakNama('Riczky'), coba.PI, coba.mahasiswa.cetakMhs(), new coba.Orang());
