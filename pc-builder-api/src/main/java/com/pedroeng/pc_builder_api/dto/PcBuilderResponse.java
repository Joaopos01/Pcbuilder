package com.pedroeng.pc_builder_api.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PcBuilderResponse {

    private String processador;
    private String placaMae;
    private String memoriaRam;
    private String placaVideo;
    private String armazenamento;
    private String fonte;
    private String gabinete;
    private Double precoEstimado;
}


