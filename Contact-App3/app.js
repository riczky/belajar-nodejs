// const { require } = require("yargs");
const yargs = require("yargs");
const contacts = require('./contacts');
// console.log(yargs.argv);
// yargs.command('add', 'Menambahkan contact baru', () => {}, (argv)=> {
//     console.log(argv.nama);
// });

yargs.command({
    command: 'add',
    describe: 'Menambahkan kontak baru',
    builder: {
        nama:{
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
        email:{
            describe: 'Email',
            demandOption: false,
            type:'string'
        },
        noHP: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.simpanContact(argv.nama, argv.email, argv.noHP);
      
        // const contact = {
        //     nama: argv.nama,
        //     email: argv.email,
        //     noHP: argv.noHP,
        // };
        // console.log(contact);
    },
}).demandCommand();

    // Menampilkan daftar semua nama dan no hp kontak
    yargs.command({
        command: 'list',
        describe: 'Menampilkan semua nama dan no hp',
        handler(){
            contacts.listContact();
        }
    })

    // Menampilkan detail sebuah kontak
    yargs.command({
        command: 'detail',
        describe: 'Menampilkan detail sebuah kontak berdasarkan nama',
        builder: {
            nama:{
                describe: 'Nama Lengkap',
                demandOption: true,
                type: 'string',
            },
        },
        handler(argv){
            contacts.detailContact(argv.nama);
        },
    });

     // Menghapus kontak berdasarkan nama
     yargs.command({
        command: 'delete',
        describe: 'Menghapus sebuah kontak berdasarkan nama',
        builder: {
            nama:{
                describe: 'Nama Lengkap',
                demandOption: true,
                type: 'string',
            },
        },
        handler(argv){
            contacts.deleteContact(argv.nama);
        },
    });



yargs.parse();