import { PrismaClient } from "@prisma/client";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { Product } from "../../../domain/product/entity/product";

export class ProductRepository implements ProductGateway {
  private prismaClient: PrismaClient;

  private constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public static create(prismaClient: PrismaClient) {
    return new ProductRepository(prismaClient);
  }

  public async save(product: Product): Promise<void> {
    await this.prismaClient.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      },
    });
  }

  public async list(): Promise<Product[]> {
    const products = await this.prismaClient.product.findMany();

    const productList = products.map((p) => {
      const product = Product.with({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
      });

      return product;
    });

    return productList;
  }
}
