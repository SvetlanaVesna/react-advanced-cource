import React from 'react'
import { Formik, Form, Field } from 'formik'

// Messages
const required = 'This field is required'
const maxLength = 'Your input exceed maximum length'

// Error Component
const errorMessage = (error?: string) => {
  return <div>{error}</div>
}

const validateUserName = (value?: string) => {
  let error
  if (!value) {
    error = required
  } else if (value.length > 12) {
    error = maxLength
  }
  return error
}

const validateName = (value?: string) => {
  let error
  if (!value) {
    error = required
  } else if (value.length > 12) {
    error = maxLength
  }
  return error
}

const validateEmail = (value?: string) => {
  let error
  if (!value) {
    error = required
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address'
  }
  return error
}

const validateMobileNumber = (value?: string) => {
  let error
  if (!value) {
    error = required
  } else if (value?.length > 12) {
    error = maxLength
  }
  return error
}

const validatePassword = (value?: string) => {
  let error
  if (!value) {
    error = required
  }
  return error
}

const validateDateOfBirth = (value?: string) => {
  let error
  if (!value) {
    error = required
  } else if (
    !/(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/i.test(value)
  ) {
    error = 'Please use the following format MM/DD/YYYY'
  }
  return error
}

const FormikForm = () => {
  return (
    <Formik
      initialValues={{
        username: '',
        name: '',
        mobilenumber: '',
        email: '',
        password: '',
        url: '',
        genderOptions: '',
        dateOfBirth: '',
        SubscribetoNewsletter: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      {({ errors, touched }) => (
        <div>
          <div>
            <h3>Client Profile</h3>
          </div>
          <div>
            <Form>
              <div>
                <Field
                  type="text"
                  placeholder="Username"
                  name="username"
                  validate={validateUserName}
                />
                {errors.username && touched.username && errorMessage(errors.username)}
              </div>
              <div>
                <Field
                  type="text"
                  placeholder="Name"
                  name="name"
                  validate={validateName}
                />
                {errors.name && touched.name && errorMessage(errors.name)}
              </div>
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  validate={validateEmail}
                />
                {errors.email && touched.email && errorMessage(errors.email)}
              </div>
              <div>
                <Field
                  type="tel"
                  placeholder="Mobile number"
                  name="mobilenumber"
                  validate={validateMobileNumber}
                />
                {errors.mobilenumber &&
                  touched.mobilenumber &&
                  errorMessage(errors.mobilenumber)}
              </div>
              <div>
                <Field type="url" placeholder="Website" name="Website" />
              </div>
              <div>
                <Field
                  type="password"
                  placeholder="Password"
                  name="password"
                  validate={validatePassword}
                />
                {errors.password && touched.password && errorMessage(errors.password)}
              </div>
              <div>
                <label>Gender</label>
                <br />
                <div>
                  <Field
                    type="radio"
                    name="genderOptions"
                    value="Male"
                    id="inlineRadio1"
                  />
                  <label htmlFor="inlineRadio1">Male</label>
                </div>
                <div>
                  <Field
                    type="radio"
                    name="genderOptions"
                    value="Female"
                    id="inlineRadio2"
                  />
                  <label htmlFor="inlineRadio2">Female</label>
                </div>
                <div>
                  <Field
                    type="radio"
                    name="genderOptions"
                    value=" Non-binary"
                    id="inlineRadio3"
                  />
                  <label htmlFor="inlineRadio3">Non-binary</label>
                </div>
              </div>
              <div>
                <Field
                  type="datetime"
                  placeholder="Date of Birth"
                  name="dateOfBirth"
                  validate={validateDateOfBirth}
                />
                {errors.dateOfBirth &&
                  touched.dateOfBirth &&
                  errorMessage(errors.dateOfBirth)}
              </div>
              <div>
                <Field component="textarea" name="About" />
              </div>
              <div>
                <Field
                  type="checkbox"
                  placeholder="Subscribe to Newsletter"
                  name="SubscribetoNewsletter"
                  id="customCheck1"
                />
                <label htmlFor="customCheck1"> Subscribe to Newsletter</label>
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default FormikForm
