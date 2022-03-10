//
//  Libraries
//
import { Card, CardContent, Typography } from '@material-ui/core'

export default function QuizSummaryCard({ field, color }) {
  return (
    <div className='answer'>
      <Card elevation={1}>
        <CardContent>
          <Typography variant='body2' color={color}>
            {field}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
