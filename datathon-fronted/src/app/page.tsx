'use client';

import Image from 'next/image';
import logo from './logo.jpeg';
import { useState } from 'react';
import CircularProgress from '@/app/circular_progress';

// Définition du type pour les messages
type Message = {
  role: 'assistant' | 'user';
  content: string;
};

// Composant pour afficher le contenu initial lorsque la conversation est vide
const EmptyContent = () => {
  return (
    <div className="flex flex-col items-center justify-center p-24">
      <Image className="w-48 h-48 object-cover" src={logo} alt="robot" width={200} height={200} />
      <h1 className="font-black text-4xl mt-20">Bonjour</h1>
      <p className="mt-2 text-black/70">Je suis votre assistant support, je vous aide à trouver les réponses à vos questions.</p>
    </div>
  );
};

// Composant principal de la page d'accueil
export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Fonction pour récupérer la réponse de l'assistant
  const fetchResponse = async (question: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: question,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const assistantResponse: Message = {
        role: 'assistant',
        content: data.message,
      };

      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setLoading(false);
    }
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = () => {
    const input = document.getElementById('message') as HTMLTextAreaElement;
    const userMessage: Message = {
      role: 'user',
      content: input.value.trim(),
    };

    if (!userMessage.content) return; // Ne pas soumettre de message vide

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);
    fetchResponse(userMessage.content).then(() => console.log('Message sent successfully'));
    input.value = '';
  };

  return (
    <main className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center w-3/4 h-full relative overflow-hidden">
        <div className="w-full flex-1 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col items-start justify-center w-full bg-gray-100 p-3 rounded-xl my-2 ${
                  message.role === 'user' ? 'ml-auto w-3/4' : 'mr-auto w-3/4'
                }`}
              >
                <p className="text-black/70 text-sm">{message.role === 'user' ? 'Vous' : 'Assistant'}</p>
                <p className="text-black text-sm">{message.content}</p>
              </div>
            ))
          ) : (
            <EmptyContent />
          )}
          {loading && (
            <div className="w-full flex justify-center">
              <CircularProgress infinite={true} size={20} />
            </div>
          )}
          <div className="h-48 w-full"></div> {/* Espace pour éviter que le formulaire ne cache les messages */}
        </div>
        <div className="w-3/4 bg-white fixed bottom-0 p-5">
          <div className="relative">
            <textarea
              placeholder="Posez votre question ici..."
              className="resize-none w-full outline-none bg-gray-50 h-24 rounded-3xl border-2 border-gray-200 px-4 py-2 pr-20"
              name="message"
              id="message"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <button
              onClick={handleSubmit}
              className="absolute right-4 bottom-4 bg-black text-white py-2 px-6 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}