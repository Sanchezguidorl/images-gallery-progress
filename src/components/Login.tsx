import { useState } from "react";

interface UserAdminInterface {
  username: string;
  password: string;
}

function Login() {
  const [userData, setUserData] = useState<UserAdminInterface>({
    username: "",
    password: "",
  });

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
      setUserData({ ...userData, username: username });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
      setUserData({ ...userData, password: password });
  };

  return (
    <div id="Panel" className="borde">
      <h1>Identificarme</h1>
      <form action="">
        <div className="form-control">
          <label htmlFor="username">Usuario</label>
          <input id="username" onChange={handleUsername} type="text" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Contraseña</label>
          <input id="password" onChange={handlePassword} type="text" />
        </div>
        <input type="submit" className="submit-button" />
      </form>
    </div>
  );
}

export default Login;
