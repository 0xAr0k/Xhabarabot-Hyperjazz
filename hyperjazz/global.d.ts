
// This file will add both p5 instance and global intellisense
import * as p5Global from 'p5/global';
import module = require('p5');

export = module;
export as namespace p5;
declare global {
  interface Window {
    p5: typeof module;
  }
  function loadSound(
    path: string,
    callback?: () => void,
    errorCallback?: () => void,
    whileLoading?: () => void
  ): p5.SoundFile;
}