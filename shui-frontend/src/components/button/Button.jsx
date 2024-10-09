import "./Button.css";

const Button = ({ onClick }) => (
  <button className="button" onClick={onClick} aria-label="Write a new post">
    <span className="button__icon">✏️</span>
  </button>
);

export default Button;
