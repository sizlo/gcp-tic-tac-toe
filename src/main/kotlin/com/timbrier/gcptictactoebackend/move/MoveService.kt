package com.timbrier.gcptictactoebackend.move

import com.timbrier.gcptictactoebackend.games.GameRepository
import com.timbrier.gcptictactoebackend.users.User
import org.springframework.stereotype.Component

@Component
class MoveService(private val gameRepository: GameRepository, private val movePublisher: MovePublisher) {
    fun makeMove(move: Move, gameId: Long, user: User): MoveResponse {
        val game = gameRepository.getGameById(gameId)

        val verifyResult = verifyMove(game, move, user)

        return if (verifyResult.valid) {
            val newGame = applyMove(game, move)
            val updatedGame = gameRepository.updateGame(newGame)
            movePublisher.publishMove(move, updatedGame)
            MoveResponse(game = updatedGame, valid = true, message = "")
        } else {
            MoveResponse(game = game, valid = false, message = verifyResult.message)
        }
    }
}