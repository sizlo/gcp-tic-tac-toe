package com.timbrier.gcptictactoebackend.users

import com.google.appengine.api.users.UserServiceFactory
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component

@Component
@Profile("!local")
class RealUserService: UserService {

    private val googleUserService = UserServiceFactory.getUserService()

    override fun getCurrentUser(): User {
        val googleUser = googleUserService.currentUser!!
        return User(email = googleUser.email)
    }
}