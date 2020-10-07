export class Task {
    id: string;
    text: string;
    isComplete: boolean;

    constructor(id:string, text: string, isComplete: boolean) {
        this.id = id;
        this.text = text;
        this.isComplete = isComplete;
    }
}