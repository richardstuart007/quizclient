import React from 'react'

import {
  Card,
  CardContent,
  Typography,
  CardActionArea
} from '@material-ui/core'

export default function QuizCard({ answer, handleSelect }) {
  return (
    <div className='answer'>
      <Card elevation={1}>
        <CardActionArea>
          <CardContent onClick={() => handleSelect(answer.id)}>
            <Typography variant='body2' color='textSecondary'>
              {answer.details}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}
