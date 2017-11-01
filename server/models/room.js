module.exports = class Room {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.events = data.events || [];
  }

  get currentEvent() {
    return this.events.find((event) => {
      return event.start < Date.now() && Date.now() <= event.end
    });
  }

  get futureEvents() {
    return this.events.filter((event) => {
      return Date.now() <= event.start;
    });
  }

  getEvent(eventId) {
    return this.events.find((event) => event.id === eventId);
  }

  isEqualsEvents(room) {
    const isEqualEventsLength = room.futureEvents.length === this.futureEvents.length;
    const isEqualEvents = room.futureEvents.every((event) => {
      const roomEvent = this.getEvent(event.id);

      return roomEvent && roomEvent.isEqual(event);
    });

    const isEqualCurrentEvent = !!room.currentEvent == !!this.currentEvent &&
      (room.currentEvent && room.currentEvent.isEqual(this.currentEvent));

    return isEqualEventsLength && isEqualEvents && isEqualCurrentEvent;
  }

  isEqual(room) {
    return room.name === this.name &&
      this.isEqualsEvents(room);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      currentEvent: this.currentEvent,
      futureEvents: this.futureEvents
    }
  }
};