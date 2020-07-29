import React, { FC } from 'react'
import { AppContainer, BookContainer } from 'containers'

const BookPage: FC<{ bookId: number }> = ({ bookId }) => (
  <AppContainer>
    <BookContainer bookId={bookId} />
  </AppContainer>
)

export default BookPage
