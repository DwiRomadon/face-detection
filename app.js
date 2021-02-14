const express = require('express')
const app = express()
var cors = require('cors')

var runPy = () =>
    new Promise(async (resolve, reject)=> {
        const { spawn } = require('child_process');
        const pyprog = spawn('python3', ['recognise_face.py']);
        pyprog.stdout.on('data', function(data) {
            resolve(data);
        });

        pyprog.stderr.on('data', (data) => {
            reject(data);
        });
    })

app.get('/bukakamera',async (req, res) => {
    // res.write('welcome\n');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    await runPy().then(result=>{
        let dataNya = result.toString().split(",")
        res.json({
            error: false,
            status: "Berhasil absen",
            data: dataNya[0]
        })
    }).catch(err=>{
        res.json({
            error: true,
            status: "Gagal absen",
            data: err.toString()
        })
    })
})

app.use(cors({origin: '*'}))
app.listen(4000, () => console.log('Application listening on port 4000!'))
