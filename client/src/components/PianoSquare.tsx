import { useState } from "react";
import { playNote } from "@/lib/audio";
import { cn } from "@/lib/utils";
import type { Note } from "@/lib/audio";

interface PianoSquareProps {
  note: Note;
}

export function PianoSquare({ note }: PianoSquareProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleInteraction = async (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();

    setIsPressed(true);
    await playNote(note.frequency);

    setTimeout(() => {
      setIsPressed(false);
    }, 200);
  };

  return (
    <div
      className={cn(
        "aspect-square rounded-lg bg-primary/10 hover:bg-primary/20 cursor-pointer transition-all duration-200",
        "active:scale-95 active:bg-primary/30",
        "touch-none select-none flex items-center justify-center",
        isPressed && "scale-95 bg-primary/30",
      )}
      onMouseDown={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <span className="text-lg font-medium text-primary/80">{note.name}</span>
    </div>
  );
}