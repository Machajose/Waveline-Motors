// Vehicles grouped by brand slug, each with a "discover more" story block.
// This is placeholder content — once the admin dashboard exists, this will
// come from the `vehicles` table joined to `manufacturers` in Supabase.

export const brandVehicles = {
  toyota: [
    {
      id: "t1",
      slug: "toyota-land-cruiser-300",
      name: "Land Cruiser 300 Series",
      year: "2021–present",
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&q=80",
      tagline: "The nameplate that redefined go-anywhere reliability.",
      story:
        "The 300 Series marks the biggest overhaul in Land Cruiser history — shedding roughly 200kg versus its predecessor while gaining a new twin-turbo diesel V6. It keeps the body-on-frame toughness the nameplate is known for across Kenya's rural and highland routes, while adding modern safety tech and a more refined cabin. For a vehicle that's been in continuous production since 1951, this generation is arguably the most dramatic reinvention yet.",
    },
    {
      id: "t2",
      slug: "toyota-hilux-8th-gen",
      name: "Hilux (8th Generation)",
      year: "2020–present",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&q=80",
      tagline: "The pickup that built a reputation for indestructibility.",
      story:
        "Few vehicles have earned the kind of folklore surrounding the Hilux — famously driven up an active volcano and left running underwater by a UK TV show. The 8th generation keeps that DNA: a ladder-frame chassis, a torque-rich diesel engine, and a cabin that's finally caught up to modern expectations. In Kenya it remains a workhorse for both commercial fleets and personal use.",
    },
    {
      id: "t3",
      slug: "toyota-corolla-12th-gen",
      name: "Corolla (12th Generation)",
      year: "2018–present",
      image: "https://images.unsplash.com/photo-1550355191-aa8a80b41353?w=900&q=80",
      tagline: "The best-selling nameplate in automotive history.",
      story:
        "With well over 50 million units sold worldwide since 1966, the Corolla is the best-selling car nameplate ever made. The current generation moved onto Toyota's TNGA platform, bringing sharper handling and a hybrid option to a car that has always prioritized dependability and low running costs — qualities that keep it a fixture on Kenyan roads.",
    },
    {
      id: "t4",
      slug: "toyota-rav4-5th-gen",
      name: "RAV4 (5th Generation)",
      year: "2018–present",
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=900&q=80",
      tagline: "The crossover that created its own segment.",
      story:
        "Launched in 1994, the RAV4 is widely credited with inventing the compact crossover SUV segment as we know it. The current generation leans into a more rugged, squared-off design language and offers a hybrid powertrain — a configuration that's growing in popularity across East African markets as fuel costs rise.",
    },
  ],
}

export const brandStorySections = {
  toyota: {
    heading: "Why Toyota Dominates East Africa's Roads",
    body:
      "Toyota's reputation in Kenya wasn't built on marketing — it was built on decades of vehicles that keep running long after warranties expire. From the Hilux fleets that service rural supply chains to the Land Cruisers trusted by NGOs and safari operators, the brand's engineering philosophy of over-built reliability translates directly into lower long-term ownership costs, a decisive factor in a market where parts availability and resale value matter as much as the initial price tag.",
  },
}
