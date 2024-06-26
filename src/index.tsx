import { Box, Button, Container, Stack } from '@mui/material'
import RhfTextarea from './RhfTextarea'
import RhfSelect from './RhfSelect'
import RhfMultiCheckbox from './RhfMultiCheckbox'
import RhfOneCheckbox from './RhfOneCheckbox'
import RhfTextField from './RhfTextField'
import RhfRadio from './RhfRadio'
import RhfDatePicker from './RhfDatePicker'
import { useSampleForm } from './useSampleForm'
import { useAtom } from 'jotai'
import { getSubmitDataAtom} from './store/submitData'

const FormData = () => {
  const [data] = useAtom(getSubmitDataAtom);

  if (data && data.length < 1) return undefined;

  return (
    <Box>
      {data?.map(el => (
        <Box>
          <Box>text:{el.text}</Box>
          <Box>number:{el.number}</Box>
          <Box>select:{el.select}</Box>
          <Box>checkbox:{el.checkbox}</Box>
          <Box>checkboxes:{el.checkboxes}</Box>
          <Box>radio:{el.radio}</Box>
          <Box>date:{el.date}</Box>
          <Box>textarea:{el.textarea}</Box>
        </Box>
      ))}
    </Box>
  )
}

function MuiRhfWithControllerAndZod() {
  const {
    form: { control, isSubmitting, isValid, handleSubmit, onSubmit, trigger },
    options: { checkboxesOptions, radioOptions, selectOptions },
  } = useSampleForm()

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <Stack spacing={3}>
          {/* テキスト */}
          <RhfTextField
            type="text"
            name="nullAbleText"
            label="テキスト"
            control={control}
          />
          <RhfTextField
            type="text"
            name="text"
            label="テキスト（必須）"
            control={control}
          />

          {/* 数値 */}
          <RhfTextField
            name="nullAbleNumber"
            type="number"
            label="数値"
            control={control}
          />
          <RhfTextField
            name="number"
            type="number"
            label="数値（必須）"
            control={control}
          />

          {/* セレクトボックス */}
          <RhfSelect
            name="nullAbleSelect"
            control={control}
            label="セレクトボックス"
            options={selectOptions}
          />
          <RhfSelect
            name="select"
            control={control}
            label="セレクトボックス（必須）"
            options={selectOptions}
          />

          {/* 単体チェックボックス */}
          <RhfOneCheckbox
            label="チェックボックス"
            name="nullAbleCheckbox"
            control={control}
          />
          <RhfOneCheckbox
            label="チェックボックス（必須）"
            name="checkbox"
            control={control}
          />

          {/* 複数チェックボックス */}
          <RhfMultiCheckbox
            label="複数チェックボックス"
            name="nullAbleCheckboxes"
            control={control}
            options={checkboxesOptions}
          />
          <RhfMultiCheckbox
            label="複数チェックボックス（必須）"
            name="checkboxes"
            control={control}
            options={checkboxesOptions}
          />

          {/* ラジオボタン */}
          <RhfRadio
            label="ラジオボタン"
            name="nullAbleRadio"
            control={control}
            options={radioOptions}
          />
          <RhfRadio
            label="ラジオボタン（必須）"
            name="radio"
            control={control}
            options={radioOptions}
          />

          {/* 日程 */}
          <RhfDatePicker
            name="nullAbleDate"
            label="日程"
            trigger={trigger}
            control={control}
          />
          <RhfDatePicker
            name="date"
            label="日程（必須）"
            trigger={trigger}
            control={control}
          />

          {/* テキストエリア */}
          <RhfTextarea
            name="nullAbleTextarea"
            label="テキストエリア"
            control={control}
            rows={5}
          />
          <RhfTextarea
            name="textarea"
            label="テキストエリア（必須）"
            control={control}
            rows={5}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            disabled={isSubmitting || !isValid}
            data-testid="formButton"
          >
            ボタン
          </Button>
        </Stack>
      </Box>
      <FormData />
    </Container>
  )
}

export default MuiRhfWithControllerAndZod
