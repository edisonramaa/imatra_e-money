package com.emoney.core.controller;


import com.emoney.core.constant.WebResourceConstant;
import com.emoney.core.exception.EmoneyException;
import com.emoney.core.model.ResponseObj;
import com.emoney.core.service.ICrudService;
import com.emoney.core.utils.IBeanMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by Anil Kumal on 02/02/2019.
 */

public abstract class ControllerBase<Entity, Dto> {

    protected ICrudService iCrudService;
    protected IBeanMapper<Entity, Dto> reqBeanMapper;
    protected IBeanMapper<Entity, Dto> resBeanMapper;


    public ControllerBase(ICrudService iCrudService, IBeanMapper reqBeanMapper, IBeanMapper resBeanMapper) {
        this.iCrudService = iCrudService;
        this.reqBeanMapper = reqBeanMapper;
        this.resBeanMapper = resBeanMapper;
    }

    @PostMapping(WebResourceConstant.CREATE)
    public ResponseEntity<ResponseObj> create(@RequestBody @Valid Dto dto) {
        Entity entity = reqBeanMapper.mapToEntity(dto);
        iCrudService.save(entity);
        // setCreateEntityProperties(entity);
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().message("Record has been created.").build(), HttpStatus.OK);
    }

    @PutMapping(WebResourceConstant.UPDATE)
    public ResponseEntity<ResponseObj> update(@RequestBody @Valid Dto dto) {
        Entity entity = reqBeanMapper.mapToEntity(dto);
        //  setUpdateEntityProperties(entity);
        iCrudService.update(entity);
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().message("Record has been updated.").build(), HttpStatus.OK);
    }

    @DeleteMapping(WebResourceConstant.DELETE)
    public ResponseEntity<ResponseObj> delete(@PathVariable Long id) {
        iCrudService.delete(id);
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(id).message("Record with id: " + id + " deleted.").build(), HttpStatus.OK);
    }

    @GetMapping(WebResourceConstant.GET)
    public ResponseEntity<ResponseObj> get(@PathVariable Long id) {
        Entity entity = (Entity) iCrudService.findOne(id);
        if (entity == null) {
            throw new EmoneyException("Sorry!! No Records Found");
        }

        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(resBeanMapper.mapToDTO(entity)).message("Success").build(), HttpStatus.OK);
    }

    @GetMapping(WebResourceConstant.GET_ALL)
    public ResponseEntity<ResponseObj> getAll() {
        List<Entity> entities = iCrudService.findAll();
        if (entities.size() == 0) {
            throw new EmoneyException("Sorry!! No Records Found");
        }
        return new ResponseEntity<>(new ResponseObj.ResponseObjBuilder().result(resBeanMapper.mapToDTO(entities)).message("Success").build(), HttpStatus.OK);
    }

    public ResponseEntity<ResponseObj> getAll(Integer currentPage, Integer pageSize) {
        return null;
    }


}
