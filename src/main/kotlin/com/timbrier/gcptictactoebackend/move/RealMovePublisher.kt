package com.timbrier.gcptictactoebackend.move

import com.fasterxml.jackson.databind.ObjectMapper
import com.google.cloud.pubsub.v1.Publisher
import com.google.protobuf.ByteString
import com.google.pubsub.v1.PubsubMessage
import com.timbrier.gcptictactoebackend.games.Game
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component

@Component
@Profile("!local")
class RealMovePublisher: MovePublisher {

    private val logger = LoggerFactory.getLogger(javaClass)

    override fun publishMove(move: Move, game: Game) {
        val publisher = Publisher.newBuilder("projects/tic-tac-toe-340314/topics/moves").build()
        try {
            tryPublishMove(publisher, move, game)
        } finally {
            publisher?.shutdown()
        }
    }

    private fun tryPublishMove(publisher: Publisher, move: Move, game: Game) {
        val data = MoveMessage(move, game)

        val dataBytes = data
            .let { ObjectMapper().writeValueAsString(it) }
            .let { ByteString.copyFromUtf8(it) }

        val message = PubsubMessage.newBuilder().setData(dataBytes).build()

        val id = publisher.publish(message).get()

        logger.info("Published move id=$id data=$data")
    }
}