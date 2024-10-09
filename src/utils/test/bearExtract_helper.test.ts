import { describe, it, expect } from 'vitest';
import { extractMatch, cleanFileName } from '../bearExtract_helper';

describe('extractMatch', () => {
  it('should extract the first match based on the regex', () => {
    const row = '|name=[[Grizzly bear]]';
    const regex = /\|name=\[\[(.*?)\]\]/;
    const result = extractMatch(row, regex);
    expect(result).toBe('Grizzly bear');
  });
});

describe('cleanFileName', () => {
  it('should remove the "File:" prefix from the file name and trim any extra spaces', () => {
    const fileName = 'File:GrizzlyBear.png ';
    const result = cleanFileName(fileName);
    expect(result).toBe('GrizzlyBear.png');
  });
});
