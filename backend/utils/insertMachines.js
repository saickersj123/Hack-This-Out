import Machine from './model/Machine.js';

// Example machines
const machines = [
  {
    name: 'machine1',
    category: 'Web',
    info: 'Description for machine1',
    exp: 100,
    amiId: 'ami-08757619c47af8049', // Replace with actual AMI ID
  },
  {
    name: 'machine2',
    category: 'Network',
    info: 'Description for machine2',
    exp: 150,
    amiId: 'ami-08757619c47af8049', // Replace with actual AMI ID
  },
  // Add more machines as needed
];

const seedMachines = async () => {
  try {
    await Machine.deleteMany({});
    await Machine.insertMany(machines);
    console.log('Machines seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding machines:', error);
    process.exit(1);
  }
};

seedMachines();
//run with "node utils/insertMachines.js"