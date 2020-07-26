var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawnControl = require('spawn.control');
var roomControl = require('room.control');

module.exports.loop = function () {
    console.log(Room('E29N16'))
    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    //spawnControl.run('Spawn1');
    //roomControl.run(Game.spawns['Spawn1'].room);
    // var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    // console.log('Harvesters: ' + harvesters.length);
    
    // var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    // console.log('Bulders: ' + builders.length);
    
    // var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    // console.log('Upgraders: ' + upgraders.length);

    // if(harvesters.length < builders.length || harvesters.length < upgraders.length*1.3) {
    //     var newName = 'Harvester' + Game.time;
    //     console.log('Spawning new harvester: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
    //         {memory: {role: 'harvester'}});
    // }
    
    // if(builders.length < 20) {
    //     var newName = 'Builder' + Game.time;
    //     console.log('Spawning new harvester: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
    //         {memory: {role: 'builder'}});
    // }
    
    // if(upgraders.length < builders.length) {
    //     var newName = 'Upgrader' + Game.time;
    //     console.log('Spawning new harvester: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
    //         {memory: {role: 'upgrader'}});
    // }

    // if(Game.spawns['Spawn1'].spawning) {
    //     var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    //     Game.spawns['Spawn1'].room.visual.text(
    //         '🛠️' + spawningCreep.memory.role,
    //         Game.spawns['Spawn1'].pos.x + 1,
    //         Game.spawns['Spawn1'].pos.y,
    //         {align: 'left', opacity: 0.8});
    // }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
