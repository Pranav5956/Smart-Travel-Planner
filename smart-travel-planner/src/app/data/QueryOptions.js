export const starRatingOptions = [
  { value: 5, label: "5 Stars" },
  { value: 4, label: "4 Stars" },
  { value: 3, label: "3 Stars" },
  { value: 2, label: "2 Stars" },
  { value: 1, label: "1 Stars" },
];

export const sortOptions = [
  { value: "STAR_RATING_HIGHEST_FIRST", label: "Highest Star Rating" },
  { value: "STAR_RATING_LOWEST_FIRST", label: "Lowest Star Rating" },
  { value: "PRICE_HIGHEST_FIRST", label: "Highest Pricing" },
  { value: "PRICE", label: "Lowest Pricing" },
];

export const amenitiesOptions = [
  { value: 2063, label: "24-hour front desk" },
  { value: 537, label: "Smoking areas" },
  { value: 515, label: "Bar" },
  { value: 2048, label: "Breakfast included" },
  { value: 513, label: "Airport Transfers" },
  { value: 16384, label: "Parking Available" },
  { value: 519, label: "Business facilities" },
  { value: 1, label: "Meeting Facilities" },
  { value: 256, label: "Restaurant" },
  { value: 128, label: "Pool" },
  { value: 539, label: "Spa" },
  { value: 64, label: "Pet friendly" },
  { value: 527, label: "Wifi Included" },
  { value: 521, label: "Childcare" },
  { value: 2, label: "Gym" },
  { value: 517, label: "Bathtub in room" },
  { value: 523, label: "Connecting rooms available" },
  { value: 2112, label: "Casino" },
  { value: 2097152, label: "Accessibility equipment for the deaf" },
  { value: 131072, label: "Accessible bathroom" },
  { value: 524288, label: "Accessible parking" },
  { value: 65536, label: "Accessible path of travel" },
  { value: 4194304, label: "Braille or raised signage" },
  { value: 1048576, label: "In-room accessibility" },
  { value: 262144, label: "Roll-in shower" },
  { value: 541, label: "Wheelchair accessible rooms" },
];

export const themesOptions = [
  { value: 6, label: "Beach" },
  { value: 14, label: "Business" },
  { value: 8, label: "Casino" },
  { value: 25, label: "Family-friendly" },
  { value: 15, label: "Luxury" },
  { value: 27, label: "Spa hotel" },
];

export const poiFilterOptions = [
  {
    label: "Adult",
    value: "adult",
    children: [
      {
        label: "Alcohol",
        value: "alcohol",
      },
      {
        label: "Casino",
        value: "casino",
      },
      {
        label: "Night-Clubs",
        value: "nightclubs",
      },
    ],
  },
  {
    label: "Amusements",
    value: "amusements",
    children: [
      {
        label: "Amusement Parks",
        value: "amusement_parks",
      },
      {
        label: "Water Parks",
        value: "water_parks",
      },
      {
        label: "Ferris Wheels",
        value: "ferris_wheels",
      },
      {
        label: "Roller Coasters",
        value: "roller_coasters",
      },
      {
        label: "Baths and Saunas",
        value: "baths_and_saunas",
        children: [
          {
            label: "Saunas",
            value: "saunas",
          },
          {
            label: "Other Bath-Houses",
            value: "other_bathhouses",
          },
          {
            label: "Open-air Baths",
            value: "open_air_baths",
          },
          {
            label: "Thermal Baths",
            value: "thermal_baths",
          },
        ],
      },
    ],
  },
  {
    label: "Interesting Places",
    value: "interesting_places",
    children: [
      {
        label: "Architecture",
        value: "architecture",
        children: [
          {
            label: "Bridges",
            value: "bridges",
          },
          {
            label: "Historic Architecture",
            value: "historic_architecture",
          },
          {
            label: "Lighthouses",
            value: "lighthouses",
          },
          {
            label: "Skyscrapers",
            value: "skyscrapers",
          },
          {
            label: "Towers",
            value: "towers",
          },
        ],
      },
      {
        label: "Cultural",
        value: "cultural",
        children: [
          {
            label: "Museums",
            value: "museums",
            children: [
              {
                label: "Aquariums",
                value: "aquariums",
              },
              {
                label: "Art Galleries",
                value: "art_galleries",
              },
              {
                label: "Fashion Museums",
                value: "fashion_museums",
              },
              {
                label: "History Museums",
                value: "history_museums",
              },
              {
                label: "Planetariums",
                value: "planetariums",
              },
              {
                label: "Zoos",
                value: "zoos",
              },
              {
                label: "Science Museums",
                value: "science_museums",
              },
            ],
          },
          {
            label: "Theaters and Entertainments",
            value: "theatres_and_entertainments",
            children: [
              {
                label: "Circuses",
                value: "circuses",
              },
              {
                label: "Concert Halls",
                value: "concert_halls",
              },
              {
                label: "Cinemas",
                value: "cinemas",
              },
              {
                label: "Music Venues",
                value: "music_venues",
              },
              {
                label: "Opera Houses",
                value: "opera_houses",
              },
            ],
          },
          {
            label: "Urban Environment",
            value: "urban_environment",
            children: [
              {
                label: "Fountains",
                value: "fountains",
              },
              {
                label: "Gardens and Parks",
                value: "garden_and_parks",
              },
              {
                label: "Sculptures",
                value: "sculptures",
              },
            ],
          },
        ],
      },
      {
        label: "Historic",
        value: "historic",
        children: [
          {
            label: "Archaeology",
            value: "archaeology",
          },
          {
            label: "Burial Places",
            value: "burial_places",
          },
          {
            label: "Fortifications",
            value: "fortifications",
          },
          {
            label: "Historical Places",
            value: "historical_places",
          },
          {
            label: "Monuments and Memorials",
            value: "monuments_and_memorials",
          },
        ],
      },
      {
        label: "Natural",
        value: "natural",
        children: [
          {
            label: "Beaches",
            value: "beaches",
          },
          {
            label: "Geological Formations",
            value: "geological_formations",
            children: [
              {
                label: "Canyons",
                value: "canyons",
              },
              {
                label: "Caves",
                value: "caves",
              },
              {
                label: "Mountain Peaks",
                value: "mountain_peaks",
              },
              {
                label: "Volcanoes",
                value: "volcanoes",
              },
              {
                label: "Rock Formations",
                value: "rock_formations",
              },
            ],
          },
          {
            label: "Glaciers",
            value: "glaciers",
          },
          {
            label: "Islands",
            value: "islands",
          },
          {
            label: "Natural Springs",
            value: "natural_springs",
          },
          {
            label: "Nature Reserves",
            value: "nature_reserves",
          },
          {
            label: "Water",
            value: "water",
            children: [
              {
                label: "Canals",
                value: "canals",
              },
              {
                label: "Crater Lakes",
                value: "crater_lakes",
              },
              {
                label: "Lagoons",
                value: "lagoons",
              },
              {
                label: "Reservoirs",
                value: "reservoirs",
              },
              {
                label: "Rivers",
                value: "rivers",
              },
              {
                label: "Waterfalls",
                value: "waterfalls",
              },
            ],
          },
        ],
      },
      {
        label: "Religion",
        value: "religion",
        children: [
          {
            label: "Buddhist Temples",
            value: "buddhist_temples",
          },
          {
            label: "Cathedrals",
            value: "cathedrals",
          },
          {
            label: "Churches",
            value: "churches",
          },
          {
            label: "Egyptian Temples",
            value: "egyptian_temples",
          },
          {
            label: "Hindu Temples",
            value: "hindu_temples",
          },
          {
            label: "Monastries",
            value: "monastries",
          },
          {
            label: "Mosques",
            value: "mosques",
          },
          {
            label: "Synagogues",
            value: "synagogues",
          },
        ],
      },
    ],
  },
  {
    label: "Sport",
    value: "sport",
    children: [
      {
        label: "Driving",
        value: "diving",
      },
      {
        label: "Climbing",
        value: "climbing",
      },
      {
        label: "Kite-Surfing",
        value: "kitesurfing",
      },
      {
        label: "Pools",
        value: "pools",
      },
      {
        label: "Stadiums",
        value: "stadiums",
      },
      {
        label: "Surfing",
        value: "surfing",
      },
      {
        label: "Winter Sports",
        value: "winter_sports",
      },
    ],
  },
  {
    label: "Tourist Facilities",
    value: "tourist_facilities",
    children: [
      {
        label: "Banks",
        value: "banks",
        children: [
          {
            label: "ATM",
            value: "atm",
          },
          {
            label: "Bank",
            value: "bank",
          },
        ],
      },
      {
        label: "Foods",
        value: "foods",
        children: [
          {
            label: "Bars",
            value: "bars",
          },
          {
            label: "Cafes",
            value: "cafes",
          },
          {
            label: "Fast-Food",
            value: "fast_food",
          },
          {
            label: "Food Court",
            value: "food_court",
          },
          {
            label: "Picnic Site",
            value: "picnic_site",
          },
          {
            label: "Pubs",
            value: "pubs",
          },
          {
            label: "Restaurants",
            value: "restaurants",
          },
        ],
      },
      {
        label: "Shops",
        value: "shops",
        children: [
          {
            label: "Bakeries",
            value: "bakeries",
          },
          {
            label: "Convenience Stores",
            value: "conveniences",
          },
          {
            label: "Fish Stalls",
            value: "fish_stores",
          },
          {
            label: "Malls",
            value: "malls",
          },
          {
            label: "Marketplaces",
            value: "marketplaces",
          },
          {
            label: "SuperMarkets",
            value: "supermarkets",
          },
        ],
      },
      {
        label: "Transport",
        value: "transport",
        children: [
          {
            label: "Bicycle (Rental)",
            value: "bicycle_rental",
          },
          {
            label: "Boat (Sharing)",
            value: "boat_sharing",
          },
          {
            label: "Car (Rental)",
            value: "car_rental",
          },
          {
            label: "Car (Sharing)",
            value: "car_sharing",
          },
          {
            label: "Car Wash",
            value: "car_wash",
          },
          {
            label: "Charging Stations",
            value: "charging_stations",
          },
          {
            label: "Fuel",
            value: "fuel",
          },
        ],
      },
    ],
  },
];

export const poiDefaultThumbnails = {
  alcohol:
    "https://images.unsplash.com/photo-1543007629-5c4e8a83ba4c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YWxjb2hvbHxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  casino:
    "https://images.unsplash.com/photo-1517232115160-ff93364542dd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FzaW5vfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  nightclubs:
    "https://images.unsplash.com/photo-1549006397-5da55b9e3dc1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmlnaHQlMjBjbHVifGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  amusement_parks:
    "https://images.unsplash.com/photo-1586877644127-e5ee9b4231c3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGlzbmV5bGFuZHxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  water_parks:
    "https://images.unsplash.com/photo-1580915038297-25ea2adedfb2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8d2F0ZXIlMjBwYXJrfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  ferris_wheels:
    "https://images.unsplash.com/photo-1498196645145-687fd3bfe912?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZmVycmlzJTIwd2hlZWx8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&q=60",
  roller_coasters:
    "https://images.unsplash.com/photo-1570444952548-756e3fc089fe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fHJvbGxlciUyMGNvYXN0ZXJzfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  baths_and_saunas:
    "https://images.unsplash.com/photo-1583416750470-965b2707b355?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2F1bmFzfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  bridges:
    "https://images.unsplash.com/photo-1610312278520-bcc893a3ff1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGJyaWRnZXN8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  lighthouses:
    "https://images.unsplash.com/photo-1522679056866-8dbbc8774a9d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxpZ2h0aG91c2VzfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  skyscrapers:
    "https://images.unsplash.com/photo-1514623471391-d83c3ff44cd0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2t5c2NyYXBlcnN8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  towers:
    "https://images.unsplash.com/photo-1581958921308-99698dcf60bb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHRvd2VyfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  historic_architecture:
    "https://images.unsplash.com/photo-1572370666120-d171df6d8473?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGFsYWNlfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  aquariums:
    "https://images.unsplash.com/photo-1562445927-bdd32a655213?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGFxdWFyaXVtc3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  art_galleries:
    "https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0JTIwZ2FsbGVyaWVzfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  fashion_museums:
    "https://images.unsplash.com/photo-1562347174-7370ad83dc47?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZmFzaGlvbiUyMG11c2V1bXN8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  history_museums:
    "https://images.unsplash.com/photo-1491156855053-9cdff72c7f85?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhpc3RvcnklMjBtdXNldW18ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  planetariums:
    "https://images.unsplash.com/photo-1592860475958-6d6dd04b34b4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGxhbmV0YXJpdW18ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  zoos:
    "https://images.unsplash.com/photo-1519066629447-267fffa62d4b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8em9vfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  science_museums:
    "https://images.unsplash.com/photo-1578103546508-3880c89f0511?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2NpZW5jZSUyMG11c2V1bXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  circuses:
    "https://images.unsplash.com/photo-1553004377-62aa53df180f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2lyY3VzfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  concert_halls:
    "https://images.unsplash.com/photo-1583787035686-91b82ad5d811?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fGNvbmNlcnQlMjBoYWxsfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  cinemas:
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2luZW1hfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  music_venues:
    "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBzdHVkaW98ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  opera_houses:
    "https://images.unsplash.com/photo-1580809361436-42a7ec204889?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8b3BlcmElMjBob3VzZSUyMGluZG9vcnxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  fountains:
    "https://images.unsplash.com/photo-1600027031498-87be32f92c27?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGZvdW50YWlufGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  garden_and_parks:
    "https://images.unsplash.com/photo-1445937888010-cc262f556033?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGFya3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  sculptures:
    "https://images.unsplash.com/photo-1609856874044-feb5f49c83dc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2N1bHB0dXJlfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  archaeology:
    "https://images.unsplash.com/photo-1567930009485-07d60c813306?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGFyY2hhZW9sb2dpY2FsJTIwc2l0ZXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  burial_places:
    "https://images.unsplash.com/photo-1563283254-385aa28500d2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YnVyaWFsfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  fortifications:
    "https://images.unsplash.com/photo-1518982074995-47ce824cea56?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGZvcnRpZmljYXRpb25zfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  historical_places:
    "https://images.unsplash.com/photo-1612375195589-248dd895e9de?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmF0dGxlZmllbGR8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  monuments_and_memorials:
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW9udW1lbnR8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  beaches:
    "https://images.unsplash.com/photo-1533760881669-80db4d7b4c15?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGJlYWNofGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  canyons:
    "https://images.unsplash.com/photo-1527333656061-ca7adf608ae1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FueW9uc3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  caves:
    "https://images.unsplash.com/photo-1523419163445-589ebf1785c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2F2ZXN8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  mountain_peaks:
    "https://images.unsplash.com/photo-1526239187794-f8c27c7872ee?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBwZWFrfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  volcanoes:
    "https://images.unsplash.com/photo-1580250642511-1660fe42ad58?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHZvbGNhbm98ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  rock_formations:
    "https://images.unsplash.com/photo-1542582954-309a3122f4c1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHJvY2slMjBmb3JtYXRpb258ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  glaciers:
    "https://images.unsplash.com/photo-1516569422572-d9e0514b9598?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2xhY2llcnxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  islands:
    "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aXNsYW5kfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  natural_springs:
    "https://images.unsplash.com/photo-1580685069984-1952ca62f12b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8aG90JTIwc3ByaW5nfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  natural_reserves:
    "https://images.unsplash.com/photo-1594415082975-ce772588dd78?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fG5hdGlvbmFsJTIwcGFya3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  canals:
    "https://images.unsplash.com/photo-1499241142330-28701ea87ff4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FuYWxzfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  crater_lakes:
    "https://images.unsplash.com/photo-1472005991841-b135020cad7c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y3JhdGVyJTIwbGFrZXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  lagoons:
    "https://images.unsplash.com/photo-1580100586938-02822d99c4a8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGFnb29ufGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  resevoirs:
    "https://images.unsplash.com/photo-1560279966-2d681f3d4dfc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVzZXZvaXJ8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  rivers:
    "https://images.unsplash.com/photo-1519852476561-ec618b0183ba?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cml2ZXJ8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  waterfalls:
    "https://images.unsplash.com/photo-1493713838217-28e23b41b798?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2F0ZXJmYWxsfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  buddhist_temples:
    "https://images.unsplash.com/photo-1543160058-bb08f2f22c21?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1ZGRpc3QlMjB0ZW1wbGV8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  cathedrals:
    "https://images.unsplash.com/photo-1583353480659-f5c560296dcb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0aGVkcmFsfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  churches:
    "https://images.unsplash.com/photo-1530199897283-e17e6aedee15?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fGNodXJjaHxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  egyptian_temples:
    "https://images.unsplash.com/photo-1594489869852-19437c9c7720?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZWd5cHRpYW4lMjB0ZW1wbGV8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  hindu_temples:
    "https://images.unsplash.com/photo-1615196451843-54c40a46d1e9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aGluZHUlMjB0ZW1wbGV8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  monastries:
    "https://images.unsplash.com/photo-1591526653837-e2cab4841609?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9uYXN0cmllc3xlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  mosques:
    "https://images.unsplash.com/photo-1582790315910-c8a7a5f7540d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW9zcXVlfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  synagogues:
    "https://images.unsplash.com/photo-1617375387039-a9b8cd737033?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3luYWdvZ3VlfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  diving:
    "https://images.unsplash.com/photo-1574249292777-391006cfa6c6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGl2aW5nfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  climbing:
    "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cm9jayUyMGNsaW1iaW5nfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  kitesurfing:
    "https://images.unsplash.com/photo-1617040595396-28ca74b5f0e5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGtpdGVzdXJmaW5nfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  pools:
    "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cG9vbHxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  stadiums:
    "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3BvcnRzfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  surfing:
    "https://images.unsplash.com/photo-1593793580626-103afd2a19d3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fHN1cmZpbmd8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  winter_sports:
    "https://images.unsplash.com/photo-1586356415056-bd7a5c2bbef7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2tpaW5nfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  atm:
    "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFua3xlbnwwfDB8MHx8&auto=format&fit=crop&q=60",
  banks:
    "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFua3xlbnwwfDB8MHx8&auto=format&fit=crop&q=60",
  bars:
    "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmFyfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  cafes:
    "https://images.unsplash.com/photo-1542181961-9590d0c79dab?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2FmZXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  fast_food:
    "https://images.unsplash.com/photo-1505826759037-406b40feb4cd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzdCUyMGZvb2QlMjBzaG9wfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  food_court:
    "https://images.unsplash.com/photo-1504940892017-d23b9053d5d4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMGNvdXJ0fGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  picnic_site:
    "https://images.unsplash.com/photo-1594333170498-eee3f3b0e108?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGljbmljfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  pubs:
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHVifGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  restaurants:
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cmVzdGF1cmFudHxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  bakeries:
    "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFrZXJ5fGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  conveniences:
    "https://images.unsplash.com/photo-1580913428706-c311e67898b3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29udmVuaWVuY2UlMjBzdG9yZXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  fish_stores:
    "https://images.unsplash.com/photo-1587279733259-26c7d2c0dba5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZmlzaCUyMHN0b3JlfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  malls:
    "https://images.unsplash.com/photo-1578996450762-9ee2c66e5fa5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbGxzfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  marketplaces:
    "https://images.unsplash.com/photo-1609767768775-30f9e0319f97?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bWFya2V0cGxhY2V8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  supermarkets:
    "https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHN1cGVybWFya2V0fGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  bicycle_rental:
    "https://images.unsplash.com/photo-1472709171579-139831cdf19e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmljeWNsZSUyMHJlbnRhbHxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  boat_sharing:
    "https://images.unsplash.com/photo-1508272961731-dc692d634a79?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9hdHN8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  car_rental:
    "https://images.unsplash.com/photo-1585503418537-88331351ad99?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyJTIwcmVudGFsfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  car_sharing:
    "https://images.unsplash.com/photo-1573451441840-d7e8a4de0a66?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhciUyMHJlbnRhbHxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  car_wash:
    "https://images.unsplash.com/photo-1588947058132-0c509220695a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhciUyMHdhc2h8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
  charging_stations:
    "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhcmdpbmclMjBzdGF0aW9ufGVufDB8MHwwfHw%3D&auto=format&fit=crop&q=60",
  fuel:
    "https://images.unsplash.com/photo-1617886322009-e02db73a70ee?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYW5zcG9ydHxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=60",
};

export const hotelDetail = {
  name: "Sheraton Grand Chennai Resort & Spa",
  hotelId: "798096544",
  cityId: "675398",
  tagline: [
    "<b>4.5-star beachfront hotel with spa, near Madras Crocodile Bank Trust </b>",
  ],
  address: "280 ECR, Vedanamelli, Chengalpattu, Tamil Nadu, 603104, India",
  stars: 4.5,
  freebies: ["Free WiFi and free parking"],
  featuredPrice: "$105",
  avgGuestReviews: 9.2,
  atAGlance: {
    keyFacts: {
      hotelSize: ["This hotel has 125 rooms"],
      arrivingLeaving: [
        "Check-in time 3:00 PM-noon",
        "Check-out time is  noon",
        "Express check-in/out",
      ],
      specialCheckInInstructions: [
        "To make arrangements for check-in please contact the property at least 24 hours before arrival using the information on the booking confirmation. Guests planning to arrive outside of normal check-in hours must contact the property in advance for check-in instructions. Front desk staff will greet guests on arrival. ",
      ],
      requiredAtCheckIn: [
        "Credit card, debit card, or cash deposit required for incidental charges",
        "Government-issued photo ID may be required",
        "Minimum check-in age is 17",
      ],
    },
    travellingOrInternet: {
      travelling: {
        children: [
          "One child stays free when occupying the parent or guardian's room, using existing bedding",
          "<em>Free</em> babysitting/childcare",
          "Children's club*",
        ],
        pets: ["No pets or service animals allowed"],
        extraPeople: [],
      },
      internet: [
        "Free WiFi in public areas",
        "Free WiFi and wired Internet access in rooms",
      ],
    },
    transportAndOther: {
      transport: {
        transfers: [],
        parking: [
          "<em>Free</em> onsite self parking",
          "<em>Free</em> onsite valet parking",
          "Wheelchair-accessible parking and van parking on site",
        ],
        offsiteTransfer: [],
      },
      otherInformation: ["No alcohol allowed onsite"],
      otherInclusions: [],
    },
  },
  amenities: [
    {
      heading: "In the hotel",
      listItems: [
        {
          heading: "Taking the kids?",
          listItems: [
            "Children's club (surcharge)",
            "Supervised childcare/activities",
          ],
        },
        {
          heading: "Food and drink",
          listItems: [
            "Continental breakfast daily (surcharge)",
            "3 restaurants",
            "Bar/lounge",
            "Coffee shop/café",
            "Snack bar/deli",
            "24-hour room service",
            "Barbecue grills",
          ],
        },
        {
          heading: "Things to do",
          listItems: [
            "Free beach cabanas",
            "Beach sun loungers",
            "Free pool cabanas",
            "Pool sun loungers",
            "24-hour fitness facilities",
            "Full-service spa",
            "Spa treatment room(s)",
            "Fitness classes on site",
            "Playground on site",
            "Kayaking nearby",
            "Scuba diving nearby",
            "Snorkeling nearby",
            "Surfing/boogie boarding nearby",
            "Beach umbrellas",
            "Pool umbrellas",
            "Beach towels",
            "Arcade/game room",
            "Billiards or pool table",
          ],
        },
        {
          heading: "Working away",
          listItems: [
            "Business center",
            "Number of meeting rooms -  5",
            "Conference space",
            "Conference space size (feet) -  36618",
            "Conference space size (meters) -  3402",
          ],
        },
        {
          heading: "Services",
          listItems: [
            "24-hour front desk",
            "Concierge services",
            "Tours/ticket assistance",
            "Dry cleaning/laundry service",
            "Laundry facilities",
            "Hair salon",
            "Free newspapers in lobby",
            "Luggage storage",
            "Wedding services",
            "Multilingual staff",
          ],
        },
        {
          heading: "Facilities",
          listItems: [
            "Number of buildings/towers -  1",
            "Year Built -  2018",
            "Elevator",
            "ATM/banking",
            "Designated smoking areas",
            "Garden",
            "Picnic area",
            "Terrace",
            "Television in common areas",
          ],
        },
        {
          heading: "Accessibility",
          listItems: [
            "Braille or raised signage",
            "Accessible bathroom",
            "In-room accessibility",
            "Wheelchair accessible",
            "Wheelchair-accessible path of travel",
            "Wheelchair-accessible parking",
            "Wheelchair-accessible public restroom",
            "Wheelchair-accessible concierge desk",
            "Wheelchair-accessible van parking",
            "Valet for wheelchair-equipped vehicle",
            "Wheelchair-accessible path to lift",
            "Wheelchair-accessible registration desk",
            "Wheelchair-accessible spa",
            "Wheelchair-accessible fitness center",
            "Wheelchair-accessible meeting spaces/business center",
            "Wheelchair-accessible on-site restaurant",
            "Wheelchair-accessible lounge",
            "Visual alarms in hallways",
            "Handrails in stairways",
            "Wheelchairs available on site",
            "Braille signage",
            "Wheelchair-accessible bathroom vanity",
            "Grab bar - near toilet",
            "Grab bar - in shower",
            "Bathroom emergency pull cord",
          ],
        },
        {
          heading: "Languages Spoken",
          listItems: ["English", "Hindi"],
        },
      ],
    },
    {
      heading: "In the room",
      listItems: [
        {
          heading: "Home comforts",
          listItems: [
            "Air conditioning",
            "Ceiling fan",
            "Coffee/tea maker",
            "Slippers",
            "Iron/ironing board",
          ],
        },
        {
          heading: "Sleep well",
          listItems: [
            "Hypo-allergenic bedding available",
            "Soundproofed rooms",
            "Turndown service",
            "Sleep Number by Select Comfort mattress",
          ],
        },
        {
          heading: "Things to enjoy",
          listItems: ["Balcony"],
        },
        {
          heading: "Freshen up",
          listItems: [
            "Separate bathtub and shower",
            "Designer toiletries",
            "Hair dryer",
          ],
        },
        {
          heading: "Be entertained",
          listItems: ["49-inch flat-screen TV", "Premium TV channels"],
        },
        {
          heading: "Stay connected",
          listItems: ["Desk", "Free newspaper", "Free WiFi", "Phone"],
        },
        {
          heading: "Food and drink",
          listItems: ["Free bottled water"],
        },
        {
          heading: "More",
          listItems: [
            "Daily housekeeping",
            "In-room safe",
            "Connecting/adjoining rooms available",
          ],
        },
      ],
    },
  ],
  optionalExtras: [
    "<p><strong>Late check-out</strong> can be arranged for an extra charge (subject to availability, amount varies)</p>",
    "<p><strong>Spa access</strong> is available for an extra charge of INR 3000 per stay</p>",
    "<p><strong>Rollaway</strong> beds are available for INR 2000.0 per night</p>",
    "<p><strong>Continental breakfast</strong> is offered for an extra charge of INR 550 per person (approximately)</p>",
    "<p><strong>Children's club</strong> access is available for an extra charge</p>",
    "<p><strong>Laundry facilities</strong> are available for an extra charge of INR 1000 per day</p>",
  ],
  specialFeatures: {
    sections: [
      {
        heading: "Spa",
        freeText:
          "<strong>Shine Spa</strong> has 5 treatment rooms. Services include deep-tissue massages, hot stone massages, Swedish massages, and Thai massages. A variety of treatment therapies are provided, including aromatherapy, Ayurvedic, and reflexology. The spa is equipped with a mud bath and a steam room. <p>The spa is open daily. Guests under 10 years old are not allowed in the spa. </p>",
        listItems: [],
        subsections: [],
      },
      {
        heading: "Dining",
        freeText:
          "<strong>The Reef</strong> - This restaurant specializes in international cuisine and serves breakfast, brunch, lunch, and dinner. A children's menu is available. Open 24 hours. <br/>\n<p></p><strong>Pelican Deck</strong> - This restaurant overlooks the ocean and garden and specializes in barbecue. Guests can enjoy alfresco dining (weather permitting). Open select days. <br/>\n<p></p><strong>Pintail Lounge</strong> - Onsite bar. Open daily. <br/>\n<p></p><strong>C Salt - By the Bay</strong> - This restaurant serves dinner only. Open daily. ",
        listItems: [],
        subsections: [],
      },
    ],
  },
  photos: [
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/26f9aa7a_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/5a83f555_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/2f690859_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/129815ad_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/67ced5ee_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/58fc3747_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/fec88586_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/9b18feb0_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/84f6f6e0_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/57a1dfbd_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/d4f03cd0_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/d553ec8f_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/65dcf7c9_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/cd6f2839_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/d537fcb2_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/7705523a_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/2932d37d_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/2c36fff6_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/635e9123_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/33b94c94_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/0817883c_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/31e55e61_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/c6d746c7_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/ddcef368_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/81b0e3e4_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/50ed4c22_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/a4c973aa_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/06b18b82_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/1478a3d0_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/a69216d5_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/1a3438c1_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/c1685e50_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/8fc1bb6b_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/b26c24f1_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/67f1d3e4_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/9e8ddedb_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/625f79bf_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/28ccd66c_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/1025c26d_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/0ed39767_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/b040d016_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/182f28e7_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/6ee6fb6e_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/218b8e92_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/1d8110d1_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/4eeaf564_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/4c5645ed_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/fbae30a8_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/080f4e6d_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/e2c3bcf9_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/b0d9ecdf_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/7ace5413_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/dd2080a9_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/1bc10dd4_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/6cdb7b46_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/2648d5b7_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/10edd089_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/4058b05a_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/dc07f5bd_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/54126fa7_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/f941c3c0_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/3cc9b05d_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/38768e52_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/1ad59514_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/87ae44d7_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/511aa630_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/8192e078_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/ce42674a_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/97486f00_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/e5ef12a7_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/f50857ce_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/58a6ccf5_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/c9d8dd60_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/08f8512a_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/352d1354_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/80c69580_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/cb30e582_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/0c302ab6_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/16d811ff_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/7863b930_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/ee553941_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/6cca3e8f_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/d8bb097b_z.jpg",
    "https://exp.cdn-hotels.com/hotels/25000000/24910000/24909300/24909267/078b782b_z.jpg",
  ],
  reviews: {
    overallRating: 9.2,
    hotelService: 9.4,
    roomComfort: 9.8,
    hotelCondition: 9.6,
    cleanliness: 9.4,
    neighbourhood: 8.8,
    reviews: [
      {
        recommendedBy: "Samuel Vijay",
        rating: 10,
        formattedRating: "10.0",
        qualitativeBadgeText: "Exceptional",
        postedOn: "1618444800000",
        title: "If you want to be pampered...choose Sheraton Grand",
        summary:
          "If you want to be waited hand and foot and feel the need to pampered for few days, just do yourself a favor and book Sheraton Grand, you will not be disappointed. I would have to say that this is arguably the best hotel in Chennai at the moment and if you can spar few extra bucks upgrade to the sea view rooms to indulge in a get away that will leave you with fond memories. \n\nMy family thoroughly enjoyed their stay and can't wait to be back. The rooms are well appointed and the level of service is what makes Sheraton stand out compared to other peroperties......",
        reviewType: "hr",
      },
      {
        recommendedBy: "",
        rating: 10,
        formattedRating: "10.0",
        qualitativeBadgeText: "Exceptional",
        postedOn: "1612742400000",
        title: "",
        summary:
          "We were a big group with 7 Adults & 3 Children. It was a wonderful experience with Sheraton Grand Chennai Resort & Spa. Totally recommend this place for a relaxing vacation with Beach access & a clean swimming pool. Breakfast was great with lot of variety.",
        reviewType: "er",
      },
      {
        recommendedBy: "Sudarshan Paul",
        rating: 6,
        formattedRating: "6.0",
        qualitativeBadgeText: "Good",
        postedOn: "1546473600000",
        title: "Nice property, needs fixes and staff training",
        summary:
          "Large sea-shore property with sprawling grounds, convenient to Mahabalipuram monuments. Helpful staff. \r\nI am a Marriott Pt member who got upgraded and was given freebies, which I am thankful for. This is my first negative review about a Marriott property.\r\nFour reasons for disappointment : \r\n1. :Sunday brunch : After the lunch was mostly laid out, the food display area floor and an in-floor gutter were being cleaned, creating a foul stench and health risk! The chef was very nonchalant about it!\r\n2. The light switches in my suite took a PhD to learn to operate, an 'engineer' sent to help could turn off one light only by cutting the wire to it and asked me to sleep with the other light on. \r\n3. It is a pain to find the way to the Garden Level rooms. The one small elevator to service that floor has cleaning carts parked to it.\r\n4. New Year Eve dinner buffet was late by 1.5 hours, the New Years Day buffet by on hour.",
        reviewType: "hr",
      },
      {
        recommendedBy: "Girishwar",
        rating: 6,
        formattedRating: "6.0",
        qualitativeBadgeText: "Good",
        postedOn: "1546041600000",
        title: "",
        summary:
          "Food was good . new property so everything is nice and clear . Check out  was  slow , checkin was even slower . Luggage handling was terrible. Had to wait nearly an hour to get luggage in the room . While checking out nobody came to pick the luggage up and after repeating requests twice , we decided to carry the luggage ourselves. Two front office ladies , came running to help . There is a intent to do a good job but then there is a proces and communication issue .",
        reviewType: "er",
      },
    ],
  },
};
