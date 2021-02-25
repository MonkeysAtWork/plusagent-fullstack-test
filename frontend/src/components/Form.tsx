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
  }
  if (!date) {
    errors.date = 'date should not be empty';
  }
  return errors;
}

function Form(props: any) {
  const { setTodos } = props;

  const formik = useFormik({
    initialValues: { description: '', date: format(new Date(), 'yyyy-MM-dd'), form: '' },
    onSubmit: async (values, { setErrors, resetForm }) => {
      const errors = validate(values);

      if (errors.date || errors.description) {
        setErrors(errors);
        return;
      }
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
  });

  return (
    <form className='Form' onSubmit={formik.handleSubmit}>
      <div className={cn({ 'is-invalid': formik.errors.form })}>
        <div className='mb-3 w-100'>
          <label htmlFor='textInput' className='form-label'>todo</label>
          <input
            name='description'
            type='text'
            id='textInput'
            className={cn('form-control', { 'is-invalid': formik.errors.description })}
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          <div className="invalid-feedback">
            {formik.errors.description}
          </div>
        </div>
        <div className='d-flex justify-content-between w-100'>
          <div>
            <label className='form-label'>date</label>
            <input
              name='date'
              type='date'
              className={cn('form-control', { 'is-invalid': formik.errors.date })}
              onChange={formik.handleChange}
              value={formik.values.date}
            />
            <div className="invalid-feedback">
              {formik.errors.date}
            </div>
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
      <div className="invalid-feedback">
        {formik.errors.form}
      </div>
    </form>
  )
}

export default Form