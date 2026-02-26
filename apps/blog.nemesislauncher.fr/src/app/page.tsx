import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronRight, Tag, User } from "lucide-react";

// Sample blog posts - In production, this would come from a CMS or database
const blogPosts = [
  {
    id: 1,
    slug: "lancement-nemesis-launcher-v1",
    title: "Lancement de Némésis Launcher v1.0",
    excerpt: "Après des mois de développement, nous sommes fiers d'annoncer la sortie officielle de Némésis Launcher. Découvrez toutes les fonctionnalités qui font de notre launcher le meilleur choix pour jouer à Minecraft.",
    date: "2026-02-26",
    readTime: "5 min",
    category: "Annonce",
    featured: true,
    image: "/logo.jpg",
  },
  {
    id: 2,
    slug: "authentification-microsoft",
    title: "Authentification Microsoft : Guide complet",
    excerpt: "Tout ce que vous devez savoir sur l'authentification Microsoft dans Némésis Launcher. Sécurité renforcée et connexion simplifiée.",
    date: "2026-02-25",
    readTime: "3 min",
    category: "Tutoriel",
    featured: false,
    image: null,
  },
  {
    id: 3,
    slug: "serveur-communautaire-ouverture",
    title: "Ouverture du serveur communautaire",
    excerpt: "Rejoignez notre serveur Minecraft communautaire ! Survival, mini-jeux et bien plus vous attendent sur play.nemesislauncher.fr.",
    date: "2026-02-24",
    readTime: "2 min",
    category: "Communauté",
    featured: false,
    image: null,
  },
  {
    id: 4,
    slug: "changelog-v1-0-1",
    title: "Changelog v1.0.1 - Corrections de bugs",
    excerpt: "Mise à jour corrective avec plusieurs améliorations de stabilité et corrections de bugs signalés par la communauté.",
    date: "2026-02-23",
    readTime: "2 min",
    category: "Changelog",
    featured: false,
    image: null,
  },
];

const categories = ["Tous", "Annonce", "Tutoriel", "Changelog", "Communauté"];

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="border-b border-dark-700 bg-dark-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Némésis Launcher"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-xl font-bold text-white">Blog</h1>
                <p className="text-sm text-dark-400">Némésis Launcher</p>
              </div>
            </Link>

            <nav className="flex items-center gap-6">
              <a
                href="https://nemesislauncher.fr"
                className="text-dark-400 hover:text-white transition"
              >
                Site principal
              </a>
              <a
                href="https://docs.nemesislauncher.fr"
                className="text-dark-400 hover:text-white transition"
              >
                Documentation
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero / Featured Article */}
        {featuredPost && (
          <section className="mb-16">
            <div className="bg-gradient-to-r from-nemesis-500/20 to-transparent border border-nemesis-500/30 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-nemesis-500/20 text-nemesis-400 rounded-full text-sm font-medium mb-4">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-dark-300 text-lg mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-dark-400 mb-6">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime} de lecture
                    </span>
                  </div>
                  <Link
                    href={`/article/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 bg-nemesis-500 hover:bg-nemesis-600 text-white px-6 py-3 rounded-lg font-medium transition"
                  >
                    Lire l&apos;article
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
                  <Image
                    src="/logo.jpg"
                    alt={featuredPost.title}
                    width={256}
                    height={256}
                    className="rounded-2xl object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  category === "Tous"
                    ? "bg-nemesis-500 text-white"
                    : "bg-dark-800 text-dark-300 hover:bg-dark-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <section>
          <h3 className="text-2xl font-bold text-white mb-6">
            Derniers articles
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                className="bg-dark-900 border border-dark-700 rounded-xl overflow-hidden hover:border-dark-600 transition group"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-dark-800 text-dark-300 rounded text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-nemesis-400 transition">
                    <Link href={`/article/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <p className="text-dark-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-dark-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="mt-16 bg-dark-900 border border-dark-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Restez informé
          </h3>
          <p className="text-dark-400 mb-6 max-w-lg mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir les dernières actualités et mises à jour directement dans votre boîte mail.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder:text-dark-500 focus:outline-none focus:border-nemesis-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-nemesis-500 hover:bg-nemesis-600 text-white rounded-lg font-medium transition"
            >
              S&apos;inscrire
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-700 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center text-dark-500 text-sm">
          <p>© 2026 Némésis Launcher. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
