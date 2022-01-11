// const http = require('http');

// const server = http.createServer((req, res) => {

// });

// server.listen(3000, () =>{
//     console.log('Server is listening on port 3000')
// });

// Menggunakan chaining (Penggabungan)
const http = require('http');
const fs = require('fs');

const port = 3000;

const renderHTML = (path, res) => {
    fs.readFile(path, (err, data) => {
        if(err){
            res.writeHead(404);
            res.write('Error: File not Found');
        } else{
            res.write(data);
        }
        res.end();
    });
};

http.createServer((req,res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });

    const url = req.url;
    // Menggunakan Switch
    switch(url) {
        case '/about':
            renderHTML('./about.html', res);
            break;
        case '/contact':
            renderHTML('./contact.html',res);
            break;
        default:
            renderHTML('./index.html', res);    
        break;
        }


    // Menggunakan Else If
    // if( url === '/about'){
    //     renderHTML('./about.html',res);
    // } else if(url === '/contact') {
    //     renderHTML('./contact.html',res);
    // }else{
    //     renderHTML('./index.html',res);        
    // }
})

    .listen(port,() => {
        console.log(`Server is Listening on Port ${port}..`);
    });
