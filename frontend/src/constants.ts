// ---------------------------------------------------
// Changelogs Page
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
// Error Page
// ---------------------------------------------------
export const ERROR_PAGE_MESSAGE: { main: string; additional: string } = {
    main: "Page not found",
    additional: "The page you're looking for doesn't exist or has been moved."
};