import { PianoSquare } from "./PianoSquare";
import { getRandomNote } from "@/lib/audio";

// Generate a grid of notes
const gridNotes = Array(12).fill(0).map(() => getRandomNote());

export function PianoGrid() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
      {gridNotes.map((note, index) => (
        <PianoSquare key={index} frequency={note} />
      ))}
    </div>
  );
}
