import createGame from "./public/game.js"
import { Server } from "socket.io"
import express from "express"
import { createServer } from "http"

const app = express()
const server = createServer(app)
const sockets = new Server(server)

app.use(express.static("public"))

const game = createGame()

sockets.on("connection", function (socket) {
  const playerId = socket.id
  console.log(`>Player connected on Server with id: ${playerId}`)

  game.addPlayer({playerId:playerId})
        console.log(game.state)
        
  socket.emit("setup", game.state)
})

server.listen(3000, () => {
  console.log("Server listen on port 3000")
})
