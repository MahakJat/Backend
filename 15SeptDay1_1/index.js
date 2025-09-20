// const http = require("http");
// const server = http.createServer(); //server create but not start

// server.listen(()=>{ //server is started  //but we have to setup/programmed  it to give the resposive
//     console.log("server is running at port 3000")
// })

const http = require("http");
const server = http.createServer((req,res)=>{
    res.end("server is programmed")
});

server.listen(3000,()=>{
    console.log("server is running at port 3000");
})
