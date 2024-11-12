import { Request, Response } from "express";
import {
  ListProductOutputDTO,
  ListProductUsecase,
} from "../../../../usecase/product/list/list.usecase";
import { HttpMethod, Route } from "../route/route";

export type ListProductResponseDTO = {
  products: {
    id: string;
    name: string;
    price: number;
  }[];
};

export class ListProductRoute implements Route {
  private path: string;
  private method: HttpMethod;
  private listProductService: ListProductUsecase;

  private constructor(
    path: string,
    method: HttpMethod,
    listProductService: ListProductUsecase
  ) {
    this.path = path;
    this.method = method;
    this.listProductService = listProductService;
  }

  public static create(listProductService: ListProductUsecase) {
    return new ListProductRoute("/product", HttpMethod.GET, listProductService);
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const output = await this.listProductService.execute();

      const responseBody = this.present(output);

      response.status(200).json(responseBody).send();
    };
  }

  public getPath() {
    return this.path;
  }

  public getMethod() {
    return this.method;
  }

  private present(input: ListProductOutputDTO): ListProductResponseDTO {
    return {
      products: input.products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
      })),
    };
  }
}
