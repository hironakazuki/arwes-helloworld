import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import styled, { keyframes } from 'styled-components';

import { AnimatorGeneralProvider, Animator } from '@arwes/animation';
import { BleepsProvider } from '@arwes/sounds';
import { ArwesThemeProvider, StylesBaseline, Text, Figure } from '@arwes/core';
const ROOT_FONT_FAMILY = '"Titillium Web", sans-serif';
const IMAGE_URL = 'https://playground.arwes.dev/assets/images/wallpaper.jpg';
const SOUND_OBJECT_URL = '/public/sounds/object.mp3';
const SOUND_TYPE_URL = '/public/sounds/type.mp3';
const audioSettings = { common: { volume: 0.25 } };
const playersSettings = {
  object: { src: [SOUND_OBJECT_URL] },
  type: { src: [SOUND_TYPE_URL], loop: true },
};
const bleepsSettings = {
  object: { player: 'object' },
  type: { player: 'type' },
};
const generalAnimator = { duration: { enter: 300, exit: 200 } };

const Rotation = keyframes`
  0%{ transform:rotate(0);}
  100%{ transform:rotate(360deg); }
`;
const BgWrapper = styled.div`
img{
  animation: ${Rotation} 60s linear infinite normal;,
}
`;

const Home: NextPage = () => {
  const imgSrc = '/images/animal_chara_computer_penguin.png';
  return (
    <ArwesThemeProvider>
      <BleepsProvider
        audioSettings={audioSettings}
        playersSettings={playersSettings}
        bleepsSettings={bleepsSettings}
      >
        <StylesBaseline styles={{ body: { fontFamily: ROOT_FONT_FAMILY } }} />
        <div className={styles.container}>
          <Head>
            <title>Create Next App</title>
            <meta name='description' content='Generated by create next app' />
            <link rel='icon' href='/favicon.ico' />
          </Head>

          <main className={styles.main}>
            <BgWrapper>
              <img
                src={imgSrc}
                className='fixed left-0 top-0 z-[-1] object-contain opacity-25 w-screen h-screen pointer-events-none'
              />
            </BgWrapper>
            <h1 className='text-red-300'>
              Welcome to <a href='https://nextjs.org'>Next.js!</a>
            </h1>

            <p className={styles.description}>
              Get started by editing <code className={styles.code}>pages/index.js</code>
            </p>

            <div className={styles.grid}>
              <Link href='/test' passHref>
                <div className={styles.card}>
                  <h2>arwes &rarr;</h2>
                  <p>Learn Arwes!</p>
                </div>
              </Link>

              <a href='https://nextjs.org/learn' className={styles.card}>
                <h2>Learn &rarr;</h2>
                <p>Learn about Next.js in an interactive course with quizzes!</p>
              </a>

              <a
                href='https://github.com/vercel/next.js/tree/master/examples'
                className={styles.card}
              >
                <h2>Examples &rarr;</h2>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>

              <a
                href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
                className={styles.card}
              >
                <h2>Deploy &rarr;</h2>
                <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
              </a>
            </div>
          </main>

          <footer className={styles.footer}>
            <a
              href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
              target='_blank'
              rel='noopener noreferrer'
            >
              Powered by{' '}
              <span className={styles.logo}>
                <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
              </span>
            </a>
          </footer>
        </div>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

export default Home;
