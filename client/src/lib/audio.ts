const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

// Piano notes frequencies (A4 = 440Hz as reference)
const NOTES = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  349.23, // F4
  392.00, // G4
  440.00, // A4
  493.88, // B4
  523.25, // C5
  587.33, // D5
  659.25, // E5
  698.46, // F5
  783.99, // G5
];

export async function playNote(frequency: number) {
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    
    gainNode.gain.value = 0;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Attack
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);
    // Release
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);
  } catch (error) {
    console.error('Error playing note:', error);
  }
}

export function getRandomNote(): number {
  return NOTES[Math.floor(Math.random() * NOTES.length)];
}
