import React, { useEffect, useRef } from 'react';
import { render } from '@react-email/render';
import Email from '../../emails/Email';
import { Formik, Field, Form, validateYupSchema } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import cls from './HelpForm.module.css';
import { Modal } from '../Modal/Modal';
import Success from '../Success/Success';
import { Resend } from 'resend';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Имя слишком короткое!')
    .max(50, 'Имя слишком длинное!')
    .required('Это поле не должно быть пустым!'),
  text: Yup.string()
    .min(2, 'Слишком короткое описание!')
    .max(500, 'Слишком длинное описание!')
    .required('Это поле не должно быть пустым!'),
  email: Yup.string().email('Invalid email').required('Это поле не должно быть пустым!'),
});

interface HelpFormValues {
  name: string;
  text: string;
  email: string;
  phone: string;
}
const code = 're_UBvHWf9H_9vqMjKGBnBK95We8pKcH4ws2';
const HelpForm = () => {
  const resend = new Resend(import.meta.env.PUBLIC_RESEND_API_KEY);
  const [isOpen, setIsOpen] = useState(false);
  const [activeAimType, setActiveAimType] = useState();
  const closeModal = () => {
    setIsOpen(false);
  };
  const onHelpAimTypeSelect = (type) => {
    setActiveAimType(type);
    console.log(activeAimType);
  };
  const requiredTextLength = 300;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const helpAimType = ['Частному лицу', 'Организации'];
  return (
    <section className={cls.section} id="help">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-lg-8">
            <div className={cls.formDescription}>
              <h2>Нужна помощь?</h2>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <div className={cls.formWrapper}>
              <Formik
                initialValues={{
                  name: '',
                  text: '',
                  email: '',
                  phone: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values: HelpFormValues) => {
                  const finalHtml = render(
                    <Email
                      firstName={values.name}
                      text={values.text}
                      email={values.email}
                      phone={values.phone}
                      aim={activeAimType}
                    />,
                    {
                      pretty: true,
                    },
                  );
                  const finalText = render(
                    <Email firstName={values.name} text={values.text} email={values.email} />,
                    {
                      plainText: true,
                    },
                  );
                  try {
                    const res = await fetch(
                      'https://sxmbiwdguszrcovkvfnb.supabase.co/functions/v1/resend',
                      {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                          'Access-Control-Allow-Origin': '*',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          from: 'send@dchesti.site',
                          to: import.meta.env.PUBLIC_TO_EMAIL,
                          subject: 'Помощь фонд',
                          html: finalHtml,
                        }),
                      },
                    );
                    setIsOpen(true);
                  } catch (e) {
                    console.error(e);
                  } finally {
                    (values.name = ''),
                      (values.text = ''),
                      (values.email = ''),
                      (values.phone = '');
                  }
                }}>
                {({ errors, touched, isSubmitting, isValid, values }) => (
                  <Form className={cls.form}>
                    <div className={cls.tabs}>
                      {helpAimType.map((type, i) => (
                        <li
                          onClick={() => onHelpAimTypeSelect(type)}
                          key={type}
                          role="tab"
                          className={activeAimType === type ? cls.active : ''}>
                          {type}
                        </li>
                      ))}
                    </div>
                    <div className={cls.input_group}>
                      <Field className={cls.input} id="name" name="name" placeholder="Имя" />
                      <label className={cls.label} htmlFor="name">
                        ФИО
                      </label>
                      {errors.name && touched.name ? (
                        <div className={cls.error}>{errors.name}</div>
                      ) : null}
                    </div>

                    <div className={cls.input_group}>
                      <Field
                        className={cls.input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                      />
                      <label className={cls.label} htmlFor="email">
                        Email
                      </label>
                      {errors.email && touched.email ? (
                        <div className={cls.error}>{errors.email}</div>
                      ) : null}
                    </div>
                    <div className={cls.input_group}>
                      <Field
                        className={cls.input}
                        id="phone"
                        name="phone"
                        placeholder="Телефон"
                        mask="+7 (999) 999-99-99"
                      />
                      <label className={cls.label} htmlFor="phone">
                        Телефон
                      </label>
                      {errors.email && touched.email ? (
                        <div className={cls.error}>{errors.email}</div>
                      ) : null}
                    </div>
                    <div className={cls.input_group}>
                      <Field
                        ref={textAreaRef}
                        maxLength="500"
                        className={cls.textarea}
                        as="textarea"
                        id="text"
                        name="text"
                        placeholder="Текст обращение"
                      />
                      <label className={cls.label} htmlFor="text">
                        Текст обращение
                      </label>
                      <p
                        className={
                          requiredTextLength - values.text.length <= 30 ? cls.red : cls.reqText
                        }>
                        {requiredTextLength - values.text.length}
                      </p>

                      {errors.text && touched.text ? (
                        <div className={cls.error}>{errors.text}</div>
                      ) : null}
                    </div>
                    <p className={cls.policy}>
                      При нажатии на кнопку "Отправить" вы соглашаетесь с условиями использования{' '}
                      <a className={cls.policy_link} href="/personalniye-dannie">
                        политики конфиденциальности
                      </a>
                      .
                    </p>
                    <button disabled={isSubmitting || !isValid} className={cls.btn} type="submit">
                      {isSubmitting ? 'Отправка' : 'Отправить'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Modal onClose={closeModal} isOpen={isOpen} width={600} height={340}>
        <Success />
        <span className={cls.success_text}>
          Ваша заявка успешно отправлена. Наш специалист свяжется с вами в ближайшее время!
        </span>
        <button onClick={() => closeModal()} className={cls.btn}>
          Ок
        </button>
      </Modal>
    </section>
  );
};
export default HelpForm;
