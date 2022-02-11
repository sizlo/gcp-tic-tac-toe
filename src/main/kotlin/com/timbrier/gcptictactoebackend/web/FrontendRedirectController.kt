package com.timbrier.gcptictactoebackend.web

import org.springframework.ui.ModelMap
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.ModelAndView

@RestController
class FrontendRedirectController {

    @GetMapping("/game/{id}")
    fun redirectToIndex(model: ModelMap): ModelAndView {
        model.addAttribute("attribute", "forwardWithForwardPrefix")
        return ModelAndView("forward:/", model)
    }
}