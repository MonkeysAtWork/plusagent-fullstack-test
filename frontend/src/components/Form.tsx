import React from 'react'
import { useFormik } from 'formik';
import cn from 'classnames';
import axios from 'axios'
import { format } from 'date-fns'
import paths from '../paths'

const validate = ({ description, date }: any) => {
  const errors: any = {};
  if (!description) {
    errors.description = 'description should not be empty';
  } else if (description.trim() === '') {
    errors.description = 'description should not consit of spaces only';
  }
  if (!date) {
    errors.date = 'date should be correct';
  }
  return errors;
}

function Form(props: any) {
  const { setTodos } = props;

  const formik = useFormik({
    initialValues: { description: '', date: format(new Date(), 'yyyy-MM-dd'), form: '' },
    validate,
    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        const url = paths.todosPath()
        const resp = await axios.post(url, { data: values })
        setTodos((state: any) => (
          [resp.data.data]
            .concat(...state)
            .sort((a: any, b: any) => new Date(a.date) < new Date(b.date) ? -1 : 1)
        ))
        resetForm({ values: { description: '', date: values.date, form: '' } })
      } catch (err) {
        setErrors({ form: err.message });
      }
    },
  })

  return (
    <form className='Form' onSubmit={formik.handleSubmit}>
      <div className={cn({ 'is-invalid': formik.errors.form })}>
        <div className='mb-3 w-100'>
          <label className='form-label'>todo</label>
          <input
            type='text'
            className={cn('form-control', { 'is-invalid': formik.touched.description && formik.errors.description })}
            {...formik.getFieldProps('description')}
            />
          {formik.touched.description && formik.errors.description
            && <div className="invalid-feedback">{formik.errors.description}</div>}
        </div>
        <div className='d-flex justify-content-between w-100'>
          <div>
            <label className='form-label'>date</label>
            <input
              type='date'
              className={cn('form-control', { 'is-invalid': formik.touched.date && formik.errors.date })}
              {...formik.getFieldProps('date')}
            />
            {formik.touched.date && formik.errors.date
              && <div className="invalid-feedback">{formik.errors.date}</div>}
          </div>
          <div className='d-flex align-self-end'>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
            Add
          </button>
          </div>
        </div>
      </div>
      {formik.errors.form
        && <div className="invalid-feedback">{formik.errors.form}</div>}
    </form>
  )
}

export default Form