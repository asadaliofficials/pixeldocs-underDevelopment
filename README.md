# PixelDocs

PixelDocs is a full-stack Google Docs clone built with **Next.js 15**, **Liveblocks**, and **Convex**. It features a powerful real-time rich-text editor, collaborative tools, and a premium modern UI, designed to provide a seamless document editing experience.

![Project Preview](Screenshot.png)

## Key Features

- **📝 Rich Text Editor**: Advanced editor powered by **TipTap** with custom extensions for a superior writing experience.

- **🤝 Real-time Collaboration**: Edit documents simultaneously with others, see cursor movements, and presence in real-time.

- **💭 Comments & Threads**: Add comments to specific text and resolve threads to keep communication organized.

- **📊 Table Support**: Insert and manage tables with intuitive controls.

- **🔔 Notifications System**: Stay updated with real-time notifications for mentions and document activities.

- **📑 Document Templates**: Jumpstart your work with pre-built templates for various use cases.

- **📋 Copy & Paste Formatting**: Seamlessly copy content from other sources while retaining original formatting.

- **↩️ Undo/Redo History**: Robust history management to easily revert changes.

- **🖼️ Image Uploads**: Drag and drop or upload images directly into your documents.

- **📏 Margin Controls**: Customize page layout and margins to fit your printing needs.

- **⬇️ Export Options**: Export documents to **PDF**, **HTML**, **TXT**, or **JSON** formats.

- **👥 User Profiles**: Personalized user profiles with avatars and color customization.

- **🏢 Organization Workspaces**: Create and manage organizations for team collaboration.

- **✉️ Organization Invites**: Invite members to your organization via email.

- **🔒 Secure Authentication**: Protected by **Clerk** authentication for secure access.

- **📱 Responsive Design**: Fully responsive interface that works beautifully on all devices.

- **🎯 Cursor Tracking**: See exactly where other users are working in the document.

- **🎨 Text Formatting**: Comprehensive formatting tools (Bold, Italic, Underline, Strike, Highlight, Fonts, etc.).

- **📝 Lists & Checklists**: Organize thoughts with bullet points, numbered lists, and interactive checklists.

- **🔗 Link Embedding**: Easily embed and manage hyperlinks.

## Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Real-time Engine**: [Liveblocks](https://liveblocks.io/)
- **Database**: [Convex](https://www.convex.dev/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Editor**: [TipTap](https://tiptap.dev/)

## Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Node.js & npm installed
- Accounts for [Convex](https://www.convex.dev/), [Clerk](https://clerk.com/), and [Liveblocks](https://liveblocks.io/)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/asadaliofficials/pixeldocs.git
cd pixeldocs
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Environment Variables**

Create a `.env.local` file in the root directory and add your API keys:

```env
# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Liveblocks
LIVEBLOCKS_SECRET_KEY=
```

4. **Run the Development Server**

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

5. **Run Convex**

In a separate terminal, run the backend sync:

```bash
npx convex dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
