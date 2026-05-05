package com.pedroeng.pc_builder_api.service;

import com.pedroeng.pc_builder_api.dto.PcBuilderRequest;
import org.springframework.stereotype.Service;

@Service
public class PcBuilderService {
        public String gerarConfiguracao(PcBuilderRequest request){

            return "Uso " + request.getUso()
                    + " | Orçamento: " + request.getNivelOrcamento()
                    + " | Valor: " + request.getValorMedio();
        }
}
