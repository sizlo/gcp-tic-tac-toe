package com.timbrier.gcptictactoebackend.api

import com.timbrier.gcptictactoebackend.games.Game
import com.timbrier.gcptictactoebackend.games.GameRepository
import com.timbrier.gcptictactoebackend.games.NewGame
import com.timbrier.gcptictactoebackend.users.UserService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class GameController(private val usersService: UserService, private val gameRepository: GameRepository) {

    @RequestMapping("/api/games")
    fun getGamesForCurrentUser(): List<Game> {
        return gameRepository.getGamesForUser(usersService.getCurrentUser())
    }

    @PostMapping("/api/games")
    fun newGame(@RequestBody newGame: NewGame): Game {
        return gameRepository.createGame(usersService.getCurrentUser(), newGame)
    }
}