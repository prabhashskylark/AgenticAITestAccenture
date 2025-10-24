// Centralized API base URL computed from the Codespace name environment variable.
// Falls back to localhost:8000 for local development.
const codespace = process.env.REACT_APP_CODESPACE_NAME;
export const BASE_API_URL = codespace
  ? `https://${codespace}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

// Helpful for debugging when the app starts
if (typeof console !== 'undefined') {
  console.log('BASE_API_URL:', BASE_API_URL);
}

export default BASE_API_URL;
