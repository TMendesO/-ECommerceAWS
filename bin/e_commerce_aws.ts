#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProductsAppStack } from '../lib/productsApp-stack';
import { ECommerceApiStack } from '../lib/ecommerceApi-stack';
import { ProductsAppLayersStack } from '../lib/productsAppLayers-stack';
import { EventsDdbStack } from '../lib/eventsDdb-stack';
import { OrdesAppLayersStack } from '../lib/ordersAppLayers-stack';
import { OrdesAppStack } from '../lib/ordersApp-stack';

const app = new cdk.App();

const env: cdk.Environment = {
  account: "890170421202",
  region: "us-east-1"
}

const tags = {
  cost: "ECommerce",
  team: "MendesCode"
}

const productsAppLayersStack = new ProductsAppLayersStack(app, "ProducstAppLayers", {
  tags: tags,
  env: env
})

const eventsDdbStack = new EventsDdbStack(app, "EventsDdb", {
  tags: tags,
  env: env
})

const productsAppStack = new ProductsAppStack(app, "ProductsApp", {
  eventsDdb: eventsDdbStack.table,
  tags: tags,
  env: env
})

productsAppStack.addDependency(productsAppLayersStack)
productsAppStack.addDependency(eventsDdbStack)

const ordesAppLayersStack = new OrdesAppLayersStack(app, "OrdersAppLayers", {
  tags: tags,
  env: env
})

const ordersAppSatck = new OrdesAppStack(app, "OrdesAppStack", {
  tags: tags,
  env: env,
  productsDdb: productsAppStack.productsDdb
})

ordersAppSatck.addDependency(productsAppStack)
ordersAppSatck.addDependency(ordesAppLayersStack)

const eCommerceApiStack = new ECommerceApiStack(app, "ECommerceApi", {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  productsAdminHandler: productsAppStack.productsAdminHandler,
  ordersHandler: ordersAppSatck.ordersHandler,
  tags: tags,
  env: env
})


eCommerceApiStack.addDependency(productsAppStack);
eCommerceApiStack.addDependency(ordersAppSatck);