const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'test';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect((error, client) => {
    if(error){
        return console.log('Koneksi Gagal');
    }
    // pilih database
    const db = client.db(dbName);
    // console.log('Koneksi Berhasil');

    // Menambahkan 1 data ke collection mahasiswa
    // db.collection('mahasiswa').insertOne({
    //     nama: "patrik",
    //     email: "patrik@gmail.com"
    //     },
    //     (error, result) => { 
    //         if(error){
    //             console.log('gagal menambahkan data');
    //         }
    //         console.log(result);
    //     }
    // )


    // Menambahkan lebih dari satu data
    // db.collection('mahasiswa').insertMany(
    // [
    //     {
    //         nama: "lylia",
    //         email: "lylia@gmail.com"
    //     },
    //     {
    //         nama: "avip",
    //         email: "avip@gmail.com"
    //     }
    // ],
    // (error, result) => {
    //     if(error) {
    //         return console.log('data gagal ditambahkan');
    //     }
    //     console.log(result);
    //     }
    // )

    // Menampilkan semua data yang ada di collection/tabel mahasiswa
    // console.log(db.collection('mahasiswa').find().toArray((error, result) => {console.log(result)}));
    
    // Menampilkan data berdasarkan kriteria
    // console.log(db.collection('mahasiswa').find({_id: ObjectId("613884fc40df3522b09487b3")}).toArray((error, result) => {console.log(result)}));

    // Mengubah data berdasarkan id
    // const updatePromise = db.collection('mahasiswa').updateOne(
    //     {
    //         _id: ObjectId("613884fc40df3522b09487b3"),
    //     },
    //    {
    //     $set: {
    //         nama: 'lylia natsuka',
    //     },
    //    }
    // );

    // updatePromise.then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // Mengubah data lebih dari satu, berdasarkan kriteria
    // db.collection('mahasiswa').updateMany(
    //     {
    //         nama: "erik",
    //     },
    //     {
    //         $set:{
    //             nama: "erik doang",
    //         }
    //     }
    // )

    // Menghapus 1 data
    // db.collection('mahasiswa').deleteOne(
    //     {
    //         _id: ObjectId("613884fc40df3522b09487b3"),       
    //     }
    // ).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // Menghapus lebih dari 1 data 
    db.collection('mahasiswa').deleteMany(
        {
            nama: 'erik doang',   
        }
    ).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
    
});  