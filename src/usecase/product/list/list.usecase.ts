import { Product } from "../../../domain/product/entity/product";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { Usecase } from "../../usecase";

export type ListProductInputDTO = void;

export type ListProductOutputDTO = {
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export class ListProductUsecase
  implements Usecase<ListProductInputDTO, ListProductOutputDTO>
{
  private productGateway: ProductGateway;

  private constructor(productGateway: ProductGateway) {
    this.productGateway = productGateway;
  }

  public static create(productGateway: ProductGateway) {
    return new ListProductUsecase(productGateway);
  }

  public async execute(): Promise<ListProductOutputDTO> {
    const aProducts = await this.productGateway.list();

    return this.presentOutput(aProducts);
  }

  private presentOutput(products: Product[]) {
    return {
      products: products.map((p) => {
        return {
          id: p.id,
          name: p.name,
          price: p.price,
          quantity: p.quantity,
        };
      }),
    };
  }
}
