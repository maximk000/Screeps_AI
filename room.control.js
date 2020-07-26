var roomControl = {
    
    /** @param {Creep} creep **/
    run: function(room) {
        var harvesters = room.find(FIND_MY_CREEPS); // {filter: (c) => (c.memory.role == 'harvester') }
        
        console.log('Creeps in room: ' + harvesters[0]);
        
        if (harvesters.length > 5 ){
            console.log("Moving creeps");
            for (var i in harvesters) {
                counter = 0
                if (counter < 3) {
                    harvesters[i].memory.farm_room = 'E28N16';
                    counter = counter + 1
                    
                }
                
            }
        }
        //var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        //console.log('Bulders: ' + builders.length);
        
        //var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        //console.log('Upgraders: ' + upgraders.length);
        }
}

module.exports = roomControl;
