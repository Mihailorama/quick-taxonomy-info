import { fasbCodificationRegex, toSearchQuery } from '../taxonomy-search-query';

describe('taxonomy-search-query', () => {

  describe('fasbCodificationRegex', () => {

    it('does not match a single number', () => {
      const result = fasbCodificationRegex.exec('740');

      expect(result).toBeFalsy();
    });

    it('matches a 2 part reference', () => {
      const result = fasbCodificationRegex.exec('740-10');

      expect(result).toBeTruthy();
    });

    it('matches a 3 part reference', () => {
      const result = fasbCodificationRegex.exec('740-10-S99');

      expect(result).toBeTruthy();
    });

    it('matches a 4 part reference (yes, there are refs to paragraphs over 99)', () => {
      const result = fasbCodificationRegex.exec('740-10-S99-217');

      expect(result).toBeTruthy();
    });

    it('does not match a 5 part reference (i.e. with subparagraph)', () => {
      const result = fasbCodificationRegex.exec('740-10-S99-1(a)');

      expect(result).toBeFalsy();
    });

    it('does not match a reference with preamble', () => {
      const result = fasbCodificationRegex.exec('FASB ASC Subtopic 740-10');

      expect(result).toBeFalsy();
    });
  });

  describe('to-search-query', () => {

    const examplarParts = [
      {
        id: 42,
        localName: 'Topic',
        namespace: 'ignored',
      },
      {
        id: 43,
        localName: 'SubTopic',
        namespace: 'ignored',
      },
      {
        id: 44,
        localName: 'Section',
        namespace: 'ignored',
      },
      {
        id: 45,
        localName: 'Paragraph',
        namespace: 'ignored',
      },
      {
        id: 46,
        localName: 'SubParagraph', // Unused
        namespace: 'ignored',
      },
    ];

    it('does a normal search if the search does not look like a FASB codification ref', () => {
      const result = toSearchQuery(examplarParts, 'Badgers');

      expect(result).toEqual({search: 'Badgers'});
    });

    it('does a normal search if the taxonomy does not have the necessary parts', () => {
      const result = toSearchQuery(examplarParts.slice(1, 3), '740-10');

      expect(result).toEqual({search: '740-10'});
    });

    it('does a reference part search for Topic-SubTopic', () => {
      const result = toSearchQuery(examplarParts, '740-10');

      expect(result).toEqual({
        referenceParts: [
          {
            id: 42,
            value: '740',
          },
          {
            id: 43,
            value: '10',
          },
        ],
        search: '740-10',
      });
    });

    it('does a reference part search for Topic-SubTopic-Section-Paragraph', () => {
      const result = toSearchQuery(examplarParts, '740-10-S99-1');

      expect(result).toEqual({
        referenceParts: [
          {
            id: 42,
            value: '740',
          },
          {
            id: 43,
            value: '10',
          },
          {
            id: 44,
            value: 'S99',
          },
          {
            id: 45,
            value: '1',
          },
        ],
        search: '740-10-S99-1',
      });
    });
  });
});
