import React from 'react';

export default function MessageBubble({ role, text }: { role: 'user' | 'model', text: string }) {
  const isUser = role === 'user';
  
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} my-4`}>
      <div 
        className={`max-w-[80%] rounded-2xl p-4 ${
          isUser 
            ? 'bg-blue-600 text-white rounded-br-sm' 
            : 'bg-zinc-800 text-zinc-200 border border-zinc-700/50 rounded-bl-sm shadow-sm'
        }`}
      >
        <div className="whitespace-pre-wrap text-sm leading-relaxed">{text}</div>
      </div>
    </div>
  );
}
