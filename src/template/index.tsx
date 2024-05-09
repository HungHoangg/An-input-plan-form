import { Box, Button, Grid, Paper, Tab, Tabs } from "@mui/material";
import { useForm } from "./useForm";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { Information } from "./Information";
import { SubCamPaign } from "./SubCamPaign";

export const MainPage = () => {
  const [values, handles] = useForm();
  const { control, formState, handleSubmit, register, setValue, watch } =
    values;
  const { onSubmit } = handles;
  const [val, setVal] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setVal(newValue);
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        <Grid container style={{ marginTop: 20 }}>
          <Grid
            item
            xs={12}
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 20,
              paddingRight: 20,
              display: "flex",
              justifyContent: "flex-end",
              borderBottom: "1px solid gray",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              type="submit"
              onClick={() => {
                if (
                  Object.keys(formState.errors).length === 0 &&
                  !formState.errors
                ) {
                  alert("Vui lòng điền đúng và đầy đủ thông tin");
                }
              }}
            >
              SUBMIT
            </Button>
          </Grid>
          <Grid item xs={12} style={{ padding: 24 }}>
            <Paper>
              <TabContext value={val}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange}>
                    <Tab label="THÔNG TIN" value="1" />
                    <Tab label="CHIẾN DỊCH CON" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Information control={control} />
                </TabPanel>
                <TabPanel value="2">
                  <SubCamPaign
                    control={control}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    formState={formState}
                  />
                </TabPanel>
              </TabContext>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </form>
  );
};
