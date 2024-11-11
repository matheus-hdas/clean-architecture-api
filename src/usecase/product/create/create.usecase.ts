import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { Usecase } from "../../usecase";
import { Product } from "../../../domain/product/entity/product";

export type CreateProductInputDTO = {
  name: string;
  price: number;
};

export type CreateProductOutputDTO = {
  id: string;
};

export class CreateProductUsecase
  implements Usecase<CreateProductInputDTO, CreateProductOutputDTO>
{
  private productGateway: ProductGateway;

  private constructor(productGateway: ProductGateway) {
    this.productGateway = productGateway;
  }

  public static create(productGateway: ProductGateway) {
    return new CreateProductUsecase(productGateway);
  }

  public async execute(
    input: CreateProductInputDTO
  ): Promise<CreateProductOutputDTO> {
    const aProduct = Product.create(input.name, input.price);

    await this.productGateway.save(aProduct);

    return this.presentOutput(aProduct);
  }

  private presentOutput(product: Product) {
    return { id: product.id };
  }
}
