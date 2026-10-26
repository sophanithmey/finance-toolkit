import { useState } from 'react';
import { Check, Image as ImageIcon, Share2 } from 'lucide-react';

import Button from '../../../components/ui/button';
import type { ExpenseSummary } from '../../../utils/helper';
import type { Friend } from '../types';
import {
  formatExpenseSummaryText,
  generateExpenseSummaryImage,
} from '../share-utils';

interface Props {
  readonly friends: Friend[];
  readonly summary: ExpenseSummary;
}

export default function ShareActions({ friends, summary }: Props) {
  const [copiedText, setCopiedText] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const handleShareText = async () => {
    const text = formatExpenseSummaryText(friends, summary);

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Expense Split Summary',
          text,
        });
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
      }
    }

    await navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleShareImage = async () => {
    setIsGeneratingImage(true);
    try {
      const blob = await generateExpenseSummaryImage(friends, summary);
      const filename = `expense-settlement-${new Date().toISOString().split('T')[0]}.png`;
      const file = new File([blob], filename, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'Expense Split Settlement',
            text: 'Here is our expense settlement summary.',
            files: [file],
          });
          return;
        } catch (err) {
          if ((err as Error).name === 'AbortError') return;
        }
      }

      // Download fallback
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <Button
        type='button'
        variant='outline'
        size='sm'
        onClick={handleShareText}
        className={copiedText ? 'border-emerald-300 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40' : ''}
      >
        {copiedText ? (
          <>
            <Check size={14} className='text-emerald-600' />
            <span>Copied Text!</span>
          </>
        ) : (
          <>
            <Share2 size={14} />
            <span>Share Text</span>
          </>
        )}
      </Button>

      <Button
        type='button'
        variant='outline'
        size='sm'
        disabled={isGeneratingImage}
        onClick={handleShareImage}
        className='border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-950/50'
      >
        {isGeneratingImage ? (
          <>
            <span className='h-3 w-3 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent' />
            <span>Rendering...</span>
          </>
        ) : (
          <>
            <ImageIcon size={14} />
            <span>Save / Share Image</span>
          </>
        )}
      </Button>
    </div>
  );
}
