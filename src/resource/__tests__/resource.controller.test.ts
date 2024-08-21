import { ResourceService } from "@/resource/resource.service";
import { ResourceController } from "@/resource/resource.controller";
import { mockRequest, mockResponse } from "@/common/utils/testHelpers";

jest.mock('@/resource/resource.service');

describe('ResourceController', () => {
  let resourceController: ResourceController;
  let resourceServiceMock: jest.Mocked<ResourceService>;

  beforeEach(() => {
    resourceServiceMock = new ResourceService() as jest.Mocked<ResourceService>;
    resourceController = new ResourceController(resourceServiceMock);
  });

  it('should get all resources', async () => {
    const req = mockRequest();
    const res = mockResponse();

    resourceServiceMock.getResources.mockResolvedValueOnce([{ id: 1, name: 'Resource1' }]);

    await resourceController.getResources(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Resource1' }]);
  });
});
