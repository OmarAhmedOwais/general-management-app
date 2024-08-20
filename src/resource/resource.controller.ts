import { Request, Response } from "express";
import { ResourceService } from "./resource.service";

const resourceService = new ResourceService();


export const getResources = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const resources = await resourceService.getResources();
  res.json(resources);
};


export const getResourceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const resource = await resourceService.getResourceById(Number(req.params.id));
  if (resource) {
    res.json(resource);
  } else {
    res.status(404).send("Resource not found");
  }
};


export const createResource = async (
  req: Request,
  res: Response
): Promise<void> => {
  const resource = await resourceService.createResource(req.body);
  res.status(201).json(resource);
};


export const updateResource = async (
  req: Request,
  res: Response
): Promise<void> => {
  const resource = await resourceService.updateResource(
    Number(req.params.id),
    req.body
  );
  if (resource) {
    res.json(resource);
  } else {
    res.status(404).send("Resource not found");
  }
};


export const deleteResource = async (
  req: Request,
  res: Response
): Promise<void> => {
  await resourceService.deleteResource(Number(req.params.id));
  res.status(204).send();
};


export const searchResources = async (
  req: Request,
  res: Response
): Promise<void> => {
  const query = req.query.q as string;
  const resources = await resourceService.searchResources(query);
  res.json(resources);
};
