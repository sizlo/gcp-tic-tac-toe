package com.timbrier.gcptictactoebackend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer

@SpringBootApplication
class GcpTicTacToeBackendApplication : SpringBootServletInitializer()

fun main(args: Array<String>) {
	runApplication<GcpTicTacToeBackendApplication>(*args)
}
