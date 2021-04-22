import React, { useEffect, useState } from 'react';
import './Home.css';
import LogSignButtons from '../tools/LogSignButtons';
import UserService from '../../Services/UserService';

export default function Home() {
  const [first, setFirstOk] = useState(false);

  useEffect(() => {
    if (first) {
      UserService.logUser('Georges', '1234')
        .then((res) => console.log('cool', res))
        .catch((e) => console.log('nul', e));
    } else {
      setFirstOk(true);
    }
  });

  return (
    <div className="mainSection home">
      <h2 className="logoTitle">
        <span>BiclooApp</span>
      </h2>

      <p>The App which will make you ride ye boïke more, and more !</p>
      <button
        type="button"
        className="homeButton"
        onClick={() => {
          console.log(UserService.getUser());
        }}
      >
        Discover <br />
        the concept
      </button>
      <LogSignButtons noLog />
      <button type="button" onClick={() => UserService.getAllRewards()}>
        get rewards
      </button>
      <button type="button" onClick={() => UserService.getUserRewards()}>
        user rewards
      </button>
      <button type="button" onClick={() => console.log(UserService.getUser())}>
        user
      </button>
      <button type="button" onClick={() => console.log(UserService.getData())}>
        data
      </button>
    </div>
  );
}
