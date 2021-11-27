import React, { FC, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styles from '../styles/Home.module.css';

import { AnimatorGeneralProvider, Animator } from '@arwes/animation';
import { BleepsProvider } from '@arwes/sounds';
import { ArwesThemeProvider, StylesBaseline, Text, FrameLines } from '@arwes/core';
import { messageState } from '../atoms/messageState';
// For the font-family to work, you would have to setup the Google Fonts link:
// <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600&display=swap" />
const ROOT_FONT_FAMILY = '"Titillium Web", sans-serif';
const SOUND_OBJECT_URL = '/sounds/object.mp3';
const SOUND_TYPE_URL = '/sounds/type.mp3';
const SOUND_ASSEMBLE_URL = '/sounds/assemble.mp3';
const audioSettings = { common: { volume: 0.25 } };
const playersSettings = {
  object: { src: [SOUND_OBJECT_URL] },
  type: { src: [SOUND_TYPE_URL], loop: true },
  assemble: { src: [SOUND_ASSEMBLE_URL], loop: true },
};
const bleepsSettings = {
  object: { player: 'object' },
  type: { player: 'type' },
  assemble: { player: 'assemble' },
};
const generalAnimator = { duration: { enter: 2000, exit: 200 } };

const Test: FC = () => {
  const [progress, setProgress] = React.useState(0);
  const [activate, setActivate] = useState(true);
  const [activate2, setActivate2] = useState(false);
  const message = useRecoilValue(messageState);
  useEffect(() => {
    const timeout = setTimeout(() => setActivate2(!activate2), 2000);
    return () => clearTimeout(timeout);
  }, []);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setActivate(!activate);
      if (!activate) {
        setProgress(0);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (progress < 100) {
        setProgress(progress + 1);
      }
    }, 10);
    return () => clearTimeout(timeout);
  }, [progress]);
  useEffect(() => {
    const audio = new Audio('/sounds/ask.mp3'); //　コンストラクタでaudio要素を生成

    // audio.play(); // 再生
  }, []);
  return (
    <div className='text-[8.125vw] align-middle'>
      <ArwesThemeProvider>
        <StylesBaseline styles={{ body: { fontFamily: ROOT_FONT_FAMILY } }} />
        <BleepsProvider
          audioSettings={audioSettings}
          playersSettings={playersSettings}
          bleepsSettings={bleepsSettings}
        >
          <AnimatorGeneralProvider animator={generalAnimator}>
            <Animator animator={{ activate: true, manager: 'stagger' }}>
              <div className={styles.main}>
                <FrameLines animator={{ activate }} hover>
                  <div
                    style={{ width: 2000, height: 1000 }}
                    className='text-[8.125vw] align-middle flex justify-center items-center'
                  >
                    <Text as='h1' className='text-[8.125vw] '>
                      {message}
                    </Text>
                  </div>
                </FrameLines>
              </div>
            </Animator>
          </AnimatorGeneralProvider>
        </BleepsProvider>
      </ArwesThemeProvider>
    </div>
  );
};

export default Test;
