const ws = new require("ws");

const wsServer = new ws.Server({port: 5000});

// button.addEventListener("click", function(e))

const sockets = []

wsServer.on("connection", (socket)=> {
    sockets.push(socket);
    // console.log("Frontend connect success")
    setTimeout(()=> {
        socket.send("Welcome to server")
    }, 3000);

    sockets.forEach(item => {
        if(item !== socket) {
            item.send("New member connection")
        }
    })
})