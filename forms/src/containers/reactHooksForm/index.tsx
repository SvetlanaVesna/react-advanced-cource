import React from 'react'
import { useForm } from 'react-hook-form'

// Messages
const required = 'This field is required'
const maxLength = 'Your input exceed maximum length'

// Error Component
const errorMessage = (error: any) => {
  return <div>{error}</div>
}

const ReactHooksForm = () => {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data: any) => console.log(data)

  return (
    <div>
      <div>
        <h3>Client Profile</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
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
          <div>
            <input
              type="text"
              placeholder="Name"
              name="Name"
              ref={register({ required: true, maxLength: 50 })}
            />
            {errors.Name && errors.Name.type === 'required' && errorMessage(required)}
            {errors.Name && errors.Name.type === 'maxLength' && errorMessage(maxLength)}
          </div>
          <div>
            <input
              type="tel"
              placeholder="Mobile number"
              name="MobileNumber"
              ref={register({ maxLength: 12 })}
            />
            {errors.MobileNumber &&
              errors.MobileNumber.type === 'maxLength' &&
              errorMessage(maxLength)}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="Email"
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.Email && errors.Email.type === 'required' && errorMessage(required)}
          </div>
          <div>
            <input type="url" placeholder="Website" name="Website" ref={register} />
          </div>
          <div>
            <input
              type="text"
              placeholder="Password"
              name="Password"
              ref={register({ required: true })}
            />
            {errors.Password &&
              errors.Password.type === 'required' &&
              errorMessage(required)}
          </div>
          <div>
            <label>Gender</label>
            <br />
            <div>
              <input
                type="radio"
                name="genderOptions"
                value="Male"
                id="genderOptions"
                ref={register}
              />
              <label htmlFor="inlineRadio1">Male</label>
            </div>
            <div>
              <input
                type="radio"
                name="genderOptions"
                value="Female"
                id="genderOptions2"
                ref={register}
              />
              <label htmlFor="genderOptions2">Female</label>
            </div>
            <div>
              <input
                type="radio"
                name="genderOptions"
                value="Non-binary"
                id="genderOptions3"
                ref={register}
              />
              <label htmlFor="genderOptions3">Non-binary</label>
            </div>
          </div>
          <div>
            <input
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
          <div>
            <textarea name="About" ref={register} />
          </div>
          <div>
            <input
              type="checkbox"
              placeholder="Subscribe to Newsletter"
              name="Subscribe to Newsletter"
              id="subscribeToNewsLetter"
              ref={register}
            />
            <label htmlFor="subscribeToNewsLetter"> Subscribe to Newsletter</label>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
export default ReactHooksForm
