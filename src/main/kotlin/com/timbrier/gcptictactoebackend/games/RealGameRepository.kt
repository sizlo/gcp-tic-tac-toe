package com.timbrier.gcptictactoebackend.games

import com.google.cloud.datastore.DatastoreOptions
import com.google.cloud.datastore.Query
import com.timbrier.gcptictactoebackend.users.User
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component

@Component
@Profile("!local")
class RealGameRepository: GameRepository {

    private val datastoreService = DatastoreOptions.getDefaultInstance().service
    private val keyFactory = datastoreService.newKeyFactory().setKind("Game")

    override fun getGamesForUser(user: User): List<Game> {
        val query = Query.newGqlQueryBuilder(Query.ResultType.ENTITY, "SELECT * FROM Game WHERE players CONTAINS @userEmail")
            .setBinding("userEmail", user.email)
            .build()

        val results = datastoreService.run(query).asSequence().toList()

        return results.map { gameFromEntity(it) }
    }

    override fun getGameById(id: Long): Game {
        return gameFromEntity(datastoreService.get(keyFactory.newKey(id)))
    }

    override fun createGame(user: User, newGame: NewGame): Game {
        val entity = entityFromNewGame(keyFactory.newKey(), user, newGame)
        val result = datastoreService.put(entity)
        return gameFromEntity(result)
    }

    override fun updateGame(game: Game): Game {
        val entity = entityFromGame(keyFactory.newKey(game.id), game)
        val result = datastoreService.put(entity)
        return gameFromEntity(result)
    }
}