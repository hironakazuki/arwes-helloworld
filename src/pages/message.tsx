import React, { FC, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

import { AnimatorGeneralProvider, Animator } from '@arwes/animation';
import { BleepsProvider } from '@arwes/sounds';
import { ArwesThemeProvider, StylesBaseline, Text, FrameLines, Button } from '@arwes/core';
import { messageState } from '../atoms/messageState';
// For the font-family to work, you would have to setup the Google Fonts link:
// <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600&display=swap" />
const ROOT_FONT_FAMILY = '"Titillium Web", sans-serif';
const SOUND_OBJECT_URL = '/sounds/object.mp3';
const SOUND_TYPE_URL = '/sounds/type.mp3';
const SOUND_ASSEMBLE_URL = '/sounds/assemble.mp3';
const audioSettings = { common: { volume: 0.5 } };
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
const generalAnimator = { duration: { enter: 1500, exit: 200 } };
const generalAnimator2 = { duration: { enter: 200, exit: 200 } };

const Test = () => {
  const [activate, setActivate] = useState(false);
  const message = useRecoilValue(messageState);
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), 5000);
    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    const audio = new Audio('/sounds/ask.mp3'); //　コンストラクタでaudio要素を生成

    // audio.play(); // 再生
  }, []);

  const returnToTop = (e: any) => {
    e.preventDefault();
    const audio = new Audio('/sounds/ask.mp3'); //　コンストラクタでaudio要素を生成

    audio.play(); // 再生
    router.push('/');
  };
  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{ body: { fontFamily: ROOT_FONT_FAMILY } }} />
      <BleepsProvider
        audioSettings={audioSettings}
        playersSettings={playersSettings}
        bleepsSettings={bleepsSettings}
      >
        <AnimatorGeneralProvider animator={generalAnimator2}>
          <Button animator={{ activate }} onClick={returnToTop} className='absolute top-12'>
            <Text>Return to top</Text>
          </Button>
        </AnimatorGeneralProvider>
        <AnimatorGeneralProvider animator={generalAnimator}>
          <Animator animator={{ activate: true, manager: 'stagger' }}>
            <div className={styles.main}>
              <FrameLines>
                <div
                  style={{ minHeight: '75vh', minWidth: '75vw' }}
                  className='text-[8.125vw]  flex justify-center items-center mx-20'
                >
                  <Text as='h2' className='text-[8.125vw] '>
                    {message}
                  </Text>
                </div>
              </FrameLines>
            </div>
          </Animator>
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

export default Test;
