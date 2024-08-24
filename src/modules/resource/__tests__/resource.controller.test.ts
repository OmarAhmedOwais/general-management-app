import { Resource } from "@/data";
import { ResourceController } from "../resource.controller";
import { ResourceService } from "../resource.service";
import { mockRequest, mockResponse } from "@/common/utils/testHelpers";
import { Request, Response, NextFunction } from "express";

describe("ResourceController", () => {
  let resourceController: ResourceController;
  let resourceServiceMock: jest.Mocked<ResourceService>;

  beforeEach(() => {
    // Mock the ResourceService
    resourceServiceMock = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      searchResources: jest.fn(),
    } as unknown as jest.Mocked<ResourceService>;

    // Create an instance of ResourceController with the mocked service
    resourceController = new ResourceController();
    // Access and set the service directly
    (resourceController as any).service = resourceServiceMock;
  });

  it("should get all resources", async () => {
    const req = mockRequest() as Request;
    const res = mockResponse() as Response;
    const next = jest.fn() as NextFunction;

    const mockResources = {
      data: [
        {
          id: 1,
          name: "Resource1",
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      pagination: {
        total: 1,
        page: 1,
        pageSize: 10,
        totalPages: 1,
        limit: 10,
        length: 1,
        hasNextPage: false,
        hasPreviousPage: false
      } // Adjust as per actual pagination structure
    };

    resourceServiceMock.findAll.mockResolvedValue(mockResources);

    await resourceController.findAll(req, res, next);

    expect(res.json).toHaveBeenCalledWith(mockResources);
  });

  it("should get a resource by id", async () => {
    const req = mockRequest({ params: { id: "1" } }) as Request;
    const res = mockResponse() as Response;
    const next = jest.fn() as NextFunction;

    const mockResource = {
      id: 1,
      name: "Resource1",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    resourceServiceMock.findOne.mockResolvedValue(mockResource);

    await resourceController.findById(req, res, next);

    expect(res.json).toHaveBeenCalledWith(mockResource);
  });

  it("should create a resource", async () => {
    const req = mockRequest({ body: { name: "New Resource" } }) as Request;
    const res = mockResponse() as Response;
    const next = jest.fn() as NextFunction;

    const mockResource = {
      id: 1,
      name: "New Resource",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    resourceServiceMock.create.mockResolvedValue(mockResource);

    await resourceController.create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockResource);
  });

  it("should update a resource", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: { name: "Updated Resource" },
    }) as Request;
    const res = mockResponse() as Response;
    const next = jest.fn() as NextFunction;

    const mockResource = {
      id: 1,
      name: "Updated Resource",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    resourceServiceMock.update.mockResolvedValue(mockResource);

    await resourceController.update(req, res, next);

    expect(res.json).toHaveBeenCalledWith(mockResource);
  });

  it('should delete a resource successfully', async () => {
    const req = mockRequest({ params: { id: 1 } }) as Request;
    const res = mockResponse() as Response;
    const next = jest.fn() as NextFunction;

    // Create a mock Resource object with all required properties
    const mockResource: Resource = {
      id: 1,
      name: "Test Resource",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Mock the delete method to resolve with the mock Resource
    resourceServiceMock.delete.mockResolvedValue(mockResource);

    await resourceController.delete(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("should search resources", async () => {
    const req = mockRequest({ query: { q: "Resource" } }) as Request;
    const res = mockResponse() as Response;

    const mockResources = [
      {
        id: 1,
        name: "Resource1",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    resourceServiceMock.searchResources.mockResolvedValue(mockResources);

    await resourceController.searchResources(req, res);

    expect(res.json).toHaveBeenCalledWith(mockResources);
  });
});
