/**
 *
 * Event Types:-
 *  `runInput` happens when user clicked on Run Input button
 */

class ObserverClass {
  static instance;

  static getInstance() {
    if (!this.instance) this.instance = new ObserverClass();
    return this.instance;
  }

  constructor() {
    // {eventType: {key: {eventType: '', key: '', update: () => {}}}
    this.observers = {};
  }

  // observer: {eventType: '', key: '', update: () => {}}
  subescribe(newObserver) {
    if (
      newObserver &&
      newObserver.key &&
      newObserver.eventType &&
      newObserver.update
    ) {
      if (!this.observers[newObserver.eventType]) {
        this.observers[newObserver.eventType] = {};
      }

      this.observers[newObserver.eventType][newObserver.key] = newObserver;
    } else {
      if (!newObserver.key) {
        throw new Error("Must provide a key field to subsecribe to observable");
      }

      if (!newObserver.eventType) {
        throw new Error("Must provide a valid eventType to subsecribe");
      }

      if (!newObserver.update) {
        throw new Error("Must provide update function to get notified");
      }
    }
  }

  unSubescribe(eventType, key) {
    if (!this.observers?.[eventType]) {
      throw new Error("Must be a valid eventType");
    }

    if (!key) {
      throw new Error("Must provide a key to unSubescribe");
    }

    const objserver = this.observers?.[eventType][key];
    const unSubescribed = delete this.observers?.[eventType][key];

    if (!unSubescribed) {
      console.error("not a known observer");
    }

    return { objserver, unSubescribed };
  }

  /**
   *
   * @param {string} eventType
   * @param {object} payload {eventType: string}
   */
  notify(eventType, payload) {
    if (!eventType) {
      throw new Error("Must pass eventType to notify");
    }

    if (!payload?.eventType) {
      throw new Error("Must pass payload and it's event type");
    }

    if (!this.observers[eventType]) {
      console.warn("No Observers found with eventType of", eventType);
    }

    const observers = Object.values(this.observers);

    observers.forEach((observer) => {
      const elements = Object.values(observer);

      if (
        (!elements || typeof elements !== "object" || elements.length <= 0) &&
        this.observers[eventType]
      ) {
        console.warn("No observers to notify");
      } else {
        elements.forEach((element) => element.update(eventType, payload));
      }
    });
  }
}

export const Observable = ObserverClass.getInstance();
