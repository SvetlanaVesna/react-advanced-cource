import React from 'react'
import { useForm } from 'react-hook-form'

import './style.css'

// Messages
const required = 'This field is required'
const maxLength = 'Your input exceed maximum length'

// Error Component
const errorMessage = (error: any) => {
  return <div className="invalid-feedback">{error}</div>
}

const ReactHooksForm = () => {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data: any) => console.log(data)

  return (
    <div className="container">
      <div className="col-sm-12">
        <h3>Client Profile</h3>
      </div>
      <div className="col-sm-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              name="Username"
              ref={register({ required: true, maxLength: 20 })}
            />
            {errors.Username &&
              errors.Username.type === 'required' &&
              errorMessage(required)}
            {errors.Username &&
              errors.Username.type === 'maxLength' &&
              errorMessage(maxLength)}
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="Name"
              ref={register({ required: true, maxLength: 50 })}
            />
            {errors.Name && errors.Name.type === 'required' && errorMessage(required)}
            {errors.Name && errors.Name.type === 'maxLength' && errorMessage(maxLength)}
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="tel"
              placeholder="Mobile number"
              name="MobileNumber"
              ref={register({ maxLength: 12 })}
            />
            {errors.MobileNumber &&
              errors.MobileNumber.type === 'maxLength' &&
              errorMessage(maxLength)}
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              name="Email"
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.Email && errors.Email.type === 'required' && errorMessage(required)}
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="url"
              placeholder="Website"
              name="Website"
              ref={register}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Password"
              name="Password"
              ref={register({ required: true })}
            />
            {errors.Password &&
              errors.Password.type === 'required' &&
              errorMessage(required)}
          </div>
          <div className="form-group">
            <label>Gender</label>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genderOptions"
                value="Male"
                id="inlineRadio1"
                ref={register}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genderOptions"
                value="Female"
                id="inlineRadio2"
                ref={register}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Female
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genderOptions"
                value=" Non-binary"
                id="inlineRadio3"
                ref={register}
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                Non-binary
              </label>
            </div>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="datetime"
              placeholder="Date of Birth"
              name="DateofBirth"
              ref={register({
                pattern: /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/i,
              })}
            />
            {errors.DateofBirth &&
              errorMessage('Please use the following format MM/DD/YYYY')}
          </div>
          <div className="form-group">
            <textarea className="form-control" name="About" ref={register} />
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              placeholder="Subscribe to Newsletter"
              name="Subscribe to Newsletter"
              id="customCheck1"
              ref={register}
            />
            <label htmlFor="customCheck1"> Subscribe to Newsletter</label>
          </div>
          <div className="form-group">
            <input className="btn btn-primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
export default ReactHooksForm
