#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');

// ─── CONFIG ─────────────────────────────────────────────────────────────────
const INPUT_FILE = path.join(
  process.env.HOME,
  'Library/CloudStorage/OneDrive-Personal/Gray Bear Hunting Export 217/GBH2017/export_members56812-ALL-combined.csv'
);
const OUTPUT_FILE = path.join(path.dirname(INPUT_FILE), 'export_members-enriched.csv');
const TARGET_PROFESSION = 'Hunter Resources: Guides, Outfitters & Charters, Lodging, and more';

// ─── SPECIES KEYWORD DICTIONARY ─────────────────────────────────────────────
// Maps regex pattern → standardized species name
// Patterns are tested against company + search_description (lowercased)
const KEYWORD_MAP = [
  // Deer
  [/\bwhite[\s-]?tail/i, 'Whitetail Deer'],
  [/\bwtd\b/i, 'Whitetail Deer'],
  [/\bmule\s*deer/i, 'Mule Deer'],
  [/\bblacktail/i, 'Blacktail Deer'],
  [/\bcoues/i, 'Coues Deer'],
  [/\baxis\b/i, 'Axis Deer'],
  [/\bfallow\s*deer/i, 'Fallow Deer'],
  [/\bsika\b/i, 'Sika Deer'],

  // Elk & large game
  [/\belk\b/i, 'Elk'],
  [/\bmoose\b/i, 'Moose'],
  [/\bcaribou\b/i, 'Caribou'],
  [/\bbison\b/i, 'Bison'],
  [/\bbuffalo\b/i, 'Bison'],
  [/\bantelope\b/i, 'Antelope'],
  [/\bpronghorn/i, 'Antelope'],

  // Bear
  [/\bblack\s*bear/i, 'Black Bear'],
  [/\bgrizzl/i, 'Grizzly Bear'],
  [/\bbrown\s*bear/i, 'Brown Bear'],
  [/\bpolar\s*bear/i, 'Polar Bear'],
  [/\bbear\s*hunt/i, 'Black Bear'],

  // Sheep & goats
  [/\bbighorn/i, 'Bighorn Sheep'],
  [/\bdall\s*sheep/i, 'Dall Sheep'],
  [/\bmountain\s*goat/i, 'Mountain Goat'],
  [/\baoudad/i, 'Aoudad'],
  [/\bbarbary\s*sheep/i, 'Aoudad'],
  [/\boryx\b/i, 'Oryx'],
  [/\bibex\b/i, 'Ibex'],

  // Hog
  [/\bhog\b/i, 'Wild Hog'],
  [/\bboar\b/i, 'Wild Hog'],
  [/\bwild\s*pig/i, 'Wild Hog'],
  [/\bferal\s*pig/i, 'Wild Hog'],
  [/\bjavelina/i, 'Javelina'],
  [/\bpeccary/i, 'Javelina'],

  // Predators & furbearers
  [/\bcoyote/i, 'Coyote'],
  [/\bbobcat/i, 'Bobcat'],
  [/\bmountain\s*lion/i, 'Mountain Lion'],
  [/\bcougar/i, 'Mountain Lion'],
  [/\bwolf\b/i, 'Wolf'],
  [/\bfox\b(?!\s*(river|creek|lake|hollow|run|island|lodge|camp|ridge))/i, 'Fox'],
  [/\braccoon/i, 'Raccoon'],

  // Upland birds
  [/\bpheasant/i, 'Pheasant'],
  [/\bquail\b/i, 'Quail'],
  [/\bbobwhite/i, 'Quail'],
  [/\bchukar/i, 'Chukar'],
  [/\bgrouse\b/i, 'Grouse'],
  [/\bpartridge/i, 'Partridge'],
  [/\bptarmigan/i, 'Ptarmigan'],
  [/\bprairie\s*chicken/i, 'Prairie Chicken'],
  [/\bwoodcock/i, 'Woodcock'],
  [/\bdove\b/i, 'Dove'],
  [/\bpigeon\b/i, 'Pigeon'],

  // Turkey
  [/\bturkey/i, 'Turkey'],

  // Waterfowl
  [/\bduck\b/i, 'Duck'],
  [/\bmallard/i, 'Duck'],
  [/\bteal\b/i, 'Duck'],
  [/\bpintail/i, 'Duck'],
  [/\bcanvasback/i, 'Duck'],
  [/\bwood\s*duck/i, 'Duck'],
  [/\bwidgeon/i, 'Duck'],
  [/\bwigeon/i, 'Duck'],
  [/\bscaup/i, 'Duck'],
  [/\bbluebill/i, 'Duck'],
  [/\bredhead\s*duck/i, 'Duck'],
  [/\bgoose\b/i, 'Goose'],
  [/\bgeese\b/i, 'Goose'],
  [/\bsnow\s*goose/i, 'Snow Goose'],
  [/\bcanada\s*goose/i, 'Canada Goose'],
  [/\bwaterfowl/i, 'Waterfowl'],
  [/\bsandhill\s*crane/i, 'Sandhill Crane'],

  // Small game
  [/\brabbit/i, 'Rabbit'],
  [/\bsquirrel\b/i, 'Squirrel'],

  // Alligator
  [/\balligator/i, 'Alligator'],
  [/\bgator\b/i, 'Alligator'],

  // Freshwater fish
  [/\bbass\b(?!\s*(pro|camp))/i, 'Bass'],
  [/\blargemouth/i, 'Bass'],
  [/\bsmallmouth/i, 'Smallmouth Bass'],
  [/\bstriped\s*bass/i, 'Striped Bass'],
  [/\bstriper/i, 'Striped Bass'],
  [/\bhybrid\s*bass/i, 'Hybrid Bass'],
  [/\bcrappie/i, 'Crappie'],
  [/\bwalleye/i, 'Walleye'],
  [/\bpike\b/i, 'Pike'],
  [/\bnorthern\s*pike/i, 'Pike'],
  [/\bmusky\b/i, 'Musky'],
  [/\bmusk[ie]e?llunge/i, 'Musky'],
  [/\bmuskie/i, 'Musky'],
  [/\btrout\b/i, 'Trout'],
  [/\brainbow\s*trout/i, 'Trout'],
  [/\bbrown\s*trout/i, 'Trout'],
  [/\bbrook\s*trout/i, 'Trout'],
  [/\bcutthroat/i, 'Trout'],
  [/\bsteelhead/i, 'Steelhead'],
  [/\bcatfish/i, 'Catfish'],
  [/\bbluegill/i, 'Bluegill'],
  [/\bpanfish/i, 'Panfish'],
  [/\bperch\b/i, 'Perch'],
  [/\bsauger/i, 'Sauger'],
  [/\bcarp\b/i, 'Carp'],
  [/\bbowfin/i, 'Bowfin'],
  [/\bgar\b/i, 'Gar'],
  [/\bsturgeon/i, 'Sturgeon'],
  [/\bkokanee/i, 'Kokanee'],

  // Salmon
  [/\bsalmon\b/i, 'Salmon'],
  [/\bking\s*salmon/i, 'King Salmon'],
  [/\bchinook/i, 'King Salmon'],
  [/\bsilver\s*salmon/i, 'Silver Salmon'],
  [/\bcoho\b/i, 'Silver Salmon'],
  [/\bsockeye/i, 'Sockeye Salmon'],
  [/\bred\s*salmon/i, 'Sockeye Salmon'],
  [/\bchum\s*salmon/i, 'Chum Salmon'],
  [/\bpink\s*salmon/i, 'Pink Salmon'],

  // Saltwater fish
  [/\bredfish\b/i, 'Redfish'],
  [/\bred\s*drum/i, 'Redfish'],
  [/\bspeckled\s*trout/i, 'Speckled Trout'],
  [/\bseatrout/i, 'Speckled Trout'],
  [/\bsnook\b/i, 'Snook'],
  [/\btarpon\b/i, 'Tarpon'],
  [/\bflounder\b/i, 'Flounder'],
  [/\bsheepshead/i, 'Sheepshead'],
  [/\bred\s*snapper/i, 'Red Snapper'],
  [/\bsnapper\b/i, 'Snapper'],
  [/\bgrouper/i, 'Grouper'],
  [/\bamberjack/i, 'Amberjack'],
  [/\bcobia\b/i, 'Cobia'],
  [/\bking\s*mackerel/i, 'King Mackerel'],
  [/\bkingfish/i, 'King Mackerel'],
  [/\bspanish\s*mackerel/i, 'Spanish Mackerel'],
  [/\bmackerel\b/i, 'Mackerel'],
  [/\bmahi/i, 'Mahi-Mahi'],
  [/\bdolphin\s*fish/i, 'Mahi-Mahi'],
  [/\bdorado\b/i, 'Mahi-Mahi'],
  [/\btuna\b/i, 'Tuna'],
  [/\byellowfin/i, 'Yellowfin Tuna'],
  [/\bbluefin/i, 'Bluefin Tuna'],
  [/\bwahoo\b/i, 'Wahoo'],
  [/\bsailfish/i, 'Sailfish'],
  [/\bmarlin\b/i, 'Marlin'],
  [/\bswordfish/i, 'Swordfish'],
  [/\bhalibut/i, 'Halibut'],
  [/\blingcod/i, 'Lingcod'],
  [/\brockfish\b/i, 'Rockfish'],
  [/\bsea\s*bass/i, 'Sea Bass'],
  [/\btilefish/i, 'Tilefish'],
  [/\btriggerfish/i, 'Triggerfish'],
  [/\bpompano\b/i, 'Pompano'],
  [/\bbonefish/i, 'Bonefish'],
  [/\bpermit\b(?!\s*(required|needed|#))/i, 'Permit'],
  [/\bshark\b/i, 'Shark'],
  [/\bbarracuda/i, 'Barracuda'],

  // Shellfish
  [/\blobster\b/i, 'Lobster'],
  [/\bcrab\b/i, 'Crab'],
  [/\bshrimp\b/i, 'Shrimp'],
  [/\bclam\b/i, 'Clam'],
  [/\boyster\b/i, 'Oyster'],
  [/\bcrawfish/i, 'Crawfish'],
  [/\bcrayfish/i, 'Crawfish'],

  // Exotic / African
  [/\bkudu\b/i, 'Kudu'],
  [/\beland\b/i, 'Eland'],
  [/\bnilgai/i, 'Nilgai'],
  [/\bblackbuck/i, 'Blackbuck'],
  [/\bscimitar/i, 'Scimitar Oryx'],
  [/\bwildebeest/i, 'Wildebeest'],
  [/\bzebra\b/i, 'Zebra'],
  [/\bspringbok/i, 'Springbok'],
  [/\bimpala\b(?!.*\b(chevy|chevrolet|car|auto)\b)/i, 'Impala'],
  [/\bwarthog/i, 'Warthog'],
];

// ─── REGIONAL INFERENCE: state + service type → likely species ──────────────
// Map of US state abbreviations (for extracting state from city/URL)
const US_STATES = new Set([
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY'
]);

// Fishing-related keywords in company name / description
const FISHING_WORDS = /\b(fish|fishing|charter|angler|angling|reel|tackle|bait|lure|rod|casting|trolling|offshore|inshore|deep\s*sea|fly\s*fish|bass\s*pro|crappie|walleye|trout|salmon|catfish|redfish|snapper|grouper|halibut|tarpon|marlin|tuna|mahi)\b/i;
const HUNTING_WORDS = /\b(hunt|hunting|outfitter|safari|ranch|whitetail|deer|elk|moose|bear|duck|goose|waterfowl|pheasant|quail|turkey|dove|hog|boar|guide\s*service|lodge|blind|camo|trophy|antler|buck|doe|game\s*bird|upland)\b/i;

function classifyServiceType(row) {
  const services = ((row.services || '') + ' ' + (row.service || '')).toLowerCase();
  const company = (row.company || '').toLowerCase();
  const desc = (row.search_description || '').toLowerCase();
  const url = (row.full_filename || '').toLowerCase();
  const combined = services + ' ' + company + ' ' + desc + ' ' + url;

  const isFishing = FISHING_WORDS.test(combined) || services.includes('819') || services.includes('820');
  const isHunting = HUNTING_WORDS.test(combined) || services.includes('803') || services.includes('806') || services.includes('804') || services.includes('810') || services.includes('774') || services.includes('783');

  if (isFishing && isHunting) {
    // For mixed signals, check the services column first (most reliable)
    const svcFish = services.includes('819') || services.includes('820') || services.includes('fishing charter');
    const svcHunt = services.includes('803') || services.includes('806') || services.includes('804') || services.includes('774') || services.includes('hunting');
    if (svcFish && !svcHunt) return 'fishing';
    if (svcHunt && !svcFish) return 'hunting';
    // Check company name for stronger signal
    if (FISHING_WORDS.test(company) && !HUNTING_WORDS.test(company)) return 'fishing';
    if (HUNTING_WORDS.test(company) && !FISHING_WORDS.test(company)) return 'hunting';
    return 'hunting'; // final default
  }
  if (isFishing) return 'fishing';
  if (isHunting) return 'hunting';

  // Service codes: 733/734 = lodge, 790 = campground, 812 = game bird farm
  // For lodges in a hunting directory, default to hunting
  if (services.includes('733') || services.includes('734') || services.includes('790') || services.includes('812')) return 'hunting';

  // If the URL path contains "hunter-resources", default to hunting
  if (url.includes('hunter-resources')) return 'hunting';

  return 'unknown';
}

const STATE_NAMES = {
  'alabama':'AL','alaska':'AK','arizona':'AZ','arkansas':'AR','california':'CA',
  'colorado':'CO','connecticut':'CT','delaware':'DE','florida':'FL','georgia':'GA',
  'hawaii':'HI','idaho':'ID','illinois':'IL','indiana':'IN','iowa':'IA','kansas':'KS',
  'kentucky':'KY','louisiana':'LA','maine':'ME','maryland':'MD','massachusetts':'MA',
  'michigan':'MI','minnesota':'MN','mississippi':'MS','missouri':'MO','montana':'MT',
  'nebraska':'NE','nevada':'NV','new hampshire':'NH','new jersey':'NJ','new mexico':'NM',
  'new york':'NY','north carolina':'NC','north dakota':'ND','ohio':'OH','oklahoma':'OK',
  'oregon':'OR','pennsylvania':'PA','rhode island':'RI','south carolina':'SC',
  'south dakota':'SD','tennessee':'TN','texas':'TX','utah':'UT','vermont':'VT',
  'virginia':'VA','washington':'WA','west virginia':'WV','wisconsin':'WI','wyoming':'WY',
};

// Well-known place names → state mapping (for company name extraction)
const PLACE_NAMES = {
  // Texas
  'south padre': 'TX', 'port mansfield': 'TX', 'corpus christi': 'TX', 'galveston': 'TX',
  'port aransas': 'TX', 'kemah': 'TX', 'matagorda': 'TX', 'lake buchanan': 'TX',
  'lake fork': 'TX', 'sam rayburn': 'TX', 'toledo bend': 'TX', 'lake travis': 'TX',
  'port o connor': 'TX', 'rockport': 'TX', 'aransas': 'TX', 'lake conroe': 'TX',
  'falcon lake': 'TX', 'richland chambers': 'TX', 'lake livingston': 'TX',
  'austin native': 'TX', 'castaic': 'CA', 'lake ray hubbard': 'TX',
  // South Carolina
  'hilton head': 'SC', 'myrtle beach': 'SC', 'charleston': 'SC', 'pawleys island': 'SC',
  'santee cooper': 'SC', 'lake murray': 'SC', 'kiawah': 'SC',
  // North Carolina
  'outer banks': 'NC', 'cape hatteras': 'NC', 'nags head': 'NC', 'morehead city': 'NC',
  'cherokee': 'NC', 'cape lookout': 'NC', 'wrightsville': 'NC',
  // Florida
  'destin': 'FL', 'panama city': 'FL', 'key west': 'FL', 'islamorada': 'FL',
  'tampa bay': 'FL', 'st pete': 'FL', 'cocoa beach': 'FL', 'stuart': 'FL',
  'clearwater': 'FL', 'pensacola': 'FL', 'apalachicola': 'FL', 'naples': 'FL',
  'lake okeechobee': 'FL', 'mosquito lagoon': 'FL', 'indian river': 'FL',
  'crystal river': 'FL', 'caloosa': 'FL', 'everglades': 'FL', 'boca grande': 'FL',
  'pismo': 'CA', 'sanibel': 'FL', 'captiva': 'FL', 'anna maria': 'FL',
  'st augustine': 'FL', 'amelia island': 'FL', 'homosassa': 'FL',
  // Louisiana
  'venice': 'LA', 'grand isle': 'LA', 'lake charles': 'LA',
  // Wisconsin
  'lake geneva': 'WI', 'door county': 'WI', 'brule river': 'WI', 'black earth': 'WI',
  // Great Lakes
  'lake erie': 'OH', 'lake michigan': 'MI',
  // Alaska
  'kenai': 'AK', 'kodiak': 'AK', 'sitka': 'AK', 'ketchikan': 'AK', 'homer': 'AK',
  'seward': 'AK', 'valdez': 'AK', 'juneau': 'AK', 'bristol bay': 'AK',
  'prince william': 'AK', 'copper river': 'AK',
  // Washington
  'quinault': 'WA', 'skagit': 'WA', 'puget sound': 'WA', 'san juan island': 'WA',
  // Utah
  'park city': 'UT', 'provo': 'UT', 'provo river': 'UT', 'flaming gorge': 'UT',
  // Tennessee
  'knoxville': 'TN', 'dale hollow': 'TN', 'pickwick': 'TN', 'chickamauga': 'TN',
  'watts bar': 'TN', 'norris lake': 'TN',
  // New York
  'montauk': 'NY', 'ny harbor': 'NY', 'nyharbor': 'NY', 'long island': 'NY',
  // Virginia
  'lake anna': 'VA', 'chesapeake': 'VA', 'smith mountain': 'VA', 'james river': 'VA',
  // Missouri / Arkansas
  'lake of the ozarks': 'MO', 'table rock': 'MO', 'bull shoals': 'AR',
  'norfolk lake': 'AR', 'beaver lake': 'AR', 'lake ouachita': 'AR',
  // Massachusetts
  'nantucket': 'MA', 'cape cod': 'MA', "martha's vineyard": 'MA',
  // Mississippi / Alabama
  'biloxi': 'MS', 'gulfport': 'MS', 'ross barnett': 'MS', 'sardis': 'MS',
  'orange beach': 'AL', 'gulf shores': 'AL', 'guntersville': 'AL', 'wheeler': 'AL',
  'weiss lake': 'AL',
  // West Virginia / Wyoming
  'new river': 'WV', 'jackson hole': 'WY', 'yellowstone': 'WY',
  // Minnesota
  'boundary waters': 'MN', 'mille lacs': 'MN', 'lake winnibigoshish': 'MN',
  'lake of the woods': 'MN', 'rainy lake': 'MN', 'leech lake': 'MN',
  // Dakotas
  'devils lake': 'ND', 'sakakawea': 'ND', 'lake oahe': 'SD', 'lake sharpe': 'SD',
  // Oklahoma / Kentucky
  'grand lake': 'OK', 'lake texoma': 'OK',
  'barkley': 'KY', 'kentucky lake': 'KY',
  // California
  'lake tahoe': 'CA', 'napa valley': 'CA', 'yosemite': 'CA', 'sierra': 'CA',
  'sacramento': 'CA', 'san diego': 'CA', 'san francisco': 'CA', 'mammoth': 'CA',
  'trinity': 'CA', 'shasta': 'CA', 'delta': 'CA', 'catalina': 'CA',
  'pyramid lake': 'NV', 'tahoe': 'CA',
  // Hawaii
  'maui': 'HI', 'kona': 'HI', 'oahu': 'HI', 'waikiki': 'HI',
  // Oregon
  'deschutes': 'OR', 'rogue river': 'OR', 'tillamook': 'OR', 'astoria': 'OR',
  // Colorado
  'front range': 'CO', 'vail': 'CO', 'breckenridge': 'CO', 'durango': 'CO',
  'gunnison': 'CO', 'steamboat': 'CO', 'rocky mountain': 'CO',
  // Montana
  'glacier': 'MT', 'flathead': 'MT', 'bighorn': 'MT', 'missouri river': 'MT',
  // Idaho
  'salmon river': 'ID', 'snake river': 'ID', 'coeur d': 'ID', 'boise': 'ID',
  // New Mexico
  'rio grande': 'NM', 'santa fe': 'NM', 'taos': 'NM',
  // Michigan
  'traverse city': 'MI', 'grand traverse': 'MI', 'saginaw': 'MI',
  // Georgia
  'savannah': 'GA', 'tybee': 'GA', 'lake lanier': 'GA',
  // Maine
  'acadia': 'ME', 'moosehead': 'ME', 'kennebec': 'ME',
  // New Jersey
  'cape may': 'NJ', 'barnegat': 'NJ',
  // Kansas
  'lazyjoutfittersks': 'KS',
  // More Colorado
  'telluride': 'CO', 'crested butte': 'CO', 'winter park': 'CO', 'slackwaterco': 'CO',
  'estes park': 'CO', 'colorado river': 'CO', 'arkansas river': 'CO',
  // More Florida
  'daytona': 'FL', 'jacksonville': 'FL', 'fort myers': 'FL', 'sarasota': 'FL',
  'st johns': 'FL', 'marathon': 'FL',
  // More Tennessee
  'old hickory': 'TN', 'center hill': 'TN', 'percy priest': 'TN', 'reelfoot': 'TN',
  // More California
  'norcal': 'CA', 'socal': 'CA', 'clear lake': 'CA', 'lake berryessa': 'CA',
  // More Oregon
  'columbia river': 'OR', 'willamette': 'OR', 'john day': 'OR',
  // More Washington
  'olympic': 'WA', 'whidbey': 'WA',
  // More Idaho
  'sun valley': 'ID', 'stanley': 'ID', 'mccall': 'ID',
  // More Montana
  'big sky': 'MT', 'bozeman': 'MT', 'helena': 'MT', 'missoula': 'MT',
  // New York
  'adirondack': 'NY', 'catskill': 'NY', 'finger lake': 'NY',
  // Pennsylvania
  'poconos': 'PA', 'susquehanna': 'PA',
  // More Michigan
  'pere marquette': 'MI', 'au sable': 'MI', 'manistee': 'MI',
  // More Wisconsin
  'hayward': 'WI', 'minocqua': 'WI', 'eagle river': 'WI',
  // Louisiana
  'atchafalaya': 'LA', 'red river': 'LA',
};

// Approximate state bounding boxes [minLat, maxLat, minLon, maxLon]
const STATE_BOUNDS = {
  AL: [30.22, 35.01, -88.47, -84.89],
  AK: [51.21, 71.39, -179.15, -129.98],
  AZ: [31.33, 37.00, -114.82, -109.04],
  AR: [33.00, 36.50, -94.62, -89.64],
  CA: [32.53, 42.01, -124.41, -114.13],
  CO: [36.99, 41.00, -109.06, -102.04],
  CT: [40.99, 42.05, -73.73, -71.79],
  DE: [38.45, 39.84, -75.79, -75.05],
  FL: [24.40, 31.00, -87.63, -80.03],
  GA: [30.36, 35.00, -85.61, -80.84],
  HI: [18.91, 22.24, -160.25, -154.81],
  ID: [41.99, 49.00, -117.24, -111.04],
  IL: [36.97, 42.51, -91.51, -87.02],
  IN: [37.77, 41.76, -88.10, -84.78],
  IA: [40.38, 43.50, -96.64, -90.14],
  KS: [36.99, 40.00, -102.05, -94.59],
  KY: [36.50, 39.15, -89.57, -81.96],
  LA: [28.93, 33.02, -94.04, -88.82],
  ME: [43.06, 47.46, -71.08, -66.95],
  MD: [37.91, 39.72, -79.49, -75.05],
  MA: [41.24, 42.89, -73.51, -69.93],
  MI: [41.70, 48.26, -90.42, -82.12],
  MN: [43.50, 49.38, -97.24, -89.49],
  MS: [30.17, 35.00, -91.66, -88.10],
  MO: [35.99, 40.61, -95.77, -89.10],
  MT: [44.36, 49.00, -116.05, -104.04],
  NE: [39.99, 43.00, -104.05, -95.31],
  NV: [35.00, 42.00, -120.01, -114.04],
  NH: [42.70, 45.31, -72.56, -70.70],
  NJ: [38.93, 41.36, -75.57, -73.89],
  NM: [31.33, 37.00, -109.05, -103.00],
  NY: [40.50, 45.02, -79.76, -71.86],
  NC: [33.84, 36.59, -84.32, -75.46],
  ND: [45.94, 49.00, -104.05, -96.55],
  OH: [38.40, 42.33, -84.82, -80.52],
  OK: [33.62, 37.00, -103.00, -94.43],
  OR: [41.99, 46.29, -124.57, -116.46],
  PA: [39.72, 42.27, -80.52, -74.69],
  RI: [41.15, 42.02, -71.86, -71.12],
  SC: [32.05, 35.22, -83.35, -78.54],
  SD: [42.48, 45.95, -104.06, -96.44],
  TN: [34.98, 36.68, -90.31, -81.65],
  TX: [25.84, 36.50, -106.65, -93.51],
  UT: [36.99, 42.00, -114.05, -109.04],
  VT: [42.73, 45.02, -73.44, -71.46],
  VA: [36.54, 39.47, -83.68, -75.24],
  WA: [45.54, 49.00, -124.85, -116.92],
  WV: [37.20, 40.64, -82.64, -77.72],
  WI: [42.49, 47.08, -92.89, -86.25],
  WY: [40.99, 45.01, -111.06, -104.05],
};

// Given lat/lon, return the best-matching US state abbreviation
function stateFromCoords(lat, lon) {
  if (!lat || !lon) return '';
  for (const [st, [minLat, maxLat, minLon, maxLon]] of Object.entries(STATE_BOUNDS)) {
    if (lat >= minLat && lat <= maxLat && lon >= minLon && lon <= maxLon) {
      return st;
    }
  }
  return '';
}

// Try to resolve a state code from other fields
function resolveState(row) {
  const st = (row.state_code || '').trim();
  if (st && US_STATES.has(st)) return st;

  // Try geo_state (often "0" for untagged)
  const geoSt = (row.geo_state || '').trim().toUpperCase();
  if (geoSt && geoSt !== '0' && US_STATES.has(geoSt)) return geoSt;

  // Try URL slug pattern like /tx-78065/
  const url = (row.full_filename || '').toLowerCase();
  const slugMatch = url.match(/\/([a-z]{2})-(\d{5})\//);
  if (slugMatch) {
    const abbr = slugMatch[1].toUpperCase();
    if (US_STATES.has(abbr)) return abbr;
  }

  // Try extracting state from URL path (e.g., /texas/ or /north-carolina/)
  for (const [name, abbr] of Object.entries(STATE_NAMES)) {
    const urlName = name.replace(/ /g, '-');
    if (url.includes('/' + urlName + '/')) return abbr;
  }

  // Try well-known place names in company name + description + website
  const combined = ((row.company || '') + ' ' + (row.search_description || '') + ' ' + (row.website || '')).toLowerCase();
  for (const [place, abbr] of Object.entries(PLACE_NAMES)) {
    if (combined.includes(place)) return abbr;
  }

  // Try full state names in company name + description
  for (const [name, abbr] of Object.entries(STATE_NAMES)) {
    if (combined.includes(name)) return abbr;
  }

  // Try lat/lon → state bounding box (skip the known bogus default coordinate)
  const lat = parseFloat(row.lat);
  const lon = parseFloat(row.lon);
  const isBogus = (Math.abs(lat - 46.42) < 0.01 && Math.abs(lon - (-129.94)) < 0.01) ||
                  (Math.abs(lat - 14.16) < 0.01 && Math.abs(lon - (-106.69)) < 0.01) ||
                  (Math.abs(lat - 51.21) < 0.01 && Math.abs(lon - (-121.99)) < 0.01);
  if (lat && lon && !isBogus) {
    const fromCoords = stateFromCoords(lat, lon);
    if (fromCoords) return fromCoords;
  }

  // Try zip code prefix → state (first 3 digits)
  const zip = (row.zip_code || '').trim();
  if (zip.length >= 3) {
    const prefix = parseInt(zip.substring(0, 3), 10);
    const stFromZip = stateFromZipPrefix(prefix);
    if (stFromZip) return stFromZip;
  }

  // Try state abbreviation patterns in company name (e.g., "Austin, TX" or "TX Fishing")
  const compClean = (row.company || '');
  for (const st of US_STATES) {
    const patterns = [
      new RegExp(',\\s*' + st + '\\b'),
      new RegExp('\\b' + st + '\\s+(?:fish|hunt|guide|charter|outdoor|sport|adventure)', 'i'),
      new RegExp('\\b(?:in|of|from)\\s+' + st + '\\b', 'i'),
    ];
    for (const p of patterns) {
      if (p.test(compClean)) return st;
    }
  }

  // Try state abbreviation suffixes in website domain (e.g., ifishmd.com → MD, g1outfittersaz.com → AZ)
  const website = (row.website || '').toLowerCase();
  const domainMatch = website.match(/(?:www\.)?([^/]+)\./);
  if (domainMatch) {
    const domain = domainMatch[1];
    // Check if domain ends with a 2-letter state code
    for (const st of US_STATES) {
      const stLower = st.toLowerCase();
      if (domain.endsWith(stLower) && domain.length > 2) {
        return st;
      }
    }
    // Check for state code embedded in domain with common patterns
    // e.g., "statelineoutfittersnc", "originoutfittersme", "maverickoutfittersmd"
    for (const st of US_STATES) {
      const stLower = st.toLowerCase();
      // Domain contains state code at end after "outfitters", "charters", "guides", etc.
      const pattern = new RegExp('(?:outfitter|charter|guide|fishing|hunting|outdoor|angler)s?' + stLower + '$');
      if (pattern.test(domain)) return st;
    }
  }

  // Try well-known place names in website URL
  for (const [place, abbr] of Object.entries(PLACE_NAMES)) {
    if (website.includes(place.replace(/ /g, ''))) return abbr;
    if (website.includes(place.replace(/ /g, '-'))) return abbr;
  }

  // Additional website domain patterns
  const domainStateHints = {
    'nmbiggamehunting': 'NM', 'columbiariverwalleye': 'OR', 'cajunexperience': 'LA',
    'saintaugustinecharters': 'FL', 'castblastfl': 'FL', 'greatsmokyfish': 'TN',
    'heartlandhuntsks': 'KS', 'hookedoutdoorsmn': 'MN', 'huntnorthnm': 'NM',
    'duckhuntingmd': 'MD', 'stlcatfishing': 'MO', 'rockytopoutfitter': 'TN',
    'trouthunter406': 'MT', 'lakelurefishingguides': 'NC', 'ncriversandridges': 'NC',
    'folly beach': 'SC', 'tightlineoutfitters': 'SC', 'ozarkhillsanglers': 'MO',
    'patroutfitters': 'PA', 'housatonicfishingguide': 'CT', 'panhandleflyways': 'TX',
    'whitemountainguidingaz': 'AZ', 'southjerseyshoreoutfitters': 'NJ',
    'fishennis': 'MT', 'tbarmoutfittersco': 'CO', 'suncoastexpeditions': 'FL',
    'snookdudecharters': 'FL', 'alpineoutfitters.co': 'CO',
  };
  for (const [hint, st] of Object.entries(domainStateHints)) {
    if (website.includes(hint)) return st;
  }

  // Company name location hints
  const companyStateHints = {
    'cast & blast fl': 'FL', 'folly beach': 'SC', 'sonoran': 'AZ', 'ozark': 'MO',
    'appalachian': 'NC', 'cajun': 'LA', 'hooked outdoors mn': 'MN',
    'stlcatfishing': 'MO', 'pa troutfitters': 'PA', 'watauga': 'NC',
    'owyhee': 'OR', 'housatonic': 'CT', 'neches': 'TX', 'sabine': 'TX',
    'south jersey': 'NJ', 'rolling plains': 'TX', 'panhandle': 'TX',
    'luna canyon': 'NM', 'palisades': 'ID', '4 corners': 'CO',
    'blue ridge': 'NC', 'great smoky': 'TN', 'rocky top': 'TN',
  };
  const compLower = compClean.toLowerCase();
  for (const [hint, st] of Object.entries(companyStateHints)) {
    if (compLower.includes(hint)) return st;
  }

  return '';
}

function stateFromZipPrefix(p) {
  if (p >= 10 && p <= 69) return 'MA'; if (p >= 70 && p <= 89) return 'RI';
  if (p >= 100 && p <= 149) return 'NY'; if (p >= 150 && p <= 196) return 'PA';
  if (p >= 197 && p <= 199) return 'DE'; if (p >= 200 && p <= 205) return 'DC';
  if (p >= 206 && p <= 219) return 'MD'; if (p >= 220 && p <= 246) return 'VA';
  if (p >= 247 && p <= 268) return 'WV'; if (p >= 270 && p <= 289) return 'NC';
  if (p >= 290 && p <= 299) return 'SC'; if (p >= 300 && p <= 319) return 'GA';
  if (p >= 320 && p <= 349) return 'FL'; if (p >= 350 && p <= 369) return 'AL';
  if (p >= 370 && p <= 385) return 'TN'; if (p >= 386 && p <= 397) return 'MS';
  if (p >= 400 && p <= 427) return 'KY'; if (p >= 430 && p <= 459) return 'OH';
  if (p >= 460 && p <= 479) return 'IN'; if (p >= 480 && p <= 499) return 'MI';
  if (p >= 500 && p <= 528) return 'IA'; if (p >= 530 && p <= 549) return 'WI';
  if (p >= 550 && p <= 567) return 'MN'; if (p >= 570 && p <= 577) return 'SD';
  if (p >= 580 && p <= 588) return 'ND'; if (p >= 590 && p <= 599) return 'MT';
  if (p >= 600 && p <= 629) return 'IL'; if (p >= 630 && p <= 658) return 'MO';
  if (p >= 660 && p <= 679) return 'KS'; if (p >= 680 && p <= 693) return 'NE';
  if (p >= 700 && p <= 714) return 'LA'; if (p >= 716 && p <= 729) return 'AR';
  if (p >= 730 && p <= 749) return 'OK'; if (p >= 750 && p <= 799) return 'TX';
  if (p >= 800 && p <= 816) return 'CO'; if (p >= 820 && p <= 831) return 'WY';
  if (p >= 832 && p <= 838) return 'ID'; if (p >= 840 && p <= 847) return 'UT';
  if (p >= 850 && p <= 865) return 'AZ'; if (p >= 870 && p <= 884) return 'NM';
  if (p >= 889 && p <= 898) return 'NV'; if (p >= 900 && p <= 966) return 'CA';
  if (p >= 967 && p <= 968) return 'HI'; if (p >= 970 && p <= 979) return 'OR';
  if (p >= 980 && p <= 994) return 'WA'; if (p >= 995 && p <= 999) return 'AK';
  if (p >= 30 && p <= 69) return 'CT'; if (p >= 1 && p <= 9) return 'MA';
  return '';
}

const STATE_SPECIES = {
  fishing: {
    AL: 'Bass, Catfish, Crappie',
    AK: 'Salmon, Halibut, Trout',
    AZ: 'Bass, Catfish, Trout',
    AR: 'Bass, Crappie, Catfish',
    CA: 'Salmon, Halibut, Rockfish, Bass',
    CO: 'Trout, Walleye, Kokanee',
    CT: 'Striped Bass, Bluefish, Flounder',
    DE: 'Striped Bass, Flounder, Sea Bass',
    FL: 'Redfish, Snook, Tarpon, Grouper, Mahi-Mahi',
    GA: 'Bass, Redfish, Speckled Trout',
    HI: 'Mahi-Mahi, Yellowfin Tuna, Marlin',
    ID: 'Trout, Steelhead, Salmon',
    IL: 'Bass, Walleye, Catfish',
    IN: 'Bass, Walleye, Catfish',
    IA: 'Walleye, Bass, Catfish',
    KS: 'Bass, Walleye, Catfish',
    KY: 'Bass, Crappie, Catfish',
    LA: 'Redfish, Speckled Trout, Red Snapper, Tuna',
    ME: 'Striped Bass, Halibut, Tuna',
    MD: 'Striped Bass, Bluefish, Flounder',
    MA: 'Striped Bass, Bluefish, Tuna',
    MI: 'Walleye, Bass, Perch, Salmon',
    MN: 'Walleye, Bass, Pike, Musky',
    MS: 'Bass, Crappie, Catfish, Redfish',
    MO: 'Bass, Crappie, Catfish',
    MT: 'Trout',
    NE: 'Walleye, Bass, Catfish',
    NV: 'Bass, Trout',
    NH: 'Striped Bass, Trout, Bass',
    NJ: 'Striped Bass, Fluke, Bluefish, Tuna',
    NM: 'Trout, Bass',
    NY: 'Striped Bass, Walleye, Bass, Tuna',
    NC: 'Redfish, Speckled Trout, Mahi-Mahi, Tuna',
    ND: 'Walleye, Pike, Perch',
    OH: 'Walleye, Bass, Perch',
    OK: 'Bass, Catfish, Crappie',
    OR: 'Salmon, Steelhead, Halibut, Trout',
    PA: 'Bass, Trout, Walleye',
    RI: 'Striped Bass, Bluefish, Tuna',
    SC: 'Redfish, Flounder, Mahi-Mahi',
    SD: 'Walleye, Bass, Pike',
    TN: 'Bass, Crappie, Catfish',
    TX: 'Redfish, Speckled Trout, Red Snapper, Bass',
    UT: 'Trout, Bass, Walleye',
    VT: 'Bass, Trout, Walleye',
    VA: 'Striped Bass, Redfish, Flounder',
    WA: 'Salmon, Halibut, Steelhead',
    WV: 'Bass, Trout, Walleye',
    WI: 'Walleye, Musky, Bass, Pike',
    WY: 'Trout',
  },
  hunting: {
    AL: 'Whitetail Deer, Turkey, Duck',
    AK: 'Moose, Caribou, Brown Bear, Dall Sheep',
    AZ: 'Mule Deer, Elk, Javelina, Coues Deer',
    AR: 'Whitetail Deer, Duck, Turkey',
    CA: 'Blacktail Deer, Wild Hog, Duck, Dove',
    CO: 'Elk, Mule Deer, Antelope, Black Bear',
    CT: 'Whitetail Deer, Turkey',
    DE: 'Whitetail Deer, Turkey',
    FL: 'Wild Hog, Whitetail Deer, Alligator, Turkey',
    GA: 'Whitetail Deer, Turkey, Wild Hog, Duck',
    HI: 'Axis Deer, Wild Hog, Pheasant',
    ID: 'Elk, Mule Deer, Black Bear, Moose',
    IL: 'Whitetail Deer, Turkey, Duck',
    IN: 'Whitetail Deer, Turkey',
    IA: 'Whitetail Deer, Turkey, Pheasant',
    KS: 'Whitetail Deer, Pheasant, Turkey, Duck',
    KY: 'Whitetail Deer, Turkey, Elk',
    LA: 'Whitetail Deer, Duck, Wild Hog, Alligator',
    ME: 'Moose, Whitetail Deer, Black Bear, Grouse',
    MD: 'Whitetail Deer, Turkey, Goose',
    MA: 'Whitetail Deer, Turkey',
    MI: 'Whitetail Deer, Turkey, Black Bear',
    MN: 'Whitetail Deer, Turkey, Pheasant, Duck',
    MS: 'Whitetail Deer, Turkey, Duck',
    MO: 'Whitetail Deer, Turkey, Duck',
    MT: 'Elk, Mule Deer, Antelope, Whitetail Deer',
    NE: 'Whitetail Deer, Mule Deer, Pheasant, Turkey',
    NV: 'Mule Deer, Elk, Antelope, Bighorn Sheep',
    NH: 'Whitetail Deer, Moose, Black Bear, Turkey',
    NJ: 'Whitetail Deer, Turkey',
    NM: 'Elk, Mule Deer, Antelope, Oryx',
    NY: 'Whitetail Deer, Turkey, Black Bear',
    NC: 'Whitetail Deer, Turkey, Wild Hog, Duck',
    ND: 'Whitetail Deer, Mule Deer, Pheasant, Duck',
    OH: 'Whitetail Deer, Turkey',
    OK: 'Whitetail Deer, Turkey, Duck, Wild Hog',
    OR: 'Elk, Mule Deer, Blacktail Deer, Black Bear',
    PA: 'Whitetail Deer, Turkey, Black Bear',
    RI: 'Whitetail Deer, Turkey',
    SC: 'Whitetail Deer, Turkey, Wild Hog, Duck',
    SD: 'Pheasant, Whitetail Deer, Mule Deer, Antelope',
    TN: 'Whitetail Deer, Turkey, Duck',
    TX: 'Whitetail Deer, Wild Hog, Dove, Turkey',
    UT: 'Elk, Mule Deer, Antelope',
    VT: 'Whitetail Deer, Moose, Black Bear, Turkey',
    VA: 'Whitetail Deer, Turkey, Black Bear',
    WA: 'Elk, Mule Deer, Blacktail Deer, Black Bear',
    WV: 'Whitetail Deer, Turkey, Black Bear',
    WI: 'Whitetail Deer, Turkey, Duck, Black Bear',
    WY: 'Elk, Mule Deer, Antelope, Moose',
  },
};

// ─── MAIN ───────────────────────────────────────────────────────────────────
function main() {
  console.log('Reading CSV...');
  const raw = fs.readFileSync(INPUT_FILE, 'utf8');
  const rows = parse(raw, { columns: true, bom: true, relax_quotes: true, relax_column_count: true });
  console.log(`Loaded ${rows.length} rows.`);

  const stats = { total: rows.length, targeted: 0, pass1: 0, pass2: 0, skipped: 0, untagged: 0 };

  for (const row of rows) {
    row.species = '';

    // Only process guides/outfitters/charters
    if (!row.profession_name || !row.profession_name.includes('Hunter Resources')) {
      stats.skipped++;
      continue;
    }
    stats.targeted++;

    // ── Pass 1: Keyword extraction ──
    const text = ((row.company || '') + ' ' + (row.search_description || '')).toLowerCase();
    const found = new Set();

    for (const [pattern, species] of KEYWORD_MAP) {
      if (pattern.test(text)) {
        found.add(species);
      }
    }

    if (found.size > 0) {
      row.species = [...found].join(', ');
      stats.pass1++;
      continue;
    }

    // ── Pass 2: Regional inference ──
    const state = resolveState(row);
    const serviceType = classifyServiceType(row);

    if (state && serviceType !== 'unknown' && STATE_SPECIES[serviceType] && STATE_SPECIES[serviceType][state]) {
      row.species = STATE_SPECIES[serviceType][state];
      stats.pass2++;
      continue;
    }

    // Pass 2b: If we have a state but couldn't classify type, default to hunting (it's a hunting directory)
    if (state && STATE_SPECIES.hunting[state]) {
      row.species = STATE_SPECIES.hunting[state];
      stats.pass2++;
      continue;
    }

    // Pass 2c: No state found but we know the service type — use generic species
    if (serviceType === 'fishing') {
      row.species = 'Bass, Catfish, Crappie';  // generic freshwater default
      stats.pass2++;
      continue;
    }
    if (serviceType === 'hunting') {
      row.species = 'Whitetail Deer, Turkey';  // generic hunting default
      stats.pass2++;
      continue;
    }

    // Pass 2d: Last resort — classify from company name only
    const compNameLower = (row.company || '').toLowerCase();
    if (/charter|sportfish|angler|bowfish|fly\s*fish|guiding|reel|fish/i.test(compNameLower)) {
      row.species = 'Bass, Catfish, Crappie';
      stats.pass2++;
      continue;
    }
    if (/outfitter|hunt|ranch|lodge|safari|waterfowl|fowl|wing/i.test(compNameLower)) {
      row.species = 'Whitetail Deer, Turkey';
      stats.pass2++;
      continue;
    }

    stats.untagged++;
  }

  // Write output CSV
  console.log('\nWriting enriched CSV...');
  const columns = Object.keys(rows[0]);
  const output = stringify(rows, { header: true, columns });
  fs.writeFileSync(OUTPUT_FILE, output, 'utf8');
  console.log(`Written to: ${OUTPUT_FILE}`);

  // Summary report
  console.log('\n════════════════════════════════════════════════');
  console.log('  ENRICHMENT SUMMARY REPORT');
  console.log('════════════════════════════════════════════════');
  console.log(`  Total rows:              ${stats.total.toLocaleString()}`);
  console.log(`  Non-target (skipped):    ${stats.skipped.toLocaleString()}`);
  console.log(`  Target rows (guides+):   ${stats.targeted.toLocaleString()}`);
  console.log(`  ─────────────────────────────────────────`);
  console.log(`  Pass 1 (keyword match):  ${stats.pass1.toLocaleString()}  (${pct(stats.pass1, stats.targeted)})`);
  console.log(`  Pass 2 (regional infer): ${stats.pass2.toLocaleString()}  (${pct(stats.pass2, stats.targeted)})`);
  console.log(`  Total tagged:            ${(stats.pass1 + stats.pass2).toLocaleString()}  (${pct(stats.pass1 + stats.pass2, stats.targeted)})`);
  console.log(`  Untagged (manual rev.):  ${stats.untagged.toLocaleString()}  (${pct(stats.untagged, stats.targeted)})`);
  console.log('════════════════════════════════════════════════');

  // Spot-check some results
  console.log('\n── Spot Check (first 30 tagged rows) ──');
  let count = 0;
  for (const row of rows) {
    if (row.species && count < 30) {
      console.log(`  ${(row.company || '').padEnd(45)} ${(row.state_code || '??').padEnd(4)} → ${row.species}`);
      count++;
    }
  }
}

function pct(n, total) {
  return total > 0 ? (n / total * 100).toFixed(1) + '%' : '0%';
}

main();
