const storageKey = 'highliteUrls';
const urlHash = window.__contentUrlHash ?? window.location.href;

const getUrlMap = () => {
    return JSON.parse(window.localStorage.getItem(storageKey) ?? '{}');
}

window.onload = function() {
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
                    if (window.confirm("Delete this note (ID " + highlight.id + ")?")) {
                        highlighter.removeHighlights( [highlight] );
                    }
                    return false;
                }
            }
        }));

        window.addEventListener('mouseup', (event) => {
            const sel = window.getSelection();
            if (sel.extendOffset !== sel.anchorOffset){
                highlighter.highlightSelection("highlight");
                const serialized = highlighter.serialize();

                const urlMap = getUrlMap();
                if (!urlMap[urlHash]) {
                    urlMap[urlHash] = '';
                }
                urlMap[urlHash] = serialized;
                window.localStorage.setItem(storageKey, JSON.stringify(urlMap));

                window.getSelection().removeAllRanges();
            }
        });

        const savedUrlMap = getUrlMap()[urlHash];
        console.log("SAVED URL MAP", savedUrlMap);
        if (savedUrlMap) {
            highlighter.deserialize(savedUrlMap);
        }
    }
}