import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f0f0f0]">
      <div className="transform -translate-y-1/2">
        <p className="text-lg text-gray-500">Page Not Found!</p>
        <button onClick={ goBack } className='text-center w-full mt-4 text-blue-500 hover:text-blue-600'>Go Back</button>
      </div>
    </div>
  );
};

export default PageNotFound;