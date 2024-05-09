import { FormControlLabel, FormControlLabelProps } from '@mui/material'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import { forwardRef } from 'react'

type Props = {
  formProps: Omit<FormControlLabelProps, 'control'>
  checkboxProps: CheckboxProps
}

export const CoreCheckBox = forwardRef<HTMLButtonElement, Props>(
  function CoreCheckBoxBase({ formProps, checkboxProps }, ref) {
    return (
      <FormControlLabel
        ref={ref}
        control={<Checkbox color='primary' {...checkboxProps} />}
        {...formProps}
      />
    )
  }
)
