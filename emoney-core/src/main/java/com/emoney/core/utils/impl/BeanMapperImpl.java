package com.emoney.core.utils.impl;

import com.emoney.core.utils.IBeanMapper;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
public class BeanMapperImpl<Entity, DTO> implements IBeanMapper<Entity, DTO> {

    protected static ModelMapper modelMapper = new ModelMapper();
    protected Class<Entity> entityClass;
    protected Class<DTO> viewModelClass;

    public BeanMapperImpl(Class<Entity> entityClass, Class<DTO> viewModelClass) {

        this.entityClass = entityClass;
        this.viewModelClass = viewModelClass;
    }

    @Override
    public Entity mapToEntity(DTO viewModel) {
        return modelMapper.map(viewModel, entityClass);
    }

    @Override
    public DTO mapToDTO(Entity entity) {
        return modelMapper.map(entity, viewModelClass);
    }

    @Override
    public List<Entity> mapToEntity(List<DTO> dtos) {
        return dtos.stream().map(dto -> mapToEntity(dto)).collect(Collectors.toList());
    }

    @Override
    public List<DTO> mapToDTO(List<Entity> entityList) {
        return entityList.stream().map(entity -> mapToDTO(entity)).collect(Collectors.toList());
    }
}
