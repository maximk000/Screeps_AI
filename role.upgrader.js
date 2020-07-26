var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //creep.moveTo(Game.spawns['Spawn1'].room);

        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
            creep.say('harvest')
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
            creep.say('upgrade')
        }

        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working == true) {
            // instead of upgraderController we could also use:
            // if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

            // try to upgrade the controller
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // if not in range, move towards the controller
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE){
                creep.moveTo(source);
            }
        }
    }
};

module.exports = roleUpgrader;
