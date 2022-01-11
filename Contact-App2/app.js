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
})


yargs.parse();