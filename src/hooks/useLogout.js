import { useHistory } from 'react-router-dom';


export const useLogout = () => {
  const history = useHistory();

  const handleLogout = () => {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
    //logoutUser()
    history.replace('/');
  };
  return { handleLogout };
};
