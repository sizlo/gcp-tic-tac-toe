package com.timbrier.gcptictactoebackend.api

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

data class Game(val id: String)

@RestController
class GameController {

    @RequestMapping("/api/games")
    fun getGames(): List<Game> {
        return listOf(Game("game-id-0"), Game("game-id-1"))
    }
}