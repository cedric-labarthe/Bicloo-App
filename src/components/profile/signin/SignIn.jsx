import { Link, useHistory } from 'react-router-dom';
import { useState, useRef } from 'react';

import UserService from '../../../Services/UserService';
import GithubBtn from '../../buttons/github/GithubBtn';
import GoogleBtn from '../../buttons/google/GoogleBtn';
import LogoBicloo from '../../../assets/img/logo-bicloo.png';
import { useAuth } from '../../../firebase/AuthContext';
import '../signup/SignPage.css';

const SignIn = () => {
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const { signInWithEmail } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await signInWithEmail(
        emailRef.current.value,
        passwordRef.current.value
      ).then((data) => {
        UserService.getAllUsers().then((users) => {
          UserService.logUser(users[data.user.uid]);
          history.push('/');
        });
      });
    } catch (err) {
      setError('Failed to sign in');
    }

    setLoading(false);
  }
  return (
    <>
      <main className="signContainer">
        <section className=" w-full h-full">
          <div className="absolute top-0 w-full h-full bg-gray-900" />
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <img src={LogoBicloo} alt="logo" />
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Se connecter avec
                      </h6>
                      {error && (
                        <div
                          className="bg-red-600 border-l-4 border-gray-900 text-orange-700 p-4"
                          role="alert"
                        >
                          {error}
                        </div>
                      )}
                    </div>
                    <div className="btn-wrapper text-center">
                      <GithubBtn />
                      <GoogleBtn />
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <small> Ou votre email et mot de passe</small>
                    </div>
                    <form action="#" method="GET" onSubmit={handleSubmit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                          <input
                            ref={emailRef}
                            type="email"
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="Email"
                            style={{ transition: 'all .15s ease' }}
                          />
                        </label>
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Mot de passe
                          <input
                            ref={passwordRef}
                            type="password"
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="Mot de passe"
                            style={{ transition: 'all .15s ease' }}
                          />
                        </label>
                      </div>
                      <div>
                        <label
                          className="inline-flex items-center cursor-pointer"
                          htmlFor="a"
                        >
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                            style={{ transition: 'all .15s ease' }}
                          />
                          <span className="ml-2 text-sm font-semibold text-blueGray-600">
                            Se souvenir de moi
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          disabled={loading}
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: 'all .15s ease' }}
                        >
                          Se connecter
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2">
                    <Link to="/forgot-password" className="text-gray-300">
                      <small>Mot de passe oublié ?</small>
                    </Link>
                  </div>
                  <div className="w-1/2 text-right">
                    <Link to="/signUp" className="text-gray-300">
                      <small>Créer un nouveau compte</small>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default SignIn;
