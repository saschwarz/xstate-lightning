import { Machine, assign } from 'xstate';

import React from 'react'
import dogLying from '../images/dog-lying-svgrepo-com.svg'
import dogPlaying from '../images/dog-playing-svgrepo-com.svg'
import dogSitting from '../images/dog-seating-svgrepo-com.svg'
import dogStanding from '../images/dog-svgrepo-com.svg'
// import doorClosed from '../images/door-open-svgrepo-com.svg'
import doorClosed from '../images/closed-filled-rectangular-door-svgrepo-com.svg'
import doorOpen from '../images/open-exit-door-svgrepo-com.svg'
import styled from 'styled-components'
import { useMachine } from '@xstate/react';

const Wrapper = styled.div`
  width: 90vw;
  // height: 50vh;
  max-height: 300px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  // position: relative;
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


const dogPlay = Machine({
  id: 'dogplay',
  initial: 'sleeping',
  context: {
    doorOpen: false,
  },
  states: {
    sleeping: {
      on: {
        LETS_PLAY: 'standing'
      }
    },
    standing: {
      on: {
        SIT: 'sitting'
      }
    },
    sitting: {
      on: {
        STAND: 'standing',
        FREE: [
          {
            target: 'outside',
            cond: 'doorIsOpen',
          },
          { target: 'standing' }],
      },
    },
    outside: {
    },
  },
  on: {
    DOOR_OPEN: {
      actions: [
        assign({ doorOpen: _ => true })
      ],
    },
    DOOR_CLOSE: {
      actions: [
        assign({ doorOpen: _ => false })
      ]
    },
    RESET: {
      target: 'sleeping',
      actions: [
        assign({ doorOpen: _ => false })
      ],
    }
  }
},
  {
    guards: {
      doorIsOpen: (context, event) => context.doorOpen
    }
  })

const DogPlay = () => {
  const [state, send] = useMachine(dogPlay)

  return <>
    <Wrapper>
      {state.matches('sleeping') ? <Img src={dogLying} alt="a sleeping dog" /> : <div style={{ width: "100px" }} />}
      {state.matches('standing') ? <Img src={dogStanding} alt="a standing dog" /> : <div style={{ width: "100px" }} />}
      {state.matches('sitting') ? <Img src={dogSitting} alt="a sitting dog" /> : null}
      {state.context.doorOpen ? <Img src={doorOpen} alt="an open door" /> : <Img src={doorClosed} alt="a closed door" />}
      {state.matches('outside') ? <Img src={dogPlaying} alt="a dog playing" style={{ transform: 'scaleX(-1)' }} /> : <div style={{ width: "100px" }} />}
    </Wrapper>
    <Wrapper>
      <h3>Dog's Actions:</h3>
      <Centered>
        <Btn onClick={() => send('SIT')}>Sit</Btn>
        <Btn onClick={() => send('STAND')}>Stand</Btn>
      </Centered>
      <Centered>
        <h3>Trainer's Actions:</h3>
        <Btn onClick={() => send('LETS_PLAY')}>"Let's Play"</Btn>
        <Btn onClick={() => send('FREE')}>"Free"</Btn>
        <Btn onClick={() => send('DOOR_OPEN')}>Door Open</Btn>
        <Btn onClick={() => send('DOOR_CLOSE')}>Door Close</Btn>
      </Centered>
    </Wrapper >
    <Wrapper>
      <h3>
        State: {state.value}
      </h3>
      <h3><Btn onClick={() => send('RESET')}> Reset</Btn></h3>
      <h3>
        Door: {state.context.doorOpen ? 'OPEN' : 'CLOSED'}
      </h3>
    </Wrapper>
  </>
}

export default DogPlay