import { Card } from "@/components/ui/card";
import { PianoGrid } from "@/components/PianoGrid";
import { MusicIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background p-4 md:p-8">
      <Card className="mx-auto max-w-3xl p-4 md:p-6">
        <div className="flex items-center gap-2 mb-6">
          <MusicIcon className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Piano Soundboard</h1>
        </div>
        <PianoGrid />
      </Card>
    </div>
  );
}
