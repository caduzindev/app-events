export interface PayGateway {
  createSellerAccount(email: string): Promise<string>;
}
