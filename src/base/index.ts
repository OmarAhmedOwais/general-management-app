// import { inject, injectable } from '@/common/sarri-package/utils/decorators'
// import { BaseController } from './base.controller'
// import { UserController } from '@/services/identity'

import { injectable } from '@/common/sarri-package/utils/decorators'
import { BaseController } from './base.controller'

export * from './base.controller'
export * from './base.service'
export * from './base.repository'
export * from './base.middleware'
export * from './base.validation'


@injectable([BaseController],[],"/") 

class FakeUP extends BaseController<any> {
    // Your class implementation here
 }
// console.log("hello");
  