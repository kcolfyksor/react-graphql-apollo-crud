import React from 'react';

const Player = (props) => (
  <div key={props.players.id}>
  <p>{`${props.players.username} is ${props.player.name}`}</p>
  </div>
);

export default Player;
