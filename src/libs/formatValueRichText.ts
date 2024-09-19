const formatValueRichText = (value: string): string => {
    // format value richtext for values image;
    let formatHTML = "";
    const eContainer = document.createElement("div");
    eContainer.innerHTML = value;
    const elementsChildren = Array.from(eContainer.children);

    elementsChildren.forEach((element) => {
        if (element.tagName === "TABLE") {
            formatHTML += `<div class="text-editor-table table-container">${element.outerHTML}</div>`;
        }

        const eImages = element.querySelectorAll("img");
        const eIframes = element.querySelectorAll("iframe");
        if (element.tagName !== "TABLE" && (element.textContent || eImages.length > 0 || eIframes.length > 0)) {
            formatHTML += element.outerHTML;
        }
        // TH element không có nội dung thì sẽ không được add!
    });

    return formatHTML;
};

export default formatValueRichText;
