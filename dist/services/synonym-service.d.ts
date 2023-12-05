export declare class SynonymService {
    parent: Map<string, string>;
    size: Map<string, number>;
    constructor();
    addWord(word: string): void;
    union(word1: string, word2: string): void;
    find(word: string): string;
    getGroups(): Map<string, string[]>;
    addSynonyms(synonyms: {
        parent: string;
        children: string[];
    }): void;
    getSynonyms(word: string): string[] | null;
}
declare const synonymWordService: SynonymService;
export default synonymWordService;
//# sourceMappingURL=synonym-service.d.ts.map