import { Context, Callback } from "aws-lambda";
import { ProductEvent } from "./layers/productEventsLayer/nodejs/productEvent";
import { DynamoDB } from "aws-sdk";
import * as AWSXRay from "aws-xray-sdk"

AWSXRay.captureAWS(require("aws-sdk"))

const eventsDdb = process.env.EVENTS_DDB!
const ddbClient = new DynamoDB.DocumentClient()

export async function handler(event: ProductEvent, context: Context, callback: Callback): Promise<void> {
    //todo - to be removed
    console.log(event)

    console.log(`Lambda requestId:${context.awsRequestId}`)

    await createEvent(event)

    callback(null, JSON.stringify({
        productEventCreated: true,
        message: "OK"
    }))
}

function createEvent(event: ProductEvent) {
    if (!event.productCode || !event.eventType) {
        console.error('productCode e eventType são necessários.');
        return;
    }
    console.log("productCode:", event.productCode);
    console.log("eventType:", event.eventType);
    console.log('OOLHAA Item a ser inserido:', JSON.stringify({
        pk: `#product_${event.productCode}`,
        sk: `${event.eventType}#${Date.now()}`,
        email: event.email,
        createAt: Date.now(),
        requestId: event.requestId,
        eventType: event.eventType,
        info: {
            productId: event.productId,
            price: event.productPrice
        },
        ttl: ~~(Date.now() / 1000) + (5 * 60)
    }));
    const timestamp = Date.now()
    const ttl = ~~(timestamp / 1000) + (5 * 60)//5 minutos à frente

    return ddbClient.put({
        TableName: eventsDdb,
        Item: {
            pk: `#product_${event.productCode}`,
            sk: `${event.eventType}#${timestamp}`,
            email: event.email,
            createdAt: timestamp,
            requestId: event.requestId,
            eventType: event.eventType,
            info: {
                productId: event.productId,
                price: event.productPrice
            },
            ttl: ttl
        }
    }).promise()
}
