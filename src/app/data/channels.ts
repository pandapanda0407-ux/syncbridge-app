import { IconName } from '../shared/icon.component';

export type ChannelState = 'live' | 'early' | 'custom' | 'progress';

export interface Channel {
  name: string;
  icon: IconName;
  /** Short status shown on badges and availability panels. */
  status: string;
  state: ChannelState;
  /** One line describing what this channel is for. */
  blurb: string;
  /** Internal route for channels that have their own page. */
  route?: string;
}

export const SHOPIFY_HUB: Channel = {
  name: 'Shopify',
  icon: 'store',
  status: 'Supported',
  state: 'live',
  blurb: 'Your own storefront, and the hub every marketplace connects back to.'
};

export const CHANNELS: Channel[] = [
  {
    name: 'Etsy',
    icon: 'bag',
    status: 'Early access · Launches October',
    state: 'early',
    blurb: 'Two-way inventory, order, and listing sync via the Etsy Open API v3. Open to early-access sellers now.',
    route: '/integrations/etsy'
  },
  {
    name: 'Amazon',
    icon: 'box',
    status: 'In active development',
    state: 'progress',
    blurb: 'Seller Central listings and order sync, in build now.'
  },
  {
    name: 'eBay',
    icon: 'globe',
    status: 'Available as a custom integration',
    state: 'custom',
    blurb: 'Two-way listing, inventory and order sync between eBay and Shopify, plus eBay to Shopify migration. Built and scoped per shop.',
    route: '/integrations/ebay'
  },
  {
    name: 'TikTok Shop',
    icon: 'share',
    status: 'In active development',
    state: 'progress',
    blurb: 'Product catalogue and order sync for TikTok Shop sellers, in build now.'
  }
];

export const EARLY_ACCESS_NOTE =
  'The Etsy integration is in early access now and launches in October, and eBay is available today as a custom integration scoped to your shop. We are onboarding early-bird sellers ahead of the Etsy launch — and if you need a channel we have not shipped yet, or need one to work differently to how we have built it, we will scope and build it for you.';

export const FEEDBACK_NOTE =
  'We are building this with sellers rather than at them. If something about your workflow does not fit how this works, tell us — feedback from real shops is what decides what ships next.';
