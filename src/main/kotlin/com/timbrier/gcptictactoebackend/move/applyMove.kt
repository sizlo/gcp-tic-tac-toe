package com.timbrier.gcptictactoebackend.move

import com.timbrier.gcptictactoebackend.games.Game

fun applyMove(game: Game, move: Move): Game {
    return game.copy(
        board = game.board.replaceRange(move.index, move.index + 1, move.symbol),
        nextPlayer = if (game.nextPlayer == "X") "O" else "X"
    )
}