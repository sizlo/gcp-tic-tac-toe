package com.timbrier.gcptictactoebackend.games

import com.timbrier.gcptictactoebackend.users.User

interface GameRepository {
    fun getGamesForUser(user: User): List<Game>
}