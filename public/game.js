export default function createGame() {
  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 10,
      height: 10,
    },
  }

  function setState(newState){
    Object.assign(state, newState)
  }



  function addPlayer(command) {
    const playerId = command.playerId
    const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width)
    const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height)

    state.players[playerId] = {
      x: playerX,
      y: playerY,
    }
  }

  function removePlayer(command) {
    const playerId = command.playerId
    delete state.players[playerId]
  }

  function addFruit(command) {
    const fruitId = command.fruitId
    const fruitX = command.fruitX
    const fruitY = command.fruitY

    state.fruits[fruitId] = {
      x: fruitX,
      y: fruitY,
    }
  }

  function removeFruit(command) {
    const fruitId = command.fruitId
    delete state.fruits[fruitId]
  }

  function movePlayer(command) {
    console.log(
      `game.movePlayer()-> Moving ${command.playerId} with ${command.keyPressed}`
    )

    const acceptedMoves = {
      ArrowUp(player) {
        console.log("game.movePlayer().ArrowUP()-> Moving player UP")

        if (player.y - 1 >= 0) {
          player.y = player.y - 1
          return
        }
      },
      ArrowDown(player) {
        console.log("game.movePlayer().ArrowDown()-> Moving player DOWN")

        if (player.y + 1 < state.screen.height) {
          player.y = player.y + 1
          return
        }
      },
      ArrowLeft(player) {
        console.log("game.movePlayer().ArrowLeft()-> Moving player LEFT")

        if (player.x - 1 >= 0) {
          player.x = player.x + -1
          return
        }
      },
      ArrowRight(player) {
        console.log("game.movePlayer().ArrowRight()-> Moving player RIGHT")

        if (player.x + 1 < state.screen.width) {
          player.x = player.x + 1
          return
        }
      },
    }

    const keyPressed = command.keyPressed
    const playerId = command.playerId
    const player = state.players[playerId]
    const moveFunction = acceptedMoves[keyPressed]

    if (player && moveFunction) {
      moveFunction(player)
      checkForFruitCollision(playerId)
    }

    function checkForFruitCollision(playerId) {
      const player = state.players[playerId]

      for (const fruitId in state.fruits) {
        const fruit = state.fruits[fruitId]
        console.log(`Checking ${playerId} and ${fruitId}`)

        if (player.x === fruit.x && player.y === fruit.y) {
          console.log(`COLLISION between ${playerId} and ${fruitId}`)
          removeFruit({ fruitId: fruitId })
        }
      }
    }
  }
  return {
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
    movePlayer,
    setState,
    state,
  }
}
