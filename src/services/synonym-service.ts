
export class SynonymService {

    parent: Map<string, string>;
    size: Map<string, number>;

    constructor() {
        this.parent = new Map<string, string>();
        this.size = new Map<string, number>();
    }

    addWord(word: string) {
        if (!this.parent.has(word)) {
            this.parent.set(word, word);
            this.size.set(word, 1);
        }
    }

    union(word1: string, word2: string) {
        let root1 = this.find(word1);
        let root2 = this.find(word2);

        if (root1 === root2) return; // Already in the same group

        if (this.size.get(root1)! < this.size.get(root2)!) {
            [root1, root2] = [root2, root1]; // Swap roots to balance tree
        }

        this.parent.set(root2, root1);
        this.size.set(root1, this.size.get(root1)! + this.size.get(root2)!);
    }

    find(word: string): string {
        if(!this.parent.get(word)) return '';
        if (word !== this.parent.get(word)) {
            this.parent.set(word, this.find(this.parent.get(word)!));
        }
        return this.parent.get(word)!;
    }

    getGroups(): Map<string, string[]> {
        const groups: Map<string, string[]> = new Map<string, string[]>();

        for (const word of this.parent.keys()) {
            const root = this.find(word as string);
            if (!groups.has(root)) {
                groups.set(root, []);
            }
            groups.get(root)!.push(word as string);
        }

        return groups;
    }

    // given a canonical word and its synonyms, add them to the service and unify them, if they are not already present create them, if they are already unified, do nothing
    addSynonyms(synonyms: {parent: string, children: string[]}) {
        const { parent, children } = synonyms;
        this.addWord(parent);
        for(const child of children) {
            this.addWord(child);
            this.union(parent, child);
        }
    }

    getSynonyms(word: string): string[] | null {
        const root = this.find(word);
        if(!root) return null;

        const associatedWords: string[] = [];

        for (const [currentWord,] of this.parent.entries()) {
            if (this.find(currentWord as string) === root) {
                associatedWords.push(currentWord as string);
            }
        }
        return associatedWords;
    }
}

const synonymWordService = new SynonymService();
export default synonymWordService;