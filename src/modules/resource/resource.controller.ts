import { Request, Response } from "express";
import { Resource } from "../../data/entities/Resource";
import { BaseController } from "../../base/base.controller";
import { ResourceService } from "./resource.service";

export class ResourceController extends BaseController<Resource> {
  constructor() {
    super(new ResourceService(), "Resource");
  }

  public searchResources = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const query = req.query.q as string;
    const resources = await (this.service as ResourceService).searchResources(
      query
    );
    res.json(resources);
  };
}
