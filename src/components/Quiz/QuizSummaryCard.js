import React from 'react'

import {
  Card,
  CardContent,
  Typography,
  CardActionArea
} from '@material-ui/core'

export default function QuizSummaryCard({ field, color }) {
  return (
    <div className='answer'>
      <Card elevation={1}>
        <CardActionArea>
          <CardContent>
            <Typography variant='body2' color={color}>
              {field}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}
