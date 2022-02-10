package com.timbrier.gcptictactoebackend.api

import com.timbrier.gcptictactoebackend.games.Game
import com.timbrier.gcptictactoebackend.games.GameRepository
import com.timbrier.gcptictactoebackend.games.NewGame
import com.timbrier.gcptictactoebackend.move.Move
import com.timbrier.gcptictactoebackend.move.MoveResponse
import com.timbrier.gcptictactoebackend.move.applyMove
import com.timbrier.gcptictactoebackend.move.verifyMove
import com.timbrier.gcptictactoebackend.users.UserService
import org.springframework.web.bind.annotation.*

@RestController
class GameController(
    private val usersService: UserService,
    private val gameRepository: GameRepository
) {

    @RequestMapping("/api/games")
    fun getGamesForCurrentUser(): List<Game> {
        return gameRepository.getGamesForUser(usersService.getCurrentUser())
    }

    @RequestMapping("/api/games/{id}")
    fun getGameById(@PathVariable id: Long): Game {
        return gameRepository.getGameById(id)
    }

    @PostMapping("/api/games")
    fun newGame(@RequestBody newGame: NewGame): Game {
        return gameRepository.createGame(usersService.getCurrentUser(), newGame)
    }

    @PostMapping("api/games/{id}/move")
    fun makeMove(@RequestBody move: Move, @PathVariable id: Long): MoveResponse {
        val game = gameRepository.getGameById(id)
        val verifyResult = verifyMove(game, move, usersService.getCurrentUser())
        return if (verifyResult.valid) {
            val newGame = applyMove(game, move)
            val updatedGame = gameRepository.updateGame(newGame)
            MoveResponse(game = updatedGame, valid = true, message = "")
        } else {
            MoveResponse(game = game, valid = false, message = verifyResult.message)
        }
    }
}