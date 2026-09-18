import { IconName } from '../shared/icon.component';

export interface Service {
  /** URL segment under /services. */
  slug: string;
  icon: IconName;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ServiceGroup {
  id: string;
  label: string;
  summary: string;
  services: Service[];
}

export const FEATURED_SERVICE: Service = {
  icon: 'plug',
  title: 'Marketplace Integration for Shopify',
  slug: 'marketplace-integration',
  description:
    'Our core service, and the one everything else is built around. SynceBridge connects Shopify to the marketplaces you sell on, so inventory, orders, and listings stay in step without anyone copying numbers between dashboards — sell an item anywhere and stock drops everywhere, in real time. Etsy is in early access and launches in October. eBay is available today as a custom integration — two-way sync and eBay to Shopify migration — with Amazon and TikTok Shop in active development.',
  deliverables: [
    'Two-way inventory and order sync per channel',
    'Listing and product catalogue mapping',
    'OAuth connection setup for every channel',
    'Order consolidation into one fulfilment queue',
    'Overselling prevention and stock reconciliation',
    'Ongoing monitoring, alerting, and support'
  ]
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: 'marketing',
    label: 'Digital Marketing',
    summary:
      'Getting the right buyers to your listings, and turning more of them into orders.',
    services: [
      {
        icon: 'search',
        title: 'SEO',
        slug: 'seo',
        description:
          'Technical and on-page search work for your storefront and website — keyword research, listing and product-page optimisation, site structure, page speed, and the schema markup search engines read.',
        deliverables: ['Keyword & competitor research', 'Listing and page optimisation', 'Technical site audit', 'Monthly ranking reports']
      },
      {
        icon: 'megaphone',
        title: 'Paid Ads Management',
        slug: 'paid-ads-management',
        description:
          'Campaign setup and ongoing management across Google, Meta, and Etsy Ads. We handle targeting, creative testing, bid strategy, and budget pacing, and report on what each channel actually returns.',
        deliverables: ['Campaign build & targeting', 'Creative and copy testing', 'Bid & budget management', 'Spend and ROAS reporting']
      },
      {
        icon: 'share',
        title: 'Social Media Management',
        slug: 'social-media-management',
        description:
          'Content planning, scheduling, and community management for the platforms your buyers actually use. Includes product photography direction and short-form video for launches.',
        deliverables: ['Content calendar', 'Post design & scheduling', 'Community management', 'Launch campaigns']
      },
      {
        icon: 'pen',
        title: 'Content & Copywriting',
        slug: 'content-copywriting',
        description:
          'Product descriptions, category pages, blog articles, and brand messaging written for both search engines and the person reading them.',
        deliverables: ['Product & category copy', 'Blog and guide articles', 'Brand voice guidelines', 'Editorial calendar']
      },
      {
        icon: 'mail',
        title: 'Email & Lifecycle Marketing',
        slug: 'email-marketing',
        description:
          'Automated flows that recover abandoned carts, bring buyers back, and announce restocks — plus the campaign sends in between.',
        deliverables: ['Flow setup & automation', 'Campaign design & sends', 'List segmentation', 'Deliverability monitoring']
      },
      {
        icon: 'chart',
        title: 'Analytics & Conversion Tracking',
        slug: 'analytics-conversion-tracking',
        description:
          'Proper measurement across your stores so decisions come from data — event tracking, attribution, dashboards, and conversion-rate work on the pages that matter.',
        deliverables: ['Tracking implementation', 'Attribution setup', 'Custom dashboards', 'CRO testing']
      }
    ]
  },
  {
    id: 'engineering',
    label: 'IT & Engineering',
    summary:
      'Building and running the software behind your operation, from storefronts to internal tools.',
    services: [
      {
        icon: 'code',
        title: 'Custom App Development',
        slug: 'custom-app-development',
        description:
          'Purpose-built applications for the parts of your business off-the-shelf software does not cover — internal tools, seller dashboards, fulfilment workflows, and public-facing apps.',
        deliverables: ['Scoping & technical design', 'Full-stack build', 'Testing & QA', 'Deployment and handover']
      },
      {
        icon: 'layout',
        title: 'Web & E-commerce Development',
        slug: 'web-development',
        description:
          'Storefronts, marketing sites, and headless commerce builds. Shopify theme development, custom checkout work, and performance-focused frontends.',
        deliverables: ['Storefront & theme builds', 'Headless commerce', 'Performance optimisation', 'Accessibility compliance']
      },
      {
        icon: 'smartphone',
        title: 'Mobile App Development',
        slug: 'mobile-app-development',
        description:
          'Native and cross-platform apps for iOS and Android, including store submission, release management, and post-launch iteration.',
        deliverables: ['iOS & Android builds', 'App store submission', 'Push notifications', 'Release management']
      },
      {
        icon: 'plug',
        title: 'API & Systems Integration',
        slug: 'api-integration',
        description:
          'Connecting the platforms you already run — marketplaces, ERPs, shipping carriers, accounting, and CRMs — with reliable syncing, retry handling, and monitoring.',
        deliverables: ['Integration architecture', 'API development', 'Data migration', 'Error monitoring & alerting']
      },
      {
        icon: 'cloud',
        title: 'Cloud & DevOps',
        slug: 'cloud-devops',
        description:
          'Hosting, deployment pipelines, and infrastructure that scales with order volume. Includes CI/CD, backups, and cost review.',
        deliverables: ['Infrastructure setup', 'CI/CD pipelines', 'Backup & disaster recovery', 'Cost optimisation']
      },
      {
        icon: 'lifebuoy',
        title: 'Maintenance & Support',
        slug: 'maintenance-support',
        description:
          'Ongoing upkeep once something is live — dependency and security updates, uptime monitoring, bug fixes, and a defined response time when something breaks.',
        deliverables: ['Security patching', 'Uptime monitoring', 'Bug fixes', 'Defined response SLAs']
      }
    ]
  }
];

export const ACCOUNT_MANAGEMENT: Service = {
  icon: 'user-check',
  title: 'Account Management',
  slug: 'account-management',
  description:
    'Every ongoing engagement gets a named account manager — one person who knows your setup, runs the reporting, and is the point of contact when something needs a decision. No ticket queues, no re-explaining your business each time.',
  deliverables: [
    'A named point of contact',
    'Scheduled reporting and review calls',
    'Roadmap and priority planning',
    'Coordination across every service you use'
  ]
};

/** Every service that has its own page, in one flat list. */
export const ALL_SERVICES: Service[] = [
  FEATURED_SERVICE,
  ...SERVICE_GROUPS.flatMap(group => group.services),
  ACCOUNT_MANAGEMENT
];

export function findService(slug: string): Service | undefined {
  return ALL_SERVICES.find(service => service.slug === slug);
}

/** The group a service belongs to, used for "related services" links. */
export function groupForService(slug: string): ServiceGroup | undefined {
  return SERVICE_GROUPS.find(group => group.services.some(s => s.slug === slug));
}
