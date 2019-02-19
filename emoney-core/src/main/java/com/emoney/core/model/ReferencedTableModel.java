package com.emoney.core.model;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by Anil Kumal on 02/02/2019.
 */
@Getter
@Setter
public class ReferencedTableModel extends ModelBase {
    String tableName;
    String columnName;
}
