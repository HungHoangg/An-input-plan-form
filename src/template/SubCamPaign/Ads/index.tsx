import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { CoreCheckBox } from "../../../components/atoms/CoreCheckBox";
import CoreInput from "../../../components/atoms/CoreInput";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import _ from "lodash";
import {
  ColumnProps,
  TableContainerCommon,
  TableHeadCommon,
} from "../../../components/atoms/TableCustom";
import { ListOfAds } from "./ListofAds";

interface Props {
  control: any;
  register: any;
  watch: any;
  setValue: any;
  index: number;
  name: string;
}
export const Ads = (props: Props) => {
  const { control, index, register, watch, setValue, name } = props;
  const { fields, remove, append } = useFieldArray({
    name: name,
    control,
    keyName: "id",
  });

  const [arrayIndexRemove, setArrayIndexRemove] = useState<Array<number>>([]);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);

  const totalValue = watch(name);

  const columns = useMemo(
    () =>
      [
        {
          header: (
            <Checkbox
              disabled={totalValue.length === 0}
              checked={
                !!arrayIndexRemove &&
                arrayIndexRemove.length === totalValue.length &&
                checkedAll
              }
              onChange={(e, checked) => {
                setCheckedAll(checked);
                if (checked) {
                  setArrayIndexRemove(
                    totalValue.map((item: any, index: number) => index)
                  );
                } else setArrayIndexRemove([]);
              }}
              checkedIcon={<IndeterminateCheckBoxIcon color="disabled" />}
            />
          ),
          fieldName: "checkBox",
          styleCell: { style: { width: 30 } },
        },
        {
          header: !checkedAll ? (
            "Tên quảng cáo*"
          ) : (
            <IconButton
              onClick={() => {
                if (checkedAll && arrayIndexRemove.length === 0) {
                  const indexes: any[] = [];
                  fields.forEach((element, index) => {
                    indexes.push(index);
                  });
                  remove(indexes);
                  setCheckedAll(false);
                } else {
                  remove(arrayIndexRemove);
                  setArrayIndexRemove([]);
                  setCheckedAll(false);
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
          styleCell: { style: { textAlign: "right", width: 60 } },
        },
      ] as ColumnProps[],
    [
      checkedAll,
      arrayIndexRemove,
      setArrayIndexRemove,
      arrayIndexRemove.length,
      totalValue,
    ]
  );

  return (
    <>
      <Grid item xs={7}>
        <CoreInput
          control={control}
          name={`subCampaigns.${index}.name`}
          label="Tên chiến dịch con"
          required
        />
      </Grid>
      <Grid item xs={5}>
        <CoreCheckBox
          formProps={{
            label: "Đang hoạt động",
            name: `subCampaigns.${index}.status`,
          }}
          checkboxProps={{
            ...register(`subCampaigns.${index}.status`),
            checked: watch(`subCampaigns.${index}.status`),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          padding={"16px"}
          textAlign={"left"}
          marginTop={"16px"}
          paddingLeft={0}
        >
          DANH SÁCH QUẢNG CÁO
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <TableContainerCommon>
            <Table sx={{ minWidth: 650 }}>
              <TableHeadCommon>
                <TableRow>
                  {_.map(columns, (column, index) => (
                    <TableCell
                      variant="head"
                      key={index}
                      {...(column?.styleCell ?? {})}
                      className=" first-letter:uppercase"
                    >
                      <Typography variant="body1" fontWeight={400}>
                        {" "}
                        {column?.header}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeadCommon>
              <>
                <ListOfAds
                  append={append}
                  control={control}
                  fields={fields}
                  name={name}
                  remove={remove}
                  index={watch(`${name}`)?.length}
                  setArrayIndexRemove={setArrayIndexRemove}
                  arrayIndexRemove={arrayIndexRemove}
                  checkedAll={checkedAll}
                  setCheckedAll={setCheckedAll}
                  watch={watch}
                />
              </>
            </Table>
          </TableContainerCommon>
        </Box>
      </Grid>
    </>
  );
};
