import { ResourceService } from "@/resource/resource.service";
import { AppDataSource } from "@/common/config/data-source";
import { Resource } from "@/data/entities/Resource";

jest.mock('@/common/config/data-source');

describe('ResourceService', () => {
  let resourceService: ResourceService;
  let mockResourceRepository: jest.Mocked<typeof AppDataSource.getRepository>;

  beforeEach(() => {
    mockResourceRepository = AppDataSource.getRepository(Resource);
    resourceService = new ResourceService();
  });

  it('should fetch all resources', async () => {
    mockResourceRepository.find.mockResolvedValueOnce([{ id: 1, name: 'Resource1' }]);

    const resources = await resourceService.getResources();
    expect(resources).toEqual([{ id: 1, name: 'Resource1' }]);
    expect(mockResourceRepository.find).toHaveBeenCalled();
  });
});
