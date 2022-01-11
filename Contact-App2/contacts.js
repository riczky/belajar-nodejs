const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// Membuat Folder data jika belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath);
}

// Membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// const tulisPertanyaan = (pertanyaan) => {
//   return new Promise((resolve, reject) =>{
//     rl.question(pertanyaan , (nama) => {
//       resolve(nama);
//     });
//   });
// };


const simpanContact = (nama, email, noHp) => {
    const contact = {nama, email, noHp}; 
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    
    // Cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat){
      console.log(chalk.red.inverse.bold('contact sudah terdaftar, gunakan nama lain!'));
      return false;
    }

    // Cek Email
    if(email){
      if(!validator.isEmail(email)){
        console.log(chalk.red.inverse.bold('Email tidak valid!'));
      return false;
      }
    }

    // Cek No Hp
    if(!validator.isMobilePhone(noHp, 'id-ID')){
      console.log(chalk.red.inverse.bold('No Hp tidak valid!'));
    return false;
    }

    contacts.push(contact);
    
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    
    console.log(chalk.green.inverse.bold('Terimakasih sudah memasukkan data.'));
    // rl.close();
};

module.exports = { 
  // tulisPertanyaan,
   simpanContact };