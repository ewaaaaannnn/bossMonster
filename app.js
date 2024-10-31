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
  level: 1,
  timesBeat: 0,
}

let heroDmg = 0

let gold = 0

let levelCost = 100
//!SECTION LOGIC

let potionCost = 25


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
  resetBoss()
  drawBoss()
  drawLevel()
}

function bossAttacks() {
  for (let i = 0; i < heroes.length; i++) {
    let hero = heroes[i]
    hero.health -= boss.damage
    console.log(hero.health)
  }
  drawHeroStats()
}

function resetBoss() {
  if (boss.health <= 0) {
    boss.health += boss.maxHealth * 2;
    boss.maxHealth = boss.health
    boss.level++
    boss.timesBeat++
    gold += 25 * boss.timesBeat
  }
}

function buyPotion(heroName) {
  for (let i = 0; i < heroes.length; i++) {
    const hero = heroes[i];
    if (hero.name == heroName) {
      if (gold >= 25) {
        hero.health += 50
        gold -= 25
        drawHeroStats()
        drawLevel()
      }
      else {
        window.alert(`You cannot afford the Potion!`)
        // NOTE hard stop! Do not continue this function!
        return
      }
    }
  }
}

function levelUp(heroName) {
  const foundHero = heroes.find(hero => hero.name == heroName)
  if (gold >= levelCost) {
    foundHero.damage *= 2
    foundHero.health *= 2
    gold -= 25
    levelCost = levelCost * 2
    drawHeroStats()
    drawLevel()
    drawLevelCost()
  }
  else {
    window.alert(`You cannot afford the Level Up!`)
    // NOTE hard stop! Do not continue this function!
    return
  }
}






//!SECTION DRAWING FUNCTIONS

function drawBoss() {
  const bossElm = document.getElementById('boss');
  bossElm.innerHTML = `<p>${boss.health} ${boss.maxHealth} </p>`;
}

drawBoss()


function drawHeroStats() {
  for (let i = 0; i < heroes.length; i++) {
    const hero = heroes[i];
    const heroElem = document.getElementById(hero.name)
    if (heroElem) {
      heroElem.innerHTML = `<p>${hero.name} ${hero.health} ${hero.damage}</p>`;
    }
  }
}
drawHeroStats()


function drawLevel() {
  const bossElm = document.getElementById('stats');
  bossElm.innerHTML = `<p>${boss.timesBeat} ${boss.level} ${gold} </p>`;
}

drawLevel()

function drawLevelCost() {
  const bossElm = document.getElementById('prices');
  bossElm.innerHTML = `<p>${levelCost} ${potionCost}</p>`;
}

drawLevelCost()

//!SECTION DOCUMENT LOADING


setInterval(bossAttacks, 5000)
