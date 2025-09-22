package com.sellphones.redis;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.InstantDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.InstantSerializer;
import com.sellphones.configuration.DefaultInstantDeserializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Otp {
    private String otp;

    @JsonDeserialize(using = DefaultInstantDeserializer.class)
    @JsonSerialize(using = InstantSerializer.class)
    private Instant createdAt;

}
