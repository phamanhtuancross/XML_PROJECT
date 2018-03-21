var express = require('express')
var app = express()

var server = 

app.listen(3000,()=> console.log("listen port successfully on port 3000"))

app.use(express.static( __dirname + '/public/'))

app.get('/data/listTV',(req,res) =>{
    res.sendFile(__dirname + '/public/data/Danh_sach_Tivi.xml')
})

app.get('/data/store',(req,res)=>{
    res.sendFile(__dirname + '/public/data/Cua_hang.xml')
})

app.get('/media',(req,res) =>{
    res.sendFile(__dirname + '/public/Media/')
})


app.get('/KhachThamQuan',(req,res)=> {
    res.sendFile(__dirname + '/KhachThamQuan/Views/KhachThamQuan.html')

})

app.get('/NhanVienNhapHang',(req,res) =>{
    res.sendFile(__dirname +'/NhanVienNhapHang/Views/nhanVienNhapHang.html')
})

app.get('/QuanLyNhapHang',(req,res) =>{
    res.sendFile(__dirname +'/QuanLyNhapHang/Views/QuanLyNhapHang.html')
})








