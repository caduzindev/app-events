export interface Product {
  name: string;
  value: number;
  quantity: number;
}

export interface Customer {
  name: string;
  metadata: any;
}
export interface PayGateway {
  createSellerAccount(email: string): Promise<string>;
  activateSellerAccountLink(account_id: string): Promise<string>;
  createCheckoutMarketplaceLink(
    account_id: string,
    customer: Customer,
    products: Product[],
    percent: number,
  ): Promise<string>;
}
