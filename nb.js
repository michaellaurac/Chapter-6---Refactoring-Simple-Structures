const imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
const somewhereOverTheRainbow = ['c', 'em', 'f', 'g', 'am'];
const tooManyCooks = ['c', 'g', 'f'];
const iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm'];
const babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'];
const creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'];
const paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7', 'em7', 'a7', 'f7', 'b'];
const toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7', 'g7'];
const bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'];

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
  for (let index = 0; index < chords.length; index++) {
    if (!allChords.includes(chords[index])) {
      allChords.push(chords[index]);
    }
  }
  if (Object.keys(labelCounts).includes(label)) {
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
  songs.forEach(function (song) {
    if (chordCountsInLabels[song[0]] === undefined) {
      chordCountsInLabels[song[0]] = {};
    }
    song[1].forEach(function (chord) {
      if (chordCountsInLabels[song[0]][chord] > 0) {
        chordCountsInLabels[song[0]][chord] =
chordCountsInLabels[song[0]][chord] + 1;
      } else {
        chordCountsInLabels[song[0]][chord] = 1;
      }
    });
  });
}

function setProbabilityOfChordsInLabels () {
  probabilityOfChordsInLabels = chordCountsInLabels;
  Object.keys(probabilityOfChordsInLabels).forEach(function (difficulty) {
    Object.keys(probabilityOfChordsInLabels[difficulty]).forEach(function (chord) {
      probabilityOfChordsInLabels[difficulty][chord] = probabilityOfChordsInLabels[difficulty][chord] / songs.length;
    });
  });
}

train(imagine, 'easy');
train(somewhereOverTheRainbow, 'easy');
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
  const total = labelProbabilities;
  console.log(total);
  const classified = {};
  Object.keys(total).forEach(function (difficulty) {
    let first = labelProbabilities[difficulty] + 1.01;
    chords.forEach(function (chord) {
      const probabilityOfChordInLabel = probabilityOfChordsInLabels[difficulty][chord];
      if (probabilityOfChordInLabel === undefined) {
        first + 1.01;
      } else {
        first = first * (probabilityOfChordInLabel + 1.01);
      }
    });
    classified[difficulty] = first;
  });
  console.log(classified);
};

classify(['d', 'g', 'e', 'dm']);
classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']);
