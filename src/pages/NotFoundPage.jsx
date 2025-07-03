import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found.</p>
        <Link 
          to="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-secondary"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;