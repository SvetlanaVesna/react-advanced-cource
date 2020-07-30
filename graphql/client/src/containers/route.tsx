import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { get } from 'js-cookie'

import { AuthPage, AuthorsPage, BooksPage, AuthorPage, BookPage } from '../pages'
import { RouteProps } from 'react-router'

function PrivateRoute({
  component: Component,
  ...rest
}: {
  component: React.JSXElementConstructor<any>
} & RouteProps) {
  return (
    <Route
      {...rest}
      render={props =>
        get('token') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default (
  <Switch>
    <Route exact path="/auth" component={AuthPage} />
    <PrivateRoute exact path="/" component={() => <AuthorsPage />} />
    <PrivateRoute
      exact
      path="/authors/:authorId"
      component={({
        match: {
          params: { authorId },
        },
      }: {
        match: { params: { authorId: number } }
      }) => <AuthorPage authorId={authorId} />}
    />
    <PrivateRoute exact path="/books" component={() => <BooksPage />} />
    <PrivateRoute
      exact
      path="/books/:bookId"
      component={({
        match: {
          params: { bookId },
        },
      }: {
        match: { params: { bookId: number } }
      }) => <BookPage bookId={bookId} />}
    />
  </Switch>
)
