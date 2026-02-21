#!/usr/bin/env node

/**
 * Batch geocode listings from city/state to lat/lng using Google Geocoding API.
 * Deduplicates by city+state to minimize API calls.
 * Caches results to src/data/geocode-cache.json for resumability.
 *
 * Usage: GOOGLE_MAPS_API_KEY=your_key node scripts/geocode-listings.js
 */

const fs = require("fs");
const path = require("path");

const LISTINGS_PATH = path.join(__dirname, "../src/data/listings.json");
const CACHE_PATH = path.join(__dirname, "../src/data/geocode-cache.json");
const API_KEY =
  process.env.GOOGLE_MAPS_API_KEY ||
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!API_KEY) {
  console.error(
    "Error: Set GOOGLE_MAPS_API_KEY or NEXT_PUBLIC_GOOGLE_MAPS_API_KEY env variable"
  );
  process.exit(1);
}

const DELAY_MS = 30; // ~33 QPS, well under Google's 50 QPS limit
const CHECKPOINT_INTERVAL = 100;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function geocode(city, state) {
  const address = encodeURIComponent(`${city}, ${state}, USA`);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.status === "OK" && data.results.length > 0) {
    const loc = data.results[0].geometry.location;
    return { lat: loc.lat, lng: loc.lng };
  }

  if (data.status === "OVER_QUERY_LIMIT") {
    console.error("Hit API rate limit. Waiting 60s...");
    await sleep(60000);
    return geocode(city, state); // retry
  }

  return null;
}

async function main() {
  // Load listings
  const listings = JSON.parse(fs.readFileSync(LISTINGS_PATH, "utf-8"));
  console.log(`Loaded ${listings.length} listings`);

  // Load cache
  let cache = {};
  if (fs.existsSync(CACHE_PATH)) {
    cache = JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"));
    console.log(`Loaded ${Object.keys(cache).length} cached geocode results`);
  }

  // Build unique city+state pairs
  const uniquePairs = new Map();
  for (const listing of listings) {
    const city = listing.location?.city?.trim();
    const state = listing.location?.state?.trim();
    if (city && state) {
      const key = `${city}, ${state}`;
      if (!uniquePairs.has(key)) {
        uniquePairs.set(key, { city, state });
      }
    }
  }

  console.log(`Found ${uniquePairs.size} unique city/state pairs`);

  // Geocode uncached pairs
  const toGeocode = [...uniquePairs.entries()].filter(
    ([key]) => !(key in cache)
  );
  console.log(`Need to geocode ${toGeocode.length} new pairs`);

  let processed = 0;
  for (const [key, { city, state }] of toGeocode) {
    const coords = await geocode(city, state);
    cache[key] = coords;
    processed++;

    if (processed % 50 === 0) {
      console.log(
        `  Geocoded ${processed}/${toGeocode.length} (${key} -> ${coords ? `${coords.lat},${coords.lng}` : "null"})`
      );
    }

    // Checkpoint save
    if (processed % CHECKPOINT_INTERVAL === 0) {
      fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
    }

    await sleep(DELAY_MS);
  }

  // Final cache save
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
  console.log(`\nGeocoding complete. Cache has ${Object.keys(cache).length} entries`);

  // Merge coordinates into listings
  let matched = 0;
  let unmatched = 0;
  for (const listing of listings) {
    const city = listing.location?.city?.trim();
    const state = listing.location?.state?.trim();
    if (city && state) {
      const key = `${city}, ${state}`;
      listing.coordinates = cache[key] || null;
      if (listing.coordinates) matched++;
      else unmatched++;
    } else {
      listing.coordinates = null;
      unmatched++;
    }
  }

  console.log(`Matched: ${matched}, Unmatched: ${unmatched}`);

  // Write updated listings
  fs.writeFileSync(LISTINGS_PATH, JSON.stringify(listings, null, 2));
  console.log("Updated listings.json with coordinates");
}

main().catch(console.error);
