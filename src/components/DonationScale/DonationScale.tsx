import React, { CSSProperties, useMemo } from 'react';
//@ts-ignore
import cls from './DonationScale.module.css';
interface DonationScaleProps {
  collected?: number;
  need?: number;
  imgSrc?: string;
}

const DonationScale = (props: DonationScaleProps) => {
  const { collected, need, imgSrc } = props;
  const size = collected! / Number(need! / 100);
  // const size = Number(collected / percent);
  const styles = useMemo<CSSProperties>(
    () => ({
      width: `${size}%` || 100,
    }),
    [size],
  );
  const options1 = { style: 'currency', currency: 'RUB' };
  const numberFormat = new Intl.NumberFormat('ru-RU', options1);

  return (
    <div className={cls.story_banner_image}>
      <div className={cls.img}>
        <img src={imgSrc} alt="" />
      </div>
      {need! > 0 && (
        <>
          <div className={cls.donation}>
            <span>Собрано</span>
            <span>Необходимо</span>
          </div>
          <div className={cls.donation_outer}>
            <div style={styles} className={cls.donation_inner}></div>
          </div>
          <div className={cls.donation_numbers}>
            <span>{numberFormat.format(collected!)}</span>
            <span>{numberFormat.format(need!)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default DonationScale;
