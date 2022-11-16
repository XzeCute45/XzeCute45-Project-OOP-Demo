var express = require('express');
var cors = require('cors');
var app = express();
var fs = require('fs');
var axios = require('axios');
var bodyParser = require('body-parser')
app.use(cors());


app.use(bodyParser());
const base64_encode=(file)=>{
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

app.post('/image',function(require, res){   
    const image = (require.body.image);     //require รับ path มาจาก react
    axios.get('http://127.0.0.1:5000/api', { params: {img: image } })
    .then(res=>console.log(res.data))   //รับค่า return ที่ส่งมาจาก python
    // console.log(base64_encode('./image/change.jpg'))
    return res.send(base64_encode('./image/change.jpg'))    //read รูปจากโฟลเดอร์
})

app.get('/',function(req,res){
    return res.send('PROKET');
})

app.listen(9000, function () {
    console.log('Listening on http://localhost:9000/'); 
});
