package com.pedroeng.pc_builder_api.controller;


import com.pedroeng.pc_builder_api.dto.PcBuilderRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pc-builder")
public class PcBuilderController {

    @PostMapping
        public String gerarConfiguracao(@RequestBody @Valid PcBuilderRequest request){
            return "Uso: " + request.getUso()
                    + " | Orçamento: " + request.getNivelOrcamento()
                    + " | Valor: " + request.getValorMedio();
    }


}
