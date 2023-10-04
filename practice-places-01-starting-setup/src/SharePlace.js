import { Map } from "./UI/Map";
import { Modal } from "./UI/Modal";
import { getCurrentPosition, getAddressFromPosition } from "./utility/Location";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.shareBtn = document.getElementById("share-btn");
    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
    this.shareBtn.addEventListener("click", this.sharePlaceHandler);
  }

  sharePlaceHandler() {
    const shareLinkInputEle = document.getElementById("share-link");

    if (!navigator.clipboard) {
      shareLinkInputEle.select();
      return;
    }

    navigator.clipboard
      .writeText(shareLinkInputEle.value)
      .then(() => alert("copied to clipboard"))
      .catch(() => {
        console.log("some error happed");
        shareLinkInputEle.select();
      });
  }

  selectPlace(cordinates, address) {
    if (this.map) {
      this.map.render(cordinates);
    } else {
      this.map = new Map(cordinates);
    }
    this.shareBtn.disabled = false;
    const shareLinkInputEle = document.getElementById("share-link");
    shareLinkInputEle.value = `${
      location.origin
    }/my-place/?location=${encodeURI(address)}&lat=${cordinates.lat}&lng=${
      cordinates.lng
    }`;
  }

  locateUserHandler() {
    let modal = new Modal("loading-modal-content", "feature not available");

    if (!navigator.geolocation) {
      alert("Geo location not support by your Browser");
      return;
    }
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async (sucessRes) => {
        const cordinates = {
          lat: sucessRes.coords.latitude,
          lng: sucessRes.coords.longitude,
        };

        const addr = await getAddressFromPosition(cordinates);
        modal.hide();
        this.selectPlace(cordinates, addr);
        console.log(cordinates);
      },
      (error) => {
        modal.hide();
        alert("Could not locate you , please enter location manually");
      }
    );
  }

  async findAddressHandler(event) {
    event.preventDefault();
    console.log(event);
    const address = event.target.querySelector("input").value;
    console.log(address);

    if (!address || address.length === 0) {
      alert("invalid address provided");
      return;
    }

    let modal = new Modal("loading-modal-content", "feature not available");
    modal.show();
    try {
      const cords = await getCurrentPosition(address);
      this.selectPlace(cords, address);
    } catch (err) {
      alert(err.message);
    }
    modal.hide();
  }
}

new PlaceFinder();
