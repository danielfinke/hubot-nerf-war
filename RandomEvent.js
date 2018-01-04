/**
 * Contains information about a random event and its scheduling. Methods are
 * provided to manipulate the event.
 *
 * @author Daniel Finke <danielfinke2011@gmail.com>
 * @since 1.0.0
 */
class RandomEvent {
    constructor() {
        this.name = null;
        this.earlyAnnounce = false;
        this.earlyAnnounceInterval = 0;
    }

    toString() {
        return this.name;
    }
}

module.exports = RandomEvent;
