chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    const { type, data } = message;

    if (type === "Summary") {
        console.log("got the summary event");
        updateDOM(data);
    }
});

function updateDOM(text) {
    const spinner = document.querySelector("div");
    text = text.replaceAll("-", "");
    text = text.replaceAll("\n", "");
    const textArr = text.split(".");
    const ul = document.querySelector("ul");
    textArr.pop();
    textArr.forEach(element => {
        const li = document.createElement("li");
        li.innerText = element;
        ul.appendChild(li);
    });
    spinner.classList.add("removed");

}