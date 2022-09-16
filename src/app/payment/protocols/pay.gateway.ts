export interface PayGateway {
  createSellerAccount(email: string): Promise<string>;
  activateSellerAccountLink(account_id: string): Promise<string>;
}
