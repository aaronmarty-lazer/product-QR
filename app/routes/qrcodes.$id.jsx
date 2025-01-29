import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { useLoaderData } from "@remix-run/react";

import db from "../db.server";
import { getQRCodeImage } from "../models/QRCode.server";
import '../styles/qrcode.css'

// Import CSS
import styles from "~/styles/qrcode.css";

// [START loader]
export const loader = async ({ params }) => {
  invariant(params.id, "Could not find QR code destination");

  const id = Number(params.id);
  const qrCode = await db.qRCode.findFirst({ where: { id } });

  invariant(qrCode, "Could not find QR code destination");

  return json({
    title: qrCode.title,
    image: await getQRCodeImage(id),
    description: qrCode.description, // Include description
  });
};
// [END loader]

// Function to include CSS in Remix
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

// [START component]
export default function QRCode() {
  const { image, title, description } = useLoaderData();

  return (
      <div className="qr-container">
      <div className="qr-card">
        <h1 className="qr-title">{title}</h1>
        <div className="qr-image-container">
          <img src={image} alt={`QR Code for ${title}`} className="qr-image" />
        </div>
        <p className="qr-description">{description}</p>
      </div>
    </div>

  );
}
// [END component]
