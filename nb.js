const fs = require('fs');
// songs
const imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
const somewhere_over_the_rainbow = ['c', 'em', 'f', 'g', 'am'];
const tooManyCooks = ['c', 'g', 'f'];
const iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm'];
const babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'];
const creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'];
const army = ['ab', 'ebm7', 'dbadd9', 'fm7', 'bbm', 'abmaj7', 'ebm'];
const paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7', 'em7', 'a7', 'f7', 'b'];
const toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7', 'g7'];
const bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'];
const song_11 = [];

const songs = [];
const labels = [];
const allChords = [];
const labelCounts = [];
const labelProbabilities = [];
const chordCountsInLabels = {};
let probabilityOfChordsInLabels = {};

function train (chords, label) {
  songs.push([label, chords]);
  labels.push(label);
  for (let i = 0; i < chords.length; i++) {
    if (!allChords.includes(chords[i])) {
      allChords.push(chords[i]);
    }
  }
  if (!!(Object.keys(labelCounts).includes(label))) {
    labelCounts[label] = labelCounts[label] + 1;
  } else {
    labelCounts[label] = 1;
  }
};

function getNumberOfSongs () {
  return songs.length;
};

function setLabelProbabilities () {
  Object.keys(labelCounts).forEach(function (label) {
    const numberOfSongs = getNumberOfSongs();
    labelProbabilities[label] = labelCounts[label] / numberOfSongs;
  });
};

function setChordCountsInLabels () {
  songs.forEach(function (i) {
    if (chordCountsInLabels[i[0]] === undefined) {
      chordCountsInLabels[i[0]] = {};
    }
    i[1].forEach(function (j) {
      if (chordCountsInLabels[i[0]][j] > 0) {
        chordCountsInLabels[i[0]][j] =
chordCountsInLabels[i[0]][j] + 1;
      } else {
        chordCountsInLabels[i[0]][j] = 1;
      }
    });
  });
}

function setProbabilityOfChordsInLabels () {
  probabilityOfChordsInLabels = chordCountsInLabels;
  Object.keys(probabilityOfChordsInLabels).forEach(function (i) {
    Object.keys(probabilityOfChordsInLabels[i]).forEach(function (j) {
      probabilityOfChordsInLabels[i][j] = probabilityOfChordsInLabels[i][j] * 1.0 / songs.length;
    });
  });
}

train(imagine, 'easy');
train(somewhere_over_the_rainbow, 'easy');
train(tooManyCooks, 'easy');
train(iWillFollowYouIntoTheDark, 'medium');
train(babyOneMoreTime, 'medium');
train(creep, 'medium');
train(paperBag, 'hard');
train(toxic, 'hard');
train(bulletproof, 'hard');

setLabelProbabilities();
setChordCountsInLabels();
setProbabilityOfChordsInLabels();

function classify (chords) {
  const ttal = labelProbabilities;
  console.log(ttal);
  const classified = {};
  Object.keys(ttal).forEach(function (obj) {
    let first = labelProbabilities[obj] + 1.01;
    chords.forEach(function (chord) {
      const probabilityOfChordInLabel = probabilityOfChordsInLabels[obj][chord];
      if (probabilityOfChordInLabel === undefined) {
        first + 1.01;
      } else {
        first = first * (probabilityOfChordInLabel + 1.01);
      }
    });
    classified[obj] = first;
  });
  console.log(classified);
};

classify(['d', 'g', 'e', 'dm']);
classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']);