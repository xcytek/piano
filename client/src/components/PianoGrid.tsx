import { PianoSquare } from "./PianoSquare";
import { NOTES } from "@/lib/audio";

export function PianoGrid() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
      {NOTES.map((note, index) => (
        <PianoSquare key={index} note={note} />
      ))}
    </div>
  );
}