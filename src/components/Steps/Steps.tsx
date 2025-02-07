import React from 'react';
import './index.css';
const Steps = () => {
  return (
    <section className="steps steps-area">
      <div className="container">
        <ul className="timeline">
          <li className="timeline-box wow fadeInLeft">
            <p className="timeline-title">Выбрать понравившийся сбор и принять в нём участие.</p>

            <span>1</span>
          </li>
          <li className="timeline-box wow fadeInRight">
            <p className="timeline-title">Указать сумму, которую хотите пожертвовать.</p>

            <span>2</span>
          </li>
          <li className="timeline-box  wow fadeInLeft">
            <p className="timeline-title">Выбрать вид платежа: разовый или постоянный.</p>

            <span>3</span>
          </li>
          <li className="timeline-box wow fadeInRight">
            <p className="timeline-title">
              Указать данные платёжной карты, с которой будет списана указанная сумма.
            </p>

            <span>4</span>
          </li>
          <li className="timeline-box wow fadeInRight">
            <p className="timeline-title">
              Через некоторое время ознакомиться с документами, представленными на сайте фонда, в
              которых указано, когда, как и на что именно были потрачены Ваши средства.
            </p>

            <span>5</span>
          </li>
          <li className="timeline-box wow fadeInRight">
            <p className="timeline-title">
              Ждать Победы нашей страны, которую мы вместе с Вами ежедневно приближаем.
            </p>

            <span>6</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Steps;
