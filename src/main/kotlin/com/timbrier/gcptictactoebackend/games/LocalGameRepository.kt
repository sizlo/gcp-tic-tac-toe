package com.timbrier.gcptictactoebackend.games

import com.timbrier.gcptictactoebackend.users.User
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component

@Component
@Profile("local")
class LocalGameRepository: GameRepository {

    private val games = listOf(
        Game(
            id = 0,
            board = "XO-----OX",
            players = mapOf(
                "X" to "player1@tictactoe.com",
                "Y" to "player2@tictactoe.com"
            ),
            nextPlayer = "X"
        )
    )

    override fun getGamesForUser(user: User): List<Game> {
        return games.filter { it.players.values.contains(user.email) }
    }
}