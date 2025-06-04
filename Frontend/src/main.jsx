import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import store, { persistor } from './redux/store'
import { checkAuthStatus } from './redux/slices/authSlice'
import App from './App'
import '@fontsource/inter'
import './index.css'

// Create a wrapper component to handle auth state checks
const AuthStateWrapper = ({ children }) => {
  useEffect(() => {
    // Check auth state on mount
    store.dispatch(checkAuthStatus());

    // Set up periodic checks every minute
    const interval = setInterval(() => {
      store.dispatch(checkAuthStatus());
    }, 60 * 1000); // Check every minute instead of 5 minutes

    return () => clearInterval(interval);
  }, []);

  return children;
};

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AuthStateWrapper>
            <App />
          </AuthStateWrapper>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
