package com.timbrier.gcptictactoebackend.games

data class Game(
    val id: Long,
    val board: String,
    val players: Map<String, String>,
    val nextPlayer: String
) {
    companion object {}
}