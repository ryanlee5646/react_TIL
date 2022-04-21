import React from 'react';
import PropTypes from 'prop-types'; // prop-types 호출
import styles from './Button.module.css'; // CSS를 모듈화 할때 [파일명].module.css으로 호출

function Button({ text, onClick }) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {text}
    </button>
  ); // css에 선택자 .class => className, id => id
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
