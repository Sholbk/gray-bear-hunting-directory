#!/usr/bin/env node

/**
 * Converts the enriched CSV export into the listings.json format
 * expected by the Gray Bear Hunting Directory Next.js app.
 *
 * Usage: node scripts/csv-to-listings.js [path-to-enriched-csv]
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const INPUT_FILE = process.argv[2] || path.join(
  process.env.HOME,
  'Library/CloudStorage/OneDrive-Personal/Gray Bear Hunting Export 217/GBH2017/export_members-enriched.csv'
);
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'listings.json');

// State abbreviation → full name
const STATE_MAP = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',
  CO:'Colorado',CT:'Connecticut',DE:'Delaware',FL:'Florida',GA:'Georgia',
  HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',
  KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',
  MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',
  NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',
  NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',
  OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',
  SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',
  VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming',
};

// Map CSV profession/services to ListingType
function classifyType(row) {
  const prof = (row.profession_name || '').toLowerCase();
  const servicesText = (row.services || '').toLowerCase(); // human-readable services
  const company = (row.company || '').toLowerCase();

  // Non-guide professions first (these are definitive from the profession_name)
  if (prof.includes('taxiderm') || prof.includes('game processing'))
    return 'taxidermy';
  if (prof.includes('education') || prof.includes('training') || prof.includes('safety'))
    return 'education';
  if (prof.includes('gun dog') || prof.includes('dog'))
    return 'dog-trainer';
  if (prof.includes('shooting range') || prof.includes('range'))
    return 'shooting-range';
  if (prof.includes('retailer') || prof.includes('shop') || prof.includes('gun shop'))
    return 'retailer';
  if (prof.includes('boat') || prof.includes('vehicle') || prof.includes('rental'))
    return 'boat';
  if (prof.includes('process'))
    return 'processor';

  // For "Hunter Resources" profession, classify by service type
  if (prof.includes('hunter resources') || prof.includes('guide') || prof.includes('outfitter') || prof.includes('charter')) {
    // Lodge
    if (servicesText.includes('lodge') || servicesText.includes('accommodat'))
      return 'lodge';

    // Charter — use the services TEXT column (not numeric codes)
    if (servicesText.includes('fishing charter') || servicesText.includes('boat tour') ||
        servicesText.includes('whale watching') || servicesText.includes('raft trip'))
      return 'charter';

    // Also check company name for charter/fishing signals
    if (/\b(charter|sportfish|deep\s*sea)\b/.test(company))
      return 'charter';

    // Outfitter
    if (servicesText.includes('outfitter') || /\boutfitter/i.test(company))
      return 'outfitter';

    // Fishing guide (distinct from charter — they're on a boat you provide or from shore)
    if (/\b(fish|angler|angling|fly\s*fish|bass|crappie|walleye|trout|catfish|bowfish)\b/.test(company))
      return 'guide';

    // Default for Hunter Resources = guide
    return 'guide';
  }

  // Community orgs and others that slipped in
  if (prof.includes('community'))
    return 'guide';

  return 'guide';
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

function cleanPhone(phone) {
  if (!phone) return '';
  // Normalize to (XXX) XXX-XXXX
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits[0] === '1') {
    return `(${digits.slice(1,4)}) ${digits.slice(4,7)}-${digits.slice(7)}`;
  }
  return phone.trim();
}

function cleanWebsite(url) {
  if (!url) return '';
  let clean = url.trim();
  // Remove tracking params
  try {
    const parsed = new URL(clean);
    parsed.searchParams.delete('utm_source');
    parsed.searchParams.delete('utm_medium');
    parsed.searchParams.delete('utm_campaign');
    parsed.searchParams.delete('utm_content');
    parsed.searchParams.delete('mibextid');
    clean = parsed.toString();
  } catch {}
  return clean;
}

function main() {
  console.log('Reading enriched CSV...');
  const raw = fs.readFileSync(INPUT_FILE, 'utf8');
  const rows = parse(raw, { columns: true, bom: true, relax_quotes: true, relax_column_count: true });
  console.log(`Loaded ${rows.length} rows.`);

  const slugCounts = {};
  const listings = [];

  for (const row of rows) {
    const company = (row.company || '').trim();
    if (!company) continue;

    const type = classifyType(row);
    const stateCode = (row.state_code || '').trim();
    const stateName = STATE_MAP[stateCode] || '';
    const city = (row.city || '').trim();
    const speciesStr = (row.species || '').trim();
    const speciesArr = speciesStr
      ? speciesStr.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    // Generate unique slug
    let baseSlug = slugify(company);
    if (!baseSlug) baseSlug = 'listing';
    slugCounts[baseSlug] = (slugCounts[baseSlug] || 0) + 1;
    const slug = slugCounts[baseSlug] > 1
      ? `${baseSlug}-${slugCounts[baseSlug]}`
      : baseSlug;

    const description = (row.search_description || '').trim();
    const phone = cleanPhone(row.phone_number);
    const website = cleanWebsite(row.website);
    const image = (row.logo || row.profile_photo || '').trim();

    const listing = {
      slug,
      name: company,
      type,
      description,
      location: { city, state: stateName },
      species: speciesArr,
      successRate: 0,
      priceRange: { min: 0, max: 0 },
      physicalIntensity: 0,
      rating: 0,
      reviewCount: 0,
      reviews: [],
      phone,
      website,
      image,
      featured: false,
    };

    listings.push(listing);
  }

  console.log(`\nConverted ${listings.length} listings.`);

  // Stats
  const byType = {};
  listings.forEach(l => { byType[l.type] = (byType[l.type] || 0) + 1; });
  console.log('\nBy type:');
  Object.entries(byType).sort((a,b) => b[1] - a[1]).forEach(([t, c]) => {
    console.log(`  ${t.padEnd(16)} ${c.toLocaleString()}`);
  });

  const withSpecies = listings.filter(l => l.species.length > 0).length;
  console.log(`\nWith species: ${withSpecies.toLocaleString()} / ${listings.length.toLocaleString()} (${(withSpecies/listings.length*100).toFixed(1)}%)`);

  const withDesc = listings.filter(l => l.description).length;
  console.log(`With description: ${withDesc.toLocaleString()}`);

  const withState = listings.filter(l => l.location.state).length;
  console.log(`With state: ${withState.toLocaleString()}`);

  // Write output
  console.log(`\nWriting to ${OUTPUT_FILE}...`);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(listings, null, 2), 'utf8');
  console.log('Done.');
}

main();
