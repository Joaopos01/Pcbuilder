package com.pedroeng.pc_builder_api.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

@Service
public class GroqService {

    @Value("${groq.api.key}")
    private String apiKey;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient client = HttpClient.newHttpClient();

    public String gerarResposta(String prompt) {
        try {
            String url = "https://api.groq.com/openai/v1/chat/completions";

            Map<String, Object> bodyMap = Map.of(
                    "model", "llama-3.1-8b-instant",
                    "messages", List.of(
                            Map.of(
                                    "role", "user",
                                    "content", prompt
                            )
                    ),
                    "temperature", 0.2
            );

            String body = objectMapper.writeValueAsString(bodyMap);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            HttpResponse<String> response =
                    client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("STATUS GROQ: " + response.statusCode());
            System.out.println("RESPOSTA BRUTA DA GROQ:");
            System.out.println(response.body());

            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                throw new RuntimeException("Erro HTTP da Groq: " + response.statusCode() + " - " + response.body());
            }

            return extrairConteudoDaResposta(response.body());

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Chamada para Groq foi interrompida", e);

        } catch (IOException e) {
            throw new RuntimeException("Erro ao chamar Groq", e);
        }
    }

    private String extrairConteudoDaResposta(String respostaJson) {
        try {
            JsonNode root = objectMapper.readTree(respostaJson);

            if (root.has("error")) {
                String mensagemErro = root.path("error").path("message").asText();
                throw new RuntimeException("Erro retornado pela Groq: " + mensagemErro);
            }

            JsonNode choices = root.path("choices");

            if (!choices.isArray() || choices.isEmpty()) {
                throw new RuntimeException("Resposta da Groq não contém choices: " + respostaJson);
            }

            JsonNode content = choices.get(0)
                    .path("message")
                    .path("content");

            if (content.isMissingNode() || content.asText().isBlank()) {
                throw new RuntimeException("Resposta da Groq não contém content: " + respostaJson);
            }

            return content.asText();

        } catch (Exception e) {
            throw new RuntimeException("Erro ao extrair resposta da IA", e);
        }
    }
}