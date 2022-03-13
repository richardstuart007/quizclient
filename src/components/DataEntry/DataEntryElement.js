//
//  Sub Components
//
import Textfield from '../controls/Textfield'
import { Grid } from '@material-ui/core'

//===================================================================================
const DataEntryElement = ({
  entry_type,
  entry_label,
  entry_name,
  entry_width
}) => {
  let multiline
  entry_type === 'textarea' ? (multiline = true) : (multiline = false)
  return (
    <Grid item xs={entry_width}>
      <Textfield
        name={entry_name}
        label={entry_label}
        multiline={multiline}
        minRows={2}
        maxRows={4}
      />
    </Grid>
  )
}

export default DataEntryElement
