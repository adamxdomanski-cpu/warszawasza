/**
 * Canonical outbound channels — WARSZAWASZA field presence.
 * Parseable IDs for FOP `rel channel` lines; human labels for /origin discovery.
 * Not a marketing footer — instrument-quiet mapping only.
 */

export type ChannelRole =
  | "web"
  | "brand_social"
  | "operator_social"
  | "contact";

export type ChannelRecord = {
  id: string;
  role: ChannelRole;
  platform: "web" | "facebook" | "instagram" | "tumblr" | "pinterest" | "email";
  url: string;
  /** Short handle or label shown in UI */
  label: string;
  /** Optional FOP-safe token (no spaces) */
  fopRef: string;
};

/** Primary site */
export const CHANNEL_WEB: ChannelRecord = {
  id: "WEB_WSZ",
  role: "web",
  platform: "web",
  url: "https://www.warszawasza.online",
  label: "warszawasza.online",
  fopRef: "WEB:warszawasza.online",
};

/** Facebook — Warszawasza (page/profile id confirmed by operator) */
export const CHANNEL_FACEBOOK: ChannelRecord = {
  id: "FB_WSZ",
  role: "brand_social",
  platform: "facebook",
  url: "https://www.facebook.com/profile.php?id=100085586858916",
  label: "Warszawasza",
  fopRef: "FB:100085586858916",
};

/** Instagram — brand field */
export const CHANNEL_INSTAGRAM_WARSZAWASZA: ChannelRecord = {
  id: "IG_WSZ",
  role: "brand_social",
  platform: "instagram",
  url: "https://www.instagram.com/warszawasza",
  label: "@warszawasza",
  fopRef: "IG:warszawasza",
};

/** Instagram — operator / satellite trace (warsallica) */
export const CHANNEL_INSTAGRAM_WARSALLICA: ChannelRecord = {
  id: "IG_WARSALLICA",
  role: "operator_social",
  platform: "instagram",
  url: "https://www.instagram.com/warsallica/",
  label: "@warsallica",
  fopRef: "IG:warsallica",
};

/** Tumblr — brand field / archiwum editorialne */
export const CHANNEL_TUMBLR: ChannelRecord = {
  id: "TBL_WSZ",
  role: "brand_social",
  platform: "tumblr",
  url: "https://www.tumblr.com/warszawasza",
  label: "warszawasza",
  fopRef: "TBL:warszawasza",
};

/** Pinterest — brand moodboard / archiwum wizualne */
export const CHANNEL_PINTEREST: ChannelRecord = {
  id: "PIN_WSZ",
  role: "brand_social",
  platform: "pinterest",
  url: "https://pl.pinterest.com/warszawasza",
  label: "warszawasza",
  fopRef: "PIN:warszawasza",
};

export const CHANNEL_EMAIL: ChannelRecord = {
  id: "MAIL_WSZ",
  role: "contact",
  platform: "email",
  url: "mailto:hello@warszawasza.online",
  label: "hello@warszawasza.online",
  fopRef: "MAIL:hello@warszawasza.online",
};

/** All mapped channels in stable order */
export const WARSZAWASZA_CHANNELS: readonly ChannelRecord[] = [
  CHANNEL_WEB,
  CHANNEL_FACEBOOK,
  CHANNEL_INSTAGRAM_WARSZAWASZA,
  CHANNEL_INSTAGRAM_WARSALLICA,
  CHANNEL_TUMBLR,
  CHANNEL_PINTEREST,
  CHANNEL_EMAIL,
] as const;

/** Channels surfaced on /origin (no email in list — mailto stays in main UI) */
export const ORIGIN_CHANNEL_LINKS: readonly ChannelRecord[] = [
  CHANNEL_WEB,
  CHANNEL_FACEBOOK,
  CHANNEL_INSTAGRAM_WARSZAWASZA,
  CHANNEL_INSTAGRAM_WARSALLICA,
  CHANNEL_TUMBLR,
  CHANNEL_PINTEREST,
] as const;

export function channelFopRelation(channel: ChannelRecord): string {
  return `channel ${channel.fopRef}`;
}

export function lookupChannelById(id: string): ChannelRecord | undefined {
  return WARSZAWASZA_CHANNELS.find((c) => c.id === id);
}
