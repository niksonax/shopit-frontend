import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Auth(props) {
  const location = useLocation();

  const [pageState, setPageState] = useState('sign-up');

  useEffect(() => {
    if (location.state.page) {
      setPageState(location.state.page);
    }
  }, [location]);

  return <div>Auth {pageState}</div>;
}

export default Auth;
