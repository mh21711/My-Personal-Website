'use client';

import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  isRTL: boolean;
}

const WHATSAPP_NUMBER = '01273501583'; // Replace with your actual WhatsApp number

export function WhatsAppButton({ isRTL }: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <button
        onClick={handleWhatsAppClick}
        aria-label="Contact us on WhatsApp"
        className={cn(
          'cursor-pointer fixed bottom-25 sm:bottom-15 z-40 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce',
          isRTL ? 'left-8' : 'right-8'
        )}
      >
        <MessageCircle size={24} />
      </button>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </>
  );
}
