import { useFormCustom } from "../lib/form";
import { PostInput, PostInputSchema } from "../service/schema";
import { AWING_FORM } from "../service/type";
import { zodResolver } from '@hookform/resolvers/zod'

const defaultValues = {
  information: {
    name: "",
    describe: "",
  },
  subCampaigns: [
    {
      name: "Chiến dịch con 1",
      status: true,
      ads: [
        {
          name: "Quảng cáo 1",
          quantity: 0,
        },
      ],
    },
  ],
};

export const useForm = () => {
  const { control, formState, reset, watch, handleSubmit, register, setValue } =
    useFormCustom<PostInput>({
      mode: "onChange",
      defaultValues,
      resolver: zodResolver(PostInputSchema)
    });

  const onSubmit = handleSubmit(async (data) => {
    alert(`Thêm thành công chiến dịch`)
    console.log(data, "submit");
  });

  return [
    {
      register,
      control,
      handleSubmit,
      watch,
      formState,
      setValue,
    },
    { onSubmit},
  ] as const;
};
