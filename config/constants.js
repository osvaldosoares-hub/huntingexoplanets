// Mock de planetas reais (exoplanetas e planetas do sistema solar)
export const MOCK_PLANETS = [
    {
        name: 'π Men c',
        ticId: 166739520,
        color: '#7ec4cf',
        radius: 2.0189, // em raios terrestres
        radius_km: 12862.4,
        mass: 3.63, // em massas terrestres
        semiMajorAxis: 0.06839, // UA
        eccentricity: 0.0,
        inclination: 0.0,
        density: 2.43, // g/cm³
        notes: 'Super-Terra / mini-Netuno, atmosfera espessa/voláteis.'
    },
    {
        name: 'WASP-117 b',
        ticId: 261136679,
        color: '#ffe066',
        radius: 11.4, // em raios terrestres (1.02 R_Jup)
        mass: 87.6, // em massas terrestres (0.2755 M_Jup)
        semiMajorAxis: 0.0946, // UA
        eccentricity: 0.30,
        inclination: 0.0,
        density: 0.26, // g/cm³
        notes: 'Saturno gasoso, órbita excêntrica, baixa densidade.'
    },
    {
        name: 'γ Tucanae',
        ticId: 262841041,
        color: '#fff6e0',
        radius: 24.7, // em raios terrestres (2.2 R_Sol)
        mass: 1.55 * 332946, // em massas terrestres (1.55 M_Sol)
        semiMajorAxis: null,
        eccentricity: null,
        inclination: null,
        density: null,
        notes: 'Estrela F, sem exoplaneta confirmado.'
    },
    // Adicione mais planetas/exoplanetas se quiser
]
export const GRAVITATIONAL_CONSTANT = 6.6743e-11
export const SCALE_FACTOR = 0.0001

export const SPAWN_RADIUS = 10

export const SUN_RADIUS = 15
// Calculate the suns mass from its radius, rounded to 2 decimal places
export const SUN_MASS = Math.round((4 / 3) * Math.PI * Math.pow(SUN_RADIUS, 3) * 1410) / 100
export const STAR_DENSITY = 1410 // default density for the sun, in kg/m^3

export function calculateStarMass(radius, density = STAR_DENSITY) {
    // Volume of a sphere: (4/3) * π * r^3
    // Mass = Volume * Density
    return Math.round((4 / 3) * Math.PI * Math.pow(radius, 3) * density * 100) / 100
}

// Example mock data for different stars, agora com mass calculado e cor
// MOCK_STARS atualizado com valores reais de raio e densidade das estrelas
export const MOCK_STARS = [
    {
        name: "π Men (TIC 166739520)",
        radius: 1.1 * 109 * 0.05, // escala reduzida
        density: 1.18,
        color: '#FFD737',
        notes: 'Estrela tipo G, hospedeira de π Men c.'
    },
    {
        name: "WASP-117 (TIC 261136679)",
        radius: 1.17 * 109 * 0.05,
        density: 0.85,
        color: '#6EC6FF',
        notes: 'Estrela tipo F, hospedeira de WASP-117 b.'
    },
    {
        name: "γ Tucanae (TIC 262841041)",
        radius: 2.2 * 109 * 0.05,
        density: 0.3,
        color: '#FF6E6E',
        notes: 'Estrela F, sem exoplaneta confirmado.'
    },
    {
        name: "TIC 11068680",
        radius: 1.0 * 109 * 0.05,
        density: 1.41,
        color: '#FFFFFF',
        notes: 'Estrela tipo G (Sol).'
    }
].map(star => ({
    ...star,
    mass: calculateStarMass(star.radius, star.density)
}))

// Function to get star data by name
export function getStarByName(name) {
    return MOCK_STARS.find(star => star.name === name)
}