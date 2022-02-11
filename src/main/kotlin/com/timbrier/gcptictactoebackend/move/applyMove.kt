package com.timbrier.gcptictactoebackend.move

import com.timbrier.gcptictactoebackend.games.Game
import com.timbrier.gcptictactoebackend.games.GameStatus

fun applyMove(game: Game, move: Move): Game {
    val newGame = game.copy(
        board = game.board.replaceRange(move.index, move.index + 1, move.symbol),
        nextPlayer = if (game.nextPlayer == "X") "O" else "X"
    )

    return if (isWon(newGame.board)) {
        newGame.copy(
            status = GameStatus.WON,
            winner = game.players[game.nextPlayer]!!
        )
    } else if (isDrawn(newGame.board)) {
        newGame.copy(status = GameStatus.DRAWN)
    } else {
        newGame
    }
}

private fun isWon(board: String): Boolean {
    val rows = listOf(
        "${board[0]}${board[1]}${board[2]}",
        "${board[3]}${board[4]}${board[5]}",
        "${board[6]}${board[7]}${board[8]}"
    )
    val cols = listOf(
        "${board[0]}${board[3]}${board[6]}",
        "${board[1]}${board[4]}${board[7]}",
        "${board[2]}${board[5]}${board[8]}"
    )
    val diags = listOf(
        "${board[0]}${board[4]}${board[8]}",
        "${board[2]}${board[4]}${board[6]}"
    )

    val allVictoryPaths = rows + cols + diags

    return allVictoryPaths.any { it == "XXX" || it == "OOO" }
}

private fun isDrawn(board: String): Boolean {
    return board.count { it == 'X' || it == 'O' } == 9
}
