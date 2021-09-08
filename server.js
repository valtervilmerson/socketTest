import createGame from "./public/game.js"
import { Server } from "socket.io"
import express from "express"
import { createServer } from "http"

const app = express()
const server = createServer(app)
const sockets = new Server(server)

app.use(express.static("public"))

const game = createGame()

//game.start()

game.subscribe((command) => {
  console.log(`> Emiting ${command.type}`)
  sockets.emit(command.type, command)
})

sockets.on("connection", function (socket) {
  const playerId = socket.id
  console.log(`>Player connected on Server with id: ${playerId}`)

  game.addPlayer({ playerId: playerId })

  socket.emit("setup", game.state)

  socket.on("disconnect", () => {
    game.removePlayer({ playerId: playerId })
    console.log(`>Player disconnected: ${playerId}`)
  })

  socket.on("move-player", (command) => {
    command.playerId = playerId
    command.type = "move-player"

    game.movePlayer(command)
  })

  socket.on("start-game", () => {
    console.log(`Receiving startGame`)
    game.start()
  })
})

server.listen(3000, () => {
  console.log("Server listen on port 3000")
})
