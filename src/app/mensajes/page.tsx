
'use client';

import { useState } from 'react';
import { users } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Send, Smile, MessageSquare, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const conversations = [
  {
    userId: 'user-2',
    messages: [
      { sender: 'user-2', text: '¡Hola! Vi que te interesa el piso de Gràcia. ¿Qué te parece si hablamos?', time: '10:30' },
      { sender: 'user-1', text: '¡Claro! Me encanta la zona. ¿Ya vives allí?', time: '10:31' },
    ],
    lastMessage: '¡Claro! Me encanta la zona...',
    unread: 0,
  },
  {
    userId: 'user-3',
    messages: [],
    lastMessage: 'Confirmación de solicitud de visita',
    unread: 1,
  },
  {
    userId: 'user-4',
    messages: [],
    lastMessage: '¡Hola! ¿Buscamos piso juntos?',
    unread: 0,
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const currentUser = users.find(u => u.id === 'user-1');

  if (!currentUser) return null;

  return (
    <div className="h-[calc(100vh-theme(height.14))] flex overflow-hidden">
      {/* Sidebar de conversaciones */}
      <aside
        className={cn(
          'w-full md:w-1/3 md:min-w-[300px] md:max-w-[400px] flex flex-col h-full border-r transition-transform duration-300 ease-in-out',
          selectedConversation ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
        )}
      >
        <Card className='h-full rounded-none border-t-0 border-l-0 border-b-0 flex flex-col'>
          <CardHeader className="p-4">
              <CardTitle className='text-2xl'>Chats</CardTitle>
              <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Buscar en chats..." className="pl-10" />
              </div>
          </CardHeader>
          <ScrollArea className="flex-grow">
            <div className="p-2">
              {conversations.map((conv) => {
                const user = users.find((u) => u.id === conv.userId);
                if (!user) return null;

                return (
                  <div
                    key={conv.userId}
                    onClick={() => setSelectedConversation(conv)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted`}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow overflow-hidden">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground">10:31</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </Card>
      </aside>

      {/* Panel de chat */}
      <main
        className={cn(
          'absolute inset-0 md:static flex flex-col h-full bg-background transition-transform duration-300 ease-in-out',
          selectedConversation ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        )}
      >
        {selectedConversation ? (
          <>
            {/* Header del chat */}
            <header className="flex items-center gap-4 p-2 md:p-4 border-b">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedConversation(undefined as any)}>
                <ArrowLeft />
              </Button>
              <Avatar>
                <AvatarImage src={users.find(u => u.id === selectedConversation.userId)?.avatarUrl} />
                <AvatarFallback>{users.find(u => u.id === selectedConversation.userId)?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{users.find(u => u.id === selectedConversation.userId)?.name}</p>
                <p className="text-sm text-muted-foreground">En línea</p>
              </div>
            </header>

            {/* Mensajes */}
            <ScrollArea className="flex-grow p-4 md:p-6">
              <div className="space-y-6">
                {selectedConversation.messages.map((msg, index) => {
                  const isCurrentUser = msg.sender === currentUser.id;
                  return (
                    <div key={index} className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                       {!isCurrentUser && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={users.find(u => u.id === msg.sender)?.avatarUrl} />
                            <AvatarFallback>{users.find(u => u.id === msg.sender)?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                      <div className={`max-w-md rounded-2xl px-4 py-3 ${isCurrentUser ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none'}`}>
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'} text-right`}>{msg.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Input de mensaje */}
            <footer className="p-4 border-t">
              <div className="relative">
                <Input placeholder="Escribe un mensaje..." className="h-12 pr-24 rounded-full" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Smile className="h-5 w-5" />
                    </Button>
                    <Button size="icon" className="rounded-full h-9 w-9">
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
              </div>
            </footer>
          </>
        ) : (
          <div className="hidden md:flex flex-col items-center justify-center h-full text-center">
            <MessageSquare className="h-24 w-24 text-muted-foreground/30" />
            <h2 className="mt-4 text-2xl font-semibold">Selecciona una conversación</h2>
            <p className="mt-2 text-muted-foreground">Elige a alguien de la lista para empezar a chatear.</p>
          </div>
        )}
      </main>
    </div>
  );
}
