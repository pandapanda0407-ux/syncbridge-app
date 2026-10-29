import { IconName } from '../shared/icon.component';

/**
 * Content for the per-marketplace pages that are not Etsy or eBay.
 *
 * Etsy and eBay have hand-built pages because each carries something the
 * others do not — Etsy the API scope table written for Etsy's review, eBay the
 * price ladder. Amazon and TikTok Shop are the same shape as each other, so
 * they are one template fed from here rather than two more 500-line
 * components, and a fifth channel is a new entry rather than a new page.
 *
 * Status wording is deliberate. These two are in development, and nothing on
 * these pages may read as though they ship today — see the roadmap note in
 * channels.ts. What is available now is the custom build, which is a real
 * offer, so that is what each page asks for.
 */
export interface ChannelPage {
  slug: string;
  name: string;
  /** Page <title>. Leads with the query, not the brand. */
  title: string;
  metaDescription: string;
  /** The short status line in the hero. Must match the real state. */
  status: string;
  heading: string;
  headingAccent: string;
  intro: string;
  highlights: { icon: IconName; title: string; description: string }[];
  /** Why this marketplace differs from the others, as a seller experiences it. */
  differences: { title: string; body: string }[];
  faq: { q: string; a: string }[];
}

export const CHANNEL_PAGES: ChannelPage[] = [
  {
    slug: 'amazon',
    name: 'Amazon',
    title: 'Amazon Shopify Integration — Sync Inventory & Orders | SyncE Bridge',
    metaDescription:
      'Connect Amazon Seller Central to your Shopify store: inventory, order and listing sync through the official Selling Partner API. In active development, with custom builds scoped per shop available now.',
    status: 'In active development · Custom builds available now',
    heading: 'The Amazon integration,',
    headingAccent: 'built for Seller Central',
    intro:
      'Keeping an Amazon catalogue and a Shopify store in step, through the official Selling Partner API. The packaged integration is in active development. If you need Amazon connected before it ships, we scope and build it against your catalogue — that part is available today.',
    highlights: [
      {
        icon: 'sync',
        title: 'Inventory sync both ways',
        description:
          'An Amazon sale reduces the Shopify quantity and a Shopify sale updates the Amazon offer, so the same last unit cannot be sold on both. One stock figure rather than one per channel.'
      },
      {
        icon: 'box',
        title: 'Orders in one queue',
        description:
          'Amazon orders arrive in the same fulfilment queue as your Shopify orders, with line items and shipping details intact, so you pick and pack from one screen instead of two consoles.'
      },
      {
        icon: 'store',
        title: 'Listings mapped to ASINs',
        description:
          'Shopify products matched to the right ASIN, with the attributes each category requires. Where no listing exists yet, the product is prepared as a new offer rather than silently skipped.'
      },
      {
        icon: 'sliders',
        title: 'FBA and FBM handled apart',
        description:
          'Fulfilled by Amazon stock is Amazon\'s to count and merchant-fulfilled stock is yours. The two are tracked separately so FBA quantities never overwrite what you hold yourself.'
      },
      {
        icon: 'pen',
        title: 'AI-assisted listing content',
        description:
          'Draft titles, bullet points and attributes from the product data you already have, so a catalogue arriving on Amazon is not thin. You review everything before it publishes.'
      },
      {
        icon: 'key',
        title: 'Official API access',
        description:
          'Through the Amazon Selling Partner API with scoped authorisation. We never see or store your Seller Central password, and you can revoke access from Amazon at any time.'
      }
    ],
    differences: [
      {
        title: 'The catalogue is shared, not yours',
        body:
          'On Shopify a product is your record. On Amazon you are attaching an offer to a catalogue entry that may already exist, with attributes the category dictates rather than ones you choose. Matching to the right ASIN is most of the work, and getting it wrong is worse than not listing at all.'
      },
      {
        title: 'Fulfilment changes who owns the stock',
        body:
          'FBA inventory sits in Amazon\'s warehouses and Amazon is the authority on the count. Merchant-fulfilled stock is yours. An integration that treats both as one number will overwrite real quantities with warehouse ones, which is why we keep them apart.'
      },
      {
        title: 'Rate limits shape the design',
        body:
          'The Selling Partner API meters requests per operation, so a sync has to queue and batch rather than push everything at once. Built well this is invisible; built badly it is why stock updates arrive an hour late.'
      }
    ],
    faq: [
      {
        q: 'How do I sync Amazon and Shopify inventory?',
        a: 'Both accounts are connected through their official APIs and one stock figure is held per product, so an Amazon sale lowers the Shopify quantity and a Shopify sale updates the Amazon offer. The packaged Amazon integration is in active development; a custom build scoped to your catalogue is available now.'
      },
      {
        q: 'Is the Amazon integration available yet?',
        a: 'Not as a packaged integration — it is in active development and we are not going to tell you it ships today when it does not. What is available now is a custom build: we scope it against your real catalogue and fulfilment setup and build it for your shop.'
      },
      {
        q: 'Does it handle FBA and merchant-fulfilled stock separately?',
        a: 'Yes. FBA quantities are held by Amazon and merchant-fulfilled quantities are yours, and the two are tracked separately so warehouse figures never overwrite the stock you hold and sell yourself.'
      },
      {
        q: 'Will it match my products to existing ASINs?',
        a: 'Yes. Products are matched to the correct ASIN where one exists, with the attributes the category requires. Where no catalogue entry matches, the product is prepared as a new offer rather than skipped without telling you.'
      },
      {
        q: 'Can I run Amazon alongside eBay and Etsy?',
        a: 'That is the point of the hub. Shopify holds the stock figure and every connected channel reads from it, so adding Amazon to a shop already selling on eBay or Etsy does not split your inventory three ways.'
      }
    ]
  },
  {
    slug: 'tiktok-shop',
    name: 'TikTok Shop',
    title: 'TikTok Shop Shopify Integration — Sync Products & Orders | SyncE Bridge',
    metaDescription:
      'Connect TikTok Shop to your Shopify store: product catalogue, inventory and order sync through the official TikTok Shop API. In active development, with custom builds scoped per shop available now.',
    status: 'In active development · Custom builds available now',
    heading: 'The TikTok Shop integration,',
    headingAccent: 'built for how it sells',
    intro:
      'Product catalogue, stock and order sync between TikTok Shop and Shopify, through the official TikTok Shop API. The packaged integration is in active development. If you are already selling on TikTok and need it connected now, we scope and build it against your shop.',
    highlights: [
      {
        icon: 'sync',
        title: 'Stock that keeps up with a spike',
        description:
          'A video lands and a product sells out in minutes. Quantities sync in real time so the Shopify figure follows a TikTok rush, rather than catching up after you have oversold.'
      },
      {
        icon: 'box',
        title: 'Orders in one queue',
        description:
          'TikTok Shop orders join the same fulfilment queue as your Shopify orders, with buyer and line item detail intact, so a viral day does not mean a second screen to work from.'
      },
      {
        icon: 'store',
        title: 'Catalogue pushed from Shopify',
        description:
          'Your Shopify products become TikTok Shop listings with variants, images and pricing mapped across, instead of rebuilding the catalogue by hand in a second seller centre.'
      },
      {
        icon: 'trending-up',
        title: 'Built for short, sharp demand',
        description:
          'TikTok demand is spiky in a way most marketplaces are not. Syncs are queued so a thousand orders in an hour is throughput rather than a backlog.'
      },
      {
        icon: 'pen',
        title: 'AI-assisted listing content',
        description:
          'Draft titles and product details from what you already have, so products moving onto TikTok Shop arrive complete. Nothing publishes before you have read it.'
      },
      {
        icon: 'key',
        title: 'Official API access',
        description:
          'Through the TikTok Shop Partner API with scoped authorisation. We never see or store your TikTok credentials, and access can be revoked from your TikTok Shop account at any time.'
      }
    ],
    differences: [
      {
        title: 'Demand arrives all at once',
        body:
          'Most marketplaces sell at a fairly steady rate. TikTok does not: a video performs and a product takes a month of orders in an afternoon. A sync that polls every fifteen minutes is fine on eBay and is how you oversell on TikTok.'
      },
      {
        title: 'The content is the storefront',
        body:
          'Products are discovered through video rather than search, so what matters is that the right variant is in stock and buyable at the moment someone taps, not that the listing is keyword-optimised the way an Amazon or eBay listing has to be.'
      },
      {
        title: 'Fulfilment expectations are tight',
        body:
          'TikTok Shop holds sellers to dispatch windows that punish a missed order quickly. Orders landing in the same queue as everything else is what keeps a spike from turning into late shipments and a damaged seller rating.'
      }
    ],
    faq: [
      {
        q: 'How do I sync TikTok Shop and Shopify inventory?',
        a: 'The two are connected through their official APIs and share one stock figure per product, so a TikTok Shop sale lowers the Shopify quantity immediately. The packaged integration is in active development; a custom build for your shop is available now.'
      },
      {
        q: 'Is the TikTok Shop integration available yet?',
        a: 'Not as a packaged integration — it is in active development. A custom build scoped to your shop is available today if you are already selling on TikTok Shop and need it connected before the packaged version ships.'
      },
      {
        q: 'Can it keep up when a video goes viral?',
        a: 'That is the case it is designed around. Syncs are queued and processed in real time rather than on a fifteen minute poll, because TikTok demand arrives in minutes and a slow sync is how a spike turns into oversold orders.'
      },
      {
        q: 'Do my Shopify products become TikTok Shop listings?',
        a: 'Yes. Variants, images and pricing are mapped across from Shopify so you are not rebuilding the catalogue by hand in a second seller centre.'
      },
      {
        q: 'Can I sell on TikTok Shop and other marketplaces at once?',
        a: 'Yes. Shopify stays the hub and every connected channel reads the same stock figure, so TikTok Shop sits alongside eBay, Etsy or Amazon without splitting your inventory between them.'
      }
    ]
  }
];

export const channelPage = (slug: string): ChannelPage | undefined =>
  CHANNEL_PAGES.find(c => c.slug === slug);
