package com.timbrier.gcptictactoebackend.move

import com.timbrier.gcptictactoebackend.games.Game

data class MoveResponse (
    val game: Game,
    val valid: Boolean,
    val message: String
)