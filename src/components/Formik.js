import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik';
import * as Yup from 'yup';
import React, {useState} from 'react'
import TextError from './TextError';

const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: [
        '', ''
    ],
    phNumbers: ['']
}

const savedValues = {
    name: 'Krupa',
    email: 'krupa@gmail.com',
    channel: 'krupachannel',
    comments: 'Welcome to Formik',
    address: '3123 gujarat street',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
}

const onSubmit = (values, submitProps) => {
    submitProps.setSubmitting(false)
    submitProps.resetForm()
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string()
        .email("Invalid Email")
        .required("Required"),
    channel: Yup.string().required('Required'),
})

const validateComments = value => {
    let error
    if (!value) {
        error = 'Required'
    }
    return error
}


function Youtubeform() {
    const [formValues, setFormValues] = useState(null)
    return (
        <>
            <Formik
                initialValues={formValues || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize>
                {
                    formik => {
                        return (
                            <Form>
                                <div className='form-control'>
                                    <label htmlFor="name">Name:</label><br />
                                    <Field type="text" name='name' placeholder='Name' />
                                    <ErrorMessage name='name' component={TextError} />
                                </div>
                                <div className='form-control'>
                                    <label htmlFor="email">Email:</label><br />
                                    <Field type="email" name='email' placeholder='Email' />
                                    <ErrorMessage name='email' >
                                        {
                                            (errorMsg) =>
                                                <div className='error'>{errorMsg}</div>
                                        }
                                    </ErrorMessage>
                                </div>
                                <div className='form-control'>
                                    <label htmlFor="channel">Channel:</label><br />
                                    <Field type="text" name='channel' placeholder='Channel' />
                                    <ErrorMessage name='channel' />
                                </div>
                                <div className='form-control'>
                                    <label htmlFor="comments">Comments:</label><br />
                                    <Field as="textarea" name='comments' placeholder='Comments' validate={validateComments} />
                                    <ErrorMessage name='comments' component={TextError} />
                                </div>
                                <div className='form-control'>
                                    <label htmlFor="address">Address:</label><br />
                                    <FastField name='address' placeholder='Address' >
                                        {
                                            (props) => {
                                                const { field, form, meta } = props
                                                return (
                                                    <div>
                                                        <input type='text' id='address' {...field} />
                                                        {meta.touched && meta.error ? <div>{`${meta.error}`}</div> : null}
                                                    </div>
                                                )
                                            }
                                        }
                                    </FastField>
                                </div>
                                <div className='form-control'>
                                    <label htmlFor="facebook">Facebook profile:</label><br />
                                    <Field type="text" name='social.facebook' />
                                </div>
                                <div className='form-control'>
                                    <label htmlFor="twitter">Twitter profile:</label><br />
                                    <Field type="text" name='social.twitter' />
                                </div>
                                <div className='form-control'>
                                    <label htmlFor="primaryPh">Primary phone number:</label><br />
                                    <Field type="text" name='phoneNumbers[0]' />
                                </div>
                                <div className='form-control'>
                                    <label htmlFor="secondaryPh">Secondary phone number:</label><br />
                                    <Field type="text" name='phoneNumbers[1]' />
                                </div>
                                <div className='form-control'>
                                    <label htmlFor="listofphonenumbers">List of phone numbers:</label><br />
                                    <FieldArray name='phNumbers'>
                                        {fieldArrayProps => {
                                            const { push, remove, form } = fieldArrayProps;
                                            const { values } = form;
                                            const { phNumbers } = values;
                                            return <div>
                                                {
                                                    phNumbers.map((phNumber, index) => (
                                                        <div key={index}>
                                                            <Field type="text" name={`phNumbers[${index}]`} />
                                                            {index > 0 && (
                                                                <button type='button' onClick={() => remove(index)}>
                                                                    -
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))
                                                }
                                                <button type='button' onClick={() => push('')}>
                                                    +
                                                </button>
                                            </div>
                                        }}
                                    </FieldArray>
                                </div>
                                <button type='button' onClick={() => setFormValues(savedValues)}>
                                    Load saved data
                                </button>
                                <button type='reset'>Reset</button>
                                <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
                            </Form>
                        )
                    }
                }
            </Formik>
        </>
    )
}

export default Youtubeform;