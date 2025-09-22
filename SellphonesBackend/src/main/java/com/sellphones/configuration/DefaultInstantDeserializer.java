package com.sellphones.configuration;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.time.Instant;

public class DefaultInstantDeserializer extends JsonDeserializer<Instant> {
    @Override
    public Instant deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        String text = jsonParser.getText().trim();
        try {
            // Nếu là số (epoch giây/millis)
            if (text.matches("^\\d+(\\.\\d+)?$")) {
                if (text.contains(".")) {
                    // epoch giây + nanos
                    String[] parts = text.split("\\.");
                    long seconds = Long.parseLong(parts[0]);
                    int nanos = Integer.parseInt(parts[1]);
                    return Instant.ofEpochSecond(seconds, nanos);
                } else {
                    // epoch millis
                    return Instant.ofEpochMilli(Long.parseLong(text));
                }
            }
            // Ngược lại, parse ISO string
            return Instant.parse(text);
        } catch (Exception e) {
            throw new IOException("Cannot deserialize Instant from value: " + text, e);
        }

    }
}
