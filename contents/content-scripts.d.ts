interface Window {
    __contentUrlHash: string,
    rangy: Rangy
}

interface Rangy {
    init: () => void;
    createHighlighter: () => RangyHighlighter;
    createClassApplier: (className: string, options: any) => RangyClassApplier;
}

interface RangyHighlighter {
    addClassApplier: (applier: RangyClassApplier) => void;
    getHighlightForElement: (context: any) => RangyHighlightElement;
    removeHighlights: (elements: RangyHighlightElement[]) => void;
    highlightSelection: (className: string) => void;
    serialize: () => string;
    deserialize: (input: string) => void;
}

interface RangyHighlightElement {
    id: string;
}

interface RangyClassApplier {

}
