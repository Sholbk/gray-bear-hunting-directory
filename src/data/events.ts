import { CalendarEvent } from "@/types";

export const calendarEvents: CalendarEvent[] = [
  // ── Existing community events ──────────────────────────────────────
  { id: "expo-western", title: "Western Hunting Expo", description: "Annual hunting expo featuring gear, guides, and seminars.", date: "2026-02-12", location: "Salt Lake City, UT", category: "expo" },
  { id: "season-turkey", title: "Spring Turkey Opens", description: "Spring turkey hunting season begins across many states.", date: "2026-03-15", location: "Nationwide", category: "season" },
  { id: "class-safety", title: "Hunter Safety Course", description: "Hunter education and safety certification course.", date: "2026-03-22", location: "Denver, CO", category: "class" },
  { id: "tourney-bass", title: "Bass Pro Fishing Classic", description: "Major bass fishing tournament.", date: "2026-04-05", location: "Springfield, MO", category: "tournament" },
  { id: "tourney-archery", title: "Archery Tournament", description: "Competitive archery event.", date: "2026-04-18", location: "Louisville, KY", category: "tournament" },
  { id: "season-walleye", title: "Walleye Season Opens", description: "Walleye fishing season opens in Minnesota.", date: "2026-05-01", location: "Minnesota", category: "season" },
  { id: "expo-nra", title: "NRA Annual Meeting", description: "NRA annual meeting and exhibits.", date: "2026-05-15", location: "Dallas, TX", category: "expo" },
  { id: "meetup-flyfilm", title: "Fly Fishing Film Tour", description: "Fly fishing film screenings in cities nationwide.", date: "2026-06-10", location: "Various Cities", category: "meetup" },
  { id: "season-dove", title: "Dove Season Opens", description: "Dove hunting season opens across southern states.", date: "2026-09-01", location: "Southern States", category: "season" },
  { id: "season-elk-archery", title: "Elk Archery Season", description: "Colorado elk archery season opens.", date: "2026-09-10", location: "Colorado", category: "season" },
  { id: "expo-waterfowl", title: "Waterfowl Expo", description: "Waterfowl hunting expo and trade show.", date: "2026-10-15", location: "Stuttgart, AR", category: "expo" },
  { id: "season-whitetail", title: "Whitetail Rifle Season", description: "Whitetail deer rifle season opens across many states.", date: "2026-11-15", location: "Various States", category: "season" },

  // ── State hunt application deadlines ───────────────────────────────
  // Sources: Huntin' Fool, goHunt, onX Hunt, state agency sites

  // ALASKA
  { id: "ak-all", title: "Alaska Draw Application Deadline", description: "Application deadline for all species in Alaska's draw hunts.", date: "2026-12-15", location: "Alaska", category: "deadline", url: "http://www.adfg.alaska.gov/index.cfm?adfg=huntlicense.draw" },

  // ARIZONA
  { id: "az-elk", title: "Arizona Elk & Pronghorn Application Deadline", description: "Deadline for AZ elk and pronghorn draw applications.", date: "2026-02-03", location: "Arizona", category: "deadline", url: "https://draw.azgfd.com/" },
  { id: "az-deer", title: "Arizona Deer, Sheep & Bison Deadline", description: "Deadline for AZ bighorn sheep, fall bison, and deer draw.", date: "2026-06-02", location: "Arizona", category: "deadline", url: "https://draw.azgfd.com/" },
  { id: "az-javelina", title: "Arizona Javelina, Turkey & Spring Bison Deadline", description: "Deadline for AZ spring bison, javelina, and spring turkey draw.", date: "2026-10-06", location: "Arizona", category: "deadline", url: "https://draw.azgfd.com/" },

  // CALIFORNIA
  { id: "ca-all", title: "California All Species Application Deadline", description: "Deadline for CA big game draw — deer, elk, antelope, sheep, bear.", date: "2026-06-02", location: "California", category: "deadline", url: "https://www.ca.wildlifelicense.com/internetsales/CustomerSearch/Begin" },
  { id: "ca-elk-share", title: "California SHARE Elk Deadline", description: "Deadline for CA SHARE Private Lands elk draw.", date: "2026-07-23", location: "California", category: "deadline", url: "https://www.ca.wildlifelicense.com/internetsales/CustomerSearch/Begin" },

  // COLORADO
  { id: "co-primary", title: "Colorado Primary Draw Deadline", description: "Deadline for CO primary big game draw — elk, deer, pronghorn, sheep, goat, moose, bear.", date: "2026-04-07", location: "Colorado", category: "deadline", url: "https://www.cpwshop.com/home.page" },
  { id: "co-secondary", title: "Colorado Secondary Leftover Draw Deadline", description: "Deadline for CO secondary leftover draw.", date: "2026-06-29", location: "Colorado", category: "deadline", url: "https://www.cpwshop.com/home.page" },
  { id: "co-leftover", title: "Colorado Leftover Licenses Available", description: "CO leftover and unlimited licenses go on sale.", date: "2026-08-04", location: "Colorado", category: "deadline", url: "https://www.cpwshop.com/home.page" },

  // IDAHO
  { id: "id-controlled", title: "Idaho Controlled Hunt Application Deadline", description: "Deadline for ID controlled-hunt draw — elk, deer, antelope.", date: "2026-06-05", location: "Idaho", category: "deadline", url: "https://license.gooutdoorsidaho.com/Licensing/CustomerLookup.aspx" },
  { id: "id-sheep", title: "Idaho Sheep, Moose & Goat Deadline", description: "Deadline for ID bighorn sheep, moose, and mountain goat draw.", date: "2026-04-30", location: "Idaho", category: "deadline", url: "https://license.gooutdoorsidaho.com/Licensing/CustomerLookup.aspx" },
  { id: "id-resident", title: "Idaho Resident Tags Available", description: "2026 resident tags become available in Idaho.", date: "2026-07-08", location: "Idaho", category: "deadline", url: "https://license.gooutdoorsidaho.com/Licensing/CustomerLookup.aspx" },
  { id: "id-secondary", title: "Idaho Secondary Leftover Draw Deadline", description: "Deadline for ID secondary leftover draw.", date: "2026-08-15", location: "Idaho", category: "deadline", url: "https://license.gooutdoorsidaho.com/Licensing/CustomerLookup.aspx" },

  // IOWA
  { id: "ia-deer", title: "Iowa Whitetail Deer Application Deadline", description: "Deadline for IA whitetail deer draw.", date: "2026-06-01", location: "Iowa", category: "deadline", url: "https://gooutdoorsiowa.com/" },

  // KANSAS
  { id: "ks-deer", title: "Kansas Deer Application Deadline", description: "Deadline for KS whitetail and mule deer draw.", date: "2026-04-24", location: "Kansas", category: "deadline", url: "https://license.gooutdoorskansas.com/Licensing/CustomerLookup.aspx" },

  // KENTUCKY
  { id: "ky-elk", title: "Kentucky Elk Application Deadline", description: "Deadline for KY Rocky Mountain elk draw.", date: "2026-04-30", location: "Kentucky", category: "deadline", url: "https://app.fw.ky.gov/Solar/" },

  // MAINE
  { id: "me-moose", title: "Maine Moose Lottery Deadline", description: "Deadline for ME Canadian moose lottery.", date: "2026-05-15", location: "Maine", category: "deadline", url: "https://mooselottery.web.maine.gov/online/moose/" },

  // MONTANA
  { id: "mt-elk-deer", title: "Montana Elk & Deer Application Deadline", description: "Deadline for MT limited and general elk and deer draw.", date: "2026-04-01", location: "Montana", category: "deadline", url: "https://ols.fwp.mt.gov/" },
  { id: "mt-sheep", title: "Montana Sheep, Moose, Goat & Bison Deadline", description: "Deadline for MT bighorn sheep, moose, goat, and bison draw.", date: "2026-05-01", location: "Montana", category: "deadline", url: "https://ols.fwp.mt.gov/" },
  { id: "mt-antelope", title: "Montana Antelope Application Deadline", description: "Deadline for MT antelope draw.", date: "2026-06-01", location: "Montana", category: "deadline", url: "https://ols.fwp.mt.gov/" },
  { id: "mt-bonus", title: "Montana Bonus Points Only Deadline", description: "Last day to purchase MT bonus points only.", date: "2026-09-30", location: "Montana", category: "deadline", url: "https://ols.fwp.mt.gov/" },

  // NEBRASKA
  { id: "ne-deer", title: "Nebraska Deer & Antelope Application Deadline", description: "Deadline for NE deer and antelope draw.", date: "2026-06-12", location: "Nebraska", category: "deadline", url: "https://www.gooutdoorsne.com/login" },

  // NEVADA
  { id: "nv-guided", title: "Nevada Mule Deer Guided Draw Deadline", description: "Deadline for NV mule deer rifle guided draw.", date: "2026-03-09", location: "Nevada", category: "deadline", url: "https://nevada.licensing.kalkomey.com/" },
  { id: "nv-all", title: "Nevada All Species Application Deadline", description: "Deadline for NV main draw — deer, elk, antelope, sheep, goat.", date: "2026-05-13", location: "Nevada", category: "deadline", url: "https://nevada.licensing.kalkomey.com/" },
  { id: "nv-leftover", title: "Nevada Leftover Draw & Points Deadline", description: "Deadline for NV leftover draw and points-only purchase.", date: "2026-06-16", location: "Nevada", category: "deadline", url: "https://nevada.licensing.kalkomey.com/" },

  // NEW HAMPSHIRE
  { id: "nh-moose", title: "New Hampshire Moose Lottery Deadline", description: "Deadline for NH Canadian moose lottery.", date: "2026-05-29", location: "New Hampshire", category: "deadline", url: "https://www.nhfishandgame.com/" },

  // NEW MEXICO
  { id: "nm-bear-turkey", title: "New Mexico Bear & Turkey Draw Deadline", description: "Deadline for NM bear and turkey draw permits.", date: "2026-02-11", location: "New Mexico", category: "deadline", url: "https://onlinesales.wildlife.state.nm.us/" },
  { id: "nm-biggame", title: "New Mexico Big Game Application Deadline", description: "Deadline for NM bighorn sheep, elk, deer, antelope draw.", date: "2026-03-18", location: "New Mexico", category: "deadline", url: "https://onlinesales.wildlife.state.nm.us/" },

  // NORTH DAKOTA
  { id: "nd-sheep", title: "North Dakota Sheep, Moose & Elk Deadline", description: "Deadline for ND bighorn sheep, Canadian moose, and elk draw.", date: "2026-03-25", location: "North Dakota", category: "deadline", url: "https://gf.nd.gov/buy-apply" },
  { id: "nd-deer", title: "North Dakota Deer Application Deadline", description: "Deadline for ND deer draw.", date: "2026-06-03", location: "North Dakota", category: "deadline", url: "https://gf.nd.gov/buy-apply" },
  { id: "nd-antelope", title: "North Dakota Antelope Application Deadline", description: "Deadline for ND antelope draw.", date: "2026-08-05", location: "North Dakota", category: "deadline", url: "https://gf.nd.gov/buy-apply" },

  // OREGON
  { id: "or-bear", title: "Oregon Spring Bear Application Deadline", description: "Deadline for OR spring bear controlled hunt draw.", date: "2026-02-10", location: "Oregon", category: "deadline", url: "https://odfw.huntfishoregon.com/login" },
  { id: "or-all", title: "Oregon All Species Application Deadline", description: "Deadline for OR big game draw — deer, elk, antelope, sheep, goat.", date: "2026-05-15", location: "Oregon", category: "deadline", url: "https://odfw.huntfishoregon.com/login" },
  { id: "or-points", title: "Oregon Preference Points Deadline", description: "Last day to purchase OR preference points only.", date: "2026-11-30", location: "Oregon", category: "deadline", url: "https://odfw.huntfishoregon.com/login" },

  // PENNSYLVANIA
  { id: "pa-elk", title: "Pennsylvania Elk Application Deadline", description: "Deadline for PA Rocky Mountain elk draw.", date: "2026-07-12", location: "Pennsylvania", category: "deadline", url: "https://huntfish.pa.gov/" },

  // SOUTH DAKOTA
  { id: "sd-buck", title: "South Dakota Special Buck & Antelope Deadline", description: "Deadline for SD special buck deer and special antelope draw.", date: "2026-04-15", location: "South Dakota", category: "deadline", url: "https://license.gooutdoorssouthdakota.com/Licensing/CustomerLookup.aspx" },
  { id: "sd-archery-deer", title: "South Dakota Archery Deer Draw Deadline", description: "Deadline for SD statewide archery deer draw.", date: "2026-04-21", location: "South Dakota", category: "deadline", url: "https://license.gooutdoorssouthdakota.com/Licensing/CustomerLookup.aspx" },
  { id: "sd-sheep-elk", title: "South Dakota Sheep & Elk Deadline (Residents)", description: "Deadline for SD Rocky Mountain sheep and elk draw (residents only).", date: "2026-05-19", location: "South Dakota", category: "deadline", url: "https://license.gooutdoorssouthdakota.com/Licensing/CustomerLookup.aspx" },
  { id: "sd-deer-wr", title: "South Dakota Deer (West River/Black Hills) Deadline", description: "Deadline for SD whitetail/mule deer Black Hills and West River draw.", date: "2026-06-16", location: "South Dakota", category: "deadline", url: "https://license.gooutdoorssouthdakota.com/Licensing/CustomerLookup.aspx" },
  { id: "sd-bison", title: "South Dakota Bison Application Deadline", description: "Deadline for SD bison (trophy and non-trophy) draw.", date: "2026-08-06", location: "South Dakota", category: "deadline", url: "https://license.gooutdoorssouthdakota.com/Licensing/CustomerLookup.aspx" },
  { id: "sd-antelope-fa", title: "South Dakota Firearm Antelope Deadline", description: "Deadline for SD firearm antelope draw.", date: "2026-08-11", location: "South Dakota", category: "deadline", url: "https://license.gooutdoorssouthdakota.com/Licensing/CustomerLookup.aspx" },
  { id: "sd-points", title: "South Dakota Preference Points Deadline", description: "Last day to purchase SD preference points only.", date: "2026-12-15", location: "South Dakota", category: "deadline", url: "https://license.gooutdoorssouthdakota.com/Licensing/CustomerLookup.aspx" },

  // TENNESSEE
  { id: "tn-elk", title: "Tennessee Elk Application Deadline", description: "Deadline for TN Rocky Mountain elk quota hunt draw.", date: "2026-02-25", location: "Tennessee", category: "deadline", url: "https://quotahunt.gooutdoorstennessee.com/Hunts/CustomerLookup.aspx" },

  // TEXAS
  { id: "tx-sheep", title: "Texas Desert Sheep Public Draw Deadline", description: "Deadline for TX desert bighorn sheep public draw.", date: "2026-11-01", location: "Texas", category: "deadline", url: "https://www.txfgsales.com/PHS/CustomerSearch.aspx" },

  // UTAH
  { id: "ut-bear", title: "Utah Black Bear Application Deadline", description: "Deadline for UT black bear draw.", date: "2026-02-24", location: "Utah", category: "deadline", url: "https://utahdraws.com" },
  { id: "ut-biggame", title: "Utah Big Game Application Deadline", description: "Deadline for UT bucks, bulls, and once-in-a-lifetime species draw.", date: "2026-04-23", location: "Utah", category: "deadline", url: "https://utahdraws.com" },
  { id: "ut-ewe", title: "Utah Ewe Sheep & Antlerless Deadline", description: "Deadline for UT ewe bighorn sheep and antlerless species draw.", date: "2026-06-17", location: "Utah", category: "deadline", url: "https://utahdraws.com" },
  { id: "ut-bull", title: "Utah General Any-Bull Elk Permits", description: "UT general season any-bull elk permits go on sale.", date: "2026-07-09", location: "Utah", category: "deadline", url: "https://wildlifelicense.utah.gov/hflo/main/serv1/index.html" },
  { id: "ut-grouse", title: "Utah Grouse, Crane & Swan Deadline", description: "Deadline for UT grouse, sandhill crane, and tundra swan draw.", date: "2026-07-15", location: "Utah", category: "deadline", url: "https://utahdraws.com" },

  // VERMONT
  { id: "vt-moose", title: "Vermont Moose Lottery Deadline", description: "Deadline for VT Canadian moose lottery.", date: "2026-06-17", location: "Vermont", category: "deadline", url: "https://www.vtfwdsales.com/online/cid_entry.php" },

  // VIRGINIA
  { id: "va-elk", title: "Virginia Elk Lottery Deadline", description: "Deadline for VA elk lottery application.", date: "2026-03-31", location: "Virginia", category: "deadline", url: "https://dwr.virginia.gov/wildlife/elk/hunting/elk-lottery/" },

  // WASHINGTON
  { id: "wa-all", title: "Washington Special Permits Deadline", description: "Deadline for WA all species special hunting permits draw.", date: "2026-05-27", location: "Washington", category: "deadline", url: "https://fishhunt.dfw.wa.gov/login" },

  // WYOMING
  { id: "wy-nr-elk", title: "Wyoming Non-Resident Elk Deadline", description: "Deadline for WY non-resident elk license draw.", date: "2026-02-02", location: "Wyoming", category: "deadline", url: "https://wgfapps.wyo.gov/elsapplication/ELSWelcome.aspx" },
  { id: "wy-sheep", title: "Wyoming Sheep, Moose, Goat & Bison Deadline", description: "Deadline for WY bighorn sheep, moose, mountain goat, and bison draw.", date: "2026-04-30", location: "Wyoming", category: "deadline", url: "https://wgfapps.wyo.gov/elsapplication/ELSWelcome.aspx" },
  { id: "wy-deer", title: "Wyoming Deer, Antelope & Resident Elk Deadline", description: "Deadline for WY deer, pronghorn, and resident elk draw.", date: "2026-06-01", location: "Wyoming", category: "deadline", url: "https://wgfapps.wyo.gov/elsapplication/ELSWelcome.aspx" },
  { id: "wy-secondary", title: "Wyoming Secondary Leftover Draw Deadline", description: "Deadline for WY secondary leftover draw.", date: "2026-06-26", location: "Wyoming", category: "deadline", url: "https://wgfapps.wyo.gov/elsapplication/ELSWelcome.aspx" },
  { id: "wy-points", title: "Wyoming Points Only Deadline", description: "Last day to purchase WY preference/bonus points only.", date: "2026-11-02", location: "Wyoming", category: "deadline", url: "https://wgfapps.wyo.gov/elsapplication/ELSWelcome.aspx" },

  // ── States with general season dates (OTC / no draw system) ────────
  // These states sell licenses over the counter or have seasons that open on set dates.
  // Listed as the primary season opening date for the most popular game.

  // ALABAMA
  { id: "al-deer", title: "Alabama Deer Season Opens", description: "AL archery deer season opens.", date: "2026-10-15", location: "Alabama", category: "season", url: "https://www.outdooralabama.com/deer-hunting/season-dates" },

  // ARKANSAS
  { id: "ar-deer", title: "Arkansas Deer Season Opens", description: "AR archery deer season opens.", date: "2026-09-26", location: "Arkansas", category: "season", url: "https://www.agfc.com/hunting/big-game/deer/" },

  // CONNECTICUT
  { id: "ct-deer", title: "Connecticut Deer Archery Opens", description: "CT archery deer season opens.", date: "2026-09-15", location: "Connecticut", category: "season", url: "https://portal.ct.gov/deep/hunting" },

  // DELAWARE
  { id: "de-deer", title: "Delaware Deer Archery Opens", description: "DE archery deer season opens.", date: "2026-09-01", location: "Delaware", category: "season", url: "https://dnrec.alpha.delaware.gov/fish-wildlife/hunting/" },

  // FLORIDA
  { id: "fl-deer", title: "Florida Deer Season Opens (Zone A)", description: "FL general gun deer season opens in Zone A.", date: "2026-11-14", location: "Florida", category: "season", url: "https://myfwc.com/hunting/season-dates/" },

  // GEORGIA
  { id: "ga-deer", title: "Georgia Deer Archery Opens", description: "GA archery deer season opens.", date: "2026-09-12", location: "Georgia", category: "season", url: "https://georgiawildlife.com/hunting/season" },

  // HAWAII
  { id: "hi-hunt", title: "Hawaii Public Hunting Season Opens", description: "HI public hunting areas open for game mammals and birds.", date: "2026-11-01", location: "Hawaii", category: "season", url: "https://dlnr.hawaii.gov/recreation/hunting/" },

  // ILLINOIS
  { id: "il-deer", title: "Illinois Deer Archery Opens", description: "IL archery deer season opens.", date: "2026-10-01", location: "Illinois", category: "season", url: "https://www.dnr.illinois.gov/hunting/deer/Pages/default.aspx" },

  // INDIANA
  { id: "in-deer", title: "Indiana Deer Archery Opens", description: "IN archery deer season opens.", date: "2026-10-01", location: "Indiana", category: "season", url: "https://www.in.gov/dnr/fish-and-wildlife/hunting-and-trapping/deer-hunting/" },

  // LOUISIANA
  { id: "la-deer", title: "Louisiana Deer Archery Opens", description: "LA archery deer season opens.", date: "2026-10-01", location: "Louisiana", category: "season", url: "https://www.wlf.louisiana.gov/page/deer" },

  // MARYLAND
  { id: "md-deer", title: "Maryland Deer Archery Opens", description: "MD archery deer season opens.", date: "2026-09-11", location: "Maryland", category: "season", url: "https://dnr.maryland.gov/wildlife/Pages/hunt_trap/deerhunting.aspx" },

  // MASSACHUSETTS
  { id: "ma-deer", title: "Massachusetts Deer Archery Opens", description: "MA archery deer season opens.", date: "2026-10-19", location: "Massachusetts", category: "season", url: "https://www.mass.gov/deer-hunting-season-dates-bag-limits" },

  // MICHIGAN
  { id: "mi-deer", title: "Michigan Deer Archery Opens", description: "MI archery deer season opens.", date: "2026-10-01", location: "Michigan", category: "season", url: "https://www.michigan.gov/dnr/things-to-do/hunting/deer" },

  // MINNESOTA
  { id: "mn-deer", title: "Minnesota Deer Archery Opens", description: "MN archery deer season opens.", date: "2026-09-19", location: "Minnesota", category: "season", url: "https://www.dnr.state.mn.us/hunting/deer/index.html" },

  // MISSISSIPPI
  { id: "ms-deer", title: "Mississippi Deer Archery Opens", description: "MS archery deer season opens.", date: "2026-10-01", location: "Mississippi", category: "season", url: "https://www.mdwfp.com/hunting-trapping/deer-program/" },

  // MISSOURI
  { id: "mo-deer", title: "Missouri Deer Archery Opens", description: "MO archery deer season opens.", date: "2026-09-15", location: "Missouri", category: "season", url: "https://mdc.mo.gov/hunting-trapping/species/deer" },

  // NEW JERSEY
  { id: "nj-deer", title: "New Jersey Deer Bow Opens", description: "NJ bow and arrow deer season opens.", date: "2026-09-12", location: "New Jersey", category: "season", url: "https://www.nj.gov/dep/fgw/deerseason.htm" },

  // NEW YORK
  { id: "ny-deer", title: "New York Deer Archery Opens (Southern Zone)", description: "NY archery deer season opens in Southern Zone.", date: "2026-10-01", location: "New York", category: "season", url: "https://www.dec.ny.gov/outdoor/hunting.html" },

  // NORTH CAROLINA
  { id: "nc-deer", title: "North Carolina Deer Archery Opens", description: "NC archery deer season opens.", date: "2026-09-12", location: "North Carolina", category: "season", url: "https://www.ncwildlife.org/Hunting/Seasons-Limits" },

  // OHIO
  { id: "oh-deer", title: "Ohio Deer Archery Opens", description: "OH archery deer season opens.", date: "2026-09-26", location: "Ohio", category: "season", url: "https://ohiodnr.gov/discover-and-learn/safety-conservation/about-ODNR/wildlife/hunting-trapping-regulations" },

  // OKLAHOMA
  { id: "ok-deer", title: "Oklahoma Deer Archery Opens", description: "OK archery deer season opens.", date: "2026-10-01", location: "Oklahoma", category: "season", url: "https://www.wildlifedepartment.com/hunting/deer" },

  // RHODE ISLAND
  { id: "ri-deer", title: "Rhode Island Deer Archery Opens", description: "RI archery deer season opens.", date: "2026-09-15", location: "Rhode Island", category: "season", url: "https://dem.ri.gov/natural-resources-bureau/fish-wildlife/freshwater-fisheries/hunting" },

  // SOUTH CAROLINA
  { id: "sc-deer", title: "South Carolina Deer Archery Opens", description: "SC archery deer season opens.", date: "2026-09-01", location: "South Carolina", category: "season", url: "https://www.dnr.sc.gov/hunting/deer/" },

  // WEST VIRGINIA
  { id: "wv-deer", title: "West Virginia Deer Archery Opens", description: "WV archery deer season opens.", date: "2026-09-26", location: "West Virginia", category: "season", url: "https://wvdnr.gov/hunting/deer/" },

  // WISCONSIN
  { id: "wi-deer", title: "Wisconsin Deer Archery Opens", description: "WI archery deer season opens.", date: "2026-09-12", location: "Wisconsin", category: "season", url: "https://dnr.wisconsin.gov/topic/Hunt/deer" },
];
