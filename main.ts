input.onButtonPressed(Button.A, function () {
    player.move(-1)
})
input.onButtonPressed(Button.AB, function () {
    if (!(bulletInMotion)) {
        bulletInMotion = true
        bullet = game.createSprite(player.get(LedSpriteProperty.X), player.get(LedSpriteProperty.Y) - 0)
        control.inBackground(function () {
            while (bullet.get(LedSpriteProperty.Y) > 0) {
                bullet.change(LedSpriteProperty.Y, -1)
                basic.pause(100)
            }
            bullet.delete()
            bulletInMotion = false
        })
    }
})
input.onButtonPressed(Button.B, function () {
    player.move(1)
})
let player: game.LedSprite = null
let bullet: game.LedSprite = null
let bulletInMotion = false
let snelheid = 1000
game.setScore(0)
player = game.createSprite(2, 4)
let enemy = game.createSprite(Math.randomRange(0, 4), 0)
basic.forever(function () {
    if (bullet && bullet.isTouching(enemy)) {
        enemy.delete()
        bullet.delete()
        bulletInMotion = false
        snelheid += -50
        game.addScore(1)
        enemy = game.createSprite(Math.randomRange(0, 4), 0)
    }
})
basic.forever(function () {
    basic.pause(snelheid)
    enemy.change(LedSpriteProperty.Y, 1)
    if (enemy.get(LedSpriteProperty.Y) == 4) {
        if (enemy.isTouching(player)) {
            game.gameOver()
        } else {
            enemy.set(LedSpriteProperty.X, Math.randomRange(0, 4))
            enemy.set(LedSpriteProperty.Y, 0)
        }
    }
})
