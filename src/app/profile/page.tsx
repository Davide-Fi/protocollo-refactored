import { auth, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Il Mio Profilo</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informazioni Personali</CardTitle>
          <CardDescription>I tuoi dati di registrazione</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || 'Profile'}
                width={64}
                height={64}
                className="rounded-full"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {session.user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold">{session.user?.name}</h2>
              <p className="text-gray-600">{session.user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-500">Ruolo</p>
              <p className="font-medium capitalize">{session.user?.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">ID Utente</p>
              <p className="font-mono text-sm">{session.user?.id?.slice(0, 8)}...</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Sicurezza</CardTitle>
          <CardDescription>Gestisci le tue impostazioni di sicurezza</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            Cambia Password
          </Button>
          <Button variant="outline" className="w-full">
            Gestisci Autenticazione a Due Fattori
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sessione</CardTitle>
          <CardDescription>Gestisci la tua sessione corrente</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
          >
            <Button type="submit" variant="destructive" className="w-full">
              Esci
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}