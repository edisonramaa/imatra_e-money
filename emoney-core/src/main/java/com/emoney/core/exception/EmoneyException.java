package com.emoney.core.exception;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@Getter
@Setter
public class EmoneyException extends RuntimeException {
    private Object data;

    public EmoneyException(String message) {
        this(message, null);
    }

    public EmoneyException(String message, Object data) {
        super(message);
        this.data = data;
    }
}
