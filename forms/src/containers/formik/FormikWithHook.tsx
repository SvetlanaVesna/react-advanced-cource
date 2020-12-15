import React from 'react'
import { useFormik } from 'formik'

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: values => {
      console.log('isSubmitting at submit start', formik.isSubmitting)
      console.log('submitCount at submit start', formik.submitCount)
      console.log('isValidating at submit start', formik.isValidating)

      return new Promise(resolve => {
        setTimeout(() => {
          console.log('isSubmitting in submit process', formik.isSubmitting)
          console.log('submitCount in submit process', formik.submitCount)
          console.log('isValidating in submit process', formik.isValidating)

          formik.setSubmitting(false)
          resolve(values)
        }, Math.random() * 1000)
      })
    },
  })

  console.log('isSubmitting', formik.isSubmitting)
  console.log('submitCount', formik.submitCount)
  console.log('isValidating', formik.isValidating)

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default SignupForm
