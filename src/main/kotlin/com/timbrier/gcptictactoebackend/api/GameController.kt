package com.timbrier.gcptictactoebackend.api

import com.timbrier.gcptictactoebackend.games.Game
import com.timbrier.gcptictactoebackend.games.GameRepository
import com.timbrier.gcptictactoebackend.games.NewGame
import com.timbrier.gcptictactoebackend.move.Move
import com.timbrier.gcptictactoebackend.move.MoveResponse
import com.timbrier.gcptictactoebackend.move.MoveService
import com.timbrier.gcptictactoebackend.users.UserService
import org.springframework.web.bind.annotation.*

@RestController
class GameController(
    private val usersService: UserService,
    private val gameRepository: GameRepository,
    private val moveService: MoveService
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
        return moveService.makeMove(move, id, usersService.getCurrentUser())
    }
}