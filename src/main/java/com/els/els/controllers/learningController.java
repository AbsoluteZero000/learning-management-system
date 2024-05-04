package com.els.els.controllers;

import javax.ejb.Stateless;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Stateless
class learningController {

    @GetMapping("/")
    public String getMethodName() {
        return new String("hello world!");
    }

}
