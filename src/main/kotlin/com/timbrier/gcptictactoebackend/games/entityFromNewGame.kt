package com.timbrier.gcptictactoebackend.games

import com.google.cloud.datastore.Entity
import com.google.cloud.datastore.FullEntity
import com.google.cloud.datastore.IncompleteKey
import com.google.cloud.datastore.StringValue
import com.timbrier.gcptictactoebackend.users.User

fun entityFromNewGame(key: IncompleteKey, user: User, newGame: NewGame): FullEntity<IncompleteKey> {
    return Entity.newBuilder(key)
        .set("board", newBoard())
        .set("xPlayer", user.email)
        .set("yPlayer", newGame.opponent)
        .set("nextPlayer", "X")
        .set("players", listOf(StringValue(user.email), StringValue(newGame.opponent)))
        .build()
}