package com.pedroeng.pc_builder_api.service;

import com.pedroeng.pc_builder_api.dto.PcBuilderRequest;
import com.pedroeng.pc_builder_api.dto.PcBuilderResponse;
import org.springframework.stereotype.Service;

@Service
public class PcBuilderService {
        public PcBuilderResponse gerarConfiguracao(PcBuilderRequest request){
            return new PcBuilderResponse(
                    "Ryzen 5 5600",
                    "B450M",
                    "16 GB DDR4",
                    "RX 6600",
                    "SSD 1 TB",
                    "550 W",
                    "Mid Tower",
                    3400.0
            );
        }
}
