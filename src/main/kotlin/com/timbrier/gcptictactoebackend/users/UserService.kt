package com.timbrier.gcptictactoebackend.users

import com.google.appengine.api.users.UserServiceFactory
import org.springframework.stereotype.Component

@Component
class UserService {

    private val googleUserService = UserServiceFactory.getUserService()

    fun getCurrentUser(): User {
        val googleUser = googleUserService.currentUser!!
        googleUser.federatedIdentity
        return User(email = googleUser.email)
    }
}