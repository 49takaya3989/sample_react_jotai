import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
  FieldValues,
  UseControllerProps,
  UseFormTrigger,
  useController,
} from 'react-hook-form'
import { BaseFormProps } from './types'
import { FormItemWrapper } from './FormItemWrapper'
import { Schema } from './schema'

const FORMAT = 'YYYY/MM/DD'
const requiredName = 'date'

type Props<T extends FieldValues> = UseControllerProps<T> &
  BaseFormProps & {
    trigger: UseFormTrigger<Schema>
  }

function RhfDatePicker<T extends FieldValues>({
  control,
  disabled,
  label,
  name,
  trigger,
}: Props<T>) {
  const {
    field: { ref, onChange, ...rest },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({ name, control })

  // <DatePicker /> は onBlur がないので強制的にバリデーショントリガーを発火させる
  const onTriggerHandler = () => {
    if (name === requiredName) trigger(requiredName)
  }

  return (
    <FormItemWrapper label={label} error={error}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format={FORMAT}
          inputRef={ref}
          disabled={isSubmitting || disabled}
          slotProps={{
            textField: {
              error: !!error
            },
          }}
          {...rest}
          onChange={(newValue) => {
            onChange(newValue ? new Date(newValue).toISOString() : '')
            onTriggerHandler()
          }}
          onClose={onTriggerHandler}
        />
      </LocalizationProvider>
    </FormItemWrapper>
  )
}

export default RhfDatePicker
