//
//  Sub Components
//
import Textfield from '../controls/Textfield'
import { Grid } from '@material-ui/core'

//===================================================================================
const DataSelectElement = ({
  entry_type,
  entry_label,
  entry_name,
  entry_width
}) => {
  return (
    <Grid item xs={entry_width}>
      <Textfield name={entry_name} label={entry_label} />
    </Grid>
  )
}

export default DataSelectElement
