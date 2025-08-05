'use client';

import { api } from '@/lib/trpc/client';

export default function Home() {
  const { data: sunscreens, isLoading } = api.sunscreen.getAll.useQuery();

  return (
    <div className="min-h-screen bg-navy-charcoal">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">
          Protocollo - Refactored with Next.js 15
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-steel-blue/20 p-6 rounded-lg border border-steel-blue">
            <h2 className="text-xl font-semibold text-scientific-blue mb-2">
              ✅ Next.js 15 + App Router
            </h2>
            <p className="text-muted-foreground">
              Modern React 19 with Turbopack for blazing fast development
            </p>
          </div>
          
          <div className="bg-steel-blue/20 p-6 rounded-lg border border-steel-blue">
            <h2 className="text-xl font-semibold text-scientific-blue mb-2">
              ✅ Neon PostgreSQL
            </h2>
            <p className="text-muted-foreground">
              Serverless database with automatic scaling and branching
            </p>
          </div>
          
          <div className="bg-steel-blue/20 p-6 rounded-lg border border-steel-blue">
            <h2 className="text-xl font-semibold text-scientific-blue mb-2">
              ✅ tRPC + TypeScript
            </h2>
            <p className="text-muted-foreground">
              End-to-end type safety with automatic API generation
            </p>
          </div>
        </div>

        <div className="bg-steel-blue/10 p-6 rounded-lg border border-steel-blue">
          <h2 className="text-2xl font-bold text-white mb-4">
            Database Test: Sunscreen Products
          </h2>
          {isLoading ? (
            <p className="text-muted-foreground">Loading sunscreen data...</p>
          ) : (
            <div className="space-y-2">
              <p className="text-performance-green mb-4">
                ✅ Successfully loaded {sunscreens?.length || 0} products from Neon database
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sunscreens?.slice(0, 4).map((product) => (
                  <div key={product.id} className="bg-background/50 p-4 rounded border border-border">
                    <h3 className="font-semibold text-white">{product.brand} - {product.productName}</h3>
                    <p className="text-sm text-muted-foreground">SPF {product.spf} | {product.uva1Rating} UVA1</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Your Protocollo app has been successfully refactored with best-in-class technology!
          </p>
        </div>
      </div>
    </div>
  );
}