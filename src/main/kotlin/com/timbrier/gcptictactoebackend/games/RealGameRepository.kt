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

    override fun getGamesForUser(user: User): List<Game> {
        val query = Query.newGqlQueryBuilder(Query.ResultType.ENTITY, "SELECT * FROM Game WHERE players CONTAINS @userEmail")
            .setBinding("userEmail", user.email)
            .build()

        val results = datastoreService.run(query).asSequence().toList()

        return results.map { gameFromEntity(it) }
    }
}