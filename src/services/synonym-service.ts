/* eslint-disable @typescript-eslint/no-non-null-assertion */
// @ts-ignore

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
        if (!this.parent.has(word)) {
            this.parent.set(word, word); // If word is not present, set it as its own parent
            this.size.set(word, 1);
            return word; // Return word as its own parent
        }
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

    buildGroups(wordPairs: [string, string][]) {
        for (const [parent, child] of wordPairs) {
            this.addWord(parent);
            this.addWord(child);
            this.union(parent, child);
        }
    }

    getSynonyms(word: string): string[] {
        const root = this.find(word);
        const associatedWords: string[] = [];

        for (const [currentWord,] of this.parent.entries()) {
            if (this.find(currentWord as string) === root) {
                associatedWords.push(currentWord as string);
            }
        }
        console.log(associatedWords)
        return associatedWords;
    }
}

const synonymWordService = new SynonymService();
export default synonymWordService;

// // Example usage:
// const unionFind = new UnionFind();
// const wordPairs: [string, string][] = [
//     ["apple", "red_apple"],
//     ["apple", "green_apple"],
//     ["orange", "orange_juice"],
//     ["kiwi", "kiwi_fruit"],
// ];

// for (const [parent, child] of wordPairs) {
//     unionFind.addWord(parent);
//     unionFind.addWord(child);
// }

// unionFind.buildGroups(wordPairs);

// console.log(unionFind.getGroups());
