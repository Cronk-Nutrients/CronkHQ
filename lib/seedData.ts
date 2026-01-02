import { FirestoreService } from '@/lib/firestore'
import { Location, Supplier, Product } from '@/types'

// Default locations (matches existing Location type)
const defaultLocations: Omit<Location, 'id'>[] = [
  {
    name: 'Main Warehouse',
    type: 'warehouse',
    address: '2115 Avenue I, Rosenberg, TX 77471',
    isActive: true,
  },
  {
    name: 'Amazon FBA',
    type: 'fba',
    isActive: true,
  },
]

// Seed locations
export async function seedLocations(organizationId: string) {
  const service = new FirestoreService<Location>(organizationId, 'locations')
  const existing = await service.getAll()

  if (existing.length > 0) {
    console.log('Locations already exist, skipping seed')
    return existing
  }

  const createdIds: string[] = []
  for (const location of defaultLocations) {
    const id = await service.create(location)
    createdIds.push(id)
  }

  console.log('Seeded default locations')
  return service.getAll()
}

// Seed demo products (optional)
export async function seedDemoProducts(organizationId: string, locationId: string) {
  const service = new FirestoreService<Product>(organizationId, 'products')
  const existing = await service.getAll()

  if (existing.length > 0) {
    console.log('Products already exist, skipping seed')
    return
  }

  const now = new Date().toISOString()
  const demoProducts: Omit<Product, 'id'>[] = [
    {
      sku: 'CRONK-GROW-32',
      name: 'Cronk Grow 32oz',
      category: 'nutrient',
      size: '1L',
      weight: 32,
      prices: {
        msrp: 29.99,
        shopify: 29.99,
        amazon: 34.99,
        wholesale: 19.99,
        distributor: 14.99,
      },
      costs: {
        base: 8.50,
        amazonPrep: 2.00,
        shopify: 1.00,
      },
      reorderPoint: 25,
      casePackQty: 12,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      sku: 'CRONK-BLOOM-32',
      name: 'Cronk Bloom 32oz',
      category: 'nutrient',
      size: '1L',
      weight: 32,
      prices: {
        msrp: 29.99,
        shopify: 29.99,
        amazon: 34.99,
        wholesale: 19.99,
        distributor: 14.99,
      },
      costs: {
        base: 8.50,
        amazonPrep: 2.00,
        shopify: 1.00,
      },
      reorderPoint: 25,
      casePackQty: 12,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      sku: 'CRONK-MICRO-32',
      name: 'Cronk Micro 32oz',
      category: 'nutrient',
      size: '1L',
      weight: 32,
      prices: {
        msrp: 24.99,
        shopify: 24.99,
        amazon: 29.99,
        wholesale: 16.99,
        distributor: 12.99,
      },
      costs: {
        base: 7.25,
        amazonPrep: 2.00,
        shopify: 1.00,
      },
      reorderPoint: 30,
      casePackQty: 12,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      sku: 'CRONK-GROW-128',
      name: 'Cronk Grow Gallon',
      category: 'nutrient',
      size: '4L',
      weight: 128,
      prices: {
        msrp: 79.99,
        shopify: 79.99,
        amazon: 89.99,
        wholesale: 54.99,
        distributor: 44.99,
      },
      costs: {
        base: 22.00,
        amazonPrep: 3.00,
        shopify: 2.00,
      },
      reorderPoint: 15,
      casePackQty: 4,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      sku: 'CRONK-BLOOM-128',
      name: 'Cronk Bloom Gallon',
      category: 'nutrient',
      size: '4L',
      weight: 128,
      prices: {
        msrp: 79.99,
        shopify: 79.99,
        amazon: 89.99,
        wholesale: 54.99,
        distributor: 44.99,
      },
      costs: {
        base: 22.00,
        amazonPrep: 3.00,
        shopify: 2.00,
      },
      reorderPoint: 15,
      casePackQty: 4,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
  ]

  for (const product of demoProducts) {
    await service.create(product)
  }

  console.log('Seeded demo products')
}

// Seed default supplier
export async function seedDefaultSupplier(organizationId: string) {
  const service = new FirestoreService<Supplier>(organizationId, 'suppliers')
  const existing = await service.getAll()

  if (existing.length > 0) {
    console.log('Suppliers already exist, skipping seed')
    return
  }

  await service.create({
    name: 'HIGROCORP INC.',
    contactName: 'Supplier Contact',
    email: 'orders@higrocorp.com',
    address: {
      line1: '123 Manufacturing Way',
      city: 'Toronto',
      state: 'ON',
      postalCode: 'M5V 1A1',
      country: 'CA',
    },
    currency: 'CAD',
  } as Omit<Supplier, 'id'>)

  console.log('Seeded default supplier')
}

// Run all seeds
export async function seedOrganizationData(organizationId: string, seedProducts: boolean = false) {
  try {
    const locations = await seedLocations(organizationId)
    await seedDefaultSupplier(organizationId)

    if (seedProducts && locations.length > 0) {
      // Use the first warehouse location, or fallback to first location
      const mainWarehouse = locations.find(l => l.type === 'warehouse') || locations[0]
      await seedDemoProducts(organizationId, mainWarehouse.id)
    }

    console.log('Organization data seeded successfully')
  } catch (error) {
    console.error('Error seeding organization data:', error)
    throw error
  }
}
