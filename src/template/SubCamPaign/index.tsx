import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Fab,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useFieldArray } from "react-hook-form";
import CoreInput from "../../components/atoms/CoreInput";
import { CoreCheckBox } from "../../components/atoms/CoreCheckBox";
import { useState } from "react";
import { Ads } from "./Ads";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Props {
  control: any;
  register: any;
  watch: any;
  setValue: any;
  formState: any;
}

export const SubCamPaign = (props: Props) => {
  const { control, register, watch, setValue, formState } = props;
  const [indexCard, setIndexCard] = useState<number>(0);
  const { fields, append } = useFieldArray({
    control,
    name: "subCampaigns",
    keyName: "key",
  });

  return (
    <>
      <>
        <Grid container>
          <Grid item xs={12} style={{ marginBottom: 20, overflow: "auto" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Fab
                color="default"
                aria-label="add"
                size="medium"
                onClick={() => {
                  append({
                    name: `Chiến dịch con ${fields.length + 1}`,
                    status: true,
                    ads: [
                      {
                        name: "Quảng cáo 1",
                        quantity: 0,
                      },
                    ],
                  });
                }}
              >
                <AddIcon color="error" />
              </Fab>
              {fields.map((field, index) => {
                const isError = !!formState.errors.subCampaigns?.[index];
                let totalQuantity = 0;
                for (
                  let i = 0;
                  i < watch(`subCampaigns.${index}.ads`).length;
                  i++
                ) {
                  totalQuantity += watch(`subCampaigns.${index}.ads`)[i]
                    .quantity;
                }
                return (
                  <>
                    <div
                      onClick={(e) => {
                        setIndexCard(index);
                      }}
                    >
                      <Card
                        key={field.key}
                        style={{
                          width: 210,
                          height: 120,
                          marginLeft: 16,
                          cursor: "pointer",
                          border:
                            index === indexCard
                              ? "2px solid rgb(33, 150, 243)"
                              : "none",
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            color={isError ? "error" : "inherit"}
                            style={{
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            {watch(`subCampaigns.${index}.name`)}
                            <CheckCircleIcon
                              color={
                                watch(`subCampaigns.${index}.status`) === true
                                  ? "success"
                                  : "disabled"
                              }
                              fontSize="small"
                              style={{ paddingLeft: 6 }}
                            />
                          </Typography>
                          <Typography
                            variant="h6"
                            color="inherit"
                            style={{
                              whiteSpace: "normal",
                              wordBreak: "break-all",
                            }}
                          >
                            {totalQuantity}
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                );
              })}
            </div>
          </Grid>
          {fields.map((item, index) => {
            if (index === indexCard) {
              return (
                <Ads
                  control={control}
                  index={index}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  name={`subCampaigns.${index}.ads`}
                />
              );
            }
            return null;
          })}
        </Grid>
      </>
    </>
  );
};
