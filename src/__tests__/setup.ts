import { AppDataSource } from "@/common/config/data-source";

// This setup file will run before your tests. You can set up your test database connection here
beforeAll(async () => {
  await AppDataSource.initialize();
});

// Tear down your test database after all tests are done
afterAll(async () => {
  await AppDataSource.destroy();
});
