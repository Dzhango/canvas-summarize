waitForElm("#tab-attachments-tab").then((button) => {
    button.click();
    waitForElm('a[data-attachment-id]').then((elm) => {
        console.log('Element is ready');
        console.log(elm.href);
        fetch(elm.href)
            .then((res) => {
                return res.text();
            })
            .then(text => {
                fetchSummary(text)
                    .then(res => {
                        console.log(res);
                        const data = {
                            type: "Summary",
                            data: res.summary
                        };
                        updatePopup(data);
                    })
            });

    });
})

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}


async function fetchSummary(text) {
    const url = "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-43265deb-603c-4264-9cba-4c736a753b81/actions/cohere/summarize-text?blocking=true&result=true";
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic YmY0YmIzMzQtNTBiMS00MGQ2LTk2MjktNTc5MDc0ZGI0MTNiOjk4c2FsNHFJekxCOWlaRWJsOG1rckdVajd4RnpZbWlyQ3ZVQ0RycGtaTHdWdmVSajdyaVBXdHRZU2U1QWpwU0o="
        },
        body: JSON.stringify({ "text": text })
    })
    return response.json();
}

function updatePopup(data) {
    chrome.runtime.sendMessage(data, function(response) {
        console.log("text sent");
    });
}