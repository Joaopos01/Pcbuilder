package com.pedroeng.pc_builder_api.dto;


import lombok.Data;

@Data
public class PcBuilderRequest {

    private String uso;
    private String nivelOrcamento;
    private Double valorMedio;
}
