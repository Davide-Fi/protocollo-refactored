import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-navy-charcoal">
      <Card className="w-full max-w-md mx-4 bg-steel-blue/10 border-steel-blue/30">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-white">404 - Pagina Non Trovata</h1>
          </div>

          <p className="mt-4 text-sm text-slate-300">
            La pagina che stai cercando non esiste o è stata spostata.
          </p>
          
          <div className="mt-6">
            <Link 
              href="/" 
              className="inline-flex items-center px-4 py-2 bg-scientific-blue hover:bg-scientific-blue/80 text-white rounded-md transition-colors"
            >
              Torna alla Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}