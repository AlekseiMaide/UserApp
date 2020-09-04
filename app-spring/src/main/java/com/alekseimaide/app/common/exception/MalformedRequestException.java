package com.alekseimaide.app.common.exception;

public class MalformedRequestException extends RuntimeException {

    public MalformedRequestException(final String message) {
        super(message);
    }
}
