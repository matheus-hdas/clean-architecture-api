import { ExpressApi } from "./infra/api/express/api.express";
import { CreateProductRoute } from "./infra/api/express/product/create-product.express.route";
import { ListProductRoute } from "./infra/api/express/product/list-product.express.route";
import { ProductRepository } from "./infra/repository/product/product.repository";
import { prisma } from "./package/prisma/prisma";
import { CreateProductUsecase } from "./usecase/product/create/create.usecase";
import { ListProductUsecase } from "./usecase/product/list/list.usecase";

function main() {
  const repository = ProductRepository.create(prisma);

  const createProductUsecase = CreateProductUsecase.create(repository);
  const listProductUsecase = ListProductUsecase.create(repository);

  const createRoute = CreateProductRoute.create(createProductUsecase);
  const listRoute = ListProductRoute.create(listProductUsecase);

  const api = ExpressApi.create([createRoute, listRoute]);

  api.start(8000);
}

main();
