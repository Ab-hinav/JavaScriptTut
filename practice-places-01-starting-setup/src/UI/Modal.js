export class Modal {
  constructor(contentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.modaltemplate = document.getElementById("modal-template");
    this.contentTemplateEl = document.getElementById(contentId);
  }

  show() {
    if ("content" in document.createElement("template")) {
      const modalcontents = document.importNode(
        this.modaltemplate.content,
        true
      );
      this.modalEle = modalcontents.querySelector(".modal");
      this.backDropEle = modalcontents.querySelector(".backdrop");
      const contentEle = document.importNode(
        this.contentTemplateEl.content,
        true
      );

      this.modalEle.appendChild(contentEle);
      document.body.insertAdjacentElement("afterbegin", this.modalEle);
      document.body.insertAdjacentElement("afterbegin", this.backDropEle);
    } else {
      alert("templates not supported");
    }
  }

  hide() {
    if (this.modalEle) {
      this.modalEle.remove();
      document.body.removeChild(this.backDropEle);
      this.modalEle = null;
      this.backDropEle = null;
    }
  }
}
