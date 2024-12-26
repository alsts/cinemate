import { Info, Play } from 'lucide-react'
import { Button } from './ui/button'

export function MovieActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1C1B33]">
      <div className="flex justify-center max-w-[280px] mx-auto">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-[#2D2B45] text-[#9333EA] hover:bg-[#2D2B45]/80 mx-2"
        >
          <Play className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-[#2D2B45] text-[#10B981] hover:bg-[#2D2B45]/80 mx-2"
        >
          <Info className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
