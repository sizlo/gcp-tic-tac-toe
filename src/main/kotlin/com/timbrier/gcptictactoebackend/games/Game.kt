package com.timbrier.gcptictactoebackend.games

enum class GameStatus {
    IN_PROGRESS, WON, DRAWN;

    companion object {
        fun fromString(s: String): GameStatus {
            return values().first { it.name == s }
        }
    }
}

data class Game(
    val id: Long,
    val status: GameStatus,
    val board: String,
    val players: Map<String, String>,
    val nextPlayer: String,
    val winner: String
)