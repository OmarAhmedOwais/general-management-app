import { User, Category, Location } from '@/data/models';
import { Categories, UserRole } from '@/data/types';
import { Password } from './password';

const createAdmin = async () => {
  try {
    const user = await User.findOne({ email: 'rootadmin@gmail.com' });
    if (!user) {
      await User.create({
        name: 'admin',
        email: 'rootadmin@gmail.com',
        password: Password.hash('123123123'),
        phone: '01111111111',
        role: UserRole.ADMIN,
      });

      console.log('Admin User Created!');
    }
  } catch (err) {
    console.log(err);
  }
};

const createCategories = async () => {
  try {
    const count = await Category.estimatedDocumentCount();
    if (count > 0) return;

    const defaultCategories = {
      name: {
        en: Categories.UNCATEGORIZED_EN,
        ar: Categories.UNCATEGORIZED_AR,
      },
      fullName: {
        en: Categories.UNCATEGORIZED_EN,
        ar: Categories.UNCATEGORIZED_AR,
      },
      description: {
        en: Categories.UNCATEGORIZED_EN,
        ar: Categories.UNCATEGORIZED_AR,
      },
      image: 'test.png',
      publicId: 'uc',
      level: 0,
    };
    await Category.create(defaultCategories);
    console.log('Default Categories Created!');
  } catch (err) {
    console.error(err);
  }
};

const createDefaultLocation = async () => {
  try {
    const defaultLocationName = 'Main Location'; // Change this to your desired default location name

    // Check and create default location if not exists
    let defaultLocation = await Location.findOne({ name: defaultLocationName });
    if (!defaultLocation) {
      defaultLocation = await Location.create({
        name: defaultLocationName,
        address: '123 Main St',
        city: 'Default City',
        state: 'Default State',
        country: 'Default Country',
        postalCode: '00000',
        phone: '123-456-7890',
        isActive: true,
        isDefault: true,
      });
      console.log('Default location created.');
    }
  } catch (error) {
    console.error('Error creating default location :', error);
  }
};

export { createAdmin, createCategories, createDefaultLocation };
