import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { AnimatorGeneralProvider, Animator } from '@arwes/animation';
import { BleepsProvider } from '@arwes/sounds';
import { ArwesThemeProvider, StylesBaseline, Text, Figure, LoadingBars } from '@arwes/core';
import ArwesText from '../components/ArwesText';

// For the font-family to work, you would have to setup the Google Fonts link:
// <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600&display=swap" />
const ROOT_FONT_FAMILY = '"Titillium Web", sans-serif';
const SOUND_OBJECT_URL = '/sounds/object.mp3';
const SOUND_TYPE_URL = '/sounds/type.mp3';
const audioSettings = { common: { volume: 0.25 } };
const playersSettings = {
  object: { src: [SOUND_OBJECT_URL] },
  type: { src: [SOUND_TYPE_URL], loop: true },
};
const bleepsSettings = {
  object: { player: 'object' },
  type: { player: 'type' },
};
const generalAnimator = { duration: { enter: 2300, exit: 200 } };
const Test: FC = () => {
  const [progress, setProgress] = React.useState(0);
  const [activate, setActivate] = useState(true);
  const [activate2, setActivate2] = useState(false);
  const router = useRouter();

  // 時間経過で遷移
  useEffect(() => {
    setTimeout(() => {
      router.push('/message');
    }, 5 * 1000);
  }, [router]);
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
    }, 2300);
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
    const audio = new Audio('/sounds/information.mp3'); //　コンストラクタでaudio要素を生成

    audio.play(); // 再生
  }, []);
  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={{ body: { fontFamily: ROOT_FONT_FAMILY } }} />
      <LoadingBars
        animator={{ activate }}
        determinate
        progress={progress}
        size={2}
        speed={5}
        full
      />
      <BleepsProvider
        audioSettings={audioSettings}
        playersSettings={playersSettings}
        bleepsSettings={bleepsSettings}
      >
        <AnimatorGeneralProvider animator={generalAnimator}>
          <Animator animator={{ activate: true, manager: 'stagger' }}>
            <Text as='h1' className='mt-12'>
              Emergency
            </Text>
            <Text as='p'>
              A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases.
              Originally, the term was used to describe any diffused astronomical object, including
              galaxies beyond the Milky Way. The Andromeda Galaxy, for instance, was once referred
              to as the Andromeda Nebula (and spiral galaxies in general as spiral nebulae) before
              the true nature of galaxies was confirmed in the early 20th century by Vesto Slipher,
              Edwin Hubble and others.
            </Text>
          </Animator>
          <Animator animator={{ activate: activate2, manager: 'stagger' }}>
            <ArwesText />
            <ArwesText />
            <ArwesText />
            <ArwesText />
            <ArwesText />
            <ArwesText />
            <ArwesText />
            <ArwesText />
            <ArwesText />
          </Animator>
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

export default Test;
