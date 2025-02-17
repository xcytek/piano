const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

interface Note {
  name: string;
  frequency: number;
}

// Piano notes with their frequencies and names
export const NOTES: Note[] = [
  { name: 'C4', frequency: 261.63 },
  { name: 'D4', frequency: 293.66 },
  { name: 'E4', frequency: 329.63 },
  { name: 'F4', frequency: 349.23 },
  { name: 'G4', frequency: 392.00 },
  { name: 'A4', frequency: 440.00 },
  { name: 'B4', frequency: 493.88 },
  { name: 'C5', frequency: 523.25 },
  { name: 'D5', frequency: 587.33 },
  { name: 'E5', frequency: 659.25 },
  { name: 'F5', frequency: 698.46 },
  { name: 'G5', frequency: 783.99 },
];

export async function playNote(frequency: number) {
  try {
    // Create multiple oscillators for richer sound
    const oscillators = [
      createOscillator('sine', frequency),
      createOscillator('triangle', frequency),
      createOscillator('square', frequency * 2, 0.1), // Octave higher, lower volume
    ];

    const masterGain = audioContext.createGain();
    masterGain.connect(audioContext.destination);

    // Connect all oscillators through their individual gain nodes
    oscillators.forEach(osc => {
      osc.connect(masterGain);
    });

    // Piano-like envelope
    const now = audioContext.currentTime;
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.7, now + 0.02); // Quick attack
    masterGain.gain.exponentialRampToValueAtTime(0.1, now + 0.3); // Decay
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5); // Release

    // Start and stop all oscillators
    oscillators.forEach(osc => {
      osc.oscillator.start(now);
      osc.oscillator.stop(now + 1.5);
    });

  } catch (error) {
    console.error('Error playing note:', error);
  }
}

type OscillatorType = 'sine' | 'triangle' | 'square' | 'sawtooth';

function createOscillator(type: OscillatorType, frequency: number, volume = 0.5) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gainNode.gain.value = volume;

  oscillator.connect(gainNode);

  return {
    oscillator,
    connect: (destination: AudioNode) => gainNode.connect(destination)
  };
}

export function getRandomNote(): Note {
  return NOTES[Math.floor(Math.random() * NOTES.length)];
}