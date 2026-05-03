// ---------------------------------------------------
// Navbar
// ---------------------------------------------------
export const NAVBAR_BUTTONS: { label: string; path: string }[] = [
    {
        label: "Home",
        path: "/"
    },
    {
        label: "About",
        path: "/about"
    },
    {
        label: "Changelogs",
        path: "/changelogs"
    }
];

// ---------------------------------------------------
// Footer
// ---------------------------------------------------
export const FOOTER_BUTTONS: Record<
  string,
  { label: string; href: string }[]
> = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Documentation", href: "/docs" },
    { label: "Updates", href: "/changelogs" },
  ],

  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],

  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Help Center", href: "/help" },
    { label: "Community", href: "/community" },
  ],

  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

// ---------------------------------------------------
// About Page
// ---------------------------------------------------
export const ABOUT_DESCRIPTION: string = "A simple overview of this application";
export const ABOUT: { title: string; desc: string }[] = [
    {
        title: "What is this?",
        desc: "This is <strong>blah blah blah</strong> with <em>HTML support</em>.",
    },
    {
        title: "How did it come to this?",
        desc: "It went through like this <br/> blah blah <u>blah</u>",
    },
];

// ---------------------------------------------------
// Changelogs Page
// ---------------------------------------------------
export const CHANGELOGS: { release: string; changes: string[] }[] = [
    {
        release: "1.0.1",
        changes: [
            "Added feature X",
            "Added feature Y"
        ]
    },
    {
        release: "1.0.0",
        changes: [
            "Initial Release", 
            "Built with blah blah blah"
        ]
    },
  ];

// ---------------------------------------------------
// Terms and Conditions
// ---------------------------------------------------
export const TERMS_LAST_UPDATED_DATE: string = "May 3, 2026 @ 8:00 PM";
export const TERMS_CONDITIONS: { title: string; desc: string }[] = [
    {
        title: "Usage",
        desc: "Blah blah blah"
    },
    {
        title: "Legal Framework",
        desc: "Blah blah blah"
    }
];

// ---------------------------------------------------
// Privacy Policy
// ---------------------------------------------------
export const PRIVACY_LAST_UPDATED_DATE: string = "May 3, 2026 @ 8:00 PM";
export const PRIVACY_POLICY: { title: string; desc: string }[] = [
    {
      title: "Data",
      desc: "Blah blah blah"
    },
    {
      title: "Third Party",
      desc: "Blah blah blah"
    }
];

// ---------------------------------------------------
// Error Page
// ---------------------------------------------------
export const ERROR_PAGE_MESSAGE: { main: string; additional: string } = {
    main: "Page not found",
    additional: "The page you're looking for doesn't exist or has been moved."
};