import { SynonymService } from "../../services/synonym-service";

describe('SynonymService Class', () => {
    let synonym: SynonymService;

    beforeEach(() => {
        synonym = new SynonymService();
    });

    it('should add words correctly', () => {
        synonym.addWord('apple');
        synonym.addWord('banana');
        synonym.addWord('orange');
        console.log(synonym.parent)
        expect(synonym.parent.size).toBe(3);
    });

    it('should perform union correctly', () => {
        synonym.addWord('apple');
        synonym.addWord('banana');
        synonym.addWord('orange');

        synonym.union('apple', 'banana');
        synonym.union('orange', 'banana');

        expect(synonym.find('apple')).toBe(synonym.find('orange'));
        expect(synonym.find('apple')).toBe(synonym.find('banana'));
    });

    it('should return associated words correctly', () => {
        synonym.addWord('apple');
        synonym.addWord('banana');
        synonym.addWord('orange');
        synonym.addWord('kiwi');

        synonym.union('apple', 'banana');
        synonym.union('orange', 'kiwi');

        expect(synonym.getSynonyms('apple')).toEqual(['apple', 'banana']);
        expect(synonym.getSynonyms('orange')).toEqual(['orange', 'kiwi']);
        expect(synonym.getSynonyms('banana')).toEqual(['apple', 'banana']);
    });

    it('should add synonyms as key and list correctly', () => {
        synonym.addSynonyms({parent: 'blue', children: ['azure', 'cerulean', 'cobalt', 'indigo', 'navy', 'sapphire']});
        
        expect(synonym.getSynonyms('blue')).toEqual(expect.arrayContaining(['azure', 'cerulean', 'cobalt', 'indigo', 'navy', 'sapphire', 'blue']));
    });
});