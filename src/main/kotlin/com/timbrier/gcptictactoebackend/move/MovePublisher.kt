package com.timbrier.gcptictactoebackend.move

import com.timbrier.gcptictactoebackend.games.Game

interface MovePublisher {
    fun publishMove(move: Move, game: Game)
}