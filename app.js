const heroes = [
  {
    name: 'Slate Slabrock',
    type: 'dwarf',
    damage: 5,
    health: 100
  },
  {
    name: 'Swift Ironstag',
    type: 'elf',
    damage: 10,
    health: 50
  }
]

const boss = {
  health: 100,
  maxHealth: 100,
  damage: 5,
  level: 1
}

let heroDmg = 0




//!SECTION LOGIC




function addHeroAttack() {
  for (let i = 0; i < heroes.length; i++) {
    let hero = heroes[i];
    heroDmg += hero.damage
  }
  console.log(heroDmg)
}

function attackBoss() {
  addHeroAttack()
  let bossHurt = boss.health
  boss.health -= heroDmg
  console.log(bossHurt)
  heroDmg = 0
  drawBoss()
}

function bossAttacks() {
  for (let i = 0; i < heroes.length; i++) {
    let hero = heroes[i]
    hero.health -= boss.damage
    console.log(hero.health)
  }
  drawHeroStats()
}












//!SECTION DRAWING FUNCTIONS

function drawBoss() {
  const bossElm = document.getElementById('boss');
  bossElm.innerHTML = `<p>${boss.health} ${boss.level}</p>`;
}

drawBoss()


function drawHeroStats() {
  for (let i = 0; i < heroes.length; i++) {
    const hero = heroes[i];
    const heroElem = document.getElementById(hero.name)
    if (heroElem) {
      heroElem.innerHTML = `<p>${hero.name} ${hero.health}</p>`;
    }
  }
}
drawHeroStats()




//!SECTION DOCUMENT LOADING


setInterval(bossAttacks, 5000)
