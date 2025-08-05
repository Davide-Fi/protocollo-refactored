import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { db } from '@/lib/db';
import { newsletters, consultations } from '@/lib/db/schema';
import { eq, desc, count } from 'drizzle-orm';

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/auth/signin');
  }

  // Get dashboard stats if user is admin or editor
  let stats = null;
  if (session.user?.role === 'admin' || session.user?.role === 'editor') {
    const [newsletterCount] = await db
      .select({ count: count() })
      .from(newsletters)
      .where(eq(newsletters.subscribed, true));
    
    const [consultationCount] = await db
      .select({ count: count() })
      .from(consultations)
      .where(eq(consultations.status, 'pending'));

    const recentConsultations = await db
      .select()
      .from(consultations)
      .orderBy(desc(consultations.createdAt))
      .limit(5);

    stats = {
      newsletterSubscribers: newsletterCount?.count || 0,
      pendingConsultations: consultationCount?.count || 0,
      recentConsultations,
    };
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Benvenuto, {session.user?.name}!
        </h1>
        <p className="text-gray-600">
          Ruolo: <span className="font-medium capitalize">{session.user?.role}</span>
        </p>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Newsletter</CardTitle>
              <CardDescription>Iscritti attivi</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.newsletterSubscribers}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Consulenze</CardTitle>
              <CardDescription>In attesa</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.pendingConsultations}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Azioni Rapide</CardTitle>
              <CardDescription>Gestione</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {session.user?.role === 'admin' && (
                <Link href="/admin">
                  <Button className="w-full">Pannello Admin</Button>
                </Link>
              )}
              <Link href="/profile">
                <Button variant="outline" className="w-full">Profilo</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}

      {stats?.recentConsultations && stats.recentConsultations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Consulenze Recenti</CardTitle>
            <CardDescription>Ultime richieste ricevute</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentConsultations.map((consultation) => (
                <div 
                  key={consultation.id} 
                  className="border-b pb-4 last:border-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {consultation.firstName} {consultation.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{consultation.email}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Interesse: <span className="capitalize">{consultation.interest}</span>
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      consultation.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : consultation.status === 'contacted'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {consultation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!stats && (
        <Card>
          <CardHeader>
            <CardTitle>Area Utente</CardTitle>
            <CardDescription>
              Accedi alle tue funzionalità personalizzate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Benvenuto nella tua area riservata. Da qui puoi:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Gestire il tuo profilo</li>
              <li>Visualizzare le tue richieste di consulenza</li>
              <li>Accedere a contenuti esclusivi</li>
            </ul>
            <Link href="/profile">
              <Button>Vai al Profilo</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}