package com.timbrier.gcptictactoebackend.users

import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component
import org.springframework.web.util.WebUtils
import javax.servlet.http.HttpServletRequest

@Component
@Profile("local")
class LocalUserService(private val request: HttpServletRequest): UserService {

    override fun getCurrentUser(): User {
        val email = request.getHeader("TTT_EMAIL")
            ?: WebUtils.getCookie(request, "TTT_EMAIL")?.value
            ?: "default@tictactoe.com"
        return User(email)
    }
}