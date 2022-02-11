package com.timbrier.gcptictactoebackend.move

import com.timbrier.gcptictactoebackend.games.Game
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component

@Component
@Profile("local")
class LocalMovePublisher: MovePublisher {

    private val logger = LoggerFactory.getLogger(javaClass)

    override fun publishMove(move: Move, game: Game) {
        logger.info("Published move id=0 data=${MoveMessage(move, game)}")
    }
}