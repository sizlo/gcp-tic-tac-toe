package com.timbrier.gcptictactoebackend.move

import com.timbrier.gcptictactoebackend.games.Game

data class MoveMessage (
    val move: Move,
    val game: Game
)
