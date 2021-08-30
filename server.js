import createGame from "./public/game.js"
import { Server } from "socket.io"
import express from "express"
import { createServer } from "http"

const app = express()
const server = createServer(app)
const sockets = new Server(server)

app.use(express.static("public"))

const game = createGame()

game.addPlayer({ playerId: "player1", playerX: 4, playerY: 6 })
game.addFruit({ fruitId: "fruit1", fruitX: 2, fruitY: 4 })

sockets.on("connection", function (socket) {
  const playerId = socket.id
  console.log(`>Player connected on Server with id: ${playerId}`)

  socket.emit("setup", game.state)
})

server.listen(3000, () => {
  console.log("Server listen on port 3000")
})
