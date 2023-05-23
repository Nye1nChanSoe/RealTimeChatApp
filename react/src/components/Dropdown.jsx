import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// forwardRef allows to forward the ref from the parent component 
// to the underlying DOM element or component within the custom component
const Dropdown = forwardRef(({ position, items }, ref) => {
  const keys = Object.keys(items);
  const values = Object.values(items);

  return (
    <div ref={ ref } className={`absolute ${position} w-28 py-2 border shadow-lg rounded-lg bg-white z-10`}>
      <div className="dropdown-arrow" />
      {
        keys.map((name, index) => 
          <div
            key={ index }
            onClick={ (e) => values[index](e) }
            className='px-2 py-1 w-full text-black cursor-pointer text-sm hover:bg-gray-200'
          >
              { name.charAt(0).toUpperCase() + name.slice(1) }
          </div>
        )
      }
    </div>
  );
});

Dropdown.propTypes = {
  position: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
};

export default Dropdown;