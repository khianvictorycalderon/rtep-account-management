// ---------------------------------------------------
// API URL
// ---------------------------------------------------
const ENV = import.meta.env;
export const BUILT_IN_API_URLS = {
    login: `${ENV.VITE_API_URL}/api/login`,                                                                // POST
    logout: `${ENV.VITE_API_URL}/api/logout`,                                                              // DELETE
    register: `${ENV.VITE_API_URL}/api/register`,                                                          // POST
    getUserData: `${ENV.VITE_API_URL}/api/users/me`,                                                       // GET
    updateUserData: `${ENV.VITE_API_URL}/api/users`, // extend with /<id>                                  // PATCH
    updatePassword: `${ENV.VITE_API_URL}/api/users/password`,                                              // PATCH
    deleteUser: `${ENV.VITE_API_URL}/api/users`,  // extend with /<id>                                     // DELETE
    verify: `${ENV.VITE_API_URL}/api/verify`,  // used to verify if user currently logged in or not        // GET
    sesssions: `${ENV.VITE_API_URL}/api/sessions`                                                          // GET, DELETE only
} as const;
export const PRIVATE_ROUTE_FIRST_PATH = "/dashboard";

// ---------------------------------------------------
// Sidebar Buttons
// ---------------------------------------------------
export type SidebarButton = {
  label: string;
  path: string;
  icon: string;
};

export const SIDEBAR_BUTTONS: SidebarButton[] = [
    {
        label: "Dashboard",
        path: "/dashboard",
        icon: `
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-width="2" d="M3 13h8V3H3v10zm10 8h8V11h-8v10zm0-18v6h8V3h-8zM3 21h8v-6H3v6z" />
            </svg>
        `,
    },
    {
        label: "Account",
        path: "/account",
        icon: `
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-width="2" d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z" />
            </svg>
        `,
    },
];

export const TOPNAV_HEADER = "RTEP Full-Stack System Template";

// ---------------------------------------------------
// Navbar Buttons
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

export const NAVBAR_HEADER = "My App Account Management";

// ---------------------------------------------------
// Register Page
// ---------------------------------------------------
import type { HTMLInputTypeAttribute } from "react";

export interface RegisterFieldsProps {
    label: string;
    id: string;
    type: HTMLInputTypeAttribute;

    // optional validation
    pattern?: string; // regex string
    required?: boolean;
    minLength?: number;
    maxLength?: number;

    placeholder?: string;
}

export const REGISTER_FIELDS: RegisterFieldsProps[] = [
    {
        label: "First Name",
        id: "first_name",
        type: "text",
        required: true,
        minLength: 2,
        maxLength: 30,
        placeholder: "John",
    },
    {
        label: "Middle Name",
        id: "middle_name",
        type: "text",
        required: false,
        minLength: 2,
        maxLength: 30,
        placeholder: "Michael",
    },
    {
        label: "Last Name",
        id: "last_name",
        type: "text",
        required: true,
        minLength: 2,
        maxLength: 30,
        placeholder: "Doe",
    },
    {
        label: "Birth Date",
        id: "birth_date",
        type: "date",
        required: true,
    },
    {
        label: "Email",
        id: "email",
        type: "email",
        required: true,
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        placeholder: "you@example.com",
    },
    {
        label: "Password",
        id: "password",
        type: "password",
        required: true,
        minLength: 8,
        placeholder: "••••••••",
    },
    {
        label: "Confirm Password",
        id: "confirm_password",
        type: "password",
        required: true,
        minLength: 8,
        placeholder: "••••••••",
    },
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