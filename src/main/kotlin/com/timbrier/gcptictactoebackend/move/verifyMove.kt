package com.timbrier.gcptictactoebackend.move

import com.timbrier.gcptictactoebackend.games.Game
import com.timbrier.gcptictactoebackend.users.User

fun verifyMove(game: Game, move: Move, user: User): MoveVerifyResult {
    when {
        isNotThisUsersTurn(game, user) -> return MoveVerifyResult(false, "It is not your turn")
        isNotTheCorrectSymbol(game, move) -> return MoveVerifyResult(false, "You placed an incorrect symbol")
        spaceIsAlreadyOccupied(game, move) -> return MoveVerifyResult(false, "You placed on an already occupied space")
    }
    return MoveVerifyResult(true, "")
}

private fun isNotThisUsersTurn(game: Game, user: User): Boolean {
    return user.email != game.players[game.nextPlayer]
}

private fun isNotTheCorrectSymbol(game: Game, move: Move): Boolean {
    return move.symbol != game.nextPlayer
}

private fun spaceIsAlreadyOccupied(game: Game, move: Move): Boolean {
    return game.board[move.index] != '-'
}
