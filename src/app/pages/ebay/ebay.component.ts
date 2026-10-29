import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { IconComponent, IconName } from '../../shared/icon.component';
import { SeoService, ORIGIN } from '../../shared/seo.service';

interface EbayHighlight {
  icon: IconName;
  title: string;
  description: string;
}

interface EbayPlan {
  name: string;
  monthly: number;
  desc: string;
  /** Shown as the headline allowances, the way the app's cards show them. */
  products: string;
  orders: string;
  features: string[];
  popular?: boolean;
}

@Component({
  selector: 'app-ebay',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, IconComponent],
  templateUrl: './ebay.component.html',
  styleUrl: './ebay.component.scss'
})
export class EbayComponent implements OnInit {
  highlights: EbayHighlight[] = [
    {
      icon: 'sync',
      title: 'Two-way inventory sync',
      description:
        'Sell on eBay and the Shopify stock drops. Sell on Shopify and the eBay listing updates. Quantities stay in step in both directions, so the same last item cannot be sold twice.'
    },
    {
      icon: 'box',
      title: 'Orders in one queue',
      description:
        'eBay orders land in the same fulfilment queue as your Shopify orders, with buyer details and line items intact, so you pick and pack from one screen.'
    },
    {
      icon: 'trending-up',
      title: 'eBay to Shopify migration',
      description:
        'Bring an existing eBay catalogue across to Shopify — listings, variations, images and item specifics — without rebuilding each product by hand.'
    },
    {
      icon: 'pen',
      title: 'AI-assisted listing improvement',
      description:
        'Draft titles, item specifics and descriptions from what you already have, so a catalogue moving between platforms does not arrive thin. You review before anything publishes.'
    },
    {
      icon: 'sliders',
      title: 'Mapped to how your shop works',
      description:
        'Scoped per shop rather than a fixed template: your SKU scheme, your variation structure, your business policies and the fields you actually use.'
    },
    {
      icon: 'key',
      title: 'Official API access',
      description:
        'You authorise through eBay, and access is limited to the scopes the integration needs. We never see or store your eBay password, and you can revoke access from eBay at any time.'
    }
  ];

  /**
   * The same ladder the eBay app charges on, kept in step with its
   * `frontend/src/lib/plans.js`. The app is the source of truth: if a price
   * changes there, it has to change here too, because this page is what a
   * seller compares the checkout against.
   */
  plans: EbayPlan[] = [
    {
      name: 'Starter',
      monthly: 19,
      desc: 'For a small catalogue finding its feet on eBay.',
      products: '2,500 products synced',
      orders: '100 eBay orders a month',
      features: [
        'Price sync (Shopify → eBay)',
        'Stock sync (Shopify → eBay)',
        'Activity log (3 days)'
      ]
    },
    {
      name: 'Standard',
      monthly: 29,
      desc: 'For a catalogue that has outgrown the entry tier.',
      products: '5,000 products synced',
      orders: '4,000 eBay orders a month',
      features: [
        'Auto sync schedule',
        'Price sync (Shopify → eBay)',
        'Stock sync (Shopify → eBay)',
        'Activity log (3 days)'
      ]
    },
    {
      name: 'Growth',
      monthly: 59,
      popular: true,
      desc: 'For a shop selling steadily on eBay.',
      products: '10,000 products synced',
      orders: '7,000 eBay orders a month',
      features: [
        'Auto sync schedule',
        'Price and stock sync (Shopify → eBay)',
        'Sync manual eBay stock changes',
        'Activity log (3 days)',
        'Onboarding meetings & seller groups'
      ]
    },
    {
      name: 'Pro',
      monthly: 199,
      desc: 'For a large catalogue and real order volume.',
      products: '20,000 products synced',
      orders: '10,000 eBay orders a month',
      features: [
        'Auto sync schedule',
        'Price and stock sync (Shopify → eBay)',
        'Sync manual eBay stock changes',
        'Priority sync support',
        'Activity log (3 days)',
        'Onboarding meetings & seller groups'
      ]
    },
    {
      name: 'Enterprise',
      monthly: 349,
      desc: 'For the largest catalogues, with support to match.',
      products: '30,000 products synced',
      orders: '15,000 eBay orders a month',
      features: [
        'Auto sync schedule',
        'Price and stock sync (Shopify → eBay)',
        'Sync manual eBay stock changes',
        'Priority sync support',
        'Activity log (3 days)',
        'Onboarding meetings & seller groups'
      ]
    }
  ];

  /** Carried by every tier, stated once so "on all plans" cannot drift. */
  commonFeatures: string[] = [
    'AI help optimising listings',
    'AI help creating rules',
    'Email, chat & ticket support'
  ];

  /**
   * The right half of the fold. Every line is a fact stated elsewhere on the
   * page, put where someone deciding whether to read on will see it.
   */
  heroFacts = [
    { label: 'Availability', value: 'Available now' },
    { label: 'Plans from', value: '$19 / month' },
    { label: 'Free trial', value: '7 days, no card' },
    { label: 'Inventory sync', value: 'Both directions' },
    { label: 'Catalogue import', value: '10c per listing, once' },
    { label: 'Connects via', value: 'Official eBay APIs' }
  ];

  /**
   * What actually moves between the two shops, field by field.
   *
   * The pages that rank for this answer it explicitly rather than leaving it
   * to "two-way sync" — a seller comparing tools is checking whether their
   * particular field is covered, and a page that does not say loses to one
   * that does. Direction is stated per row because it is not the same for
   * every field, and claiming two-way on a field that is one-way is the kind
   * of thing a seller discovers after they have bought.
   */
  syncFields = [
    {
      field: 'Inventory',
      direction: 'Both ways',
      detail: 'An eBay sale lowers the Shopify quantity and a Shopify sale updates the eBay listing, in real time.'
    },
    {
      field: 'Orders',
      direction: 'eBay → Shopify',
      detail: 'eBay orders arrive in the Shopify fulfilment queue with buyer details and line items intact.'
    },
    {
      field: 'Price',
      direction: 'Shopify → eBay',
      detail: 'Shopify is the source for price. A change there pushes out to the eBay listing.'
    },
    {
      field: 'Titles & descriptions',
      direction: 'Shopify → eBay',
      detail: 'Listing content is pushed from your Shopify product, with AI help drafting what eBay needs.'
    },
    {
      field: 'Variants',
      direction: 'Shopify → eBay',
      detail: 'Shopify variants map to eBay multi-variation listings, matched on your own SKU scheme.'
    },
    {
      field: 'Images',
      direction: 'Shopify → eBay',
      detail: 'Product images come across with the listing rather than being re-uploaded by hand.'
    },
    {
      field: 'Manual eBay stock edits',
      direction: 'eBay → Shopify',
      detail: 'A quantity changed directly in Seller Hub is read back, on Growth and above.'
    }
  ];

  /**
   * The four steps, as a seller does them. Written as instructions because
   * "how do I connect Shopify and eBay" is a question people type, and the
   * results that win it answer it on the page instead of asking for a demo.
   */
  steps = [
    {
      title: 'Connect your eBay account',
      body: 'Authorise through eBay itself. You are sent to eBay\'s own sign-in, and we receive a scoped token rather than your password. Nothing is read until you have approved it.'
    },
    {
      title: 'Import your Shopify products',
      body: 'Your catalogue is read from Shopify and matched against what already exists on eBay by SKU, so products you have listed on both sides are linked rather than duplicated.'
    },
    {
      title: 'Set your listing rules',
      body: 'Decide what maps where: eBay categories, item specifics, business policies, and whether a price on eBay should differ from the Shopify one. This is where your shop\'s own shape gets handled.'
    },
    {
      title: 'Turn on the sync',
      body: 'Run the first sync and the two stay in step from then on. Stock moves in both directions, orders flow into Shopify, and the activity log shows what changed.'
    }
  ];

  /**
   * The questions sellers actually search before they search for an app:
   * priced, directional and specific. Answered on the page so the FAQ schema
   * describes visible content rather than markup written only for a crawler.
   */
  faq = [
    {
      q: 'How do I sync eBay and Shopify inventory?',
      a: 'Connect both accounts through their official APIs and SyncE Bridge keeps quantities in step automatically. Sell on eBay and the Shopify stock drops; sell on Shopify and the eBay listing updates. Plans start at $19 a month with a 7-day free trial.'
    },
    {
      q: 'How much does the Shopify eBay integration cost?',
      a: 'Monthly plans run from $19 for 2,500 products and 100 eBay orders a month up to $349 for 30,000 products and 15,000 orders. Bringing an existing eBay catalogue into Shopify is charged once at 10c per listing, from 100 listings up to 200,000.'
    },
    {
      q: 'Can I migrate my eBay listings to Shopify?',
      a: 'Yes. The import turns your eBay listings into Shopify products, including variations, images and item specifics, and is charged once per listing rather than monthly. Add any monthly plan on top if you also want the two kept in step afterwards.'
    },
    {
      q: 'Does the eBay Shopify sync work in both directions?',
      a: 'Inventory and orders sync both ways: eBay sales reduce Shopify stock and Shopify sales update the eBay listing, so the same last item cannot be sold twice. Price and listing pushes run from Shopify out to eBay.'
    },
    {
      q: 'Is there a free trial?',
      a: 'Every monthly plan starts with a 7-day free trial and no credit card is required. You can upgrade or downgrade at any time; a plan change takes effect immediately and Shopify adjusts the charge.'
    },
    {
      q: 'Do I need to share my eBay password?',
      a: 'No. You authorise through eBay itself and the integration receives a scoped token limited to what it needs. We never see or store your eBay password, and you can revoke access from your eBay account at any time.'
    }
  ];

  constructor(private seo: SeoService) {}

  ngOnInit() {
    this.seo.apply({
      title: 'eBay Shopify Integration — Two-Way Inventory & Order Sync | SyncE Bridge',
      description:
        'Sync eBay and Shopify inventory, orders and listings in real time through the official eBay APIs. Two-way stock sync, eBay to Shopify migration from 10c a listing, and plans from $19/mo with a 7-day free trial.',
      path: '/integrations/ebay',
      breadcrumbs: [{ name: 'Marketplaces', path: '/marketplaces' }],
      faq: this.faq,
      // Real prices, so the ladder is described as offers rather than left in
      // prose. The range is what a search result can surface as "from $19".
      schema: {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'SyncE Bridge for eBay',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: `${ORIGIN}/integrations/ebay`,
        description:
          'Two-way inventory, order and listing sync between eBay and Shopify, plus eBay to Shopify catalogue migration.',
        featureList: [
          'Two-way eBay and Shopify inventory sync',
          'eBay orders in the Shopify fulfilment queue',
          'eBay to Shopify catalogue migration',
          'AI-assisted eBay listing improvement',
          'Official eBay API access via OAuth'
        ],
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: this.plans[0].monthly,
          highPrice: this.plans[this.plans.length - 1].monthly,
          offerCount: this.plans.length,
          offers: this.plans.map(plan => ({
            '@type': 'Offer',
            name: plan.name,
            price: plan.monthly,
            priceCurrency: 'USD',
            description: plan.desc,
            url: `${ORIGIN}/integrations/ebay#pricing`
          }))
        }
      }
    });
  }
}
