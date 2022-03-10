//
//  Libraries
//
import { Card, CardContent, Typography } from '@material-ui/core'

export default function QuizSummaryCard({ field, backgroundColor }) {
  if (!field) return null
  return (
    <div className='answer'>
      <Card elevation={1} style={{ backgroundColor: backgroundColor }}>
        <CardContent>
          <Typography variant='body2'>{field}</Typography>
        </CardContent>
      </Card>
    </div>
  )
}
