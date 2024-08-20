import { Model, Document } from 'mongoose';
import { Models } from '@/data/types';
import { UserService } from '@/services/identity';
import { ProductService } from 'src/services/product';
import { BaseService } from '@/base';
import { UploadService } from '@/services/upload';
/*
* TODO:IF Needed To use Service Factory
*/ 
class ServiceFactory {
  static createService<T extends Document>(model: Model<T>): BaseService<T> {
    switch (model.modelName) {
      case Models.User:
        return new UserService() as unknown as BaseService<T>;
      case Models.Product:
        return new ProductService() as unknown as BaseService<T>;
      case Models.Upload:
        return new UploadService() as unknown as BaseService<T>;
      default:
        return new BaseService(model);
    }
  }
}

export default ServiceFactory;
