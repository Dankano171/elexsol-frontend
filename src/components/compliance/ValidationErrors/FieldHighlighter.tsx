'use client';

import { useEffect } from 'react';
import { ValidationError } from '@/types/compliance';

interface FieldHighlighterProps {
  errors: ValidationError[];
}

export function FieldHighlighter({ errors }: FieldHighlighterProps) {
  useEffect(() => {
    // Add highlight class to error fields
    errors.forEach((error) => {
      const elements = document.querySelectorAll(`[data-field="${error.field}"]`);
      elements.forEach((el) => {
        el.classList.add('ring-2', 'ring-error', 'ring-offset-2');
      });
    });

    // Cleanup
    return () => {
      errors.forEach((error) => {
        const elements = document.querySelectorAll(`[data-field="${error.field}"]`);
        elements.forEach((el) => {
          el.classList.remove('ring-2', 'ring-error', 'ring-offset-2');
        });
      });
    };
  }, [errors]);

  return null;
}
