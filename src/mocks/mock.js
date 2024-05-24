import { fakerES as faker } from '@faker-js/faker';

const generateMockProducts = () => {
    const mockProducts = [];
    for (let i = 1; i <= 100; i++) {
        mockProducts.push({
            title: faker.commerce.productName(),
            description: faker.lorem.sentence(),
            price: faker.number.int({ min: 1, max: 100 }),
            stock: faker.number.int({ min: 1, max: 50 }),
            thumbnails: faker.image.url(),
            code: `P${i}`,
            category: faker.commerce.department(),
            status: true,
            _id: faker.database.mongodbObjectId(),
        });
    }
    return mockProducts;
};

export { generateMockProducts };