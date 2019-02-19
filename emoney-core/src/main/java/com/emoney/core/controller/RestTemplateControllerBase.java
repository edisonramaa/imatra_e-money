package com.emoney.core.controller;

import com.emoney.core.constant.WebResourceConstant;
import com.emoney.core.model.ResponseObj;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
public abstract class RestTemplateControllerBase<Dto> {
    protected String serviceURI;
    private RestTemplate restTemplate;

    public RestTemplateControllerBase(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @PostMapping(WebResourceConstant.CREATE)
    public ResponseEntity<ResponseObj> create(@RequestBody @Valid Dto dto) {
//        return restTemplate.postForEntity(this.getServiceURI() +WebResourceConstant.CREATE, dto, ResponseObj.class);
        HttpEntity<Dto> requestHttpEntity = new HttpEntity<>(dto);
        ResponseEntity<ResponseObj> ekeaResponse = restTemplate.exchange(this.getServiceURI() + WebResourceConstant.CREATE, HttpMethod.POST, requestHttpEntity, ResponseObj.class);
        return ekeaResponse;
    }

    @PutMapping(WebResourceConstant.UPDATE)
    public ResponseEntity<ResponseObj> update(@RequestBody @Valid Dto dto) {
//       return restTemplate.postForEntity(this.getServiceURI()+WebResourceConstant.UPDATE,dto,ResponseObj.class);
        HttpEntity<Dto> requestHttpEntity = new HttpEntity<>(dto);
        ResponseEntity<ResponseObj> ekeaResponse = restTemplate.exchange(this.getServiceURI() + WebResourceConstant.UPDATE, HttpMethod.PUT, requestHttpEntity, ResponseObj.class);
        return ekeaResponse;
    }

    @DeleteMapping(WebResourceConstant.DELETE)
    public ResponseEntity<ResponseObj> delete(@PathVariable Long id) {
        Map<String, Long> pathVariableMap = new HashMap<>();
        pathVariableMap.put("id", id);
        ResponseEntity<ResponseObj> ekeaResponse = restTemplate.exchange(this.getServiceURI() + WebResourceConstant.DELETE, HttpMethod.DELETE, null, ResponseObj.class, pathVariableMap);
        return ekeaResponse;
    }

    @GetMapping(WebResourceConstant.GET)
    public ResponseEntity<ResponseObj> get(@PathVariable Long id) {
        ResponseObj ekeaResponse = restTemplate.getForObject(this.getServiceURI() + WebResourceConstant.GET, ResponseObj.class, id);
        return new ResponseEntity<>(ekeaResponse, HttpStatus.OK);
    }

    @GetMapping(WebResourceConstant.GET_ALL)
    public ResponseEntity<ResponseObj> getAll() {
        ResponseObj ekeaResponse = restTemplate.getForObject(this.getServiceURI() + WebResourceConstant.GET_ALL, ResponseObj.class);
        return new ResponseEntity<>(ekeaResponse, HttpStatus.OK);
    }

    protected abstract String getServiceURI();
}
