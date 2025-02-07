import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import cls from './PaymentForm.module.css';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Имя слишком короткое!')
    .max(50, 'Имя слишком длинное!')
    .required('Это поле не должно быть пустым!'),
  amount: Yup.number().required('Это поле не должно быть пустым!'),
  email: Yup.string().email('Введите корректный email').required('Это поле не должно быть пустым!'),
});

interface PaymentFormValues {
  name: string;
  email: string;
  amount: number;
}

type PaymentFormProps = {
  title?: string;
};

const PaymentForm = (props: PaymentFormProps) => {
  const { title = 'Помочь за 1 минуту' } = props;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const paymentTypes = [
    { id: 0, type: 'Разово' },
    { id: 1, type: 'Ежемесячно' },
  ];
  const [activeAmount, setActiveAmount] = React.useState();
  const paymentAmount = [100, 200, 500, 1000];

  const onPaymentTypeSelect = (index) => {
    setActiveIndex(index);
  };

  const onActiveAmountSelect = (amount) => {
    setActiveAmount(amount);
  };

  return (
    <>
      {/* <script src="https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js"></script> */}
      <section className={cls.section} id="donate">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-lg-8">
              <div className={cls.formDescription}>
                <h2>{title}</h2>
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <div className={cls.formWrapper}>
                <Formik
                  initialValues={{
                    name: '',
                    amount: '',
                    email: '',
                  }}
                  onSubmit={async (values: PaymentFormValues) => {
                    try {
                      pay(this);
                      return false;
                    } catch (e) {
                      console.log(e);
                    } finally {
                      (values.name = ''), (values.amount = 0), (values.email = '');
                    }
                  }}>
                  {({ errors, touched, isSubmitting }) => (
                    <Form id="payform-tinkoff" className={cls['payform-tinkoff']}>
                      <div className={cls.tabs}>
                        {paymentTypes.map(({ type, id }, i) => (
                          <li
                            onClick={() => onPaymentTypeSelect(i)}
                            key={id}
                            role="tab"
                            className={activeIndex === i ? cls.active : ''}>
                            {type}
                          </li>
                        ))}
                      </div>
                      <div className="amounts">
                        {paymentAmount.map((amount, i) => (
                          <li
                            onClick={() => onActiveAmountSelect(amount)}
                            key={amount}
                            role="tab"
                            className={activeAmount === amount ? cls.active : ''}>
                            {amount}
                          </li>
                        ))}
                      </div>
                      <div className={cls.log}>{activeAmount}</div>
                      <div className={cls.input_group}>
                        <Field className={cls['payform-tinkoff-row']} id="name" name="name" />
                        <label className={cls.label} htmlFor="name">
                          Имя
                        </label>
                        {errors.name && touched.name ? (
                          <div className={cls.error}>{errors.name}</div>
                        ) : null}
                      </div>

                      <div className={cls.input_group}>
                        <Field
                          className={cls['payform-tinkoff-row']}
                          id="email"
                          name="email"
                          type="email"
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
                          type="number"
                          className={cls['payform-tinkoff-row']}
                          id="amount"
                          name="amount"
                        />
                        <label className={cls.label} htmlFor="amount">
                          Сумма пожертвования
                        </label>
                        {errors.amount && touched.amount ? (
                          <div className={cls.error}>{errors.amount}</div>
                        ) : null}
                      </div>

                      <label className={cls.label_checkbox}>
                        <Field
                          type="checkbox"
                          name="jobType"
                          value="designer"
                          className={cls.checkbox}
                        />
                        Соглашаюсь с условиями<a href="/oferta"> оферты</a>
                      </label>

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
    </>
  );
};
export default PaymentForm;
