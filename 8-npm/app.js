// console.log('Hello World');

const validator = require('validator');
const chalk = require('chalk');

// console.log(validator.isEmail('riczky@gmail.com'));
// console.log(validator.isMobilePhone('08012312312', 'id-ID'));
// console.log(validator.isNumeric('080123a12312'));

// console.log(chalk.italic.bgBlue.black('Hello World'));
const nama = 'riczky';
const pesan = chalk`Lorem, ipsum dolor {bgRed.black.bold sit amet} consectetur {bgBlue.italic.black adipisicing} elit. Nama saya ${nama}`;
// console.log(chalk.bgRed.black(pesan));
console.log(pesan);