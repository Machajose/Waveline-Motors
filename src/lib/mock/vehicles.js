export const vehicles = [
  {
    id: "1", slug: "toyota-land-cruiser-300-2024",
    make: "Toyota", model: "Land Cruiser", generation: "300 Series",
    year: 2024, bodyType: "SUV", fuel: "Diesel", transmission: "Automatic",
    price: "KSh 18,500,000", image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    horsepower: "309 hp", country: "Kenya", condition: "New",
  },
  {
    id: "2", slug: "range-rover-sport-2023",
    make: "Land Rover", model: "Range Rover Sport", generation: "L461",
    year: 2023, bodyType: "SUV", fuel: "Petrol", transmission: "Automatic",
    price: "KSh 22,000,000", image: "https://images.unsplash.com/photo-1550355191-aa8a80b41353?w=800&q=80",
    horsepower: "395 hp", country: "Kenya", condition: "Used",
  },
  {
    id: "3", slug: "mercedes-benz-g63-2022",
    make: "Mercedes-Benz", model: "G-Class", generation: "W463",
    year: 2022, bodyType: "SUV", fuel: "Petrol", transmission: "Automatic",
    price: "KSh 28,900,000", image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=800&q=80",
    horsepower: "577 hp", country: "Kenya", condition: "Used",
  },
  {
    id: "4", slug: "toyota-hilux-2024",
    make: "Toyota", model: "Hilux", generation: "8th Gen",
    year: 2024, bodyType: "Pickup", fuel: "Diesel", transmission: "Manual",
    price: "KSh 6,200,000", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    horsepower: "204 hp", country: "Kenya", condition: "New",
  },
]

export const carOfTheDay = {
  ...vehicles[0],
  description: "The 300 Series marks the biggest overhaul in Land Cruiser history, shedding weight while gaining capability.",
  fact: "The Land Cruiser nameplate has been in continuous production since 1951 — longer than almost any SUV alive.",
}
