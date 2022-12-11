const { ExpirableMap } = require('@cadienvan/expirable-map');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const map = new ExpirableMap();

map.set('bubusettete', '019238092138192938013809380912388912321030', 400);

console.log(map.get('bubusettete'));

sleep(350).then(() => {
  console.log(map.get('bubusettete'));
});

sleep(450).then(() => {
  console.log(map.get('bubusettete'));
});
