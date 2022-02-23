import React from 'react'

import { Card, CardContent, Typography } from '@material-ui/core'

export default function QuizCard({ answer, handleSelect }) {
  return (
    <div>
      <Card elevation={1}>
        <CardContent onClick={() => handleSelect(answer.id)}>
          <Typography variant='body2' color='textSecondary'>
            {answer.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
