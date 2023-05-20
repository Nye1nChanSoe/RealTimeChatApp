import PropTypes from 'prop-types';
import { HiOutlineLogout } from 'react-icons/hi';

const Logout = ({ handleLogout }) => {
  return (
    <div>
      <a href="/" onClick={ (e) => handleLogout(e) }><HiOutlineLogout className='w-5 h-5 hover:text-blue-600' /></a>
    </div>
  );
};

Logout.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Logout;