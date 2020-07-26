var spawnControl = {
    
    run: function(spawn_name) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);
        
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Bulders: ' + builders.length);
        
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgraders: ' + upgraders.length);
        
        var extens = Game.spawns[spawn_name].room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION);
                }
        });

        console.log('Extens:' + extens.length);
        var creep_arg = Array(extens.length+1).fill(WORK)
        creep_arg.push(CARRY,MOVE);
        console.log(creep_arg);
        if((harvesters.length < 9 && upgraders.length > 0)|| harvesters.length ==0) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns[spawn_name].spawnCreep(creep_arg, newName,
                {memory: {role: 'harvester', working: false, farm_room: 0}});
        }
        
        else if(upgraders.length < 5) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(creep_arg, newName,
                {memory: {role: 'upgrader', working: false, farm_room: 0 }});
        }
        
        else {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns[spawn_name].spawnCreep(creep_arg, newName,
                {memory: {role: 'builder', working: false, farm_room: 0}});
        }
        

    
        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    }
}
module.exports = spawnControl;
