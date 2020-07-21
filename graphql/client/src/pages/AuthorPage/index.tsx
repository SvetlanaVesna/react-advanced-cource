import React, { FC } from 'react'
import { AppContainer, AuthorContainer } from '../../containers'

const AuthorsPage: FC<{ authorId: number }> = ({ authorId }) => (
  <AppContainer>
    <AuthorContainer authorId={authorId} />
  </AppContainer>
)

export default AuthorsPage
