import { ResourceService } from '../services/ResourceService';
import { AppDataSource } from '../data-source';
import { Resource } from '../entities/Resource';

beforeAll(async () => {
  try {
    await AppDataSource.initialize();
    
    // Ensure that the schema is up to date before running tests
    await AppDataSource.runMigrations(); // Apply any pending migrations

    // Optionally, seed test data if needed
  } catch (error) {
    console.error('Error initializing the database:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    // Cleanup test data
    await AppDataSource.getRepository(Resource).clear(); // Clear resource table if necessary
    await AppDataSource.destroy(); // Close the database connection
  } catch (error) {
    console.error('Error closing the database connection:', error);
    throw error;
  }
});

describe('ResourceService', () => {
  const resourceService = new ResourceService();

  it('should create a resource', async () => {
    try {
      const resource = await resourceService.createResource({
        name: 'Test Resource',
        description: 'This is a test resource',
        status: 'active',
      });

      expect(resource).toHaveProperty('id');
      expect(resource.name).toBe('Test Resource');
      expect(resource.description).toBe('This is a test resource');
      expect(resource.status).toBe('active');
    } catch (error) {
      console.error('Error creating resource:', error);
      throw error;
    }
  });

  // Add more tests as needed
});
