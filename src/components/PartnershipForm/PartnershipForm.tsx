import { render } from '@react-email/render';
import Email from '../../emails/Email';
import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import cls from './HelpForm.module.css';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Имя слишком короткое!')
    .max(50, 'Имя слишком длинное!')
    .required('Это поле не должно быть пустым!'),
  lastName: Yup.string()
    .min(2, 'Фамилия слишком короткая!')
    .max(50, 'Фамилия слишком длинная!')
    .required('Это поле не должно быть пустым!'),
  email: Yup.string().email('Invalid email').required('Это поле не должно быть пустым!'),
});

interface PartnershipFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

const PartnershipForm = () => {
  return (
    <section className={cls.section}>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-lg-8">
            <div className={cls.formDescription}>
              <h2>Хотите стать партнером?</h2>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <div className={cls.formWrapper}>
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  phoneNumber: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values: PartnershipFormValues) => {
                  const finalHtml = render(
                    <Email
                      partnership
                      firstName={values.firstName}
                      secondName={values.lastName}
                      email={values.email}
                      phone={values.phoneNumber}
                    />,
                    {
                      pretty: true,
                    },
                  );
                  const finalText = render(
                    <Email
                      partnership
                      firstName={values.firstName}
                      secondName={values.lastName}
                      email={values.email}
                      phone={values.phoneNumber}
                    />,
                    {
                      plainText: true,
                    },
                  );
                  try {
                    const res = await fetch('/api/email/sendEmail.json', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        from: 'send@dchesti.site',
                        to: values.email,
                        subject: 'Привет СестрЭ',
                        html: finalHtml,
                      }),
                    });
                    const data = await res.json();
                    console.log(data);
                  } catch (e) {
                    console.error(e);
                  } finally {
                    (values.firstName = ''),
                      (values.lastName = ''),
                      (values.email = ''),
                      (values.phoneNumber = '');
                  }
                }}>
                {({ errors, touched, isSubmitting }) => (
                  <Form className={cls.form}>
                    <label htmlFor="firstName">Имя</label>
                    <Field
                      className={cls.input}
                      id="firstName"
                      name="firstName"
                      placeholder="Имя"
                    />
                    <span className={cls.placeholder}>E-mail</span>

                    {errors.firstName && touched.firstName ? (
                      <div className={cls.error}>{errors.firstName}</div>
                    ) : null}
                    <label htmlFor="lastName">Фамилия</label>
                    <Field
                      className={cls.input}
                      id="lastName"
                      name="lastName"
                      placeholder="Фамилия"
                    />
                    {errors.lastName && touched.lastName ? (
                      <div className={cls.error}>{errors.lastName}</div>
                    ) : null}
                    <label htmlFor="email">Email</label>
                    <Field
                      className={cls.input}
                      id="email"
                      name="email"
                      placeholder="Email"
                      type="email"
                    />
                    {errors.email && touched.email ? (
                      <div className={cls.error}>{errors.email}</div>
                    ) : null}
                    <button disabled={isSubmitting} className={cls.btn} type="submit">
                      {isSubmitting ? 'Отправка' : 'Отправить'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PartnershipForm;
