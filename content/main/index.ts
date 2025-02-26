import {
  NavItem,
  GridItem,
  Project,
  Testimonial,
  Company,
  WorkExperience,
  SocialMedia,
  // Additional Types
  GradeInfo,
  UserDashboard,
} from "@/types/content";

import {
  // Card 1
  TicketCheck,
  Truck,
  BookOpenCheck,
  // Card 2
  ArrowLeftRight,
  FlaskRound,
  ClipboardPenLine,
  // Card 3
  LayoutList,
  Info,
  Download,
  // Card 4
  Rows3,
  Boxes,
  OctagonAlert,
} from "lucide-react";

// UK Manufacturer of Ultra High Purity Solvents and Reagents
// Free of Interfering Impurities

export const navItems: NavItem[] = [
  // {
  //   name: "Workflows",
  //   links: [
  //     {
  //       name: "Workflows",
  //       link: "#workflows",
  //     },
  //   ],
  // },
  {
    name: "Goods Inwards",
    links: [
      {
        id: 1,
        name: "Drum Inventory",
        link: "/inventory",
      },
      {
        id: 2,
        name: "New Order Form",
        // link: "/inventory/orders?form=new", // TODO: change route to this for the form page, replace the separate sub-page for this routing method
        link: "/inventory/orders/create",
      },
      {
        id: 3,
        name: "Purchase Order History",
        link: "/inventory/orders",
      },
      {
        id: 4,
        name: "Barcode Scan Log",
        link: "/inventory/transactions",
      },
    ],
  },
  {
    name: "Production",
    links: [
      {
        id: 1,
        name: "Weekly Schedule",
        link: "/production/schedule?form=new",
      },
      {
        id: 2,
        name: "Active Production",
        link: "/production/active",
      },
      {
        id: 3,
        name: "View Records",
        link: "/production/records",
      },
    ],
  },
  {
    name: "Products",
    links: [
      {
        id: 1,
        name: "Product Range",
        link: "/products",
      },
      {
        id: 2,
        name: "Price List",
        link: "/products?expanded=true",
      },
      {
        id: 3,
        name: "SDS Information",
        link: "/products/docs",
      },
      {
        id: 4,
        name: "Raw Materials",
        link: "/raw-materials",
      },
      {
        id: 5,
        name: "Dangerous Goods",
        link: "/raw-materials/dgn",
      },
    ],
  },
  // {
  //   name: "Inventory",
  //   links: [
  //     {
  //       id: 1,
  //       name: "New Drums",
  //       link: "/inventory",
  //     },
  //     {
  //       id: 2,
  //       name: "Reprocessing Drums",
  //       link: "/inventory/reprocessing",
  //     },
  //     {
  //       id: 3,
  //       name: "Finished Goods",
  //       link: "/inventory/warehouse",
  //     },
  //   ],
  // },
];

/*
 {
    id: 1,
    title: "Raw Materials",
    description:
      "Assisted in the development of a web-based platform using React.js, enhancing interactivity.",
    className: "md:col-span-2",
    thumbnail: "/expr-1.svg",
  },
*/

export const userDashboard: UserDashboard[] = [
  {
    id: 1,
    title: "Goods Inwards",
    content: [
      {
        id: 1,
        description: "Record New Order",
        link: "/inventory/orders?form=new",
        icon: TicketCheck,
      },
      {
        id: 2,
        description: "Active Orders & Deliveries",
        link: "/inventory/orders",
        icon: Truck,
      },
      {
        id: 3,
        description: "Inventory Overview",
        link: "/inventory",
        icon: BookOpenCheck,
      },
    ],
    // link: "/inventory",
    // colors: [[24, 89, 124]],
    thumbnail: "/expr-1.svg",
    colors: [[236, 226, 208]],
    bgColor: "bg-slate-400",
    animationSpeed: 3,
    dotSize: 2,
  },
  {
    id: 2,
    title: "Inventory & Production",
    content: [
      {
        id: 1,
        description: "Transactions",
        link: "/inventory/transactions",
        icon: ArrowLeftRight,
      },
      {
        id: 2,
        description: "Distillations",
        link: "/production/distillations",
        icon: FlaskRound,
      },
      {
        id: 3,
        description: "QRD Form",
        link: "/production/qrd-form",
        icon: ClipboardPenLine,
      },
    ],
    // link: "/inventory/transactions",
    // colors: [[218, 133, 113]],
    // bgColor: "bg-blue-[#DA8571]",
    thumbnail: "/expr-2.svg",
    colors: [[102, 238, 213]],
    bgColor: "bg-slate-500",
    animationSpeed: 3,
    dotSize: 2,
  },
  {
    id: 3,
    title: "Product Range",
    content: [
      {
        id: 1,
        description: "Overview",
        link: "/products",
        icon: LayoutList,
      },
      {
        id: 2,
        description: "Detailed Info",
        link: "/products?expanded=true",
        icon: Info,
      },
      {
        id: 3,
        description: "Sheets for Download",
        link: "/products?expanded=true",
        icon: Download,
      },
    ],
    thumbnail: "/exp3.svg",
    colors: [[81, 136, 184]],
    bgColor: "bg-slate-500",
    animationSpeed: 3,
    dotSize: 2,
  },
  {
    id: 4,
    title: "Raw Materials",
    content: [
      {
        id: 1,
        description: "Overview",
        link: "/raw-materials",
        icon: Rows3,
      },
      {
        id: 2,
        description: "Dangerous Goods",
        link: "/raw-materials/dgn",
        icon: OctagonAlert,
      },
      {
        id: 3,
        description: "Drum Inventory",
        link: "/inventory",
        icon: Boxes,
      },
    ],
    thumbnail: "/exp4.svg",
    colors: [[255, 86, 102]],
    bgColor: "bg-slate-500",
    animationSpeed: 3,
    dotSize: 2,
  },
];

export const gradeInfo: GradeInfo[] = [
  {
    id: 1,
    title: "Glass Distilled",
    acronym: "GD",
    description:
      "Glass Distilled solvents are purified through a distillation process using glass apparatus to avoid contamination from metal ions. This grade ensures high purity and is suitable for sensitive analytical applications.",
    img: "/products/gd.png",
    // colors: [[47, 79, 79]],
    colors: [[0, 0, 255]],
    bgColor: "bg-emerald-600",
    animationSpeed: 5.0,
    dotSize: 2,
  },
  {
    id: 2,
    title: "High Performance Liquid Chromatography",
    acronym: "HPLC",
    description:
      "HPLC-grade solvents are highly purified to remove impurities that could interfere with the chromatographic process. These solvents are essential for achieving accurate, reproducible, and reliable results in HPLC analyses. They have low UV-absorbing impurities and minimal moisture content.",
    img: "/products/hplc.png",
    colors: [[70, 130, 180]],
    bgColor: "bg-emerald-900",
    animationSpeed: 3.5,
    dotSize: 3,
  },
  {
    id: 3,
    title: "Liquid Chromatography Mass Spectroscopy",
    acronym: "LCMS",
    description:
      "LCMS-grade solvents are designed for use in liquid chromatography-mass spectrometry applications. They offer high purity with low levels of UV-absorbing impurities and minimal background ion suppression, ensuring optimal performance and sensitivity in mass spectrometric analyses.",
    img: "/products/lcms.png",
    colors: [[72, 61, 139]],
    bgColor: "bg-pink-300",
    animationSpeed: 1.5,
    dotSize: 2,
  },
  {
    id: 4,
    title: "PTS Distilled",
    acronym: "PTS-DS",
    description:
      "PTS Distilled solvents are specifically purified for use in peptide synthesis and other biochemical applications. These solvents are distilled to meet the stringent purity requirements necessary for processes like DNA synthesis, peptide synthesis, and molecular sieve peptide synthesis.",
    img: "/products/pts.png",
    animationSpeed: 3,
  },
];

export const gridItems: GridItem[] = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building a JS Animation library",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "3D Solar System Planets to Explore",
    description:
      "Explore the wonders of our solar system with this captivating 3D simulation of the planets using Three.js.",
    img: "/p1.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
    link: "/ui.earth.com",
  },
  {
    id: 2,
    title: "Yoom - Video Conferencing App",
    description:
      "Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.",
    img: "/p2.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
    link: "/ui.yoom.com",
  },
  {
    id: 3,
    title: "AI Image SaaS - Canva Application",
    description:
      "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
    img: "/p3.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
    link: "/ui.aiimg.com",
  },
  {
    id: 4,
    title: "Animated Apple Iphone 3D Website",
    description:
      "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
    img: "/p4.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
    link: "/ui.apple.com",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
  {
    quote:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    name: "Michael Johnson",
    title: "Director of AlphaStream Technologies",
  },
];

export const companies: Company[] = [
  {
    id: 1,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const workExperience: WorkExperience[] = [
  {
    id: 1,
    title: "Goods Inwards",
    description:
      "Track and manage incoming raw materials, including details like batch numbers, quantities, and supplier information. Monitor quality control checks and documentation for imported goods.",
    className: "md:col-span-2",
    thumbnail: "/expr-1.svg",
    content: [
      {
        id: 1,
        description: "Record New Order",
        link: "/inventory/orders/create",
        icon: TicketCheck,
      },
      {
        id: 2,
        description: "Active Orders & Deliveries",
        link: "/inventory/orders",
        icon: Truck,
      },
      {
        id: 3,
        description: "Inventory Overview",
        link: "/inventory",
        icon: BookOpenCheck,
      },
    ],
  },
  {
    id: 2,
    title: "Operational Management",
    description:
      "Monitor and manage the day-to-day operations of the warehouse, including inventory management, order fulfillment, and logistics.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/expr-2.svg",
    content: [
      {
        id: 1,
        description: "Transactions",
        link: "/inventory/transactions",
        icon: ArrowLeftRight,
      },
      {
        id: 2,
        description: "Distillations",
        link: "/production/distillations",
        icon: FlaskRound,
      },
      {
        id: 3,
        description: "QRD Form",
        link: "/production/qrd-form",
        icon: ClipboardPenLine,
      },
    ],
  },
  {
    id: 3,
    title: "Product Range",
    description:
      "Access our comprehensive product catalog with detailed specifications, stock levels, and historical performance data. View technical documentation and download product specification sheets.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp3.svg",
    content: [
      {
        id: 1,
        description: "Overview",
        link: "/products",
        icon: LayoutList,
      },
      {
        id: 2,
        description: "Detailed Info",
        link: "/products?expanded=true",
        icon: Info,
      },
      {
        id: 3,
        description: "Sheets for Download",
        link: "/products?expanded=true",
        icon: Download,
      },
    ],
  },
  {
    id: 4,
    title: "Raw Materials",
    description:
      "Monitor and manage raw material inventory with real-time stock levels, safety information, and usage analytics. Track dangerous goods documentation and drum inventory status.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
    content: [
      {
        id: 1,
        description: "Overview",
        link: "/raw-materials",
        icon: Rows3,
      },
      {
        id: 2,
        description: "Dangerous Goods",
        link: "/raw-materials/dgn",
        icon: OctagonAlert,
      },
      {
        id: 3,
        description: "Drum Inventory",
        link: "/inventory",
        icon: Boxes,
      },
    ],
  },
  // {
  //   id: 5,
  //   title: "Warehouse Batches",
  //   description:
  //     "Led the dev of a mobile app for a client, from initial concept to deployment on app stores.",
  //   className: "md:col-span-2", // change to md:col-span-2
  //   thumbnail: "/exp3.svg",
  // },
  // {
  //   id: 6,
  //   title: "Goods for Export",
  //   description:
  //     "Developed and maintained user-facing features using modern frontend technologies.",
  //   className: "md:col-span-2",
  //   thumbnail: "/exp4.svg",
  // },
];

export const socialMedia: SocialMedia[] = [
  {
    id: 1,
    img: "/git.svg",
  },
  {
    id: 2,
    img: "/twit.svg",
  },
  {
    id: 3,
    img: "/link.svg",
  },
];
