import { Request, Response } from "express";
import {
  CreateProductInputDTO,
  CreateProductUsecase,
} from "../../../../usecase/product/create/create.usecase";
import { HttpMethod, Route } from "../route/route";

export type CreateProductResponseDTO = {
  id: string;
};

export class CreateProductRoute implements Route {
  private path: string;
  private method: HttpMethod;
  private createProductService: CreateProductUsecase;

  private constructor(
    path: string,
    method: HttpMethod,
    createProductService: CreateProductUsecase
  ) {
    this.path = path;
    this.method = method;
    this.createProductService = createProductService;
  }

  public static create(createProductService: CreateProductUsecase) {
    return new CreateProductRoute(
      "/product",
      HttpMethod.POST,
      createProductService
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { name, price } = request.body;

      const input: CreateProductInputDTO = {
        name,
        price,
      };

      const output: CreateProductResponseDTO =
        await this.createProductService.execute(input);

      const responseBody = this.present(output);

      response.status(201).json(responseBody).send();
    };
  }

  public getPath() {
    return this.path;
  }

  public getMethod() {
    return this.method;
  }

  private present(input: CreateProductResponseDTO) {
    return { id: input.id };
  }
}
