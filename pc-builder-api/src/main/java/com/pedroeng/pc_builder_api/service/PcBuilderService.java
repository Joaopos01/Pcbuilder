package com.pedroeng.pc_builder_api.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pedroeng.pc_builder_api.dto.PcBuilderRequest;
import com.pedroeng.pc_builder_api.dto.PcBuilderResponse;
import org.springframework.stereotype.Service;

@Service
public class PcBuilderService {

    private final GroqService groqService;

    public PcBuilderService(GroqService groqService) {
        this.groqService = groqService;
    }

    public PcBuilderResponse gerarConfiguracao(PcBuilderRequest request) {
        try {
            String prompt = """
                    Gere uma configuração de computador com base nos dados abaixo.
                    
                    Uso: %s
                    Orçamento: %s
                    Valor máximo: %s
                    
                    Responda APENAS em JSON válido, sem explicações, sem markdown.
                    
                    Use exatamente este formato:
                    
                    {
                      "processador": "",
                      "placaMae": "",
                      "memoriaRam": "",
                      "placaVideo": "",
                      "armazenamento": "",
                      "fonte": "",
                      "gabinete": "",
                      "precoEstimado": 0
                    }
                    """.formatted(
                    request.getUso(),
                    request.getOrcamento(),
                    request.getValorMaximo()
            );

            String respostaIa = groqService.gerarResposta(prompt);

            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(respostaIa, PcBuilderResponse.class);

        } catch (Exception e) {
            throw new RuntimeException("Erro ao converter resposta da IA para PcBuilderResponse", e);
        }
    }
}