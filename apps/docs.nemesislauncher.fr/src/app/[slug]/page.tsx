import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Rocket,
  Shield,
  Settings,
  Code,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Home,
} from "lucide-react";
import { 
  DOCS_SECTIONS, 
  getDocContent, 
  getAllDocSlugs,
  getNextPrevDocs 
} from "@/lib/docs-content";

// Generate static params for all doc pages
export function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({
    slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDocContent(slug);
  
  if (!doc) {
    return { title: "Page non trouvée" };
  }

  return {
    title: `${doc.title} - Documentation Némésis Launcher`,
    description: doc.description,
  };
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  BookOpen,
  Settings,
  Shield,
  Code,
  HelpCircle,
};

function formatMarkdown(content: string): string {
  return content
    .replace(/^### (.*$)/gm, '<h3 id="$1">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 id="$1">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    .replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
    .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-nemesis-400 hover:text-nemesis-300 underline">$1</a>')
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.every(c => c.trim().match(/^-+$/))) {
        return '';
      }
      const row = cells.map(c => `<td class="border border-dark-700 px-4 py-2">${c.trim()}</td>`).join('');
      return `<tr>${row}</tr>`;
    })
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}

function extractHeadings(content: string): { level: number; text: string; slug: string }[] {
  const headings: { level: number; text: string; slug: string }[] = [];
  const regex = /^(#{2,3}) (.*)$/gm;
  let match;

  while ((match = regex.exec(content)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2],
      slug: match[2].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    });
  }

  return headings;
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDocContent(slug);

  if (!doc) {
    notFound();
  }

  const { prev, next } = getNextPrevDocs(slug);
  const prevDoc = prev ? getDocContent(prev) : null;
  const nextDoc = next ? getDocContent(next) : null;
  const headings = extractHeadings(doc.content);

  return (
    <div className="min-h-screen flex flex-col bg-dark-950">
      {/* Header */}
      <header className="border-b border-dark-700 bg-dark-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo.jpg"
                  alt="Némésis Launcher"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <div>
                  <h1 className="text-xl font-bold text-white">Documentation</h1>
                  <p className="text-sm text-dark-400">Némésis Launcher</p>
                </div>
              </Link>
            </div>

            <nav className="flex items-center gap-4">
              <a href="https://nemesislauncher.fr" className="text-dark-400 hover:text-white transition">
                Site web
              </a>
              <a href="https://cdn.nemesislauncher.fr" className="text-dark-400 hover:text-white transition">
                Télécharger
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-72 bg-dark-900 border-r border-dark-700 overflow-y-auto sticky top-16 h-[calc(100vh-4rem)] hidden lg:block">
          <nav className="p-4 space-y-6">
            <Link 
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-dark-400 hover:text-white transition rounded-lg hover:bg-dark-800"
            >
              <Home className="w-4 h-4" />
              Accueil docs
            </Link>

            {DOCS_SECTIONS.map((section) => {
              const Icon = ICON_MAP[section.icon] || BookOpen;
              return (
                <div key={section.title}>
                  <div className="flex items-center gap-2 px-4 py-2 text-dark-500 text-sm font-semibold uppercase tracking-wider">
                    <Icon className="w-4 h-4" />
                    {section.title}
                  </div>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                          slug === item.slug
                            ? "bg-nemesis-500/20 text-nemesis-400 border-l-2 border-nemesis-500"
                            : "text-dark-300 hover:bg-dark-800 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          {item.title}
                          {slug === item.slug && <ChevronRight className="w-4 h-4" />}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-dark-500 mb-8">
            <Link href="/" className="hover:text-white transition">Docs</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{doc.title}</span>
          </nav>

          <article className="prose prose-invert prose-lg max-w-none">
            <div 
              className="
                [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:text-white
                [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:text-white [&>h2]:border-b [&>h2]:border-dark-700 [&>h2]:pb-2
                [&>h3]:text-xl [&>h3]:font-medium [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-white
                [&>p]:text-dark-300 [&>p]:leading-relaxed [&>p]:mb-4
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul]:text-dark-300
                [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ol]:text-dark-300
                [&>li]:mb-2
                [&>blockquote]:border-l-4 [&>blockquote]:border-nemesis-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-dark-400 [&>blockquote]:my-4
                [&>pre]:bg-dark-800 [&>pre]:rounded-lg [&>pre]:p-4 [&>pre]:overflow-x-auto [&>pre]:my-4
                [&>code]:bg-dark-800 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-nemesis-400 [&>code]:text-sm
                [&>table]:w-full [&>table]:border-collapse [&>table]:my-4
                [&>strong]:text-white [&>strong]:font-semibold
              "
              dangerouslySetInnerHTML={{ __html: formatMarkdown(doc.content) }} 
            />
          </article>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-dark-700">
            {prevDoc ? (
              <Link 
                href={`/${prev}`}
                className="flex items-center gap-2 text-dark-400 hover:text-white transition group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div className="text-right">
                  <div className="text-xs text-dark-500">Précédent</div>
                  <div>{prevDoc.title}</div>
                </div>
              </Link>
            ) : <div />}
            
            {nextDoc ? (
              <Link 
                href={`/${next}`}
                className="flex items-center gap-2 text-nemesis-400 hover:text-nemesis-300 transition group"
              >
                <div>
                  <div className="text-xs text-dark-500">Suivant</div>
                  <div>{nextDoc.title}</div>
                </div>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </main>

        {/* Table of Contents */}
        <aside className="hidden xl:block w-64 p-6 border-l border-dark-700 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <h4 className="text-sm font-semibold text-dark-500 uppercase tracking-wider mb-4">
            Sur cette page
          </h4>
          <nav className="space-y-2 text-sm">
            {headings.map((heading, index) => (
              <a
                key={index}
                href={`#${heading.slug}`}
                className={`block text-dark-400 hover:text-white transition ${
                  heading.level === 2 ? "" : "pl-4"
                }`}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-dark-700 py-6 px-6 bg-dark-900">
        <div className="max-w-7xl mx-auto text-center text-dark-500 text-sm">
          <p>© 2024-2026 Némésis Launcher. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
