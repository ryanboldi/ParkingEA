/** Rename variables */
let Neat = neataptic.Neat;
let Methods = neataptic.Methods;
let Config = neataptic.Config;
let Architect = neataptic.Architect;

Config.warnings = false;

/* genetic algorithm settings */
let PopSize = 20;
let ITERATIONS = 600; //how many frames per generation maximum
let MUTATION_RATE = 0.1;
let ELITISM = Math.round(0.1 * PopSize);
let START_HIDDEN_SIZE = 6;

/** Global Variables */
let neat;

/*construct GA*/
function initNeat() {
    neat = new Neat(
        9, 4,
        null,
        {
            mutation: [
                Methods.Mutation.ADD_NODE,
                Methods.Mutation.SUB_NODE,
                Methods.Mutation.ADD_CONN,
                Methods.Mutation.SUB_CONN,
                Methods.Mutation.MOD_WEIGHT,
                Methods.Mutation.MOD_BIAS,
                Methods.Mutation.MOD_ACTIVATION,
                Methods.Mutation.ADD_GATE,
                Methods.Mutation.SUB_GATE,
                Methods.Mutation.ADD_SELF_CONN,
                Methods.Mutation.SUB_SELF_CONN,
                Methods.Mutation.ADD_BACK_CONN,
                Methods.Mutation.SUB_BACK_CONN
            ],
            popsize: PopSize,
            mutationRate: MUTATION_RATE,
            elitism: ELITISM,
            network: new Architect.Random(9, START_HIDDEN_SIZE, 4)
        }

    );
}

function startEvaluation() {
    cars = [];
    for (let genome in neat.population) {
        genome = neat.population[genome];
        cars.push(new Car(genome));
    }
    neat.mutate();
}


function endEvaluation() {
    console.log('Generation: ', neat.generation, ' - average score: ', neat.getAverage());
    console.log('Generation highest score', neat.getFittest().score);

    //networks shouldn't get too big
    for (let genome in neat.population) {
        genome = neat.population[genome];
        genome.score -= (genome.nodes.length);
    }

    neat.sort();
    let newPopulation = [];

    //Elitism
    for (let i = 0; i < neat.elitism; i++) {
        newPopulation.push(neat.population[i]);
    }

    //breed next population
    for (let i = 0; i < neat.popsize - neat.elitism; i++) {
        newPopulation.push(neat.getOffspring());
    }

    //replace old pop with new
    neat.population = newPopulation;
    neat.mutate();

    neat.generation++;
    startEvaluation();
}