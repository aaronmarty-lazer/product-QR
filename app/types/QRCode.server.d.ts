declare module "../models/QRCode.server" {
  export function getQRCode(id: number, graphql: any): Promise<any>;
  export function getQRCodes(shop: string, graphql: any): Promise<any[]>;
  export function validateQRCode(data: any): any;
  export function getQRCodeImage(id: number): string;
  export function getDestinationUrl(qrCode: any): string;
}
