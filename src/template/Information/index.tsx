import { Grid } from "@mui/material";
import CoreInput from "../../components/atoms/CoreInput";
interface Props {
  control: any;
}

export const Information = (props: Props) => {
  const { control } = props;
  return (
    <>
      <Grid item xs={12}>
        <CoreInput
          control={control}
          name="information.name"
          label="Tên chiến dịch"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <CoreInput control={control} name="information.describe" label="Mô tả" />
      </Grid>
    </>
  );
};
