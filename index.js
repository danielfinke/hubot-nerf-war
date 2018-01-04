// Description
//   Hubot script for scheduling events to be performed at a random time within a window
//
// Configuration:
//   LIST_OF_ENV_VARS_TO_SET
//
// Commands:
//   hubot hello - <what the respond trigger does>
//   orly - <what the hear trigger does>
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   Daniel Finke <danielfinke2011@gmail.com>

const Conversation = require('hubot-conversation');
const RandomEvent = require('./RandomEvent.js');

module.exports = (robot) => {
    const conversationMgr = new Conversation(robot);

    /**
     * Get existing events from the robot brain
     *
     * @return {RandomEvent[]} The existing events
     */
    function getEvents() {
        return robot.brain.get('events') || [];
    }

    /**
     * Update the array of existing events in the robot brain
     *
     * @param {RandomEvent[]} events The new array of existing events
     */
    function setEvents(events) {
        robot.brain.set('events', events);
    }

    /**
     * Save an event into the robot brain
     *
     * @param {RandomEvent} event The event to save
     */
    function saveEvent(event) {
        const events = getEvents();
        events.push(event);
        robot.brain.set('events', events);
    }

    /**
     * Output a formatted list of existing events
     */
    robot.respond(/list random events/i, res => {
        const events = getEvents();
        if(events.length > 0) {
            let message = 'Here are the currently scheduled random events:\n';
            events.forEach(event => {
                message += event + '\n';
            });
            res.send(message);
        }
        else {
            res.send('There are no random events scheduled.');
        }
    });

    /**
     * Schedule a new random event
     */
    robot.respond(/schedule random event/i, res => {
        res.send('What do you want the event to be called?');

        const dialog = conversationMgr.startDialog(res);
        dialog.addChoice(/.*/, res => {
            handleNameEvent(dialog, res);
        });
    });

    /**
     * Respond to a request to name a new event.
     *
     * @param {Dialog} dialog The ongoing dialog between robot and user
     * @param {Object} res Robot-provided res object
     */
    function handleNameEvent(dialog, res) {
        // DUMMY
        res.send('You said the event should be called: ' + res.match[0]);
    }

    /**
     * Delete an existing event
     */
    robot.respond(/delete random event/i, res => {
        // DUMMY
        const events = getEvents();
        events.pop();
        setEvents(events);
    });
};
