import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, Package, FileCode } from "lucide-react";

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-navy-charcoal text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Download Protocollo Source Code</h1>
        
        <div className="space-y-6">
          <div className="bg-steel-blue/20 border border-steel-blue/30 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <FileCode className="text-scientific-blue h-8 w-8 mt-1" />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">Source Code Only (Recommended)</h2>
                <p className="text-slate-300 mb-4">
                  Clean source code with all components, pages, and styles. No build artifacts or dependencies.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Size: 1.4 MB</span>
                  <a href="/protocollo-source-only.tar.gz" download>
                    <Button className="bg-scientific-blue hover:bg-scientific-blue/80">
                      <Download className="mr-2 h-4 w-4" />
                      Download Source
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-steel-blue/20 border border-steel-blue/30 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <Package className="text-performance-green h-8 w-8 mt-1" />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">Complete Backup</h2>
                <p className="text-slate-300 mb-4">
                  Full project backup including all configuration files. Larger size but complete.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Size: 179 MB</span>
                  <a href="/protocollo-clean-backup.tar.gz" download>
                    <Button variant="outline" className="border-slate-600 hover:border-scientific-blue">
                      <Download className="mr-2 h-4 w-4" />
                      Download Full
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-navy-dark/50 border border-steel-blue/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Installation Instructions</h3>
          <ol className="space-y-3 text-slate-300">
            <li className="flex">
              <span className="text-scientific-blue mr-3">1.</span>
              Extract the archive: <code className="ml-2 bg-steel-blue/30 px-2 py-1 rounded text-sm">tar -xzf protocollo-source-only.tar.gz</code>
            </li>
            <li className="flex">
              <span className="text-scientific-blue mr-3">2.</span>
              Install dependencies: <code className="ml-2 bg-steel-blue/30 px-2 py-1 rounded text-sm">npm install</code>
            </li>
            <li className="flex">
              <span className="text-scientific-blue mr-3">3.</span>
              Run development: <code className="ml-2 bg-steel-blue/30 px-2 py-1 rounded text-sm">npm run dev</code>
            </li>
            <li className="flex">
              <span className="text-scientific-blue mr-3">4.</span>
              Build for production: <code className="ml-2 bg-steel-blue/30 px-2 py-1 rounded text-sm">npm run build</code>
            </li>
          </ol>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-scientific-blue hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}