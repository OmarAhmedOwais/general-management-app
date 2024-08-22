import { ResourceService } from "@/resource/resource.service";
import { AppDataSource } from "@/common/config/data-source";
import { Resource } from "@/data/entities/Resource";
import { Repository } from "typeorm";

jest.mock('@/common/config/data-source');

describe('ResourceService', () => {
  let resourceService: ResourceService;
  let mockResourceRepository: jest.Mocked<Repository<Resource>>;

  beforeEach(() => {
    // Mock the repository methods
    mockResourceRepository = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<Repository<Resource>>;

    // Mock the return of AppDataSource.getRepository
    AppDataSource.getRepository = jest.fn().mockReturnValue(mockResourceRepository);

    resourceService = new ResourceService();
  });

  it('should fetch all resources', async () => {
    // Provide the full resource mock data with all required properties
    const mockResources: Resource[] = [
      {
        id: 1,
        name: 'Resource1',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    mockResourceRepository.find.mockResolvedValueOnce(mockResources);

    const resources = await resourceService.getResources();
    expect(resources).toEqual(mockResources);
    expect(mockResourceRepository.find).toHaveBeenCalled();
  });

  // Add more tests as needed
});
