import {
  Category,
  Collection,
  FeaturedMedia,
  Product,
  ProductReview,
  ProductType,
  SelectedOption,
  Upload,
  User,
  Variant,
  InventoryItem,
  InventoryLevel,
  LedgerDocument,
  Location,
  AutomaticDiscount,
  DiscountCode,
  PriceRule,
  SaleEvent,
  Backorder,
  Order,
} from '@/data/models';
import { AuthRepository } from '@/services/identity/src/domains/authentication/application';
import { UserRepository } from '@/services/identity/src/domains/user/application';
import { UploadRepository } from '@/services/upload/src/domains/upload/application';
import { ProductRepository } from '@/services/product/src/domains/product/application';
import { CategoryRepository } from '@/services/product/src/domains/category/application';
import { CollectionRepository } from '@/services/product/src/domains/collection/application';
import { FeaturedMediaRepository } from '@/services/product/src/domains/featuredMedia/application';
import { ProductReviewRepository } from '@/services/product/src/domains/productReview/application';
import { ProductTypeRepository } from '@/services/product/src/domains/productType/application';
import { VariantRepository } from '@/services/variant/src/domains/variant/application';
import { SelectedOptionRepository } from '@/services/variant/src/domains/selectedOption/application';
import { InventoryItemRepository } from '@/services/inventory/src/domains/inventoryItem/application';
import { InventoryLevelRepository } from '@/services/inventory/src/domains/inventoryLevel/application';
import { LedgerDocumentRepository } from '@/services/inventory/src/domains/ledgerDocument/application';
import { LocationRepository } from '@/services/inventory/src/domains/location/application';
// import {
//   AutomaticDiscountRepository,
//   DiscountCodeRepository,
//   PriceRuleRepository,
//   SaleEventRepository,
// } from '@/services/event';
// import { BackorderRepository, OrderRepository } from '@/services/order';

class RepositoryFactory {
  static createUserRepository() {
    return new UserRepository(User);
  }

  static createAuthRepository() {
    return new AuthRepository(User);
  }

  static createUploadRepository() {
    return new UploadRepository(Upload);
  }

  static createProductRepository() {
    return new ProductRepository(Product);
  }
  static createCategoryRepository() {
    return new CategoryRepository(Category);
  }
  static createCollectionRepository() {
    return new CollectionRepository(Collection);
  }

  static createFeaturedMediaRepository() {
    return new FeaturedMediaRepository(FeaturedMedia);
  }
  static createProductReviewRepository() {
    return new ProductReviewRepository(ProductReview);
  }
  static createProductTypeRepository() {
    return new ProductTypeRepository(ProductType);
  }
  static createSelectedOptionRepository() {
    return new SelectedOptionRepository(SelectedOption);
  }
  static createVariantRepository() {
    return new VariantRepository(Variant);
  }
  static createInventoryItemRepository() {
    return new InventoryItemRepository(InventoryItem);
  }
  static createInventoryLevelRepository() {
    return new InventoryLevelRepository(InventoryLevel);
  }
  static createLedgerDocumentRepository() {
    return new LedgerDocumentRepository(LedgerDocument);
  }
  static createLocationRepository() {
    return new LocationRepository(Location);
  }

  // static createAutomaticDiscountRepository() {
  //   return new AutomaticDiscountRepository(AutomaticDiscount);
  // }

  // static createDiscountCodeRepository() {
  //   return new DiscountCodeRepository(DiscountCode);
  // }
  // static createPriceRuleRepository() {
  //   return new PriceRuleRepository(PriceRule);
  // }
  // static createSaleEventRepository() {
  //   return new SaleEventRepository(SaleEvent);
  // }
  // static createBackorderRepository() {
  //   return new BackorderRepository(Backorder);
  // }
  // static createOrderRepository() {
  //   return new OrderRepository(Order);
  // }

  // Add methods for other repositories as needed
}

export default RepositoryFactory;
