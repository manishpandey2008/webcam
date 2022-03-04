var express=require('express');
var app=express();
var PORT=4000;

app.use(express.static(__dirname+'/public'))

// console.log("Webrtc server run on port: ",PORT)

app.get("/",function(request,responce){
    responce.render('index.ejs');
})

const server = app.listen(PORT, () => {
    console.log(`The application started on port ${server.address().port}`);
});