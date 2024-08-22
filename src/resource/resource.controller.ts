import { Request, Response } from "express";
import { ResourceService } from "./resource.service";

export class ResourceController {
  private resourceService: ResourceService;

  constructor(resourceService: ResourceService) {
    this.resourceService = resourceService;
  }

  public getResources = async (_req: Request, res: Response): Promise<void> => {
    try {
      const resources = await this.resourceService.getResources();
      res.json(resources);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  };

  public getResourceById = async (req: Request, res: Response): Promise<void> => {
    try {
      const resource = await this.resourceService.getResourceById(Number(req.params.id));
      if (resource) {
        res.json(resource);
      } else {
        res.status(404).send("Resource not found");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  };

  public createResource = async (req: Request, res: Response): Promise<void> => {
    try {
      const resource = await this.resourceService.createResource(req.body);
      res.status(201).json(resource);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  };

  public updateResource = async (req: Request, res: Response): Promise<void> => {
    try {
      const resource = await this.resourceService.updateResource(Number(req.params.id), req.body);
      if (resource) {
        res.json(resource);
      } else {
        res.status(404).send("Resource not found");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  };

  public deleteResource = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.resourceService.deleteResource(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  };

  public searchResources = async (req: Request, res: Response): Promise<void> => {
    try {
      const query = req.query.q as string;
      const resources = await this.resourceService.searchResources(query);
      res.json(resources);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  };
}
