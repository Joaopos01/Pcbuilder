package com.pedroeng.pc_builder_api.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pc-builder")
public class PcBuilderController {

    @RequestMapping
        public String gerarConfiguracao(){
            return "Configuração gerada com sucesso!";
    }


}
