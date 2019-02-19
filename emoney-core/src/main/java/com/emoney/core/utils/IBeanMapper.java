package com.emoney.core.utils;

import java.util.List;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
public interface IBeanMapper<Entity, DTO> {
    Entity mapToEntity(DTO viewModel);

    DTO mapToDTO(Entity entity);

    List<Entity> mapToEntity(List<DTO> dtoList);

    List<DTO> mapToDTO(List<Entity> entityList);
}
