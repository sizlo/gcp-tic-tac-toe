package com.timbrier.gcptictactoebackend.games

import com.google.cloud.datastore.Entity

fun gameFromEntity(entity: Entity): Game {
    return Game(
        id = entity.key.id,
        board = entity.getString("board"),
        players = mapOf(
            "X" to entity.getString("xPlayer"),
            "O" to entity.getString("oPlayer"),
        ),
        nextPlayer = entity.getString("nextPlayer")
    )
}