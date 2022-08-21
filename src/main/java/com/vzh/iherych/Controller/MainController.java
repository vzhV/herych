package com.vzh.iherych.Controller;

import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
    @RequestMapping("/{path:[^\\\\.]*}")
    public String index() {
        return "index.html";
    }

    @Bean
    public Algorithm getAlgorithm() {
        return Algorithm.HMAC256("ivanherychloh1337");
    }
}
