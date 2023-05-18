import { HiOutlineMail } from 'react-icons/hi';
import { HiOutlineKey } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="w-96 p-4">
      <h2 className="text-center text-3xl text-gray-600">Talkiverse</h2>
      <form>
        <div className="relative my-5 px-2">
          <input type="text" placeholder="First Name" className="border-b w-[60%] px-2 py-2 border-b-slate-300 bg-[#f0f0f0] text-gray-600 focus:outline-none focus:border-b-blue-400" />
          <input type="text" placeholder="Last Name" className="ml-4 border-b w-1/3 px-2 py-2 border-b-slate-300 bg-[#f0f0f0] text-gray-600 focus:outline-none focus:border-b-blue-400" />
        </div>
        <div className="relative my-5 px-2">
          <input type="email" placeholder="Email" className="border-b w-full pl-10 pr-2 py-2 border-b-slate-300 bg-[#f0f0f0] text-gray-600 focus:outline-none focus:border-b-blue-400" />
          <HiOutlineMail className='text-slate-300 w-6 h-6 absolute top-2'/>
        </div>
        <div className="relative my-5 px-2">
          <input type="password" placeholder="Password" className="border-b w-full pl-10 pr-2 py-2 border-b-slate-300 bg-[#f0f0f0] text-gray-600 focus:outline-none focus:border-b-blue-400" />
          <HiOutlineKey className='text-slate-300 w-6 h-6 absolute top-2'/>
        </div>
        <div className="relative my-5 px-2">
          <input type="password" placeholder="Password Confirmation" className="border-b w-full px-2 py-2 border-b-slate-300 bg-[#f0f0f0] text-gray-600 focus:outline-none focus:border-b-blue-400" />
        </div>
        <button type="submit" className="w-full mt-2 text-center bg-blue-400 text-white shadow-lg px-4 py-1.5 rounded-full text-lg hover:bg-blue-500">Register</button>
        <div className='my-5 px-2'>
          <p className='text-center text-gray-500'>Already have an account? <Link to='/login' className='text-blue-500 hover:text-blue-600'>Sign in</Link></p>
        </div>
      </form>
    </div>
    );
};

export default Register;