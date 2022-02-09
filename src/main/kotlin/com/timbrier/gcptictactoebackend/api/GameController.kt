package com.timbrier.gcptictactoebackend.api

import com.timbrier.gcptictactoebackend.games.Game
import com.timbrier.gcptictactoebackend.games.GameRepository
import com.timbrier.gcptictactoebackend.users.UserService
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class GameController(private val usersService: UserService, private val gameRepository: GameRepository) {

    @RequestMapping("/api/games")
    fun getGamesForCurrentUser(): List<Game> {
        return gameRepository.getGamesForUser(usersService.getCurrentUser())
    }
}