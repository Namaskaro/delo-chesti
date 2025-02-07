import React from 'react';
import DonationScale from '../DonationScale/DonationScale';
import './index.css';

type DonationSlideProps = {
  name?: string;
  age?: number;
  location?: string;
  title?: string;
  imgSrc?: string;
  shortDesc?: string;
  description?: string;
  collectedSum?: number | undefined;
  needToCollect?: number;
  slug?: string;
  formType?: string;
};
const Slide = (props: DonationSlideProps) => {
  const {
    age,
    location,
    title,
    shortDesc,
    imgSrc,
    description,
    slug,
    collectedSum,
    needToCollect,
    formType = 'charity',
  } = props;

  return (
    <div className="slide">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="story_banner--description">
              {/* <span>
                {age} лет, {location}
              </span> */}
              <h3>{title}</h3>
              <div className="diagnosis">
                {/* <strong>Диагноз:</strong>
                <br /> */}
                {/* {shortDesc} */}
              </div>
              <div className="description">{description}</div>
              <div className="action">
                <button className="btn_charity">
                  {formType === 'charity' && 'Пожертвовать'}
                  {formType === 'help' && <a href="/poluchit-pomosch"> Оставить заявку</a>}
                </button>
                <button className="btn_detail">
                  <a href={`/istorii/${slug}`}>Подробнее</a>
                </button>
              </div>
            </div>
          </div>
          <div className="col-6 d-none d-lg-block">
            <DonationScale imgSrc={imgSrc} collected={collectedSum} need={needToCollect} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
