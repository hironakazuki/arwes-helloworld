import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { AnimatorGeneralProvider, Animator } from '@arwes/animation';
import { BleepsProvider } from '@arwes/sounds';
import { ArwesThemeProvider, StylesBaseline, Text, LoadingBars, CodeBlock } from '@arwes/core';
import ArwesText from '../components/ArwesText';

// For the font-family to work, you would have to setup the Google Fonts link:
// <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600&display=swap" />
const ROOT_FONT_FAMILY = '"Titillium Web", sans-serif';
const SOUND_OBJECT_URL = '/sounds/object.mp3';
const SOUND_TYPE_URL = '/sounds/type.mp3';
const SOUND_READOUT_URL = '/sounds/readout.mp3';
const audioSettings = { common: { volume: 0.25 } };
const playersSettings = {
  object: { src: [SOUND_OBJECT_URL] },
  type: { src: [SOUND_TYPE_URL], loop: true },
  readout: { src: [SOUND_READOUT_URL], loop: true },
};

const bleepsSettings = {
  object: { player: 'object' },
  type: { player: 'type' },
  readout: { player: 'readout' },
};

const generalAnimator = { duration: { enter: 2300, exit: 200 } };
const generalAnimator2 = { duration: { enter: 1400, exit: 200 } };
const Test: FC = () => {
  const [progress, setProgress] = React.useState(0);
  const [activate, setActivate] = useState(true);
  const [activate2, setActivate2] = useState(false);
  const router = useRouter();

  // 時間経過で遷移;
  useEffect(() => {
    setTimeout(() => {
      router.push('/message');
    }, 6.5 * 1000);
  }, [router]);

  useEffect(() => {
    const timeout = setTimeout(() => setActivate2(!activate2), 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
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
        </AnimatorGeneralProvider>
        <AnimatorGeneralProvider animator={generalAnimator2}>
          <Animator animator={{ activate: activate2, manager: 'stagger' }}>
            <CodeBlock className='absolute left-[10%] top-1/4' lang='tsx'>
              {`const startCodeBlockAnimation = (
  animator: AnimatorRef,
  ref: RootRef,
  theme: ArwesTheme
): void => {
  stopCodeBlockAnimation(animator, ref);

  const { duration, flow } = animator;
  const isEntering = flow.entering || flow.entered;
  const { palette } = theme;

  const root = ref.current;
  const lines = root.querySelectorAll('.arwes-code-block__line');

  anime({
    targets: root,
    duration: isEntering ? duration.enter : duration.exit,
    easing: isEntering ? 'easeOutSine' : 'easeInSine',
    backgroundColor: isEntering
      ? rgba(palette.primary.light2, 0.05)
      : 'rgba(0,0,0,0)'
  });

  anime({
    targets: lines,
    duration: isEntering ? duration.enter : duration.exit,
    easing: isEntering ? 'easeOutSine' : 'easeInSine',
    width: isEntering ? [0, '100%'] : ['100%', 0]
  });
};`}
            </CodeBlock>
            <CodeBlock className='absolute left-[70%] top-[40%]' lang='c#'>
              {`using System;
using System.Linq;

namespace ConsoleApplication
{
  class FizzBuzzMain
  {
    static void Main(string[] args)
    {
      Console.WriteLine(string.Join("\n", Enumerable.Range(1, 100).Select(FizzBuzz)));
    }

    static string FizzBuzz(int i)
    {
      string tmp = "";
      if (i % 3 == 0) tmp = "Fizz";
      if (i % 5 == 0) tmp += "Buzz";
      return tmp.Length == 0 ? i.ToString() : tmp;
    }
  }
};`}
            </CodeBlock>
            <CodeBlock className='absolute left-[50%] top-[60%]' lang='swift'>
              {`import Foundation

func fizzbuzz(num: Int) -> String {
    if (num % 15 == 0) {
        return "FizzBuzz"
    }else if (num % 3 == 0) {
        return "Fizz"
    }else if (num % 5 == 0){
        return "Buzz"
    }else {
        return num.description
    }
}
print(join("\n", (1 ... 100).map(fizzbuzz)));`}
            </CodeBlock>
            <CodeBlock className='absolute left-[80%] ' lang='python'>
              {`#!/usr/bin/python

def fizzbuzz(num):
    tmp = ""
    if num % 3 == 0:
        tmp = "Fizz"
    if num % 5 == 0:
        tmp += "Buzz"
    return tmp if len(tmp) != 0 else str(num)

list = []
for i in range(1, 101):
    list.append(fizzbuzz(i))
print("\n".join(list));`}
            </CodeBlock>
            <CodeBlock className='absolute left-[35%] top-[20%]' lang='Go'>
              {`package main

import (
	"fmt"
	"unicode/utf8"
	"strings"
)

func main() {
	result := []string{}
	for i := 1; i <= 100; i++ {
		tmp := ""
		if i % 3 == 0 {
			tmp = "Fizz"
		}
		if i % 5 == 0 {
			tmp += "Buzz"
		}
		if utf8.RuneCountInString(tmp) == 0 {
			tmp = fmt.Sprintf("%d", i)
		}
		result = append(result, tmp)
	}
	fmt.Print(strings.Join(result, "\n"))
};`}
            </CodeBlock>
            <CodeBlock className='absolute left-[25%] top-[60%]' lang='Haskell'>
              {`import Data.List

fizzbuzz :: (Show a, Integral a) => a -> String
fizzbuzz x
  | isFactorOf 15 = "FizzBuzz"
  | isFactorOf 3  = "Fizz"
  | isFactorOf 5  = "Buzz"
  | otherwise     = show(x)
  where isFactorOf y = x \`mod\` y == 0

main :: IO()
main = putStrLn $ intercalate "\n" $ map fizzbuzz (take 100 [1..]);`}
            </CodeBlock>
            <CodeBlock className='absolute left-[55%] top-[20%]' lang='rust'>
              {`fn main()
{
    let a : Result<i32,_> = "4693".parse();
    let b : Result<i32,_> = "hao123".parse();
    match a{
        Ok(x)=>println!("{}",x),
        Err(_)=>println!("変換に失敗")
    };
    match b{
        Ok(x)=>println!("{}",x),
        Err(_)=>println!("変換に失敗")
    };

};`}
            </CodeBlock>
          </Animator>
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

export default Test;
