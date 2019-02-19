package com.emoney.core.model;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@Getter
@Setter
public class PageModel extends ModelBase {

    private Integer currentPage;
    private Long totalRecords;
    private Integer maxPages;

    public PageModel() {
    }

    public PageModel(Integer currentPage, Long totalRecords, Integer maxPages) {
        this.currentPage = currentPage;
        this.totalRecords = totalRecords;
        this.maxPages = maxPages;
    }


}
