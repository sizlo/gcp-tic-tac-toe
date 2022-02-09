package com.timbrier.gcptictactoebackend.api

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class InfoController {

    @GetMapping("/api/info")
    fun getInfo(): Map<String, String> {
        return mapOf(
            envEntry("GAE_VERSION"),
            envEntry("GAE_MEMORY_MB")
        )
    }

    private fun envEntry(variableName: String): Pair<String, String> {
        return variableName to System.getenv(variableName)
    }
}