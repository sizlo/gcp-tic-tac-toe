package com.timbrier.gcptictactoebackend.games

import com.google.cloud.datastore.Entity
import com.google.cloud.datastore.Key
import com.google.cloud.datastore.StringValue

fun entityFromGame(key: Key, game: Game): Entity {
    return Entity.newBuilder(key)
        .set("board", game.board)
        .set("xPlayer", game.players["X"])
        .set("oPlayer", game.players["O"])
        .set("nextPlayer", game.nextPlayer)
        .set("players", game.players.values.map { StringValue(it) })
        .build()
}