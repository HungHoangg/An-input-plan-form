import DeleteIcon from "@mui/icons-material/Delete";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import {
  Button,
  Checkbox,
  IconButton,
  TableBody,
  TableRow,
} from "@mui/material";
import _ from "lodash";
import { useMemo } from "react";
import CoreInput from "../../../components/atoms/CoreInput";
import {
  ColumnProps,
  TableCellCommon,
} from "../../../components/atoms/TableCustom";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  fields: Array<any>;
  control: any;
  name: string;
  remove: any;
  append: any;
  index: number;
  setArrayIndexRemove: any;
  arrayIndexRemove: Array<number>;
  setCheckedAll: any;
  checkedAll: boolean;
  watch: any;
}

export const ListOfAds = (props: Props) => {
  const {
    append,
    control,
    fields,
    name,
    remove,
    index,
    setArrayIndexRemove,
    arrayIndexRemove,
    checkedAll,
    setCheckedAll,
    watch,
  } = props;
  const columns = useMemo(
    () =>
      [
        {
          header: (
            <Checkbox
              onChange={(e, checked) => {
                setCheckedAll(checked);
              }}
              checkedIcon={<IndeterminateCheckBoxIcon color="disabled" />}
            />
          ),
          fieldName: "checkBox",
        },
        {
          header: !checkedAll ? (
            "Tên quảng cáo*"
          ) : (
            <IconButton
              onClick={() => {
                if (checkedAll) {
                  // remove(fields);
                } else {
                  remove(arrayIndexRemove);
                }
              }}
            >
              <DeleteIcon color="action" />
            </IconButton>
          ),
          fieldName: "name",
        },
        {
          header: !checkedAll ? "Số lượng*" : "",
          fieldName: "quantity",
        },
        {
          header: (
            <Button
              variant="outlined"
              onClick={() =>
                append({
                  name: `Quảng cáo ${watch(`${name}`).length + 1}`,
                  quantity: 0,
                })
              }
              startIcon={<AddIcon fontSize="small" color="primary" />}
            >
              Thêm
            </Button>
          ),
          fieldName: "action",
          styleCell: { style: { textAlign: "right" } },
        },
      ] as ColumnProps[],
    [checkedAll, arrayIndexRemove, setArrayIndexRemove]
  );

  const rows = fields.map((item, index) => {
    return {
      name: (
        <CoreInput
          key={item?.key}
          name={`${name}.${index}.name`}
          control={control}
          required
          placeholder="Tên quảng cáo"
        />
      ),
      quantity: (
        <CoreInput
          key={item?.key}
          type="number"
          name={`${name}.${index}.quantity`}
          control={control}
          required
          placeholder="Số lượng"
        />
      ),
      action: (
        <div style={{ textAlign: "right" }}>
          <IconButton
            disabled={arrayIndexRemove.length !== 0}
            title="Xoá"
            size="small"
            type="button"
            onClick={() => remove(index)}
          >
            <DeleteIcon fontSize="small" color="action" />
          </IconButton>
        </div>
      ),
      checkBox: (
        <Checkbox
          key={item?.key}
          checked={arrayIndexRemove.includes(index)}
          onChange={(e, checked) => {
            if (checked) {
              setArrayIndexRemove([...arrayIndexRemove, index]);
              setCheckedAll(true);
            } else {
              setArrayIndexRemove(
                arrayIndexRemove.filter((item, idx) => idx !== index)
              );
              setCheckedAll(false);
            }
          }}
        />
      ),
    };
  });

  return (
    <TableBody>
      {_.map(rows, (row: any, index) => (
        <TableRow
          key={row?.key || row?.id || index}
          sx={{
            ":hover": {
              backgroundColor: "#FFFFFF",
              paddingLeft: 0,
            },
          }}
        >
          {_.map(columns, (column, indexColumn) => {
            return (
              <TableCellCommon
                key={indexColumn}
                {...column.styleCell}
                style={{
                  borderBottom:
                    index !== rows.length - 1
                      ? "1px solid rgba(224, 224, 224, 1)"
                      : "",
                  lineHeight: "120%",
                }}
              >
                {column?.fieldName && !column?.render && (
                  <>{_.get(row, column.fieldName)}</>
                )}
                {column?.render && column.render(row, index)}
              </TableCellCommon>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
};
