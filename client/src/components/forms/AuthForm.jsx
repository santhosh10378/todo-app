import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AuthForm = ({ isLogin }) => {
  const navigate = useNavigate();
  const { loginUser, registerUser, updateUser } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = e.target.elements;

    const formData = {
      name: name?.value,
      email: email.value,
      password: password.value,
    };

    console.log(formData);

    if (isLogin) {
      await loginUser(formData);
    } else {
      await registerUser(formData);
    }

    await updateUser();
    navigate("/");
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      {!isLogin && (
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          className="w-full outline-none p-2 border-2 rounded-md focus:border-black text-sm"
        />
      )}

      <input
        type="email"
        placeholder="Enter your email"
        name="email"
        className="w-full outline-none p-2 border-2 rounded-md focus:border-black text-sm"
      />

      <input
        type="password"
        placeholder="Enter your password"
        name="password"
        className="w-full outline-none p-2 border-2 rounded-md focus:border-black text-sm"
      />

      <button className="w-full bg-gradient-to-r from-sky-500 to-blue-500 text-white font-medium rounded-md p-2">
        Submit
      </button>
    </form>
  );
};

export default AuthForm;
