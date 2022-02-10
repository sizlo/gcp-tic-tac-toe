package com.timbrier.gcptictactoebackend.games

import com.timbrier.gcptictactoebackend.users.User

interface GameRepository {
    fun getGamesForUser(user: User): List<Game>
    fun getGameById(id: Long): Game
    fun createGame(user: User, newGame: NewGame): Game
}