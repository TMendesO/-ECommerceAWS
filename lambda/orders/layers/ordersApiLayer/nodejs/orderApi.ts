export enum PaymentType {
    CASH = "CASH",
    DEBIT_CARD = "DEBIT_CARD",
    CREDIT_CARD = "CREDIT_CARD"
}

export enum ShippingType {
    ECONOMIC = "ECONOMIC",
    URGENT = "URGNET"
}

export enum CarrierType {
    CORREIOS = "CORREIOS",
    FEDEX = "FEDEX"
}

export interface ORderRequest {
    email: string,
    productIds: string[],
    payment: PaymentType,
    shippiing: {
        type: ShippingType,
        carrier: CarrierType
    }
}

export interface OrderProduct {
    code: string,
    price: number
}

export interface OrderResponse {
    email: string,
    id: string,
    createdAt: number,
    billing: {
        payment: PaymentType,
        totalPrice: number
    },
    shipping: {
        type: ShippingType,
        carrier: CarrierType
    }
    products: OrderProduct[]

}