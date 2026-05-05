package com.pedroeng.pc_builder_api.controller;

import com.pedroeng.pc_builder_api.dto.PcBuilderResponse;
import com.pedroeng.pc_builder_api.service.PcBuilderService;
import com.pedroeng.pc_builder_api.dto.PcBuilderRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/pc-builder")
public class PcBuilderController {

    private final PcBuilderService service;

    public PcBuilderController(PcBuilderService service){
        this.service = service;
    }

    @PostMapping
        public PcBuilderResponse gerarConfiguracao(@RequestBody @Valid PcBuilderRequest request){
            return service.gerarConfiguracao(request);
    }
}
