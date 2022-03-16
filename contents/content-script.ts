import {getHighlights, setHighlights} from "./database";

let highlighter: RangyHighlighter;
const rangy = window.rangy;
const urlHash = window.__contentUrlHash ?? window.location.href;

const isSelection = (input: Selection | null): input is Selection => {
    return (input as Selection).addRange !== undefined;
}

const highlightUpdated = () => {
    const serialized = highlighter?.serialize();
    setHighlights(urlHash, serialized);
};

window.onload = async function() {
    if (rangy) {
        rangy.init();
        highlighter = rangy.createHighlighter();

        highlighter.addClassApplier(rangy.createClassApplier("highlight", {
            ignoreWhiteSpace: true,
            tagNames: ["span", "a"],
            elementProperties: {
                href: "#",
                onclick: function() {
                    var highlight = highlighter?.getHighlightForElement(this);
                    if (window.confirm("Delete this highlight? #" + highlight.id)) {
                        highlighter?.removeHighlights( [highlight] );
                        highlightUpdated();
                    }
                    return false;
                }
            }
        }));

        const savedHighlights = await getHighlights(urlHash);
        if (savedHighlights) {
            highlighter.deserialize(savedHighlights);
        }
    }
};

window.addEventListener('mouseup', (event) => {
    const sel = window.getSelection();
    if (isSelection(sel)) {
        if (sel.focusOffset !== sel.anchorOffset){
            highlighter?.highlightSelection("highlight");
            highlightUpdated();
            window.getSelection()?.removeAllRanges();
        }
    }
});