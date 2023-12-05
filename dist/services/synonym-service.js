"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynonymService = void 0;
class SynonymService {
    constructor() {
        this.parent = new Map();
        this.size = new Map();
    }
    addWord(word) {
        if (!this.parent.has(word)) {
            this.parent.set(word, word);
            this.size.set(word, 1);
        }
    }
    union(word1, word2) {
        let root1 = this.find(word1);
        let root2 = this.find(word2);
        if (root1 === root2)
            return; // Already in the same group
        if (this.size.get(root1) < this.size.get(root2)) {
            [root1, root2] = [root2, root1]; // Swap roots to balance tree
        }
        this.parent.set(root2, root1);
        this.size.set(root1, this.size.get(root1) + this.size.get(root2));
    }
    find(word) {
        if (!this.parent.get(word))
            return '';
        if (word !== this.parent.get(word)) {
            this.parent.set(word, this.find(this.parent.get(word)));
        }
        return this.parent.get(word);
    }
    getGroups() {
        const groups = new Map();
        for (const word of this.parent.keys()) {
            const root = this.find(word);
            if (!groups.has(root)) {
                groups.set(root, []);
            }
            groups.get(root).push(word);
        }
        return groups;
    }
    // given a canonical word and its synonyms, add them to the service and unify them, if they are not already present create them
    addSynonyms(synonyms) {
        const { parent, children } = synonyms;
        this.addWord(parent);
        for (const child of children) {
            this.addWord(child);
            this.union(parent, child);
        }
    }
    getSynonyms(word) {
        const root = this.find(word);
        if (!root)
            return null;
        const associatedWords = [];
        for (const [currentWord,] of this.parent.entries()) {
            if (this.find(currentWord) === root) {
                associatedWords.push(currentWord);
            }
        }
        return associatedWords;
    }
}
exports.SynonymService = SynonymService;
const synonymWordService = new SynonymService();
exports.default = synonymWordService;
