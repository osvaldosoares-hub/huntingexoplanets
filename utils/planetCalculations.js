// Calcula posição inicial única para cada planeta usando índice
export function calculateIndexedInitialPosition(index, total, isEntry = false) {
    // Distribui uniformemente ao longo do círculo
    const theta = (index / total) * Math.PI * 2
    const radius = isEntry ? SPAWN_RADIUS * 1.5 : Math.random() * SPAWN_RADIUS + SUN_RADIUS * 3
    const x = Math.cos(theta) * radius
    const y = Math.random() * 10
    const z = Math.sin(theta) * radius
    return new Vector3(x, y, z)
}
// 1 UA em km
export const AU_IN_KM = 149597870.7

// Calcula posição orbital elíptica com excentricidade e unidade astronômica
// t: parâmetro de tempo (0 a 1), a: semi-eixo maior em UA, e: excentricidade (0=círculo), inclination: inclinação em radianos
export function calculateEllipticalOrbitPosition(t, a = 1, e = 0, inclination = 0) {
    // a em UA, converte para escala do sistema (ex: 1 UA = 100)
    const SCALE = 100 // ajuste conforme seu sistema
    const theta = 2 * Math.PI * t
    const b = a * Math.sqrt(1 - e * e)
    // Centro da elipse deslocado por a*e
    let x = a * Math.cos(theta) - a * e
    let z = b * Math.sin(theta)
    // Inclinação orbital
    let y = 0
    if (inclination !== 0) {
        y = z * Math.sin(inclination)
        z = z * Math.cos(inclination)
    }
    // Aplica escala
    return new Vector3(x * SCALE, y * SCALE, z * SCALE)
}
import { Vector3 } from 'three'
import { SUN_RADIUS, SUN_MASS, SPAWN_RADIUS, GRAVITATIONAL_CONSTANT } from '../config/constants'

// Get random position either within the spawn radius or on the outside edge
export const calculateInitialPosition = (isEntry = false) => {
    const theta = Math.random() * Math.PI * 2
    const radius = isEntry ? SPAWN_RADIUS * 1.5 : Math.random() * SPAWN_RADIUS + SUN_RADIUS * 3
    const x = Math.cos(theta) * radius
    const y = Math.random() * 10
    const z = Math.sin(theta) * radius
    return new Vector3(x, y, z)
}

// Calculate the initial velocity of the planet
export const calculateInitialVelocity = (position, respawn) => {
    const radialVector = new Vector3().copy(position)
    const distance = radialVector.length()
    const orbitalSpeed = Math.sqrt((GRAVITATIONAL_CONSTANT * SUN_MASS) / distance)
    const upVector = new Vector3(0, 1, 0)
    const velocity = new Vector3().crossVectors(radialVector, upVector).normalize().multiplyScalar(orbitalSpeed).multiplyScalar(20000)

    if (respawn) {
        velocity.multiplyScalar(0.75)
    }

    return velocity
}
