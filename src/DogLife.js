import { Machine } from 'xstate';
import React from 'react'
import dogLying from '../images/dog-lying-svgrepo-com.svg'
import dogPlaying from '../images/dog-playing-svgrepo-com.svg'
import dogStanding from '../images/dog-svgrepo-com.svg'
import doorClosed from '../images/closed-filled-rectangular-door-svgrepo-com.svg'
import styled from 'styled-components'
import { useMachine } from '@xstate/react';

const Wrapper = styled.div`
  width: 90vw;
  max-height: 300px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  background-color: white;
  color: black;
  padding: 0.5em
`
const Centered = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`
const Btn = styled.button`
  padding: 10px;
  margin: 2px;
  font-size: 14px;
  font-weight: bold;
`
const Img = styled.img`
  max-height: 200px;
`
const Empty = styled.div`
  width: 100px;
`

const dogLifeMachine = Machine({
  id: 'dogLife',
  initial: 'bored',
  context: {
  },
  states: {
    bored: {
      on: {
        LETS_PLAY: 'door'
      }
    },
    door: {
      on: {
        OPEN: 'play',
        CLOSE: 'bored'
      }
    },
    play: {
      on: {
        INSIDE: 'door'
      }
    },
  }
});

const DogPlay = () => {
  const [state, send] = useMachine(dogLifeMachine)

  return <>
    <Wrapper>
      {state.matches('bored') ? <Img src={dogLying} alt="a sleeping dog" /> : <Empty />}
      {state.matches('door') ? <Img src={dogStanding} alt="a standing dog" /> : <Empty />}
      <Img src={doorClosed} alt="a closed door" />
      {state.matches('play') ? <Img src={dogPlaying} alt="a dog playing" style={{ transform: 'scaleX(-1)' }} /> : <Empty />}
    </Wrapper>
    <Wrapper>
      <Centered>
        <h3 style={{ marginRight: '1em' }}>Trainer's Actions:</h3>
        <Btn onClick={() => send('LETS_PLAY')}>"Let's Play"</Btn>
        <Btn onClick={() => send('OPEN')}>Door Open</Btn>
        <Btn onClick={() => send('CLOSE')}>Door Close</Btn>
        <Btn onClick={() => send('INSIDE')}>"Inside"</Btn>
      </Centered>
    </Wrapper >
    <Wrapper>
      <h4>
        State: {state.value}
      </h4>
    </Wrapper>
  </>
}

export default DogPlay