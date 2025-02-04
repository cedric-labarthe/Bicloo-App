import React, { useRef, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../firebase/AuthContext';

import './SignPage.css';
import GithubBtn from '../../buttons/github/GithubBtn';
import GoogleBtn from '../../buttons/google/GoogleBtn';
import LogoBicloo from '../../../assets/img/logo-bicloo.png';
import UserService from '../../../Services/UserService';

export default function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signUpWithEmail } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError('Passwords do not match');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signUpWithEmail(
        emailRef.current.value,
        passwordRef.current.value
      ).then((data) => {
        UserService.createUserInDatabase(
          data.user.uid,
          nameRef.current.value
        ).then(() => history.push('/'));
      });
    } catch (err) {
      setError('Failed to create an account');
    }

    setLoading(false);
  }

  return (
    <>
      <main className="signContainer flex">
        <section className=" w-full">
          <div className="absolute top-0 w-full h-full bg-gray-900" />
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-3">
                    <div className="text-center mb-3">
                      <img src={LogoBicloo} alt="logo" />
                      <h6 className="text-gray-600 text-sm font-bold">
                        S&#039;inscrire avec
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
                  <div className="flex-auto px-4 lg:px-10 py-5 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <small> Ou votre email et mot de passe</small>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Name
                          <input
                            type="Text"
                            ref={nameRef}
                            required
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="Name"
                            style={{ transition: 'all .15s ease' }}
                          />
                        </label>
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                          <input
                            type="Email"
                            ref={emailRef}
                            required
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
                            type="password"
                            ref={passwordRef}
                            required
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="Mot de passe"
                            style={{ transition: 'all .15s ease' }}
                          />
                        </label>
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Confirmer le mot de passe
                          <input
                            type="password"
                            ref={passwordConfirmRef}
                            required
                            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                            placeholder="Confirmer le mot de passe"
                            style={{ transition: 'all .15s ease' }}
                          />
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          disabled={loading}
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: 'all .15s ease' }}
                        >
                          Créer mon compte
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
