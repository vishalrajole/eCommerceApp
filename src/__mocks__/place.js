class Place {
  constructor(id, title, ownerId, imageUri, address, lat, long) {
    this.id = id;
    this.title = title;
    this.imageUri = imageUri;
    this.ownerId = ownerId;
    this.address = address;
    this.lat = lat;
    this.long = long;
  }
}

export default Place;
