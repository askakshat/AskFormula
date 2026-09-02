import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, FileText, Bookmark, ArrowLeft, PlayCircle } from "lucide-react";
import { Link } from "react-router";
import { useLocalStorage, type SavedPDF } from "@/lib/local-storage";

export default function Dashboard() {
  const [selectedChapters] = useLocalStorage<string[]>("askformula-selected-chapters", []);
  const [savedPDFs] = useLocalStorage<SavedPDF[]>("askformula-saved-pdfs", []);
  const [favorites] = useLocalStorage<string[]>("askformula-favorites", []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-200">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/" className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors mb-2">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
              Your Dashboard
            </h1>
          </div>
        </header>

        <div className="bg-[#11131a] border border-[#272a31] rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-[#61dcb0]">⚡</span> Zero-Compute Practice Engine
                </h2>
                <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                    Test your knowledge with algorithmic multiple-choice questions generated instantly from your selected chapters. Works offline, no APIs required.
                </p>
            </div>
            <Link
                to="/quiz"
                className="shrink-0 bg-[#61dcb0] text-[#003122] h-11 px-8 rounded-lg font-bold hover:bg-[#72edc1] transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(97,220,176,0.15)]"
            >
                Start Practice <PlayCircle className="w-5 h-5" />
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-slate-800 bg-slate-900 shadow-none">
            <CardHeader>
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <FileText className="size-5" />
              </div>
              <CardTitle className="text-white">Generated PDFs</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-slate-400">
              {savedPDFs.length > 0 ? (
                <ul className="space-y-3">
                  {savedPDFs.map((pdf) => (
                    <li key={pdf.id} className="flex justify-between items-center border-b border-slate-800 pb-2 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium text-slate-300">{pdf.subject}</p>
                        <p className="text-xs text-slate-500">{new Date(pdf.date).toLocaleDateString()}</p>
                      </div>
                      <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400 capitalize">{pdf.layout}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No PDFs generated yet. Generate some from the home page!</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900 shadow-none">
            <CardHeader>
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                <Book className="size-5" />
              </div>
              <CardTitle className="text-white">Selected Chapters</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-slate-400">
              {selectedChapters.length > 0 ? (
                <ul className="space-y-2">
                  {selectedChapters.map((chapter) => (
                    <li key={chapter} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span className="truncate">{chapter}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>You haven't selected any chapters recently.</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900 shadow-none">
            <CardHeader>
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                <Bookmark className="size-5" />
              </div>
              <CardTitle className="text-white">Favorites</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-slate-400">
              {favorites.length > 0 ? (
                <ul className="space-y-2">
                  {favorites.map((fav) => (
                    <li key={fav} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="truncate">{fav}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>You haven't added any favorite formulas yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
