import { ResourceController } from "../resource.controller";
import { ResourceService } from "../resource.service";
import { mockRequest, mockResponse } from "@/common/utils/testHelpers";
import { Request, Response } from "express"; // Import Request and Response types from express

describe("ResourceController", () => {
  let resourceController: ResourceController;
  let resourceServiceMock: jest.Mocked<ResourceService>;

  beforeEach(() => {
    resourceServiceMock = {
      getResources: jest.fn(),
      getResourceById: jest.fn(),
      createResource: jest.fn(),
      updateResource: jest.fn(),
      deleteResource: jest.fn(),
      searchResources: jest.fn(),
    } as unknown as jest.Mocked<ResourceService>;

    resourceController = new ResourceController(resourceServiceMock);
  });

  it("should get all resources", async () => {
    const req = mockRequest() as Request; // Cast to Request
    const res = mockResponse() as Response; // Cast to Response

    const mockResources = [
      {
        id: 1,
        name: "Resource1",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    resourceServiceMock.getResources.mockResolvedValueOnce(mockResources);

    await resourceController.getResources(req, res);

    expect(res.json).toHaveBeenCalledWith(mockResources);
  });

  it("should get a resource by id", async () => {
    const req = mockRequest({ params: { id: "1" } }) as Request; // Cast to Request
    const res = mockResponse() as Response; // Cast to Response

    const mockResource = {
      id: 1,
      name: "Resource1",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    resourceServiceMock.getResourceById.mockResolvedValueOnce(mockResource);

    await resourceController.getResourceById(req, res);

    expect(res.json).toHaveBeenCalledWith(mockResource);
  });

  it("should create a resource", async () => {
    const req = mockRequest({ body: { name: "New Resource" } }) as Request; // Cast to Request
    const res = mockResponse() as Response; // Cast to Response

    const mockResource = {
      id: 1,
      name: "New Resource",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    resourceServiceMock.createResource.mockResolvedValueOnce(mockResource);

    await resourceController.createResource(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockResource);
  });

  it("should update a resource", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: { name: "Updated Resource" },
    }) as Request; // Cast to Request
    const res = mockResponse() as Response; // Cast to Response

    const mockResource = {
      id: 1,
      name: "Updated Resource",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    resourceServiceMock.updateResource.mockResolvedValueOnce(mockResource);

    await resourceController.updateResource(req, res);

    expect(res.json).toHaveBeenCalledWith(mockResource);
  });

  it("should delete a resource", async () => {
    const req = mockRequest({ params: { id: "1" } }) as Request; // Cast to Request
    const res = mockResponse() as Response; // Cast to Response

    resourceServiceMock.deleteResource.mockResolvedValueOnce(undefined);

    await resourceController.deleteResource(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("should search resources", async () => {
    const req = mockRequest({ query: { q: "Resource" } }) as Request; // Cast to Request
    const res = mockResponse() as Response; // Cast to Response

    const mockResources = [
      {
        id: 1,
        name: "Resource1",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    resourceServiceMock.searchResources.mockResolvedValueOnce(mockResources);

    await resourceController.searchResources(req, res);

    expect(res.json).toHaveBeenCalledWith(mockResources);
  });
});
