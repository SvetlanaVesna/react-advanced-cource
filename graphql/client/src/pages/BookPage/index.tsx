import React from 'react'
import { AppContainer, BookContainer } from '../../containers'

const BookPage = ({ bookId }) => (
  <AppContainer>
    <BookContainer bookId={bookId} />
  </AppContainer>
)

export default BookPage
