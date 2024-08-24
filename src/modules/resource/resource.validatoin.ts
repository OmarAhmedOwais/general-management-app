import { Schema } from 'express-validator';
import { BaseValidation } from '@/base';
import { makeOptional } from '@/common/utils'; // Adjust the import path as necessary

export class ResourceValidation extends BaseValidation {
  constructor() {
    super();
  }

  // Create schema for Resource validation
  private createResourceSchema(): Schema {
    return {
      ...this.getResourceNameSchema(),
      ...this.getResourceDescriptionSchema(),
      ...this.getResourceStatusSchema(),
    };
  }

  // Schema for resource name
  private getResourceNameSchema(): Schema {
    return BaseValidation.createStringSchema('name');
  }

  // Schema for resource description
  private getResourceDescriptionSchema(): Schema {
    return BaseValidation.createStringSchema('description', true);
  }

  // Schema for resource status
  private getResourceStatusSchema(): Schema {
    return {
      status: {
        in: ['body'],
        isString: {
          errorMessage: 'Status must be a string',
        },
        isIn: {
          options: [['active', 'inactive', 'archived']],
          errorMessage: 'Status must be one of the following: active, inactive, archived',
        },
        optional: true,
      },
    };
  }

  // Get validation schema for creating a resource
  protected getCreateValidation(): Schema {
    return this.createResourceSchema();
  }

  // Get validation schema for updating a resource
  protected getUpdateValidation(): Schema {
    return makeOptional({
      id: this.idParam,
      ...this.createResourceSchema(),
    });
  }
}
