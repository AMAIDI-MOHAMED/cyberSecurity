import type { APIRoute } from 'astro';

// Search data structure - in a real app this would come from a database
const searchData = [
  // Main Pages
  { id: '1', title: 'Home', content: 'DataNova cybersecurity compliance platform', url: '/', type: 'page', category: 'Company' },
  { id: '2', title: 'About', content: 'About DataNova cybersecurity experts', url: '/about', type: 'page', category: 'Company' },
  { id: '3', title: 'Services', content: 'Cybersecurity consulting and compliance services', url: '/services', type: 'page', category: 'Services' },
  { id: '4', title: 'Contact', content: 'Contact DataNova cybersecurity experts', url: '/contact', type: 'page', category: 'Company' },
  
  // Frameworks
  { id: '10', title: 'ISO 27001', content: 'ISO 27001 information security management system implementation guide', url: '/frameworks/iso-27001', type: 'framework', category: 'Resources', framework: 'ISO 27001' },
  { id: '11', title: 'NIS2 Directive', content: 'NIS2 directive network information security compliance', url: '/frameworks/nis2', type: 'framework', category: 'Resources', framework: 'NIS2' },
  { id: '12', title: 'GDPR', content: 'GDPR general data protection regulation compliance', url: '/frameworks/gdpr', type: 'framework', category: 'Resources', framework: 'GDPR' },
  { id: '13', title: 'SOC 2', content: 'SOC 2 service organization control audit readiness', url: '/frameworks/soc-2', type: 'framework', category: 'Resources', framework: 'SOC 2' },
  { id: '14', title: 'DORA', content: 'DORA digital operational resilience act compliance', url: '/frameworks/dora', type: 'framework', category: 'Resources', framework: 'DORA' },
  { id: '15', title: 'eIDAS', content: 'eIDAS electronic identification trust services', url: '/frameworks/eidas', type: 'framework', category: 'Resources', framework: 'eIDAS' },
  { id: '16', title: 'Common Criteria', content: 'Common Criteria security evaluation standards', url: '/frameworks/common-criteria', type: 'framework', category: 'Resources', framework: 'Common Criteria' },
  
  // Services
  { id: '20', title: 'NIS2 Compliance Services', content: 'NIS2 directive compliance consulting implementation', url: '/services/regulatory-compliance/nis2-compliance', type: 'service', category: 'Services', framework: 'NIS2' },
  { id: '21', title: 'DORA Compliance Services', content: 'DORA digital operational resilience consulting', url: '/services/regulatory-compliance/dora-compliance', type: 'service', category: 'Services', framework: 'DORA' },
  { id: '22', title: 'GDPR Privacy Services', content: 'GDPR data protection privacy compliance consulting', url: '/services/regulatory-compliance/gdpr-privacy-services', type: 'service', category: 'Services', framework: 'GDPR' },
  { id: '23', title: 'ISO 27001 Services', content: 'ISO 27001 information security management implementation', url: '/services/standards-and-certifications/iso-27001-services', type: 'service', category: 'Services', framework: 'ISO 27001' },
  { id: '24', title: 'SOC 2 Services', content: 'SOC 2 service organization control audit preparation', url: '/services/standards-and-certifications/soc-2-services', type: 'service', category: 'Services', framework: 'SOC 2' },
  { id: '25', title: 'Business Continuity', content: 'Business continuity management system BCMS implementation', url: '/services/governance-and-strategy/business-continuity', type: 'service', category: 'Services' },
  
  // Packages
  { id: '30', title: 'ISO 27001 Fast-Track', content: 'ISO 27001 fast implementation package accelerated timeline', url: '/packages/iso-27001-fast-track', type: 'package', category: 'Packages', framework: 'ISO 27001' },
  { id: '31', title: 'NIS2 Sprint', content: 'NIS2 directive sprint implementation package', url: '/packages/nis2-sprint', type: 'package', category: 'Packages', framework: 'NIS2' },
  { id: '32', title: 'GDPR Accelerator', content: 'GDPR accelerator privacy compliance package', url: '/packages/gdpr-accelerator', type: 'package', category: 'Packages', framework: 'GDPR' },
  { id: '33', title: 'SOC 2 Readiness', content: 'SOC 2 readiness 12 weeks audit preparation package', url: '/packages/soc2-readiness-12-weeks', type: 'package', category: 'Packages', framework: 'SOC 2' },
  { id: '34', title: 'DORA Program in a Box', content: 'DORA program implementation package digital resilience', url: '/packages/dora-program-in-a-box', type: 'package', category: 'Packages', framework: 'DORA' },
  { id: '35', title: 'CISO as a Service', content: 'CISO as a service virtual chief information security officer', url: '/packages/ciso-as-a-service', type: 'package', category: 'Packages' },
  
  // Industries
  { id: '40', title: 'Financial Services', content: 'Financial services cybersecurity compliance banking insurance', url: '/industries/financial-services', type: 'industry', category: 'Industries', industry: 'Financial Services' },
  { id: '41', title: 'Critical Infrastructure', content: 'Critical infrastructure cybersecurity NIS2 compliance', url: '/industries/critical-infrastructure', type: 'industry', category: 'Industries', industry: 'Critical Infrastructure' },
  { id: '42', title: 'Healthcare', content: 'Healthcare cybersecurity compliance medical data protection', url: '/industries/healthcare', type: 'industry', category: 'Industries', industry: 'Healthcare' },
  { id: '43', title: 'Manufacturing', content: 'Manufacturing cybersecurity industrial control systems', url: '/industries/manufacturing', type: 'industry', category: 'Industries', industry: 'Manufacturing' },
  { id: '44', title: 'SaaS Technology', content: 'SaaS technology cybersecurity SOC 2 compliance', url: '/industries/saas-technology', type: 'industry', category: 'Industries', industry: 'SaaS' },
  { id: '45', title: 'Public Sector', content: 'Public sector cybersecurity government compliance', url: '/industries/public-sector', type: 'industry', category: 'Industries', industry: 'Public Sector' },
  
  // Resources
  { id: '50', title: 'Resource Hub', content: 'Free cybersecurity resources guides templates tools', url: '/resources', type: 'page', category: 'Resources' },
  { id: '51', title: 'Blog & Guides', content: 'Cybersecurity blog expert insights implementation guides', url: '/blog', type: 'page', category: 'Resources' },
  { id: '52', title: 'Support & Tools', content: 'Support tools Excel templates checklists PDF downloads', url: '/support', type: 'page', category: 'Resources' },
  { id: '53', title: 'Knowledge Base', content: 'Knowledge base FAQ documentation troubleshooting', url: '/support/knowledge-base', type: 'guide', category: 'Resources' },
  
  // Guides
  { id: '60', title: 'NIS2 Implementation Finland', content: 'NIS2 directive implementation guide Finland requirements', url: '/resources/guides/nis2-implementation-finland', type: 'guide', category: 'Resources', framework: 'NIS2' },
  { id: '61', title: 'ISO 27001 NIS2 Alignment', content: 'ISO 27001 NIS2 alignment mapping guide implementation', url: '/resources/guides/iso27001-nis2-alignment', type: 'guide', category: 'Resources', framework: 'ISO 27001' },
  { id: '62', title: 'DORA Compliance Checklist', content: 'DORA compliance checklist digital operational resilience', url: '/resources/guides/dora-compliance-checklist', type: 'guide', category: 'Resources', framework: 'DORA' },
  
  // Regulatory
  { id: '70', title: 'NIS2 Finland', content: 'NIS2 directive Finland implementation timeline requirements', url: '/regulatory/nis2-finland', type: 'regulation', category: 'Resources', framework: 'NIS2' },
  { id: '71', title: 'GDPR Regulation', content: 'GDPR general data protection regulation requirements', url: '/regulatory/gdpr', type: 'regulation', category: 'Resources', framework: 'GDPR' },
  { id: '72', title: 'DORA Regulation', content: 'DORA digital operational resilience act requirements', url: '/regulatory/dora', type: 'regulation', category: 'Resources', framework: 'DORA' },
  { id: '73', title: 'eIDAS Digital Trust', content: 'eIDAS electronic identification digital trust services', url: '/regulatory/eidas-digital-trust', type: 'regulation', category: 'Resources', framework: 'eIDAS' },
  
  // Platform
  { id: '80', title: 'Platform', content: 'DataNova platform cybersecurity compliance automation', url: '/platform', type: 'page', category: 'Company' },
  
  // Popular search terms
  { id: '90', title: 'Risk Assessment', content: 'Risk assessment templates tools cybersecurity evaluation', url: '/support/sample-spreadsheets', type: 'tool', category: 'Resources' },
  { id: '91', title: 'Audit Preparation', content: 'Audit preparation checklists templates compliance readiness', url: '/support', type: 'tool', category: 'Resources' },
  { id: '92', title: 'Templates', content: 'Free Excel templates PDF checklists compliance tools', url: '/support/sample-spreadsheets', type: 'tool', category: 'Resources' },
  { id: '93', title: 'Whitepapers', content: 'Cybersecurity whitepapers research analysis reports', url: '/support/whitepapers', type: 'guide', category: 'Resources' }
];

export const GET: APIRoute = async ({ url }) => {
  const searchParams = url.searchParams;
  const query = searchParams.get('q')?.toLowerCase().trim() || '';
  const category = searchParams.get('category');
  const framework = searchParams.get('framework');
  const type = searchParams.get('type');
  const limit = parseInt(searchParams.get('limit') || '20');

  if (!query) {
    return new Response(JSON.stringify({ 
      results: [],
      total: 0,
      suggestions: [
        'ISO 27001 Fast-Track',
        'NIS2 Sprint', 
        'GDPR toolkit',
        'SOC 2 readiness',
        'DORA compliance',
        'Risk assessment'
      ]
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Filter and search
  let results = searchData.filter(item => {
    // Text search
    const titleMatch = item.title.toLowerCase().includes(query);
    const contentMatch = item.content.toLowerCase().includes(query);
    
    if (!titleMatch && !contentMatch) return false;
    
    // Filter by category
    if (category && item.category !== category) return false;
    
    // Filter by framework
    if (framework && item.framework !== framework) return false;
    
    // Filter by type
    if (type && item.type !== type) return false;
    
    return true;
  });

  // Sort by relevance (title matches first, then content matches)
  results = results.sort((a, b) => {
    const aTitle = a.title.toLowerCase().includes(query);
    const bTitle = b.title.toLowerCase().includes(query);
    
    if (aTitle && !bTitle) return -1;
    if (!aTitle && bTitle) return 1;
    
    // Secondary sort by title length (shorter = more relevant)
    return a.title.length - b.title.length;
  });

  // Limit results
  const limitedResults = results.slice(0, limit);

  return new Response(JSON.stringify({
    results: limitedResults,
    total: results.length,
    query,
    filters: {
      category,
      framework,
      type
    }
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
