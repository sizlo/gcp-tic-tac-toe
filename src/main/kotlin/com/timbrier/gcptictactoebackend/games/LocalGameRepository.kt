package com.timbrier.gcptictactoebackend.games

import com.timbrier.gcptictactoebackend.users.User
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component

@Component
@Profile("local")
class LocalGameRepository: GameRepository {

    private val games = mutableListOf(
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

    override fun createGame(user: User, newGame: NewGame): Game {
        val nextId = games.maxOf { it.id } + 1
        val createdGame = Game(
            id = nextId,
            board = newBoard(),
            players = mapOf(
                "X" to user.email,
                "Y" to newGame.opponent
            ),
            nextPlayer = "X"
        )
        games.add(createdGame)
        return createdGame
    }
}