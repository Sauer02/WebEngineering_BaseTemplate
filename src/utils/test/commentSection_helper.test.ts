import { describe, it, expect } from 'vitest';
import { resetFormFields } from '../commentSection_helper';

describe('resetFormFields', () => {
  it('should reset the name and comment fields to empty strings', () => {
    const nameField: Partial<HTMLInputElement> = {
      value: 'John Doe',
    };
    const commentField: Partial<HTMLTextAreaElement> = {
      value: 'This is a comment',
    };

    resetFormFields(
      nameField as HTMLInputElement,
      commentField as HTMLTextAreaElement
    );

    expect(nameField.value).toBe('');
    expect(commentField.value).toBe('');
  });
});
