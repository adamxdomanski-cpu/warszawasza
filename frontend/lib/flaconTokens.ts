export type FlaconLifecycleState = "FORGED" | "SOLD" | "ACTIVE";

export type ForgeArtifact = {
  flacon_serial_id: string;
  cryptographic_token: string;
  lifecycle_state: "FORGED";
  qr_payload: string;
};
