import { APIGateway, DynamoDB } from "aws-sdk"
import { ordersRepository } from "./layers/ordersLayer/nodejs/orderRepository";
import { ProductRepository } from "lambda/products/layers/productsLayer/nodejs/productRepository";
import * as AWSXRay from "aws-xray-sdk"
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";


AWSXRay.captureAWS(require("aws-cdk"))

const ordersDdb = process.env.ORDERS_DDB!
const productsDdb = process.env.PRODUCTS_DDB!

const ddbClient = new DynamoDB.DocumentClient()


const orderRepository = new ordersRepository(ddbClient, ordersDdb)
const productRepository = new ProductRepository(ddbClient, productsDdb)


export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    const method = event.httpMethod
    const apiRequestId = event.requestContext.requestId
    const lambdaRequestId = context.awsRequestId

    console.log(`API Gateway RequestId: ${apiRequestId} - LambdaRequestId: ${lambdaRequestId}`)

    if (method === 'GET') {
        if (event.queryStringParameters) {
            const email = event.queryStringParameters!.email
            const orderId = event.queryStringParameters!.orderId
            if (email) {
                if (orderId) {
                    //Get one order from an user
                } else {
                    //Get all orders from an user
                }
            }
        } else {
            //Get all orders
        }

    } else if (method === 'POST') {

    } else if (method === 'DELETE') {

        const email = event.queryStringParameters!.email
        const orderId = event.queryStringParameters!.orderId
    }


    return {
        statusCode: 400,
        body: 'Bad request'
    }
}