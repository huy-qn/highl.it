import {getAllHighlightedUrls, getHighlights, setHighlights} from "./database";

const rangy = window.rangy;
const urlHash = window.__contentUrlHash ?? window.location.href;

const isSelection = (input: Selection | null): input is Selection => {
    return (input as Selection).addRange !== undefined;
}

window.onload = async function() {
    if (rangy) {
        rangy.init();
        const highlighter = rangy.createHighlighter();

        highlighter.addClassApplier(rangy.createClassApplier("highlight", {
            ignoreWhiteSpace: true,
            tagNames: ["span", "a"],
            elementProperties: {
                href: "#",
                onclick: function() {
                    var highlight = highlighter.getHighlightForElement(this);
                    if (window.confirm("Delete this highlight? #" + highlight.id)) {
                        highlighter.removeHighlights( [highlight] );
                    }
                    return false;
                }
            }
        }));

        window.addEventListener('mouseup', (event) => {
            const sel = window.getSelection();
            if (isSelection(sel)) {
                if (sel.focusOffset !== sel.anchorOffset){
                    highlighter.highlightSelection("highlight");
                    const serialized = highlighter.serialize();
                    setHighlights(urlHash, serialized);
                    window.getSelection()?.removeAllRanges();
                }
            }
        });

        const savedHighlights = await getHighlights(urlHash);
        if (savedHighlights) {
            highlighter.deserialize(savedHighlights);
        }
    }
}
