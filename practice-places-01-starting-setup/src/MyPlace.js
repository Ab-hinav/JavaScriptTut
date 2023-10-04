import { Map } from "./UI/Map";

class MyPlace {
  constructor(coords, location) {
    new Map(coords);
    const headerTitleEle = document.querySelector("header h1");
    headerTitleEle.textContent = location;
  }
}

const url = new URL(window.location.href);
const queryParams = url.searchParams;
const cords = {
  lat: parseFloat(queryParams.get("lat")),
  lng: +queryParams.get("lng"),
};
const addr = queryParams.get("address");
new MyPlace(cords, addr);
