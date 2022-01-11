// Core module
// File System
const fs = require('fs');

// console.log(fs);

// Menuliskan string kedalam sebuah file (Synchronous)
// try{
//     fs.writeFileSync('data/test.txt', 'Hello world secara synchronous!');
// }catch(e){
//     console.log(e);
// }

// Menuliskan string kedalam sebuah file (Asynchronous)
// fs.writeFile('data/test.txt', 'Hello World secara Asynchronous', (e) => {
//   console.log(e);
// });

// Membaca isi File synchronous
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);

// Membaca isi File Asynchronous
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   });


// Readline membuat input ke dalam terminal
// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('Masukkan nama anda: ', (nama) => {
//   rl.question('Masukkan nomer Hp Anda: ', (noHp) => {
//       console.log(`Terimakasih ${nama},sudah menginputkan ${noHp}`);
//       rl.close();
//   });
// });

// Readline membuat input ke terminal dan disimpan kedalam json
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Membuat Folder data
const dirPath = './data';
if(!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath);
}

// Membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

rl.question('Masukkan nama anda: ', (nama) => {
  rl.question('Masukkan nomer Hp Anda: ', (noHp) => {
    const contact = {nama,noHp}; 
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    
    contacts.push(contact);
    
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    // console.log(contacts);
    console.log('Terimakasih sudah memasukkan data.');

    rl.close();
  });
});

