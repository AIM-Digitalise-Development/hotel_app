import 'react';
import PropTypes from 'prop-types';

const PrimaryBtn = (props) => {
  const { children, onClick, ...rest } = props;

  return (
    <div {...rest}>
      <button
        onClick={onClick}
        className="bg-[#7cc6e0] p-2 text-white rounded-full w-28 shadow-[4px_4px_8px_0px_rgba(0,0,0,0.7)] text-sm"
      >
        {children}
      </button>
    </div>
  );
};

PrimaryBtn.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PrimaryBtn;
