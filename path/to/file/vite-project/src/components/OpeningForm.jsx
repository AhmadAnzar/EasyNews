import { useNavigate } from 'react-router-dom';

export default function OpeningForm() {
  const navigate = useNavigate();

  const handleLoginSignup = () => {
    console.log('🔀  OpeningForm → handleLoginSignup');
    navigate('/home');
  };

  return (
    <div className="container">
      <div className="left">
        <h1>Welcome to EasyNews</h1>
        <div className="button-group">
          <button
            type="button"
            className="btn login"
            onClick={handleLoginSignup}
          >
            Login
          </button>
          <button
            type="button"
            className="btn signup"
            onClick={handleLoginSignup}
          >
            Sign Up
          </button>
        </div>

        <form>
          {/* ... existing form inputs ... */}
        </form>
      </div>
      {/* ... rest of file unchanged ... */}
    </div>
  );
} 