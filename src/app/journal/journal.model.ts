export class Journal {
    constructor(
        public _id: { toString: () => string; },
        public date: number,
        public content: any
    ) {}
}