import styled from "@emotion/styled";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ReactElement } from "react";
import _ from "lodash";

export interface ColumnProps {
  header: string | ReactElement;
  fieldName?: string;
  render?: (val: any, index: number) => ReactElement;
  styleCell?: TableCellProps;
}

type PaginationTableProps = {
  page?: number;
  size?: number;
};

type Props = {
  className?: string;
  data: Record<string, any>[];
  columns: ColumnProps[];
  isLoading?: boolean;
  maxHeight?: number;
  onRowClick?: (val: Record<string, any>) => void;
};

export const TableHeadCommon = styled(TableHead)(() => ({
  borderBottom: "1px solid #DFE0EB",
  paddingLeft: 0,
}));

export const TableCellCommon = styled(TableCell)(() => ({
  borderBottom: "1px solid #DFE0EB",
  "&:first-of-type": {
    // borderLeft: '1px solid #DFE0EB',
  },
  "&:last-of-type": {
    // borderRight: '1px solid #DFE0EB',
  },
}));

export const TableContainerCommon = styled(TableContainer)(() => ({
  border: "none",
}));

export const CustomTable = ({
  className,
  data,
  columns,
  isLoading,
  maxHeight,
  onRowClick,
}: Props) => {
  return (
    <Box className={className}>
      <TableContainerCommon
        style={{
          maxHeight: `${maxHeight}px`,
        }}
      >
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
          <TableBody>
            {_.map(data, (row: any, index) => (
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
                          index !== data.length - 1
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
        </Table>
      </TableContainerCommon>
    </Box>
  );
};
