import p1_img from "./oil_seal_and_rubber_parts1.png";
import p2_img from "./oil seal and rubber parts2.png";
import p3_img from "./oil seal and rubber parts3.png";
import p4_img from "./oil seal and rubber parts4.png";
import p5_img from "./gear_part_1.png";
import p6_img from "./rubber_ring1.webp";
import p7_img from "./gear_part_2.png";
import p8_img from "./Hydraulic Pump.jpeg";

const all_products = [
  {
    id: 1,
    name: "Premium Oil Seals & Rubber Rings",
    desc: "High-quality oil seals and rubber rings for Mahindra tractor models.",
    brand: "Mahindra",
    category: "Oil Seals",
    badge: "Bestseller",
    image: p1_img,
    new_price: 50,
    old_price: 80,

    sku: "ME-OS-001",
    material: "Nitrile Rubber (NBR)",
    weight: "250 gm",
    warranty: "12 Months",

    features: [
      "Leak Proof Design",
      "Heat Resistant",
      "Long Service Life",
      "OEM Quality",
      "High Pressure Resistant",
    ],

    applications: [
      "Mahindra Tractor",
      "Hydraulic System",
      "Engine Assembly",
      "Transmission",
    ],
  },

  {
    id: 2,
    name: "Premium Oil Seals & Rubber Rings",
    desc: "Industrial grade rubber O-rings for John Deere tractors.",
    brand: "John Deere",
    category: "Oil Seals",
    badge: "Bestseller",
    image: p2_img,
    new_price: 85,
    old_price: 120,

    sku: "JD-OS-002",
    material: "Nitrile Rubber",
    weight: "300 gm",
    warranty: "12 Months",

    features: [
      "High Durability",
      "Oil Resistant",
      "Leak Proof",
      "OEM Finish",
      "Long Life",
    ],

    applications: [
      "John Deere Tractor",
      "Engine",
      "Gear Box",
      "Hydraulic Pump",
    ],
  },

  {
    id: 3,
    name: "Crankshaft Oil Seal",
    desc: "Durable oil seal for Sonalika tractor models.",
    brand: "Sonalika",
    category: "Oil Seals",
    badge: "Bestseller",
    image: p3_img,
    new_price: 60,
    old_price: 100,

    sku: "SO-OS-003",
    material: "NBR Rubber",
    weight: "220 gm",
    warranty: "12 Months",

    features: [
      "Heat Resistant",
      "Leak Proof",
      "High Strength",
      "Long Life",
      "OEM Standard",
    ],

    applications: [
      "Sonalika Tractor",
      "Crankshaft",
      "Engine",
      "Transmission",
    ],
  },

  {
    id: 4,
    name: "Engine Rubber Gasket",
    desc: "Multi-purpose rubber gasket for New Holland tractors.",
    brand: "New Holland",
    category: "Rubber Parts",
    badge: "Bestseller",
    image: p4_img,
    new_price: 100,
    old_price: 150,

    sku: "NH-RP-004",
    material: "Synthetic Rubber",
    weight: "350 gm",
    warranty: "12 Months",

    features: [
      "Flexible",
      "Heat Resistant",
      "OEM Quality",
      "Long Lasting",
      "Easy Installation",
    ],

    applications: [
      "New Holland Tractor",
      "Engine",
      "Cylinder Head",
      "Hydraulic Unit",
    ],
  },

  {
    id: 5,
    name: "Premium Gear Parts",
    desc: "Heavy-duty precision gear parts for Swaraj tractors.",
    brand: "Swaraj",
    category: "Gear Parts",
    badge: "Bestseller",
    image: p5_img,
    new_price: 45,
    old_price: 70,

    sku: "SW-GP-005",
    material: "Alloy Steel",
    weight: "700 gm",
    warranty: "18 Months",

    features: [
      "Precision Cut",
      "Rust Resistant",
      "Heavy Duty",
      "Long Service Life",
      "OEM Quality",
    ],

    applications: [
      "Swaraj Tractor",
      "Gear Box",
      "Transmission",
      "Rear Axle",
    ],
  },

  {
    id: 6,
    name: "Rubber Gasket Set",
    desc: "Multi-purpose rubber gaskets for tractor engines.",
    brand: "Mahindra",
    category: "Rubber Parts",
    badge: "Popular",
    image: p6_img,
    new_price: 30,
    old_price: 50,

    sku: "ME-RP-006",
    material: "Rubber",
    weight: "180 gm",
    warranty: "6 Months",

    features: [
      "Flexible",
      "Oil Resistant",
      "Leak Proof",
      "Easy Fit",
      "OEM Finish",
    ],

    applications: [
      "Mahindra Tractor",
      "Engine",
      "Cylinder Head",
      "Hydraulic Unit",
    ],
  },

  {
    id: 7,
    name: "Differential Gear Pair",
    desc: "Precision-cut differential gears for tractor rear axle.",
    brand: "John Deere",
    category: "Gears",
    badge: "Popular",
    image: p7_img,
    new_price: 110,
    old_price: 160,

    sku: "JD-GR-007",
    material: "Forged Steel",
    weight: "1.5 Kg",
    warranty: "18 Months",

    features: [
      "Heavy Duty",
      "Precision Teeth",
      "Rust Resistant",
      "Long Lasting",
      "OEM Standard",
    ],

    applications: [
      "John Deere Tractor",
      "Rear Axle",
      "Gear Box",
      "Differential",
    ],
  },

  {
    id: 8,
    name: "Hydraulic Pump",
    desc: "Heavy duty hydraulic pump.",
    brand: "Mahindra",
    category: "Hydraulic",
    badge: "New",
    image: p8_img,
    new_price: 150,
    old_price: 220,

    sku: "ME-HP-008",
    material: "Cast Iron",
    weight: "3 Kg",
    warranty: "24 Months",

    features: [
      "High Pressure",
      "Leak Proof",
      "Long Life",
      "OEM Quality",
      "Heavy Duty",
    ],

    applications: [
      "Mahindra Tractor",
      "Hydraulic Lift",
      "Power Steering",
      "Hydraulic System",
    ],
  },
];

export default all_products;