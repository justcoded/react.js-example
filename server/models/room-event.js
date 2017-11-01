module.exports = class RoomEvent {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.start = data.start;
    this.end = data.end;
  }

  isEqual(event) {
    return event.name === this.name &&
      event.start === this.start &&
      event.end === this.end;
  }
};