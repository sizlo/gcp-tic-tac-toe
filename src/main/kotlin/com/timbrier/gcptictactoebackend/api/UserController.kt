package com.timbrier.gcptictactoebackend.api

import com.timbrier.gcptictactoebackend.users.User
import com.timbrier.gcptictactoebackend.users.UserService
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class UserController(private val userService: UserService) {

    @RequestMapping("/api/users/current")
    fun currentUser(): User {
        Thread.sleep(3000)
        return userService.getCurrentUser()
    }
}