package com.emoney.core.model;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;

import java.io.Serializable;

/**
 * Created by Anil Kumal on 02/02/2019.
 * <p>
 * Base Class for every class related to domain object, entity object response object, DTO etc.
 */
public abstract class ModelBase implements Serializable {

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this);
    }
}
